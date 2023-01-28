<template>
  <a-collapse v-model:activeKey="activeKey" style="border: none">
    <a-collapse-panel
      v-for="item in codes"
      :key="item.key"
      :header="item.header"
      :style="customStyle"
    >
      <slot :code="item.code" :key="item.key"> </slot>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
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
    console.log(props, 'ppppp')
    const activeKey = ref(['1'])
    const customStyle =
      'background: #ffffff;border-radius: 4px;margin-bottom: 24px;border: none;overflow: hidden'
    return { customStyle, activeKey }
  }
})
</script>
