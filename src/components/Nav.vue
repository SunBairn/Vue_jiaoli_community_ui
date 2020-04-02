<template>
  <div class="body">
    <div class="nav pl-0">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link to="/nav/life" class="navbar-brand">首页</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link
              :to="{path:'/nav/life'}"
              class="nav-item nav-link"
              v-bind:class="{active : isActive}"
            >校园生活</router-link>
            <router-link :to="{path:'/nav/question'}" class="nav-item nav-link">新生问答</router-link>
            <router-link :to="{path:'/nav/activity'}" class="nav-item nav-link">校园活动</router-link>
            <router-link :to="{path:'/nav/article'}" class="nav-item nav-link">考研论坛</router-link>
            <router-link :to="{path:'/nav/recruit'}" class="nav-item nav-link">招聘求职</router-link>
            <router-link :to="{path:'/nav/notice'}" class="nav-item nav-link">站内公告</router-link>
          </div>
        </div>
      </nav>
    </div>
    <transition mode="out-in">
      <div class="content">
        <IndexCommon></IndexCommon>
      </div>
    </transition>
  </div>
</template>

<script>
import IndexCommon from "../components/IndexCommon";
export default {
  name: "Nav",
  data() {
    return {};
  },
  components: {
    IndexCommon
  },
  computed: {
    // 默认刚进来是首页和校园生活为激活状态
    isActive: function() {
      let path = this.$route.path;
      if (path == "/" || path == "/nav/life") {
        return true;
      } else {
        false;
      }
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  padding-left: 100px;
}
.v-enter,.v-leave-to{
  opacity: 0;
  transform: translateX(3);
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
</style>
