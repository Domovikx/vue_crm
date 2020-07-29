<script lang="ts">
import Vue from 'vue';

import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'CategoriesCreateComponent',

  data: () => ({
    valid: false,
    loading: true,

    title: null,
    titleRules: [(v: string) => !!v || 'Это поле нужно заполнить'],

    limit: null,
    limitRules: [
      (v: string) => !!v || 'Это поле нужно заполнить',
      (v: string) =>
        /^\d+(?:[\.,]\d+)?$/.test(v) ||
        'Это поле должно содержать только числа',
    ],
  }),

  async mounted() {},

  methods: {
    ...mapActions(['createCategoryAction']),

    async createCategory() {
      await this.createCategoryAction({
        title: this.title,
        limit: this.limit,
      });

      this.title = null;
      this.limit = null;

      const form: any = this.$refs.form;
      form.reset();
    },
  },
});
</script>

<template>
  <v-col cols="12" sm="12" md="6" lg="3" xl="3">
    <v-card color="backgroundMain" outlined>
      <v-card-title>Создать категорию</v-card-title>

      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model.trim="title"
          label="Название"
          :rules="titleRules"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="limit"
          label="Лимит (максимальный расход)"
          :rules="limitRules"
          required
        ></v-text-field>

        <v-card-actions>
          <v-btn text block @click.prevent="createCategory" :disabled="!valid">
            <v-icon left>mdi-table-row-plus-before</v-icon>
            Создать
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-col>
</template>
