<template>
  <div style="display: flex">
    <div id="vueCropper" style="height: 226px; width: 362px">
      <VueCropper
        :key="option.name"
        ref="cropperRef"
        :img="url"
        :full="true"
        :canMove="false"
        :autoCrop="true"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="true"
        :infoTrue="true"
        outputType="jpeg || png || jpg"
        @cropMoving="cropMoving"
      ></VueCropper>
    </div>
    <div class="ratiosWrpper">
      <div class="mt-2 d-flex flex-wrap justify-content-between">
        <a-button
          @click="handleRatio(item.name)"
          v-for="item in ratios"
          :key="item.name"
          class="ratioItem"
          >{{ item.name }}</a-button
        >
      </div>
    </div>
  </div>
  <a-button @click="handlerOk" type="primary" class="my-2">确定</a-button>
  <div class="preview" v-if="previewUrl">
    <img :src="previewUrl" alt="" />
  </div>

  <a-button type="link" class="my-2">
    GIT: github https://github.com/xyxiao001/vue-cropper/blob/master/README.md
  </a-button>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, reactive } from 'vue'
import { Modal, Button } from 'ant-design-vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { ratios, ratioItem } from './types'

export default defineComponent({
  components: {
    VueCropper,
    [Modal.name]: Modal,
    [Button.name]: Button
  },
  props: {
    isShowPoster: {
      type: Boolean,
      default: true
    },
    tailorUrl: {
      type: String,
      default: ''
    }
  },
  setup() {
    let previewUrl = ref('')
    let url = ref(
      'https://cgtn-arabic-material.s3.cn-north-1.amazonaws.com.cn/local/2023/01/29/image/1674974304584.jpg'
    )
    let option: ratioItem = reactive({
      fixedNumber: [1, 1],
      name: '1:1',
      check: true,
      fixed: true
    })
    const cropperRef: Ref<HTMLElement | null> = ref(null)
    const activeKey = ref('1:1')
    const handlerOk = () => {
      getData()
    }
    const handleRatio = (itemName: string) => {
      activeKey.value === itemName
      const { name, fixedNumber } = ratios.find(
        (item) => item.name === itemName
      ) as ratioItem
      option.name = name
      option.fixedNumber = fixedNumber
      option.fixed = itemName !== '自定义'
    }
    function cropMoving() {
      getData()
    }
    const getData = () => {
      ;(cropperRef.value as any).getCropData((data: any) => {
        previewUrl.value = data
      })
    }
    return {
      url,
      option,
      ratios,
      cropperRef,
      handleRatio,
      handlerOk,
      previewUrl,
      cropMoving
    }
  }
})
</script>
<style lang="less" scoped>
.ratiosWrpper {
  flex: 1;
  margin-left: 20px;
  .ratioItem {
    width: 45%;
    margin-bottom: 10px;
  }
}
/deep/.vue-cropper {
  background-image: none;
}
.preview {
  width: 100%;
  height: 200px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
