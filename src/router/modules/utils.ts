import { RouterView } from 'vue-router'
export default [
  {
    path: '/utils',
    name: 'Utils',
    component: RouterView,
    children: [
      {
        path: '/utils/axios',
        name: 'utilsaxios',
        component: () => import('@/views/h5/utils/axios/axios.vue')
      }
    ]
  },
  {
    path: '/utils/down',
    name: 'down',
    component: RouterView,
    children: [
      {
        path: '/utils/down/link',
        name: 'downLink',
        component: () => import('@/views/h5/utils/download/downLink')
      }
    ]
  },
  {
    path: '/components/highlight',
    name: 'highlight',
    component: () => import('@/components/highlight')
  }
]
