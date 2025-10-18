import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../pages/SearchPage.vue'
import AddCompanyPage from '../pages/AddCompanyPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import JobTrackingPage from '../pages/JobTrackingPage.vue'
import { supabase } from '../services/supabaseClient'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SearchPage
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/add',
    name: 'AddCompany',
    component: AddCompanyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/jobs',
    name: 'JobTracking',
    component: JobTrackingPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (to.meta.requiresAuth && !user) {
    next('/auth')
  } else if (to.meta.requiresGuest && user) {
    next('/')
  } else {
    next()
  }
})

export default router