const navigationDrawer = {
  state: {
    drawer: null,
  },

  mutations: {
    navigationDrawerMutation: (state: any, drawer: boolean) => {
      state.drawer = drawer;
    },
  },

  getters: {
    navigationDrawerGetter: (state: any) => state.drawer,
  },
};

export default navigationDrawer;
