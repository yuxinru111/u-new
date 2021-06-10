<template>
  <el-card>
    <My-chart />
    <el-divider></el-divider>
    <My-chart1 />
  </el-card>
</template>

<script>
import MyChart from "./MyChart";
import MyChart1 from "./MyChart1";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    MyChart,
    MyChart1,
  },
};
</script>
<style scoped>
</style>