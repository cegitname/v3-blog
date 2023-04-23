# 手写一个 js 函数，实现数组扁平化

```javascript

export function flaten1(arr) {
  const res = []
  arr.forEach(item => {
    if( Array.isArray(item)) {
     const flatItem = flaten1(item) 
     flatItem.push( n => res.push(n))
    }else{
      res.push(item)
    }
  })

  return res
}

export function flaten2(arr) {
  let res = []

  arr.forEach(n => {
    if(Array.isArray(n)) {
      const flatItem = flaten2(n)
      res = res.concat(flatItem)
    } else {
      res = res.concat(n)
    }
  })

  return res
}

```
# 手写一个 getType 函数，获取详细的数据类型

```javascript

function getType(x) {
  return Object.prototype.toString.call(x).slice(8,-1).toLowerCase(type)
}

```
# new 一个对象发生了什么，手写代码

```javascript

function customNew(constructor,...args) {
  // 创建一个空对象，继承 constructor 的原生
  const obj = Object.create(constructor.prototype)

  // 将 obj 做为 this 执行 constructor ，传入参数

  constructor.apply(obj, args)

  return obj
}

```

# object.create 和 {} 区别
- {} 创建空对象，原型指向 Object.prototype
- Object.create() 创建空对象，原型指向传入的参数

# 遍历 dom 树， 深度优先遍历

```javascript

function visitNode(n) {
  if(n instanceof Comment) {
    conosle.log('comment'，n.textContent)
  }

  if(n instanceof Text) {
    console.log('text', n.textContent.trim())
  }
  if(n instanceof HTMLElement) {
    console.log(n.tagName)
  }
}


function depFirst(root) {
  visitNode(root)

  const childNodes = root.childNodes

  if(childNodes.length) {
    childNodes.forEach( child => {
      depFirst(child)
    })
  }

}

function breadthFirst (root) {
  const queue = [root]

  while(queue.length > 0) {
    const cur = queue.pop()
    
    if(cur === null) break

    cur.childNodes.length && cur.childNodes.forEach(item =>{
      queue.unshift(item)
    })
  }
}
``` 

# 深度优先遍历可以不用递归吗？

- 可以不用递归，用栈
- 递归的本身就是栈

```javascript

function deepEach() {
  
  const stack = []

  stack.push(root)

  while(stack.length) {
    const curNode = stack.pop()

    const childNodes = curNode.childNodes

    childNodes.length && Array.from(childVnodes).reverse().forEach(item=> stack.push.(item))

  }
}

```

# 手写 lazyMan , 实现 sleep 机制

```javascript

- 支持 sleep, eat 方法
- 支持链式调用
- 需要初始化一个列表，将函数注册进去
- 由每个 item 触发 next 执行。遇到 sleep 就异步执行
- [fn1=> next fn2 => fn3 next => sleep wait => fn4]

class LazyMan {
  #tasks = []
  constructor(name) {
    this.name = name
    setTimeout(()=>{
      this.#next()
    })
  }
  eat(food) {
    this.#tasks.push(()=> {
      console.log(`${this.name} eat${food}`)
      this.#next()
    })
    return this
  }
  #next() {
    const targetTask = this.#tasks.shift()
    targetTask && targetTask()
  }
  sleep(time) {
    this.#tasks.push(()=>{
      setTimeout(()=>{
        console.log(this.name + 'sleep' + time + 's')
        this.#next()
      },time*1000)
    })
    return this
  }
}

const lazyFn = new LazyMan('哈哈')

lazyFn.eat('11').eat('22').sleep(2).eat('ssadas').sleep(3).eat('final')

```

# 手写函数柯里化
- 中间状态，返回函数
- 最后一个函数返回执行结果

```javascript


console.log('***********柯里化**************')

function add(a,b,c) {
  return a + b +c
}

function curry(fn) {

  const fnArglength = fn.length

  let args = []

  return function calc (...newArgs) {
    args = [...args,...newArgs]

    if(args.length < fnArglength) {
      return calc
    } else {
      return fn.apply(this, args.slice(0,fnArglength))
    }
  }
}


const curryAdd = curry(add)

console.log(curryAdd(1)(2,3))
```
# instanceof 原理是什么


# 实现 LRU 缓存

```javascript

const lruCache = new LRUCache(2)

lruCache.set(1,1) 
lruCache.set(2,2) 

```
