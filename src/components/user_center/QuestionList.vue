<template>
  <div class="container-fluid main" style="min-height: 590px;">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <!-- 顶部标题 -->
        <div>
          <h3 class="title">全部问题</h3>
        </div>
        <!-- 帖子列表 -->
        <div class="content" v-for="question in questions" :key="question.id">
          <h4 class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
            <a @click="selectQuestion(question.id)" href="javascript:void(0)" class="title-content">
              <span>{{question.title}}</span>
            </a>
          </h4>
          <span class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <em>发布时间：</em>
            <span class="count">{{question.gmtCreate | formatDate}}</span>
            <em>阅读数：</em>
            <span class="count">{{question.viewCount}}</span>
            <em>点赞数：</em>
            <span class="count">{{question.likeCount}}</span>
            <em>评论数：</em>
            <span class="count">{{question.commentCount}}</span>
          </span>
          <a
            class="mr-5"
            style="float: right;margin-left:20px;color: #dc3535;"
            href="javascript:void(0)"
            data-toggle="modal" data-target="#exampleModalCenter"
            @click="()=>{currentQuestion=question}"
          >删除</a>
          <a
            style="float: right; "
            href="javascript:void(0)"
            @click="selectQuestion(question.id)"
          >查看</a>
        </div>
        <!-- 修改头像的模态框 -->
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  ref="close"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="modal-image-area">
                  <span class="hint">确定要删除该问题吗？</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-secondary" @click="deleteQuestion()">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../assets/static/date";
export default {
  name: "Question",
  data() {
    return {
      questions: [], // 查询的所有帖子内容
      questionOne: "", // 点击某个问题或帖子的时候传过去
      currentQuestion:"", // 当前question
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get(
      "question/find",
      {
        creator: sessionStorage.getItem("userId"),
        type: 2
      },
      (response) => {
        that.questions = response.data.data;
      }
    );
  },
  methods: {
    // 根据ID查询问题的详细内容
    selectQuestion: function(questionId) {
      let that = this;
      this.$requestApi.get("question/" + questionId, {}, response => {
        that.questionOne = response.data.data;
        that.$router.push({
          name: "PublishInvitation",
          params: { content: that.questionOne }
        });
      });
    },
    // 根据ID删除问题或帖子
    deleteQuestion: function() {
      let that = this;
      this.$requestApi.delete(
        "question/delete",
        {
          id: this.currentQuestion.id,
          userId: sessionStorage.getItem("userId"),
          creator: this.currentQuestion.creator
        },
        response => {
          that.questions.forEach((item, index) => {
            if (item.id == that.currentQuestion.id) {
              that.questions.splice(index, 1);
            }
          });
        }
      );
      this.$refs.close.click();
    }
  },
  filters: {
    formatDate: function(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 14px;
}
.modal-body-custom {
  width: 200px;
  height: 50px;
  align-content: center;
  padding: 0.5rem;
  color: #f37327;
}
.content {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-top: 25px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #3d3d3d;
  height: 90px;
  line-height: 90px;
  border-bottom: 1px solid #e0e0e0;
}
.title-content {
  font-size: 20px;
  color: #4d4d4d;
  flex-shrink: 1;
  word-wrap: break-word;
  word-break: break-word;
}
.media-contain {
  font-size: 13px;
  font-weight: normal;
  color: #999;
}
.count {
  margin-right: 10px;
}
</style>
