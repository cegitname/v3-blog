import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="p-4 mb-4 rounded text-bg-dark red">
          <div class="col-md-6 px-0">
            <h1 class="display-4 fst-italic">
              Title of a longer featured blog post
            </h1>
            <p class="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents.
            </p>
            <p class="lead mb-0">
              <a href="#" class="text-white fw-bold">
                Continue reading...
              </a>
            </p>
          </div>
        </div>
      )
    }
  }
})
