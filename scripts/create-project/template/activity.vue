<template>
  <div>
    <el-form>
      <el-form-item label="活动状态">
        <el-select v-model="activityStatus">
          <el-option 
            v-for="item in Activity_Status_Option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button style="margin-left: 20px" type="primary" @click="changeActivityStatus">更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const Activity_Status_Option = [
    {
        label: '升级中',
        value: 'UPGRADE'
    },
    {
        label: '正常',
        value: 'NORMAL'
    },
    {
        label: '已结束',
        value: 'END'
    }
]
export default {
  data () {
    return {
      activityStatus: '',
      Activity_Status_Option,
    }
  },
  mounted () {
    this.getIndexData()
  },
  methods: {
    async getIndexData () {
      const [res, err] = await this.$apis['example-project'].{{apiMap.get}}()
      if (err) {
        this.$message.error(err)
        return
      }
      {{#if returnValue}}
        this.activityStatus = {{returnValue}}
      {{else}}
        this.activityStatus = res
      {{/if}}
    },
    async changeActivityStatus() {
      const [res, err] = await this.$apis['example-project'].{{apiMap.update}}({
        status: this.activityStatus
      })
      if (err) {
        this.$message.error(err)
        return
      }
      await this.getIndexData()
      this.$message.success('更改成功')
    },
  }
}
</script>

<style>

</style>