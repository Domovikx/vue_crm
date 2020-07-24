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
import { UserCategory } from '@/interfaces/Category.interface';

const record = {
  state: {
    snackbarState: null,
    records: null,
    recordById: null,
  },

  actions: {
    async createRecordAction(
      { dispatch, getters }: ActionContext,
      record: Record,
    ) {
      try {
        const uid: string = getters.uidGetter;

        await firebase.database().ref(`/users/${uid}/records`).push(record);

        await dispatch('fetchRecordsAction');
        await dispatch('historyByRecordsAction');
      } catch (error) {
        throw error;
      }
    },

    async fetchRecordsAction({ getters, commit }: ActionContext) {
      try {
        const uid: string = getters.uidGetter;
        const categories: [UserCategory] = getters.categoriesGetter;

        const records: Records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once('value')
          ).val() || {};

        const recordsKeys = Object.keys(records);
        const recordsFormatting = recordsKeys.map(
          (key: any): Record => {
            const category: UserCategory | any = categories.find(
              (c: UserCategory) => c.id === records[key].categoryId,
            );
            const categoryTitle: string = category.title;

            const record: Record = {
              id: key,
              categoryId: records[key].categoryId,
              categoryType: records[key].categoryType,
              categoryTitle,
              count: records[key].count,
              date: records[key].date,
              description: records[key].description,
            };
            return record;
          },
        );

        await commit('recordsMutation', recordsFormatting);
      } catch (error) {
        throw error;
      }
    },

    async fetchRecordByIdAction(
      /**
       * Данный fetch я не использую, оставлю как пример работы с одной записью
       * Запись уже есть в стейте и я переиспользую ее
       * использую getRecordByIdAction
       */
      { getters, commit }: ActionContext,
      id: string,
    ) {
      try {
        const uid: string = await getters.uidGetter;

        const getRecordById: Record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once('value')
          ).val() || {};

        const recordById = { ...getRecordById, id };

        await commit('recordByIdMutation', recordById);
      } catch (error) {
        throw error;
      }
    },

    async getRecordByIdAction({ getters, commit }: ActionContext, id: string) {
      const records: [Record] = getters.recordsGetter;
      const recordById: Record | any = records.find((r: Record) => r.id === id);

      await commit('recordByIdMutation', recordById);
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
    recordByIdMutation: (state: any, recordId: Record) => {
      state.recordById = recordId;
    },
  },

  getters: {
    recordsGetter: (state: any): Records => {
      return state.records;
    },
    recordByIdGetter: (state: any): Record => {
      return state.recordById;
    },
  },
};

export default record;
