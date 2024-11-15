import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: Home
    },

    {
      path: '/todo/:id/edit',
      name: 'edit',
      component: Edit
    }
  ]
})

export default router