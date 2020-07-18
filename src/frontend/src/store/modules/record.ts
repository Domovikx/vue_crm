/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import Record from '@/interfaces/Record.interface';

const record = {
  state: {
    snackbarState: null,
  },

  actions: {
    async createRecordAction(
      { commit, dispatch }: ActionContext,
      record: Record,
    ) {
      try {
        const uid = await dispatch('getUidAction');
        await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    // snackbarMutation: (state: any, message: string) => {
    //   state.snackbarState = message;
    // },
  },

  getters: {
    // snackbarStateGetter: (state: any) => {
    //   return state.snackbarState;
    // },
  },
};

export default record;
