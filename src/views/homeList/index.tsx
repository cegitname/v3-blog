import { defineComponent } from 'vue'
import banner from './banner'
import hocList from '@/components/hocList'
export default defineComponent({
  components: { banner, hocList },
  setup() {
    const list = [
      {
        id: '1',
        icon: require('@/assets/logo.png'),
        name: 'h5list',
        path: '/h5list',
        desc: 'Some quick example text to build on the card title and make up the bulk of the card content.'
      },
      {
        id: '2',
        icon: require('@/assets/logo.png'),
        name: 'Read',
        path: '/read',
        desc: 'Some quick example text to build on the card title and make up the bulk of the card content.'
      }
    ]
    return () => {
      return (
        <div class="container">
          <banner />
          <div class="row  g-3 bg-light p-4">
            <hoc-list list={list}></hoc-list>
          </div>
        </div>
      )
    }
  }
})
