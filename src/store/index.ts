import { createStore } from 'vuex'
import { componentMenus, TsMenus, Menus, UtilsMenus } from './menu'
type menusType = 'Components' | 'TypeScript'
const store = createStore({
  state: {
    componentMenus: componentMenus,
    TsMenus: TsMenus,
    UtilsMenus: UtilsMenus,
    activeMenu: 'componentMenus'
  },
  mutations: {
    setActiveMenu(state, activeMenu: menusType) {
      state.activeMenu = Menus[activeMenu]
    }
  },
  actions: {},
  getters: {},
  modules: {}
})

export default store
