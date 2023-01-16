<template>
  <h4 class="mb-4">
    <a href="https://github.com/vbenjs/vue-vben-admin">vben</a> 的axios
  </h4>
  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel
      key="1"
      header="应用 defHttp.post<LoginResultModel>(...)"
      :style="customStyle"
    >
      <p class="text-info bg-dark"># 使用defHttp方法定义具体api</p>
      <preCode :code="useDataCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel
      key="2"
      header="定义Axios类 export const defHttp = new VAxios(...)"
      :style="customStyle"
    >
      <p class="text-info bg-dark">主要逻辑</p>
      <preCode :code="mainAxiosCode"></preCode>
      <p class="text-info bg-dark">完整代码</p>
      <preCode :code="AxiosClassCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel
      key="3"
      header="忽略重复请求 AxiosCanceler"
      :style="customStyle"
    >
      <div class="text-info bg-dark">
        <p>1. addPending,removeAllPending,removePending,reset</p>
        <p>
          2. 创建map对象pendingMap 用于储存请求,
          给对应的请求添加cancel即axios.CancelToke的回调方法
        </p>
        <p>3. 每次新的请求都调用addPending,addPending调用removePending</p>
        <p>appending判断判断是否重复请求，重复就调用对应对象的cancel方法</p>
        <p>pendingmap delete 已cancel的url</p>
        <p>
          4. 正常请求结束后调用addPending调用removePending,
          在map对象中移除对应的请求
        </p>
      </div>
      <preCode :code="cancelerCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="4" header="tansform" :style="customStyle">
      <preCode :code="transformCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="5" header="定义公用request" :style="customStyle">
      <preCode :code="requestCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="6" header="post / get / put..." :style="customStyle">
      <preCode :code="methodReuqestCode"></preCode>
    </a-collapse-panel>
    <a-collapse-panel key="7" header="defHttp" :style="customStyle">
      <p class="text-info bg-dark">#创建、 抛出defHttp方法</p>
      <preCode :code="ContentTypeData"></preCode>
      <preCode :code="createAxiosCode"></preCode>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  createAxiosCode,
  ContentTypeData,
  useDataCode,
  AxiosClassCode,
  mainAxiosCode,
  cancelerCode,
  transformCode,
  requestCode,
  methodReuqestCode
} from './data'
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
    const activeKey = ref([])
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
    return {
      createAxiosCode,
      ContentTypeData,
      activeKey,
      text,
      customStyle,
      useDataCode,
      mainAxiosCode,
      AxiosClassCode,
      cancelerCode,
      transformCode,
      requestCode,
      methodReuqestCode
    }
  }
})
</script>
