<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';

import { PlanningsByCategories } from '../../interfaces/PlanningByCategory.interface';

export default Vue.extend({
  name: 'PlanningPage',
  metaInfo: {
    title: 'Планирование',
  },

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
  }),

  async mounted() {
    if (await !this.$store.getters.uidGetter) {
      await this.$store.dispatch('fetchInfoAction');
    }
    await this.getPlanningsAction();
    this.loading = false;
  },

  computed: {
    ...mapGetters([
      'infoBillGetter',
      'currencyBaseGetter',
      'planningsByCategoriesGetter',
      'recordsGetter',
    ]),

    bill: function (): any {
      return this.infoBillGetter;
    },

    currencyBase: function (): any {
      return this.currencyBaseGetter;
    },

    items: function (): PlanningsByCategories {
      return this.planningsByCategoriesGetter;
    },

    records: function (): any {
      return this.recordsGetter;
    },
  },

  methods: {
    ...mapActions(['getPlanningsAction']),
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-title>
      Планирование
      <v-spacer></v-spacer>
      {{ bill | currencyFilter(currencyBase) }}
    </v-card-title>

    <div v-for="item in items" :key="item.categoryId">
      <v-card-actions>
        <h3>{{ item.categoryTitle }}</h3>
        <v-spacer></v-spacer>
        {{ item.categoryLimit | currencyFilter(currencyBase) }}
      </v-card-actions>

      <v-progress-linear
        :value="item.expensePercent"
        height="25"
        color="blue-grey lighten-3"
      >
        <strong>{{ item.rate }} | {{ item.expensePercent }}% </strong>
      </v-progress-linear>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
