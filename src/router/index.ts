import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Read from '@/views/read/index.vue'
import Layout from '@/layout/menuLayout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/homeList'
  },
  {
    path: '/homeList',
    name: 'homeList',
    component: () => import('@/views/homeList/index')
  },
  {
    path: '/h5list',
    name: 'H5list',
    component: () => import('@/views/h5/index.vue')
  },
  {
    path: '/h5',
    name: 'H5',
    component: Layout,
    children: [
      {
        path: '/doc',
        name: 'h5Doc',
        component: () => import('@/views/h5/doc')
      }
    ]
  },
  {
    path: '/read',
    name: 'Read',
    component: Read
  }
]
export default createRouter({
  history: createWebHashHistory(),
  routes
})
