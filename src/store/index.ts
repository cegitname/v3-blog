import { createStore } from 'vuex'
import menuState from './menu'
const store = createStore({
  state: {
    menus: menuState
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
})

export default store
