import * as Data from './codeData'
enum codeKeys {
  webpack = 'webpack'
}
interface codeOptionType {
  [k: string]: any[]
}
export interface listRow {
  title: string
  desc?: string
  key: codeKeys
}
export const data: listRow[] = [
  {
    title: 'Webpack',
    desc: '模块打包，资源输入输出，publicPath,预处理器,SplitChunks,打包优化',
    key: codeKeys.webpack
  }
]
export const useCode = (route: any) => {
  const codeKey: string = route.query.codeKey
  const codeOpt: codeOptionType = {
    [codeKeys.webpack]: Data.webpack
  }
  return codeOpt[codeKey]
}
