import Vue from 'vue';
import Vuex from 'vuex';

import navigationDrawer from './modules/navigationDrawer';
import snackbar from './modules/snackbar';
import auth from './modules/auth';
import errorNotification from './modules/errorNotification';
import info from './modules/info';
import currency from './modules/currency';
import category from './modules/category';
import record from './modules/record';
import plannings from './modules/plannings';
import history from './modules/history';
import window from './modules/window';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navigationDrawer,
    snackbar,
    auth,
    errorNotification,
    info,
    currency,
    category,
    record,
    plannings,
    history,
    window,
  },
});
