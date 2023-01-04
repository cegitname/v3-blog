import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import H5 from '@/views/h5/index.vue'
import Read from '@/views/read/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/read'
  },
  {
    path: '/h5',
    name: 'H5',
    component: H5
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
