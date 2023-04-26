# 源码构建

<!-- 初始化 -->
# new Vue()

# $mount

# $mountComponent

# render

# createElement

# update

# createElm

<!-- 组件化 -->
# createComponent

# vue.extend

# _init

# patch

<!-- 响应式 -->
# initState

# Observer

# defineReactive

# dep

# watch

<!-- 组件更新 -->
# patch

# sameVnode

# patchVnode
作用就是将 vnode patch 到旧的 vnode 上 4步：
1. prepatch 钩子
   作用就是拿到组件配置，组件实例。更新了 vnode 所以它对应的 vm 的一系列属性也会发生变化，$slot,listeners，props 等 

2. update 钩子
   执行所有 module 的 update 钩子函数，以及用户自定义的 update 钩子函数

3. patch 过程
   - vnode 是文本，且新旧不同，则直接替换文本内容
   - 如果不是文本，则判断子节点
    - 新旧都存在，且不同，则 updateChildren 更新子节点
    - 只有 新 存在，表示旧节点不要了。通过 addVnodes 批量插入到新 elm 下
    - 只有 旧 存在，表示更新的是空节点，则将旧节点 removeVnodes 全部清除
    
4. postpatch
   组件自定义钩子函数，有则执行。

<!-- compile -->
# 编译入口

1. 解析字符串生成 AST

  ```javascript
  cosnt ast = parse(template.trim(), options)
  ```
2. 优化语法树

  optimize(ast, options)

3. 生成代码

  ```javascript
  const code = generate(ast, options) 
  ```
# parse
  - 整个过程就是利用正则表达式顺序解析模板，当解析到开始标签，闭合标签，文本的时候会分别执行对应的回调函数，达到构成 ast 语法树的目的。
  - ast 元素节点有 3种类型，普通元素，表达式，纯文本
  
  **整体流程**
  - 从 options 中获取方法和配置

  - 解析 HTML 模板
    - 注释节点，文档类型节点
    - 开始标签
    - 闭合标签
    - 文本

  - 处理开始标签
    - 创建 ast 元素
    - 处理 ast 元素 处理各种指令，属性
    - ast 树管理，目标就是构建一颗 ast 树，使用 stack 栈保证元素可以正确闭合，建立父子关系

  - 处理闭合标签
    - 遇到闭合标签，出栈一个

  - 处理文本内容
    文本构造的 ast 元素有2种：
    - type2: 纯文本， type3: 表达式
    - parseText() 对文本解析
      - 遇到普通文本就 push 到 rawTokens 和 tokens 中
      - 遇到表达式就转换成 _s(${exp}) push 到 tokens 中

# optimize 

前因：不是所有数据都是响应式的，有些数据首次渲染后就不好变化了。可以在 patch 过程跳过对他们的对比。

编译过程中可以把一些 ast 节点优化成静态节点，所以整个 optimize 过程就是标记静态节点

# codegen
编译的最后一步就是把优化后的 AST 转换成可执行的代码

```javascript

const code = generate(ast, options)

```
- generate 函数
  1. 首先通过 getElement 生成 code。
  2. 把 code 用 with(this){return code}  函数包裹。
- getElement 函数
  - 它的作用是判断当前 AST 元素节点的属性执行不同的代码生成函数
  - 根据 AST 元素节点的属性构造出一个 data 对象字符串

<!-- nextTick --> 
# nextTick ?
1. 在执行nextTick 时，会将任务push 到一个 callbacks 中
2. 在下一个 tick 执行 timerFunc，
3. timerFunc 会用异步任务包裹，包裹分为几种情况
  - 支持原生 promise 则用 promise.resolve.then() 包裹
  - 支持 setImmediate 则用之包裹，否则支持 messageChannel 则用之包裹
  - 否则降级为  settimeout 0 包裹
4. 遍历 callbacks 执行回调函数

nexttick 是微任务和宏任务并存的，正常现代浏览器执行都是通过 promise.then 微任务执行
当原生dom交互，v-on 绑定事件时，执行会强制包裹一层 withMacroTask 宏任务执行
https://github.com/ustbhuangyi/vue-analysis/issues/63


<!-- vuex -->


<!-- v-model -->
# vmodel ?
- parse 阶段，给 el 添加 directives 属性。
  将 el, name, rawName，value 等属性，构造成一个对象。
  push 到 el.directives 中

- generate 过程
  拿到 el.directives
  遍历 directives
    拿到指令类型判断
    拿到标签类型判断
      如果是input类型：给 input 添加 value="message", 绑定事件 @input="message = e.target.value"
  
<!-- event -->
# event ?
1. parse 阶段，解析模板，按原生事件/普通事件分类。并把回调函数字符串保留到对应的事件中。
2. codegen 阶段，把 ast 元素上的 events / native 生成 data 数据
3. dom 事件，在 patch 过程中会执行 updateDomListener
  - 获取 vnode.data.on 就是之前生成的 data 中对应的事件
  - 遍历 on 去添加监听，遍历 oldOn 移除监听
  - dom 的 add, remove 实际是调用原生的 addEventListener 和  removeEventListener
  - add 或 remove 的 handler 会用 with Macro Task（handler） 包裹，强制在 dom 回调函数执行期间如果修改了数据，这些数据会推入队列被当作 macroTask 在 nextTick 执行
4. 自定义事件中，在 render 阶段，如果是一个组件节点，会 createComponent 创建一个 vnode
  - 把 data.on 赋值给了 listener， 把 data.nativeon 赋值给 data.on
  - 对于自定义事件，把 listener 做为 vnode 的 componentOptions 传入
  - 在子组件初始化的时候，会执行 iniInternalComponent， 执行 initEvents
  - 对于自定义事件的不同，就是事件的添加和删除的实现是利用 vue 定义的事件中心

# vue 的事件中心 ?

<!-- vue2 中遇到的坑 -->








