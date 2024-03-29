import { defineComponent } from 'vue'
import articleList from '@/components/hocList/articlelist'
import { data, listRow } from './codes'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { articleList },
  setup() {
    const router = useRouter()
    const handleItem = (item: listRow) => {
      router.push({
        path: '/basc/detail-typescript',
        query: {
          title: item.title,
          codeKey: item.key
        }
      })
    }
    return () => {
      return (
        <div>
          <article-list
            data={data}
            onHandleArticle={(item: any) => handleItem(item)}
          ></article-list>
        </div>
      )
    }
  }
})
