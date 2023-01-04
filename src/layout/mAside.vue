<template>
  <aside class="bd-sidebar" @click="navTo"></aside>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'mAside',
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
