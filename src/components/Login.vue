<template>
  <div class="main container-fluid">
    <div class="row">
      <div class="col-lg-10 col-md-12 col-sm-12 offset-lg-1">
        <div class="row">
          <!-- 用户登录界面 -->
          <div class="login col-lg-6 col-md-12 col-sm-12 col-12">
            <div class="panel">
              <form>
                <div class="from-title">用户登录</div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input
                      type="text"
                      name="mobile"
                      value="phone"
                      v-model.trim="phone"
                      class="form-control col-sm-10 m-auto"
                      id="validationCustomUsername"
                      aria-describedby="emailHelp"
                      placeholder="手机号"
                      v-on:blur="validatemobile(phone)"
                    />
                    <div class="error col-sm-10 m-auto" v-if="isShow">{{ mobileError }}</div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input
                      type="password"
                      v-model.trim="password"
                      class="form-control col-sm-10 m-auto"
                      placeholder="密码"
                      v-on:blur="validatepassword(password)"
                    />
                    <div class="error col-sm-10 m-auto" v-if="isPasswordShow">{{ passwordError }}</div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <button
                      type="button"
                      class="btn btn btn-success col-sm-10 offset-sm-1"
                      @click="submit()"
                    >登录</button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 col-md-6 col-lg-6">
                    <router-link :to="{path:'/register'}">
                      <button
                        type="button"
                        class="btn btn-outline-secondary col-sm-8 offset-sm-2"
                      >注册</button>
                    </router-link>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      class="btn btn-outline-secondary col-sm-8 offset-sm-2"
                    >忘记密码</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="oAuth col-lg-5 col-md-12 col-sm-12 col-12">
            <div class="page-header">
              <h3>欢迎来到交理社区</h3>
              <p>在这里，你可以充实自己，认识更多的朋友！</p>
            </div>
            <div class="col-sm-12">
              <button type="button" data-type="qq" class="btn btn-block">QQ 登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 按钮：用于打开模态框 -->
    <button
      type="button"
      id="model-button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
      hidden
    ></button>

    <!-- Modal 登录提示框-->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Infomation</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body text-danger">用户名或密码错误！</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      mobileError: "",   // 手机号输入错误时的提示信息
      passwordError: "",//  密码输入错误时的提示信息
      isPasswordShow: false,// 是否显示
      isShow: false,// 是否显示
      phone: "",//  手机号
      password: "",// 密码
      vcode: "",// 校验码
      nickname: "",//  昵称，存储在sessionstorage中
      avatar: "",// 头像，存储在sessionstorage中
      userId:"",// 用户ID，存储在sessionstorage中
    };
  },
  created: function() {},
  methods: {
    validatemobile: function(phone) {
      let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
      if (phone.length == 0) {
        this.isShow = true;
        this.mobileError = "手机号不能为空！";
      } else if (phone.length != 11 || !reg.test(phone)) {
        this.isShow = true;
        this.mobileError = "请输入11位有效号码!";
      } else {
        this.isShow = false;
        this.mobileError = "";
      }
    },
    validatepassword: function(phone) {
      if (phone.length == 0) {
        this.isPasswordShow = true;
        this.passwordError = "密码不能为空！";
      } else {
        this.isPasswordShow = false;
        this.passwordError = "";
      }
    },
    submit: function() {
      if (this.phone.length == 0 || this.password.length == 0) {
        this.isShow = true;
        this.isPasswordShow = true;
        this.mobileError = "手机号不能为空！";
        this.passwordError = "密码不能为空！";
        return;
      }
      let that = this;
      this.$requestApi.post(
        "login",
        {
          mobile: that.phone,
          password: that.password
        },
        function(response) {
          console.log(response)
          if (response.data.flag == true) {
            that.nickname = response.data.data["nickname"];
            that.avatar = response.data.data["avatar"];
            that.userId = response.data.data["userId"];
            let token = response.data.data["token"];
            let jiaoliToken = response.data.data["jiaoliToken"];
            // 将token存储到cookie中
            that.$cookies.set("jwttoken", token, 60 * 60 * 2);
            that.$cookies.set("jiaoli_token",jiaoliToken,60*60*24*20);
            // 将用户的ID和昵称存储到sessionstorage中，用于刷新jwttoken
            sessionStorage.setItem("userId",that.userId);
            sessionStorage.setItem("nickName",that.nickname);
            sessionStorage.setItem("avatar",that.avatar);
            that.$router.push({
              name: "Home",
            });
          } else {
            document.getElementById("model-button").click();
          }
        }
      );
    }
  },
  mounted() {}
};
</script>

<style scoped>
.main {
  padding: 100px 0 200px 0;
}
.login {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 50px;
  padding-top: 20px;
}
.oAuth {
  padding-left: 50px;
}
.panel {
  background-color: rgba(52, 58, 64, 0.11);
  padding: 19px;
  margin-bottom: 20px;
  border-radius: 4px;
}
.from-title {
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding-bottom: 10px;
}
.page-header {
  padding-bottom: 9px;
  margin: 60px 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.error {
  padding-top: 5px;
  font-size: 0.7em;
  color: red;
}
</style>
