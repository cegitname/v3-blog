<template>
  <div>
    <h4>{{ title }}</h4>
    <preCode :code="code"></preCode>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { promiseCode } from './data'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'detail',
  setup() {
    const route = useRoute()
    return {
      code: promiseCode,
      title: route.query.title
    }
  }
})
</script>
