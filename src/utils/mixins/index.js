import ComponentConfigurableMixin from './mixin-configurable-component'
import VueMixinCopyProp from './mixin-copy-prop'
import VueMixinVModel from './mixin-v-model'

export default {
    CopyProp: VueMixinCopyProp,
    VModel: VueMixinVModel,
    ConfigurableComponent: ComponentConfigurableMixin
}