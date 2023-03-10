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
      }
    ]
  },
  {
    path: '/components/highlight',
    name: 'highlight',
    component: () => import('@/components/highlight')
  },
  {
    path: '/components/upload',
    name: 'upload',
    component: RouterView,
    children: [
      {
        path: '/components/upload/aws',
        name: 'awsupload',
        component: () => import('@/components/upload/awsUpload.vue')
      },
      {
        path: '/components/upload/multi',
        name: 'multiUpload',
        component: () => import('@/components/upload/multiUpload.vue')
      }
    ]
  },
  {
    path: '/components/tailor',
    name: 'tailor',
    component: () => import('@/components/Tailor/index.vue')
  }
]
