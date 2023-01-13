import { computed, unref, ref } from 'vue'
import type { Ref } from 'vue'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import type { ValidationRule } from 'ant-design-vue/lib/form/Form'
export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE
}
const currentState = ref(LoginStateEnum.LOGIN)
export function useFormValid<T>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}
export function useFormRules(formData?: Recordable) {
  const getAccountFormRule = computed(() => createRule('请输入账号'))
  const getPasswordFormRule = computed(() => createRule('请输入密码'))
  const getSmsFormRule = computed(() => createRule('请输入验证码'))
  const getMobileFormRule = computed(() => createRule('请输入手机号码'))

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject('勾选后才能注册') : Promise.resolve()
  }

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject('请输入密码')
      }
      if (value !== password) {
        return Promise.reject('两次输入密码不一致')
      }
      return Promise.resolve()
    }
  }

  const getFormRules = computed(
    (): { [k: string]: ValidationRule | ValidationRule[] } => {
      const accountFormRule = unref(getAccountFormRule)
      const passwordFormRule = unref(getPasswordFormRule)
      const smsFormRule = unref(getSmsFormRule)
      const mobileFormRule = unref(getMobileFormRule)

      const mobileRule = {
        sms: smsFormRule,
        mobile: mobileFormRule
      }
      let computedRes: any
      switch (unref(currentState)) {
        // register form rules
        case LoginStateEnum.REGISTER:
          computedRes = {
            account: accountFormRule,
            password: passwordFormRule,
            confirmPassword: [
              {
                validator: validateConfirmPassword(formData?.password),
                trigger: 'change'
              }
            ],
            policy: [{ validator: validatePolicy, trigger: 'change' }],
            ...mobileRule
          }
          return computedRes
        // reset password form rules
        case LoginStateEnum.RESET_PASSWORD:
          computedRes = {
            account: accountFormRule,
            ...mobileRule
          }
          return computedRes
        // mobile form rules
        case LoginStateEnum.MOBILE:
          computedRes = mobileRule
          return computedRes
        // login form rules
        default:
          computedRes = {
            account: accountFormRule,
            password: passwordFormRule
          }
          return computedRes
      }
    }
  )
  return { getFormRules }
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change'
    }
  ]
}
