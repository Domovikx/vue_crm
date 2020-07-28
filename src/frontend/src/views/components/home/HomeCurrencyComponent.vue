<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'HomeCurrencyComponent',

  props: ['currency'],

  computed: {
    ...mapGetters(['currenciesKeysGetter']),
  },
});
</script>

<template>
  <div class="col s12 m6 l8">
    <v-card>
      <v-card-title>Курс валют</v-card-title>

      <v-simple-table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="symbol in currenciesKeysGetter" :key="symbol">
            <td>{{ symbol }}</td>
            <td>{{ currency[symbol].rate | currencyFilter('BYN', 3) }}</td>
            <td>
              {{ currency[symbol].date | dateFilter('DD-MM-YYYY') }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>
