<template>
  <el-aside>
    <el-menu
        :default-active="(currentTab && currentTab.uuid || '')"
    >
        <el-menu-item @click="clickTab(index)" v-for="(tabItem, index) in tabList" :key="tabItem.uuid" :index="tabItem.uuid">
          <span slot="title">{{ tabItem.tabName }}</span>
        </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      tabList: (state) => state.editor.work.tabList,
      currentTab: (state) => state.editor.currentTab || {},
    })
  },
  mounted() {},
  methods: {
    clickTab (index) {
      this.$store.commit('editor/setCurrentTab', index)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-menu-item.is-active {
  background-color: #ecf5ff;
}
</style>
