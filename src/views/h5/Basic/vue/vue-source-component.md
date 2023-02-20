vue.js得一个核心思想是组件化.所谓组件化，就是把页面拆分成多个组件，每个组件依赖css,js,template等资源放在一起开发和维护
组件是资源独立的，组件在系统内部可复用，组件和组件之间可以嵌套。

# createComponent

创建一个组件类型的vnode

vnode = createComponent(tag, data, context, children)

- **核心流程**
1. 构造子类构造函数
  Ctor: Class<Component> | Function | Object | void
  Ctor = Vue.extend(Ctor)

2. 安装组件钩子函数
  installComponentHooks(data)

3. 实例化vnode
   const vnode = new Vnode({
    `vue-component-${Ctor.cid}${name | ''},
    data,undefined,undefinedundefined,context,
    {Ctor, propsData, listeners, tag, children},
    asyncFactory
   })

   return vnode

# vue.extend
作用就是构造一个vue的子类，它使用一种非常经典的原型继承的方式，把一个纯对象转换一个继承于vue的构造器Sub, 并返回
然后对sub这个对象本身扩展了一些属性。最后给这个sub做了缓存，避免多次执行vue.extend的时候对同一个子组件重复构造。
当实例化子组件时，就会执行this._init逻辑

# patch update

  - 在createElm中， createComponet 返回true， 直接结束
  - **creteComponent**
    - let i = vnode.data , i就是 init 钩子函数
    - i(vnode, false) 执行init
    - **init**
      - 通过createComponentInstanceForVnode(vnode:vnode, parent:activeInstance) 
        创建一个vue实例 return new vnode.componentOptions.Ctor(opts)
        相当于 return new Sub(opts)
      - 在new Sub时会执行初始化， vue.prototype._init
        这里 options._isComponent 为true, 执行initInternalComponent(vm, options)
      - 组件初始化时，没有el属性，子组件自己接管了$mount
        - const children = new Sub(); 
        - children.$mount()
        - mountComponent()
        - vm._render()
          - vm.$vnode = _parentVnode
          - vnode.parent = _ parentVnode
          - return vnode  **vm._vnode和$vm.$vnode是父子关系**
        - vm. update()
          - const preVnode = vm._vnode
           - vm._vnode = vnode
          - const preacActiveInstance = activeInstance
          - vm.$el = vm.__patch__(prevnode, vnode)
          - activeInstance = preacActiveInstance
          - 这个activeInstance的作用是保持当前上下文的vue实例, 它是在lifecycle模块的全局变量。
            - 在调用createComponentInstanceForVnode时从lifycycle获取
            - vue初始化是一个深度遍历的过程，在实例化子组件的过程中，他需要知道上下文的vue实例是什么，
            - 并把它作为子组件的父vue实例。
            - 在调用internalComponent(vm, options)时，合并options, 把parent储存在vm.$options中
            - 在$mount之前会调用 initlifycycle, vm.$parent用来保留当前vm的父实例
              parent = parent.$parent
              parent.$children.push(vm) 把当前vm储存到父实例的$children中
              vm.$parent = parent
            - 在vm.update过程中，把当前得vm赋值给activeInstance， 同时通过const preactiveInstance = activeinstance
            用preactiveInstance 保留上一次的 activeinstance。 实际上 preactiveinstance 和当前的vm是一个父子关系
            当一个vmm实例完成它所有子树的patch 或者update后， activeInstance 会回到它的父实例，这样就完美的保证了createComponentInstanceForVnode整个深度遍历过程中，我们在实例化子组件的时候能传入当前子组件的父vue实例
            在init过程中，通过vm.$parent把这个父子关系保留

          
        
            


      
