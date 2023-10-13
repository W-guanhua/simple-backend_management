import * as _ from '@/utils/_'
export default {
	componentType: "CopyProp",
    props: {
		prop: {
			type: Object,
			default() {
				return null
			}
		},
		delay: {
			type: Number,
			default() {
				return 200
			}
		},
    },
    data() {
		return {
			// 周期钩子
			onPropCopyUpdate: _.debounceAfter(this.updatePropCopy, this.delay),
		}
	},
	watch: {
		propCopy:{
			handler(newVal, oldVal) {
				if (oldVal !== '_initialValue') {
					this.onPropCopyUpdate(newVal, this.prop)
				}
			},
			deep: true
		},

	},
	computed: {
	},
    methods: {
		updatePropCopy (newVal, oldVal) {
			this.$emit('copyPropUpdate', _.deepClone(newVal), _.deepClone(oldVal))
		}
	},
    // 生命周期
	created() {
		this.propCopy = _.deepClone(this.prop)
	},
}