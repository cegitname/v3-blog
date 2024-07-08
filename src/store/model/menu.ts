export enum Menus {
  Components = 'componentMenus',
  Utils = 'UtilsMenus',
  Basic = 'BasicMenus',
  Imooc = 'JsCodeMenus'
}
const componentMenus = {
  name: Menus.Components,
  arr: [
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
}

const UtilsMenus = {
  name: Menus.Utils,
  arr: [
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
}

const BasicMenus = {
  name: Menus.Basic,
  arr: [
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
}
const JsCodeMenus = {
  name: Menus.Imooc,
  arr: [
    {
      title: 'Imooc',
      path: '/imooc/js-code',
      key: 'js-code'
    }
  ]
}
export const MenuArray = [componentMenus, UtilsMenus, BasicMenus, JsCodeMenus]

export interface menuType {
  title: string
  path: string
  key: string
  subs?: Array<menuType>
}
export type menuName = 'Components' | 'Basic' | 'Utils' | 'Imooc'
