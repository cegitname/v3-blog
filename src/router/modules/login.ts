import { RouterView } from 'vue-router'
export default [
  {
    path: '/components/login',
    name: 'Components',
    component: RouterView,
    children: [
      {
        path: '/components/vbenLogin',
        name: 'vbenLogin',
        component: () => import('@/components/login/vbenLogin.vue')
      },
      {
        path: '/components/loginIndex1',
        name: 'loginIndex1',
        component: () => import('@/views/h5/components/login/login11.vue')
      }
    ]
  },
  {
    path: '/doc',
    name: 'h5Doc',
    component: () => import('@/views/h5/doc')
  }
]
