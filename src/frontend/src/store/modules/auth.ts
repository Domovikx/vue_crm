/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';
import { app } from '@/main';

import ActionContext from '@/interfaces/ActionContext.interface';
import RegistrationData from '@/interfaces/RegistrationData.interface';

const auth = {
  state: {
    uid: null,
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

    async logoutAction({ commit }: ActionContext) {
      await firebase.auth().signOut();
      app.$router.go();
      // commit('clearInfoMutation');
      // костыль для сброса стора
    },

    async registerAction(
      { dispatch, commit, getters }: ActionContext,
      { email, password, name }: RegistrationData,
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await dispatch('getUidAction');
        const uid = getters.uidGetter;

        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (error) {
        commit('setErrorNotificationMutation', error);
        throw error;
      }
    },

    async getUidAction({ commit }: any) {
      const user: any = firebase.auth().currentUser || null;
      const userUid: any = user.uid || null;
      await commit('setUidMutation', userUid);
      return userUid;
    },
  },

  mutations: {
    setUidMutation(state: any, uid: any) {
      state.uid = uid;
    },
  },

  getters: {
    uidGetter: (state: any) => state.uid,
  },
};

export default auth;
