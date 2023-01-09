<template>
  <a-menu
    v-model:openKeys="openkeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleMenu"
    id="dddddd"
    style="width: 200px"
    mode="inline"
  >
    <template v-for="item in menuList" :key="item.key">
      <a-sub-menu v-if="item.subs" :key="item.key">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>{{ item.title }}</template>
        <a-menu-item v-for="subItem in item.subs" :key="subItem.key">{{
          subItem.title
        }}</a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.key">{{ item.title }}</a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { Menu, MenuProps } from 'ant-design-vue'
import { MailOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface menuType {
  title: string
  path: string
  key: string
  subs?: Array<menuType>
}

export default defineComponent({
  name: 'Menu',
  components: {
    MailOutlined,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Menu.name]: Menu,
    [Menu.ItemGroup.name]: Menu.ItemGroup,
    [Menu.Item.name]: Menu.Item
  },
  setup() {
    const state = useStore().state
    const router = useRouter()
    const activeMemu = state.menus[0]
    const openkeys = ref<string[]>([activeMemu.key])
    const selectedKeys = activeMemu.subs
      ? ref<string[]>([activeMemu.subs[0].key])
      : ref<string[]>([activeMemu.key])
    if (activeMemu.subs) {
      router.replace({ path: activeMemu.subs[0].path })
    }

    const handleMenu: MenuProps['onClick'] = (e) => {
      console.log(e, '111')
      state.menus.forEach((element: menuType) => {
        if (element.subs) {
          element.subs.forEach((item) => {
            if (item.key === e.key) {
              router.replace({ path: item.path })
            }
          })
        } else {
          if (element.key === e.key) {
            router.replace({ path: element.path })
          }
        }
      })
    }
    return {
      menuList: state.menus,
      openkeys,
      selectedKeys,
      handleMenu
    }
  }
})
</script>
