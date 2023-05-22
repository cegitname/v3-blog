<template>
  <div class="pb-4">
    <div class="container">
      <div class="row g-3">
        <hoc-list :list="list"></hoc-list>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import hocList from '@/components/hocList'
export default defineComponent({
  name: 'H5',
  components: { hocList },
  setup() {
    const list = [
      {
        name: 'Components',
        path: '/components/login',
        desc: 'Implement component functions'
      },
      {
        name: 'Utils',
        path: '/utils/axios',
        desc: 'Tool class implementation'
      },
      {
        name: 'Basic',
        path: '/basic/javascript',
        desc: 'Basic'
      }
    ]
    return {
      list
    }
  }
})
</script>
