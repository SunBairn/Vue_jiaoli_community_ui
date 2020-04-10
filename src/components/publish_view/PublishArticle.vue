<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="col-lg-12 col-md-12 col-sm-12 mt-4 mb-4 head1">
          <span class="head">发表文章</span>
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
      <!-- 标签区 -->
      <div class="tag col-lg-12 col-md-12 col-sm-12">
        <span>添加标签:</span>
        <input class="form-control" type="text" placeholder="输入标签，以英文逗号,分割" v-model="selectedTag" />
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12">
        <span>常用标签</span>
        <div>
          <div class="tag-show" v-for="tag in tags" :key="tag.id" @click="addTag(tag.tagname)">
            <img src="../../assets/icons/tag-fill.svg" alt />
            <span>{{tag.tagname}}</span>
          </div>
        </div>
      </div>
      <!-- 专栏区 -->
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="form-group col-md-5">
          <form class="form-inline">
            <span style="margin:30px 10px 5px -10px;padding-bottom:30px ">添加专栏</span>
            <select
              id="inputState"
              class="form-control"
              style="width:200px"
              v-model="selected"
              @change="selectModel(selected)"
            >
              <option disabled value>请选择专栏</option>
              <option
                v-for="(column) in columns"
                :key="column.id"
                :value="column.name"
              >{{column.name}}</option>
            </select>
          </form>
        </div>
      </div>

      <!-- 上传附件按钮 -->
      <div class="col-lg-12 col-md-12 col-sm-12" v-if="article==null||article==''">
        <form class="form-check-inline">
          <div class="form-group">
            <label>上传附件</label>
            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              ref="fileInputer"
            />
          </div>
        </form>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12" v-if="article!=null&&article.url!=null">
        <em>已上传附件</em>
        <span class="ml-3">
          <a :href="article.url">{{article.url}}</a>
        </span>
      </div>

      <!-- 发布按钮 -->
      <div class="publish-button" v-if="article==''||article==null">
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
  name: "PublishArticle",
  data() {
    return {
      article: "", //编辑跳转过来的内容
      title: "", // 标题
      context: "", //输入的数据
      username: "", // 用户名
      userId: "", // 用户ID
      imageUrl: "", // 图片上传的URL地址
      warningContent: "", // 控制模态框中显示的内容
      file: "",
      selectedTag: "", // 标签框内容
      selected: "", // 选择框,当前是那个专栏被选中
      columnId: "", // 当前选择的专栏ID
      tags: "", // 显示在前端的提示标签
      columns: "", // 显示在前端的专栏
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
    // 编辑跳转过来的内容进行赋值显示
    this.article = this.$route.params.article;
    if (this.article != "" && this.article != null) {
      this.imageUrl = this.article.imageUrl;
      this.context = this.article.content;
      this.title = this.article.title;
      this.selectedTag = this.article.tag;
      this.selected = this.article.column.name;
      this.columnId = this.article.column.id;
      this.$refs.files = this.article.url;
    }

    this.username = sessionStorage.getItem("userName");
    this.userId = sessionStorage.getItem("userId");
    let that = this;
    // 查询标签
    this.$requestApi.get("article/find/tag", {}, function(response) {
      that.tags = response.data.data;
    });
    // 查询专栏
    this.$requestApi.get("article/find/column", {}, function(response) {
      that.columns = response.data.data;
    });
  },
  methods: {
    // 得到当前选择的专栏ID
    selectModel(selected) {
      this.columns.forEach(element => {
        if (element.name == selected) {
          this.columnId = element.id;
        }
      });
    },
    // 绑定@imgAdd event 上传图片
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("username", this.username);
      let that = this;
      fileUploadAction(formdata).then(url => {
        if (url.data.flag != true) {
          this.warningContent = "上传图片失败！";
          this.$refs.myModel.click();
          isShowModal();
        }
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 替换路径
        this.$refs.md.$img2Url(pos, url.data.data);
        // 将图片地址存储起来
        if (that.imageUrl.length == 0) {
          that.imageUrl = url.data.data;
        } else {
          that.imageUrl = that.imageUrl + "," + url.data.data;
        }
      });
    },
    // 点击标签加入到Input框中
    addTag: function(tagName) {
      if (this.selectedTag.length == 0) {
        this.selectedTag = tagName;
      } else {
        this.selectedTag = this.selectedTag + "," + tagName;
      }
    },

    // 发布文章
    publishSubmit: function() {
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
      if (this.columnId == null || this.columnId == "") {
        this.warningContent = "请选择一个专栏";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      // 发出请求
      let that = this;
      var formData = new FormData();
      const file = this.$refs.fileInputer.files[0];
      // 如果文件不为空，则先上传文件
      if (file != null) {
        formData.append("file", file);
        formData.append("username", this.username);
        fileUploadAction(formData).then(function(response) {
          if (response.data.flag != true) {
            that.warningContent = "上传文件失败！";
            isShowModal();
            return;
          }
          that.$requestApi.post(
            "article/add",
            {
              userId: that.userId,
              columnId: that.columnId,
              title: that.title,
              content: that.context,
              imageUrl: that.imageUrl,
              url: response.data.data,
              tag: that.selectedTag
            },
            function(response) {
              if (response.data.flag == true) {
                // 跳转到首页
                that.$router.push({
                  path: "/nav/article"
                });
              } else {
                that.warningContent = "发布文章失败！";
                that.$refs.myModel.click();
                isShowModal();
              }
            }
          );
        });
      } else {
        this.$requestApi.post(
          "article/add",
          {
            userId: that.userId,
            columnId: that.columnId,
            title: that.title,
            content: that.context,
            imageUrl: that.imageUrl,
            url: "",
            tag: that.selectedTag
          },
          function(response) {
            if (response.data.flag == true) {
              // 跳转到首页
              that.$router.push({
                path: "/nav/article"
              });
            } else {
              that.warningContent = "发布文章失败！";
              that.$refs.myModel.click();
              isShowModal();
            }
          }
        );
      }
    },

    // 修改文章
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
      if (this.selected == null || this.selected == "") {
        this.warningContent = "请选择一个专栏";
        this.$refs.myModel.click();
        isShowModal();
        return;
      }
      // 发出修改请求
      let that = this;
      this.$requestApi.put(
        "article/update",
        {
          id : that.article.id,
          columnId: that.columnId,
          title: that.title,
          content: that.context,
          imageUrl: that.imageUrl,
          tag: that.selectedTag
        },
        function(response) {
          if (response.data.flag == true) {
             // 跳转到首页
            that.$router.push({
              path: "/nav/article"
            });
            
           
          } else {
            that.warningContent = "修改文章失败！";
            that.$refs.myModel.click();
            isShowModal();
          }
        }
      );
    }
  },
  components: {}
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
.tag {
  margin: 20px 0px 5px 2px;
}
.tag-show {
  display: inline-block;
  margin: 5px 10px;
  padding: 5px 10px;
  background-color: rgba(0, 128, 11, 0.678);
  cursor: pointer;
  border-radius: 10%;
}
</style>
