<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';
import UserCategory from '../../../interfaces/UserCategory.interface';
import LoaderComponent from '../../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'CategoriesEditComponent',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
    valid: false,

    items: [],
    rulesItems: [],
    select: {},
    selectId: null,

    title: null,
    titleItems: [],
    titleRules: [(v: string) => !!v || 'Это поле нужно заполнить'],

    limit: null,
    limitItems: [],
    limitRules: [
      (v: string) => !!v || 'Это поле нужно заполнить',
      (v: string) =>
        /^\d+(?:[\.,]\d+)?$/.test(v) ||
        'Это поле должно содержать только числа',
    ],
  }),

  computed: {
    ...mapGetters(['categoriesGetter']),
  },

  created() {
    this.items = this.categoriesGetter;

    const select: any = this.items[0] || null;

    this.select = select || 'Нет категорий';
    this.title = select.title;
    this.limit = select.limit;
    this.selectId = select.id;
  },

  mounted() {
    this.loading = false;
  },

  watch: {
    select(id) {
      const select: any = this.items.find((item: any) => item.id === id);
      if (select) {
        this.title = select.title;
        this.limit = select.limit;
        this.selectId = id;
      }
    },
  },

  methods: {
    async updateCategories() {
      try {
        const select: any = this.select;
        const categoryData: UserCategory = {
          id: this.selectId,
          title: this.title,
          limit: this.limit,
        };

        this.loading = true;

        await this.$store.dispatch('updateCategoriesAction', categoryData);
        await this.$store.dispatch('fetchCategoriesAction');
        this.items = this.categoriesGetter;

        this.loading = false;
      } catch (error) {
        throw error;
      }
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div class="col s12 m6" v-else-if="!loading">
    <div>
      <h3>Редактировать</h3>

      <v-form ref="form" v-model="valid">
        <v-select
          v-model="select"
          :items="items"
          item-text="title"
          item-value="id"
          label="Выберите категорию"
          required
        ></v-select>

        <v-text-field
          v-model="title"
          label="Название"
          required
          :rules="titleRules"
        ></v-text-field>

        <v-text-field
          v-model="limit"
          label="Лимит"
          required
          :rules="limitRules"
        ></v-text-field>

        <v-btn block color="info" :disabled="!valid" @click="updateCategories">
          Обновить
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
