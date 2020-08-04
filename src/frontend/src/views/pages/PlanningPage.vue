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
    await this.checkAvailabilityData();

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

    async checkAvailabilityData() {
      if (await !this.$store.getters.uidGetter) {
        await this.$store.dispatch('fetchInfoAction');
      }
      await this.getPlanningsAction();
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-title>
      Планирование
    </v-card-title>

    <div v-for="item in items" :key="item.categoryId">
      <v-card-actions>
        <h3>{{ item.categoryTitle }}</h3>
        <v-spacer></v-spacer>
        <strong>
          {{
            item.categoryLimit
              | currencyFilter({
                maximumFractionDigits: 2,
              })
          }}</strong
        >
      </v-card-actions>

      <!-- expensePercent -->
      <v-progress-linear
        :value="item.expensePercent"
        height="25"
        :color="item.rate > 0 ? 'teal lighten-4' : 'deep-orange lighten-4'"
      >
        <strong>
          {{
            item.rate
              | currencyFilter({
                maximumFractionDigits: 2,
              })
          }}
          <span v-if="item.categoryLimit">| {{ item.expensePercent }}%</span>
        </strong>
      </v-progress-linear>

      <!-- percentIncome -->
      <v-progress-linear
        v-if="item.percentIncome && item.percentOutcome"
        :value="item.percentIncome"
        height="25"
        color="teal lighten-4"
      >
        {{
          item.typeIncome
            | currencyFilter({
              maximumFractionDigits: 2,
            })
        }}
      </v-progress-linear>

      <!-- percentOutcome -->
      <v-progress-linear
        v-if="item.percentIncome && item.percentOutcome"
        :value="item.percentOutcome"
        height="25"
        color="deep-orange lighten-4"
      >
        -{{
          item.typeOutcome
            | currencyFilter({
              maximumFractionDigits: 2,
            })
        }}
      </v-progress-linear>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
