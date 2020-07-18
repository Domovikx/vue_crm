/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';

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

    async infoUpdateBillAction(
      { dispatch, commit, getters }: ActionContext,
      { bill }: any,
    ) {
      try {
        const uid = await getters.uidGetter;
        const info = await getters.infoGetter;
        const updateData = { ...info, bill };
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);

        commit('setInfoMutation', updateData);
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
