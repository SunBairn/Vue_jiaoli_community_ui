<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 590px;">
    <!-- 顶部标题 -->
    <div>
      <h3 class="title">我的收藏</h3>
    </div>
    <!-- 帖子列表 -->
    <div v-if="collections!=null && collections!=''">
      <div class="media" v-for="collection in collections" v-bind:key="collection.id">
        <div class="media-body">
          <h6 class="mt-0">
            <router-link :to="{path : `/article/${collection.id}`}">
              <a href="javascript:void(0)">{{ collection.title | titleEllipsis}}</a>
            </router-link>
            <button
              type="button"
              class="btn btn-outline-secondary cancel-collection"
              @click="cancelCollection(collection.id)"
            >取消收藏</button>
          </h6>
          <span class="contain-font-size">{{ collection.content | ellipsis }}</span>
          <br />
          <span class="media-contain">
            •
            <span>{{collection.commentCount}}</span> 个评论
            •
            <span>{{collection.viewCount}}</span> 次浏览
            •
            <span>{{collection.likeCount}}</span> 点赞
            •
            <span
              class="mr-5"
              style="float:right"
            >{{collection.gmtCreate | formatDate}}</span>
          </span>
          <hr style="border-top: 1px solid rgba(0,0,0,.08);" />
        </div>
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
  name: "Templeta",
  data() {
    return {
      collections: "" // 收藏列表
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get(
      "user/collection",
      {
        userId: sessionStorage.getItem("userId")
      },
      response => {
        that.collections = response.data.data;
      }
    );
  },
  methods: {
    // 取消收藏
    cancelCollection: function(collectionId) {
      let that = this;
      this.$requestApi.delete(
        "collection/delete",
        {
          userId: sessionStorage.getItem("userId"),
          articleId: collectionId
        },
        response => {
          console.log(response.data.flag)
          if (response.data.flag == true) {
            that.collections.forEach((element,index)=>{
              if(element.id==collectionId){
                that.collections.splice(index,1);
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
a {
  text-decoration: none;
  font-size: 20px;
  color: #5a5a5a;
  font-weight: 700;
  line-height: 30px;
  padding-bottom: 4px;
}
a:hover {
  color: #b20b12;
}
.cancel-collection {
  float: right;
  font-size: 15px;
  margin-right: 15px;
}
.media-contain {
  font-size: 12px;
  font-weight: normal;
  color: #999;
}
.contain-font-size {
  font-size: 16px;
  color: #858585;
  line-height: 24px;
}
</style>
