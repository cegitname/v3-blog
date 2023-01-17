import { defHttp } from '@/utils/axios/index'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './loginTypes'

enum Api {
  Login = '/auth/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry'
}

export function login(params: LoginParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    { withToken: false }
  )
}
