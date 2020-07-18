<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';
import Record from '../../interfaces/Record.interface';

export default Vue.extend({
  name: 'RecordPage',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
    valid: false,

    items: [],
    select: {},
    selectId: null,

    categoryType: 'outcome',

    count: null,
    countRules: [
      (v: string) => !!v || 'Это поле нужно заполнить',
      (v: string) =>
        /^\d+(?:[\.,]\d+)?$/.test(v) ||
        'Это поле должно содержать только числа',
    ],

    description: null,
  }),

  computed: {
    ...mapGetters(['categoriesGetter', 'infoBillGetter', 'currencyBaseGetter']),

    bill: function () {
      return this.infoBillGetter;
    },

    currencyBase: function () {
      return this.currencyBaseGetter;
    },
  },

  created() {
    this.items = this.categoriesGetter;

    const select: any = this.items[0] || null;

    this.select = select || null;
    this.selectId = select.id;
  },

  mounted() {
    this.loading = false;
  },

  methods: {
    async createRecord() {
      try {
        const record: Record = {
          categoryId: this.selectId,
          count: this.count,
          description: this.description || '',
          categoryType: this.categoryType,
          date: new Date().toJSON(),
        };

        await this.$store.dispatch('createRecordAction', record);

        let bill = 0;
        const b: number = Number(this.bill);
        const c: number = Number(this.count);
        if (this.categoryType === 'outcome') {
          bill = b - c;
        }
        if (this.categoryType === 'income') {
          bill = b + c;
        }

        await this.$store.dispatch('infoUpdateBillAction', { bill });

        let f: any = this.$refs.form;
        f.reset();
      } catch (error) {
        throw error;
      }
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <div v-else-if="!loading">
    <v-card-action>
      <h2>Новая запись</h2>
      <p>Остаток на счёте: {{ bill }} {{ currencyBase }}</p>
    </v-card-action>

    <v-form ref="form" v-model="valid">
      <div class="input-field">
        <v-select
          v-model="select"
          :items="items"
          item-text="title"
          item-value="id"
          label="Выберите категорию"
        ></v-select>
      </div>

      <v-radio-group v-model="categoryType" :mandatory="false">
        <v-radio label="Расход" value="outcome"></v-radio>
        <v-radio label="Доход" value="income"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model.trim="count"
        label="Счет / Общая сумма"
        :rules="countRules"
        required
      ></v-text-field>

      <v-text-field v-model.trim="description" label="Описание"></v-text-field>

      <v-card-actions>
        <v-btn
          block
          color="info"
          @click.prevent="createRecord"
          :disabled="!valid"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<style lang="scss" scoped></style>
