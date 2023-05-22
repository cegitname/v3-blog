import * as Data from './codeData'
enum codeKeys {
  TypeScriptBasic = 'TypeScriptBasic'
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
    title: '基础',
    desc: '基础数据类型,类型断言,类型守卫,联合类型和类型别名，交叉类型，泛型',
    key: codeKeys.TypeScriptBasic
  }
]
export const useCode = (route: any) => {
  const codeKey: string = route.query.codeKey
  const codeOpt: codeOptionType = {
    [codeKeys.TypeScriptBasic]: Data.TypeScriptBasic
  }
  return codeOpt[codeKey]
}
