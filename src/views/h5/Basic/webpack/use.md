### webpack 的核心概念
- entry: 构建的入口模块
- output: 如何输出文件，以及输出目录。例如 dist
- loaders: 解析文件，将无法处理的非 js 文件，处理处理成 webpack 能够处理的模块
- plugins: 更多的是优化，提取公共模块去重，压缩等，对 webpack 的功能扩展
- chunk: 优化，当设置 mode 为 production， 自动开启 code splitting, 对某些公共模块的去重，打包成一个单独的 chunk

### import 异步加载模块
就是达到某个条件时，才会请求资源
```javascript
  npm install --save-dev @babel/plugin-syntax-dynamic-import

  .babelrc 
  {
    ”plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
```
### contenthash 解决浏览器缓存
当你打包一个项目即将上线，有一个需求，你只修改了部分的文件，希望用户对于其他的文件，依旧采用浏览器缓存中的文件，这个时候需要用到 contenthash。

webpack 中的三种 hash：
- hash 主要用于开发环境，在构建的过程中，当你的项目有一个文件发生了改变，整个项目的 hash 值就会做修改，每次更新，文件都不会让浏览器缓存文件，保证了文件的更新效率

- chunkhash 跟打包 chunk 有关，就是 webpack 根据入口 entry 配置文件来分析起依赖项目并由此构建该 entry 的 chunk, 并生成对应的 hash 值。不同的 chunk 有不同的 hash 值。
  在生成环境中，第三方或公共类库进行单独打包，所以不用改动代码，hash 也就不变。可以使用浏览器缓存。
  这种方式存在的问题是，同一个 chunk 里面的 js 修改，css 的 chunk 的 hash 也会随着改动。

- contentHash 表示由文件内容产生的 hash 值，内容不同 contenthash 值也不一样，通常的做法是将 css 抽离出来引用。

### shimming 全局变量
通过 webpack 的内置插件 ProvidePlugin 配置
```javascript
new webpack.ProvidePlugin({
  _: 'lodash' // 等价于 Import _ from 'lodash'
})

```

###  webpack 中的 module, chunk, bundle 是什么
  **module**
  - 不同类型的模块。
  - webpack 就是用来对模块进行打包的工具。
  - 不同的文件都会被 loader 转换为有效的模块，然后被应用所使用并且加入到依赖关系图中。
  - 模块化的好处在于，模块化将程序分散为小的功能块。提供了封装的能力。

  **chunk**
  - 非初始的。对于一些动态导入的异步代码， webpack 会帮你分割出公用的代码(异步代码，node_modules)，这些被分割的代码文件就是 chunk
  - 初始化的。就是写在入口文件处的各种文件或者模块依赖，就是 chunk。他们最终会被捆在一起打包成一个 main.js，这个main.js可以理解为 bundle

  **bundle**
  捆绑好的最终文件，chunk 是各种片段，bundle 就是 chunk 组成的集合。经历了加载和编译的过程的源文件最终版本。

### 区分开发和生产环境
目录结构
- build
  - webpack.base.conf.js
  - webpack.dev.conf.js
  - webpack.prod.conf.js
  - webpack.test.conf.js
- config
- src

#### dev.conf.js
```javascript
  const merge = reuqire('webpack-merge')
  const baseWebpackConfig = reuqire('./webpack.base.conf')
  const devWebpackConfig = merge(baseWebpackConfig,{
    mode: 'development',
    plugins: [...]
  })
  module.exports = devWebpackConfig
```
#### prod.conf.js
```javascript
  const merge = require('webpack-merge')
  const baseWebpackConfig = require('./webpack.base.conf')
  const prodWebpackConfig = merge(baseWeboackConfig,{
    mode:'prodution',
    plugins: [...]
  })
  module.exports = prodWebpackConfig
```
#### package.json
```json
'script': {
  "dev": "webpack serve --mode development",
  "build:dev": "webpack --config ./build/webpack.dev.conf.js",
  "build:prod": "webpack --config ./build/webpack.prod.conf.js",
}
```

### Code Spliting 
**Code Spliting**
webpack4 废弃了 CommonsChunkPlugin 引入了 optimization.splitChunks
- 默认是不用配置的，如果 mode 是 production, webpack4 就会开启 code splitting.
- webpack4 只会对按需加载的代码做分割。如果需要配置初始加载的代码也加入到代码分割，需设置 chunks: 'all'
- 默认的拆分规则
  - 新 bundle 被2个及以上模块引用，或者来自 node_modules
  - 新 bundle 大于 30kb 
  - 异步加载并发加载的 bundle 数不能大于5
  - 初始加载的 bundle 数不能大于 3
- 属性 cacheGroup
  - webpack 除了自定义的分割规则，用户也可以自定义 chunk
  - 那一个 module 应该被抽取到哪个 chunk 呢，这是由 cacheGroups 的抽取范围控制的。
    每个 cacheGroups 都可以定义自己抽取模块的范围，不同的 cacheGroups 之间的模块范围如果有交集，我们可以用 priority 属性控制优先级。
    默认的抽取的优先级是最低的，所以模块会优先被抽取到用户的自定义 chunk 中。
    splitChunksPlugin 提供了两种 chunk 抽取模块范围的方式。
    - test 属性，可以传入字符串，正则或者函数，所有 module 都会去匹配 test 传入的条件，如果符合条件，就会被纳入这个 chunk 的备选模块范围。
      先匹配 module 的路径，然后匹配 module 之前所在 chunk 的 name
    例如：
      ```javascript
      匹配所有 node_modules 中加载的依赖。
      vendors1: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    ```
    - chunks 属性
      - 可以是字符串 'all' | 'async' | 'initial', 分别代表了全部 chunk,按需加载的 chunk 以及初始化加载的 chunk。也可以是函数，在函数中可以拿到 chunk.name。这给了我们可以通过入口来分割代码的能力。以chunk为单位的细粒度分割方式。
      例如：
        ```javascript
        定义一个 cacheGroups，将a,b,c 三个入口，a,b打包为 common. c 不参与公告代码的分割
        optimization: {
          splitChunks: {
            common: {
              chunks(chunk) {
                return chunk.name !== 'c'
              },
              name: 'common',
              minChunks: 2
            }
          }
        }
        ```


    
