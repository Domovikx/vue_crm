/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import {
  Record,
  Records,
  RecordTypeOrder,
} from '@/interfaces/Record.interface';
import { HistoryRecord } from '@/interfaces/History.interface';

const record = {
  state: {
    snackbarState: null,
    records: null,
  },

  actions: {
    async createRecordAction(
      { dispatch, getters }: ActionContext,
      record: Record,
    ) {
      try {
        // const uid: String = await dispatch('getUidAction');
        const uid: String = await getters.uidGetter;

        await firebase.database().ref(`/users/${uid}/records`).push(record);

        await dispatch('fetchRecordsAction');
        await dispatch('historyByRecordsAction');
      } catch (error) {
        throw error;
      }
    },

    async fetchRecordsAction({ getters, commit }: ActionContext) {
      try {
        const uid: string = await getters.uidGetter;

        const records: Records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once('value')
          ).val() || {};

        const recordsKeys = Object.keys(records);
        const recordsFormatting = recordsKeys.map(
          (key: any): Record => {
            const record = {
              id: key,
              categoryId: records[key].categoryId,
              categoryType: records[key].categoryType,
              count: records[key].count,
              date: records[key].date,
              description: records[key].description,
            };
            return record;
          },
        );

        commit('recordsMutation', recordsFormatting);
      } catch (error) {
        throw error;
      }
    },

    async removeRecordAction(
      { getters, dispatch }: ActionContext,
      record: HistoryRecord,
    ) {
      try {
        const uid: string = getters.uidGetter;
        const typeOrder: RecordTypeOrder = record.categoryType;
        let bill: number = getters.infoBillGetter;

        if (typeOrder === 'outcome') {
          bill += Number(record.count);
        }

        if (typeOrder === 'income') {
          bill -= Number(record.count);
        }

        // удаляем запись
        await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .child(record.id)
          .remove();

        // обновляем счет
        await dispatch('infoUpdateBillAction', { bill });
        await dispatch('fetchRecordsAction');
        await dispatch('historyByRecordsAction');
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    recordsMutation: (state: any, records: Records) => {
      state.records = records;
    },
  },

  getters: {
    recordsGetter: (state: any): Records => {
      return state.records;
    },
  },
};

export default record;
