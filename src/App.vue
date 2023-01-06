<template>
  <div class="container-xxl pb-4">
    <m-header />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mHeader from '@/layout/mHeader.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { mHeader },
  setup() {
    const routeRef = useRoute()
    console.log(routeRef, 'route')
    const ifAside = computed(() => {
      return false
    })
    return { ifAside }
  }
})
</script>

<style lang="less"></style>
