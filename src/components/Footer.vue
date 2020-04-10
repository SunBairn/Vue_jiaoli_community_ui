<template>
  <div class="footer">
    <footer>
      <span>{{msg}}</span>
      <a href="http://www.ecjtuit.com.cn/">华东交通大学理工学院</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      msg: "Copyright © 2020·交理社区 "
    };
  }
};
</script> 
<style scoped>
.footer {
  margin-bottom: 15px;
  text-align: center;
  font-size: 13px;
  color: #777;

}
</style>

