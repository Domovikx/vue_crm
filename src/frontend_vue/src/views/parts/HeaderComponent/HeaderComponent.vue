<script lang="ts">
import Vue from 'vue';

import NavbarComponent from './NavbarComponent.vue';
export default Vue.extend({
  name: 'HeaderComponent',
  components: {
    NavbarComponent,
  },
  data: () => ({
    isOpenSidebar: true,
  }),
});
</script>

<template>
  <header class="header">
    <NavbarComponent />
  </header>
</template>
