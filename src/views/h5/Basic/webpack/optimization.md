### 路由懒加载
通过 webpackChunkName 设置分割后代码块的名字

```javascript
const Home = () => import(/* webpackChunkName: Home */ '@/views/home/index.vue')
```

**路由懒加载的原理**
- 调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中
- webpackChunkName 作用是 webpack 在打包的时候，对异步引入的库代码（lodash）进行代码分割时，设置代码块的名字。

### 组件懒加载
```javascript
const dialogInfo = () => import(/* webpackChunkName: "dialogInfo" */ '@/components/dialogInfo');
```
### Tree shaking 
在package.json 中添加 sideEFfects: ["*.css", "*.less" ]
- Use ES2015 moulule syntax(i.e import and export)
- Ensure no compilers transform your ES2015 module syntax into CommonJS modules
- Add a "sideEffects" property to your project`s package.json file
- Use the production mode configuration option to enable various optimizations including minification and tree shaking





### 骨架屏 缩短白屏时机
vue-skeleton-webpack-plugin

### 长列表虚拟滚动
虚拟滚动基本原理：
计算出列表总高度，并在触发时滚动事件时根据 scrollTop 值不断更新 startIndex 以及 endIndex ，以此从列表数据 listData 中截取对应元素
虚拟滚动插件: 比如 vue-virtual-scroller、vue-virtual-scroll-list、react-tiny-virtual-list、react-virtualized 等
```javascript
// 安装插件
npm install vue-virtual-scroller

// main.js
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)

// 使用
<template> 
  <RecycleScroller 
    class="scroller" 
    :items="list" 
    :item-size="32" 
    key-field="id" 
    v-slot="{ item }"> 
      <div class="user"> {{ item.name }} </div>
  </RecycleScroller> 
</template>

链接：https://juejin.cn/post/7188894691356573754
该插件主要有 RecycleScroller.vue、DynamicScroller.vue 这两个组件，其中 RecycleScroller 需要 item 的高度为静态的，也就是列表每个 item 的高度都是一致的，而 DynamicScroller 可以兼容 item 的高度为动态的情况
```

### preload prefetch
<link rel='preload' src="xxx"> 
提前加载 并且不会阻断onload
<link rel='prefetch' src="xxx">
空闲时间加载

### 图片的懒加载
由于浏览器会自动对页面中的 img 标签的 src 属性发送请求并下载图片。可以通过 html5 自定义属性 data-xxx 先暂存src 的值
然后在图片出现在屏幕可视区域的时候，再将 data-xxx 的值重新赋值到 img 的src 属性即可
以 vue-lazyload 插件为例
```javascript
// 安装 
npm install vue-lazyload 
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png', // 图片加载失败时的占位图
  loading: 'dist/loading.gif', // 图片加载中时的占位图
  attempt: 1
})

// 通过 v-lazy 指令使用
<ul>  
    <li v-for="img in list">
        <img v-lazy="img.src" :key="img.src" >
    </li>
</ul>
```

### 使用字体图标

### 将图片转为 base64 格式
1. 它处理的往往是非常小的图片，因为 Base64 编码后，图片大小会膨胀为原文件的 4/3，如果对大图也使用 Base64 编码，后者的体积会明显增加，即便减少了 http 请求，也无法弥补这庞大的体积带来的性能开销，得不偿失

2. 在传输非常小的图片的时候，Base64 带来的文件体积膨胀、以及浏览器解析 Base64 的时间开销，与它节省掉的 http 请求开销相比，可以忽略不计，这时候才能真正体现出它在性能方面的优势
```javascript
项目可以使用 url-loader 将图片转 base64：
// 安装
npm install url-loader --save-dev
// 配置
module.exports = {
  module: {
    rules: [{
        test: /.(png|jpg|gif)$/i,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 10 // 小于 10kb 的图片转化为 base64
            }
        }]
     }]
  }
}
```

### 减少大数据DOM渲染
通过: 数据懒加载，组件懒加载，虚拟滚动，数据分页等方式，来减少组件的 DOM 渲染
### window上的监听事件没有移除或移除错误
在页面销毁的时候，主动解绑，释放内存
``` javascript
对于函数节流与防抖的场景，要特别注意：确保移除的是同一个事件，如果姿势不对，可能依旧会造成内存泄漏
// 版本一
mounted() {
    window.addEventListener('resize', debounce(this.fn, 100))
},
beforeDestroy() {
    window.removeEventListener('resize', debounce(this.fn, 100)) 
}
因为每次调用debounce(this.fn, 100)时, 其实都会返回一个新的函数，导致 addEventListener 和 removeEventListener 方法传入的回调函数已经不是同一个函数，监听器没有被正确移除

**正确的写法**
// 版本二
data() {
    return {
        debounceFn: null
    }
},
mounted() {
    this.debounceFn = debounce(this.fn, 100)
    window.addEventListener('resize', this.debounceFn)
},
beforeDestroy() {
    window.removeEventListener('resize', this.debounceFn)  
}
```

###  闭包的错误使用
闭包所引用的变量在函数体外，如果没有手动干预，就会造成内存泄露

### EventBus 事件没有在 destoryed 时解绑
