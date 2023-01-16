import { ItemCode } from '@/components/types'
export const collapseCode: ItemCode[] = [
  {
    key: '1',
    header: '表单验证',
    code: `<...
v-bind:rules="getFormRules"
ref="formRef">
将表单规则，表单验证方法独立出来，通过useFormRules，useFormValid使用该方法
const formRef = ref()
const { validForm } = useFormValid(formRef)
const { getFormRules } = useFormRules()
// 提交时对表单校验
async function handleLogin() {
  const data = await validForm()
  if (!data) return
  loading.value = true
  try {
    // login api.....
  } catch (error) {
    // createErrorModal...
  } finally {
    loading.value = false
  }
}
`
  },
  {
    key: '2',
    code: 'codecode1',
    header: 'header2'
  },
  {
    key: '3',
    code: 'codecode3',
    header: 'header3'
  }
]

export const useFormRulesCode = `export function useFormRules(formData?: Recordable) {
  1. 创建验证规则account、passworld,验证码...
  2. 根据当前是什么类型的表单，通过computed生成对应的规则
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
`
export const useFormValidCode = `export function useFormValid<T>(formRef: Ref<any>) {
  1. 通过ref 拿到表单
  2. 验证 并返回通过的data
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}`
