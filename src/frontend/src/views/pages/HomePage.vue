<script lang="ts">
import Vue from 'vue';

import { mapActions, mapGetters } from 'vuex';

import HomeBillComponent from '../components/home/HomeBillComponent.vue';
import HomeCurrencyComponent from '../components/home/HomeCurrencyComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';

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

  computed: {
    ...mapGetters(['currenciesGetter', 'currencyBaseGetter', 'infoBillGetter']),

    currency(): any {
      return this.currenciesGetter;
    },

    currencyBase(): any {
      return this.currencyBaseGetter;
    },

    bill(): any {
      return this.infoBillGetter;
    },
  },

  async mounted() {
    if (await !this.$store.getters.uidGetter) {
      await this.$store.dispatch('fetchInfoAction');
    }
    await this.currencyFetchAction();
    this.loading = false;
  },

  methods: {
    ...mapActions(['currencyFetchAction']),

    async refresh() {
      this.loading = true;
      await this.currencyFetchAction();
      this.loading = false;
    },
  },
});
</script>

<template>
  <v-card color="backgroundMain" outlined>
    <v-card-title>
      Счет ({{ bill | currencyFilter(currencyBase) }})
      <v-spacer></v-spacer>
      <v-btn text @click="refresh">
        <v-icon left>mdi-refresh</v-icon>
        обновить
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
