<script lang="ts">
import Vue from 'vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'AppBarComponent',

  components: {},

  data: () => ({
    date: new Date(),
    dateInterval: 0,
  }),

  async mounted() {
    if (!this.infoUserNameGetter) {
      await this.fetchInfoAction();
    }

    this.dateInterval = setInterval((): void => {
      this.date = new Date();
    });
  },

  beforeDestroy() {
    clearInterval(this.dateInterval);
  },

  computed: {
    ...mapGetters(['navigationDrawerGetter', 'infoUserNameGetter']),

    userName(): any {
      return this.infoUserNameGetter;
    },
  },

  methods: {
    ...mapActions(['logoutAction', 'fetchInfoAction']),
    ...mapMutations(['navigationDrawerMutation']),

    async logout() {
      await this.logoutAction();
      this.$router.push('/login?message=logout');
    },

    clickBurgerMenu() {
      this.navigationDrawerMutation(!this.navigationDrawerGetter);
    },
  },
});
</script>

<template>
  <v-app-bar app class="primary white--text" dark clipped-left>
    <div class="navbar_left">
      <v-app-bar-nav-icon @click="clickBurgerMenu"></v-app-bar-nav-icon>
      <span class="date">
        {{ date | dateFilter('date time') }}
      </span>
    </div>

    <v-menu offset-y class="v-menu">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="user-menu"
          text
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
          {{ userName }}
        </v-btn>
      </template>

      <v-list class="user-menu-list">
        <v-list-item>
          <v-btn text class="btn btn__menu-item" to="/Profile" tag="button">
            Профиль
          </v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn text class="btn btn__menu-item" @click.prevent="logout">
            Выйти
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.user-menu {
  margin-left: auto;
}
.v-menu__content {
  margin-top: 20px;
}
</style>
