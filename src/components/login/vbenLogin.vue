<template>
  <a-row>
    <a-col :span="10">
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
            autocomplete="on"
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
          <a-button
            :loading="loading"
            type="primary"
            size="large"
            block
            @click="handleLogin"
            >登录</a-button
          >
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

        <div class="d-flex justify-content-evenly vben-login-sign-in-way">
          <GithubFilled />
          <WechatFilled />
          <AlipayCircleFilled />
          <GoogleCircleFilled />
          <TwitterCircleFilled />
        </div>
      </a-form>
    </a-col>
    <a-col :span="14"> <loginProcess /> </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useFormValid } from './userLogin'
import loginProcess from './lgoinProcess.vue'
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
import { login } from '@/api/login'
interface loginResData {
  account: string
  password: string
}
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
    TwitterCircleFilled,
    loginProcess
  },
  setup() {
    const loading = ref(false)
    const formRef = ref()
    const { validForm } = useFormValid(formRef)
    async function handleLogin() {
      const data = await validForm()
      console.log(data, 'data after handle login')
      if (!data) return
      loading.value = true
      try {
        const res = await login({
          username: (data as loginResData).account,
          password: (data as loginResData).password
        })
        console.log(res, 'ressss')
        // login api.....
      } catch (error) {
        // createErrorModal...
      } finally {
        loading.value = false
      }
    }
    const formData = reactive({
      account: '',
      password: ''
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
      setLoginState,
      formRef,
      loading
    }
  }
})
</script>
<style lang="less" scoped>
.loginForm {
  width: 368px;
}
.vben-login-sign-in-way .anticon {
  font-size: 22px;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #0960bd;
  }
}
</style>
