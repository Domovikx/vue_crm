<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';
import { Categories } from '../../../interfaces/Category.interface';

export default Vue.extend({
  name: 'CategoriesListComponent',

  data: () => ({
    headers: [
      { text: 'Наименование', value: 'title' },
      { text: 'Лимит', value: 'limit' },
    ],
  }),

  computed: {
    ...mapGetters(['categoriesGetter']),

    items() {
      const categories: Categories = this.categoriesGetter;
      return categories;
    },
  },
});
</script>

<template>
  <v-col cols="12" sm="12" md="12" lg="6" xl="6">
    <v-card color="backgroundMain" outlined>
      <v-card-title>Список всех категорий</v-card-title>
      <v-data-table :headers="headers" :items="items"> </v-data-table>
    </v-card>
  </v-col>
</template>
