<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions, mapMutations } from 'vuex';
import { Record } from '../../interfaces/Record.interface';
import LoaderComponent from '../../components/LoaderComponent.vue';

export default Vue.extend({
  name: 'DetailPage',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,
    id: null || '',

    locale: 'ru-RU',

    categorySelect: {},
    categoryItems: [
      {
        type: 'outcome',
        text: 'Расход',
        color: 'deep-orange lighten-4',
      },
      {
        type: 'income',
        text: 'Доход',
        color: 'teal lighten-4',
      },
    ],
    categoryTypeRules: [(v: string) => !!v || 'Это поле нужно заполнить'],

    categoryType: '',
    categoryColor: '',
    categoryText: '',

    date: '',
    dateModal: false,
    dateRules: [(v: string) => !!v || 'Это поле нужно заполнить'],

    count: null,
    countRules: [
      (v: string) => !!v || 'Это поле нужно заполнить',
      (v: string) =>
        /^\d+(?:[\.,]\d+)?$/.test(v) ||
        'Это поле должно содержать только числа',
    ],

    description: null,

    dialogToRemove: false,
  }),

  async created() {
    this.id = this.$route.params.id;
    await this.getRecordByIdAction(this.id);

    const categorySelect: CategoryItem | any = this.categoryItems.find(
      (c: CategoryItem) => this.record.categoryType === c.type,
    );
    this.categorySelect = categorySelect;
    this.date = new Date(this.record.date).toISOString().substr(0, 10);
    this.count = this.record.count;
    this.description = this.record.description;

    this.categoryType = categorySelect.type;
    this.categoryColor = categorySelect.color;
    this.categoryText = categorySelect.text;
  },

  async mounted() {
    this.loading = false;
  },

  computed: {
    ...mapGetters(['recordByIdGetter']),

    record(): Record {
      return this.recordByIdGetter;
    },
  },

  watch: {
    categorySelect(type) {
      const select: CategoryItem | any = this.categoryItems.find(
        (c: CategoryItem) => c.type === type,
      );
      this.categoryType = select.type;
      this.categoryColor = select.color;
      this.categoryText = select.text;
    },
  },

  methods: {
    ...mapActions([
      'getRecordByIdAction',
      'removeRecordAction',
      'updateRecordAction',
    ]),

    onRemove() {
      this.dialogToRemove = true;
    },

    async removeRecord() {
      await this.removeRecordAction(this.record);
      this.$router.push('/History');
    },

    async onSave() {
      const record: Record = {
        ...this.record,
        categoryType: this.categoryType,
        date: this.date,
        count: this.count,
        description: this.description,
      };

      await this.updateRecordAction(record);
      this.$router.push('/History');
    },
  },
});

interface CategoryItem {
  type: string;
  color: string;
  text: string;
}
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading">
    <v-card-title :class="categoryColor">
      {{ record.categoryTitle }} - {{ categoryText }}
      <v-spacer></v-spacer>
      <v-btn icon to="/History">
        <v-icon dark>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-form ref="form" v-model="valid">
      <v-container>
        <v-select
          label="Тип операции"
          v-model="categorySelect"
          :items="categoryItems"
          :rules="categoryTypeRules"
          item-text="text"
          item-value="type"
          item-color="color"
          prepend-icon="mdi-format-list-bulleted"
          required
        ></v-select>

        <v-dialog
          ref="dialog"
          v-model="dateModal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Дата"
              v-model="date"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="date"
            scrollable
            :locale="locale"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateModal = false">
              Cancel
            </v-btn>

            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-text-field
          label="Счет"
          v-model="count"
          :rules="countRules"
          required
          prepend-icon="mdi-credit-card-multiple"
        ></v-text-field>

        <v-text-field
          label="Описание"
          v-model="description"
          prepend-icon="mdi-lead-pencil"
        ></v-text-field>
      </v-container>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="onRemove">
        удалить
      </v-btn>

      <v-btn text @click="onSave">
        сохранить
      </v-btn>

      <v-btn text to="/History">
        История
      </v-btn>
    </v-card-actions>

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
            @click="(dialogToRemove = false), removeRecord()"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
