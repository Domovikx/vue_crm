<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';
import CategoriesCreateComponent from '../components/categories/CategoriesCreateComponent.vue';
import CategoriesEditComponent from '../components/categories/CategoriesEditComponent.vue';
import CategoriesListComponent from '../components/categories/CategoriesListComponent.vue';

export default Vue.extend({
  name: 'CategoriesPage',
  metaInfo: {
    title: 'Категории',
  },

  components: {
    LoaderComponent,

    CategoriesCreateComponent,
    CategoriesEditComponent,
    CategoriesListComponent,
  },

  data: () => ({
    loading: true,

    categoriesExist: false,
  }),

  async mounted() {
    if (await !this.$store.getters.uidGetter) {
      await this.$store.dispatch('fetchInfoAction');
    }
    await this.$store.dispatch('fetchCategoriesAction');
    this.loading = false;
  },

  computed: {
    ...mapGetters(['categoriesGetter']),

    categories(): any {
      return this.categoriesGetter;
    },
  },

  watch: {
    categories() {
      const categories: any[] = this.categories;
      this.categoriesExist = categories.length > 0 ? true : false;
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading" color="backgroundMain" outlined>
    <v-row justify="center">
      <CategoriesCreateComponent />
      <CategoriesEditComponent v-if="categoriesExist" />
      <CategoriesListComponent v-if="categoriesExist" />
    </v-row>
  </v-card>
</template>
