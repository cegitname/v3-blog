<template>
  <div class="container">
    <header
      class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-4">Simple header</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item" v-for="navItem in navList" :key="navItem.name">
          <a
            href="#"
            @click.prevent="linkTo(navItem)"
            class="nav-link"
            :class="{ active: navItem.name === 'H5' }"
            aria-current="page"
            >{{ navItem.name }}</a
          >
        </li>
      </ul>
    </header>
  </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
