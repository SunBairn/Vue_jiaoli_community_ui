<template>
  <div class="col-lg-12 col-md-12 col-sm-12" style="min-height: 365px;">
    <div v-if="columnNames!=null&&columnNames!=''">
      <div class="media" v-for="column in columnNames" v-bind:key="column.id">
        <div class="media-body">
          <h6 class="mt-0">
            <router-link :to="{path : `/home/page/column/detail/${userId}`,query:{'columnId':column.id}}">
              <a href="javascript:void(0)">{{ column.name}}</a>
              <span class="nums1 mr-3">
                文章数
                <div
                  style="display:inline"
                  v-for=" articleNum in articleNums"
                  :key="articleNum.column_id"
                >
                  <em v-if="articleNum.column_id==column.id">{{articleNum.nums}}</em>
                </div>
              </span>
            </router-link>
          </h6>
        </div>
      </div>
    </div>
    <div v-else>
      <Blank></Blank>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../assets/static/date";
export default {
  name: "Column",
  props: ["userId"],
  data() {
    return {
      columnNames: "", // 收藏文章内容
      articleNums: "" // 文章分组后的数量
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get(
      "column/find/name",
      {
        userId: this.userId
      },
      response => {
        that.columnNames = response.data.data.columnName;
        that.articleNums = response.data.data.articleNums;
      }
    );
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 20px;
  font-weight: 450;
  color: #5a5a5a;
}
.media {
  line-height: 61px;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0px;
}
.nums1 {
  float: right;
  font-size: 13px;
  font-weight: 400;
  color: #999;
  text-align: left;
  width: 10%;
}
</style>
