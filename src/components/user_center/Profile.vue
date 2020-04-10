<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <!-- 顶部标题 -->
        <div>
          <h3 class="title">个人资料</h3>
        </div>
        <!-- 中间用户信息 -->
        <div class="media">
          <img :src="user.avatar" class="mr-3 head" alt data-toggle="modal" data-target="#exampleModalCenter" />
          <div class="media-body mt-4 info">
            <div class="id_card" style="display:inline-block">
              <span class="id_name">ID:&nbsp;&nbsp;{{user.nickname}}</span>
              <a href class="user_home" style="float:right">个人主页></a>
            </div>
            <div>
              <span style="margin-right:30px">
                关注&nbsp;
                <em>{{user.followcount}}</em>
              </span>
              <span style="margin-right:30px">
                粉丝&nbsp;
                <em>{{user.fanscount}}</em>
              </span>
              <span data-toggle="modal" data-target="#exampleModalCenter">
                <a href="javascript:void(0)">修改头像</a>
              </span>
            </div>
          </div>
        </div>
        <!-- 修改框和显示框动态切换 -->
        <div v-if="!isShowModify">
          <div class="nick">
            <span>昵称: &nbsp;&nbsp; {{user.nickname}}</span>
            <span class="mod" @click="modifyInfo()">修改资料</span>
          </div>
          <div class="nick">
            <ul class="self">
              <li class="comon">姓名:&nbsp;&nbsp;{{user.name}}</li>
              <li class="comon">手机号:&nbsp;&nbsp;{{user.mobile}}</li>
              <li class="comon">邮箱:&nbsp;&nbsp;{{user.email}}</li>
              <li class="comon">性别:&nbsp;&nbsp;{{user.sex}}</li>
              <li class="comon">生日:&nbsp;&nbsp;{{user.birthday | formatDate}}</li>
              <li class="comon">兴趣爱好:&nbsp;&nbsp;{{user.interest}}</li>
            </ul>
          </div>
        </div>
        <!-- 修改框和显示框动态切换 -->
        <div class="nick" v-else>
          <form>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">昵称</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="inputEmail3" v-model="nickname" />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">姓名</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="inputEmail3" v-model="name" />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">手机号</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="inputEmail3" v-model="mobile" />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">邮箱</label>
              <div class="col-sm-4">
                <input type="email" class="form-control" id="inputEmail3" v-model="email" />
              </div>
            </div>
            <div class="form-group row" id="sex">
              <label for="inputEmail3" class="col-sm-1 col-form-label">性别</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  value="男"
                  v-model="sex"
                />
                <label class="form-check-label" for="inlineRadio1">男</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  value="女"
                  v-model="sex"
                />
                <label class="form-check-label" for="inlineRadio2">女</label>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-1 col-form-label">生日</label>
              <div class="col-sm-4">
                <input type="date" class="form-control" id="inputEmail3" v-model="birthday" />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-lg-1 col-form-label">爱好</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="inputEmail3" v-model="interest" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-6">
                <button
                  type="button"
                  class="btn btn-secondary mr-5"
                  @click="()=>{isShowModify=false}"
                >取消</button>
                <button type="submit" class="btn btn-primary" @click="updateUser();return false;">确定</button>
              </div>
            </div>
          </form>
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
                <h5 class="modal-title" id="exampleModalCenterTitle">上传头像</h5>
                <button
                  ref="close"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="function(){isShowImg=false}"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" v-if="!isShowImg">
                <div class="modal-image-area" @click="openFileDailog()">
                  <img src="../../assets/icons/upload.svg" alt class="upload-icon1" />
                  <span class="hint">点击此处上传头像</span>
                  <input
                    id="img_file"
                    type="file"
                    ref="fileInputer"
                    style="display:none"
                    @change="changeImg()"
                  />
                </div>

                <p class="img-tip1">图片宽度*高度至少为150*150像素，大小不超过2MB</p>
              </div>
              <div class="modal-body" v-else>
                <img src id="selected_img" width="498px" height="198.444px" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="function(){isShowImg=false}"
                >取消</button>
                <button type="button" class="btn btn-secondary" @click="uploadAvatar()">上传并保存</button>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
// 选择图片后显示
var regexImageFiler;
var imgReaderl = new FileReader();
regexImageFiler = /^(?:image\/bmp|image\/png|image\/jpeg|image\/jpg|\/gif)$/i;
imgReaderl.onload = function(evt) {
  $("#selected_img").attr("src", evt.target.result);
};
function isShowModal() {
  $("#myModal").modal("show");
  setTimeout(function() {
    $("#myModal").modal("hide");
  }, 1000);
}

import { formatDate } from "../../assets/static/date";
import { fileUploadAction } from "../../api/https";
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      userId: "", // 用户ID
      user: "", // 用户信息
      isShowImg: "", // 是否显示图片
      isShowModify: false, // 是否显示修改用户信息的组件
      warningContent: "", // 模态框显示的内容
      file: "", // 保存文件的内容

      nickname: "", // 用户昵称
      name: "", // 姓名
      mobile: "", // 手机号
      email: "", // 邮箱
      sex: "", // 性别
      birthday: "", // 生日
      interest: "" // 爱好
    };
  },
  created: function() {
    let that = this;
    this.userId = sessionStorage.getItem("userId");
    this.$requestApi.get("user/find/" + this.userId, {}, function(response) {
      that.user = response.data.data;
    });
  },
  methods: {
    // 打开文件选择框
    openFileDailog: function() {
      document.getElementById("img_file").click();
    },

    // 改变文件状态
    changeImg: function() {
      var imgfFile = $("#img_file").prop("files")[0];
      if (!regexImageFiler.test(imgfFile.type)) {
        alert("选择有效图片");
        return;
      }
      this.file = imgfFile;
      imgReaderl.readAsDataURL(imgfFile);
      this.isShowImg = true;
    },

    // 上传头像
    uploadAvatar: function() {
      let that = this;
      var formData = new FormData();
      const file = this.file;
      if (file != null) {
        formData.append("file", file);
        formData.append("username", this.user.nickname);
        fileUploadAction(formData).then(function(response) {
          console.log(response);
          if (response.data.flag == false) {
            that.warningContent = "头像修改失败！";
            that.$refs.myModel.click();
            isShowModal();
            return;
          } else {
            let that2 = that;
            let avatar = response.data.data;
            // 这里已经上传成功，修改用户的头像地址,同时更新sessionStorage里面的avatar
            that.$requestApi.put(
              "user/update/avatar",
              {
                id: that.userId,
                avatar: avatar
              },
              function(response) {
                if (response.data.flag == true) {
                  let oldAvatar = sessionStorage.getItem("avatar");
                  sessionStorage.setItem("avatar", avatar);
                  // 删除原头像文件
                  axios
                    .delete("http://localhost:9000/file/delete", {
                      params: {
                        fileUrl: oldAvatar,
                      }
                    })
                    .then(function(response) {
                      console.log(response);
                    });
                }
              }
            );
            that.$refs.close.click();
            that.user.avatar = response.data.data;
            that.warningContent = "修改成功";
            that.$refs.myModel.click();
            isShowModal();
          }
        });
      }
    },

    // 点击修改资料
    modifyInfo: function() {
      let data = new Date(this.user.birthday);
      let formatData = formatDate(data, "yyyy-MM-dd");
      this.isShowModify = true;
      this.nickname = this.user.nickname;
      this.name = this.user.name;
      this.mobile = this.user.mobile;
      this.email = this.user.email;
      this.sex = this.user.sex;
      this.birthday = formatData;
      this.interest = this.user.interest;
    },

    // 修改用户信息
    updateUser: function() {
      let that = this;
      this.$requestApi.put(
        "user/update",
        {
          id: this.userId,
          nickname: this.nickname,
          name: this.name,
          mobile: this.mobile,
          email: this.email,
          sex: this.sex,
          birthday: this.birthday,
          interest: this.interest
        },
        function(response) {
          if (response.data.flag == true) {
            that.$refs.myModel.click();
            that.warningContent = "编辑保存成功";
            isShowModal();
            that.user.nickname = that.nickname;
            that.user.name = that.name;
            that.user.mobile = that.mobile;
            that.user.email = that.email;
            that.user.sex = that.sex;
            that.user.birthdat = that.birthdat;
            that.user.interest = that.interest;
            that.isShowModify = false;
          } else {
            that.$refs.myModel.click();
            that.warningContent = "修改失败";
            isShowModal();
            that.isShowModify = false;
          }
        }
      );
    }
  },
  filters: {
    formatDate: function(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  color: #3337ea;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #3d3d3d;
  height: 90px;
  line-height: 90px;
  border-bottom: 1px solid #e0e0e0;
}
.info {
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}
.head {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
.id_name {
  float: left;
  font-size: 18px;
  color: #999;
  margin-right: 16px;
  margin-top: 3px;
}
.user_home {
  font-size: 18px;
  color: #3399ea;
  padding-right: 9.3px;
  margin-top: 3px;
}

.modal-body {
  border: 0;
  margin: 0;
  padding: 0;
}
.modal-image-area {
  position: relative;
  box-sizing: border-box;
  padding: 35px;
  height: 170px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
}
.upload-icon1 {
  display: block;
  margin: 0 auto 6px;
  width: 42px;
  height: 42px;
  overflow: hidden;
}
.hint {
  display: block;
  padding: 15px;
  font-size: 14px;
  color: #666;
  line-height: 30px;
}
.img-tip1 {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
  margin-bottom: 4px;
  margin-top: 4px;
}
.nick {
  font-size: 16px;
  margin-left: 118px;
  padding: 20px 0 0 0;
}
.mod {
  float: right;
  color: #3399ea;
  cursor: pointer;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.comon {
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  color: #4d4d4d;
}
.modal-body-custom {
  width: 200px;
  height: 50px;
  align-content: center;
  padding: 0.5rem;
  color: #f37327;
}
</style>
