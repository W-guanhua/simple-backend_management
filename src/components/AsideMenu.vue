<template>
<!-- todo：自适应问题-->
  <el-menu id="my_menu" :default-active="$route.path" :router="true">
    <!-- 第一层循环遍历项目 -->
    <template v-for="(pro, index) in asideMenu">
      <template v-if="pro.tabs.length > 1">
        <el-submenu :index="pro.title" :key="index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{pro.title}}</span>
          </template>
          <!-- <el-menu-item 
            class="tab-level_2"
            v-for="tab in pro.tabs"
            :key="tab.path"
            :index="tab.path"
          >{{tab.title}}</el-menu-item> -->
          <template v-for="tab in pro.tabs">
            <el-menu-item 
            class="tab-level_2"
            :key="tab.path"
            :index="tab.path"
            v-if="!tab.childMenu"
          >{{tab.title}}</el-menu-item>
          <el-submenu :index="tab.path" :key="tab.path" v-else>
            <template slot="title">
              <span>{{tab.title}}</span>
            </template>
            <el-menu-item 
              v-for ="childTab in tab.childMenu"
              class="tab-level_2"
              :key="childTab.path"
              :index="childTab.path"
            >{{childTab.title}}</el-menu-item>
          </el-submenu>
          </template>
        </el-submenu>
      </template>

      <template v-else>
      <!-- 项目有1个tab -->
        <el-menu-item
          v-for="tab in pro.tabs"
          class="tab-level_1"
          :index="tab.path"
          :key="tab.path"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{pro.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { asideMenu } from '@/projects'
export default {
  name: "AsideMenu",
  data() {
    return {};
  },
  created () {
  },
  props: {
    asideMenu: {
      type: [Array],
      default() {
        return asideMenu.filter(item => !item.hidden);
      }
    }
  }
};
</script>

<style lang="less">
#my_menu {
  width: 100%;
  height: 100%;
}
</style>
