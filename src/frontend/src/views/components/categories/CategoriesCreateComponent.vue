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
  <div class="col s12 m6">
    <div>
      <h3>Создать</h3>

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
          <v-btn
            block
            color="info"
            @click.prevent="createCategory"
            :disabled="!valid"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-form>
    </div>
  </div>
</template>
