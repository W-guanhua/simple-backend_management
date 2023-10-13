import * as _ from '@/utils/_'
export default {
	componentType: "ModelConfig",
	model: {
        prop: 'modelValue_',
        event: 'updateModel'
	},
    props: {
		modelValue_: {
			// 组件配置，JSON字符串
			type: [String, Object, Array, Number],
			default() {
				return null
			}
		},
		valueId: {
			type: [Number, String],
			default () {
				return 1
			}
		},
		delay: {
			type: Number,
			default() {
				return 0
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
			modelValue: null,
			errMessage: '',
		}
	},
	watch: {
		'modelValue':{
			handler: 'updateModel',
			deep: true
		},
		modelValue_(val) {
			this.modelValue = val
		}
	},
	computed: {
		isValid () {
			return this.checkIsValid(this.modelValue)
		},
		isError () {
			return !this.isValid
		}
	},
    methods: {
		checkIsValid(val) {
			let result = true
			for (let i = 0; i < this.rules.length ; i++) {
				const rule = this.rules[i]
				this.errMessage = rule.message
				/** 必要性校验 */
				if (!rule.required) {
					result = true
					continue;
				} else {
					result = Boolean(val)
					if (!result) return result
				}

				/** 长度校验 */
				const length = String(val).length
				const minTest = rule.min ? length >= rule.min : true
				const maxTest = rule.max ? length <= rule.max : true
				result = minTest && maxTest
				if (!result) return result
			}
			return result
		},
        updateModel(val) {
			/** 格式校验 */
			if (!this.checkIsValid(val)) return

			/** 初始化状态校验 */
			if (!this.componentInit) return this.componentInit = true

			/** 节流 */
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
			this.timer = setTimeout(() => {
				this.$emit('updateModel', this.modelValue)		
				clearTimeout(this.timer)
				this.timer = null
			}, this.delay);
		},
		/** 数据更新前 */
		beforeModelUpdate () {}
    },
    // 生命周期
	created() {
		if (typeof this.modelValue_ === 'object') {
			this.modelValue = _.deepClone(this.modelValue_)
		} else {
			this.modelValue = this.modelValue_
		}
		setTimeout(() => {
			this.componentInit = true
		}, 200);
	}
}
/**
 * <div v-model="XXX"></div>
 */