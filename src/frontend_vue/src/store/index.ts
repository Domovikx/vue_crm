import Vue from 'vue';
import Vuex from 'vuex';

import isOpenSidebar from './modules/isOpenSidebar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    isOpenSidebar,
  },
});
