/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import { Info } from '@/interfaces/Info.interface';

const info = {
  state: {
    info: {},
  },

  actions: {
    async fetchInfoAction({ commit, getters, dispatch }: ActionContext) {
      try {
        let uid = await getters.uidGetter;

        if (!uid) {
          uid = await dispatch('getUidAction');
          await commit('setUidMutation', uid);
          await dispatch('fetchCategoriesAction');
        }

        if (uid) {
          const info = (
            await firebase.database().ref(`/users/${uid}/info`).once('value')
          ).val();
          await commit('setInfoMutation', info);
        }
      } catch (error) {
        throw error;
      }
    },

    // todo infoUpdateBillAction == infoUpdateAction
    async infoUpdateAction(
      { commit, getters }: ActionContext,
      { bill, name }: Info,
    ) {
      try {
        const uid = await getters.uidGetter;
        const info: Info = await getters.infoGetter;

        if (name) info.name = name;
        if (bill) info.bill = bill;

        await firebase.database().ref(`/users/${uid}/info`).update(info);

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
    infoUserNameGetter: (state: any) => state.info.name,
    infoBillGetter: (state: any) => state.info.bill,
  },
};

export default info;
