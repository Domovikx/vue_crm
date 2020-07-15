/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import { ActionContext } from '@/interfaces/ActionContext.interface';

const info = {
  state: {
    info: {},
  },

  actions: {
    async fetchInfoAction({ dispatch, commit, getters }: ActionContext) {
      try {
        const uid = await getters.uidGetter;
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once('value')
        ).val();
        commit('setInfoMutation', info);
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    setInfoMutation(state: any, info: any) {
      state.info = info;
    },
    clearInfoMutation(state: any) {
      state.info = {};
    },
  },

  getters: {
    infoGetter: (state: any) => state.info,
    infoUserNameGetter: (state: any) => state.info.name || null,
    infoBillGetter: (state: any) => state.info.bill || null,
  },
};

export default info;
