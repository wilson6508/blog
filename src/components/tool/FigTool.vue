<template>
  <div>
    <Highcharts :options="display"></Highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
// import offlineExporting from "highcharts/modules/offline-exporting";
// offlineExporting(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

export default {
  components: {
    Highcharts: Chart,
  },
  computed: {
    display() {
      const obj = this.figure;
      if (obj.chart.type === "bar") {
        obj.yAxis.labels = {
          formatter: function () {
            return Highcharts.numberFormat(this.value, 0, ".", ",");
          },
        };
      }
      return obj;
    },
  },
  props: {
    figure: {
      type: Object,
    },
  },
};
</script>