<template>
  <a-modal :visible="visible" title="图片编辑" :width="600" @ok="handlerOk">
    {{ option }}
    <div style="display: flex">
      <div id="vueCropper" style="height: 226px; width: 362px">
        <VueCropper
          :key="url"
          ref="cropperRef"
          :img="url"
          :full="true"
          :canMove="false"
          :autoCrop="true"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="true"
          :infoTrue="true"
          outputType="jpeg || png || jpg"
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
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance } from 'vue'
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
  emits: ['onOk'],
  setup(props, { emit }) {
    const option: ratioItem = ref({
      fixedNumber: [1, 1],
      name: '1:1',
      check: true,
      autoCropWidth: 200,
      autoCropHeight: 200
    })
    const visible = ref(true)
    const cropperRef = ref(null)
    const activeKey = ref('1:1')
    const url = computed(() => {
      return (
        props.tailorUrl ||
        'https://cgtn-arabic-material.s3.cn-north-1.amazonaws.com.cn/local/2023/01/29/image/1674974304584.jpg'
      )
    })
    // const option = computed(() => {
    //   const targetItem = ratios.find((item) => item.name === activeKey.value)
    //   const fixed = targetItem.name !== '自定义'
    //   console.log(targetItem, 'targetItem')
    //   return {
    //     fixed,
    //     fixedNumber: targetItem.fixedNumber,
    //     autoCropWidth: targetItem.autoCropWidth,
    //     autoCropHeight: targetItem.autoCropHeight
    //   }
    // })
    const handlerOk = () => {
      cropperRef.value.getCropData((data) => {
        visible.value = false
        emit('onOk', data)
      })
    }
    const { ctx: _this } = getCurrentInstance()
    const handleRatio = (itemName: string) => {
      activeKey.value === itemName
      _this.$forceUpdate()
    }
    return {
      url,
      option,
      ratios,
      cropperRef,
      handlerOk,
      visible,
      handleRatio
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
</style>
