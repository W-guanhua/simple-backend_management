<template>
  <div>
    <el-button  type="primary" size="small"  @click="addCols">新增列</el-button>
    <el-button  type="primary" size="small" >预览编辑弹窗</el-button>
    <el-table :data="data" border style="width: 100%">
      <el-table-column v-for="(item, index) in currentCols" :key="item.prop" :prop="item.prop">
        <template #header>
          <div style="display: flex; align-items: center" @click="setCurrentCol(index)">
            <span>{{ currentCols[index].label  }}</span>
            <el-checkbox v-model="currentCols[index].show"></el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <span style="color: #aaa">列表项的新增、编辑、删除根据接口是否编写显示</span>
  </div>
</template>

<script>
/**
 * TODO:
 * 1、弹窗编辑
 * 
 * think:
 * 是否可删除新增的列
 * 列的显示隐藏优化
 */
import { mapState } from 'vuex';
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      data: [{}]
    }
  },
  computed: {
    ...mapState({
        currentTab: (state) => (state.editor.currentTab || {}),
    }),
    currentCols () {
      return this.currentTab.cols
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.columnDrop()
    })
  },
  methods: {
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const { oldIndex, newIndex } = evt
          const oldItem = this.currentTab.cols.splice(oldIndex, 1)[0]
          this.currentTab.cols.splice(newIndex, 0, oldItem)
          console.log(this.currentTab.cols)
        }
      })
    },
    addCols () {
      this.currentTab.addCol()
    },
    setCurrentCol (index) {
      this.$store.commit('editor/setCurrentCol', index)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
