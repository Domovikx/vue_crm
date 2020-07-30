import ActionContext from '@/interfaces/ActionContext.interface';
import { Record, Records } from '@/interfaces/Record.interface';
import { Categories, UserCategory } from '@/interfaces/Category.interface';
import {
  HistoryByRecords,
  HistoryRecord,
} from '@/interfaces/History.interface';

const history = {
  // TODO РЕФАКТОРИТЬ!!!

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

        const records: Records = getters.recordsGetter;

        commit('historyByRecordsMutation', records);
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
