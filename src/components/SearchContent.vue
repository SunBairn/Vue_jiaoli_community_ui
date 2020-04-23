<template>
  <!-- 搜索内容展示 -->
  <div class="main col-lg-12 col-md-12 col-sm-12" style="min-height:620px">
    <div class="title">
      <span>搜索-全部</span>
    </div>
    <div class="content" v-if="arrayContents!=null && arrayContents!=''">
      <div v-for="(arrayContent,index) in arrayContents" :key="index">
        <div class="user content-common" v-if="arrayContent.users!=null">
          <div class="flag_content" v-for="user in arrayContent.users" :key="user.id">
            <router-link :to="{path:`/home/page/article/${user.id}`}">
              <span class="flag_icon flag_icon1">用户</span>
              <span v-html="user.nickname"></span>
            </router-link>
          </div>
        </div>
        <div class="article content-common" v-if="arrayContent.articles!=null">
          <div class="flag_content" v-for="article in arrayContent.articles" :key="article.id">
            <router-link :to="{path : `/article/${article.id}`}">
              <span class="flag_icon flag_icon1">文章</span>
              <span v-html="article.title"></span>
            </router-link>
          </div>
        </div>
        <div class="question content-common" v-if="arrayContent.questions!=null">
          <div class="flag_content" v-for="question in arrayContent.questions" :key="question.id">
            <router-link :to="{path:`/question/${question.id}`}">
              <span v-html="question.title"></span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 offset-5 search-more">
        <a
          href="javascript:void(0)"
          style="color:#f37327"
          @click="searchMore()"
          v-if="isShowMore"
        >查看更多</a>
      </div>
    </div>
    <div v-else>
      <Blank></Blank>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchContent",
  props: ["contents", "keyword"],
  data() {
    return {
      arrayContents: [], //需要展示的内容数组
      questions: "", // 问题
      articles: "", // 文章
      users: "", // 用户
      page: 1, //页码数，默认为1
      isShowMore: true // 控制是否显示更多
    };
  },
  created: function() {
    //   this.contents=this.$route.params.contents;
    if (this.contents != null) {
      this.arrayContents.push(this.contents);
      if (
        (this.contents.articles != null && this.contents.articles.length) <
          10 &&
        (this.contents.questions != null && this.contents.questions.length) <
          10 &&
        this.contents.users != null && this.contents.users.length < 10
      ) {
        this.isShowMore = false;
      }
    }
  },
  methods: {
    searchMore: function() {
      let that = this;
      axios
        .get("http://localhost:9001/search/all", {
          params: {
            keyword: this.keyword,
            page: this.page
          }
        })
        .then(response => {
          let info = response.data.data;
          if (info != null) {
            that.arrayContents.push(info);
            that.page = that.page + 1;
          } else {
            that.isShowMore = false;
          }
        });
    }
  },
  watch: {
    contents: function() {
      console.log(this.contents);
      //  this.arrayContents=null;
      if (this.contents != null) {
        this.arrayContents.splice(0, 1, this.contents);

      // 判断是否要显示"更多"按钮
        if (
          (this.contents.articles != null && this.contents.articles.length) <
            10 &&
          (this.contents.questions != null && this.contents.questions.length) <
            10 &&
          this.contents.users != null && this.contents.users.length < 10
        ) {
          this.isShowMore = false;
        }else{
          this.isShowMore = true;
        }
      } else {
        this.arrayContents.splice(0, this.arrayContents.length);
      }
    }
  }
};
</script>

<style scoped>
.main {
  background-color: white;
  padding: 30px 0px;
  margin-top: 30px;
}
.title {
  font-size: 20px;
  padding-left: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}
.content {
  padding: 15px 40px;
}
.content-common {
  font-size: 20px;
}
.flag_content {
  margin: 10px 0px;
}
.flag_icon {
  color: #f7999d;
  border: 1px solid #f6d1d3;
  margin-right: 10px;
}
.flag_icon1 {
  display: inline-block;
  background: #ffffff;
  text-align: center;
  font-size: 14px;
  vertical-align: middle;
  width: 32px;
  height: 19px;
  line-height: 18px;
  opacity: 0.9;
}
.search-more {
  font-size: 14px;
  color: #f37327;
  bottom: 0px;
  margin-top: 35px;
  margin-bottom: 50px;
}
</style>
