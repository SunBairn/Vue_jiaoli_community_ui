<template>
  <div class="col-lg-12 col-md-12 col-sm-12 blank">
    <img src="../assets/images/blank.png" alt="空白" />
    <div class="blank_tips">空空如也</div>
  </div>
</template>

<script>
export default {
  name: "Blank",
  data() {
    return {};
  }
};
</script>

<style scoped>
.blank {
  padding: 30px;
}
.blank img {
  min-height: 150px;
  margin: 30px auto;
  display: block;
}
.blank_tips {
  font-size: 16px;
  color: #ccc;
  text-align: center;
}
</style>
