<template>
  <div class="album bg-light pb-4" style="min-height: calc(100vh - 307px)">
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
        name: 'JavaScript',
        path: '/javascrpt',
        desc: 'https://developer.mozilla.org'
      },
      {
        name: 'TypeScript',
        path: '/ts/inPro',
        desc: 'https://www.typescriptlang.org/'
      },
      {
        name: 'Vue',
        path: '/vue',
        desc: 'https://cn.vuejs.org/'
      },
      {
        name: 'Node',
        path: '/node',
        desc: 'https://nodejs.org/en/'
      },
      {
        name: 'Webpack',
        path: '/webpack',
        desc: 'https://webpack.js.org/'
      },
      {
        name: 'React',
        path: '/react',
        desc: 'https://reactjs.org/'
      },
      {
        name: 'Vite',
        path: '/vite',
        desc: 'https://vitejs.dev/'
      },
      {
        name: 'Others',
        path: '/others',
        desc: 'Any thing'
      }
    ]
    return {
      list
    }
  }
})
</script>
