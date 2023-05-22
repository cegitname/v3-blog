import getPlatform from '../../utils/getPlatform'

const platform = getPlatform()

export default {
  // 是否自动收集点击事件
  autoClick: true,
  debug: false,
  logUrl: '',
  heatmapUrl: '',
  sdk: {
    app_version: '',
    log_version: '',
    // 业务线
    business_line: ''
  },
  // 平台参数
  platform,
  postMsgOpts: []
}
