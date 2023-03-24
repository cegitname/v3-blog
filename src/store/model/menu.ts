export const componentMenus = [
  {
    title: 'Highlight',
    path: '/components/highlight',
    key: 'codeHighlight'
  },
  {
    title: '登录',
    path: '/components/login',
    key: 'Login',
    subs: [
      {
        title: 'vben login',
        path: '/components/vbenLogin',
        key: 'vbenLogin'
      }
    ]
  },
  {
    title: '上传',
    path: '/components/upload',
    key: 'upload',
    subs: [
      {
        title: 'aws 上传',
        path: '/components/upload/aws',
        key: 'awsUpload'
      },
      {
        title: '多文件上传',
        path: '/components/upload/multi',
        key: 'multiUpload'
      }
    ]
  },
  {
    title: '图片裁剪',
    path: '/components/tailor',
    key: 'tailor'
  }
]

export const UtilsMenus = [
  {
    title: 'Http',
    path: '/utils',
    key: 'utils',
    subs: [
      {
        title: 'vben axios 封装',
        path: '/utils/axios',
        key: 'vben axios'
      }
    ]
  },
  {
    title: 'Down',
    path: '/utils/down',
    key: 'down',
    subs: [
      {
        title: '下载一个链接资源',
        path: '/utils/down/link',
        key: 'downLink'
      }
    ]
  }
]

export const BasicMenus = [
  {
    title: 'Javascript',
    path: '/basic/javascript',
    key: 'basic'
  },
  {
    title: 'Typescript',
    path: '/basc/typescript',
    key: 'basic-typescript'
  },
  {
    title: 'Webpack',
    path: '/basc/webpack',
    key: 'basic-webpack'
  }
]
export enum Menus {
  Components = 'componentMenus',
  Utils = 'UtilsMenus',
  Basic = 'BasicMenus'
}

export interface menuType {
  title: string
  path: string
  key: string
  subs?: Array<menuType>
}
export type menuName = 'Components' | 'Basic' | 'Utils'
