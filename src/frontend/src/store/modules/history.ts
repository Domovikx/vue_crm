import ActionContext from '@/interfaces/ActionContext.interface';
import { Record, Records } from '@/interfaces/Record.interface';
import { Categories, UserCategory } from '@/interfaces/Category.interface';
import {
  HistoryByRecords,
  HistoryRecord,
} from '@/interfaces/History.interface';

const history = {
  state: {
    historyByRecords: null,
  },

  actions: {
    async historyByRecordsAction({ getters, commit, dispatch }: ActionContext) {
      try {
        if (!getters.categoriesGetter) {
          await dispatch('fetchCategoriesAction');
        }

        if (!getters.recordsGetter) {
          await dispatch('fetchRecordsAction');
        }

        const categories: Categories = getters.categoriesGetter;
        const records: Records = getters.recordsGetter;

        const historyByRecords: HistoryByRecords = records.map(
          (record: Record) => {
            const category: UserCategory =
              categories.find(
                (c: UserCategory) => c.id === record.categoryId,
              ) || {};

            const historyRecord: HistoryRecord = {
              ...record,
              categoryTitle: category.title || '',
            };

            return historyRecord;
          },
        );

        commit('historyByRecordsMutation', historyByRecords);
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    historyByRecordsMutation: (
      state: any,
      historyByRecords: HistoryByRecords,
    ) => {
      state.historyByRecords = historyByRecords;
    },
  },

  getters: {
    historyByRecordsGetter: (state: any): HistoryByRecords => {
      return state.historyByRecords;
    },
  },
};

export default history;
