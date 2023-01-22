<template>
  <CodeCollapse :codes="codes">
    <template v-slot="{ code }">
      <preCode :code="code" />
    </template>
  </CodeCollapse>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CodeCollapse from '@/components/collapseCode.vue'
import { collapseCode } from './dataCode'
export default defineComponent({
  components: {
    CodeCollapse
  },
  setup() {
    return { codes: collapseCode }
  }
})
</script>
<style lang="less" scoped></style>
