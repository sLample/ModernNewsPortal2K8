import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/login', name: 'Login', component: Login },
    { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAdmin: true } },
  ]
})

// Bảo vệ route admin
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    next('/login')
  } else {
    next()
  }
})

export default router