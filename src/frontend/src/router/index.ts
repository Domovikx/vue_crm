import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import firebase from 'firebase/app';

import HomePage from '../views/pages/HomePage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // EmptyLayout
  // api для разработки, набор SVG иконок
  {
    path: '/api/svg',
    name: 'all-icons-page',
    component: () => import('../components/icons/AllIconsPage.vue'),
    meta: { layout: 'EmptyLayout' },
  },

  // test
  {
    path: '/SnackTest',
    name: 'SnackTest',
    component: () => import('../views/pages/SnackTestPage.vue'),
    meta: { layout: 'EmptyLayout' },
  },

  // EmptyLayout
  // Login / Register
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/pages/LoginPage.vue'),
    meta: { layout: 'EmptyLayout' },
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/pages/RegisterPage.vue'),
    meta: { layout: 'EmptyLayout' },
  },

  // DefaultLayout
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
  {
    path: '/Categories',
    name: 'Categories',
    component: () => import('../views/pages/CategoriesPage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },

  {
    path: '/Detail',
    name: 'Detail',
    component: () => import('../views/pages/DetailPage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
  {
    path: '/History',
    name: 'History',
    component: () => import('../views/pages/HistoryPage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
  {
    path: '/Planning',
    name: 'Planning',
    component: () => import('../views/pages/PlanningPage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/pages/ProfilePage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
  {
    path: '/Record',
    name: 'Record',
    component: () => import('../views/pages/RecordPage.vue'),
    meta: { layout: 'DefaultLayout', requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser: any = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!currentUser && requiresAuth) {
    next('/login?message=login');
  } else {
    next();
  }

  // TODO: защита роутов не полная можно войти в соседней вкладке. баг.
});

export default router;
