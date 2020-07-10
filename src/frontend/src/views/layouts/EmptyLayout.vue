<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EmptyLayout',
  components: {},
  data: () => ({}),
});
</script>

<template>
  <!-- <div class="wrapper grey lighten-4">
    <router-view />
  </div> -->
  <v-app>
    <v-main class="wrapper grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
