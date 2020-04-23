<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 365px;">
    <div class="head-follow">
      <span v-if="pathParam=='/home/page/follow/'+userId">他的关注&nbsp;&nbsp;({{contents.length}})</span>
      <span v-if="pathParam=='/home/page/fan/'+userId">他的粉丝&nbsp;&nbsp;({{contents.length}})</span>
    </div>
    <div class="content" v-if="contents!=null&&contents!=''">
      <div v-for="content in contents" :key="content.id" @click="reload()">
        <router-link :to="{path:`/home/page/article/${content.id}`}">
          <img :src="content.avatar" alt />
          <span class="nickname">{{content.nickname}}</span>
        </router-link>
      </div>
    </div>
    <div v-else>
      <Blank></Blank>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowOrFans",
  data() {
    return {
      pathParam: "", // 判断是显示关注还是粉丝
      contents: "", // 需要展示的内容
      userId: "" // 当前用户ID
    };
  },
  created: function() {
    let that = this;
    this.userId = this.$route.params.userId;
    this.pathParam = this.$route.path;
    console.log(this.pathParam)
    // 如果是关注，则查询关注
    if (this.pathParam == "/home/page/follow/"+this.userId) {
      this.$requestApi.get(
        "user/follow/list",
        {
          userId: this.userId
        },
        response => {
          that.contents = response.data.data;
        }
      );
    }
    if (this.pathParam == "/home/page/fan/"+this.userId) {
      this.$requestApi.get(
        "user/fans/list",
        {
          userId: this.userId
        },
        response => {
          that.contents = response.data.data;
        }
      );
    }
  },
  methods:{
    // 刷新页面
    reload:function(){
      this.$router.go(0)
    }
  },
  watch: {
    $route: function() {
      let that = this;
      this.pathParam = this.$route.path;
      // 如果是关注，则查询关注
      if (this.pathParam == "/home/page/follow/"+this.userId) {
        this.$requestApi.get(
          "user/follow/list",
          {
            userId: this.userId
          },
          response => {
            that.contents = response.data.data;
          }
        );
      }
      if (this.pathParam == "/home/page/fan/"+this.userId) {
        this.$requestApi.get(
          "user/fans/list",
          {
            userId: this.userId
          },
          response => {
            that.contents = response.data.data;
          }
        );
      }
    },
  }
};
</script>

<style scoped>
.head-follow {
  line-height: 50px;
  color: #b20b12;
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.content {
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
img {
  float: left;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 24px;
}
.nickname {
  display: inline-block;
  color: #333;
  font-size: 20px;
  font-weight: 600;
  padding: 15px 15px;
  margin-top: 4px;
}
</style>
