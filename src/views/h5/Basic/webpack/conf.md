### 如何解决打包后缓存的问题
  1. 让文件带有 hash 字符串，每次打包，内容变化，hash 就会变化
  ```javascript
  output: {
    path: path.resolve(__dirname, 'dist')
    fileName: '[name].[hash:8].bundle.js'
  }

  main.d3a5dd20.bundle.js
  ```
  2. html-webpack-plugin 的配置项 hash 为 true, 这样打包好的 js 文件在插入 html 文件后会以 ? 开始添加 hash 串
  ```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'main.html',
      hash: true
    })
  ]

  <script type="text/javascript" src="main.js?d3a5dd204b4d1b64170c"></script>
  ```

### css-loader 和 style-loader 的作用
  css-loader 主要处理 css 文件中 @import 和 url 语法
  style-loader 主要作用是将 css 样式以 style 标签的形式插入页面

### 如何使用 css 样式抽离
  通过 link 的形式导入
  ```javascript
    npm install mini-css-extract-plugin -D
    
    {
      test: /.css$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        'css-loader'
      ]
    }

    plugins: [ new MiniCssExtractPlugin({filename: './css/index.css'})]
    // 这里 filename 表示生成的 css 文件放到 css 文件夹下，且文件名为 index.css
  ```

  ### 如何在 style 资源中注入内容
  ```javascript
    npm install style-resources-loader -D

    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'scss-loader', {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, 'scss/variables/*.scss'),
            path.resolve(__dirname, 'scss/mixins/*.scs')
          ]
        }
      }]
    }

    主要用于导入一些公共样式文件，避免每个样式文件中手动 @import 导入
  ```

### 如何自动添加前缀 
  ```javascript
  yarn add postcss-loader autoprefixer -D

  postcss.config.js
  module.exports = {
    plugins: [require('autoprefixer')]
  }

  config.js
  {
    test: /\.css$/,
    use: ['css-loader', 'postcss-loader']
  }
  ```
### 抽离的 css 如何实现压缩
  ```javascript
  yarn add optimize-css-assets-webpack-plugin -D

  config.js
  {
    plugins: [new OptimizeCssAssetsPlugin()]
  }

  ```

### 压缩 js 使用什么插件

  ```javascript
  yarn add uglifyjs-webpack-plugin -D

  config.js
  optimization: {
    minimizer: [ new UglifyJsPlugin() ]
  }
  或者
  {
    pugins: [ new UglifyJsPlugin() ]
  }
  ```
### 暴露变量的三种方式
  1. expose-loader
  ```javascript
    yarn add expose-loader -D

    config.js
    import _ from 'lodash'

    rules: [{
      test: require.resolve('lodash'),
      use: 'expose-loader?_'
    }]
  ```
  2. 向每个模块都注入 _, 它不是全局的
  ```javascript
   plugins: [
    new webpack.ProvidePlugin({
      _:'lodash',
    })
   ]
  ```
  3. 直接在 html 中引入，这种方式不打包。注意避免在项目中再引入, 会重复打包。

### 如何处理 img
  injs: file-loader -D
  incss: style-loader,css-loader
  inHtml: html-withimg-loader -D

### 如何把图片变为 base64
  ```javascript
  url-loader -D

  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: 'url-loader',
      options: { limit: 200*1024 }
    }
  }
  资源小于 200kb 时用 base64 转化，否则 file-loader 产生真实的图片
  ```

### publicPath 的作用
  publicPath 指定的路径会被作为前缀添加到所有的 url 上
  - html 中的 link script img
  - css 中 background: url()

### sourcemap

- source-map 生成 map 文件，定位到行列
- eval-source-map 不生成 map 文件，定位到行列
- cheap-module-source-map 生成 map，定位到行
- cheap-module-eval-source-map 不生成 map, 定位到行

### 如何定义环境变量
  ```javascript
  plugins: [
      new webpack.DefinePlugin({
          DEV: 'dev',
          DEV_str: JSON.stringfiy('dev'),
          FLAG: 'true',
          FLAG_str: "'true'",
          expression: '1+1',
          expression_str: JSON.stringify('1+1')
      })
  ]
  ```
  ### 如何实现多线程打包，优化前5个
  安装包happypack。

  ### 请简述webpack中的HotModuleReplacement原理。
  1、当文件发生变化后，webpack会重新打包，打包完成后，发布done事件。
  2、done回调函数执行，通过服务端与客户端建立的长连接发送hash值到客户端。
  3、客户端收到hash值之后，确认是否要更新。如果更新，则会通过Ajax去请求manifest.json文件，该文件记录了所有发生变动的模块。
  4、通过manifest.json文件，客户端使用jsonp方式去拉取每一个变动模块的最新代码。
  5、客户端更新模块，加入了3个属性：parents、children、hot。
  6、通过模块id找到父模块中所有依赖该模块的回调函数并执行。
  7、页面自动更新，热替换完成。
