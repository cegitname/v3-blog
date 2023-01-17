import { createStore } from 'vuex'
import { componentMenus, TsMenus, Menus, UtilsMenus } from './menu'
const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules: moduless = modulesFiles
  .keys()
  .reduce((moduless: moduless, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    moduless[moduleName] = value.default
    return moduless
  }, {})
console.log(modules, 'modulesmodules')
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
