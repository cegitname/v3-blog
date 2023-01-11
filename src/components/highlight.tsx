import { defineComponent } from 'vue'
import preCode from './preCode'
export default defineComponent({
  components: { preCode },
  setup() {
    const installCode = `yarn add highlight.js  
yarn add @highlightjs/vue-plugin`
    const declareCode = `declare module '@highlightjs/vue-plugin'`
    const useCode = `import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
components: { highlightjs: hljsVuePlugin.component },
setup(props) {
  return () => {
    const code = props.code
    return (
      <div class="mt-2 mb-2">
        <highlightjs language="js" x={5} code={code} />
      </div>
    )
  }
}
`
    return () => {
      return (
        <div>
          <h4>Highlight.js plugin for Vue.js</h4>
          <p>
            git地址:{' '}
            <a href="https://github.com/metachris/vue-highlightjs">
              highlightjs
            </a>
          </p>

          <p>install</p>
          <preCode code={installCode}></preCode>
          <p>在 .d.ts文件中声明module</p>
          <preCode code={declareCode}></preCode>
          <p>使用</p>
          <preCode code={useCode}></preCode>
        </div>
      )
    }
  }
})
