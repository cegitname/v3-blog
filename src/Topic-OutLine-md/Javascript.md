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
    return false- 
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
- {} 创建空对象，原型指向 undefined
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
# 1维转2维，4项
```javascript
const arr = [1,2,3,4,5,23,66,7,11,8,9,1]

const newArr = []

arr.forEach((item, index)=>{
  var i = Math.floor(index/4)
  if(!newArr[i]) {
    newArr[i] = []
  }
  newArr[i].push(item)
})
```
# http 请求过程

1. 对请求进行预处理，如判断用什么协议的请求，安全检查等等
2. 解析域名，通过 DNS 查询 IP 地址
3. 通过 TCP 协议发送 Http 请求
4. 服务端处理请求并响应
5. 客户端收到并处理
6. 断开 TCP 链接

## 通过 TCP 协议发送 Http 请求
- icp 通过三次握手建立链接，tcp 为传输报文提供可靠的字节流服务，他将大块的数据分割出以报文为单位的数据包，逐条编号发送，方便服务器还原报文信息
- 网络层 ip 协议将分割好的数据包发送给接收方，接收方要接收必须有mac 地址， arp 协议将 ip 地址解析为 mac 地址，如果不在同一个局域网，需要经过多次中转，过程中通过下一个中转的mac 地址搜索下一个中转
- 达到对方的mac地址后，意味着客户端的请求已完成，等待服务端响应

## 三次握手的过程
- 客户端发送一个数据包给服务端，带有 syn 标志，表示请求建立链接
- 服务端返回一个带有 syn / ask 的数据包表示确认信息
- 客户端再发送一个 ask 标识标识握手成功

# 标志位
- ask 确认序号有效，确认接收到信息
- syn 标识发起一个新连接
- fin 释放一个链接

# 断开 TCP 连接
1. 客户端请求断开
2. 服务端确认客户端的断开请求
3. 服务端请求断开
4. 客户端确认服务器的断开

# 单例模式
- 全局唯一实例 vuex, redux 的store  
```javascript

class SingleTon {
  private constructor() {}
  public static getInstance() {
    if()
    return new SingTon()
  }
  fn1() {}
  fn2() {}
}

const s = SingleTon.getInstance()
s.fn1()
s.fn2()

const s1 = SingleTon.getInstance()
s1 === s true
```

# vue 坑
1. 响应式缺陷， arr[index] = value ，新增数据得用 vue.set(arr,index,value)
2. 路由切换时，scroll 到顶部，页面刷新，去detail 之后，list 页面销毁， 回到列表时，页面刷新了
   解决：缓存数据和 scrollTop 值，回到页面渲染时 scrollTo

# 如何统一监听 vue 报错
- window.onerror js 级别得，全局监听报错。识别不了 vue 组件信息
- addEventListener('error',()=> {}) window 层得监听
- vue 内部 
  - errorCaptured 生命周期 监听下级组件得，非本身得。return false 禁止错误向上传播
  - errorHandler app.config.errorHandler = function() {}

# 如果一个 h5 很慢，如何排查问题

前端性能指标
- FP (First Paint) 
- FCP 第一次有内容得渲染
- DomContentLoaded dom 加载完成
- largest content paint 最大内容的渲染
- load 渲染完成

工具： chrome devTools
- performance 可查上述性能指标
- network 查看各资源加载时间
- 
三方公爵： lighthouse 测试报告
    提供报告和优化建议

# h5 首屏优化

1. 路由懒加载 适用于 spa
  - 路由拆分，优先保证首页加载
2. 服务端渲染，ssr
  - 传统前后的分离 spa 渲染页面的过程复杂
  - ssr 渲染页面过程简单，所以性能好
  - 如何是纯 h5 页面，ssr 是性能优化的终极方案
    1. 服务端获取 html,加载js
    2. 渲染页面
    服务端渲染，获取 html 一次性渲染完成
    3. nuxt.js (vue) next.js(react) 用于 ssr，后端要求是 node.js
3. app 预取
  - 如果 h5 在 app webview 中展示，可以使用 app 预取
  - 用户访问列表页时， app 预加载文字首屏内容
  - 用户进入 h5 页，直接从 app 中获取内容，瞬间展示首屏
  - 需要结合原生功能，jsbridge获取

4. 图片懒加载
  - 针对详情页
  - 提前设置好图片的尺寸，尽量值重绘不重拍
  - 默认只展示文本内容，然后触发图片懒加载
5. hybrid 
  - 提前将 html js css 下载到 app 中
  - 在 app webview 中，用file协议加载页面文件
  - 再用 ajax 获取内容并展示

  # 网页和 iframe 如何通讯
```javascript
/*
  postMessage 第二个参数域名限制
*/ 
// 父
widow.iframe1.contentWindow.postMessage('hello','*')

window.addEventListender('message', event => {
  console.log('orgin', event.origin) // 来源域名
  cosole.log(event.data) // 数据
})

// 子
window.parent.postMessage('im sub','*')

window.addEventListener('message', evnent=>{})
```

# 如何实现网页多标签tab通讯

- 使用 websocket 
  - 无跨域限制
  - 需要服务端支持，成本高， 客户都发信息给服务端，服务端再通知其他页面客户端

- localStorage 通讯
  同域下可以 window.addEventListener('storage',(event)=>{
    cosnole.log(event.key)
    cosnole.log(event.value)
  })

- 通过 sharedWorker 通讯
  - sharedWorker 是 webworker 的一种
  - webworker 可以开启进程执行 js, 但不能操作 dom
  - sharedworker 可以单独开启一个进程，用于同域页面通讯

# 减少重排的方法
- 集中修改样式
- 修改之前设置 display: none, 脱离文档流
- 使用 bfc 特性，不影响其他元素位置
  bfc: 块级格式化上下文
  - 根节点 html
  - float: left/right
  - overflow: auto / scroll /hidden
  - dispaly: inline-block flex/grid
  - position: absolute / fixd
- 频繁触发 resize scroll 使用节流防抖
- 使用 createDoucumentFragment 批量操作dom
- 优化动画, 使用 css3 和 requestAnimationFrame

# url 到页面的完整过程

1. 网络请求
  - dns 查询，建立 tcp 链接
  - 发起 http 
    - 收到请求，得到 html 源代码
    - 解析遇到静态资源，继续发起请求
    - js,css,图片，视频等 一样3此握手 tcp 建立链接

2. 解析
  - html 构建 dom 树，css 构建 style tree
  - 合并形成 render tree
  
3. 渲染
  - 计算 dom 的尺寸，定位，最后渲染到页面
  - 遇到 js 可能会执行
  - 异步 css, 图片加载，可能会重新渲染

# token 和 cookie 有什么区别
cookie 有跨域限制 http 标准 需要配合服务端 seesion
- http 无状态，每次请求都要嗲 cookie， 以帮助识别身份
- 服务端可以向客户都 set-cookie， cookie 大小限制4kb
- 默认有跨域限制，不跨域共享，传递cookie
  - a.com 8081 > iframe :8082  跨域拿不到 cookie
  - 跨域传递 cookie，前端设置 widthCredentials 服务端设置 widthCredenials
- 用于本地存储
- 现代浏览器禁止第三方 cookie
  - 和跨域限制不同，禁止网页引入的第三方 js 设置 cookie
  - 打击第三方广告，保护用户隐私
  - 新增属性 sameSite: strict / lax / none 
- cookie 是 http 请求自动会携带本域的 cookie, 默认浏览器储存

token 
- 没有跨域限制，token 需要自己储存


# Retina 屏幕的 1px 像素，如何实现

普通的 1px 

如果仅仅使用 css 的 1px 来设置 border, 那可能会出现比较粗的情况

因为有些收集屏幕的 dpr =2 即 1px 他会用2个物理像素来显示。

你不能写 0.5 px ，浏览器兼容性不好，渲染出来可能还是 1px 的效果

使用 tansform 缩小：
  可以使用 css 伪类 + transform 来优化这一问题： 即把默认的 1px 宽度给压缩 0.5
```css
#box:: before {
  content:'';
  position: basolute;
  left:0;
  bottom:0;
  width:100%;
  height:1px;
  background:#d9d9d9;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
```
如果有 border-radius 怎么办
可以使用 box-shadow 设置
- x 偏移量 0
- y 偏移量 0
- 阴影模糊半径0
- 阴影扩散半径 0.5px
- 阴影颜色
#box2 {
  box-shadow:0 0 0 0.5 #d9d9d9
}
## 移动到300ms 延迟
为了适配双击放大屏幕
初期解决方案 fastClick
```javascript

window.addEventListener('load',function() {
  FastClick.attach(document.body)
},false)
```
1. 监听 touchend 时间 touchstar touchunende 会优先 click 触发

2. 使用 自定义 dom 事件 模拟一个 click 事件

3. 把默认的 click 事件 （300ms 之后触发）禁止掉

现在浏览器改进：<meta name='viewport' content="width=device-width"> 如果有这个属性 width=device-width，那浏览器就认为已经做了响应式的布局，不需要通过双击放大，取消掉 300ms 延迟

# v2 v3 react diff算法的区别

diff 算法 
严格 diff 算法的时间复杂度是 o(n3)
2棵树，数1 数2 结果排序   

vue 和 react 的diff 是优化的，时间复杂度降到了 o(n)

- 值比较同级别，步跨级比较
- tag 不同删除重建 不再去比较内部的细节
- 子节点通过 key 区分

三者的不同：
### react 仅右移
如果遇到了相同的node, 如果old vnode 向左移动保持顺序一致，就不动，如果向右移动保持和new vnode 顺序一致，那就移动
### vue 双端比较
4个指针，两端向中间对比，
### v3 最长递增子序列
[3,4,5,7,1,5,7,8,2,5] => [3,4,5,7,8]
还是两端向中间对比，将不同的区域，最长递增子序列不动，其他的移动

# jsBridge

app 通过 webview 承载 h5

chrome 也是使用 webview 承载 h5

h5 不能穿过 webview 调用 app 的功能

JS Bridege 的常见实现方式

- 注册全局API

 window.xxx = xxxx   不适合异步情况

- URL scheme
不使用 http https 协议， 通过 自定义协议头 一般为 appname:// 拼接url data
实现和 app 通信
``` javascript

const sdk = {
  invoke(url, data, succ, err) {
    const iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    document.body.appendChild(iframe)
    iframe.onload = () => {

    }

    iframe.src = `my-app-name://${url}?data=${JSON.stringfy(data)}`
  }
}
```
# weakMap, weakSet
弱引用，不会影响垃圾回收

```javascript

const data = {}

function fn1() {
  const obj = {x:1}

  data.obj = obj
}

fn1()
// 不会垃圾回收,data 是全局遍历， 它饮用者 obj, 所以不会被释放

const wMap = new weakMap()

function fn1() {
  const obj = {x:1}

  wMap.set(obj, 1 ) // weakMap 的 key  只能是引用类型
}

fn1()
// 垃圾回收时，会清除obj

```
# 垃圾回收
- 引用计数
  let a= {x:100}  此对象被 a 引用 + 1
  let a1 = a  被 a1 引用 + 1
  a = 10  引用 -1
  a1 = null 引用 -1
此时 { x: 100 } 被引用数 0， => 销毁

问题： 循环引用
const obj2 = {}
const obj1 = {}
obj1.a = obj2
obj2.a = obj1

- 标记清除
定期从 window 遍历各属性，能得到就保留，得不到就清除

从根节点（或全局变量）往下去遍历，只要是能找到的，就标记一下。

其他的找不到的（即无用的、可回收的变量）就清除掉。

# 数组按n个一组分组

```javascript
splitByn (n) {
  const arr = []
  this.list.forEach((item,i)=>{
    const subArr = Math.floor(i/n)
    if(!arr[subArr]){
      arr[subArr] = []
    }
    arr[subArr].push(item)
  })
  return arr
}

```