import { defHttp } from '@/utils/axios/index'

enum Api {
  getFileToken = '/resource-service/upload/getToken',
  Logout = '/auth/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry'
}

export function getFileToken() {
  return defHttp.get(
    {
      url: Api.getFileToken
    },
    { errorMessageMode: 'message' }
  )
}
