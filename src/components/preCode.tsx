import { defineComponent } from 'vue'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
export default defineComponent({
  name: 'preCode',
  components: { highlightjs: hljsVuePlugin.component },
  props: {
    code: String
  },
  setup(props) {
    return () => {
      const code = props.code
      return (
        <div class="mt-2 mb-2">
          <highlightjs language="js" code={code} />
        </div>
      )
    }
  }
})
