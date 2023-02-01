import { defineComponent } from 'vue'
import { Divider } from 'ant-design-vue'
export default defineComponent({
  name: 'down load a link',
  components: {
    [Divider.name]: Divider
  },
  setup() {
    const code = `handleDownload (link) {
  const fileName = '下载资源名称'
  const x = new XMLHttpRequest()
  x.open('GET', link, true)
  x.responseType = 'blob'
  x.onload = (e) => {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}`
    return () => {
      return (
        <div>
          <a-divider>
            <h5>Download a link</h5>
          </a-divider>
          <preCode code={code} />
        </div>
      )
    }
  }
})
