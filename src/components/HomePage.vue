<template>
  <div class="container-fluid main" style="min-height: 365px;">
    <div class="col-lg-12 col-md-12 col-sm-12 head-user">
      <!-- 用户信息 -->
      <div class="media">
        <img
          :src="info.avatar"
          class="mr-3 head"
          alt
          data-toggle="modal"
          data-target="#exampleModalCenter"
        />
        <div class="media-body mt-4 info">
          <div class="id-card" style="display:inline-block">
            <span class="id-name">ID:&nbsp;&nbsp;{{info.nickname}}</span>
          </div>
          <a
            href="javascript:void(0)"
            class="follow ml-3"
            v-if="isShowFollow==1"
            @click="follow(info.id)"
          >
            <span>关注</span>
          </a>
          <a
            href="javascript:void(0)"
            class="cancel-follow ml-3"
            v-if="isShowFollow==2"
            @click="cancelFollow(info.id)"
          >
            <span>已关注</span>
          </a>
          <div class="mt-3">
            <router-link :to="{path:`/home/page/follow/${userId}`}" class="mr-3  self-follow">
              <span>
                他的关注&nbsp;
                <em>{{info.followcount}}</em>
              </span>
            </router-link>
            <router-link :to="{path:`/home/page/fan/${userId}`}" class="mr-3  self-follow">
              <span>
                他的粉丝&nbsp;
                <em>{{info.fanscount}}</em>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 对应组件信息 -->
    <div class="col-lg-12 col-md-12 col-sm-12 content">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="{path:`/home/page/article/${userId}`}" class="nav-link">
            文章
            <em class="ml-2" v-if="info.articles!=null">{{info.articles.length}}</em>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            :to="{path:`/home/page/invitation/${userId}`}"
            class="nav-link"
          >
            帖子
            <em class="ml-2">{{info.invitationCount}}</em>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{path:`/home/page/question/${userId}`}" class="nav-link">
            问答
            <em class="ml-2">{{info.questionCount}}</em>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{path:`/home/page/collection/${userId}`}"
            class="nav-link"
          >
            收藏
            <em class="ml-2">{{info.collectionCount}}</em>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{path:`/home/page/column/${userId}`}" class="nav-link">
            专栏
            <em class="ml-2">{{info.columnCount}}</em>
          </router-link>
        </li>
      </ul>
      <router-view :articles="info.articles" :userId="userId"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      info: "", // 用户
      userId: "", // 用户ID
      isShowFollow: "" // 1 代表显示关注，2代表显示已关注，3什么都不显示
    };
  },
  created: function() {
    let that = this;
    this.userId = this.$route.params.userId;
    // 判断显示关注还是已关注还是什么都不显示
    if (this.userId == sessionStorage.getItem("userId")) {
      this.isShowFollow = 3;
    } else {
      this.$requestApi.get(
        "attention/find/isfollow",
        {
          userId: sessionStorage.getItem("userId"),
          targetuserId: this.userId
        },
        response => {
          if (response.data.flag == true) {
            that.isShowFollow = 1;
          } else {
            that.isShowFollow = 2;
          }
        }
      );
    }
    // 获取HomePage信息
    this.$requestApi.get(
      "user/pageHome",
      {
        userId: this.userId
      },
      response => {
        that.info = response.data.data;
      }
    );
  },
  methods: {
    // 用户关注
    follow: function(targetuserId) {
      let that = this;
      this.$requestApi.post(
        "attention/add",
        {
          userId: sessionStorage.getItem("userId"),
          targetuserId: targetuserId
        },
        response => {
          if (response.data.flag == true) {
            that.isShowFollow = 2;
            that.info.fanscount=that.info.fanscount+1;
          }
        }
      );
    },
    // 取消关注
    cancelFollow:function(targetuserId){
      let that = this;
      this.$requestApi.delete(
        "attention/delete",
        {
          userId:sessionStorage.getItem("userId"),
          targetuserId:targetuserId
        },
        response=>{
          if(response.data.flag==true){
            that.isShowFollow=1;
            that.info.fanscount=that.info.fanscount-1;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.main {
  text-decoration: none;
}
.head {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.head-user {
  background-color: white;
  margin-top: 30px;
  padding-bottom: 30px;
}
.id-name {
  font-size: 26px;
  font-weight: 600;
  color: #4d4d4d;
  width: 536px;
  min-height: 24px;
}
.follow {
  border-radius: 10%;
  text-decoration: none;
  padding: 5px 16px 6px;
  line-height: 18px;
  color: rgba(255, 0, 21, 0.767);
  border: #e0e0e0 solid 1px;
}
.cancel-follow{
   border-radius: 10%;
  text-decoration: none;
  padding: 5px 16px 6px;
  line-height: 18px;
  color: #999;
  border: #e0e0e0 solid 1px;
}
.follow:hover {
  background-color: #df2323ea;
  color: white;
}
.content {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background-color: white;
  font-size: 16px;
}
.nav{
  border-bottom: 1px solid rgba(0,0,0,.08);
  margin-bottom: 5px;
}
.nav-item {
  font-family: "Microsoft YaHei", Arial;
  font-size: 20px;
  font-weight: 600;
  padding: 30px;
  margin-bottom: 4px;
}
.nav-link {
  color: #333;
  border-bottom: white solid 3px;
}
.nav-link:hover {
  color: #b20b12;
  border-bottom: #b20b12 solid 3px;
}
.active {
  color: #b20b12;
  border-bottom: #b20b12 solid 3px;
}
.self-follow:hover{
  text-decoration:none;
}
</style>