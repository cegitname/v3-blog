<template>
  <m-header />
  <div class="container-xxl">
    <m-aside v-if="!ifAside" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mHeader from '@/layout/mHeader.vue'
import mAside from '@/layout/mAside.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { mHeader, mAside },
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
