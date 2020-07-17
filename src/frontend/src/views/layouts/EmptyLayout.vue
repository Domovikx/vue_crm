<script lang="ts">
import Vue from 'vue';

import SnackbarComponent from '../../components/SnackbarComponent.vue';
import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'EmptyLayout',

  components: {
    SnackbarComponent,
    LoaderComponent,
  },

  data: () => ({
    loading: true,
  }),

  async mounted() {
    this.loading = false;
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />
  <v-app v-else-if="!loading">
    <SnackbarComponent />

    <v-main class="wrapper grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
