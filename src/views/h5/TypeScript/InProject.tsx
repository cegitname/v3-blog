import { defineComponent } from 'vue'
import articleList from '@/components/hocList/articlelist'
import { data } from './data'
export default defineComponent({
  components: { articleList },
  setup() {
    return () => {
      return (
        <div>
          <article-list data={data}></article-list>
        </div>
      )
    }
  }
})
