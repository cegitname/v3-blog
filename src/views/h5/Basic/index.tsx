import { defineComponent } from 'vue'
import articleList from '@/components/hocList/articlelist'
import { data } from './data'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { articleList },
  setup() {
    const router = useRouter()
    const handleItem = (item: any) => {
      router.push({
        path: '/basc/detail',
        query: {
          title: item.title,
          desc: item.desc
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
