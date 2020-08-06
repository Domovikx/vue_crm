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
  <v-col cols="12" sm="12" md="6">
    <v-card color="backgroundMain" outlined>
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
            <td>
              {{
                currency[symbol].rate
                  | currencyFilter({
                    style: 'currency',
                    currency: symbol,
                    maximumFractionDigits: 3,
                  })
              }}
            </td>
            <td>
              {{ currency[symbol].date | dateFilter('DD-MM-YYYY') }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-col>
</template>
