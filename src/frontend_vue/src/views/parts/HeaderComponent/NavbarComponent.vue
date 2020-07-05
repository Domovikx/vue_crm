<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import IconBurgerLineal from '../../../components/icons/IconBurgerLineal.vue';

export default Vue.extend({
  name: 'NavbarComponent',

  components: {
    IconBurgerLineal,
  },

  computed: {
    ...mapGetters(['isOpenSidebarGetter']),
  },

  methods: {
    clickBurgerMenu() {
      this.$store.dispatch('isOpenSidebarAction', this.isOpenSidebarGetter);
    },
    logout() {
      console.log('logout :>> ');
      this.$router.push('/login?message=logout');
    },
  },

  data: () => ({
    date: new Date(),
    dateInterval: 0,
  }),

  mounted() {
    this.dateInterval = setInterval((): void => {
      this.date = new Date();
    });
  },

  beforeDestroy() {
    clearInterval(this.dateInterval);
  },
});
</script>

<template>
  <nav class="nav_wrapper">
    <div class="navbar_left">
      <button @click="clickBurgerMenu" class="btn btn-burger">
        <IconBurgerLineal class="svg svg-icon-burger" />
      </button>
      <span class="date">
        {{ date | dateFilter('date time') }}
      </span>
    </div>

    <ul class="navbar_right">
      <md-menu md-size="auto" md-align-trigger>
        <md-button md-menu-trigger class="btn">
          USER NAME
        </md-button>
        <md-menu-content class="md-menu-content">
          <md-menu-item class="md-menu-item">
            <router-link class="btn btn__menu-item" to="/Profile" tag="button">
              Профиль
            </router-link>
          </md-menu-item>
          <md-menu-item class="md-menu-item">
            <button class="btn btn__menu-item" @click.prevent="logout">
              Выйти
            </button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/_colors.scss';
@import '../../../assets/scss/_fonts.scss';

.nav_wrapper {
  font-size: 12px;
  letter-spacing: 0.5px;
  z-index: 10;
  min-height: 100%;
  color: $color__white;
  background-color: #1b2024;

  display: grid;
  grid-template-columns: 200px auto;
  align-items: center;
}
a {
  text-transform: uppercase;
  padding: 0 10px;
}
.btn {
  font-family: $font__Lora;
  background: none;
  border: 0;
  padding: 5px;
}
.btn__menu-item {
  color: black;
}

.links {
  padding: 0;
  margin: 0;
  display: flex;
}
.navbar_left {
  display: flex;
  align-items: center;
}

.svg {
  height: 40px;
  width: 40px;
}
.btn-burger {
  margin: 0 15px;
  padding: 0;
  display: flex;
  align-items: center;
}

.navbar_right {
  direction: rtl;
  margin-right: 15px;
}
.md-menu-content {
  margin-top: 15px;
}
.md-menu-item {
  font-family: $font__Lora;
}
</style>
