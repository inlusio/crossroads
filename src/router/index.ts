import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/story/scene/:scene',
      name: 'scene',
      component: () => import('../views/SceneView.vue'),
    },
    {
      path: '/admin',
      redirect: '/admin/index.html',
    },
  ],
})

export default router
