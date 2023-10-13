<template>
	<div class="login">
		<div class="login-form-wrapper">
			<h3>{{title}}</h3>
			<el-form
				:model="loginForm"
				:rules="formRules"
				ref="loginForm"
				label-width="60px"
				class="login-form"
			>
				<el-form-item label="账号" prop="userName">
					<el-input
						style="width: 90%;"
						v-model.trim="loginForm.userName"
						placeholder="请输入登录账号"
						clearable
						@keyup.enter.native="submitForm('loginForm')"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="passwd">
					<el-input
						style="width: 90%;"
						type="password"
						v-model.trim="loginForm.passwd"
						placeholder="请输入登录密码"
						clearable
						@keyup.enter.native="submitForm('loginForm')"
					></el-input>
				</el-form-item>
				<el-form-item label-width="0">
					<el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import configs from '@configs'
export default {
	name: 'login',
	data() {
		return {
			/**表单数据 */
			loginForm: {
				userName: '', // 账号
				passwd: '' // 密码
			},
			/**定义表单校验规则 */
			formRules: {
				userName: [
					{ required: true, message: '账号不能为空', trigger: 'blur' }
				],
				passwd: [
					{ required: true, message: '密码不能为空', trigger: 'blur' }
				]
			},
			title: configs.title // 登录框标题
		}
	},
	methods: {
		/** 表单 */
		submitForm(formName) {
			if (configs.IGNORE_AUTH_CHECK)
				return this.onLoginSuccess('ignore_auth_check')
			this.$refs[formName].validate(async valid => {
				if (valid) {
					const [loginRes, loginErr] = await this.$apis['example-project'].midLogin({
						password: this.loginForm.passwd,
						username: this.loginForm.userName
					})
					if (loginErr) {
						// TODO:登录异常
						this.$message.error(loginErr)
					} else {
						this.onLoginSuccess(loginRes.token)
					}
				} else {
					return false
				}
			})
		},
		onLoginSuccess(token) {
			this.$message.success('登录成功')
			sessionStorage.setItem('token', token)
			const firstTab = this.$router.options.asideMenu[0].tabs[0]
			this.$router.replace(firstTab.childMenu ? firstTab.childMenu[0].path : firstTab.path)
		}
	},
	created() {
	}
}
</script>

<style scoped lang="less">
.login {
	width: 100vw;
	height: 100vh;
	display: flex;
	background: #ffffff;
	justify-content: center;
	align-items: center;
}
.login-form-wrapper {
	margin: auto;
	position: relative;
	top: -100px;
	width: 360px;
	padding: 30px;
	box-shadow: 0 0 20px 10px rgba(207, 207, 207, 0.5);
	border-radius: 10px;
	h3 {
		text-align: center;
		margin-bottom: 20px;
		color: #bfcbd9;
	}
}
.login-btn {
	width: 100%;
}
</style>
