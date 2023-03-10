import { defineComponent, PropType } from 'vue'
import { List, Avatar } from 'ant-design-vue'
import style from './article.module.less'
interface DataItem {
  title: string
  icon?: string
  desc?: string
}
export default defineComponent({
  name: 'articleList',
  components: {
    [Avatar.name]: Avatar,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [List.Item.Meta.name]: List.Item.Meta
  },
  emits: ['handleArticle'],
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const handleArticle = (item: DataItem) => {
      emit('handleArticle', item)
    }
    return () => {
      const data = props.data
      return (
        <a-list item-layout="horizontal" data-source={data}>
          {{
            renderItem: ({ item }: { item: DataItem }) => (
              <a-list-item>
                <a-list-item-meta description={item.desc}>
                  {{
                    title: () => (
                      <h5
                        onClick={() => handleArticle(item)}
                        class={style.title}
                      >
                        {item.title}
                      </h5>
                    ),
                    avatar: () => (
                      <a-avatar src={require('@/assets/vbenlogo.png')} />
                    )
                  }}
                </a-list-item-meta>
              </a-list-item>
            )
          }}
        </a-list>
      )
    }
  }
})
