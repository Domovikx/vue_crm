<script lang="ts">
import Vue from 'vue';

import { mapGetters, mapActions } from 'vuex';

import LoaderComponent from '../../components/LoaderComponent.vue';

import { HistoryByRecords } from '../../interfaces/History.interface';

export default Vue.extend({
  name: 'HistoryPage',

  components: {
    LoaderComponent,
  },

  data: () => ({
    loading: true,

    search: '',

    headers: [
      { text: 'Дата', value: 'date', align: 'center', sortable: true },
      { text: 'Тип', value: 'categoryType' },
      { text: 'Сумма', value: 'count' },
      { text: 'Описание', value: 'description' },
      { text: 'Действия', value: 'id', sortable: false, align: 'center' },
    ],
  }),

  computed: {
    ...mapGetters([
      'historyByRecordsGetter',
      'infoBillGetter',
      'currencyBaseGetter',
    ]),

    bill: function (): string {
      return this.infoBillGetter;
    },

    currencyBase: function (): string {
      return this.currencyBaseGetter;
    },

    items: function (): HistoryByRecords {
      return this.historyByRecordsGetter;
    },
  },

  async mounted() {
    if (!this.historyByRecordsGetter) {
      await this.historyByRecordsAction();
    }

    this.loading = false;
  },

  methods: {
    ...mapActions(['historyByRecordsAction']),

    onEdit() {
      console.log('onEdit :>> ');
    },

    onRemove() {
      console.log('onRemove :>> ');
    },
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading">
    <v-card-title>
      История записей
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Найти"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :sort-by="['date']"
      :sort-desc="[true]"
      multi-sort
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.date | dateFilter('DD-MM-YY time') }}</td>

          <td>
            {{
              row.item.categoryType | categoryTypeFilter(row.item.categoryType)
            }}
          </td>

          <td>{{ row.item.count }}</td>

          <td class="truncate">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ row.item.description }}</span>
              </template>
              <span>{{ row.item.description }}</span>
            </v-tooltip>
          </td>

          <td class="td-flex">
            <v-btn fab dark small @click="onEdit(row.item.id)">
              <v-icon dark>mdi-table-edit</v-icon>
            </v-btn>

            <v-btn fab dark small @click="onRemove(row.item.id)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style lang="scss" scoped>
.td-flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
