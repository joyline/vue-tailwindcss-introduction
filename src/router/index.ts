import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '@/views/SigninView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'sign-in' },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SigninView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404-not-found',
      component: () => import('@/views/error/404.vue'),
    },
  ],
})

export default router
