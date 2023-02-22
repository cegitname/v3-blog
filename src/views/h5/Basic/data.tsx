export const data = [
  {
    title: '手写 primise 实现',
    desc: '实现Promise'
  }
]

export interface dataType {
  title: string
  desc?: string
}

export const EvnentTypes: { title: string; data: string[] } = {
  title: 'ts中常用Event 事件对象类型',
  data: [
    'ClipboardEvent<T = Element> 剪贴板事件对象',
    'DragEvent<T = Element> 拖拽事件对象',
    'ChangeEvent<T = Element> Change 事件对象',
    'KeyboardEvent<T = Element> 键盘事件对象',
    'MouseEvent<T = Element> 鼠标事件对象',
    'TouchEvent<T = Element> 触摸事件对象',
    'WheelEvent<T = Element> 滚轮事件对象',
    'AnimationEvent<T = Element> 动画事件对象',
    'TransitionEvent<T = Element> 过渡事件对象'
  ]
}

export const promiseCode = `
class Promise {
  constructor (excutor) {
    this.value = "";
    this.reason = "";
    this.status = "padding";
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    let resolve = (value) => {
      //2.这个判断是为了 status 不可逆 只能从 padding 转化为 成功或者失败
      if (this.status == "padding") {
        this.status = "fulfilled";
        this.value = value;
        // 3.当转态改变的时候依次执行队列里面储存的 then 函数里面对应的回调
        this.onFulfilledCallback.forEach((fn) => {
          fn();
        });
      }
    };

    let reject = (reason) => {
      // 2.这个判断是为了 status 不可逆 只能从 padding 转化为 成功或者失败
      if (this.status == "padding") {
        this.status = "rejected";
        this.reason = reason;
        // 3.当转态改变的时候依次执行队列里面储存的 then 函数里面对应的回调
        this.onRejectedCallback.forEach((fn) => {
          fn();
        });
      }
    };

    // 1. 当发生异常是捕获异常
    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled,onRejected) {
    //4.防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value)=> value
    onRejected = typeof onRejected === 'function' ? onRejected :(error) => throw error

    let newPromise;
    if(this.status === 'fulfilled') {
      return newPromise = new Promise((resolve, reject)=> {
        setTimeout(()=>{
          try {
            let x = onFulfilled(this.value)
            this.reslovePromise(newPromise,x,reslove,reject)
          } catch (e) {
            reject(e)
          }
        })
      }) 
    }

    if(this.status === 'rejected') {
      return newPromise = new Promise((resolve, reject)=> {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      })
    }

    if(this.status === 'pending') {
      return newPromise = new Promise(() => {
        /*3.当excutor为异步的时候先把then方法里面的回调储存在失败或者成功的队列里面*/
        this.onFulfilledCallback.push(()=> {
          setTimeout(()=> {
            try {
              const x = onFullfiled(this.value)
              this.reslovePromise(newPromise, x, reslove, reject)
            } catch (error) {
              reject(e);
            }
          })
        })

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        })

      })
    }
  }
  
  resolvePromise(newPromise, x, reslove, reject) {
    // 避免循环引用
    if(newPromise === x) {
      return reject(new TypeError('Circur refence'))
    }

    //called 变量主要是用来判断如果 resolvePromise 函数已经 resolve 或者 reject 了，那就不需要在执行下面的 resolce 或者 reject。
    //设置一个标志位，在执行 resolve 或者 reject 其中之一后，讲不能再执行 resolve 或者 reject eg:resolve();reject()
    let called = false

    if(x !== null && (typeof x === 'object' || x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, (y)=>{
            if(called) return
            called = true
            this.resolvePromise(newPromise, y, resolve, reject)
          },(error) => {
            if (called) return
            called = true
            reject(error)
          })
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

}
`
