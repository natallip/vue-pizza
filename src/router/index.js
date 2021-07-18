import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Promotions from '../views/Promotions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: Promotions,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      let section = document.querySelector(to.hash)
      let sections = document.querySelectorAll('.section')
      let top = section?.getBoundingClientRect().top + pageYOffset

      window.scrollTo(0, top)
    }
  },
})

export default router
