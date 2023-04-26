# 遇见埋点类实现,不含热力图

```javascript
const defaultOption = {
  autoClick: /* 是否自动收集点击事件 */ true,
  debug: /* 触发埋点时，是否log 埋点参数*/ false,
  logUrl:/* 埋点触发 url */ '',
  sdk: /* sdk信息 */ {app_version: '',log_version: '',business_line: ''},
  platform /*平台参数 */
}

class AutoLogger {
  constructor(option) {
    this.option = {...defaultOption,...option}
    this.timer =/* 用于清除定时器触发的埋点 */ null
    this._init()
  }
  /**
   * 调用自动收集函数
   * event => 页面跳转埋点，心跳埋点
   * _autoClickCollection => 收集页面点击行为
   * */ 
  _init() {...}
  
  /** 每1s 触发一次 _log 函数 **/ 
  _onJump() {...}

  /** 用户手动触发 _log 函数 **/ 
  _push() {...}

  /** 构建log函数 需要的最终参数 data  **/
  _buildLogData() {...} 

  /**
   * 核心代码，通过 body.addEventListener('click',callBack)
   * 通过 _buildLogData 自动构建参数
   * 调用 this._log(data) 实现自动收集点击事件埋点
   * **/
  _autoClickCollection() {...}

  /** 通过 axios 访问 this.options.logUrl, 完成收集 */
  _log(data) {...} 
}
```

## 埋点触发
使用分为两类，手动和自动触发
- 自动触发埋点 调用 _onJump 函数
  - addEventListener('onhashchange') => 触发 _onJump
  - addEventListener('pushState') => 触发 _onJump 
  - addEventListener('replaceState') => 触发 _onJump 
  - addEventListener('onbeforeunload') => 页面关闭或刷新时 触发 _track msg:'关闭页面'

- 手动触发埋点 调用_push 方法


## _buildLogData 构建参数
参数组成
  - 平台参数 platfrom 
  - sdk 参数
  - _event类型 => click | track | jump
  - _refer => 自动生成（根据location.serch 截取拼接 ） | 用户传入的 refer 路径
  - cuurr_page_title: window.document.title
  - time: new Date().getTime()
  - eventData 自动埋点时，生成的 event 相关参数
    - event_type: 'onClick'=> onLoad | onClick
    - _event: 'click' => 同上
    - element_desc: ''=> 被点击元素的 innerText 描述
    - nodeName => 节点名称 Element 元素的 tagName div,p，li 。。。
    - xpath 表示元素层级关系，具体到某一个元素的路径 *[@id="box"]/div[3]
    - offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
    - offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
    - pageX,
    - pageY,
    - left: rect.left,
    - top: rect.top,
    - width: rect.width,
    - height: rect.height

```javascript
/**
 * 收集点击事件为例
 * */ 
function _buildLogData() {
  const { optParams, platform, sdk } = this.option
    const _data = {
      random: Math.random(),
      ...getQueryObject(window.location.href),
      ...getQueryObject(window.location.search)
    }
    return {
      ...optParams,
      ...platform,
      ...sdk,
      _event: 'track',
      _refer:
        window.location.href.split('#')[1].split('?')[0] + '?' + param(_data),
      cuurr_page_title: window.document.title,
      time: new Date().getTime(),
      ...eventData
    }  
}
```

## 实例化 Collect

```javascript

window._collect = new Collect.AutoLogger({
  debug: false,
  logUrl: origin + pathname + 'loading.png',
  sdk: {
    app_version: '1.2.0',
    log_version: '1.1.0',
    // 业务线
    business_line: 'yzl'
  }
})

```

## 手动埋点示例

```javascript

window._collect._push(['_click', {
type: 'phone',
msg: '点击拨打电话'
}])

window._collect._push([
  '_click',
  {
    type: 'good',
    msg: '点赞'
  }
])

beforeRouteEnter(to, from, next) {
  window._collect._push([
    '_jump',
    {
      type: 'jump',
      msg: '进入页面',
      refer: from.path
    }
  ])
  next()
}

beforeRouteLeave(to, from, next) {
  window._collect._push(['_track', {
    type: 'close',
    msg: '关闭页面',
    refer: from.path
  }])
  next()
},
```