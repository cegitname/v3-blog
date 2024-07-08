import type { menuType, menuName } from '@/store/model/menu'
import { Menus } from '@/store/model/menu'
import { MenuArray } from '@/store/model/menu'
interface menuState {
  componentMenus: menuType[]
  UtilsMenus: menuType[]
  BasicMenus: menuType[]
  JsCodeMenus: menuType[]
  activeMenu: string
}
export default {
  namespace: true,
  state: () => {
    return MenuArray.reduce((prev, item) => {
      const { name, arr } = item
      prev[name] = arr
      return prev
    }, {} as menuState)
  },
  mutations: {
    setActiveMenu(state: menuState, activeMenu: menuName) {
      state.activeMenu = Menus[activeMenu]
      sessionStorage.activeMenu = Menus[activeMenu]
    }
  }
}
