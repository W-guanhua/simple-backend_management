<template>
  <el-form :model="currentTab" label-position="left" label-width="80px" size="small">
    <el-form-item label="tabName" prop="tabName" required>
      <el-input v-model="currentTab.tabName" disabled></el-input>
    </el-form-item>
    <el-form-item label="返回值" prop="returnValue" required>
      <el-input v-model="currentTab.returnValue"></el-input>
    </el-form-item>
    <el-form-item :label="`接口-${editApiItem.label}`" :prop="`apiMap.${editApiItem.value}`" :required="editApiItem.required" v-for="editApiItem in apiEditList" :key="editApiItem.value">
      <el-select v-model="currentTab.apiMap[editApiItem.value]">
        <el-option v-for="item in selectApiList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      apiEditList: [
        { label: '查', value: 'get', required: true},
        { label: '改', value: 'update'},
        { label: '增', value: 'add'},
        { label: '删', value: 'delete'},
      ]
    }
  },
  computed: {
    ...mapState({
        currentTab: (state) => (state.editor.currentTab || {}),
        apiList: (state) => state.editor.swaggerData.apiList
    }),
    ...mapGetters({
      selectApiList: 'editor/selectApiList'
    })
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
