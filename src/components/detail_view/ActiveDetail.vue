<template>
  <div class="container-fluid main" style="min-height:610px">
    <div class="row">
      <div class="col-lg-9 col-md-19 col-sm-9">
        <h4 class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
          <span>{{active.name}}</span>
        </h4>
        <h6>
            <span class="summary">活动简介：{{active.summary}}</span>
        </h6>
        <span class="media-contain col-lg-12 col-md-12 col-sm-12 col-xs-12">
          主办方：
          <span>{{active.sponsor}}</span>&nbsp;&nbsp;
          | 活动开始时间：
          <span>{{active.startTime | formatDate}}</span>&nbsp;&nbsp;
          | 活动结束时间：
          <span>{{active.endTime | formatDate}}</span>&nbsp;&nbsp;
        </span>
        <hr />
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:70px">
          <mavon-editor
            class="editor"
            :value="active.detail"
            :subfield="prop.subfield"
            :defaultOpen="prop.defaultOpen"
            :toolbarsFlag="prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle"
          />
        </div>
        <hr />
      </div>

      <!--右边布局-->
      <div class="col-lg-3 col-md-3 col-sm-3 mt-3" style="border-left:1px solid #e6e6e6">
           <IndexRightCommon></IndexRightCommon>
      </div>
        
    </div>
  </div>
</template>

<script>
import { formatDate } from "./../../assets/static/date";
export default {
  name: "ActiveDetail",
  data() {
    return {
        active:"", // 活动信息
        activeId:"",// 活动ID
    }
  },
  created:function(){
      let that = this;
      this.activeId = this.$route.params.id;
      this.$requestApi.get(
          "gathering/select/"+this.activeId,
          {},
          response=>{
              that.active = response.data.data;
          }
      );
  },
  methods:{

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
.summary{
    padding: 15px 20px;
    display: inline-block;
    color: #333;
    font-size: 1.1rem;
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
</style>
