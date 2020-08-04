<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions, mapMutations } from 'vuex';
import LoaderComponent from '../../components/LoaderComponent.vue';

import { Record } from '../../interfaces/Record.interface';
import { Categories, UserCategory } from '../../interfaces/Category.interface';
import { ThisWindow } from '../../interfaces/ThisWindow.interface';

import validationRules from '../../utils/validationRules';

export default Vue.extend({
  name: 'DetailPage',
  metaInfo: {
    title: 'Редактирование записи',
  },

  components: {
    LoaderComponent,
  },

  data: () => ({
    validationRules,

    loading: true,
    valid: false,
    id: null || '',

    locale: 'ru-RU',

    categorySelect: {
      type: 'outcome',
    },
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

    categoryTypeSelect: {} || '',
    categoryColor: '',
    categoryText: '',

    dateModal: false,

    dialogToRemove: false,

    form: {
      categoryId: '',
      categoryType: '',
      categoryTitle: '',
      count: '' || 0,
      marker: '',
      description: '',
      date: '',
    } as Record,
  }),

  async created() {
    await this.checkAvailabilityData();

    this.id = this.$route.params.id;
    await this.getRecordByIdAction(this.id);

    this.setCategoryData();
  },

  async mounted() {
    await this.checkAvailabilityData();
    this.loading = false;
  },

  computed: {
    ...mapGetters(['recordByIdGetter', 'categoriesGetter', 'windowGetter']),

    record(): Record {
      return this.recordByIdGetter;
    },

    categoriesAll(): Categories {
      return this.categoriesGetter;
    },

    window(): ThisWindow {
      return this.windowGetter;
    },
  },

  watch: {
    categorySelect(type) {
      const select: CategoryItem | any = this.categoryItems.find(
        (c: CategoryItem) => c.type === type,
      );
      if (select) {
        this.form.categoryType = select.type;
        this.categoryColor = select.color;
        this.categoryText = select.text;
      }
    },

    categoryTypeSelect(id) {
      const categoriesAll: Categories = this.categoriesAll;
      const select: UserCategory | any = categoriesAll.find(
        (c: UserCategory) => c.id === id,
      );
      if (select) {
        this.form.categoryTitle = select.title;
        this.form.categoryId = select.id;
      }
    },
  },

  methods: {
    ...mapActions([
      'getRecordByIdAction',
      'removeRecordAction',
      'updateRecordAction',
      'infoUpdateAction',
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
        ...this.form,
      };

      await this.updateRecordAction(record);
      this.$router.push('/History');
    },

    async setCategoryData() {
      const categorySelect: CategoryItem | any = this.categoryItems.find(
        (c: CategoryItem) => this.record.categoryType === c.type,
      );
      this.categorySelect = categorySelect;

      this.form.date = await new Date(this.record.date)
        .toISOString()
        .substr(0, 10);
      this.form.count = this.record.count;
      this.form.marker = this.record.marker;
      this.form.description = this.record.description;
      this.form.categoryTitle = this.record.categoryTitle;
      this.form.categoryId = this.record.categoryId;
      this.form.categoryType = categorySelect.type;

      this.categoryColor = categorySelect.color;
      this.categoryText = categorySelect.text;

      this.categoryTypeSelect =
        this.categoriesAll.find(
          (c: UserCategory) => c.id === this.record.categoryId,
        ) || '';
    },

    async checkAvailabilityData() {
      if (!this.$store.getters.categoriesGetter) {
        await this.$store.dispatch('fetchCategoriesAction');
      }
      if (!this.$store.getters.recordsGetter) {
        await this.$store.dispatch('fetchRecordsAction');
      }
      if (!this.$store.getters.uidGetter) {
        await this.$store.dispatch('fetchInfoAction');
      }
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
      <span :class="window.isMobile ? 'truncate' : ''">
        {{ form.categoryTitle }} - {{ categoryText }}
      </span>
      <v-spacer></v-spacer>
      <v-btn icon to="/History">
        <v-icon> mdi-close-circle </v-icon>
      </v-btn>
    </v-card-title>

    <v-form ref="form" v-model="valid">
      <v-container>
        <v-select
          label="Категория"
          v-model="categoryTypeSelect"
          :items="categoriesAll"
          :rules="[validationRules.validMustBeFilled]"
          item-text="title"
          item-value="id"
          prepend-icon="mdi-format-list-bulleted"
          required
        ></v-select>

        <v-select
          label="Тип операции"
          v-model="categorySelect"
          :items="categoryItems"
          :rules="[validationRules.validMustBeFilled]"
          item-text="text"
          item-value="type"
          item-color="color"
          prepend-icon="mdi-format-list-bulleted"
          required
        ></v-select>

        <!-- date-picker -->
        <v-dialog
          ref="dialog"
          v-model="dateModal"
          :return-value.sync="form.date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }" class="date-picker">
            <v-text-field
              label="Дата"
              v-model="form.date"
              prepend-icon="mdi-calendar"
              v-on="on"
              readonly
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="form.date"
            scrollable
            :locale="locale"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateModal = false">
              Cancel
            </v-btn>

            <v-btn text color="primary" @click="$refs.dialog.save(form.date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <!-- /date-picker -->

        <v-text-field
          label="Счет"
          v-model="form.count"
          :rules="[
            validationRules.validMustBeFilled,
            validationRules.validOnlyNumbers,
          ]"
          required
          prepend-icon="mdi-credit-card-multiple"
          clearable
        ></v-text-field>

        <v-text-field
          label="Метка"
          v-model="form.marker"
          prepend-icon="mdi-lead-pencil"
          :rules="[validationRules.validOnlyLetters]"
          clearable
        ></v-text-field>

        <v-text-field
          label="Описание"
          v-model="form.description"
          prepend-icon="mdi-lead-pencil"
          clearable
        ></v-text-field>
      </v-container>
    </v-form>

    <v-card-actions class="v-card-actions">
      <!-- btn remove -->
      <v-btn v-if="window.isMobile" icon large @click="onRemove">
        <v-icon>mdi-table-row-remove</v-icon>
      </v-btn>
      <v-btn v-else-if="!window.isMobile" text @click="onRemove">
        <v-icon left>mdi-table-row-remove</v-icon>
        удалить
      </v-btn>

      <!-- btn to history -->
      <v-btn v-if="window.isMobile" icon large to="/History">
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>
      <v-btn v-else-if="!window.isMobile" text to="/History">
        <v-icon left>mdi-chart-line</v-icon>
        История
      </v-btn>

      <!-- btn save -->
      <v-btn
        v-if="window.isMobile"
        icon
        large
        @click="onSave"
        :disabled="!valid"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        v-else-if="!window.isMobile"
        text
        @click="onSave"
        :disabled="!valid"
      >
        <v-icon left>mdi-content-save</v-icon>
        сохранить
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

<style lang="scss" scoped>
.v-card-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 200px;
  }
  .v-card-actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
