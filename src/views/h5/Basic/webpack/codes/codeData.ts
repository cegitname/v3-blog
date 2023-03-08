export const webpack = [
  {
    content: `webpack 是一个模块打包工具，核心功能是解决模块之间的依赖，将各模块按规则和顺序组织在一起，最终合并为一个js文件`
  },
  {
    title: '使用 script嵌入的问题：',
    list: [
      {
        content:
          '需要手动维护 js 的加载顺序，多个 script 之间会有依赖关系，由于这种依赖是隐士的，当页面中加载过多的时候很容易出现问题'
      },
      {
        content:
          '每个 script 都意味着向服务器请求一次静态资源，拖慢网页的渲染速度'
      },
      {
        content: `会污染全局作用域`
      }
    ]
  },
  {
    title: '模块化解决了什么',
    list: [
      {
        content: '通过导入导出能够清晰的看到模块之间的依赖关系'
      },
      {
        content: `通过工具打包，页面加载的是打包后的资源，减少网络开销`
      },
      {
        content: `多个模块之间的作用域彼此隔离，彼此不会有命名冲突`
      }
    ]
  },
  {
    title: '社区给出了 AMD, CommonJS, CMD, Es6 定义了模块标准。他们的缺点',
    list: [
      {
        content: '无法codeSplitting 和 tree shaking'
      },
      {
        content: '多数 npm 模块是 CommonJS , 浏览器不支持'
      },
      {
        content: `需要考虑浏览器兼容问题`
      }
    ]
  }
]
