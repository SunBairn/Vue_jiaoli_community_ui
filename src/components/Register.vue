<template>
  <div class="main container-fluid">
    <div class="row">
      <div class="col-lg-10 col-md-12 col-sm-12 offset-lg-1">
        <div class="row">
          <!-- 用户登录界面 -->
          <div class="login col-lg-6 col-md-12 col-sm-12 col-12 m-auto">
            <div class="panel">
              <form>
                <div class="from-title">用户注册</div>
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
                    <input
                      type="password"
                      v-model.trim="confirmPassword"
                      class="form-control col-sm-10 m-auto"
                      placeholder="确认密码"
                      v-on:blur="validateconfirmpassword(confirmPassword)"
                    />
                    <div
                      class="error col-sm-10 m-auto"
                      v-if="isConfirmPasswordShow"
                    >{{ confirmPasswordError }}</div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12 form-inline">
                    <input
                      type="text"
                      v-model.trim="vcode"
                      class="form-control col-sm-4 offset-sm-1 mr-2"
                      placeholder="6位有效验证码"
                      @blur="validatevcode(vcode)"
                    />
                    <button type="button" class="btn btn-outline-secondary" @click="getCode()">获取验证码</button>
                    <div class="error col-sm-10 m-auto" v-if="isVcodeShow">{{ vcodeError }}</div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      class="btn btn-secondary col-sm-8 offset-sm-2"
                      @click="submit()"
                    >注册</button>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6">
                    <router-link :to="{path:'/'}">
                      <button type="button" class="btn btn-info col-sm-8 offset-sm-2">游客访问</button>
                    </router-link>
                  </div>
                </div>
              </form>
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
          <div class="modal-body text-danger">注册失败，请重新注册！</div>
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
      vcodeError: "", // 验证码填错时的提示信息
      mobileError: "", // 手机号码填错时的提示信息
      passwordError: "", // 密码填错时的提示信息
      confirmPasswordError: "", // 确认密码填错时的提示信息
      isVcodeShow: false, //  是否显示的标识
      isConfirmPasswordShow: false, // 是否显示的标识
      isPasswordShow: false, // 是否显示的标识
      isShow: false, // 是否显示的标识
      phone: "", //   手机号码
      password: "", // 密码
      confirmPassword: "", // 确认密码
      vcode: "", //  验证码
      nickname: "", //  昵称
      avatar: "" // 头像地址
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
        let that = this;
        this.$requestApi.get(
          "user/check",
          {
            mobile: phone
          },
          function(response) {
            let flag = response.data.flag;
            if (!flag) {
              that.isShow = true;
              that.mobileError = "该用户已被注册过！";
            } else {
              that.isShow = false;
              that.mobileError = "";
            }
          }
        );
      }
    },
    validatepassword: function(password) {
      if (password.length == 0) {
        this.isPasswordShow = true;
        this.passwordError = "密码不能为空！";
      } else {
        this.isPasswordShow = false;
        this.passwordError = "";
      }
    },
    validateconfirmpassword: function(confirmPassword) {
      if (confirmPassword.length == 0) {
        this.isConfirmPasswordShow = true;
        this.confirmPasswordError = "请输入确认密码！";
      } else if (confirmPassword != this.password) {
        this.isConfirmPasswordShow = true;
        this.confirmPasswordError = "密码与确认密码不一致！";
      } else {
        this.isConfirmPasswordShow = false;
        this.confirmPasswordError = "";
      }
    },
    validatevcode: function(vcode) {
      if (vcode.length == 0) {
        this.isVcodeShow = true;
        this.vcodeError = "请输入6位有效验证码！";
      } else {
        this.isVcodeShow = false;
        this.vcodeError = "";
      }
    },
    getCode: function() {
      let that = this;
      this.$requestApi.get("user/sendsms/" + that.phone, {}, function(response) {});
    },
    submit: function() {
      if (this.phone.length == 0 || this.password.length == 0) {
        this.isShow = true;
        this.isPasswordShow = true;
        this.isConfirmPasswordShow = true;
        this.isVcodeShow = true;
        this.mobileError = "手机号不能为空！";
        this.passwordError = "密码不能为空！";
        this.confirmPasswordError = "请输入确认密码！";
        this.vcodeError = "请输入6位有效验证码！";
        return;
      }
      let that = this;
      this.$requestApi.post(
        "user/add/?code="+that.vcode+"&confirmPassword="+that.confirmPassword,
        {
          mobile: that.phone,
          password: that.password,
        },
        function(response) {
          if (response.data.flag == true) {
            that.$router.push({ path: "/login" });
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
  padding-right: 50px;
  padding-top: 20px;
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
