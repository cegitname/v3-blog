import { defineComponent } from 'vue'
export default defineComponent({
  name: 'vueDocument',
  setup() {
    return () => {
      return <div>this is content</div>
    }
  }
})
