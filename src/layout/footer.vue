<template>
  <footer class="blog-footer fixed-bottom sticky-bottom">
    <p>
      Blog template built for
      <a href="https://getbootstrap.com/">Bootstrap</a> by
      <a href="https://twitter.com/mdo">@mdo</a>.
    </p>
    <p>
      <a href="#">Back to top</a>
    </p>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
/*
 * Footer
 */
.blog-footer {
  padding: 2.5rem 0;
  color: #727272;
  text-align: center;
  background-color: #f9f9f9;
  border-top: 0.05rem solid #e5e5e5;
}
.blog-footer p:last-child {
  margin-bottom: 0;
}
</style>
