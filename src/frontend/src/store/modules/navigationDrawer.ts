const navigationDrawer = {
  state: {
    navigationDrawer: true,
  },

  actions: {
    navigationDrawerAction: (context: any, navigationDrawer: boolean) => {
      context.commit('navigationDrawerMutation', !navigationDrawer);
    },
  },

  mutations: {
    navigationDrawerMutation: (state: any, payload: boolean) => {
      state.navigationDrawer = payload;
    },
  },

  getters: {
    navigationDrawerGetter(state: any) {
      return state.navigationDrawer;
    },
  },
};

export default navigationDrawer;
