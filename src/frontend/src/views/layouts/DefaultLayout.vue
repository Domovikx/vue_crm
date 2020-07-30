<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions, mapMutations } from 'vuex';

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

    window: {
      width: 0,
      height: 0,
      isMobile: false,
    },
  }),

  async created() {
    window.addEventListener('resize', this.handleResize);
    await this.handleResize();
  },

  async mounted() {
    this.loading = false;

    const existInfo = Object.keys(this.infoGetter).length;
    if (!existInfo) {
      await this.fetchInfoAction();
    }
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    ...mapGetters(['infoGetter']),

    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true;
      }
      return false;
    },
  },

  methods: {
    ...mapActions(['fetchInfoAction']),
    ...mapMutations(['windowMutation']),

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.window.isMobile = this.isMobile;
      this.windowMutation(this.window);
    },
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

<style lang="scss">
.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
