<template>
  <div>
    <div class="d_uploader-wrapper" v-if="uploadURL">
      <el-upload
        ref="upload"
        :data="uploadData"
        class="d_uploader"
        :disabled="loading"
        :action="uploadURL"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        style="width: 100%; height: 100%"
      >
        <div class="d_uploader-preview" v-loading="loading" v-if="showPreview">
          <img class="img" v-if="src" :src="src" />
          <i v-else class="el-icon-upload d_uploader-icon"></i>
        </div>
        <slot></slot>
      </el-upload>
      <div class="tip">
        <p v-if="shapeSize.length">建议图片尺寸：{{filterSize(shapeSize[0])}} * {{filterSize(shapeSize[1])}}</p>
        <p v-if="maxFileSize">文件大小不可超过{{maxFileSize}}M</p>
        <p>支持拓展名：.jpg .png</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
	name: 'fileUpload',
	mixins: [],
	props: {
		showPreview: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: 'image'
		},
		src: {
			type: String,
			default: ''
		},
		uploadURL: {
			type: String,
			default: ''
		},
    maxFileSize: {
      type: Number,
      default: 1,
    },
    shapeSize: {
      type: Array,
      default: () => []
    },
    limitShapeSize: {
      type: Boolean,
      default: false
    },
		uploadPrefix: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			imageUrl: '',
			loading: false,
		}
	},
	computed: {
		uploadData () {
			return {
				prefix: this.uploadPrefix || 'dollar/unnamed'
			}
		}
	},
	watch: {
		src: {
			handler(val) {
				this.imageUrl = this.src
			},
			immediate: true
		}
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.loading = false
			this.imageUrl = URL.createObjectURL(file.raw)
			if (res.errCode !== 'e0000') {
				this.$error('上传失败，请稍后重试~')
			} else {
				this.$emit('updateModel', res.body)
				this.$emit('update:src', res.body)
			}
		},
		async beforeAvatarUpload(file) {
			this.loading = true
			if (this.type === 'image') {
				const isJPG = file.type === 'image/jpeg'
				const isPNG = file.type === 'image/png'
				const isSize = this.maxFileSize > 0 && (file.size > 1024 * 1024 * this.maxFileSize)
				if (!isJPG && !isPNG) {
					this.$message.error('图片类型必须位jpeg或png')
					this.loading = false
					return false
				}
				if (!isSize) {
					this.$message.error(`图片超过${this.maxFileSize}M，请压缩上传`)
					this.loading = false
					return false
				}
        if (this.limitShapeSize && this.shapeSize[0] && this.shapeSize[1]) {
					const isOver = await this.overCheckSize(file)
					if (isOver) {
						const isConfirm = await this.confirm('当前图片不满足上传尺寸，是否强制上传?')
						if (!isConfirm) {
							this.loading = false
							return false
						}
					}
				}

			}
		},
    overCheckSize (file) {
			return new Promise(resolve => {
				let reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => {
					let img = new Image()
					img.src = reader.result
					img.onload = () => {
						if (Math.abs((img.width / img.height) - (this.shapeSize[0] / this.shapeSize[1])) > 0.02) {
							resolve(true)
						} else {
							resolve(false)
						}
					}
					img.onerror = () => {
						resolve(false)
					}
				}
				reader.onerror = () => {
					resolve(false)
				}
			})
		},
		confirm (title) {
			return new Promise(resolve => {
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => resolve(true)).catch(() => resolve(false))
			})
		},
    filterSize (size) {
      return size ? size + 'px' : '-'
    }
	}
}
</script>


<style lang="less">
.d_uploader {
	&-wrapper {
		width: 100%;
		height: 100%;
    position: relative;
		.el-upload {
			width: 100% !important;
			height: 100% !important;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	&-preview {
		width: 100%;
		flex: 1;
		overflow: hidden;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		overflow: hidden;
		background-color: #eee;
		&:hover {
			border-color: #409eff;
		}

		.img {
			display: block;
			width: 100% !important;
			height: 100% !important;
			object-fit: contain;
		}
	}
	&-icon {
		font-size: 28px;
		color: #8c939d;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
}
.tip{
  width: 400px;
  position: absolute;
  left: calc(100% + 20px);
  bottom: 0;
}
</style>
