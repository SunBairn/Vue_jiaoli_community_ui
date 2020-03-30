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
        <hr  />
        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style="margin-bottom:70px"
        >{{question.content}}</div>
        <hr />
        <!-- 点赞和评论 -->
        <div class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul class="list-group list-group-horizontal-md">
            <li class="list-group-item">
              <a href="javascript:void(0)">
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
          ></textarea>
          <button type="button" class="btn btn-secondary btn-sm btn-comment">评论</button>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <span style="margin-right:15px">全部评论</span>
          <em>{{question.commentCount}}</em>
        </div>
        <hr  />
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="media" v-for="comment in question.questionCommentList" :key="comment.id">
            <a href>
              <img :src="comment.user.avatar" class="ml-3 mr-3 avatar" alt="head portrait" />
            </a>
            <div class="media-body">
              <span class="comment-nickname">
                <a href="#">{{ comment.user.nickname}}</a>&nbsp;&nbsp;:&nbsp;
              </span>
              <span class="comment-content">{{comment.content}}</span>
              <br />
              <span class="media-contain">
                <span>{{comment.gmtCreate | formatDate}}</span>
              </span>
              <!-- 回复和点赞二级评论 -->
              <div class="comment-like float-right">
                <a href="javascript:void(0)" class="comment-like" @click="showReply(comment.id)">
                  <img src="./../../assets/icons/comments.svg" width="20px" height="20px" alt />
                  <span>回复</span>
                </a>
                <a href="javascript:void(0)" class="comment-like">
                  <img src="./../../assets/icons/good.svg" width="20px" height="20px" alt />
                  <span>{{comment.likeCount}}</span>
                </a>
              </div>
              <div
                class="col-lg-12 col-md-12 col-sm-12"
                style="margin-bottom:35px"
                :id="comment.id"
                v-show="isShowReply"
              >
                <textarea class="form-control" rows="2" id="content" style="font-size:12px"></textarea>
                <button type="button" class="btn btn-secondary btn-sm btn-comment">回复</button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm btn-comment"
                  @click="hideReply(comment.id)"
                >取消</button>
              </div>
              <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display:inline-block" />
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 offset-5 more-comment">
          <a href="javascript:void(0)" style="color:#f37327">查看更多评论</a>
        </div>
      </div>

      <!--右边布局-->
      <div class="col-lg-3 col-md-3 col-sm-3 mt-3" style="border-left:1px solid #e6e6e6">
        <div class="media">
          <a href="#">
            <img class="avatar1 mr-3" :src="question.user.avatar" />
          </a>
          <div class="media-body mt-2">
            <h6 >
              <a href="#" style="color:#444">{{question.user.nickname}}</a>
            </h6>
            <a href="">
              <span style="font-size:12px; color:blue">Ta的个人主页></span>
            </a>
            <span style="font-size:14px;" class="ml-3">粉丝：</span><em>{{question.user.fanscount}}</em>
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
function toggleComment() {
  $("#comment").toggle("slow");
}
function showReply(commentId) {
  $("#" + commentId).show("slow");
}
function hideReply(commentId) {
  $("#" + commentId).hide("slow");
}
export default {
  name: "QuestionDetail",
  data() {
    return {
      questionId: "",
      question: "", // 问题
      userId: "", // 用户ID
      isShowReply: false // 控制是否显示和默认不显示
    };
  },
  created: function() {
    let that = this;
    this.userId = sessionStorage.getItem("userId");
    that.questionId = this.$route.params.id;
    this.$requestApi.get("question/" + that.questionId, {}, function(res) {
      console.log(res);
      that.question = res.data.data;
    });
  },
  methods: {
    isShowComment: function() {
      toggleComment();
    },
    showReply: function(commentId) {
      showReply(commentId);
    },
    hideReply: function(commentId) {
      hideReply(commentId);
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
  font-size: 10px;
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
</style>
