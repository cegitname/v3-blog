## change log

`v1.1.0` 无埋点+圈选+热力图


## 配置

```js
export default {
  // 是否自动收集点击事件
  autoClick: true,
  debug: false,
  // 日志发送地址
  logUrl: "",
  // 热力图数据获取地址
  heatmapUrl: "",
  sdk: {
    app_version: "1.0.0",
    log_version: "1.0.0",
    business_line: "yzl"
  },
  // 平台参数
  platform,
  postMsgOpts: []
};
```

1. autoClick 默认为 true，开启会自动收集点击事件(即点击无埋点)。
2. debug 默认不开启，开启会将埋点数据打印到控制台，便于调试。
3. logUrl 接收日志的后端地址
4. heatmapUrl 热力图数据获取地址
5. sdk sdk 自身信息一些说明
6. platform 默认会自动获取一些平台参数，你也可以通过配置这个字段覆盖它

## 圈选模式

### 配置 postMsgOpts

初始化 sdk 时需要配置 postMsgOpts，一般来说 targetOrigin 和 curOrigin 是埋点系统的域名

```js
const AutoLogger = window.WebLogger.AutoLogger;
const targetOrigin = "track system url";
const curOrigin = "track system url";
const logUrl = "...";
new AutoLogger({
  debug: true,
  logUrl,
  postMsgOpts: [
    {
      targetWindow: window.parent,
      targetOrigin
    },
    {
      targetWindow: window,
      targetOrigin: curOrigin
    }
  ]
});
```

### 开启/停止圈选模式

将 sdk 页面通过 iframe 嵌入以后，在埋点系统中发送消息就可以启用/停止 sdk 的圈选模式

```js
const data = {
  mode: "CIRCLE_SELECT",
  status: "on" // 'off'
};
const targetOrigin = "track system url";
const ifrWindow = document.getElementById("ifr").contentWindow;
ifrWindow.postMessage(JSON.stringify(data), targetOrigin);
```

启用圈选模式后，hover 任意元素都会被红色框圈选出来。

### 监听 sdk 页面回传的 log 数据

最后，你只需要在埋点系统中监听消息，就可以接受 sdk 页面回传的 log 数据。基于这些数据，就自由地实现圈选分析功能了。

```js
window.addEventListener("message", event => {
  const { heatmapValueFetch } = this.props;
  if (event.data && event.data.logData) {
    const logData = JSON.parse(event.data.logData);
  }
});
```

## 热力图模式

### 配置 postMsgOpts

初始化 sdk 时需要配置 postMsgOpts，一般来说 targetOrigin 和 curOrigin 是埋点系统的域名

```js
const AutoLogger = window.WebLogger.AutoLogger;
const targetOrigin = "track system url";
const curOrigin = "track system url";
const logUrl = "...";
const heatmapUrl = "...";
new AutoLogger({
  debug: true,
  logUrl,
  heatmapUrl,
  postMsgOpts: [
    {
      targetWindow: window.parent,
      targetOrigin
    },
    {
      targetWindow: window,
      targetOrigin: curOrigin
    }
  ]
});
```

### 开启/停止热力图模式

将 sdk 页面通过 iframe 嵌入以后，在埋点系统中发送消息就可以启用/停止 sdk 的热力图模式

```js
const data = {
  mode: "HEATMAP",
  status: "on" // 'off'
};
const targetOrigin = "track system url";
const ifrWindow = document.getElementById("ifr").contentWindow;
ifrWindow.postMessage(JSON.stringify(data), targetOrigin);
```

启用热力模式后，sdk 会向配置的 heatmapUrl 接口发送请求，所以这个接口的格式需要和 sdk 的预设一致。
request

```s
method: POST
url: config.heatmapUrl
data:
{
  "pageUrl": location.href
}
```

response

```json
{
  // ...
  "data": {
    "max": 1,
    "data": [
      {
        "x": "41",
        "y": "171",
        "value": 1
      },
      {
        "x": "153",
        "y": "88",
        "value": 1
      }
    ]
  }
}
```

基于返回的数据 sdk 会绘制当前页面的热力图。
