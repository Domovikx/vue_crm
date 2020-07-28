import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify.plugin';
import VueMeta from 'vue-meta';

import dateFilter from './filters/dateFilter';
import currencyFilter from './filters/currencyFilter';
import categoryTypeFilter from './filters/categoryTypeFilter';

import './registerServiceWorker';
import 'idempotent-babel-polyfill';

// firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.devtools = true;
Vue.config.productionTip = false;

// filters
Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('categoryTypeFilter', categoryTypeFilter);

Vue.use(VueMeta);

let app: any;

firebase.initializeApp({
  apiKey: 'AIzaSyAZEZWhTjkIhLUJxFY4YVmnjTOXWUgUDto',
  authDomain: 'vuecrm200711.firebaseapp.com',
  databaseURL: 'https://vuecrm200711.firebaseio.com',
  projectId: 'vuecrm200711',
  storageBucket: 'vuecrm200711.appspot.com',
  messagingSenderId: '304525049911',
  appId: '1:304525049911:web:4ffa82a15eefa7a7f1bfb2',
  measurementId: 'G-P58XLBGK8G',
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

export { app };
