<template>
  <div>
    <h4>{{ title }}</h4>
    <div style="margin-top: 18px" v-for="item in code" :key="item.title">
      <h5>{{ item.title }}</h5>
      <preCode :code="item.code"></preCode>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCode } from './data'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'detail',
  setup() {
    const route = useRoute()
    const res = useCode(route)
    console.log(res, 'resss')
    return {
      code: res,
      title: route.query.title
    }
  }
})
</script>
