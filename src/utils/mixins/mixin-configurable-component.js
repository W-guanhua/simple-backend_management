import * as _ from '@/utils/_'
export default {
	componentType: "ConfigBase", // todo： 组件类型，用于遍历子组件做校验功能
    props: {
		// 组件配置，schema-jsona
		schemaJson: {
			type: Object,
			default() {
				return null
			}
		},
		delay: {
			type: Number,
			default() {
				return 60
			}
		},
		rules: {
			type: Array,
			default() {
				return []
			}
		},
    },
    data() {
		return {
			schemaJsonCopy: '_initialValue', // initialValue表示未初始值，初始化时不触发watch
			errMessage: '',
			// 周期钩子
			onSchemaJsonUpdate: _.debounceAfter(this.updateSchemaJson, this.delay),
		}
	},
	watch: {
		schemaJsonCopy:{
			handler(newVal, oldVal) {
				if (oldVal !== '_initialValue') {
					this.onSchemaJsonUpdate(_.deepClone(newVal), _.deepClone(this.schemaJson))
				}
			},
			deep: true
		},

	},
	computed: {
	},
    methods: {},
    // 生命周期
	created() {
		this.schemaJsonCopy = _.deepClone(this.schemaJson)
	},
	inject: {
		updateSchemaJson: {
			from: 'updateSchemaJson',
			default(e) {
				console.warn('未找到定义 updateSchemaJson 的父组件')
			}
		}
	}
}