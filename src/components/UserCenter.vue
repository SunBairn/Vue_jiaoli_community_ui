<template>
  <div class="main container-fluid">
    <div class="row">
      <div class="col-lg-2 col-md-2 col-sm-2 left-box">
        <ul class="nav flex-column" id="nav">
          <a href>
            <router-link :to="{path : '/uc/profile'}" class="nav-item nav-link">个人资料</router-link>
          </a>
          <router-link :to="{path : '/uc/collection-list'}" class="nav-item nav-link">我的收藏</router-link>
          <router-link :to="{path : '/uc/follow-list'}" class="nav-item nav-link">我关注的人</router-link>
          <router-link :to="{path : '/uc/fan-list'}" class="nav-item nav-link">我的粉丝</router-link>
          <router-link :to="{path : '/uc/invitation-list'}" class="nav-item nav-link">帖子管理</router-link>
          <router-link :to="{path : '/uc/question-list'}" class="nav-item nav-link">问题管理</router-link>
          <router-link :to="{path : '/uc/article-list'}" class="nav-item nav-link">文章管理</router-link>
        </ul>
      </div>
      <div class="col-lg-10 col-md-10 col-sm-10 right-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      msg: "用户中心"
    };
  }
};
</script>

<style scoped>
.main {
  background-color: white;
  margin: 15px auto;
}
a {
  cursor: pointer;
}
.left-box {
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 17px;
  display: inline-block;
  line-height: 35px;
  width: 100%;
  padding: 0;
}
a {
  color: #4d4d4d;
  text-decoration: none;
}
#nav a:hover {
  background-color: rgba(255, 71, 71, 0.151);
}
.active {
  background-color: #b20b12;
  color: white;
}
</style>
