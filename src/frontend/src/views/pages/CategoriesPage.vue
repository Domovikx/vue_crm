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

  async mounted() {
    await this.$store.dispatch('fetchCategoriesAction');
    this.loading = false;
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
      <CategoriesEditComponent />
    </div>
  </div>
</template>
