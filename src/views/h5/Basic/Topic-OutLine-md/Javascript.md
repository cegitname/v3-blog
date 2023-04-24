# 将一个数组旋转 k 步
```javascript

function rotatek(arr, k) {
  
  const length = arr.length

  if(!k || length===0) return arr
  /**
   * 处理步数
   * 例如： k = 2, 求 k % length
   * length = 1 不够2，则返回 1
   * length = 2 余数0，则返回 0 
   * length = 3 余数1，则返回 1
   * length = 4 余数0，则返回 0
   * */ 
  const step = Math.abs(k % length)
  /**
   * 例：arr = [1,2,3,4,5,6] k=3
   * p1 = arr.slice(-3)  返回 [4,5,6]
   * p2 = arr.slice(0, 6-3) 返回 [1,2,3]
   * p1 concat p2 = [4,5,6,1,2,3]
   * */ 
  const part1 = arr.slice(-step)

  const part2 = arr.slice(0, length - step)

  return part1.concat(part2)

}
```
# 队列 先进先出 
用队列，广度优先遍历一个对象节点

```javascript
/**
 *  obj = {
 *    name:'A',
 *    children: [
 *      {
 *        name:'A-1',
 *      },
        {
          name: 'A-2'
          children: [
            {
              name: 'A-2-a'
            },
            {
              name: 'A-2-b'
            }
          ]
        }
 *    ]
 *  }
 * */ 
function queueFn(root) {
  
  const queue = []

  queue.unshift(root)
  /**
   * [obj]
   * [{ name:'A-2'},{ name:'A-1'}]
   * [{ name:'A-2' }]
   * [{ name: 'A-2-b'},{ name: 'A-2-a'}]
   * */ 
  while(queue.length < 0) {

    const curItem = queue.pop()

    if(!curItem) break

    if(curItem.children!== null) {
      curItem.children.forEach(item => {
        queue.unshift(item)
      })
    }
  }
}


```
# 判断是否匹配括号
```javascript

/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */
function isMatch(left: string, right: string): boolean {
    if (left === '{' && right === '}') return true
    if (left === '[' && right === ']') return true
    if (left === '(' && right === ')') return true
    return false
}
/**
 * 初始化一个 stack
 * stack 的特点是先入后出
 * 
 * */ 
function matchBracket(str) {
  const length = str.length

  if(length === 0) return true

  const stack = []

  const leftSymbols = '{[('
  const rightSymbols = '}])'
 
 for(let i =0; i < length;i ++) {
    const s = str[i]
    if(leftSymbols.includes(s)) {
      stack.push(s)
    } else if(rightSymbols.includes(s)) {
      const top = stack[stack.length - 1]
      if(isMatch(top, s)) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

```
# 手写一个 js 函数，实现数组扁平化

```javascript

export function flaten1(arr) {
  const res = []
  arr.forEach(item => {
    if( Array.isArray(item)) {
     const flatItem = flaten1(item) 
     flatItem.forEach( n => res.push(n))
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

# 手写 bind 函数

- 返回一个函数

- 绑定 this, 绑定执行的参数



```javascript

function (a,b,c) {
  console.log(this,a,b,c)
}

Function.prototype.customBind = function(context,...args) {
  const self = this
  return function (...returnArgs) {
    const newArgs = args.concat(returnArgs)
    return self.apply(context,newArgs)
  }
}


```

# 实现一个 lru 缓存

last recently used

用 object 或者 map 实现哈希表

哈希表的 get 和 set  够快，o1

哈希+有序  只有 map

```javascript

class LRUCache {
  #data = new Map()

  constructor(length) {
    if(length < 1) throw new Error('invalid length')

    this.length = length

  }

  set(key,value) {
    const data = this.#data

    // map 每次 set 都会把数据放在最新的位置
    if(data.has(key)) {
      data.delete(key) 
    }

    data.set(key, value)
    if(data.size > this.length) {
      // 如果超出了容量，则删除 Map 最老的元素
      const delKey = data.keys().next().value
      data.delete(delKey)
    }
  }

  get(key) {
    const data = this.#data

    if(!data.has(key)) {
      return null
    }

    const value = data.get(key)

    data.delete(key)

    data.set(key, value)

    return value
  }
}
```

# [‘1‘，’2‘，‘3’].map(parseInt) 

- parseInt 解析一个字符串，返回 10 进制整数
- 第一个参数字符串
- 第二个参数是进制，范围 2-36
- 当 str 以 `0x` 开头，则按照 16 进制处理
- 其他情况按照 10 进制处理
- 代码拆解到最细粒度 -> 看执行 parseInt 的参数是什么

实际执行的是=> arr.map((item, index) => {
  return parseInt(item, index)
})
  - parseInt(1, 0) //0被认为不存在 按照10进制处理
  - parseInt(2, 1) // 不在 2-36   所以 nan
  - parseInt(3, 2) // 2 进制里只有 0,1 没有3 所以 nan

# 手写一个 convert 函数，将数组转为树

```javascript
const arrRes = [
  { id:1, name:'部门a', parentId:0 },
  { id:2, name:'部门b', parentId:1 },
  { id:3, name:'部门c', parentId:1 },
  { id:1, name:'部门d', parentId:2 },
  { id:4, name:'部门e', parentId:2 },
  { id:5, name:'部门f', parentId:3 },
  { id:6, name:'部门g', parentId:3 }
]


function arrToTree(arr) {
  console.log(arr)
  // 用于 id 和 treeNode 的映射
  const idToTreeNode = new Map()

  let root = null

  arr.forEach(item => {
    const {id, name, parentId} = item

    const treeNode = {id, name}

    idToTreeNode.set(id,treeNode)

    const parentNode = idToTreeNode.get(parentId)

    if(parentNode) {
      if(parentNode.children == null) parentNode.children = []
      parentNode.children.push(treeNode)
    }

    //找到根节点

    if(parentId === 0) root = treeNode
    
  })
  return root
}

```

# 将树转换成数组
```javascript

/**
 * 广度优先遍历
 * 将节点转为 arrayItem
 * 根据父子关系，找到 parentId
*/


```

# 用户-角色-权限

- RBAC模型- Role-based access control 基于角色的访问控制

- 用户
- 角色
- 权限
- 用户绑定角色  角色绑定权限

# 快速排序
```javascript
/**
 * 快速排序（使用 slice）
 * @param arr number arr
 */
export function quickSort2(arr: number[]): number[] {
    const length = arr.length
    if (length === 0) return arr

    const midIndex = Math.floor(length / 2)
    const midValue = arr.slice(midIndex, midIndex + 1)[0]

    const left: number[] = []
    const right: number[] = []

    for (let i = 0; i < length; i++) {
        if (i !== midIndex) {
            const n = arr[i]
            if (n < midValue) {
                // 小于 midValue ，则放在 left
                left.push(n)
            } else {
                // 大于 midValue ，则放在 right
                right.push(n)
            }
        }
    }

    return quickSort2(left).concat(
        [midValue],
        quickSort2(right)
    )
}

```