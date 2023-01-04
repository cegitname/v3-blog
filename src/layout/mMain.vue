<template>
  <main class="container">
    <m-banner></m-banner>
    <router-view></router-view>
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import mBanner from './banner.vue'
export default defineComponent({
  name: 'mAside',
  components: { mBanner },
  setup() {
    const router = useRouter()
    const navTo = () => {
      router.push({
        path: '/read'
      })
    }
    return {
      navTo
    }
  }
})
</script>
