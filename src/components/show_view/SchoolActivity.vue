<template>
  <div class="body">
    <div class="media" v-for="gathering in gatherings" v-bind:key="gathering.id">
      <div class="media-body">
        <h6 class="mt-0">
          <router-link :to="{path:`/active/${gathering.id}`}">
            <a href="javascript:void(0)">{{ gathering.name | titleEllipsis}}</a>
          </router-link>
        </h6>
        <span class="contain-font-size">{{ gathering.summary | ellipsis }}</span>
        <br />
        <span class="media-contain">
          •
          主办方：
          <span>{{gathering.sponsor}}</span>&nbsp;&nbsp;&nbsp;
          •
          活动开始日期：
          <span>{{gathering.startTime | formatDate}}</span>&nbsp;&nbsp;&nbsp;
          •
          截止日期：
          <span>{{gathering.endTime | formatDate}}</span>
        </span>
        <hr style="border-top: 1px solid rgba(0,0,0,.08);" />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" v-if="currentPage>=5">
          <span class="page-link pointer" @click="changePage(1)">&lt;&lt;</span>
        </li>
        <li class="page-item" v-if="currentPage!=1&&total!=0">
          <span class="page-link pointer" @click="changePage(currentPage-1)">&lt;</span>
        </li>
        <li class="page-item" v-for="(item ,index) in pageArry" v-bind:key="index">
          <span
            class="page-link pointer"
            v-bind:page="item"
            @click="changePage(item)"
            :class="{activePage:item==currentPage}"
          >{{item}}</span>
        </li>
        <li class="page-item" v-if="currentPage!=rpage">
          <span class="page-link pointer" @click="changePage(currentPage+1)">&gt;</span>
        </li>
        <li class="page-item" v-if="(last-currentPage)>3">
          <span class="page-link pointer" @click="changePage(last)">&gt;&gt;</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { formatDate } from "../../assets/static/date";
export default {
  name: "SchoolActivity",
  data() {
    return {
      active: "a",
      isActive: "true",
      last: "", // 总页数
      currentPage: "", // 当前页
      lpage: "", // 开始页
      rpage: "", //  结束页
      page: "", //   页码数
      total: "", //  总记录数
      pageArry: [], //  显示页码的数组
      gatherings: [] //
    };
  },
  created: function() {
    let that = this;
    this.$requestApi.get(
      "gathering/find",
      {
        page: "1"
      },
      function(res) {
        that.gatherings = res.data.data.page.list;
        that.currentPage = res.data.data.page.currentpage;
        that.lpage = res.data.data.page.lpage;
        that.rpage = res.data.data.page.rpage;
        that.total = res.data.data.total;
        that.last = res.data.data.page.last;
      }
    );
  },
  // 必须要用beforeUpdate,不然得不到rpage和lpage的值
  beforeUpdate: function() {
    let that = this;
    // 生成一个页面数组
    let topdev = that.rpage - that.lpage;
    for (let index = 0; index <= topdev; index++) {
      that.pageArry[index] = that.lpage + index;
    }
  },
  methods: {
    changePage(page) {
      let that = this;
      this.$requestApi.get(
        "gathering/find",
        {
          page: page
        },
        function(res) {
          that.gatherings = res.data.data.page.list;
          that.lpage = res.data.data.page.lpage;
          that.rpage = res.data.data.page.rpage;
          that.currentPage = res.data.data.page.currentpage;
        }
      );
    }
  },
  // 过滤字符串，让超过长度产生...省略号和时间戳的转换
  filters: {
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 80) {
        return value.slice(0, 80) + "...";
      }
      return value;
    },
    titleEllipsis: function(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  computed: {}
};
</script>

<style scoped>
@import "../../assets/static/common.css";
a {
  text-decoration: none;
}
.media-contain {
  font-size: 12px;
  font-weight: normal;
  color: #999;
}
.contain-font-size {
  font-size: 0.85rem;
}
.activePage {
  background-color: #499ef3;
}
</style>
