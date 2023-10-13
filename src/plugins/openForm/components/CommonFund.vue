<template>
	<el-form :model="fundConfig" label-width="auto">
		<el-form-item label="基金名称：">
			<el-input v-model="fundConfig.fundName" auto-complete="off"></el-input>
		</el-form-item>

		<el-form-item label="基金代码：" class="el-form-item">
			<el-input v-model="fundConfig.fundCode" auto-complete="off"></el-input>
		</el-form-item>

		<el-form-item label="基金标语：">
			<el-input v-model="fundConfig.fundSlogan" auto-complete="off"></el-input>
		</el-form-item>

		<el-form-item label="详情页链接：">
			<el-input v-model="fundConfig.detailUrl" placeholder="请输入详情页链接" auto-complete="off"></el-input>
		</el-form-item>

		<el-form-item label="收益率时间区间：">
			<el-select v-model="fundConfig.rateDimension" placeholder="请选择涨幅类型">
				<el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="基金标签：">
			<el-tag
				:key="tag"
				v-for="tag in fundConfig.fundLabels"
				closable
				:disable-transitions="false"
				@close="deleteTag(tag)"
			>{{tag}}</el-tag>

			<div class="tag_add">
				<el-input
					class="input-new-tag"
					v-if="inputVisible"
					v-model="inputValue"
					ref="saveTagInput"
					size="small"
					@keyup.enter.native="handleInputConfirm"
					@blur="handleInputConfirm"
				></el-input>

				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
			</div>
		</el-form-item>
	</el-form>
	<!-- <el-button type="primary" @click="onConfirm">确 定</el-button> -->
</template>
<script>
export default {
	data() {
		return {
			fundConfig: {
				fundCode: '123465',
				fundName: '基金名称',
				fundSlogan: '基金标语',
				fundLabels: ['标签1', '标签2'],
				rateDimension: 'j1n',
				btnText: '购买按钮文案',
				buyUrl: '购买链接',
				detailUrl: '详情页链接',
				rawInfo: '{a: 2}'
			},
			inputVisible: false,
			inputValue: ''
		}
	},
	created() {},
	computed: {
		options() {
			return [
				{
					label: '净值',
					value: 'netValue'
				},
				{
					label: '成立来收益率',
					value: 'cll'
				},
				{
					label: '近一周收益率',
					value: 'j1z'
				},
				{
					label: '近一月收益率',
					value: 'j1y'
				},
				{
					label: '近三月收益率',
					value: 'j3y'
				},
				{
					label: '近六月收益率',
					value: 'j6y'
				},
				{
					label: '近一年收益率',
					value: 'j1n'
				},
				{
					label: '近两年收益率',
					value: 'j2n'
				},
				{
					label: '近三年收益率',
					value: 'j3n'
				},
				{
					label: '近五年收益率',
					value: 'j5n'
				},

				{
					label: '七日年化收益率',
					value: 'qrnh'
				},
				{
					label: '万份收益率',
					value: 'wfsy'
				}
			]
		}
	},
	methods: {
		/** 删除一个标签 */
		deleteTag(tag) {
			this.fundConfig.fundLabels.splice(
				this.fundConfig.fundLabels.indexOf(tag),
				1
			)
		},

		/** 新增一个标签--编辑 */
		showInput() {
			this.inputVisible = true
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus()
			})
		},

		/** 新增一个标签--保存 */
		handleInputConfirm() {
			let inputValue = this.inputValue
			if (inputValue) {
				this.fundConfig.fundLabels.push(inputValue)
			}
			this.inputVisible = false
			this.inputValue = ''
		},
	}
}
</script>
<style scoped lang="less">
</style>
