<template>
  <div class="editor-canvas">
    <el-card style="width: 90%; height: 90%" class="canvas-card">
      <TableTemplate v-if="currentTab.type === 'table'"></TableTemplate>
      <span v-else>{{ currentTab }}</span>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TableTemplate from './template/Table.vue'
export default {
  components: {
    TableTemplate
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      currentTab: (state) => state.editor.currentTab || {}
    })
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.editor-canvas{
  .canvas-card{
    margin: 50px auto 0;
    width: 90%;
    height: 90%;
  }
}
</style>
