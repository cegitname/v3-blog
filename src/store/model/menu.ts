export const componentMenus = [
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
    title: '代码预览',
    path: '/components/highlight',
    key: 'codeHighlight'
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

export const TsMenus = [
  {
    title: '项目应用',
    path: '/ts/inPro',
    key: 'tsInpro'
  }
]
export const UtilsMenus = [
  {
    title: '工具类',
    path: '/utils',
    key: 'utils',
    subs: [
      {
        title: 'vben axios 封装',
        path: '/utils/axios',
        key: 'vben axios'
      }
    ]
  }
]
export enum Menus {
  Components = 'componentMenus',
  TypeScript = 'TsMenus',
  Utils = 'UtilsMenus'
}

export interface menuType {
  title: string
  path: string
  key: string
  subs?: Array<menuType>
}
export type menuName = 'Components' | 'TypeScript' | 'Utils'
