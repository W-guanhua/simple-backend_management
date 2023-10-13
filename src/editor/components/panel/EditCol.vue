<template>
  <el-form :model="currentCol" label-position="left" label-width="80px" size="small">
    <el-form-item label="label" prop="label" required>
      <el-input v-model="currentCol.label"></el-input>
    </el-form-item>
    <el-form-item label="prop" prop="prop">
      <el-input v-model="currentCol.prop"></el-input>
    </el-form-item>
    <el-form-item label="format" prop="format" >
      <!-- <Code></Code> -->
      <el-input type="textarea" v-model="currentCol.format"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select v-model="currentCol.type">
        <el-option v-for="item in uiList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import { uiList } from '../../ui/config'
export default {
  components: {
  },
  data() {
    return {
      uiList
    }
  },
  computed: {
    ...mapState({
        currentCol: (state) => (state.editor.currentCol || {}),
    }),
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
