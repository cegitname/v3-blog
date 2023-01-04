<template>
  <m-header />
  <div class="container-xxl">
    <m-aside v-if="!ifAside" />
    <m-main></m-main>
    <m-footer></m-footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mHeader from '@/layout/mHeader.vue'
import mAside from '@/layout/mAside.vue'
import mFooter from '@/layout/footer.vue'
import mMain from '@/layout/mMain.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { mHeader, mAside, mFooter, mMain },
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
