<template>
  <header
    style="background-color: #ffffff"
    class="blog-header lh-1 py-3 border-bottom sticky-top mb-4"
  >
    <div class="row flex-nowrap justify-content-between align-items-center">
      <div class="col-4 pt-1"></div>
      <div class="col-4 text-center">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-4">This is a Simple header</span>
        </a>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <a class="link-secondary" href="#" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="mx-3"
            role="img"
            viewBox="0 0 24 24"
          >
            <title>Search</title>
            <circle cx="10.5" cy="10.5" r="7.5" />
            <path d="M21 21l-5.2-5.2" />
          </svg>
        </a>
        <a class="btn btn-sm btn-outline-secondary" href="#">Sign up</a>
      </div>
    </div>
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
