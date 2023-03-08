<template>
  <div>
    <h2>{{ title }}</h2>
    <a-space direction="vertical">
      <div style="margin-top: 18px" v-for="item in code" :key="item.title">
        <h4 v-if="item.title">{{ item.title }}</h4>
        <div v-if="item.content">{{ item.content }}</div>
        <preCode v-if="item.code" :code="item.code"></preCode>
        <ul v-if="item.list" class="list-group list-group-flush">
          <li
            v-for="(subitem, subIndex) in item.list"
            :key="subIndex"
            class="list-group-item"
          >
            <span v-if="typeof subitem === 'string'">{{ subitem }}</span>
            <div v-else-if="typeof subitem === 'object'">
              <h5 v-if="subitem.title">{{ subitem.title }}</h5>
              <div v-if="subitem.content">{{ subitem.content }}</div>
              <preCode v-if="subitem.code" :code="subitem.code" />
            </div>
          </li>
        </ul>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCode } from './codes'
import { useRoute } from 'vue-router'
import { Space } from 'ant-design-vue'

export default defineComponent({
  name: 'detail',
  components: { [Space.name]: Space },
  setup() {
    const route = useRoute()
    const res = useCode(route)
    return {
      code: res,
      title: route.query.title
    }
  }
})
</script>
