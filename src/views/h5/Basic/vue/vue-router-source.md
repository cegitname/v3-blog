### Vue.use
vue 提供了 vue.use 的全局 API 注册这些插件

vue.use 接受一个 plugin 参数，摈弃维护了一个 _installPlugins 数组，储存所有注册过的 plugin

接着判断 plugin 是否定义了 install 。如果由，则调用该方法，并且该方法的第一个参数是 vue

最后，把 plugin 储存到 installPlugins 中。

Vue 插件对 vue 是有依赖的，不能单独去 import vue，这样会增加包体积，所以通过参数的方式拿到 vue 对象。

### Vue.mixin
作用就是把要混入的对象，通过 mergeOptions 合并到 vue 的 options 中，
由于每个组件的构造函数都会在 extend 阶段合并 vue.option 到自身的 options 中，
所以也就相当于每个组件都定义了 mixin 定义的选项。
