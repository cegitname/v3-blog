import { RouteRecordRaw, RouterView } from 'vue-router'
export default function LoginRoute(Layout: any): RouteRecordRaw[] {
  return [
    {
      path: '/h5',
      name: 'H5',
      component: Layout,
      children: [
        {
          path: '/components/login',
          name: 'Components',
          component: RouterView,
          children: [
            {
              path: '/components/loginIndex',
              name: 'loginIndex',
              component: () => import('@/views/h5/components/login.vue')
            },
            {
              path: '/components/loginIndex1',
              name: 'loginIndex1',
              component: () => import('@/views/h5/components/login11.vue')
            }
          ]
        },
        {
          path: '/doc',
          name: 'h5Doc',
          component: () => import('@/views/h5/doc')
        }
      ]
    }
  ]
}
