<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add"
      >新增</el-button
    >
    <el-divider></el-divider>
    <!-- 列表 -->
    <List :info="info" @sendDate="sendDate" />
    <!-- 弹窗 -->
    <Model :info="info" ref="model" />
  </el-card>
</template>

<script>
import List from "../Menu/List";
import Model from "../Menu/Model";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: false,
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    add() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    sendDate(obj) {
      // 调用子组件model的方法
      this.$refs.model.sendDate(obj);
    },
  },
  components: {
    List,
    Model,
  },
};
</script>
<style scoped>
</style>