<template>
  <CodeCollapse :codes="codes">
    <template v-slot="{ code }">
      <preCode :code="code" />
      <p>useFormRules</p>
      <preCode :code="useFormRulesCode" />
      <p>useFormValid</p>
      <preCode :code="useFormValidCode" />
    </template>
  </CodeCollapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import CodeCollapse from '@/components/collapseCode.vue'
import { collapseCode, useFormRulesCode, useFormValidCode } from './dataCode'
export default defineComponent({
  components: {
    CodeCollapse
  },
  setup() {
    return { codes: collapseCode, useFormRulesCode, useFormValidCode }
  }
})
</script>
<style lang="less" scoped></style>
