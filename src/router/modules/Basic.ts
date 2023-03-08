export default [
  {
    path: '/basic/javascript',
    name: 'basic-jsavascript',
    component: () => import('@/views/h5/Basic/javascript/index')
  },
  {
    path: '/basic/detail-javascript',
    name: 'detail-javascript',
    component: () => import('@/views/h5/Basic/javascript/detail.vue')
  },
  {
    path: '/basc/webpack',
    name: 'basic-webpack',
    component: () => import('@/views/h5/Basic/webpack')
  },
  {
    path: '/basc/detail-webpack',
    name: 'detail-webpack',
    component: () => import('@/views/h5/Basic/webpack/detail.vue')
  }
]
