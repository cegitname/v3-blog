<template>
  <a-collapse>
    <a-collapse-panel
      v-for="item in codes"
      :key="item.key"
      :header="item.header"
      :style="customStyle"
    >
      <slot :code="item.code"> </slot>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Collapse } from 'ant-design-vue'
interface ItemCode {
  key: string
  header: string
  code: string
}
export default defineComponent({
  name: 'collapseCode',
  props: {
    codes: {
      type: Array as PropType<ItemCode[]>,
      default: () => []
    }
  },
  components: {
    [Collapse.name]: Collapse,
    ACollapsePanel: Collapse.Panel
  },
  setup(props) {
    const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
    return { customStyle }
  }
})
</script>
