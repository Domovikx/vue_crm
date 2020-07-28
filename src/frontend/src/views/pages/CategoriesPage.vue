<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

import CategoriesCreateComponent from '../components/categories/CategoriesCreateComponent.vue';
import CategoriesEditComponent from '../components/categories/CategoriesEditComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'CategoriesPage',
  metaInfo: {
    title: 'Категории',
  },

  components: {
    LoaderComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
  },

  data: () => ({
    loading: true,

    showEditComponent: false,
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
      this.showEditComponent = categories.length > 0 ? true : false;
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-title>
      Категории
    </v-card-title>

    <div class="row">
      <CategoriesCreateComponent />
      <CategoriesEditComponent v-if="showEditComponent" />
    </div>
  </div>
</template>
