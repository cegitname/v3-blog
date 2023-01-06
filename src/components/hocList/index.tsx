import { defineComponent, PropType } from 'vue'
import homeStyle from './index.module.less'
import { useRouter } from 'vue-router'
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
  setup(props, { slots }) {
    const router = useRouter()
    const handleClick = (e: any, targetView: viewItem) => {
      console.log(targetView.path)
      e.preventDefault()
      router.push({ path: '/doc' })
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
                <div class="card shadow-sm">
                  <div class={homeStyle.cardTop}>{item.name}</div>
                  <div class="card-body">
                    <p class="card-text">{item.desc}</p>
                    <a
                      href="#"
                      class="btn btn-primary"
                      onClick={(e) => handleClick(e, item)}
                    >
                      Go
                    </a>
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
