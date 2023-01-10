export const componentMenus = [
  {
    title: '登录',
    path: '/components/login',
    key: 'Login',
    subs: [
      {
        title: 'Vben Login',
        path: '/components/vbenLogin',
        key: 'vbenLogin'
      },
      { title: '登录2', path: '/components/loginIndex1', key: 'loginIndex2' }
    ]
  },
  {
    title: 'doc',
    path: '/doc',
    key: 'doc'
  }
]

export const TsMenus = [
  {
    title: '项目应用',
    path: '/ts/inPro',
    key: 'tsInpro'
  }
]

export enum Menus {
  Components = 'componentMenus',
  TypeScript = 'TsMenus'
}

export interface menuType {
  title: string
  path: string
  key: string
  subs?: Array<menuType>
}
