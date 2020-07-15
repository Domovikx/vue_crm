const snackbar = {
  state: {
    snackbarState: null,
  },

  mutations: {
    snackbarMutation: (state: any, payload: any) => {
      state.snackbarState = payload;
    },
  },

  getters: {
    snackbarStateGetter: (state: any) => {
      return state.snackbarState;
    },
  },
};

export default snackbar;
