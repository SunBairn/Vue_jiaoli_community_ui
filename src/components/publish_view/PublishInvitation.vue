<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="col-lg-12 col-md-12 col-sm-12 mt-4 mb-4 head1">
          <span class="head">发表新帖</span>
        </div>
      </div>
      <!-- 标题 -->
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">标题</span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            style="font-weight:900;font-size:20px"
            v-model="title"
          />
        </div>
      </div>
      <!-- 编辑区 -->
      <div class="col-lg-12 col-md-12 col-sm-12">
        <mavon-editor
          v-model="context"
          ref="md"
          @imgAdd="$imgAdd"
          :toolbars="toolbars"
          class="editor"
        ></mavon-editor>
      </div>
      <!-- 发布按钮 -->
      <div class="publish-button" v-if="question==''||question==null">
        <button type="button" class="btn btn-primary" @click="publishSubmit()">立即发布</button>
      </div>

      <!-- 修改按钮 -->
      <div class="publish-button" v-else>
        <button type="button" class="btn btn-primary" @click="updateSubmit()">立即修改</button>
      </div>

      <!-- 控制模态框的显示与隐藏 -->
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
  </div>
</template>

<script>
import { fileUploadAction } from "../../api/https";
function isShowModal() {
  $("#myModal").modal("show");
  setTimeout(function() {
    $("#myModal").modal("hide");
  }, 1500);
}
export default {
  name: "PublishInvitation",
  data() {
    return {
      title: "", // 标题
      context: "", //输入的数据
      username: "", // 用户名
      warningContent: "", // 控制模态框中显示的内容
      question:"", // 编辑跳转过来的参数
      // 编辑器的一些属性
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  created: function() {
    this.username = sessionStorage.getItem("userName");
    this.question = this.$route.params.content;
    if(this.question!=""&&this.question!=null){
      this.context = this.question.content;
      this.title = this.question.title;
    }
  },
  methods: {
    // 绑定@imgAdd event 上传图片
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("username", this.username);
      fileUploadAction(formdata).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 替换路径
        this.$refs.md.$img2Url(pos, url.data.data);
      });
    },

    // 发布帖子
    publishSubmit: function() {
      if (this.title == null || this.title == "") {
        this.warningContent = "标题不能为空！";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      if(this.context == null || this.context == ""){
        this.warningContent = "输入了内容才能发表帖子哦！"
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      // 发出请求
      let that = this;
      this.$requestApi.post(
        "question/add/1",
        {
          "content": this.context,
          "title": this.title,
          "creator" : sessionStorage.getItem("userId"),
        },
        function(response){
          if(response.data.flag==true){
            that.$router.push({
              path: "/nav/life",
            });
          }else{
            that.warningContent = "发布帖子失败！"
            that.$refs.myModel.click();
            isShowModal();
          }
        }
      );
    },
    // 修改问题
    updateSubmit: function() {
      if (this.title == null || this.title == "") {
        this.warningContent = "标题不能为空！";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      if (this.context == null || this.context == "") {
        this.warningContent = "输入了内容才能发布哦！";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      // 发出请求
      let that = this;
      this.$requestApi.put(
        "question/update",
        {
          id : this.question.id,
          type: this.question.type,
          content: this.context,
          title: this.title,
        },
        function(response) {
          if (response.data.flag == true) {
            that.$router.push({
              path: "/nav/invitation"
            });
          } else {
            that.warningContent = "发布问题失败！";
            that.$refs.myModel.click();
            isShowModal();
          }
        }
      );
    }
  },
  components: {},
};
</script>

<style scoped>
.main {
  width: 100%;
  margin: 10px auto 60px auto;
  background-color: white;
}
.head1 {
  border-bottom: rgba(0, 0, 0, 0.2) solid 1px;
  padding: 0;
}
.head {
  padding: 0px 40px 10px 40px;
  color: rgba(40, 100, 0, 0.815);
  font-size: 18px;
  font-weight: 550;
  display: inline-block;
  border-bottom: darkgreen solid 2px;
  cursor: pointer;
}
.editor {
  height: 500px;
  z-index: 1;
}
.publish-button {
  margin: 20px;
}
.modal-body-custom {
  width: 200px;
  height: 100px;
  align-content: center;
  padding: 0.5rem;
  color: #f37327;
}
</style>
