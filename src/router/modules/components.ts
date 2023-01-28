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
      }
    ]
  }
]
