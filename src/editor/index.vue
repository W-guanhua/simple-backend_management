<template>
  <div class="editor-wrapper">
    <div class="editor-header">
      <div class="title">中台编辑器</div>
      <div class="right">
        <el-button type="primary" size="small" @click="createTab">新建tab</el-button>
        <el-button type="primary" size="small" @click="exportConfig">导出</el-button>
      </div>
    </div>
    <div class="editor-main">
      <EditorLeft class="editor-left"></EditorLeft>
      <EditorCanvas class="editor-canvas"></EditorCanvas>
      <EditorRight class="editor-right"></EditorRight>
    </div>
  </div>
</template>

<script>
import mockConfig from '@editor/config/mock.json'
import swaggerConfig from '@editor/config/swagger.json'
import tabJson from '@editor/form-schemas/tab.json'
import { mapState } from 'vuex'

import EditorLeft from './components/EditorLeft.vue'
import EditorCanvas from './components/EditorCanvas.vue'
import EditorRight from './components/EditorRight.vue'
export default {
  components: {
    EditorLeft,
    EditorCanvas,
    EditorRight
  },
  data() {
    return {
    }
  },
  mounted() {
    this.updateSwaggerData()
    this.initWork()
  },
  computed: {
    ...mapState({
        // 箭头函数可使代码更简练
        swaggerData: (state) => state.editor.swaggerData, 
        work: (state) => state.editor.work
    })
  },
  methods: {
    exportConfig () {
      console.log(this.work)
      console.log(JSON.stringify(this.work))
    },
    updateSwaggerData () {
      this.$store.commit('editor/updateSwaggerData', swaggerConfig)
    },
    initWork () {
      this.$store.commit('editor/initWork', mockConfig)
    },
    async createTab () {
      const [json, schema] = await this.$openForm({
            title: "新建tab",
            formSchema: {
              ...tabJson,
              model: {
                type: 'enum',
                title: '使用model',
                description: '使用model',
                items: this.swaggerData.definitionList.map(item => {
                  return {
                    value: item.title,
                    label: item.title
                  }
                }),
                control: true,
                rules: "notEmpty"
              }
            },
            confirm: async (json, schema) => {
              this.$store.commit('editor/createTab', json)
            },
      });
    }
  }
}
</script>
<style lang="less" scoped>
@headerHeight: 80px;
@editorLeftWidth: 300px;
@editorRightWidth: 300px;
.editor-wrapper{
  width: 100vw;
  height: 100vh;
  .editor-header{
    width: 100%;
    padding: 0 30px;
    height: @headerHeight;
    line-height: @headerHeight;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .title{
      font-size: 30px;
    }
  }
  .editor-main{
    width: 100%;
    height: calc(100% - @headerHeight);
    display: flex;
    .editor-left{
      flex-shrink: 0;
      border-right: 1px solid #ccc;
      width: @editorLeftWidth;
      height: 100%;
    }
    .editor-canvas{
      flex: 1;
    }
    .editor-right{
      flex-shrink: 0;
      border-left: 1px solid #ccc;
      height: 100%;
      width: @editorRightWidth;
    }
  }
}
</style>
