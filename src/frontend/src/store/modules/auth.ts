/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import RegistrationData from '@/interfaces/RegistrationData.interface';

const auth = {
  state: {
    user: {
      uid: null,
    },
  },

  actions: {
    async loginAction(
      { dispatch, commit }: ActionContext,
      { email, password }: RegistrationData,
    ) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await dispatch('getUidAction');
      } catch (error) {
        commit('setErrorNotificationMutation', error);
        throw error;
      }
    },

    async logoutAction({ dispatch, commit }: ActionContext) {
      await firebase.auth().signOut();
      commit('clearInfoMutation');
    },

    async registerAction(
      { dispatch, commit }: ActionContext,
      { email, password, name }: RegistrationData,
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUidAction');

        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (error) {
        commit('setErrorNotificationMutation', error);
        throw error;
      }
    },

    getUidAction({ commit }: any): string | null {
      const user: any = firebase.auth().currentUser || null;
      const userUid = user.uid || null;

      commit('setUidMutation', userUid);
      return userUid;
    },
  },

  mutations: {
    setUidMutation(state: any, uid: any) {
      state.user.uid = uid;
    },
  },

  getters: {
    uidGetter: (state: any) => state.user.uid,
  },
};

export default auth;
