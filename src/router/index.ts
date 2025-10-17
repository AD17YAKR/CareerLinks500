import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../pages/SearchPage.vue'
import AddCompanyPage from '../pages/AddCompanyPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/add',
    name: 'AddCompany',
    component: AddCompanyPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router