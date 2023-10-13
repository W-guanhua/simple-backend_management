import SchemaFormDialog from './SchemaFormDialog'
import formSchemas from './form-schemas'
export default (Vue, options) => {
    // 创建构造器
    var FormDialogPlugin = Vue.extend(SchemaFormDialog)
      // 创建 Profile 实例，并挂载到一个元素上。
    const div = document.createElement('div')
    document.body.appendChild(div)
    const myFormDialog = new FormDialogPlugin().$mount(div)
    Vue.prototype.$openForm = myFormDialog.openForm
    Vue.prototype.$formSchemas = formSchemas
}