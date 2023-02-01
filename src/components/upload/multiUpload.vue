<template>
  <div class="clearfix">
    <a-upload
      name="file"
      v-model:file-list="fileList"
      :multiple="true"
      :customRequest="
        (currentFile) => {
          uploadFn(currentFile)
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
import { Upload, UploadFile, UploadProps } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { fileStackItem, uploadStatus, useS3upload } from './upload'

interface fileType {
  file: UploadFile
}
export default defineComponent({
  components: {
    [Upload.name]: Upload,
    PlusOutlined
  },
  setup() {
    const hasFile = (list: any[], target: any, key: string): boolean => {
      return list.some((item) => item[key] === target[key])
    }

    const uploadStatck = ref<fileStackItem[]>([])

    let fileList = ref<UploadProps['fileList']>([])

    async function uploadFn(currentFile: fileType) {
      if (fileList.value!.length > 8) {
        return
      }
      if (!hasFile(uploadStatck.value, currentFile, 'uid')) {
        uploadStatck.value.push({
          uid: currentFile.file.uid,
          url: '',
          percent: 0,
          name: currentFile.file.name,
          status: uploadStatus.Preload,
          type: currentFile.file.type,
          run: createUploadFn(currentFile)
        })
      }
      if (uploadStatck.value.length === fileList.value?.length) {
        uploadStatck.value.forEach((item) => {
          item.status !== uploadStatus.Done && item.run(item)
        })
      }
    }

    const createUploadFn = (file: fileType) => {
      return async (item: fileStackItem) => {
        const pres = await useS3upload(file.file)
        pres?.s3.on('httpUploadProgress', (e: any) => {
          console.log(e, 'eeee')
        })
        await pres?.s3.done()
        uploadStatck.value.forEach((element: fileStackItem) => {
          if (element.uid === item.uid) {
            element.status = uploadStatus.Done
          }
        })
        fileList.value?.forEach((fitem) => {
          if (fitem.uid === item.uid) {
            fitem.url = pres?.url
            fitem.status = 'done'
          }
        })
      }
    }
    return {
      fileList,
      uploadFn
    }
  }
})
</script>
