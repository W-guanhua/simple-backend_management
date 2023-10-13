<template>
  <el-card class="d-table_list">
    <!-- <h3 v-show="title">{{title}}</h3> -->
    <div slot="header" class="clearfix">
      <div class="main-between">
        <div class="left_box">
          <el-button type="primary" size="mini" @click="addRow" icon="el-icon-plus">新增</el-button>
          <slot name="topLeft"></slot>
        </div>
        <div class="mid_box">
          <slot name="topMid"></slot>
        </div>
        <div class="right_box">
          <slot name="topRight">
            <el-button type="primary" size="mini" @click="getTableData">刷新</el-button>
          </slot>
        </div>
      </div>
    </div>

    <el-table
      @select="$emit('select', $event)"
      @select-all="$emit('select-all', $event)"
      @selection-change="$emit('selection-change', $event)"
      :data="table.data"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="col in config.cols"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width">
          <template slot-scope="scope">
            <div v-if="col.render"
              v-html="col.render(scope)"></div>
            <template v-else-if="col.type">
              <img v-if="col.type === 'image'"
                :alt="col.label"
                style="display: block; width: 50px; height: 50px; object-fit: contain;margin:0 auto;"
                :src="scope.row[col.prop]" />
              <div v-else-if="col.type === 'link'">
                <el-tooltip effect="dark"
                  :content="scope.row[col.prop]"
                  placement="top">
                  <el-button type="text"
                    @click="copy(scope.row[col.prop])">{{col.label}}</el-button>
                </el-tooltip>
              </div>
              <div v-else-if="col.type === 'switch'">
                <el-switch disabled
                  v-model="scope.row[col.prop]"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  v-bind="col.typeAttrs || {}"
                  v-on:change="col.onChange">
                </el-switch>
              </div>
            </template>
            <div style="white-space: pre-line" v-else>{{col.format ? col.format(scope.row[col.prop], scope) : scope.row[col.prop]}}</div>
          </template>
        </el-table-column>
      <slot></slot>
      <el-table-column label="基础操作" width="200px" align="center" fixed="right" v-if="config.operations">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-for="event in config.tableEvents" :key="event.eventName" @click="event.handleClick(scope.row, () => init())">{{event.eventName}}</el-button>
          <el-button type="text" size="small" @click="updateRow(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteRow(scope.row)"
            style="margin-left: 10px; color: red;"
          >
            <el-button type="text" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <slot name="end-col"></slot>
    </el-table>
    
    <!-- 分页 -->
    <el-pagination
      @current-change="onPageChange"
      :current-page="currentPage"
      :page-size="table.pageSize"
      layout="prev, pager, next"
      :total="table.totalCount"
      v-if="config.isOpen"
    ></el-pagination>

    <div>
      <div class="left_box">
        <slot name="bottomLeft"></slot>
      </div>
      <div class="mid_box">
        <slot name="bottomMid"></slot>
      </div>
      <div class="right_box">
        <slot name="bottomRight"></slot>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      /** 表格状态 */
      table: {
        pageSize: 10, // 页面数据条数
        pageNum: 1, // 页码
        data: [],
        totalCount: 10, // 数据总量
      },
    };
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  // 生命周期
  created() {
    this.getTableData()
  },
  // 方法定义
  methods: {
    /** 初始化 */
    async init () {
      this.table.pageSize = 10
      this.table.pageNum = 1
      this.getTableData()
    },
    getTableData () {
      this.config['data-get']({
        pageSize: this.table.pageSize,
        pageNum: this.table.pageNum
      }, (data) => {
        if (!data) return
        this.table.data = data.content
        this.table.totalCount = data.totalElements || data.totalCount || 0
      })
    },
    // 删除
    async deleteRow (row) {
      this.config['data-delete'](row, (err) => {
        this.table.pageNum = 1
        this.getTableData()
        if (!err) return this.$message.success('删除成功')
        this.$message.error(err)
      })
    },
    // 新增
    addRow () {
      this.config['data-create']((err) => {
        this.getTableData()
        if (!err) return this.$message.success('新增成功')
        this.$message.error(err)
      })
    },
    // 更新/编辑
    updateRow (row) {
      this.config['data-update'](row, (err) => {
        this.getTableData()
        if (!err) return this.$message.success('更新成功')
        this.$message.error(err)
      })
    },
    onPageChange(e) {
      this.$emit("pageChange", e);
      this.table.pageNum = e
      this.getTableData()
    }
  }
};
</script>

<style scoped>
.d-table_list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
</style>
