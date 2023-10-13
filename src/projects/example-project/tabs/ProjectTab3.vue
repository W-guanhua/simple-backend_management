<template>
  <div>
    <el-button type="primary" @click="add">新增</el-button>
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
    async add () {
      const [json, schema] = await this.$openForm({
        title: "新增内容",
        formSchema: this.$formSchemas["example-project"]["example"],
        formData: {},
        confirm: async (json, schema) => {
          console.log('得到的新增json', json)
        },
      });
    },
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
