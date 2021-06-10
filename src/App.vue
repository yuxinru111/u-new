<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* 公共样式 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
.el-form-item__error {
  left: 55px;
}
</style>
