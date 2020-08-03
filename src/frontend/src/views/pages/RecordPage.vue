<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';
import { Record } from '../../interfaces/Record.interface';
import { Categories, UserCategory } from '../../interfaces/Category.interface';

import validationRules from '../../utils/validationRules';

export default Vue.extend({
  name: 'RecordPage',
  metaInfo: {
    title: 'Добавление записи',
  },

  components: {
    LoaderComponent,
  },

  data: () => ({
    validationRules,

    loading: true,
    categoriesExist: false,

    valid: false,

    selectId: null,

    categoryTitle: 'categoryTitle',
    categoryType: 'outcome',

    count: 0,

    marker: null,

    description: null,
  }),

  computed: {
    ...mapGetters(['categoriesGetter', 'infoBillGetter', 'currencyBaseGetter']),

    bill: function (): any {
      return this.infoBillGetter;
    },

    currencyBase: function (): any {
      return this.currencyBaseGetter;
    },

    items: function (): Categories {
      return this.categoriesGetter;
    },
  },

  async mounted() {
    if (this.categoriesGetter[0]) {
      this.categoriesExist = true;
      this.selectId = this.items[0].id;
      this.loading = false;
    } else if (!this.categoriesGetter[0]) {
      this.categoriesExist = false;
      this.loading = false;
    }
  },

  methods: {
    ...mapActions([
      'fetchCategoriesAction',
      'createRecordAction',
      'infoUpdateAction',
    ]),

    async createRecord() {
      try {
        const category: UserCategory | any = this.items.find(
          (i: UserCategory) => i.id === this.selectId,
        );

        this.categoryTitle = category.title;

        const record: Record = {
          categoryId: this.selectId,
          categoryTitle: this.categoryTitle,
          count: Number(String(this.count).replace(',', '.')),
          marker: this.marker,
          description: this.description || '',
          categoryType: this.categoryType,
          date: new Date().toJSON(),
        };

        await this.createRecordAction(record);

        let bill = 0;
        const b: number = Number(this.bill);
        const c: number = Number(this.count);
        if (this.categoryType === 'outcome') {
          bill = b - c;
        }
        if (this.categoryType === 'income') {
          bill = b + c;
        }

        await this.infoUpdateAction({ bill });

        let f: any = this.$refs.form;
        f.reset();
      } catch (error) {
        throw error;
      }
    },

    async checkAvailabilityData() {
      if (!this.$store.getters.uidGetter) {
        await this.$store.dispatch('fetchInfoAction');
      }

      if (!this.categoriesGetter) {
        await this.fetchCategoriesAction();
      }
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!categoriesExist && !loading">
    <v-card-title>
      Категории отсутствуют
    </v-card-title>
    <v-btn text block to="/categories">
      <v-icon left>mdi-table-row-plus-before</v-icon>
      Создать новую категорию
    </v-btn>
  </div>

  <div v-else-if="categoriesExist && !loading">
    <v-card-title>
      Новая запись
    </v-card-title>

    <v-form ref="form" v-model="valid">
      <div class="input-field">
        <v-select
          v-model="selectId"
          :items="items"
          item-text="title"
          item-value="id"
          label="Выберите категорию"
          :rules="[validationRules.validMustBeFilled]"
        ></v-select>
      </div>

      <v-radio-group
        v-model="categoryType"
        :mandatory="false"
        :rules="[validationRules.validMustBeFilled]"
      >
        <v-radio label="Расход" value="outcome"></v-radio>
        <v-radio label="Доход" value="income"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model.number="count"
        label="Счет / Общая сумма"
        :rules="[
          validationRules.validMustBeFilled,
          validationRules.validOnlyNumbers,
        ]"
        required
        clearable
      ></v-text-field>

      <v-text-field
        v-model.trim="marker"
        label="Метка"
        :rules="[validationRules.validOnlyLetters]"
        clearable
      ></v-text-field>

      <v-text-field
        v-model.trim="description"
        label="Описание"
        clearable
      ></v-text-field>

      <v-card-actions>
        <v-btn block text @click.prevent="createRecord" :disabled="!valid">
          <v-icon left>mdi-table-row-plus-before</v-icon>
          Создать
        </v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<style lang="scss" scoped></style>
