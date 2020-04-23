<template>
  <div class="main container-fluid">
    <div class="row">
        <div class="content col-sm-12 col-md-9 col-lg-9">
          <div class="svg">
            <h5>
              <img src="./../assets/icons/command.svg" alt="" width="50px" height="25px" style="margin-bottom:2px"  >
              <span>{{activename}}</span>
            </h5>
         </div>
          <ul class="nav justify-content-end" v-if="flag">
            <li class="nav-item">
              <a href="javascript:void(0);"><span class="nav-link pointer" @click="changeSort('new')" :class="{clicked : newActive}">最新</span></a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);"><span class="nav-link pointer" @click="changeSort('hot')" :class="{clicked : hotActive}">热门</span></a>
            </li>
            <li class="nav-item" v-if="activename=='新生问答'">
              <a href="javascript:void(0);"><span class="nav-link pointer" @click="changeSort('await')" :class="{clicked : awaitActive}">等待回复</span></a>
            </li>
          </ul>
          <hr />
          <!--动态组件，将组件缓存起来 -->
          <keep-alive>
            <component :is="currentView" v-bind:currentSort="currentSort"></component>
          </keep-alive>
        </div>
        <div class="right col-sm-12 col-md-3 col-lg-3 d-none d-md-block">
          <IndexRightCommon></IndexRightCommon>
        </div>
      </div>
  </div>
</template>

<script>
import InstationNotice from "../components/show_view/InstationNotice";
import SchoolActivity from "../components/show_view/SchoolActivity";
import SchoolLife from "../components/show_view/SchoolLife";
import StudentQuestion from "../components/show_view/StudentQuestion";
import ArticleForum from "../components/show_view/ArticleForum";
export default {
  name: "IndexCommon",
  data() {
    return {
      newActive:true,
      hotActive:false,
      awaitActive:false,
      currentSort:"new",
      componentsArry: ["SchoolLife", "StudentQuestion","SchoolActivity","ArticleForum","InstationNotice"]
    };
  },
  components: {
    SchoolLife,
    StudentQuestion,
    SchoolActivity,
    ArticleForum,
    InstationNotice,
  },
  methods: {
    // 点击最新那里的导航时变色和跳转
    changeSort(sort){
      if(sort=="new"){
        this.currentSort="new";
        this.newActive=true;
        this.hotActive=false;
        this.awaitActive=false;
      }
      if(sort=="hot"){
        this.currentSort="hot";
        this.newActive=false;
        this.hotActive=true;
        this.awaitActive=false;
      }
      if(sort=="await"){
        this.currentSort="await";
        this.newActive=false;
        this.hotActive=false;
        this.awaitActive=true;
      }
    }
  },
  computed: {
    activename: function() {
      let routeParm = this.$route.params.name;
      if (routeParm == "life") {
        return "校园生活";
      }
      if (routeParm == "question") {
        return "新生问答";
      }
      if (routeParm == "activity") {
        return "校园活动";
      }
      if (routeParm == "article") {
        return "考研论坛";
      }
      if (routeParm == "notice") {
        return "站内公告";
      }
      return "校园生活";
    },
    currentView: function() {
      let routeParm = this.$route.params.name;
      if (routeParm == "life") {
        return this.componentsArry[0];
      }
      if (routeParm == "question") {
        return this.componentsArry[1];
      }
      if (routeParm == "activity") {
        return this.componentsArry[2];
      }
      if (routeParm == "article") {
        return this.componentsArry[3];
      }
      if (routeParm == "notice") {
        return this.componentsArry[4];
      }
      return this.componentsArry[0];
    },
    // 判断如果是校园活动和站内公告的时候不显示最新，热门和等待回复
    flag: function(){
      if(this.activename!="校园活动" && this.activename!="站内公告"){
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
@import "../assets/static/common.css";
.main {
  background-color: white;
}
.svg {
  margin-top: 20px;
}
a{
  text-decoration: none;
  color: #666;
}
a:hover{
  color:#d63636d9;
}
.clicked{
  color:#d63636d9;
}
.right{
  border-left: 1px solid #e6e6e6;
  padding-top: 20px;
  margin-left: -1px;
}


</style>
