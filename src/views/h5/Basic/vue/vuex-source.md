### Vuex 和单纯的全局对象有以下两点不同：
1. vuex 的状态储存是响应式的，如果store中的状态发生变化，那么相应的组件也会相应的得到高效更新
2. 不能直接改 store 中的状态，唯一途径是commit mutation。方便跟踪每一个状态的变化。

### 初始化
1. vuex 存在一个静态的 install 方法
2. 在 install 时执行 applyMixin(vue)
3. applyMixin 就是全局混入了一个 beforeCreate 函数
4. beforeCreate 就是把 options.store 保存在所有组件的 this.$store 中，options.store 就是实例化 Store 对象的实例
5. 把 store 拆分成 modules，modules 是一个树结构，通过递归遍历的方式完成了初始化。并给module定义了 namespace。
6. 初始化的最后，就是建立 state 和 getters 的联系，并且缓存起来。
  ``` javascript
    
    const computed = {}

    computed[key] = () => fn(store)

    object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumberable: true
    })
    store._vm = new Vue({
      data: {
        $$data: state
      },
      computed
    })
  ```
  - data 定义了 $$state 属性， 我们访问 store.state 的时候，实际访问 store 类上定义的 state 的get 方法：
    
    ```javascript
    get state () {
      return this._vm._data.$$state
    }
    ```