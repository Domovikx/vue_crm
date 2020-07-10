<script lang="ts">
import Vue from 'vue';

import DefaultLayout from './views/layouts/DefaultLayout.vue';
import EmptyLayout from './views/layouts/EmptyLayout.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
});
</script>

<template>
  <v-app id="app">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<style lang="scss">
// @import '../src/assets/scss/main.scss';
</style>
