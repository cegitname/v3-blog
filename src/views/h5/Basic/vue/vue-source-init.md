# 源码构建
从配置文件中读取配置，通过命令行参数过滤构建配置，从而构建出不同版本得vue.js

# new vue()

this.init()

1. 合并配置，初始化事件，渲染, 声明周期， data, props, watch..
2. 如果有el属性， 就调用vm.$mount

# $mount

1. 对el 做限制，不能挂载到body, html这些根节点上
2. 将el 或者template 转化为 render 函数
3. 调用mountCompoent方法

# mountComponent
1. 声明updateComponent函数 , 回调时update, update得参数时render生成得vnode
2. 实例化一个渲染watcher
3. updateComponent作为watcher得回调， 2个时机会触发回调，1是首次渲染，另外就是被检测得数据更新时

# render方法 
render得作用就是通过createElement 创建vnode，并返回

# creteElement

2个主要流程 1是规范化子节点，然后创建vnode

1. 虚拟节点实际是一个数结构，每个vnode都有若干个子节点，这些子节点也应该是vnode类型
2. 创建vnode需要判断节点类型，字符串/component类型，是否是内置节点，生成对应类型得节点并返回

# update 
update 方法就是通过虚拟节点映射成真实得dom节点，并插入父节点中
update 得核心是vm._patch_
patch会接收4个参数 oldVnode vnode hydrting removeonly

update时，会判断oldVnode 是否是真实dom, oldVnode和vnode是否是samenode

如果是samenode 并且非真实dom 则会pathVnode
否则 如果是 真实dom 则会调用createElm, 把虚拟节点映射成真实Dom 并插入父节点

1. 尝试创建子组件
2. 创建占位符元素，在创建之前 会检测是否包含tag, tag在非生产环境下的合法性。
3. 遍历子节点，递归调用createElm 创建子节点dom，并且Insert到父节点
4. 因为是递归调用，所以会优先insert子，所以整个node树， 是先子后父的插入顺序


# 虚拟节点
真实的dom是非常庞大的。因为浏览器在设计dom时候规则就很复杂，所以当我们频繁操作dom时，会导致一定的性能问题
virtual dom 是用js去描述一个真实dom节点，所以是非常轻量的。virtual的作用是映射真实dom的渲染，不需要包含
操作dom的方法，所以比较请，关键属性就是data，键值，标签名，子节点

# 数据驱动
数据驱动指的是通过数据驱动视图，修改视图不需要直接操作dom，而是通过修改数据。相比传统的前端开发，操作dom，代码量
少了很多，尤其是在复杂的业务逻辑中，大大减少了代码里。因为我们只需要关心数据的修改，这会使得逻辑非常清晰。dom成了
数据的映射，这样的代码是非常利于维护的