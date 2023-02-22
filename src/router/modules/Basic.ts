export default [
  {
    path: '/basic/index',
    name: 'basic',
    component: () => import('@/views/h5/Basic')
  },
  {
    path: '/basc/detail',
    name: 'basic detail',
    component: () => import('@/views/h5/Basic/detail.vue')
  }
]
