<template>
  <h4 class="mb-3" style="font-weight: bold">{{ loginTitle }}</h4>
  <a-form
    class="loginForm"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <a-form-item name="account">
      <a-input
        size="large"
        v-model:value="formData.account"
        placeholder="账号"
      />
    </a-form-item>
    <a-form-item name="password">
      <a-input-password
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </a-form-item>

    <a-row>
      <a-col :span="12">
        <a-form-item>
          <a-checkbox v-model:checked="rememberMe" size="small"
            >记住我</a-checkbox
          >
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :style="{ 'text-align': 'right' }">
          <a-button type="link" size="small" @click="setLoginState"
            >忘记密码？</a-button
          >
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item>
      <a-button type="primary" size="large" block>登录</a-button>
    </a-form-item>

    <a-row>
      <a-col :span="8">
        <a-button block> 手机登录 </a-button>
      </a-col>
      <a-col :span="8" style="margin: 0 10px">
        <a-button block> 二维码登录 </a-button>
      </a-col>
      <a-col :span="6">
        <a-button block> 注册 </a-button>
      </a-col>
    </a-row>

    <a-divider style="font-size: 12px; color: rgba(0, 0, 0, 0.45)"
      >其他登录方式</a-divider
    >

    <div class="d-flex justify-content-evenly">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useFormValid } from './userLogin'
import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider
} from 'ant-design-vue'
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue'
import { useFormRules, LoginStateEnum } from './userLogin'
export default defineComponent({
  name: 'vbenLogin',
  components: {
    [Checkbox.name]: Checkbox,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Divider.name]: Divider,
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled
  },
  setup() {
    async function handleLogin() {
      console.log('handleLogin')
    }
    const formData = reactive({
      account: 'vben',
      password: '123456'
    })
    const rememberMe = ref(false)
    const { getFormRules } = useFormRules()
    const setLoginState = () => {
      console.log('setLoginState')
    }
    return {
      loginTitle: '登录',
      formData,
      getFormRules,
      handleLogin,
      rememberMe,
      LoginStateEnum,
      setLoginState
    }
  }
})
</script>
<style lang="less" scoped>
.loginForm {
  width: 368px;
}
</style>
