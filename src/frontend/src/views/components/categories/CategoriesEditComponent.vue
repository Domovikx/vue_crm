<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../../components/LoaderComponent.vue';
import { UserCategory } from '../../../interfaces/Category.interface';

export default Vue.extend({
  name: 'CategoriesEditComponent',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
    valid: false,

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

    dialogToRemove: false,
  }),

  async created() {
    if (!this.categoriesGetter) {
      await this.fetchCategoriesAction();
    }

    const select: any = this.items[0] || null;
    if (select) {
      this.select = select || null;
      this.title = select.title;
      this.limit = select.limit;
      this.selectId = select.id;
    }
  },

  mounted() {
    this.loading = false;
  },

  computed: {
    ...mapGetters(['categoriesGetter']),

    items(): any {
      return this.categoriesGetter;
    },
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
    ...mapActions([
      'updateCategoriesAction',
      'removeCategoryAction',
      'fetchCategoriesAction',
    ]),

    async updateCategories() {
      try {
        const select: any = this.select;
        const categoryData: UserCategory = {
          id: this.selectId,
          title: this.title,
          limit: this.limit,
        };

        this.loading = true;

        await this.updateCategoriesAction(categoryData);

        this.loading = false;
      } catch (error) {
        throw error;
      }
    },

    onRemove() {
      this.dialogToRemove = true;
    },

    async removeCategory() {
      try {
        let select: any = this.select;
        const id = this.selectId;

        this.loading = true;

        await this.removeCategoryAction({ id });
        await this.fetchCategoriesAction();

        // TODO отрефакторить

        select = this.items[0] || null;
        this.select = select || null;
        this.title = select.title || '';
        this.limit = select.limit || '';

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

  <v-col cols="12" sm="12" md="6" lg="3" xl="3" v-else-if="!loading">
    <v-card color="backgroundMain" outlined>
      <v-card-title>Редактировать категорию</v-card-title>

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

        <v-card-actions class="justify-center">
          <v-btn text :disabled="!valid" @click="updateCategories">
            <v-icon left>mdi-refresh</v-icon>
            Обновить
          </v-btn>
          <v-btn text :disabled="!valid" @click="onRemove">
            <v-icon left>mdi-table-row-remove</v-icon>
            Удалить
          </v-btn>
        </v-card-actions>
      </v-form>

      <!-- dialogToRemove -->
      <v-dialog v-model="dialogToRemove" max-width="290">
        <v-card>
          <v-card-title class="headline">
            Удалить запись?
          </v-card-title>

          <v-card-text>
            Внимание. Удаление записи необратимо. Подтвердите удаление записи.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialogToRemove = false">
              Отмена
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="(dialogToRemove = false), removeCategory()"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped></style>
