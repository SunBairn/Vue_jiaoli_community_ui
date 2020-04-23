<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="padding:0px 10px">
    <div class="hot-article">
      <span class="title">热门文章</span>
      <div class="article-content" v-for="article in articles" :key="article.id">
        <router-link :to="{path:`/article/${article.id}`}">
          <a href="javascript:void(0)">{{article.title}}</a>
        </router-link>
        <span class="view-count">{{article.viewCount}}人阅读</span>
      </div>
    </div>
    <div class="hot-user">
      <span class="title">活跃用户</span>
      <div class="row user-box">
        <div class="col-lg-3 col-md-3 col-sm-4 user-content" v-for="user in users" :key="user.id">
          <router-link :to="{path:`/home/page/article/${user.id}`}">
            <img :src="user.avatar" alt class="avatar" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="vx">
      <span class="title">站长微信</span>
      <figure class="figure">
        <img src="../assets/images/vx.jpg" class="figure-img img-fluid rounded" alt="..." />
        <figcaption class="figure-caption">遇到问题可以扫码添加站长微信进行咨询</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexRightCommon",
  data() {
    return {
      articles: "", //热门文章信息
      users: "" // 活跃用户信息
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get("article/find/hot", {}, response => {
      that.articles = response.data.data;
    });
    this.$requestApi.get("user/find/hot", {}, response => {
      that.users = response.data.data;
    });
  }
};
</script>

<style scoped>
.title {
  display: inline-block;
  margin-bottom: 10px;
  border-left: red solid 3px;
  padding-left: 5px;
}
.article-content {
  padding: 5px 10px;
  background-color: #faf8f9;
  line-height: 30px;
  text-decoration: none;
}
.article-content a {
  text-decoration: none;
  color: #3d3d3d;
  font-weight: 580;
  overflow: hidden;
  cursor: pointer;
}
.article-content a:hover {
  color: tomato;
}
.view-count {
  font-size: 12px;
  font-weight: normal;
  color: #999;
  float: right;
}
.hot-user {
  margin-top: 30px;
}
.user-box {
  min-height: 256px;
}
.user-content {
  padding: 7px 4px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 10%;
  cursor: pointer;
}
.vx{
    margin: 15px 0px;
}
</style>
