import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/dateFilter';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import 'idempotent-babel-polyfill';

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
