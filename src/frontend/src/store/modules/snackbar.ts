const snackbar = {
  state: {
    snackbarState: null,
  },

  mutations: {
    snackbarMutation: (state: any, message: string) => {
      state.snackbarState = message;
    },
  },

  getters: {
    snackbarStateGetter: (state: any) => {
      return state.snackbarState;
    },
  },
};

export default snackbar;
