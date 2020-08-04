<script lang="ts">
import Vue from 'vue';

import { Bar } from 'vue-chartjs';
import { mapGetters, mapActions, mapMutations } from 'vuex';

import momentFilter from '../../../filters/momentFilter';

import { Record } from '../../../interfaces/Record.interface';

export default Vue.extend({
  name: 'HistoryChartComponent',
  extends: Bar,

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
      const chartData: ChartData = {
        labels: [],
        income: [],
        outcome: [],
      };

      this.items.reduce(
        ({ labels, income, outcome }: ChartData, record: Record) => {
          const date = momentFilter(record.date, 'YYYY-MM-DD');

          if (!labels.includes(date)) {
            labels.push(date);
            if (record.categoryType === 'income') {
              income.push(record.count);
              outcome.push(0);
            } else if (record.categoryType === 'outcome') {
              income.push(0);
              outcome.push(record.count);
            }
          } else if (labels.includes(date)) {
            const idx = labels.indexOf(date);
            if (record.categoryType === 'income') {
              income[idx] = record.count + income[idx];
            } else if (record.categoryType === 'outcome') {
              outcome[idx] = record.count + outcome[idx];
            }
          }

          return { labels, income, outcome };
        },
        chartData,
      );
      this.chartData = chartData;
      console.log('chartData :>> ', chartData);
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
