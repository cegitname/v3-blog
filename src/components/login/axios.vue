<template>
  <h4 class="mb-4">
    <a href="https://github.com/vbenjs/vue-vben-admin">vben</a> 的axios
  </h4>
  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="应用" :style="customStyle">
      <p class="text-info bg-dark"># 使用defHttp方法定义具体api</p>
      <preCode :code="useDataCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="defHttp" :style="customStyle">
      <p class="text-info bg-dark">#创建、 抛出defHttp方法</p>
      <preCode :code="ContentTypeData"></preCode>
      <preCode :code="createAxiosCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="定义Axios类" :style="customStyle">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createAxiosCode, ContentTypeData, useDataCode } from './data'
import { Collapse } from 'ant-design-vue'
import { CaretRightOutlined } from '@ant-design/icons-vue'
import preCode from '@/components/preCode'
export default defineComponent({
  components: {
    preCode,
    [Collapse.name]: Collapse,
    [Collapse.Panel.name]: Collapse.Panel,
    CaretRightOutlined
  },
  name: 'vbenaxios',
  setup() {
    const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
    const activeKey = ref(['1'])
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
    return {
      createAxiosCode,
      ContentTypeData,
      activeKey,
      text,
      customStyle,
      useDataCode
    }
  }
})
</script>
