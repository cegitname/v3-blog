### 编译入口
1. 解析模板字符串生成AST
2. 优化语法树
3. 生成代码

```javascript
const ast = parse(template.trim(), options)

optimize(ast,options)

const code = generate(ast, options)
```

### parse

- 整个 parse 的过程就是利用正则表达式顺序解析模板，当解析到开始标签，闭合标签，文本的时候都会分别执行对应的回调函数，达到构造 ast树的目的;
- ast 树共有3种类型，普通元素，表达式，纯文本

### optimize & codegen

- 整个过程就是标记静态节点，静态节点生成的 DOM 不需要改变，在组件更新时会跳过，起到了极大的优化作用
- 生成code , 做为render 函数返回  render: `with(this){return ${code}}`

### event
- parse 阶段， 解析模板，按原生事件还是普通事件归类，并把回调函数字符串保留到对应的事件中，el.events / el.nativeEvents
- codegen 阶段，把ast元素上的events/nativeEvents 生成 data 数据
- dom 事件事件就是调用原生的addeventListener,removeEventListener,并根据参数传递配置
- 自定义事件，是利用 vue 定义的事件中心
  - 把所有事件用 vm._events 储存起来
  - 当执行 vm.$on 时，按事件名称，把回调储存
  - 执行 vm.$emit 时，根据事件名找到所有的回调函数，遍历执行
  - 执行 vm.$off 时，移除指定事件名
  - 执行 vm.$onece 时，内部就是执行 vm.$on，回调一次后 vm.$off 移除事件回调
  **总结**
  原生dom事件和自定义事件，主要区别在于添加和删除的方式不一样，自定义事件时在实例上派发，利用父组件环境定义回调函数实现父子通讯。

# v-model
1. parse 解析指令 v-modal
2. 生成 code 后执行了 
  - addProp(el, 'value', `(${value})`)
  - addHandler(el, event,null,true)
  - 实际上就是通过修改 ast 元素，给 el 添加一个 prop, 又给 el 添加了事件处理
    相当于在 input 上绑定了 value, 给 el 添加了事件处理
    ```javascript
      <input v-bind:value="message" v-on:input="message=$event.target.value" >
    ```
    
### slot
1. 普通插槽，是在父组件编译和渲染阶段生成 vnodes， 作用域时父组件实例，子组件渲染得时候直接拿到这些渲染好得 vnodes
2. 作用域插槽，父组件在编译和渲染阶段不好直接生成 vnodes， 而是在父节点 vnode 得 data 中保留一个 scopedslots 对象，
   储存着不同名称得插槽以及他们对应的渲染函数，只又在编译和渲染子组件阶段，才执行这个渲染函数，生成 vnodes，在子组件环境
   执行得，所以对印的数据作用域是子组件实例
3. 两种插槽得目的都是让组件 slot 占位符生成得内容由父组件决定，但数据作用域根据他们得 vnodes 渲染事件不同而不同

  

  