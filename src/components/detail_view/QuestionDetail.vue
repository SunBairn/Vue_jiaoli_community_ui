<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="col-lg-9 col-md-19 col-sm-9">
        <h4 class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
          <span>{{question.title}}</span>
        </h4>
        <span class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          作者：
          <span>{{question.user.nickname}}</span>&nbsp;&nbsp;
          | 发布时间：
          <span>{{question.gmtCreate | formatDate}}</span>&nbsp;&nbsp;
          | 阅读数：
          <span>{{question.viewCount}}</span>&nbsp;&nbsp;
          <router-link :to="{}" v-if="question.user.id == userId" style="margin-left:30px">
            <img src="./../../assets/icons/pencil-square.svg" class="edit" />
            <span class="media-contain is-edit">编辑</span>
          </router-link>
        </span>
        <hr />
        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style="margin-bottom:70px"
        >{{question.content}}</div>
        <hr />
        <!-- 点赞和评论 -->
        <div class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul class="list-group list-group-horizontal-md">
            <li class="list-group-item">
              <a
                href="javascript:void(0)"
                data-toggle="question-like"
                data-trigger="focus"
                data-content="亲，登录后才能点赞哦！"
                data-placement="bottom"
                @click="questionLike(questionId,userId)"
              >
                <img src="./../../assets/icons/good.svg" alt width="25px" height="25px" />
                点赞&nbsp;&nbsp;
                <i>{{question.likeCount}}</i>
              </a>
            </li>
            <li class="list-group-item">
              <a href="javascript:void(0)" @click="isShowComment()">
                <img src="./../../assets/icons/comments.svg" alt width="25px" height="25px" />
                评论
              </a>
            </li>
          </ul>
        </div>
        <!-- 评论框 -->
        <div class="col-lg-12 col-md-12 col-sm-12" style="margin-bottom:35px" id="comment">
          <textarea
            class="form-control"
            rows="2"
            id="content"
            placeholder="不要默默地看了，快点评论一下吧~"
            style="font-size:13px"
            v-model="commentContent"
          ></textarea>
          <button
            type="button"
            class="btn btn-secondary btn-sm btn-comment"
            @click="questionComment()"
          >评论</button>
          <button type="button" data-toggle="modal" data-target="#myModal" ref="myModel" hidden></button>
          <!-- Modal 提示模态框-->
          <div class="modal fade" id="myModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content modal-body-custom">
                <div class="modal-body m-auto">{{warningContent}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <span style="margin-right:15px">全部评论</span>
          <em>{{question.commentCount}}</em>
        </div>
        <hr />
        <!-- 一级评论展示 -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="media" v-for="comment in level1Comments" :key="comment.id">
            <a href v-if="comment.user">
              <img :src="comment.user.avatar" class="ml-3 mr-3 avatar" alt="head portrait" />
            </a>
            <div class="media-body">
              <span class="comment-nickname">
                <a href="#" v-if="comment.user">{{ comment.user.nickname}}</a>&nbsp;&nbsp;:&nbsp;
              </span>
              <span class="comment-content">{{comment.content}}</span>
              <br />
              <span class="media-contain">
                <span>{{comment.gmtCreate | formatDate}}</span>
              </span>
              <!-- 回复和点赞二级评论 -->
              <div class="comment-like float-right">
                <a
                  href="javascript:void(0)"
                  class="comment-like"
                  v-if="comment.replyCount!=0"
                  @click="getReply(comment.id)"
                >
                  <span>查看回复</span>
                  <span id="lookReply">({{comment.replyCount}})</span>
                </a>
                <a href="javascript:void(0)" class="comment-like" @click="showReply(comment.id)">
                  <img src="./../../assets/icons/comments.svg" width="20px" height="20px" alt />
                  <span>回复</span>
                </a>
                <a
                  href="javascript:void(0)"
                  class="comment-like"
                  @click="commentLike(comment.id,userId)"
                >
                  <img src="./../../assets/icons/good.svg" width="20px" height="20px" alt />
                  <span :id="'replyLike'+comment.id" v-text="comment.likeCount"></span>
                </a>
              </div>

              <!-- 回复框 -->
              <div
                class="col-lg-12 col-md-12 col-sm-12"
                style="margin-bottom:50px"
                :id="comment.id"
                v-show="isShowReply"
              >
                <textarea
                  class="form-control"
                  rows="2"
                  id="content"
                  style="font-size:12px"
                  v-model="replyContent"
                ></textarea>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm btn-comment"
                  @click="replyComment(comment.id)"
                >回复</button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm btn-comment"
                  @click="hideReply(comment.id)"
                >取消</button>
              </div>

              <!-- 展示回复列表 -->
              <div
                class="col-lg-11 col-sm-11 col-md-11 reply"
                :id="comment.id+'reply'"
                v-show="isShowReplyContent"
              >
                <div
                  class="reply-content"
                  v-for="replyContent in leve12Comments"
                  v-bind:key="replyContent.id"
                >
                  <a href="#" v-if="replyContent.user">
                    {{replyContent.user.nickname}}&nbsp;&nbsp;
                    <strong>:</strong>
                  </a>回复
                  <a href="#" v-if="comment.user">
                    {{comment.user.nickname}}&nbsp;&nbsp;
                    <strong>:</strong>
                  </a>
                  <span>{{replyContent.content}}</span>
                </div>
              </div>

              <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display:inline-block" />
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 offset-5 more-comment">
          <a
            href="javascript:void(0)"
            style="color:#f37327"
            @click="changeLevel1CommentPage()"
            v-if="isShowMoreComment"
          >查看更多评论</a>
        </div>
      </div>

      <!--右边布局-->
      <div class="col-lg-3 col-md-3 col-sm-3 mt-3" style="border-left:1px solid #e6e6e6">
        <div class="media">
          <a href="#">
            <img class="avatar1 mr-3" :src="question.user.avatar" />
          </a>
          <div class="media-body mt-2">
            <h6>
              <a href="#" style="color:#444">{{question.user.nickname}}</a>
            </h6>
            <a href>
              <span style="font-size:12px; color:blue">Ta的个人主页></span>
            </a>
            <span style="font-size:14px;" class="ml-3">粉丝：</span>
            <em>{{question.user.fanscount}}</em>
          </div>
        </div>
        <hr class="ml-2" />
        <h4>相关问题</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "./../../assets/static/date";
// 控制模态框（用来提示点赞和评论的校验结果）的展示与隐藏
function isShowModal() {
  $("#myModal").modal("show");
  setTimeout(function() {
    $("#myModal").modal("hide");
  }, 1500);
}
// 用户没登录不允许点赞
$(document).ready(function() {
  let userId = sessionStorage.getItem("userId");
  if (userId == null || userId == "") {
    $('[data-toggle="question-like"]').popover();
  }
});
function toggleComment() {
  $("#comment").toggle("slow");
}
function toggleReplayList(commentId) {
  $("#" + commentId + "reply").toggle("slow");
}
function showReply(commentId) {
  $("#" + commentId).show("slow");
}
function hideReply(commentId) {
  $("#" + commentId).hide("slow");
}

// VUE
export default {
  name: "QuestionDetail",
  data() {
    return {
      questionId: "", // 问题ID
      question: {
        user: {}
      }, // 问题
      userId: "", // 用户ID(从sessionStorage获得)
      isShowReply: false, // 控制回复框默认不显示
      isShowReplyContent: false, // 控制回复列表默认不展示展示
      isShowMoreComment: "", // 控制是否显示 “查看更多评论”
      level1Comments: [], // 一级评论
      leve12Comments: [], // 回复（二级评论）
      level1CommentsPage: 0, // 控制一级评论的分页
      commentCount: 0, // 一级评论总数
      commentContent: "", // 一级评论内容(评论框里的)
      warningContent: "", // 控制模态框中显示的内容
      replyContent: "" // 回复内容
    };
  },
  created: function() {
    let that = this;
    this.userId = sessionStorage.getItem("userId");
    that.questionId = this.$route.params.id;
    this.$requestApi.get("question/" + that.questionId, {}, function(res) {
      that.question = res.data.data.question;
      that.commentCount = res.data.data.commentCount;
    });
    this.$requestApi.get(
      "question/comment/find/" + that.level1CommentsPage,
      {
        type: 1,
        parentId: that.questionId
      },
      function(response) {
        that.level1Comments = response.data.data;
      }
    );
  },
  updated: function() {
    // 解决是否要显示查看更多评论的按钮
    if (this.level1Comments.length < this.commentCount) {
      this.isShowMoreComment = true;
    } else {
      this.isShowMoreComment = false;
    }
  },
  methods: {
    // 切换评论框
    isShowComment: function() {
      toggleComment();
    },
    // 切换回复框
    showReply: function(commentId) {
      showReply(commentId);
    },
    hideReply: function(commentId) {
      hideReply(commentId);
    },

    // 改变一级评论页码数和追加数据
    changeLevel1CommentPage: function() {
      this.level1CommentsPage += 1;
      let that = this;
      this.$requestApi.get(
        "question/comment/find/" + that.level1CommentsPage,
        {
          type: 1,
          parentId: that.questionId
        },
        function(response) {
          response.data.data.forEach((item, index) => {
            that.level1Comments.push(item);
          });
        }
      );
    },
    // 给问题点赞
    questionLike: function(questionId, liketor) {
      let that = this;
      // 如果用户没登录，则弹出提示不能点赞
      if (liketor == null || liketor == "") {
        return;
      }
      this.$requestApi.get(
        "question/like",
        {
          questionId: questionId,
          liketor: that.userId
        },
        function(response) {
          console.log(response);
          if (response.data.flag == true) {
            that.question.likeCount += 1;
          } else {
            that.warningContent = "亲，你已经点过赞了哦！";
            that.$refs.myModel.click();
            isShowModal();
          }
        }
      );
    },
    // 评论问题
    questionComment: function() {
      if (this.userId == null || this.userId == "") {
        this.warningContent = "登录后才能评论哦！";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      if (this.commentContent == null || this.commentContent == "") {
        this.warningContent = "请输入评论内容！";
        this.$refs.myModel.click();
        isShowModal();
      } else {
        let that = this;
        this.$requestApi.post(
          "question/comment/add",
          {
            content: this.commentContent,
            parentId: this.questionId,
            type: 1,
            commentator: this.userId,
            questionId: this.questionId
          },
          function(response) {
            if (response.data.flag == true) {
              that.warningContent = "评论成功！";
              that.$refs.myModel.click();
              isShowModal();
              // 定义一个json数组数据添加到后面去
              let comment = {
                user: {
                  avatar: sessionStorage.getItem("avatar"),
                  nickname: sessionStorage.getItem("nickName")
                },
                content: that.commentContent,
                replyCount: 0,
                // 获取当前时间戳
                gmtCreate: Date.parse(new Date())
              };
              // 将当前评论显示到最后
              that.level1Comments.push(comment);
              console.log(that.level1Comments);
              that.question.commentCount += 1;
            } else {
              that.warningContent = "评论失败，请稍后评论！";
              that.$refs.myModel.click();
              isShowModal();
            }
          }
        );
      }
    },
    // 获取回复,parentId 为当前评论的ID
    getReply: function(parentId) {
      let that = this;
      this.$requestApi.get(
        "question/comment/find/reply",
        {
          parentId: parentId,
          questionId: this.questionId
        },
        function(response) {
          console.log(response);
          that.leve12Comments = response.data.data;
          toggleReplayList(parentId);
        }
      );
    },

    // 回复评论
    replyComment: function(parentId) {
      if (this.userId == null || this.userId == "") {
        this.warningContent = "登录后才能回复哦！";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      if (this.replyContent == null || this.replyContent == "") {
        this.warningContent = "请输入回复内容！";
        this.$refs.myModel.click();
        isShowModal();
      } else {
        let that = this;
        this.$requestApi.post(
          "question/comment/add",
          {
            content: this.replyContent,
            parentId: parentId,
            type: 2,
            commentator: this.userId,
            questionId: this.questionId
          },
          function(response) {
            if (response.data.flag == true) {
              that.warningContent = "回复成功！";
              that.$refs.myModel.click();
              isShowModal();
            } else {
              that.warningContent = "回复失败，请稍后回复！";
              that.$refs.myModel.click();
              isShowModal();
            }
          }
        );
      }
    },

    //点赞评论
    commentLike: function(commentId, liketor) {
      let that = this;
      // 如果用户没登录，则弹出提示不能点赞
      if (liketor == null || liketor == "") {
        return;
      }
      this.$requestApi.get(
        "question/comment/like",
        {
          commentId: commentId,
          liketor: that.userId
        },
        function(response) {
          if (response.data.flag == true) {
            $("#replyLike"+commentId).text(parseInt($("#replyLike"+commentId).text()) + 1);
          } else {
            that.warningContent = "亲，你已经点过赞了哦！";
            that.$refs.myModel.click();
            isShowModal();
            // 动态变化点赞数
          }
        }
      );
    }
  },
  filters: {
    formatDate: function(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.main {
  margin: 10px auto 30px auto;
  background-color: white;
}
.media-contain {
  margin-top: 10px;
  font-size: 12px;
  font-weight: normal;
  color: #999;
}
.edit {
  margin-bottom: 5px;
  width: 20px;
  height: 20px;
  opacity: 0.5;
}
.is-edit {
  font-size: 14px;
}
.is-edit:hover {
  color: #f37327;
}
a {
  text-decoration: none;
  color: #999;
}
a:hover {
  color: #333;
}
.list-group-item {
  border: none;
  font-size: 13px;
}
.comment-nickname {
  font-size: 14px;
  color: #4a90e2;
}
.comment-content {
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
}
.media-contain {
  font-size: 13px;
  font-weight: normal;
  color: #999;
}
.comment-like {
  margin-top: 3px;
  font-size: 12px;
  display: inline-block;
  right: 0;
  color: #999;
  padding: 0 5px 0 5px;
}
.more-comment {
  font-size: 12px;
  color: #f37327;
  margin-top: 35px;
  margin-bottom: 50px;
}
.btn-comment {
  float: right;
  margin: 10px 10px;
  border-radius: 20%;
}
.avatar {
  width: 45px;
  height: 45px;
  cursor: pointer;
  border-radius: 50%;
}
.avatar1 {
  width: 58px;
  height: 58px;
  cursor: pointer;
  border-radius: 50%;
}
.modal-body-custom {
  width: 200px;
  height: 100px;
  align-content: center;
  padding: 0.5rem;
  color: #f37327;
}
.reply {
  background-color: rgba(0, 0, 0, 0.04);
  font-size: 12px;
  margin: 20px 0 10px 0;
  border-left: rgba(0, 0, 0, 0.1) solid 10px;
}
.reply > .reply-content {
  padding: 10px 0 10px 0;
}
.reply a {
  display: inline-block;
  color: royalblue;
  margin: 0 10px 0 10px;
}
</style>
