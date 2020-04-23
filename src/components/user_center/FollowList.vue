<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 590px;">
    <!-- 顶部标题 -->
    <div>
      <h3 class="title">我的关注</h3>
    </div>
    <!-- 帖子列表 -->
    <div v-if="follows!=null && follows!=''" class="content">
      <div v-for="follow in follows" :key="follow.id">
        <router-link :to="{path:`/home/page/article/${follow.id}`}">
          <img :src="follow.avatar" alt />
          <span class="nickname">{{follow.nickname}}</span>
        </router-link>
        <button
              type="button"
              class="btn btn-outline-secondary cancel-collection"
              @click="cancelFollow(follow.id)"
            >取消关注</button>
      </div>
    </div>
    <div v-else>
      <Blank></Blank>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../assets/static/date";
export default {
  name: "FollowList",
  data() {
    return {
      follows: "" // 收藏列表
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get(
      "user/follow/list",
      {
        userId: sessionStorage.getItem("userId")
      },
      response => {
        that.follows = response.data.data;
      }
    );
  },
  methods: {
    // 取消收藏
    cancelFollow: function(followId) {
      let that = this;
      this.$requestApi.delete(
        "attention/delete",
        {
          userId:sessionStorage.getItem("userId"),
          targetuserId:followId
        },
        response=>{
          if(response.data.flag==true){
            that.follows.forEach((item,index)=>{
              if(item.id==followId){
                that.follows.splice(index,1);
              }
            })
          }
        }
      );
    }
  },
  filters: {
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 160) {
        return value.slice(0, 160) + "...";
      }
      return value;
    },
    titleEllipsis: function(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #3d3d3d;
  height: 90px;
  line-height: 90px;
  border-bottom: 1px solid #e0e0e0;
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
.cancel-collection {
  float: right;
  font-size: 15px;
  margin-right: 15px;
  margin-top: 15px;
}
</style>
