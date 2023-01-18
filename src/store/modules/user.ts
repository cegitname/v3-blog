import type { UserInfo } from 'types/store'
import type { Commit } from 'vuex'
import type { LoginParams } from '@/store/model/userModel'
import { RoleEnum } from '@/enums/roleEnum'
import { loginApi, logoutApi } from '@/api/login'
interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}
export default {
  namespace: true,
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0
  }),
  mutations: {
    setToken(state: UserState, token: string | undefined) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }: { commit: Commit }, params: LoginParams) {
      try {
        const data = await loginApi(params)
        const { token } = data
        // save token
        commit('setToken', token.access_token)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      try {
        await logoutApi()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
