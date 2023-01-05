<template>
  <div class="container-xxl pb-4">
    <m-header />
    <m-main></m-main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mHeader from '@/layout/mHeader.vue'
import mMain from '@/layout/mMain.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { mHeader, mMain },
  setup() {
    const routeRef = useRoute()
    const ifAside = computed(() => {
      return false
    })
    return { ifAside }
  }
})
</script>

<style lang="less"></style>
