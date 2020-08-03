<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import { mapGetters } from 'vuex';

import { Record } from '../../../interfaces/Record.interface';
import customColorClass from '../../../utils/customColorClass';

export default Vue.extend({
  name: 'CreatedRecordsComponent',

  props: ['createdRecords'],

  data() {
    return {
      symbol: 'byn',
    };
  },

  computed: {
    ...mapGetters(['currencyBaseGetter']),

    currencyBase(): any {
      return this.currencyBaseGetter;
    },

    records(): Record[] {
      return this.createdRecords;
    },
  },

  mounted() {},

  methods: {
    customColorClass,

    toRecord(id: string) {
      this.$router.push({ path: `/Detail/${id}` });
    },
  },
});
</script>

<template>
  <v-col cols="12" sm="12" md="6">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="record in records"
          :key="record.title"
          :cols="record.flex"
        >
          <v-card
            class="mx-auto"
            :color="customColorClass(record.categoryType)"
            min-width="250"
            btn
            @click="toRecord(record.id)"
          >
            <v-card-title>{{ record.categoryTitle }}</v-card-title>
            <v-card-text>
              <v-row class="headline font-weight-normal">
                <v-col>
                  {{
                    record.count
                      | currencyFilter({
                        style: 'currency',
                        currency: currencyBase,
                        maximumFractionDigits: 2,
                      })
                  }}
                </v-col>
              </v-row>
              <v-row>
                <v-col>{{ record.date | momentFilter }}</v-col>
                <v-col v-if="record.marker">{{ record.marker }}</v-col>
              </v-row>
              <p v-if="record.description">{{ record.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>
