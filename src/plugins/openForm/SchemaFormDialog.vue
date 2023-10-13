<template>
	<el-dialog
		:title="formTitle"
		:visible.sync="dialogVisible"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:append-to-body="true"
		width="60%"
	>
		<!-- 通用类型的schema表单 -->
		<template v-if="!formSchema.type || !isString(formSchema.type)">
			<el-form :model="formData" ref="form" label-width="auto" :key="dialogVisible">
				<template v-for="(val, key) in formSchema">
					<el-form-item
						v-if="judgeFormItemShow(val, key)"
						:label="val.title"
						:key="key + val.type"
						:prop="key"
						:rules="formRules[val.rules]">

						<template v-if="val.type === 'string'">
							<el-input v-model="formData[key]" :placeholder="val.description" v-bind="val.attrs || {}"></el-input>
						</template>

						<template v-else-if="val.type === 'textarea'">
							<el-input type="textarea" v-model="formData[key]" :placeholder="val.description"></el-input>
						</template>

						<template v-else-if="val.type === 'password'">
							<el-input type="password" v-model="formData[key]" :placeholder="val.description" v-bind="val.attrs || {}"></el-input>
						</template>

						<template v-else-if="val.type === 'liveswitch'"> 
    						<el-switch type="switch" v-model="formData[key]" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#dadde5" ></el-switch>
						</template>

						<template v-else-if="val.type === 'labels' || val.type === 'stringArray'">
							<el-tag
								:key="tag"
								v-for="tag in formData[key]"
								closable
								@close="deleteTag(key, tag)"
								:disable-transitions="false"
								style="margin-right: 5px"
							>{{tag}}</el-tag>

							<div style="display: inline-block; width: 100px;">
								<el-input
									class="input-new-tag"
									v-if="inputVisible"
									v-model="inputValue"
									ref="saveTagInput"
									size="small"
									@keyup.enter.native="handleInputConfirm(key)"
									@blur="handleInputConfirm(key)"
								></el-input>

								<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
							</div>
						</template>

						<template v-else-if="val.type === 'textArray'">
							<template v-for="(item, index) in formData[key]">
								<div :key="index"
								style="display: flex; width: 100%">
								<el-input v-model="formData[key][index]"
									placeholder="请输入内容"
									type="textarea"
									ref="input"
									resize="none"
									rows="3"
									v-bind="val.attrs || {}"
									style="margin-bottom: 5px"></el-input>
								<div class="actions">
									<el-button size="mini"
									type="danger"
									icon="el-icon-delete"
									style="margin-left: 10px;"
									@click.stop="deleteItem(key, index)">
									</el-button>
								</div>
								</div>
							</template>
							<el-button @click="addItem(key)"
								style="width: 100%" v-if="!val.maxCount || formData[key].length < val.maxCount">+</el-button>
						</template>

						<template v-else-if="val.type === 'options' || val.type === 'enum'">
							<el-select v-model="formData[key]" :placeholder="val.description" v-bind="val.attrs || {}">
								<el-option
								v-for="item in getOptionItems(key, val.items)"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</template>

						<template v-else-if="val.type === 'relativeOptions' || val.type === 'relativeEnum'">
							<el-select v-model="formData[key]" :placeholder="val.description" @change="updateControlsRecorder(key, $event)">
								<el-option
								v-for="item in val.items"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</template>

						<template v-else-if="val.type === 'number'">
							<el-input-number v-model="formData[key]" :label="val.description" v-bind="val.attrs || {}"></el-input-number>
						</template>

						<template v-else-if="val.type === 'time'">
							<el-form-item :label="val.label">
  							  <el-col :span="6" style="margin-right:10px;">
  							    <el-date-picker type="date" placeholder="选择日期" v-model="val.date1" style="width: 100%;"></el-date-picker>
  							  </el-col>
  							  <el-col :span="4">
  							    <el-time-picker placeholder="选择时间" v-model="val.date2" style="width: 100%;"></el-time-picker>
  							  </el-col>
  						</el-form-item>
						</template>
						
						<template v-else-if="val.type === 'color'">
							<el-color-picker v-model="formData[key]"></el-color-picker>
						</template>
						<template v-else-if="val.type === 'image'">
							<Upload v-bind="val.attrs" :src.sync="formData[key]" :uploadPrefix="uploadPrefix" :uploadURL="uploadURL" style="width: 80px; height: 80px;display:inline-block;vertical-align:top;"/>
						</template>
						<template v-else-if="val.type === 'period'">
							<el-date-picker v-model="formData[key]"
								v-bind="val.attrs || {}"
								type="datetimerange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
							</el-date-picker>
						</template>
                        <template v-else-if="val.type === 'datetime'">
                            <el-date-picker
                              v-model="formData[key]"
							  v-bind="val.attrs || {}"
                              type="datetime"
                              placeholder="选择日期时间">
                            </el-date-picker>
                        </template>
						<template v-else>
							类型{{val.type}}未定义~
						</template>
					</el-form-item>
				</template>
			</el-form>
		</template>
		<!-- 拓展类型的schema表单:未完成 -->
		<template v-else>
			<template v-if="formSchema.type === 'fund'">
				<CommonFund ref='form'/>
				<pre>{{formData}}</pre>
			</template>
		</template>
		<div slot="footer" class="dialog-footer">
			<el-button @click="onCancel">取 消</el-button>
			<el-button type="primary" @click="onConfirm">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
/** 
 * 场景一：弹窗配置表单；
 * 场景二：非弹窗配置表单；
 * 场景三：只读表单；
 */
import CommonFund from './components/CommonFund'
import Upload from './components/Upload'
import formRules from './form-rules/index.js'
import {
	schema2data,
	deepClone,
	mergeSchemaData,
} from '@utils/schema'
export default {
	components: {
		CommonFund,
		Upload
	},
	data() {
		return {
			dialogVisible: false,
			confirm: null,

			formTitle: "",
			formSchema: {},
			formData: {},
			extraData: {},

			formRules,
			uploadURL: '', // 上传url
			/** label类型相关参数 */
			inputVisible: false,
			inputValue: '',

			/** relativeOptions */
			controlsRecorder: {},

			optionsItems: []
		}
	},
	computed: {
		controls () {
			let controls = []
			Object.entries(this.controlsRecorder).forEach((item) => {
				const [key, control] = item
				controls.push(...control)
			})
			return controls
		}	
	},
	watch: {
		dialogVisible(val) {
			if (val) {
				// 做一些初始化操作
				this.formData = schema2data(this.formSchema)
			} else {
				// 做一些清除操作
			}
		}
	},
	methods: {
		isString (obj) {
			return Object.prototype.toString.call(obj) === '[object, string]'
		},
		async onConfirm() {
			this.formSchema = this.formSchema
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.dialogVisible = false
					this.confirm && this.confirm(deepClone(this.formData), deepClone(this.formSchema))
					this.openFormResolve && this.openFormResolve([deepClone(this.formData), deepClone(this.formSchema)])
				} else {
					this.$message.error('信息录入不合法，请检查！')
				}
			})
		},
		onCancel() {
			this.dialogVisible = false
		},
		openForm({
			formData = {},
			formSchema = {},
			extraData = {},
			uploadURL = '',
			uploadPrefix = '',
			title = '',
			optionsItems = [],
			confirm = () => {}
		} = {}) {
			/** 赋值操作 */
			this.formTitle = title
			this.confirm = confirm
			this.formSchema = formSchema
			this.uploadURL = uploadURL
			this.optionsItems = optionsItems
			this.uploadPrefix = uploadPrefix
			/** 合并schema和原始数据 */
			this.formSchema = mergeSchemaData(
				formSchema,
				formData,
				extraData
			)
			/** 遍历处理relativeOptions类型 */
			for (let key in this.formSchema) {
				const schema = this.formSchema[key]
				if (schema.type === 'relativeEnum') {
					this.updateControlsRecorder(key, schema.value)
				}
			}


			this.dialogVisible = true
			return new Promise(resolve => {
				this.openFormResolve = resolve
			})
		},

		/** label类型相关方法 */
		/** 删除一个标签 */
		deleteTag(key, tag) {
			this.formData[key].splice(
				this.formData[key].indexOf(tag),
				1
			)
		},

		/** 新增一个标签--编辑 */
		showInput() {
			this.inputVisible = true
			this.$nextTick(_ => {
				const input = this.$refs.saveTagInput[0]
				input.$refs.input.focus()
			})
		},

		/** 新增一个标签--保存 */
		handleInputConfirm(key) {
			let inputValue = this.inputValue
			if (inputValue) {
				this.formData[key].push(inputValue)
			}
			this.inputVisible = false
			this.inputValue = ''
		},
		/** 关联下拉选项的修改 */
		onSelectChange (key, value) {
			const selectedOption = this.formSchema[key].items.find(option => option.value === value)
			const controls = selectedOption.controls || []
			this.$set(this.controlsRecorder, key, controls)
		},
		// 更新controlsRecorder
		updateControlsRecorder (key, value) {
			const selectedOption = this.formSchema[key].items.find(option => option.value === value)
			const controls = (selectedOption && selectedOption.controls) || []
			this.$set(this.controlsRecorder, key, controls)
		},
		// 处理control属性，来判断表单字段的条件渲染
		judgeFormItemShow (schema, key) {
			if (!schema.control) return true
			return this.controls.includes(key)
		},

		 /** textArray */
		async deleteItem(key, index) {
			const confirm = await this.$confirm("确认删除？");
			if (confirm) {
				this.formData[key].splice(index, 1);
			}
		},
		async addItem(key) {
			this.formData[key].push("");
			await this.$nextTick();
			this.$refs.input[this.formData[key].length - 1].focus();
		},
		getOptionItems(key, items) {
			// console.log(key, items)
			const obj = this.optionsItems.find((item) => item.key === key);
			const arr = [...items, ...(obj ? obj.list : [])];
			return Array.from(new Set(arr));
		},
	},
}
</script>
<style lang="less" scoped>
</style>
