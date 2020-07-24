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
    // color: ''
  }),

  async mounted() {
    this.id = this.$route.params.id;
    await this.getRecordByIdAction(this.id);
    this.loading = false;
  },

  computed: {
    ...mapGetters(['recordByIdGetter']),

    record(): Record {
      return this.recordByIdGetter;
    },
    color(): string {
      return this.record.categoryType === 'outcome'
        ? 'deep-orange lighten-4'
        : 'teal lighten-4';
    },
    categoryType(): string {
      return this.record.categoryType === 'outcome' ? 'Расход' : 'Доход';
    },
  },

  methods: {
    ...mapActions(['getRecordByIdAction']),
  },
});
</script>

<template>
  <LoaderComponent v-if="loading" />

  <v-card v-else-if="!loading">
    <v-card-title :class="color">
      {{ record.categoryTitle }} - {{ categoryType }}
    </v-card-title>

    <v-list-item> Сумма: {{ record.count }} </v-list-item>
    <v-list-item>
      Дата: {{ record.date | dateFilter('DD-MM-YY time') }}
    </v-list-item>
    <v-list-item v-if="record.description">
      Описание: {{ record.description }}
    </v-list-item>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text to="/History">
        удалить
      </v-btn>

      <v-btn text to="/History">
        сохранить
      </v-btn>

      <v-btn text to="/History">
        История
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
