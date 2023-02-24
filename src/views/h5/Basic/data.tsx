import * as codeData1 from './codeData'

enum codeKeys {
  Promise = 'promise',
  AbortPromise = 'abortPromise',
  DebounceAndThrottle = 'DebounceAndThrottle',
  AsyncPool = 'AsyncPool',
  BFSAndDFS = 'BFSAndDFS',
  Cache = 'cache',
  V8 = 'V8'
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
    title: '手写 primise 实现',
    desc: 'keyWords: Promise,Promise.then, Promise.race, Promise.all',
    key: codeKeys.Promise
  },
  {
    title: '切换 tab 时候，如何取消已经发出去的请求',
    desc: 'keyWords: AbortController, Axios.CancelToken ',
    key: codeKeys.AbortPromise
  },
  {
    title: '防抖 & 节流',
    desc: '闭包',
    key: codeKeys.DebounceAndThrottle
  },
  {
    title: '前端如何控制并发',
    desc: 'asyncPool',
    key: codeKeys.AsyncPool
  },
  {
    title: '广度优先遍历和深度优先遍历',
    desc: 'BFS、DFS',
    key: codeKeys.BFSAndDFS
  },
  {
    title: '强缓存与协商缓存',
    desc: 'Cache-Control, Expires, Etag',
    key: codeKeys.Cache
  },
  {
    title: ' V8 的垃圾回收机制',
    desc: '新生代、老生代',
    key: codeKeys.V8
  }
]

export const useCode = (route: any) => {
  const codeKey: string = route.query.codeKey
  const codeOpt: codeOptionType = {
    [codeKeys.Promise]: codeData1.promiseCodeArr,
    [codeKeys.AbortPromise]: codeData1.abortPromiseCodeArr,
    [codeKeys.DebounceAndThrottle]: codeData1.DebounceAndThrottleCode,
    [codeKeys.AsyncPool]: codeData1.AsyncPoolArr,
    [codeKeys.BFSAndDFS]: codeData1.BFSANDDFSArr,
    [codeKeys.Cache]: codeData1.Cache,
    [codeKeys.V8]: codeData1.v8CodeArr
  }
  return codeOpt[codeKey]
}
