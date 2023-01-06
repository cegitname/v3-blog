<template>
  <section class="text-center container pb-5">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Album example</h1>
        <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
      </div>
    </div>
  </section>
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
        name: 'JavaScript',
        path: '/javascrpt',
        desc: 'https://developer.mozilla.org'
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
        name: 'TypeScript',
        path: '/ts',
        desc: 'https://www.typescriptlang.org/'
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
        name: 'Components',
        path: '/components',
        desc: 'Implement component functions'
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
