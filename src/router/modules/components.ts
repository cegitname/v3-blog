import { RouterView } from 'vue-router'
export default [
  {
    path: '/components/login',
    name: 'Components',
    component: RouterView,
    children: [
      {
        path: '/components/vebenAxios',
        name: 'vebenAxios',
        component: () => import('@/components/login/axios.vue')
      },
      {
        path: '/components/vbenLogin',
        name: 'vbenLogin',
        component: () => import('@/components/login/vbenLogin.vue')
      }
    ]
  },
  {
    path: '/components/highlight',
    name: 'highlight',
    component: () => import('@/components/highlight')
  }
]
