<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'HomeBillComponent',

  props: ['currency'],

  computed: {
    ...mapGetters(['infoBillGetter', 'currenciesKeysGetter']),
  },

  methods: {
    getCurrency(symbol: string) {
      const count = this.infoBillGetter / this.currency[symbol].rate;
      return count;
    },
  },
});
</script>

<template>
  <v-col cols="12" sm="12" md="6">
    <v-card color="backgroundMain" outlined>
      <v-card-title>Счет в валюте</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Значение</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="symbol of currenciesKeysGetter" :key="symbol">
            <td>{{ symbol }}</td>
            <td>{{ getCurrency(symbol) | currencyFilter(symbol) }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-col>
</template>
