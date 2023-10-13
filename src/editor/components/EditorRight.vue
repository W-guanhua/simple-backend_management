<template>
  <el-aside style="padding: 0 10px" v-if="currentTab">
    <el-tabs v-model="activeName">
      <el-tab-pane label="tab配置" name="tab" >
        <EditTab></EditTab>
      </el-tab-pane>
      <el-tab-pane label="列配置" name="col" v-if="currentTab.type === 'table' && currentCol">
        <EditCol></EditCol>
      </el-tab-pane>
      <el-tab-pane label="组件配置" name="component" v-if="false"></el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
/**
 * tab的切换逻辑
 */
import { mapState } from 'vuex';
import EditTab from './panel/EditTab.vue';
import EditCol from './panel/EditCol.vue';
export default {
  components: {
    EditTab,
    EditCol
  },
  data() {
    return {
      activeName: 'tab'
    }
  },
  computed: {
    ...mapState({
        currentTab: (state) => (state.editor.currentTab),
        currentCol: (state) => (state.editor.currentCol),
    })
  },
  watch: {
    currentCol (newVal) {
      if (newVal) {
        this.activeName = 'col'
      } else {
        this.activeName = 'tab'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
