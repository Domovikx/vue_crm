<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';

import {
  HistoryByRecords,
  HistoryRecord,
} from '../../interfaces/History.interface';
import { Records } from '../../interfaces/Record.interface';
import { ThisWindow } from '../../interfaces/ThisWindow.interface';

export default Vue.extend({
  name: 'HistoryPage',
  metaInfo: {
    title: 'История',
  },

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,

    search: '',

    currencyOptions: {
      style: 'currency',
      currency: 'BYN',
      maximumFractionDigits: 2,
    },

    record: null,
    dialogToRemove: false,
  }),

  computed: {
    ...mapGetters([
      'historyByRecordsGetter',
      'infoBillGetter',
      'currencyBaseGetter',
      'recordsGetter',
      'windowGetter',
    ]),

    bill: function (): string {
      return this.infoBillGetter;
    },

    currencyBase: function (): string {
      return this.currencyBaseGetter;
    },

    items: function (): Records {
      return this.recordsGetter;
    },

    window(): ThisWindow {
      return this.windowGetter;
    },

    headers() {
      if (!this.window.isMobile) {
        return [
          { text: 'Дата', value: 'date', align: 'center', sortable: true },
          { text: 'Категория', value: 'category', sortable: true },
          { text: 'Тип', value: 'categoryType' },
          { text: 'Сумма', value: 'count' },
          { text: 'Метка', value: 'marker' },
          { text: 'Действие', value: 'id', sortable: false, align: 'center' },
        ];
      } else if (this.window.isMobile) {
        return [
          { text: 'Сумма', value: 'count' },
          { text: 'Метка', value: 'marker' },
          { text: 'Действие', value: 'id', sortable: false, align: 'center' },
        ];
      }
    },
  },

  async mounted() {
    if (await !this.$store.getters.uidGetter) {
      await this.$store.dispatch('fetchInfoAction');
    }
    if (!this.historyByRecordsGetter) {
      await this.historyByRecordsAction();
    }
    this.loading = false;
  },

  methods: {
    ...mapActions(['historyByRecordsAction', 'removeRecordAction']),

    onEdit(item: HistoryRecord) {
      this.$router.push({ name: 'Detail', params: { id: item.id } });
    },

    onRemove(item: HistoryRecord | any) {
      this.record = item;
      this.dialogToRemove = true;
    },

    async removeRecord() {
      await this.removeRecordAction(this.record);
      this.$router.push('/History');
    },

    customRowClass(item: HistoryRecord) {
      const color =
        item.categoryType === 'outcome'
          ? 'deep-orange lighten-5'
          : 'teal lighten-5';
      return `cursor ${color}`;
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading" color="backgroundMain" outlined>
    <v-card-title>
      История
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Найти"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-card-title>

    <div>Итория за период</div>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :sort-by="['date']"
      :sort-desc="[true]"
      multi-sort
    >
      <template v-slot:item="row">
        <tr :class="customRowClass(row.item)" @click="onEdit(row.item)">
          <td v-if="!window.isMobile">
            {{ row.item.date | dateFilter('DD-MM-YY') }}
          </td>

          <td v-if="!window.isMobile">
            {{ row.item.categoryTitle }}
          </td>

          <td v-if="!window.isMobile">
            {{
              row.item.categoryType | categoryTypeFilter(row.item.categoryType)
            }}
          </td>

          <td>
            {{
              row.item.count
                | currencyFilter({
                  maximumFractionDigits: 2,
                })
            }}
          </td>

          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ row.item.marker }}</span>
              </template>
              <span>{{ row.item.description || row.item.marker }}</span>
            </v-tooltip>
          </td>

          <td class="td-flex">
            <v-btn icon @click.stop="onRemove(row.item)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

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
.td-flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.cursor {
  cursor: pointer;
}
</style>
