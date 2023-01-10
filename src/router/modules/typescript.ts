export default [
  {
    path: '/ts/inPro',
    name: 'typescript',
    component: () => import('@/views/h5/TypeScript/InProject')
  },
  {
    path: '/ts/inPro/detail',
    name: 'te-articleDetail',
    component: () => import('@/views/h5/TypeScript/articleDetail')
  }
]
