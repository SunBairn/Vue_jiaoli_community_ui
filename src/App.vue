<template>
  <div id="app">
    <div id="head" class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-11 ml-5">
          <nav class="navbar navbar-expand-lg navbar-light">
            <router-link :to="{path:'/'}" class="navbar-brand ml-lg-5">
              <img
                src="./assets/images/jiaoli.jpg"
                width="80"
                height="50"
                class="d-inline-block align-top"
                alt
              />
              <span class="logo" style="margin-top:10px ; display:inline-block">交理社区</span>
            </router-link>
            <form class="form-inline my-2 my-lg-0 d-none d-md-block">
              <input class="form-control" type="search" placeholder="搜索内容....." aria-label="Search" />
              <button type="button" class="btn btn-secondary search">搜索</button>
            </form>
            <ul class="navbar-nav ml-auto" style="margin-right:30px">
              <li class="nav-item dropdown" v-if="avatar!=null">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src="./assets/icons/list-ul.svg" class="publish" alt />
                  <span>发起</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link :to="{name : 'PublishInvitation'}">
                    <a class="dropdown-item" href="javascript:void(0)">帖子</a>
                  </router-link>
                  <router-link :to="{name : 'PublishQuestion'}">
                    <a class="dropdown-item" href="#">问题</a>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{name : 'PublishArticle'}">
                    <a class="dropdown-item" href="#">文章</a>
                  </router-link>
                </div>
              </li>
              <li class="nav-item dropdown" @mouseenter="mouseenter()" @mouseleave="mouseleave()">
                <a href="#">
                  <img src="./assets/icons/bell-fill.svg" alt class="notice" />
                </a>
                <div class="my-list-group" :style="{ display : isActive}">
                  <ul class="list-group">
                    <a href="#">
                      <li class="list-item">公告</li>
                    </a>
                    <a href="#" v-if="avatar!=null">
                      <li class="list-item">评论</li>
                    </a>
                    <a href="#" v-if="avatar!=null">
                      <li class="list-item">关注</li>
                    </a>
                    <a href="#" v-if="avatar!=null">
                      <li class="list-item">点赞</li>
                    </a>
                    <a href="#" v-if="avatar!=null">
                      <li class="list-item">回答</li>
                    </a>
                  </ul>
                </div>
              </li>
              <li class="nav-item" @mouseenter="mouseenter1()" @mouseleave="mouseleave1()">
                <div v-if="avatar!=null">
                  <a href="#">
                    <img :src="avatar" alt="avatar" class="avatar" />
                  </a>
                  <div
                    class="my-list-group"
                    :style="{ display : isActive1}"
                    style="left:92% ;top: 60px;"
                  >
                    <ul class="list-group">
                      <a href="javascript:void(0)">
                        <router-link :to="{path:'/uc/profile'}">
                          <li class="list-item a-notice">个人中心</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/collection-list'}">
                          <li class="list-item a-notice">我的收藏</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/follow-list'}">
                          <li class="list-item a-notice">我的关注</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/fan-list'}">
                          <li class="list-item a-notice">我的粉丝</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/invitation-list'}">
                          <li class="list-item a-notice">帖子管理</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/question-list'}">
                          <li class="list-item a-notice">问题管理</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)">
                        <router-link :to="{path : '/uc/article-list'}">
                          <li class="list-item a-notice">文章管理</li>
                        </router-link>
                      </a>
                      <a href="javascript:void(0)" @click="loginOut()">
                          <li class="list-item a-notice">退出</li>
                      </a>
                    </ul>
                  </div>
                </div>

                <router-link
                  class="nav-link button-narrow"
                  :to="{path:'/login'}"
                  v-if="avatar==null"
                  v-text="login"
                ></router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div id="left-content" class="container-fluid">
      <div class="row">
        <div id="content" class="col-sm-12 col-md-12 col-lg-10 mx-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <Footer class="footer1" style="margin-top:50px"></Footer>
        </div>
      </div>
    </div>
  </div>
</template>>
  

 


<script>
import Nav from "./components/Nav";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import UserCenter from "./components/UserCenter";
export default {
  name: "App",
  data() {
    return {
      //  componentsArry: ["Nav", "Login", "Register"], // 记录需要显示的组件
      userId: "", // 用户的ID
      nickname: "", // 要显示的用户名
      avatar: null, //要显示的头像
      login: "登录/注册",
      isActive: "", // 用于是否显示通知下的组件
      isActive1: "" // 用于是否显示头像下的组件
    };
  },
  components: {
    Nav,
    Footer,
    Login,
    Register,
    UserCenter
  },
  beforeCreate: function() {
    this.nickname = sessionStorage.getItem("nickName");
    this.userId = sessionStorage.getItem("userId");
    this.avatar = sessionStorage.getItem("avatar");
  },
  methods: {
    mouseenter() {
      this.isActive = "inline-block";
    },
    mouseleave() {
      this.isActive = "none";
    },
    mouseenter1() {
      this.isActive1 = "inline-block";
    },
    mouseleave1() {
      this.isActive1 = "none";
    },
    // 退出登录
    loginOut: function() {
      let that = this;
      this.$requestApi.get(
        "loginOut",
        {
          userId: this.userId,
          jiaoliToken: this.$cookies.get("jiaoli_token")
        },
        function(response) {
          sessionStorage.clear();
          if (response.data.flag == true) {
            // 跳转到首页
            that.$router.push({ path: "/" });
          }
        }
      );
    }
  },
  created: function() {
    let that = this;
    let jiaoliToken = this.$cookies.get("jiaoli_token");
    // 如果没有jiaoliToken的话就不需要自动登录
    if (jiaoliToken != null) {
      // 自动登录，登录成功后将用户信息(用户ID，头像地址，昵称)存储到sessionStorage中,而且每次登录之后都要刷新所有token
      this.$requestApi.get("autoLogin", "", function(response) {
        console.log(response);
        if (response.data.flag == true) {
          that.nickname = response.data.data["nickname"];
          that.avatar = response.data.data["avatar"];
          that.userId = response.data.data["userId"];
          let token = response.data.data["token"];
          let jiaoliToken = response.data.data["jiaoliToken"];
          // 将token存储到cookie中
          let jwttoken = that.$cookies.get("jwttoken");
          if (jwttoken != null || jwttoken != "") {
            that.$cookies.set("jwttoken", token, 1000 * 60 * 60 * 2);
          }
          that.$cookies.set(
            "jiaoli_token",
            jiaoliToken,
            1000 * 60 * 60 * 24 * 20
          );
          // 将用户的ID和昵称存储到sessionstorage中，用于刷新jwttoken
          sessionStorage.setItem("userId", that.userId);
          sessionStorage.setItem("nickName", that.nickname);
          sessionStorage.setItem("avatar", that.avatar);
        }
      });
    }
  },
  beforeUpdate: function() {
    this.nickname = sessionStorage.getItem("nickName");
    this.userId = sessionStorage.getItem("userId");
    this.avatar = sessionStorage.getItem("avatar");
  },
  mounted() {},
  computed: {}
};
</script>

<style scoped>
#app {
  background-color: rgba(0, 0, 0, 0.04);
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  min-height: 100%;
}
#head {
  background-color: #f8f9fa;
  position: fixed;
  top: 0px;
  z-index: 20;
}
#left-content {
  min-width: 100%;
  margin-top: 80px;
  padding-bottom: 100px;
}
.logo {
  color: #777;
}
.search {
  margin-left: 5px;
}
.avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
}
.publish {
  opacity: 0.7;
  width: 30px;
  height: 30px;
}
.notice {
  width: 20px;
  height: 20px;
  margin: 14px 20px 0 18px;
  opacity: 0.5;
}

/* 悬浮于页面的样式 */
.my-list-group {
  min-width: 120px;
  display: none;
  padding: 0 0 !important;
  position: absolute;
  top: 44px;
  z-index: 3001;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  left: 40%;
  transform: translateX(-50%);
}
.list-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
}

.a-notice {
  text-decoration: none;
  color: #666;
}
.a-notice:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
a {
  text-decoration-line: none;
}
.footer1 {
  height: 100px;
  margin-top: -100px;
}
</style>
