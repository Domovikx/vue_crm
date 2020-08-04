import ActionContext from '@/interfaces/ActionContext.interface';
import { Record, Records } from '@/interfaces/Record.interface';
import { Categories, UserCategory } from '@/interfaces/Category.interface';
import {
  HistoryByRecords,
  HistoryRecord,
} from '@/interfaces/History.interface';
import firebase from 'firebase/app';

const history = {
  state: {
    period: {
      startDate: null,
      endDate: null,
    },
    historyByRecords: null,
    historyRecordsByPeriod: null,
  } as HistoryState,

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

    async historyRecordsByPeriodAction({
      getters,
      commit,
      dispatch,
    }: ActionContext) {
      try {
        let uid: string = getters.uidGetter;
        if (!uid) {
          await dispatch('fetchInfoAction');
          uid = getters.uidGetter;
        }

        const period = getters.historyPeriodGetter;
        if (period) {
          const records: Records = (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .orderByChild('date')
              .startAt(period.startDate)
              .endAt(period.endDate)
              .once('value')
          ).val();

          const keys: string[] = Object.keys(records);
          const recordsFormatted = keys.map(
            (key: string | any): Record => {
              const record: Record = {
                id: key,
                ...records[key],
              };
              return record;
            },
          );

          commit('historyRecordsByPeriodMutation', recordsFormatted);
        }
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    historyByRecordsMutation: (
      state: HistoryState,
      historyByRecords: HistoryByRecords,
    ): void => {
      state.historyByRecords = historyByRecords;
    },

    historyRecordsByPeriodMutation: (
      state: HistoryState,
      recordsFormatted: Records,
    ): void => {
      state.historyRecordsByPeriod = recordsFormatted;
    },

    historyDatesMutation: (state: HistoryState, period: any): void => {
      state.period = { ...state.period, ...period };
    },
  },

  getters: {
    historyByRecordsGetter: (state: HistoryState): Records | null => {
      return state.historyByRecords;
    },
    historyRecordsByPeriodGetter: (state: HistoryState): Records | null => {
      return state.historyRecordsByPeriod;
    },
    historyPeriodGetter: (state: HistoryState) => {
      if (state.period.startDate && state.period.endDate) {
        return state.period;
      } else return null;
    },
  },
};

export default history;

interface HistoryState {
  historyByRecords: Records | null;
  historyRecordsByPeriod: Records | null;
  period: {
    startDate: string | null;
    endDate: string | null;
  };
}
