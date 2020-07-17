<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

import CategoriesCreateComponent from '../components/categories/CategoriesCreateComponent.vue';
import CategoriesEditComponent from '../components/categories/CategoriesEditComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'CategoriesPage',

  components: {
    LoaderComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
  },

  data: () => ({
    loading: true,
  }),

  mounted() {
    this.onLoading();
  },

  computed: {
    // ...mapGetters(['categoriesGetter']),
  },

  methods: {
    async onLoading() {
      this.loading = true;
      await this.$store.dispatch('fetchCategoriesAction');
      this.loading = false;
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-actions>
      <h2>Категории</h2>
    </v-card-actions>

    <div class="row">
      <CategoriesCreateComponent />
      <CategoriesEditComponent />
    </div>
  </div>
</template>
