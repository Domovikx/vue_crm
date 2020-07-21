<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';

import { PlanningsByCategories } from '../../interfaces/PlanningByCategory.interface';

export default Vue.extend({
  name: 'PlanningPage',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
  }),

  async mounted() {
    await this.$store.dispatch('getPlanningsAction');
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
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-actions>
      <h2>Планирование</h2>
      <v-spacer></v-spacer>
      <p class="bill">{{ bill | currencyFilter(currencyBase) }}</p>
    </v-card-actions>

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

<style lang="scss" scoped>
.bill {
  font-size: 1.5em;
}
</style>
