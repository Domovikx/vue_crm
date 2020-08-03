<script lang="ts">
import Vue from 'vue';

import moment from 'moment';

import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'HistoryPeriodsComponent',

  data: () => ({
    datePickerStart: false,
    datePickerFinish: false,

    locale: 'ru-Ru',

    periods: {
      startDate: '',
      endDate: '',
    },
  }),

  created() {
    // this.setDates();
  },

  mounted() {
    this.setDates();
  },

  computed: {},

  methods: {
    setDates() {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.periods.startDate = moment(firstDay).format('YYYY-MM-DD');
      this.periods.endDate = moment(lastDay).format('YYYY-MM-DD');
    },
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <!-- datePickerStart -->
      <v-col cols="12" sm="6" md="6">
        <v-menu
          v-model="datePickerStart"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="periods.startDate"
              label="Начало периода"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="periods.startDate"
            @input="datePickerStart = false"
            locale="locale"
            first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <!-- datePickerFinish -->
      <v-col cols="12" sm="6" md="6">
        <v-menu
          v-model="datePickerFinish"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="periods.endDate"
              label="Конец периода"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="periods.endDate"
            @input="datePickerFinish = false"
            locale="locale"
            first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
