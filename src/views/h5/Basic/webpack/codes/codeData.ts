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
  },
  {
    title: 'CommonJS',
    content: '通过 require 导入模块，通过 module.exports 导出模块中的内容',
    list: [
      {
        content: '该模块未加载时，首先执行该模块，获取最终导出结果'
      },
      {
        content: '已加载过，不好再次执行，而是取之前模块执行结果导出'
      },
      {
        content: `可以接收表达式`
      }
    ]
  },
  {
    title: 'Es6 Module',
    content:
      '将每个文件都作为一个模块，每个模块拥有自身的作用域，通过 export 和 import 导出导入'
  },
  {
    title: 'CommonJS 和 ES6 Module 的区别',
    list: [
      {
        content: `commonjs 是动态的，es6 是静态的，es6必须位于顶层作用域，比如不能在 if 语句中`
      },
      {
        content: `赋值和动态映射，commonjs 导出值的副本，导出的内容可以修改，不影响本身。es6 是动态映射，这个映射是只读的`
      },
      {
        content: `依赖循环，在 commonjs 中遇到依赖循环，没法的到预想的结果，es6 可以`
      }
    ]
  },
  {
    title: 'AMD',
    list: [
      {
        content: '使用 define 来定义模块'
      },
      {
        content: '用 require 加载模块，异步方式'
      }
    ]
  },
  {
    title: '如果将有依赖关系的模块串联在一起',
    content: `工程中，所有产生了依赖关系的模块都会以 key-value 的形式，储存在 modules 对象中。
    key 可以理解为一个模块的id, 由 hash字符串组成。value 是匿名函数，匿名函数的参数赋予了模块导入导出的能力，参数 export, webpack_require。
    浏览器通过webpack_require(module_id) 来完成模块导入。每个模块只有第一次加载时执行，执行后会被储存在 installModules 对象中，再次加载从这个对象中取值`
  },
  {
    title: 'bundle 在浏览器中的执行流程',
    list: [
      {
        content:
          '在浏览器中初始化执行环境，声明 installModules, webpack_require'
      },
      {
        content: `加载入口模块，浏览器从他开始执行`
      },
      {
        content: `执行模块代码，遇到 module.exports 则记录模块导出值，如果遇到了 webpack_require，则会进入，执行其他模块`
      },
      {
        content: `在 webpack_module 中判断加载的模块，判断是否存在于 installModules 中，否则继续执行第三步`
      },
      {
        conetnt: `所有模块都执行完毕，回到入口模块，入口模块逻辑执行完，意味着 bundle 运行结束`
      }
    ]
  },
  {
    title: '配置',
    list: [
      {
        title: '模块打包工具 npm script',
        content: 'pageckage.json',
        code: `"script":{
          "build":"webpack --entry=./idnex.js --output-filename=bundle.js --mode=development --config xxx.config.js"
        }`,
        list: [
          {
            content: 'entry: 指定资源打包的入口'
          },
          {
            conent: `output-filename 指定打包后的文件名`
          },
          {
            content: `mode 指定打包模式。分别是：development / production / none`
          },
          {
            content: `指定打包的配置文件`
          }
        ]
      },
      {
        title: 'webpack-dev-server',
        content: `devserver 的作用是接受浏览器的请求，然后将资源返回`,
        list: [
          {
            content: '当服务启动时，先让 webpack 将资源打包'
          },
          {
            content: `devserver 接受浏览器请求时，对 URL 进行校验`
          },
          {
            content: `如果是资源服务地址，就会在打包结果中寻找资源并返回给浏览器`
          },
          {
            content: `反之，读取硬盘中的源文件返回`
          }
        ]
      }
    ]
  }
]
