import type { menuType, menuName } from '@/store/model/menu'
import { Menus } from '@/store/model/menu'
import { componentMenus, UtilsMenus, BasicMenus } from '@/store/model/menu'
interface menuState {
  componentMenus: menuType[]
  UtilsMenus: menuType[]
  BasicMenus: menuType[]
  activeMenu: string
}
export default {
  namespace: true,
  state: (): menuState => ({
    componentMenus,
    UtilsMenus,
    BasicMenus,
    activeMenu: ''
  }),
  mutations: {
    setActiveMenu(state: menuState, activeMenu: menuName) {
      state.activeMenu = Menus[activeMenu]
      sessionStorage.activeMenu = Menus[activeMenu]
    }
  }
}
