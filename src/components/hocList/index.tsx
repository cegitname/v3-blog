import { defineComponent, PropType } from 'vue'
import homeStyle from './index.module.less'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Button } from 'ant-design-vue'
interface viewItem {
  name: string
  path: string
  desc: string
  id?: string
  icon?: string
}
export default defineComponent({
  name: 'HocList',
  props: {
    list: {
      type: Array as PropType<viewItem[]>,
      required: true
    }
  },
  components: {
    [Button.name]: Button
  },
  setup(props, { slots }) {
    const store = useStore()
    const router = useRouter()
    const handleClick = (targetView: viewItem) => {
      store.commit('setActiveMenu', targetView.name)
      router.push({ path: targetView.path })
    }
    return () => {
      const list: Array<viewItem> = props.list
      return (
        <>
          {list.map((item) => {
            return slots.default ? (
              slots.default(item)
            ) : (
              <div class="col-3">
                <div class={['card', 'shadow-sm', 'cardsss']}>
                  <div class={homeStyle.cardTop}>{item.name}</div>
                  <div class="card-body">
                    <p class="card-text">{item.desc}</p>
                    <a-button
                      style="padding:0"
                      type="link"
                      onClick={() => handleClick(item)}
                    >
                      more...
                    </a-button>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )
    }
  }
})
