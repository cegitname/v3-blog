export enum codeKeys {
  Promise = 'promise',
  AbortPromise = 'abortPromise',
  DebounceAndThrottle = 'DebounceAndThrottle'
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
    key: codeKeys.DebounceAndThrottle
  }
]

export const useCode = (route: any) => {
  const codeKey: codeKeys = route.query.codeKey
  const codeOpt = {
    [codeKeys.Promise]: promiseCodeArr,
    [codeKeys.AbortPromise]: abortPromiseCodeArr,
    [codeKeys.DebounceAndThrottle]: DebounceAndThrottleCode
  }
  return codeOpt[codeKey]
}

export interface dataType {
  title: string
  desc?: string
}

export const promiseCode = `    
class Promises {
  constructor (excutor) {
    const STATUS = {
      PENDING:'pending',
      FULFILLED:'fulfilled',
      REJECTED:'rejected',
    }
    this._STATUS = STATUS
    this.value = ''
    this.reason = ''
    this.status = STATUS.PENDING
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    
    let resolve = (value) => {
      if(this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.value = value
        this.onFulfilledCallback.forEach(fn=> fn())
      }
    }

    let reject = (reason) => {
      if(this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.onFulfilledCallback.forEach(fn=> fn())
      }
    }

    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRjected) {
    console.log('then')
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value)=> value
    onRjected = typeof onRjected === 'function' ? onRjected : (error)=> {throw error}
    const STATUS = this._STATUS
    let newPromise;
    if(this.status === STATUS.PENDING) {
      return newPromise = new Promises((resolve, reject)=>{
        this.onFulfilledCallback.push(()=>{
          setTimeout(()=>{
           try {
            const x = onFulfilled(this.value)
            this.resolvePromise(newPromise, x, resolve, reject) 
           } catch (e) {
            reject(e)
           } 
          })
        })

        this.onRejectedCallback.push(() => {
          setTimeout(()=>{
            try {
              const x = onRjected(this.reason)
              this.resolvePromise(newPromise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      })
    }

    if( this.status === STATUS.FULFILLED) {
      return newPromise = new Promises((resove, reject)=>{
        setTimeout(()=>{
          try {
            const x = onFulfilled(this.value)
            console.log(x,'1111111')
            this.resolvePromise(newPromise, x, resove, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if( this.status === STATUS.REJECTED) {
      return newPromise = new Promises((resolve, reject) => {
        setTimeout(()=>{
          try {
            const x = onRjected(this.reason)
            this.resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

  }

  resolvePromise(newPromise, x, resove, reject) {
    console.log(x, 'xxxx')
    if(newPromise === x) {
      return reject(new TypeError('循环引用错误'))
    }
    let called = false
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if( typeof then === 'function') {
          then.call(x, (y) => {
            console.log(y, 'this is yyyyyy in call')
            if(called) return
            called = true
            this.resolvePromise(newPromise, y, resove, reject)
          })
        } else {
          if(called) return
          called = true
          resove(x)
        }
      } catch (e) {
        if(called) return
        called = true
        reject(e)
      }
    } else {
      resove(x)
    }
  }
}

`

const promiseALl = `
// static all 方法
MyPromise.all = (lists) => {
  // 返回一个 promise
  return new MyPromise((resolve, reject) => {
    let resArr = []; // 存储处理的结果的数组
    // 判断每一项是否处理完了
    let index = 0;
    function processData(i, data) {
      resArr[i] = data;
      index += 1;
      if (index == lists.length) {
        // 处理异步，要使用计数器，不能使用 resArr==lists.length
        resolve(resArr);
      }
    }
    for (let i = 0; i < lists.length; i++) {
      if (lists[i] instanceof MyPromise)) {
        lists[i].then(
          (data) => {
            processData(i, data);
          },
          (err) => {
            reject(err); // 只要有一个传入的 promise 没执行成功就走 reject
            return;
          }
        );
      } else {
        processData(i, lists[i]);
      }
    }
  });
};
`

const primiseRace = `
MyPromise.race = (lists) => {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i] instanceof MyPromise) {
        lists[i].then(
          (data) => {
            resolve(data); // 哪个先完成就返回哪一个的结果
            return;
          },
          (err) => {
            reject(err);
            return;
          }
        );
      } else {
        resolve(lists[i]);
      }
    }
  });
};
`
export const promiseCodeArr = [
  {
    title: 'Promise 类实现',
    code: promiseCode
  },
  {
    title: 'Primise.all 实现',
    code: promiseALl
  },
  {
    title: 'Promise.race 实现',
    code: primiseRace
  }
]
const abortPromiseCode = `
// 在controller 中监听请求是否 abort 
class PromiseWithAbortController {
  constructor(fn, { signal }) {
    if (signal && signal.aborted) {
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    }
    let _p = new Promise((resolve, reject) => {
      fn.call(null, resolve, reject);
      if (signal) {
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      }
    });
    return _p;
  }
}
`

const useAbortController = `
// https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController
let controller = new AbortController();
// signal: 对象实例，用于 abort 一个网络请求
let signal = controller.signal;
let testP2 = new PromiseWithAbortController(
  (r, j) => {
    setTimeout(() => {
      r("success");
    }, 1000);
  },
  { signal }
);

controller.abort()
`
const AxiosCancelTokenCode = `
// CancelToken 已废弃
const fetchApi = (params,that)=>{
  return request({
    methods:'xx',
    params,
    url:'xx',
    cancelToken: new Axios.CancelToken((cancel)=>{that.cancel = cancel})
  })
}
data(){
  return {
    cancel: null
  }
},
methods: {
  getTabList() {
    // 每次请求前，中断之前的请求
    if(typeof this.cancel === 'function') {
      this.cancel()
    }
    fetchApi(params, this)
  }
}
`

const AxiosAbortControllerCode = `
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
`
const abortPromiseCodeArr = [
  {
    title: '实现一个 controller 控制请求，返回一个 Promise',
    code: abortPromiseCode
  },
  {
    title: '使用 PromiseWithAbortController',
    code: useAbortController
  },
  {
    title: '使用 Axios.CancelToken 取消请求(已废弃)',
    code: AxiosCancelTokenCode
  },
  {
    title:
      'Starting from v0.22.0 Axios supports AbortController to cancel requests in fetch API way:',
    code: AxiosAbortControllerCode
  }
]

const DebounceAndThrottleCode = [
  {
    title: '',
    code: `
  防抖是每次触发都会清空上一次的定时器，达到防抖的目的
  节流是在n秒内只能执行1次，达到稀释函数执行频率的目的
  // js 版本防抖
  function debounce(fn, wait) {
    var time = null;
    return function () {
      clearTimeout(time);
      time = setTimeout(() => {
        fn.apply(this, arguments); 
      }, wait);
    };
  }
  // 使用
  debounce(()=>{
    // ...
  }, 300)
  
  // js 版本节流
  function throttle(func, wait) {
    var previous = 0;
    return function () {
      var now = +new Date();
      if (now - previous > wait) {
        func.apply(this, arguments);
        previous = now;
      }
    };
  }
  
  throttle(()=>{
    // ...
  },50)
  `
  }
]
const AsyncPoolCode7 = `
// ES7
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}
`
const AsyncPoolCode6 = `
// ES6
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++]; // 获取新的任务项
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        r = Promise.race(executing); 
      }
    }
 
    // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}
`
// https://github.com/rxaviers/async-pool
export const AsyncPoolArr = [
  {
    title: 'AsyncPool ES7版本',
    code: AsyncPoolCode7
  },
  {
    title: 'AsyncPool ES6版本',
    code: AsyncPoolCode6
  }
]
