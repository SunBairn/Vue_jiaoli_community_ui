<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 365px;">
    <div class="head">
      {{columnName}}&nbsp;&nbsp;&nbsp;(
      <em style="margin:0 5px;">{{articles.length}}</em>)
    </div>
    <div v-if="articles!=null && articles!=''">
      <div class="media" v-for="article in articles" v-bind:key="article.id">
        <div class="media-body">
          <h6 class="mt-0">
            <router-link :to="{path : `/article/${article.id}`}">
              <a href="javascript:void(0)">{{ article.title | titleEllipsis}}</a>
            </router-link>
          </h6>
          <span class="contain-font-size">{{ article.content | ellipsis }}</span>
          <br />
          <span class="media-contain">
            •
            <span>{{article.commentCount}}</span> 个评论
            •
            <span>{{article.viewCount}}</span> 次浏览
            •
            <span>{{article.likeCount}}</span> 点赞
            •
            <span
              class="mr-5"
              style="float:right"
            >{{article.gmtCreate | formatDate}}</span>
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
  name: "ColumnDetail",
  props: ["userId"],
  data() {
    return {
      articles: "", // 文章信息
      columnName: "", // 专栏名称
      columnId: "" // 专栏ID
    };
  },
  created: function() {
    let that = this;
    this.columnId = this.$route.query.columnId;
    this.$requestApi.get(
      "column/find/name/id",
      {
        id: this.columnId
      },
      response => {
        that.columnName = response.data.data.name;
      }
    );
    this.$requestApi.get(
      "article/find/userId/columnId",
      {
        userId: this.userId,
        columnId: this.columnId
      },
      response => {
        that.articles = response.data.data;
      }
    );
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
.head {
  color: #b20b12;
  padding: 30px 0;
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 20px;
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
