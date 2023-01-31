<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      :multiple="true"
      :customRequest="
        (currentFile) => {
          uploadFiles(currentFile)
        }
      "
      list-type="picture-card"
    >
      <div v-if="fileList.length < 8">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Upload } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { uploadFiles, fileList } from './upload'
export default defineComponent({
  components: {
    [Upload.name]: Upload,
    PlusOutlined
  },
  setup() {
    return {
      fileList,
      uploadFiles
    }
  }
})
</script>
