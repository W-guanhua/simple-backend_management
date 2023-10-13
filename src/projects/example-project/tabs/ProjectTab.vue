<template>
  <div>
    <el-button type="primary" >新增</el-button>
    <br/>
    <br/>
    <el-table border :data="tableData">
      <el-table-column label="label1" prop="prop1"></el-table-column>
      <el-table-column label="label2" prop="prop2"></el-table-column>
      <el-table-column label="label3" prop="prop3"></el-table-column>
      <el-table-column label="label4" prop="prop4"></el-table-column>
      <el-table-column label="label5" prop="prop4"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default>
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
      <!-- ... -->
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <!-- 弹窗 表单配置 代码 省略-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData () {
      const { data } = await this.mockApi()
      this.tableData = data
    },
    // mock api 
    mockApi () {
      return new Promise((resolve) => {
        resolve({
          data: [{
            prop1: 'prop1'
          }]
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
