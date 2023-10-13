<template>
  <div>
    <TableList :config="table" ref="table">
    </TableList>
  </div>
</template>
<script>
import TableList from '@/components/TableList.vue'
export default {
  components: {
    TableList
  },
  data() {
    return {
      tableLength: 0,
      /** 表格状态 */
      table: {
        // CURD
        "data-get": async ({ pageSize, pageNum }, next) => {
          const { data } = await this.mockApi();
          this.tableLength = data.length
          next({
            content: data,
            totalCount: data.length,
          });
        }, // 定义表格数据的获取方法,通过next返回指定格式的内容
        "data-create": async (next) => {
          const [json, schema] = await this.$openForm({
            title: "新增内容",
            formSchema: this.$formSchemas["example-project"]["example"],
            formData: {},
            confirm: async (json, schema) => {
              console.log('得到的新增json', json)
              next()
            },
          });
        }, // 同create
        "data-update": async (row, next) => {
          const [json, schema] = await this.$openForm({
            title: "编辑内容",
            formSchema: this.$formSchemas["example-project"]["example"],
            formData: row,
            confirm: async (json, schema) => {
              console.log('得到的编辑json', json)
              next()
            },
          });
        }, // 同create
        "data-delete": async (row, next) => {
          // 删除
          next()
        }, // 同create
        cols: [
          { label: "label1", prop: "prop1" },
          { label: "label2", prop: "prop2" },
          { label: "label3", prop: "prop3" },
          { label: "label4", prop: "prop4" },
          { label: "label5", prop: "prop5" },
        ],
        operations: true
      },
    };
  },
  methods: {
    async getData () {
      const { data } = await this.mockApi()
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
  },
};
</script>
<style scoped></style>
