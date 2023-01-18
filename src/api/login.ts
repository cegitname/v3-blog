import { defHttp } from '@/utils/axios/index'
import { LoginParams, LoginResultModel } from './loginTypes'

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry'
}

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    { withToken: false, errorMessageMode: 'message' }
  )
}
export function logoutApi() {
  return defHttp.delete<LoginResultModel>(
    {
      url: Api.Logout
    },
    { errorMessageMode: 'modal' }
  )
}
