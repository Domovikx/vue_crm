const errorNotification = {
  state: {
    errorNotification: null,
  },

  mutations: {
    setErrorNotificationMutation(state: any, error: any) {
      state.errorNotification = error;
    },

    clearErrorNotificationMutation(state: any) {
      // TODO: Возможно это не работает
      state.errorNotification = null;
    },
  },

  getters: {
    errorNotificationGetter: (state: any) => state.errorNotification,
  },
};

export default errorNotification;
