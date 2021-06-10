<template>
  <div id="container"></div>
</template>

<script>
// 1-导入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      app: {},
      barOption: {
        title: {
          text: "动态数据",
          subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {
          data: ["最新成交价", "预购队列"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function () {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })(),
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })(),
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "价格",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          {
            type: "value",
            scale: true,
            name: "预购量",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: "预购队列",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })(),
          },
          {
            name: "最新成交价",
            type: "line",
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })(),
          },
        ],
      },
    };
  },
  mounted() {
    let dom = document.querySelector("#container");
    let mychart = echarts.init(dom);
    mychart.setOption(this.barOption);
    this.app.count = 11;
    setInterval(() => {
      var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

      var data0 = this.barOption.series[0].data;
      var data1 = this.barOption.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      this.barOption.xAxis[0].data.shift();
      this.barOption.xAxis[0].data.push(axisData);
      this.barOption.xAxis[1].data.shift();
      this.barOption.xAxis[1].data.push(this.app.count++);

      mychart.setOption(this.barOption);
    }, 2100);
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
#container {
  height: 500px;
}
</style>