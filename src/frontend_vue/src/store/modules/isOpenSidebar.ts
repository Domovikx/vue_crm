const isOpenSidebar = {
  state: {
    isOpenSidebar: true,
  },

  getters: {
    isOpenSidebarGetter(state: any) {
      return state.isOpenSidebar;
    },
  },

  actions: {
    isOpenSidebarAction: (context: any, isOpenSidebar: boolean) => {
      context.commit('isOpenSidebarMutation', !isOpenSidebar);
    },
  },

  mutations: {
    isOpenSidebarMutation: (state: any, isOpenSidebar: boolean) => {
      state.isOpenSidebar = isOpenSidebar;
    },
  },
};

export default isOpenSidebar;
