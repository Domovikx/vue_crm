import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import HomePage from '../views/pages/HomePage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    // api для разработки, набор SVG иконок
    path: '/api/svg',
    name: 'all-icons-page',
    component: () => import('../components/icons/AllIconsPage.vue'),
    meta: { layout: 'EmptyLayout' },
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Categories',
    name: 'Categories',
    component: () => import('../views/pages/CategoriesPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/pages/LoginPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Detail',
    name: 'Detail',
    component: () => import('../views/pages/DetailPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/History',
    name: 'History',
    component: () => import('../views/pages/HistoryPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Planning',
    name: 'Planning',
    component: () => import('../views/pages/PlanningPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/pages/ProfilePage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Record',
    name: 'Record',
    component: () => import('../views/pages/RecordPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/pages/RegisterPage.vue'),
    meta: { layout: 'DefaultLayout' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
