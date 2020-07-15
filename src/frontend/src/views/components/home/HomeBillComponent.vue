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
  <div class="col s12 m6 l4">
    <v-card>
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
  </div>
</template>
