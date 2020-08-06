import { ThisWindow } from '@/interfaces/ThisWindow.interface';

const snackbar = {
  state: {
    window: {},
  },

  mutations: {
    windowMutation: (state: any, window: ThisWindow) => {
      state.window = window;
    },
  },

  getters: {
    windowGetter: (state: any) => {
      return state.window;
    },
  },
};

export default snackbar;
