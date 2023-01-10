import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Read from '@/views/read/index.vue'
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
console.log(modules, 'modulesmodulesmodulesmodulesmodules')
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
console.log(allRoutes, 'allRoutes')
Object.keys(modules).forEach((element: any) => {
  moduleBaseRoute.children.push(...modules[element])
})
allRoutes.push(moduleBaseRoute)
export default createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})
