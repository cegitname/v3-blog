<template>
  <div>
    <a-divider><h5>aws upload</h5></a-divider>
    <a-upload
      :show-upload-list="false"
      name="file"
      :customRequest="(file) => uploadFile(file)"
    >
      <div v-if="doneUrl">
        上传成功
        <p>
          URL:
          <a-button class="finishView text-truncate" type="link">{{
            doneUrl
          }}</a-button>
        </p>
        <img v-if="doneUrl" :src="doneUrl" class="doneImag" alt="" />
      </div>
      <a-button v-else class="uploadBtn">
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>

    <a-divider><h5>code</h5></a-divider>
    <CodeCollapse :codes="codes">
      <template v-slot="{ code }">
        <preCode :code="code" />
      </template>
    </CodeCollapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { Upload, Button, Row, Col, Divider } from 'ant-design-vue'
import { useS3upload } from './upload'
import { collapseCode } from './dataCode'
import CodeCollapse from '@/components/collapseCode.vue'
export default defineComponent({
  components: {
    [Divider.name]: Divider,
    [Col.name]: Col,
    [Row.name]: Row,
    [Upload.name]: Upload,
    [Button.name]: Button,
    UploadOutlined,
    CodeCollapse
  },
  setup() {
    const doneUrl = ref()
    const percent = ref(0)
    const tailorVisible = ref(false)
    /**
     * 上传
     * */
    const uploadFile = async (file: any) => {
      const pres: any = await useS3upload(file.file)
      if (!pres.s3) return
      console.log(pres.s3, 'pres.s3')
      doneUrl.value = pres.url
      tailorVisible.value = !!doneUrl.value
      pres.s3.on('httpUploadProgress', async (e: any) => {
        percent.value = (parseInt(e.loaded, 10) / parseInt(e.total, 10)) * 100
        percent.value = parseInt(percent.value.toFixed(2))
        console.log('1111111111')
      })
      await pres.s3.done()
    }
    const cutOk = (data: any) => {
      doneUrl.value = data
    }
    return {
      doneUrl,
      uploadFile,
      codes: collapseCode,
      percent,
      cutOk
    }
  }
})
</script>
<style lang="less" scoped>
.uploadBtn {
  margin: 16px 0;
}
.finishView {
  max-width: 500px;
  overflow: hidden;
}
.doneImag {
  width: 300px;
  height: 250px;
  margin-left: calc(50% - 150px);
}
</style>
