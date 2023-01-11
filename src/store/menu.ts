export const componentMenus = [
  {
    title: '登录',
    path: '/components/login',
    key: 'Login',
    subs: [
      {
        title: 'vben axios',
        path: '/components/vebenAxios',
        key: 'vbenAxios'
      },
      {
        title: 'vben login',
        path: '/components/vbenLogin',
        key: 'vbenLogin'
      }
    ]
  },
  {
    title: '代码预览',
    path: '/components/highlight',
    key: 'codeHighlight'
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
