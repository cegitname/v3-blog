<template>
  <div class="container-xxl pb-4">
    <m-header />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mHeader from '@/layout/mHeader.vue'

export default defineComponent({
  name: 'App',
  components: { mHeader },
  setup() {
    const ifAside = computed(() => {
      return false
    })
    return { ifAside }
  }
})
</script>

<style lang="less">
/deep/.ant-layout {
  background: #ffffff;
}
</style>
