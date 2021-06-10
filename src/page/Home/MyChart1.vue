<template>
  <div id="chart2"></div>
</template>

<script>
// 1-导入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      bOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    let dom = document.querySelector("#chart2");
    let mychart1 = echarts.init(dom);
    mychart1.setOption(this.bOption);
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
#chart2 {
  height: 500px;
}
</style>