<script lang="ts">
import Vue from 'vue';
import HeaderComponent from '../parts/HeaderComponent/HeaderComponent.vue';
import FooterComponent from '../parts/FooterComponent.vue';
import SidebarComponent from '../parts/SidebarComponent.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  },
  computed: {
    ...mapGetters(['isOpenSidebarGetter']),
  },
  methods: {},
});
</script>

<template>
  <div class="wrapper">
    <HeaderComponent class="header" />
    <SidebarComponent
      class="sidebar"
      :class="{ sidebar__hidden: !isOpenSidebarGetter }"
    />
    <main class="main" :class="{ main__all_columns: !isOpenSidebarGetter }">
      <transition name="fade">
        <router-view class="content" />
      </transition>
    </main>
    <FooterComponent class="footer" />
  </div>
</template>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// прижимаем footer к низу страницы
.wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 150px auto;
  grid-template-rows: 70px auto 30px;
}
.header {
  grid-column: 1 / span 2;
  grid-row: 1;
}
.sidebar {
  grid-column: 1;
  grid-row: 2;
  transition: 0.55s opacity, 0.55s visibility;
  &__hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.main {
  grid-column: 2;
  grid-row: 2;
  transition: 2s ease-out;
  &__all_columns {
    grid-column: 1 / span 2;
  }
}
.content {
  padding: 0 5px;
}

.footer {
  grid-column: 1 / span 2;
  grid-row: 3;
}

// анимация плавного перехода страниц
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
