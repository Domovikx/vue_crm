<script lang="ts">
import Vue from 'vue';

import { mapActions, mapGetters } from 'vuex';

import HomeBillComponent from '../components/home/HomeBillComponent.vue';
import HomeCurrencyComponent from '../components/home/HomeCurrencyComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';
import { ThisWindow } from '../../interfaces/ThisWindow.interface';

export default Vue.extend({
  name: 'HomePage',
  metaInfo: {
    title: 'Счет',
  },

  components: {
    HomeBillComponent,
    HomeCurrencyComponent,
    LoaderComponent,
  },

  data: () => ({
    loading: true,
  }),

  async mounted() {
    await this.checkAvailabilityData();
    this.loading = false;
  },

  computed: {
    ...mapGetters([
      'currenciesGetter',
      'currencyBaseGetter',
      'infoBillGetter',
      'windowGetter',
    ]),

    currency(): any {
      return this.currenciesGetter;
    },

    currencyBase(): any {
      return this.currencyBaseGetter;
    },

    bill(): any {
      return this.infoBillGetter;
    },

    window(): ThisWindow {
      return this.windowGetter;
    },
  },

  methods: {
    ...mapActions(['currencyFetchAction']),

    async refresh() {
      this.loading = true;
      await this.currencyFetchAction();
      this.loading = false;
    },

    async checkAvailabilityData() {
      if (await !this.$store.getters.uidGetter) {
        await this.$store.dispatch('fetchInfoAction');
      }
      await this.currencyFetchAction();
    },
  },
});
</script>

<template>
  <v-card color="backgroundMain" outlined>
    <v-card-title>
      Счет ({{
        bill
          | currencyFilter({
            style: 'currency',
            currency: currencyBase,
            maximumFractionDigits: 2,
          })
      }}) <v-spacer></v-spacer>

      <!-- btn refresh -->
      <v-btn v-if="window.isMobile" icon large @click="refresh">
        <v-icon large>mdi-refresh</v-icon>
      </v-btn>
      <v-btn v-else-if="!window.isMobile" text @click="refresh">
        <v-icon left>mdi-refresh</v-icon>
        <span>обновить</span>
      </v-btn>
    </v-card-title>

    <LoaderComponent v-if="loading" />

    <v-row v-else-if="!loading">
      <HomeBillComponent :currency="currency" />
      <HomeCurrencyComponent :currency="currency" />
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  border: 0;
}
</style>
