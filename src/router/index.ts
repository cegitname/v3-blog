import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Read from '@/views/read/index.vue'
import Layout from '@/layout/menuLayout.vue'

const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules = modulesFiles.keys().reduce((moduless: any, modulePath: any) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  moduless[moduleName] = value.default(Layout)
  return moduless
}, {})
const BaseRoutes: Array<RouteRecordRaw> = [
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
    path: '/read',
    name: 'Read',
    component: Read
  }
]
const allRoutes = [...BaseRoutes]
Object.keys(modules).forEach((element: any) => {
  allRoutes.push(...modules[element])
})
export default createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})
