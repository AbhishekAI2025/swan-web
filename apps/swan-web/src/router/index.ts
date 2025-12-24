import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DonateView from '../views/DonateView.vue'
import VolunteerView from '../views/VolunteerView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView,
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      component: VolunteerView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAdmin: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { isAdmin, authReady, user, authLoadError } = useAuth()

  if (to.meta?.requiresAdmin) {
    await authReady

    if (authLoadError) {
      return next({ name: 'admin-login', query: { error: 'auth' } })
    }

    if (isAdmin.value) {
      return next()
    }

    return next({ name: 'admin-login', query: { redirect: to.fullPath ?? '/admin' } })
  }

  if (to.meta?.guestOnly && user.value) {
    return next({ name: 'admin' })
  }

  return next()
})

export default router
