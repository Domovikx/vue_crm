<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';
import CreatedRecordsComponent from '../components/record/CreatedRecordsComponent.vue';

import validationRules from '../../utils/validationRules';

import { Record } from '../../interfaces/Record.interface';
import { Categories, UserCategory } from '../../interfaces/Category.interface';

export default Vue.extend({
  name: 'RecordPage',
  metaInfo: {
    title: 'Добавление записи',
  },

  components: {
    LoaderComponent,
    CreatedRecordsComponent,
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

    locale: 'ru-Ru',
    datePickerToday: false,
    dateToday: '',

    createdRecords: [] as Record[],
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
    await this.checkAvailabilityData();

    this.checkCategoryExistence();

    this.setDates();
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
          date: this.dateToday,
        };

        const lastRecord = await this.createRecordAction(record);
        this.createdRecords.push(lastRecord);

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

        this.resetForm();
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

    checkCategoryExistence() {
      if (this.categoriesGetter[0]) {
        this.categoriesExist = true;
        this.selectId = this.items[0].id;
        this.loading = false;
      } else if (!this.categoriesGetter[0]) {
        this.categoriesExist = false;
        this.loading = false;
      }
    },

    setDates() {
      this.dateToday = moment(new Date()).format('YYYY-MM-DD');
    },

    async resetForm() {
      this.count = 0;
      this.categoryType = 'outcome';
      this.description = null;
    },
  },
});
</script>

<template>
  <!-- Loader -->
  <LoaderComponent v-if="loading" />

  <!-- Categories do not exist -->
  <div v-else-if="!categoriesExist && !loading">
    <v-card-title>
      Категории отсутствуют
    </v-card-title>
    <v-btn text block to="/categories">
      <v-icon left>mdi-table-row-plus-before</v-icon>
      Создать новую категорию
    </v-btn>
  </div>

  <!-- Categories exist -->
  <div v-else-if="categoriesExist && !loading">
    <v-card-title>
      Новая запись
    </v-card-title>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col class="input-field" cols="12" sm="6" md="6">
          <v-select
            v-model="selectId"
            :items="items"
            item-text="title"
            item-value="id"
            label="Выберите категорию"
            :rules="[validationRules.validMustBeFilled]"
          ></v-select>
        </v-col>

        <!-- datePickerToday -->
        <v-col cols="12" sm="6" md="6">
          <v-menu
            v-model="datePickerToday"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateToday"
                label="Начало периода"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateToday"
              @input="datePickerToday = false"
              locale="locale"
              first-day-of-week="1"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-radio-group
          row
          v-model="categoryType"
          :mandatory="false"
          :rules="[validationRules.validMustBeFilled]"
        >
          <v-radio label="Расход" value="outcome"></v-radio>
          <v-radio label="Доход" value="income"></v-radio>
        </v-radio-group>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            type="number"
            v-model.number="count"
            label="Счет / Общая сумма"
            :rules="[
              validationRules.validMustBeFilled,
              validationRules.validOnlyNumbers,
            ]"
            required
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.trim="marker"
            label="Метка"
            :rules="[validationRules.validOnlyLetters]"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

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

    <CreatedRecordsComponent
      v-if="createdRecords[0]"
      :createdRecords="createdRecords"
    />
  </div>
</template>

<style lang="scss" scoped></style>
