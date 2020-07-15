<script lang="ts">
import Vue from 'vue';

import { mapActions, mapMutations, mapGetters } from 'vuex';

import HomeBillComponent from '../components/home/HomeBillComponent.vue';
import HomeCurrencyComponent from '../components/home/HomeCurrencyComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'HomePage',

  components: {
    HomeBillComponent,
    HomeCurrencyComponent,
    LoaderComponent,
  },

  data: () => ({
    loading: true,
    currency: null,
  }),

  computed: {
    ...mapGetters(['currenciesGetter', 'currencyBaseGetter']),
  },

  async mounted() {
    await this.currencyFetchAction();
    this.currency = await this.currenciesGetter;
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
  <div>
    <v-card-actions>
      <h2>Счет ({{ currencyBaseGetter }})</h2>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="refresh">
        обновить
      </v-btn>
    </v-card-actions>

    <LoaderComponent v-if="loading" />

    <div v-else-if="!loading" class="row">
      <HomeBillComponent :currency="currency" />
      <HomeCurrencyComponent :currency="currency" />
    </div>
  </div>
</template>
