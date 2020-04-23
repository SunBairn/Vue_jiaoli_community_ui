<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 365px;">
    <div class="media" v-for="question in questions" v-bind:key="question.id">
      <div class="media-body">
        <h6 class="mt-0">
          <router-link :to="{path : `/question/${question.id}`}">
            <a href="javascript:void(0)">{{ question.title | titleEllipsis}}</a>
          </router-link>
        </h6>
        <span class="contain-font-size">{{ question.content | ellipsis }}</span>
        <br />
        <span class="media-contain">
          •
          <span>{{question.commentCount}}</span> 个评论
          •
          <span>{{question.viewCount}}</span> 次浏览
          •
          <span>{{question.likeCount}}</span> 点赞
          •
          <span class="mr-5" style="float:right">{{question.gmtCreate | formatDate}}</span>
        </span>
        <hr style="border-top: 1px solid rgba(0,0,0,.08);" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../assets/static/date";
export default {
  name: "Questions",
  props: ["userId"],
  data() {
    return {
      questions:"", // 帖子内容
    };
  },
  created:function(){
    let that = this;
    this.$requestApi.get(
      "question/find",
      {
        creator:this.userId,
        type:2
      },
      (response)=>{
        that.questions=response.data.data;
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
a {
  text-decoration: none;
  font-size: 20px;
  color: #5a5a5a;
  font-weight: 700;
  line-height: 30px;
  padding-bottom: 4px;
}
a:hover{
    color:#b20b12;
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
