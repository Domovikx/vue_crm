<script lang="ts">
import Vue from 'vue';

import VueCharts from 'vue-chartjs';

import { mapGetters, mapActions, mapMutations } from 'vuex';

import momentFilter from '../../../filters/momentFilter';

import { Record } from '../../../interfaces/Record.interface';

export default Vue.extend({
  name: 'HistoryChartComponent',
  extends: VueCharts.Bar,

  props: ['items'],

  data: () => ({
    chartData: {
      labels: [],
      income: [],
      outcome: [],
    } as ChartData,

    renderChartData: {} as any,
  }),

  mounted() {},

  methods: {
    getChartData() {
      const chartDataCollection: any = {};

      this.items.reduce((chartDataCollection: any, record: Record) => {
        const date = momentFilter(record.date, 'YYYY-MM-DD');
        const dateKeys = Object.keys(chartDataCollection);

        if (!dateKeys.includes(date)) {
          chartDataCollection[date] = {
            label: date,
            income: 0,
            outcome: 0,
          };
        }

        if (record.categoryType === 'income') {
          chartDataCollection[date].income += record.count;
        } else if (record.categoryType === 'outcome') {
          chartDataCollection[date].outcome += record.count;
        }

        return chartDataCollection;
      }, chartDataCollection);

      const keys = Object.keys(chartDataCollection).sort();
      const chartData: ChartData = {
        labels: [],
        income: [],
        outcome: [],
      };

      for (let key of keys) {
        const item = chartDataCollection[key];
        chartData.labels.push(item.label);
        chartData.income.push(item.income);
        chartData.outcome.push(item.outcome);
      }

      this.chartData = chartData;
    },

    getRenderChartData() {
      const chartData = this.chartData;

      const renderChartData = {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Доход',
            backgroundColor: '#80cbc475',
            data: chartData.income,
          },
          {
            label: 'Расход',
            backgroundColor: '#ffab9175',
            data: chartData.outcome,
          },
        ],
      };

      this.renderChartData = renderChartData;
    },
  },

  watch: {
    items() {
      this.getChartData();
      this.getRenderChartData();
      // @ts-ignore: disable-next-line
      this.renderChart(this.renderChartData);
    },
  },
});

interface ChartData {
  labels: string[];
  income: number[];
  outcome: number[];
}
</script>

<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>
