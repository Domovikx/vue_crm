<script lang="ts">
import Vue from 'vue';

import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'SnackTestPage',

  data: () => ({
    snackText: '',
  }),

  methods: {
    ...mapMutations(['snackbarMutation']),

    snackTime: function (snack: any) {
      this.snackbarMutation(this.snackText);
      this.$router.push('/Register');
    },
  },
});
</script>

<template>
  <v-layout>
    <v-flex text-xs-center xs4 offset-xs4>
      <v-text-field label="What snack text?" v-model="snackText" />
      <v-btn class="primary" @click="snackTime">Test snack</v-btn>
    </v-flex>
  </v-layout>
</template>
