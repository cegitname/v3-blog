<template>
  <div class="container">
    <a-row>
      <a-col :span="6">
        <a-list item-layout="horizontal" :data-source="data">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.cn">
                <template #title>{{ item.en }} </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
      <a-col :span="6"></a-col>
      <a-col :span="6"></a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { List, Col, Row } from 'ant-design-vue'
interface DataItem {
  en: string
  cn: string
}
const data: DataItem[] = [
  { en: 'underlying dependencies', cn: '基础依赖关系' },
  { en: 'see the following in the', cn: '请参见' },
  { en: 'commonands you need', cn: '你需要的命令' },
  { en: 'a set of', cn: '一套' },
  { en: 'enable you to', cn: '使你能够' },
  { en: 'perform operations', cn: '执行操作' },
  { en: 'browse the available commands', cn: '浏览可用指令' },
  { en: 'access to', cn: '有权使用、访问' }
]
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [List.Item.Meta.name]: List.Item.Meta
  },
  setup() {
    return {
      data
    }
  }
})
</script>
<style lang="less" scoped>
/deep/.ant-list-item {
  padding: 6px 0;
}
</style>
