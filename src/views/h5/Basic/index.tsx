import { defineComponent } from 'vue'
import articleList from '@/components/hocList/articlelist'
import { data } from './data'
export default defineComponent({
  components: { articleList },
  setup() {
    return () => {
      return (
        <div>
          1234
          <article-list data={data}></article-list>
        </div>
      )
    }
  }
})
