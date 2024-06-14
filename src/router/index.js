import { createRouter, createWebHistory } from 'vue-router';

const AppPokedex = () => import('../views/AppPokedex.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokedex',
      component: AppPokedex,
    },
  ],
});

export default router;
