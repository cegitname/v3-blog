export const Cache = [
  {
    title: '什么是浏览器缓存?',
    content: `浏览器缓存是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览。`
  },
  {
    title: '浏览器缓存的规则',
    content: `浏览器根据请求返回的响应头(respone header) 的内容来决定该资源是否会被缓存，存多久。缓存分为2类, 强缓存，协商缓存。`
  },
  {
    title: '强缓存',
    content: `强缓存就是浏览器直接读取缓存，不发出任何请求。让浏览器执行强缓存的 response header 有2种:`,
    list: [
      {
        content:
          '1、 Cache-Control: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control  '
      },
      {
        content:
          '2、 Expires: Expires有一个很大的弊端，就是它返回的是服务器的时间，但判断的时候用的却是客户端的时间，这就导致Expires很被动，因为用户有可能改变客户端的时间，导致缓存时间判断出错，缓存可能失效。'
      }
    ]
  },
  {
    title: '协商缓存',
    content: `协商缓存就是浏览器向服务器发送一个请求，服务器会检查资源是否有更新，如果有更新，就返回最新的资源，状态码200.如果没有更新，状态码304，不返回资源，浏览器从缓存中读取资源`,
    list: [
      {
        title: 'Etag',
        content:
          '1、服务器对资源生成一个唯一的标识，然后在浏览器请求某一个URL时，把这个标识放到响应头传到浏览器，浏览器把这个ETag的值储存，服务器端返回状态200'
      },
      {
        content:
          '2、之后如果浏览器要再发送请求，会在 request header 中加上 if-None-Match, 值就是之前储存的Etag, 用以发送给服务端验证资源有没有修改'
      },
      {
        content:
          '3、Get请求中，当服务器没有任何Etag属性值与之相匹配，服务器才会返回所有资源，响应码200。反之，则从缓存读取资源返回，状态码304'
      },
      {
        content:
          '4、如果没有设置Cache-Control, Expires这类缓存相关字段，各浏览器会有一套自己得算法计算过期时间'
      }
    ]
  }
]

const promiseCode = `    
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
export const abortPromiseCodeArr = [
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

export const DebounceAndThrottleCode = [
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
    // 调用iteratorFn函数创建异步任务, 并包装为Promise
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

const BFScode = `
广度优先遍历就是将同层节点遍历完后，再遍历下一级节点
const arr = [
  { id:1, name: '0', children: [{ id: 2, name: '0-1'}]},
  { id:3, name: '1', children: [{ id:4, name: '1-1', children: [{ id:5, name: '1-1-1' }]}]}
]
// 输出 0,1,0-1,1-1,1-1-1
// 代码实现
function bfsFn(treeArr) {
  const arr = []
  while(treeArr.length > 0) {
    const node = treArr.shift()
    arr.push(node.name)
    node.children && treeArr.push(...node.children)
  }
  return arr
}
`
const DFScode = `
深度优先遍历就是先将当前节点遍历完，再去遍历兄弟节点
// 输出 0,0-1, 1, 1-1, 1-1-1
function dfsFn(treeArr, arr=[]) {
  while(treeArr.length > 0) {
    const node = treeArr.shift()
    arr.push(node.name)
    node.children&&dfsFn(node.children, arr)
  }
  return arr
}
`
export const BFSANDDFSArr = [
  {
    title: '广度优先遍历',
    code: BFScode
  },
  {
    title: '深度优先遍历',
    code: DFScode
  }
]

export const v8CodeArr = [
  {
    content:
      'V8中，将内存分为新生代和老生代，新生代中得内容对象存活时间较短，老生代中的对象存活时间较长'
  },
  {
    title: '新生代',
    list: [
      {
        content:
          '新生代是通过一种复制的方式垃圾回收，他将每一份空间一分为二，一个处于使用中(From)，一个处于闲置状态(To)'
      },
      {
        content: `当开始垃圾回收时，会检查 From 空间中的存活对象，将存活对象复制到 To 中，然后From 中的非存活释放掉。
          如果经过多次复制仍然存活的对象，那就认为他是一个生命周期较长的对象，会把它移动到老生代中处理`
      }
    ]
  },
  {
    title: '老生代',
    list: [
      {
        content:
          '老生代主要采取的是标记清除的垃圾回收算法，与复制的方式不同，它是通过遍历堆内存中所有的对象，并标记活着的对象，只清理死亡的对象。'
      },
      {
        content: `标记清除的问题是，每次标记清楚回收后，内存空间会出现不连续的状态。不连续的状态导致后面分配内存出现问题，提前触发不必要的回收。
           为了解决这个问题，会将整体被提出来，就是在对象标记死亡之后，在整理的过程中，将活着的对象移动到另一端，移动完成后，直接清理死亡的对象`
      }
    ]
  }
]
