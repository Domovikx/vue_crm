/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import Record from '@/interfaces/Record.interface';

const record = {
  state: {
    snackbarState: null,
    records: null,
  },

  actions: {
    async createRecordAction(
      { commit, dispatch }: ActionContext,
      record: Record,
    ) {
      try {
        const uid = await dispatch('getUidAction');
        await firebase.database().ref(`/users/${uid}/records`).push(record);

        dispatch('fetchRecordsAction');
      } catch (error) {
        throw error;
      }
    },

    async fetchRecordsAction({ getters, commit }: ActionContext) {
      try {
        const uid = await getters.uidGetter;

        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once('value')
          ).val() || {};

        const recordsKeys = Object.keys(records);
        const recordsFormatting = recordsKeys.map((key) => {
          const record = {
            id: key,
            categoryId: records[key].categoryId,
            categoryType: records[key].categoryType,
            count: records[key].count,
            date: records[key].date,
            description: records[key].description,
          };
          return record;
        });

        commit('recordsMutation', recordsFormatting);
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    recordsMutation: (state: any, records: any) => {
      state.records = records;
    },
  },

  getters: {
    recordsGetter: (state: any) => {
      return state.records;
    },
  },
};

export default record;
