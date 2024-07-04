<template>
  <div class="container-xxl pb-4" @click="handleClick">
    <m-header ref="header" />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import mHeader from '@/layout/mHeader.vue'
import { curry } from 'lodash'

// text
export default defineComponent({
  name: 'App',
  components: { mHeader },
  setup() {
    const header = ref()
    function abc(a: number, b: number, c: number) {
      return [a, b, c]
    }
    const curryAdd = curry(abc)
    console.log(curryAdd(1)(2, 2), 'curryAdd(1)')
    const ifAside = computed(() => {
      return false
    })

    const handleClick = () => {
      const allNodes = document.getElementsByTagName('*')
      console.log(allNodes, 'allNodes')
    }
    return { ifAside, header, handleClick }
  }
})
</script>

<style lang="less">
/deep/.ant-layout {
  background: #ffffff;
}
</style>
