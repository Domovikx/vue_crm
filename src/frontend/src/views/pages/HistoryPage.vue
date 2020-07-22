<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'HistoryPage',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapGetters(['recordsGetter', 'infoBillGetter', 'currencyBaseGetter']),

    bill: function (): any {
      return this.infoBillGetter;
    },

    currencyBase: function (): any {
      return this.currencyBaseGetter;
    },

    items: function (): any {
      return this.recordsGetter;
    },
  },

  async mounted() {
    // if (!this.categoriesGetter) {
    //   await this.fetchCategoriesAction();
    // }

    this.loading = false;
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading">
    <v-card-title>
      История записей
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Найти"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<style lang="scss" scoped></style>
