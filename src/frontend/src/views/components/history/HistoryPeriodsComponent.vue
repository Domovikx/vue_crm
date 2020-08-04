<script lang="ts">
import Vue from 'vue';

// import moment from 'moment';
import momentFilter from '../../../filters/momentFilter';

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'HistoryPeriodsComponent',

  data: () => ({
    datePickerStart: false,
    datePickerFinish: false,

    locale: 'ru-Ru',

    startDate: '',
    endDate: '',
  }),

  async created() {
    await this.initDates();
  },

  methods: {
    ...mapActions(['historyRecordsByPeriodAction']),
    ...mapMutations(['historyDatesMutation']),

    initDates() {
      const date = new Date();
      const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.startDate = momentFilter(startDay, 'YYYY-MM-DD');
      this.endDate = momentFilter(endDay, 'YYYY-MM-DD');
    },
  },

  watch: {
    startDate() {
      this.historyDatesMutation({
        startDate: this.startDate,
      });
      this.historyRecordsByPeriodAction();
    },
    endDate() {
      this.historyDatesMutation({
        endDate: this.endDate,
      });
      this.historyRecordsByPeriodAction();
    },
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <!-- datePicker Start -->
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
              v-model="startDate"
              label="Начало периода"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            @input="datePickerStart = false"
            locale="locale"
            first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <!-- datePicker End -->
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
              v-model="endDate"
              label="Конец периода"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            @input="datePickerFinish = false"
            locale="locale"
            first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
