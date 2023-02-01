<template>
  <header
    style="background-color: #ffffff"
    class="blog-header lh-1 py-3 border-bottom mb-4"
  >
    <div
      class="row flex-nowrap justify-content-between align-items-center"
    ></div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
interface navItem {
  name: string
  path: string
}

export default defineComponent({
  name: 'mHeader',
  props: {
    msg: String
  },
  setup() {
    const router = useRouter()
    const linkTo = (navItem: navItem): void => {
      router.push({ path: navItem.path })
    }
    const list = [
      { name: 'H5', path: '/h5' },
      { name: 'Read', path: '/read' }
    ]
    return {
      navList: list,
      linkTo
    }
  }
})
</script>
