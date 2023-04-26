import axios from 'axios'
import bom from '../common/bom'
import eventUtil from '../common/eventUtil'
import getXPath from '../utils/getXPath'
import sliceText from '../utils/sliceText'
import defaultOption from './option'
import getEvent from '../common/getEvent'
import getBoundingClientRect from '../utils/getBoundingClientRect'
import appendStyle from '../utils/appendStyle'
import CssText from '../css-text'
import Heatmap from './utils/heatmap'
import { CLICK_SELECT, STYLE_ID, MODE, HEATMAP_CANVAS } from './constant'

import { getQueryObject, param, browser } from '@/utils'

const { doc, ref, loc, win } = bom

class AutoLogger {
  constructor(option) {
    this.option = {
      ...this.defaultOption,
      ...option
    }
    this.mode = ''
    this.params = {}
    this._addMessageListener()
    this._init()
    this.timer = null
  }

  /**
   * ********* detaultOption ***********
   * @autoClick  是否自动收集点击事件 默认 true
   * @debug 发送埋点数据时，是否 log 参数  默认 false
   * @logUrl 发送埋点的URL main.js 中=> origin + pathname + 'loading.png'
   * @heatmapUrl 热力图接口url
   * @sdk { app_version, log_version, business_line }
   * @platform
   * @postMsgOpts
   * */
  get defaultOption() {
    return defaultOption
  }

  /**
   * 执行 autoClickCollection =>  body 代理 click 事件, 执行回调 autoClickHandle
   * 执行 event()
   * */
  _init() {
    try {
      if (this.option.autoClick) {
        this._autoClickCollection()
      }
      this.event()
    } catch (err) {
      console.log(err)
    }
  }

  _autoClickCollection = () => {
    eventUtil.on(doc.body, 'click', this._autoClickHandle)
  }

  _autoClickHandle = (e) => {
    try {
      /**
       * 1. 获取 logData
       * 2. 调用 log 函数 发送埋点事件
       * */
      const { event, targetElement } = getEvent(e)
      const logData = this._getLogData(e)
      if (this.mode === MODE.CIRCLE_SELECT || this.mode === MODE.HEATMAP) {
        this._selectElement(event, targetElement)
        this._postMessage(logData)
      } else {
        this._log(logData)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // 发送埋点事件
  _log = (data) => {
    const { debug, logUrl } = this.option

    if (debug) {
      console.log(data)
    }
    logUrl &&
      axios({
        method: 'get',
        url: logUrl,
        params: data,
        headers: {
          token: sessionStorage.getItem('token')
        }
      })
  }
  /**
   * _event:  click:点击行为，jump:跳转行为，track: 埋点行为（关闭，浏览时长）
   * _click:  点击的元素命名（id,class等）
   * _jump:   跳转到哪一页
   * _refer:  来源地址
   * isShare: 是否是分享
   * msg:     用户行为描述
   * type:    分类 wx,phone,forward
   * _desc:   系统行为
   */
  /**
   * 获取要传递的内容
   * 1. 创建事件对象
   *  - event_type: onClick
   *  - event: onClick
   *  - _event: click
   *  - element_desc:
   *  - nodeName:
   *  - xpatch
   *  - offsetX
   *  - offsetY
   *  - pageX
   *  - pageY
   *  - left
   *  - top
   *  - width
   *  - height
   *
   * 2. 通过 buildLogData 合并构建最终参数
   *
   * 3。 返回
   * */
  _getLogData = (e, assignData = {}) => {
    let eventData = {}
    const { targetElement, event } = getEvent(e)
    // 获取 nodeName 并且转为小写 'DIV' => 'div' 'LI'=>'li' ...
    const nodeName =
      (targetElement.nodeName && targetElement.nodeName.toLocaleLowerCase()) ||
      ''
    if ((nodeName + '').trim().toLowerCase() === 'video') {
      console.log('click Video')
      eventData = {}
    } else {
      const text = targetElement.innerText || targetElement.value
      const xpath = encodeURI(getXPath(targetElement)) || ''
      const rect = getBoundingClientRect(targetElement)
      const pageX = event.pageX || event.clientX + scrollX
      const pageY = event.pageY || event.clientY + scrollY
      const t = sliceText(text)

      eventData = {
        // event type
        event_type: 'onClick',
        // event desc
        event: 'onClick',

        _event: 'click',
        _click: t === '打电话' ? 'phone' : t === '加微信' ? 'wx' : '',

        element_desc: t,
        nodeName,
        xpath,
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
        pageX,
        pageY,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      }
    }
    const logData = this._buildLogData({
      ...eventData,
      ...assignData
    })
    return logData
  }
  // iframe嵌入时，是否开启热力图，圈选模式
  _addMessageListener = () => {
    eventUtil.on(win, 'message', (event) => {
      if (event.data && event.data.mode && event.data.status) {
        try {
          const data = JSON.parse(event.data)
          const { mode, status } = data
          if (mode === MODE.CIRCLE_SELECT) {
            if (status === 'on') {
              this.mode = mode
              this._autoHoverCollection()
              this._appendStyle()
              this._removeHeatmapCanvas()
            } else if (status === 'off') {
              this.mode = ''
              this._autoHoverCollectionOff()
              this._removeStyle()
            }
          } else if (mode === MODE.HEATMAP) {
            if (status === 'on') {
              this.mode = mode
              this._autoHoverCollection()
              this._appendStyle()
              this._fetchHeatmap().then((res) => {
                this._drawHeatmap(res.data.data)
              })
            } else if (status === 'off') {
              this.mode = ''
              this._autoHoverCollectionOff()
              this._removeStyle()
              this._removeHeatmapCanvas()
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  _appendStyle = () => {
    const Style = document.getElementById(STYLE_ID)
    if (!Style) {
      const cssText = CssText
      appendStyle(cssText)
    }
  }

  _removeStyle = () => {
    const Style = document.getElementById(STYLE_ID)
    Style && Style.remove()
  }

  _removeHeatmapCanvas = () => {
    const heatmapCanvasList = document.getElementsByClassName(HEATMAP_CANVAS)
    for (let i = 0, len = heatmapCanvasList.length; i < len; i++) {
      heatmapCanvasList[i].remove()
    }
  }

  _fetchHeatmap = () => {
    const { heatmapUrl } = this.option
    return axios({
      method: 'post',
      url: heatmapUrl,
      data: {
        pageUrl: loc.href
      },
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
  }

  _drawHeatmap = (data) => {
    data = data.data
    this._removeHeatmapCanvas()
    const heatmap = new Heatmap(data)
    heatmap.draw()
  }

  _selectElement = (event, targetElement) => {
    const elems = doc.getElementsByClassName(CLICK_SELECT)
    for (let i = 0, len = elems.length; i < len; i++) {
      elems[i].classList.remove(CLICK_SELECT)
    }
    eventUtil.stopDefault(event)
    targetElement.classList.add(CLICK_SELECT)
  }

  _postMessage = (logData) => {
    const { postMsgOpts } = this.option
    postMsgOpts.forEach((opt) => {
      const { targetWindow, targetOrigin } = opt
      targetWindow.postMessage(
        { logData: JSON.stringify(logData) },
        targetOrigin
      )
    })
  }

  _autoHoverCollection = () => {
    eventUtil.on(doc.body, 'mouseenter', this._autoHoverHandle)
  }

  _autoHoverCollectionOff = () => {
    eventUtil.off(doc.body, 'mouseenter', this._autoHoverHandle)
  }

  _autoHoverHandle = (e) => {
    try {
      const { event, targetElement } = getEvent(e)
      const assignData = {
        et: 'mouseenter',
        ed: 'auto_hover'
      }
      const logData = this._getLogData(e, assignData)
      if (this.mode === MODE.CIRCLE_SELECT || this.mode === MODE.HEATMAP) {
        this._selectElement(event, targetElement)
        this._postMessage(logData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  _buildLogData = (eventData) => {
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
      // cuur_page: loc.href.split('#')[1],
      cuurr_page_title: window.document.title,
      // refer_page: ref,
      time: new Date().getTime(),
      ...eventData
    }
  }

  _onLoad = (url) => {
    const logData = this._buildLogData({
      event_type: 'onload',
      refer_page: ref,
      origin_page: ref,
      origin_page_loca: browser.isWx ? '1' : '2'
    })
    this._log(logData)
  }

  // 音视频埋点
  _onMedia = (data) => {
    const logData = this._buildLogData({
      event: data.event || '',
      media_id: data.media_id || '',
      media_title: data.media_title || '',
      media_time: data.media_time || '',
      covered_time: data.covered_time || '',
      speed: data.speed || '',
      drag_time: data.drag_time || '',
      drag_to_time: data.drag_to_time || '',
      stop_time: data.stop_time || '',
      start_time: data.start_time || '',
      pause_time: data.pause_time || ''
    })
    this._log(logData)
  }

  // 发送埋点事件
  _log = (data) => {
    const { debug, logUrl } = this.option

    if (debug) {
      console.log(data)
    }
    logUrl &&
      axios({
        method: 'get',
        url: logUrl,
        params: data,
        headers: {
          token: sessionStorage.getItem('token')
        }
      })
  }
  /**
   * 根据用户行为，设置 params
   * case '_click': 点击
   * case '_track': 埋点
   * case '_jump': 跳转
   * */
  _push = (data) => {
    if (data[0] === 'onMedia') {
      this._onMedia(data[1])
    } else {
      this._log(this._getParames(data))
    }
  }

  _setParames = (data) => {
    const params = {}
    if (data.length) {
      const _data = {
        random: Math.random(),
        ...getQueryObject(window.location.href),
        ...getQueryObject(window.location.search)
      }
      params.msg = data[1].msg || ''
      params._event = data[0].substr(1)
      params._click = data[1].type || ''
      const url =
        window.location.href.split('#')[1].split('?')[0] + '?' + param(_data)
      switch (data[0]) {
        case '_trackEvent':
        case '_click':
          params._desc = '点击行为'
          params._refer = url
          break
        case '_track':
          params._desc = '埋点行为'
          params._refer = url
          break
        case '_jump':
          params._desc = '跳转行为'
          params._jump = url
          params._refer = data[1].refer
            ? data[1].refer + '?' + param(_data)
            : ''
          break
        default:
          break
      }
    }
    return params
  }

  _getParames = (data) => {
    return this._setParames(data)
  }

  _onJump = (data) => {
    console.log(data)
    const { newV, oldV } = data
    console.log(newV, oldV)
    const _data = {
      random: Math.random(),
      ...getQueryObject(window.location.href),
      ...getQueryObject(window.location.search)
    }
    const logData = this._buildLogData({
      _event: 'jump',
      _jump:
        window.location.href.split('#')[1].split('?')[0] + '?' + param(_data),
      _refer:
        newV === oldV
          ? ''
          : oldV.split('#')[1].split('?')[0] + '?' + param(_data)
    })
    this._log(logData)
    clearInterval(this.timer)
    this.timer = null
    this.timer = setInterval(() => {
      this._timer()
    }, 10000)
  }

  _timer = () => {
    const logData = this._buildLogData({
      _click: 'time',
      time: new Date().getTime()
    })
    this._log(logData)
  }

  event = () => {
    const that = this
    // 监听页面刷新
    window.addEventListener('onbeforeunload', () => {
      that._push(['_track', { type: 'close', msg: '关闭页面' }])
      that._onLoad()
    })

    const _wt = (type) => {
      const orig = history[type]
      return function () {
        const e = new Event(type)
        e.arguments = arguments
        window.dispatchEvent(e)
        // 注意事件监听在url变更方法调用之前 也就是在事件监听的回调函数中获取的页面链接为跳转前的链接
        const r = orig.apply(this, arguments)
        return r
      }
    }

    // 监听页面跳转埋点
    window.onhashchange = (e) => {
      console.log('onhashchange=>', e)
      that._onJump({
        newV: e.newURL,
        oldV: e.oldURL
      })
    }
    history.pushState = _wt('pushState')
    history.replaceState = _wt('replaceState')
    window.addEventListener('pushState', (e) => {
      const path = e && e.arguments.length > 2 && e.arguments[2]
      const url = /^http/.test(path)
        ? path
        : location.protocol + '//' + location.host + path
      console.log('pushState')
      that._onJump({
        newV: url,
        oldV: location.href
      })
    })
    window.addEventListener('replaceState', (e) => {
      const path = e && e.arguments.length > 2 && e.arguments[2]
      const url = /^http/.test(path)
        ? path
        : location.protocol + '//' + location.host + path
      that._onJump({
        newV: url,
        oldV: location.href
      })
      console.log('replaceState')
    })
  }
}

export default AutoLogger
