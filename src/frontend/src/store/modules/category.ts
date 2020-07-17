/*
https://vuecrm200711.firebaseio.com/
*/

import firebase from 'firebase/app';

import ActionContext from '@/interfaces/ActionContext.interface';
import UserCategory from '@/interfaces/UserCategory.interface';

const category = {
  state: {
    categories: null,
  },

  actions: {
    async createCategoryAction(
      { getters }: ActionContext,
      { limit, title }: UserCategory,
    ) {
      try {
        const uid = await getters.uidGetter;
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ limit, title });
      } catch (error) {
        throw error;
      }
    },

    async fetchCategoriesAction({ getters, commit }: ActionContext) {
      try {
        const uid = await getters.uidGetter;

        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {};

        const categoriesKeys = Object.keys(categories);
        const categoriesFormatting = categoriesKeys.map((key) => {
          const id = key;
          const title = categories[key].title;
          const limit = categories[key].limit;
          return { id, title, limit };
        });

        commit('categoriesMutation', categoriesFormatting);
      } catch (error) {
        throw error;
      }
    },

    async updateCategoriesAction(
      { getters, commit, dispatch }: ActionContext,
      { id, title, limit }: UserCategory,
    ) {
      try {
        const uid = await getters.uidGetter;

        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id || '')
          .update({ title, limit });
      } catch (error) {
        throw error;
      }
    },

    async removeCategoryAction(
      { getters }: ActionContext,
      { id }: UserCategory,
    ) {
      try {
        const uid = await getters.uidGetter;

        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id || '')
          .remove();
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    categoriesMutation(state: any, categories: any) {
      state.categories = categories;
    },
  },

  getters: {
    categoriesGetter: (state: any) => state.categories,
  },
};

export default category;
