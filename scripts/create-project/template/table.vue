<template>
  <div>
    <div class="head">
        <h3 class="title">{{tabName}}</h3>
        {{#if apiMap.add}}
        <el-button  type="primary" size="small" @click="addRow">新增</el-button>
        {{/if }}
    </div>
    <el-table
      :data="tableList"
      border
      style="width: 100%">
      {{#each schemaList}}
        <el-table-column prop="{{this.prop}}" label="{{this.description}}"></el-table-column>
      {{/each}}
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          {{#if apiMap.update}}
          <el-button type="primary" size="small"  @click="updateRow(scope.row)">编辑</el-button>
          {{/if }}
          {{#if apiMap.delete }}
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteRow(scope.row)"
            style="margin-left: 10px; color: red;"
          >
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
          {{/if }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import projectConfig from '../project.config'
export default {
  components: {
  },
  data() {
    return {
      tableList: []
    };
  },
  created() {
    this.getIndexData()
  },
  computed: {
  },
  methods: {
    async getIndexData () {
      const [res,err] = await this.$apis['{{project}}'].{{apiMap.get}}()
      if (err) {
        this.$message.error(err)
        return
      }
      {{#if returnValue}}
        this.tableList = {{returnValue}}
      {{else}}
        this.tableList = res
      {{/if}}
    },
    {{#if apiMap.update}}
    async updateRow (row) {
      this.$openForm({
        title: '编辑{{tabName}}',
        formData: row,
        uploadURL: `${projectConfig.baseURL}template/uploadFile`,
        formSchema: this.$formSchemas['{{project}}']['{{jsonName}}'],
        confirm: async (json, schema) => {
          const [res, err] = await this.$apis['{{project}}'].{{apiMap.update}}({
            ...row,
            ...json
          })
          if (err) {
            this.$message.error(err)
            return
          }
          await this.getIndexData()
          this.$message.success('编辑成功')
        }
      })
    },
    {{/if}}
    {{#if apiMap.add}}
    async addRow () {
      this.$openForm({
        title: '新增{{tabName}}',
        formData: {},
        uploadURL: `${projectConfig.baseURL}template/uploadFile`,
        formSchema: this.$formSchemas['{{project}}']['{{jsonName}}'],
        confirm: async (json, schema) => {
          const [res, err] = await this.$apis['{{project}}'].{{apiMap.add}}(json)
          if (err) {
            this.$message.error(err)
            return
          }
          await this.getIndexData()
          this.$message.success('新增成功')
        }
      })
    },
    {{/if}}
    {{#if apiMap.delete}}
    async deleteRow (row) {
      const id = row.id
      const [res, err] = await this.$apis['{{project}}'].{{apiMap.delete}}(row)
      if (err) {
        this.$message.error(err)
        return
      }
      await this.getIndexData()
      this.$message.success('删除成功')
    }
    {{/if}}
  }
};
</script>
<style scoped lang="less">
.head{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px
}
.title{
  margin-top: -3px;
  margin-right: 20px;
}
</style>
