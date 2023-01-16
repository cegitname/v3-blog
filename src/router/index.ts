import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/menuLayout.vue'
interface moduless {
  [key: string]: Array<RouteRecordRaw>
}
const moduleBaseRoute: RouteRecordRaw = {
  path: '/h5',
  name: 'H5',
  component: Layout,
  children: []
}
const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules: moduless = modulesFiles
  .keys()
  .reduce((moduless: moduless, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    moduless[moduleName] = value.default
    return moduless
  }, {})
const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/h5list'
  },
  {
    path: '/h5list',
    name: 'H5list',
    component: () => import('@/views/index.vue')
  }
]
const allRoutes = [...BaseRoutes]
Object.keys(modules).forEach((element: string) => {
  moduleBaseRoute.children.push(...modules[element])
})
allRoutes.push(moduleBaseRoute)
export default createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})
