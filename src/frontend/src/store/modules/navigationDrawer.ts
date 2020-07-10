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
    navigationDrawerMutation: (state: any, navigationDrawer: boolean) => {
      state.navigationDrawer = navigationDrawer;
    },
  },

  getters: {
    navigationDrawerGetter(state: any) {
      return state.navigationDrawer;
    },
  },
};

export default navigationDrawer;
