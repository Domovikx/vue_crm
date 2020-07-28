<script lang="ts">
import Vue from 'vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';

import commonMessages from '../../utils/commonMessages';

export default Vue.extend({
  name: 'RegisterPage',

  data: () => ({
    valid: true,
    lazy: false,

    email: '',
    emailRules: [
      (v: string) => !!v || 'E-mail нужно заполнить',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail должен быть правильным',
    ],

    userName: '',
    userNameRules: [
      (v: string) => !!v || 'Имя пользователя нужно заполнить',
      (v: string) =>
        /^[a-z\s]+$/iu.test(v) || 'Должны быть только английские буквы',
      (v: string, textLength: number = 4) =>
        (v && v.length >= textLength) ||
        `Длинна имени должна быть больше ${textLength} символов`,
    ],

    password: '',
    passwordShow: false,
    passwordRules: [
      (v: string) => !!v || 'Password нужно заполнить',
      (v: string, passwordLength: number = 6) =>
        (v && v.length >= passwordLength) ||
        `Длинна пароля должна быть больше ${passwordLength} символов`,
    ],

    checkbox: false,
    checkboxRules: [(v: string) => !!v || 'Просто согласись с неизбежностью!'],

    message: '',
    messages: commonMessages,
  }),

  computed: {
    ...mapGetters(['errorNotificationGetter']),
  },

  async mounted() {
    if (await !this.$store.getters.uidGetter) {
      await this.$store.dispatch('fetchInfoAction');
    }
  },

  watch: {
    errorNotificationGetter(fbError) {
      /*
      test@mail.ru
      123456
      testUser
      */
      if (fbError) {
        const messages: any = this.messages;
        const code: string = fbError.code;
        const message = messages[code];
        this.message = message;
      } else {
        this.message = '';
        this.clearErrorNotificationMutation;
      }
    },
  },

  methods: {
    ...mapActions(['registerAction']),

    // TODO clearErrorNotificationMutation не работает как ожидалось
    ...mapMutations(['clearErrorNotificationMutation']),

    async onRegister() {
      try {
        const registerFormData = {
          email: this.email,
          password: this.password,
          name: this.userName,
        };

        await this.registerAction(registerFormData);
        this.clearErrorNotificationMutation;
        this.$router.push('/');
      } catch (error) {
        throw error;
      }
    },
  },
});
</script>

<template>
  <v-container class="container fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar class="title primary white--text" flat>
            <v-toolbar-title>Регистрация</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="primary white--text" to="/">X</v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-text-field
                required
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                name="email"
                prepend-icon="mdi-email"
                type="text"
                v-model.trim="email"
              ></v-text-field>

              <v-text-field
                required
                v-model="password"
                :rules="passwordRules"
                counter
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="passwordShow = !passwordShow"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
              ></v-text-field>

              <v-text-field
                required
                v-model="userName"
                :rules="userNameRules"
                counter
                label="Имя пользователя"
                name="userName"
                prepend-icon="mdi-account"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="checkboxRules"
                label="Вы согласны с правилами?"
                required
              ></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              block
              class="primary white--text"
              :disabled="!valid"
              @click="onRegister"
            >
              Регистрация
            </v-btn>
          </v-card-actions>

          <v-layout justify-center v-if="message">
            <v-card-actions class="message">
              {{ message }}
            </v-card-actions>
          </v-layout>

          <v-card-actions>
            <p class="card_register">
              Есть аккаунт?
              <v-btn text to="/Login">
                Войти
              </v-btn>
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  display: block;
}
.card_register {
  min-width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.v-card__actions {
  padding: 8px 16px;
}
.message {
  color: red;
}
</style>
