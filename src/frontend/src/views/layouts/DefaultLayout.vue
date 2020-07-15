<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import AppBarComponent from '../parts/AppBarComponent.vue';
import FooterComponent from '../parts/FooterComponent.vue';
import NavigationDrawerComponent from '../parts/NavigationDrawerComponent.vue';

import SnackbarComponent from '../../components/SnackbarComponent.vue';

import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'DefaultLayout',

  components: {
    LoaderComponent,

    AppBarComponent,
    FooterComponent,
    NavigationDrawerComponent,

    SnackbarComponent,
  },

  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapGetters(['infoGetter']),
  },

  async mounted() {
    this.loading = false;

    const existInfo = Object.keys(this.infoGetter).length;
    if (!existInfo) {
      await this.fetchInfoAction();
    }
  },

  methods: {
    ...mapActions(['fetchInfoAction']),
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />
  <v-app v-else-if="!loading">
    <SnackbarComponent />

    <AppBarComponent />
    <NavigationDrawerComponent />
    <v-main class="v-main grey lighten-4">
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-main>
    <footer-component />
  </v-app>
</template>

<style lang="scss"></style>
