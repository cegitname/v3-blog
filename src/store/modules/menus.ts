import type { menuType, menuName } from '@/store/model/menu'
import { Menus } from '@/store/model/menu'
import { componentMenus, TsMenus, UtilsMenus } from '@/store/model/menu'
interface menuState {
  componentMenus: menuType[]
  TsMenus: menuType[]
  UtilsMenus: menuType[]
  activeMenu: string
}
export default {
  namespace: true,
  state: (): menuState => ({
    componentMenus,
    TsMenus,
    UtilsMenus,
    activeMenu: 'componentMenus'
  }),
  mutations: {
    setActiveMenu(state: menuState, activeMenu: menuName) {
      state.activeMenu = Menus[activeMenu]
    }
  }
}
