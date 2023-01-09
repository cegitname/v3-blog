<template>
  <div class="container layoutWrap">
    <a-layout style="height: 100%">
      <layout-sider theme="light" class="layoutSection">
        <mMenu />
      </layout-sider>
      <layout-content class="layoutSection">
        <router-view></router-view>
      </layout-content>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { Layout } from 'ant-design-vue'
import { defineComponent } from 'vue'
import mMenu from './mMenu.vue'
export default defineComponent({
  components: {
    [Layout.name]: Layout,
    layoutSider: Layout.Sider,
    layoutContent: Layout.Content,
    mMenu
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.layoutWrap {
  height: calc(100vh - 113px);
  overflow: hidden;
}
.layoutSection {
  height: 100%;
  overflow: auto;
}
</style>
