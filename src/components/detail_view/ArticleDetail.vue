<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="col-lg-9 col-md-19 col-sm-9">
        <h4 class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
          <span>{{article.title}}</span>
        </h4>
        <span class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          作者：
          <span>{{article.user.nickname}}</span>&nbsp;&nbsp;
          | 发布时间：
          <span>{{article.gmtCreate | formatDate}}</span>&nbsp;&nbsp;
          | 阅读数：
          <span>{{article.viewCount}}</span>&nbsp;&nbsp;
          <router-link :to="{name:'PublishArticle',params:{'article':this.article}}" v-if="article.user.id == userId" style="margin-left:30px">
            <img src="./../../assets/icons/pencil-square.svg" class="edit" />
            <span class="media-contain is-edit">编辑</span>
          </router-link>
        </span>
        <hr />
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:70px">
          <mavon-editor
            class="editor"
            :value="article.content"
            :subfield="prop.subfield"
            :defaultOpen="prop.defaultOpen"
            :toolbarsFlag="prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle"
          />
        </div>
        <hr />
        <div class="col-lg-12 col-md-12 col-sm-12 mt-2 ml-2" v-if="article.url!=null&& article.url!=''">
          <a :href="article.url">
            <button type="botton" class="btn btn-secondary">下载附件</button>
            <span>{{fileName}}</span>
          </a>
        </div>
        <!-- 点赞和评论 -->
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="tag-show" v-for="(tag,index) in tags" :key="index">
            <img src="../../assets/icons/tag-fill.svg" alt />
            <span>{{tag}}</span>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 ml-2 mt-3" v-if="article.column">
          <strong>
            所属专栏：
            <em>{{article.column.name}}</em>
          </strong>
        </div>
        <div class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul class="list-group list-group-horizontal-md">
            <li class="list-group-item">
              <a
                href="javascript:void(0)"
                data-toggle="article-like"
                data-trigger="focus"
                data-placement="bottom"
                @click="questionLike(articleId,userId)"
              >
                <img src="./../../assets/icons/good.svg" alt width="25px" height="25px" />
                点赞&nbsp;&nbsp;
                <i>{{article.likeCount}}</i>
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
          <em>{{article.commentCount}}</em>
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
                <span>{{comment.publishdate | formatDate}}</span>
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
            <img class="avatar1 mr-3" :src="article.user.avatar" />
          </a>
          <div class="media-body mt-2">
            <h6>
              <a href="#" style="color:#444">{{article.user.nickname}}</a>
            </h6>
            <a href>
              <span style="font-size:12px; color:blue">Ta的个人主页></span>
            </a>
            <span style="font-size:14px;" class="ml-3">粉丝：</span>
            <em>{{article.user.fanscount}}</em>
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
// $(document).ready(function() {
//   let userId = sessionStorage.getItem("userId");
//   if (userId == null || userId == "") {
    
//   }
// });
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
  name: "ArticleDetail",
  data() {
    return {
      articleId: "", // 文章ID
      fileName:"", // 文件名
      tags: [], // 展示文章的标签
      article: {
        user: {},
        column: {}
      }, // 问题
      userId: "", // 用户ID(从sessionStorage获得)
      isShowReply: false, // 控制回复框默认不显示
      isShowReplyContent: false, // 控制回复列表默认不展示展示
      isShowMoreComment: "", // 控制是否显示 “查看更多评论”
      level1Comments: [], // 一级评论
      leve12Comments: [], // 回复（二级评论）
      level1CommentsPage: 0, // 控制一级评论的分页
      commentContent: "", // 一级评论内容(评论框里的)
      warningContent: "", // 控制模态框中显示的内容
      replyContent: "" // 回复内容
    };
  },
  created: function() {
    let that = this;
    this.userId = sessionStorage.getItem("userId");
    that.articleId = this.$route.params.id;
    this.$requestApi.get("article/find/" + that.articleId, {}, function(res) {
      that.article = res.data.data;
      if (res.data.data.tag != null) {
        that.tags = that.article.tag.split(",");
      }
      let index = res.data.data.url.lastIndexOf("\/");
      that.fileName = res.data.data.url.substring(index+1,res.data.data.url.length)
    });
    this.$requestApi.get(
      "article/comment/find/" + that.level1CommentsPage,
      {
        type: 1,
        parentId: that.articleId
      },
      function(response) {
        if (response.data.data.length < 10) {
          that.isShowMoreComment = false;
        } else {
          that.isShowMoreComment = true;
        }
        that.level1Comments = response.data.data;
      }
    );
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
        "article/comment/find/" + that.level1CommentsPage,
        {
          parentId: that.articleId
        },
        function(response) {
          if (response.data.data.length < 10) {
            that.isShowMoreComment = false;
          } else {
            that.isShowMoreComment = true;
          }
          response.data.data.forEach((item, index) => {
            that.level1Comments.push(item);
          });
        }
      );
    },
    // 给问题点赞
    questionLike: function(articleId, liketor) {
      let that = this;
      // 如果用户没登录，则弹出提示不能点赞
      if (liketor == null || liketor == "") {
        this.warningContent="登录后才能点赞哦！",
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      this.$requestApi.get(
        "article/like",
        {
          articleId: articleId,
          liketor: that.userId
        },
        function(response) {
          if (response.data.flag == true) {
            that.article.likeCount += 1;
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
          "article/comment/add",
          {
            content: this.commentContent,
            parentId: this.articleId,
            type: 1,
            userId: this.userId,
            articleId: this.articleId
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
              that.article.commentCount += 1;
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
        "article/comment/find/reply",
        {
          parentId: parentId,
          articleId: this.articleId
        },
        function(response) {
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
          "article/comment/add",
          {
            content: this.replyContent,
            parentId: parentId,
            type: 2,
            commentator: this.userId,
            articleId: this.articleId
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
        "article/comment/like",
        {
          commentId: commentId,
          liketor: that.userId
        },
        function(response) {
          if (response.data.flag == true) {
            $("#replyLike" + commentId).text(
              parseInt($("#replyLike" + commentId).text()) + 1
            );
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
  computed: {
    // 解析器配置
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false, // 是否允许编辑
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
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
  width: 100%;
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
.editor {
  z-index: 1;
  background-color: white;
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
.tag-show {
  display: inline-block;
  margin: 10px 10px 0px 10px;
  padding: 5px 10px;
  background-color: rgba(0, 128, 11, 0.678);
  cursor: pointer;
  border-radius: 10%;
}
</style>
