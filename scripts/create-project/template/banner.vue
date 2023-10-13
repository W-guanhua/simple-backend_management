<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div class="card-header" style="text-align: right" slot="header">
        <el-button type="primary" size="mini" @click="save">保存</el-button>
      </div>
      <el-form ref="form" :model="config" label-width="100px">
        <el-form-item label="图片">
          <Upload style="width: 200px; height: 200px" :shapeSize="shapeSize" :src.sync="config.bannerUrl" :uploadURL="uploadURL" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Upload from "@/plugins/openForm/components/Upload";
import projectConfig from '../project.config'
export default {
  components: {
    Upload
  },
  data() {
    return {
      mock: [],
      /** 表格状态 */
      config: {
        bannerUrl: "",
      },
      uploadURL: `${projectConfig.baseURL}template/uploadFile`,
      // 建议的长宽
      shapeSize: [],
    };
  },
  created() {
    this.getIndexData()
  },
  methods: {
    async save() {
      const [res, err] = await this.$apis['example-project'].{{apiMap.update}}(this.config);
      if (err) {
        this.$message.error(err)
        return
      }
      this.$message.success("更新成功");
      this.getIndexData();
    },
    async getIndexData () {
      const [res, err] = await this.$apis['example-project'].{{apiMap.get}}()
      if (err) {
        this.$message.error(err)
        return
      }
      {{#if returnValue}}
        this.config = {{returnValue}}
      {{else}}
        this.config = res
      {{/if}}
    },
  },
};
</script>
<style scoped>
.formBlock {
  display: flex;
}

.label {
  width: 120px;
}
</style>
