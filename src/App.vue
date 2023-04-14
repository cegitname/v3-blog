<template>
  <div class="container-xxl pb-4">
    <m-header ref="header" />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import mHeader from '@/layout/mHeader.vue'

export default defineComponent({
  name: 'App',
  components: { mHeader },
  setup() {
    const header = ref()
    console.log(header, 'headerheader')
    const ifAside = computed(() => {
      return false
    })
    return { ifAside, header }
  }
})
</script>

<style lang="less">
/deep/.ant-layout {
  background: #ffffff;
}
</style>
