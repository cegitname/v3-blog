# 核心思想
数据驱动，组件化，响应式原理，编译

# 源码构建
读取配置文件的配置, 通过命令行参数过滤构建配置， 构建出不同版本的vue.js

# 初始化
1. 合并配置，初始化渲染，生命周期，事件，data, props, watch等等
2. 判断是否有el属性，则通过vm.$mount挂载vm

# $mount
1. 对el做了限制, vue不能挂载在body, html这样的根节点上
2. 如果没有render函数, 会把el或者template转换成render函数
3. 将render函数赋值给vm
4. 调用vm.mount方法==> 调用 updateComponent(vm.update(vm.render))

# updateComponent
1. 核心就是实例化一个渲染watcher
2. updateComponent传入watcher 作为回调
3. 回调的触发时机有2个， 初始化，被监测的数据更新

# render
1. render用来把实例渲染成一个虚拟node
2. render方法通过调用createElement创建vnode

# Virtual Node 
dom元素是非常庞大的，因为浏览器标准就把DOM设计的非常复杂。因为在频繁操作dom时，会导致一定的性能问题。
而虚拟dom是用原生js去描述一个dom节点，关键属性就是标签名，数据，键值，子节点
他是用来映射真实dom的渲染，不需要包含操作dom的方法，所以是非常轻量的。
虚拟dom除了对数据结构的定义，映射到真实dom，实际上要经历vnode的create,diff,path等过程

# creteElement
1. 对children的规范化
  虚拟dom实际是一个树结构，每个vnode下有若干个子节点， 这些子节点也应该是vnode类型
  函数式组件返回的不是vnode，而是一个数组
  用户手写的render函数
  v-for, slot会产生数组嵌套的情况
2. 创建vnode
  a. 首先对tag做判断，是string 还是component
  b. 如果是string, 判断是否是内置节点，是则创建一个普通的vnode。如果是已注册的组件名，则创建一个组件类型的vnode，否则创建一个未知标签的vnode
  c. 如果是component类型, 则创建一个组件类型的vnode

3. 返回vnode

# creteElement
2个主要流程 1是规范化children 2是创建vnode

1. 虚拟Dom实际上是一个树结构，每个vnode下有若干个子节点，这些子节点也应该是vnode
主要是为了处理用户手写render, v-for,slot生成的循环嵌套，函数式组件生成的不是vnode， 而是数组

2. 创建vnode首选是判断tag类型，如果是string 判断是否是内置节点(普通节点)，是否是已注册组件名(组件节点),否则(未知标签节点)
   如果是component类型 创建一个组件类型节点

3. 最终返回vnode

# update
1. update的作用就是把vnode渲染成真实dom
2. update的核心就是抵用vm._patch__方法
