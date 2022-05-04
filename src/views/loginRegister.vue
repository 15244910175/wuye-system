<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle" name="first">账户登录</div>
					<div class="bform">
						<el-form :model="inForm" :rules="rules" ref="inForm" label-width="100px" class="demo-ruleForm"
							:label-position="labelPosition">
							<el-form-item label="账号" prop="username">
								<el-input v-model="inForm.username"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="userpwd">
								<el-input v-model="inForm.userpwd" type="password" show-password></el-input>
							</el-form-item>
						</el-form>
					</div>
					<el-row>
						<el-button @click="resetForm1('inForm')" type="primary">清空</el-button>
						<el-button @click="login" type="primary">登录</el-button>
					</el-row>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle" name="second">创建账户</div>
					<div class="bform">
						<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm"
							:label-position="labelPosition">
							<el-form-item label="账号" prop="username">
								<el-input v-model="form.username"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="useremail">
								<el-input v-model="form.useremail" type="email"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="userpwd">
								<el-input v-model="form.userpwd" type="password" show-password></el-input>
							</el-form-item>
							<el-form-item label="权限" prop="role">
								<el-select v-model="form.role" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<el-row>
						<el-button @click="resetForm('form')" type="primary">清空</el-button>
						<el-button @click="register" type="primary">注册</el-button>
					</el-row>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起关注</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		setToken,
		setUserName
	} from "../utils/auth";
	import Cookies from "js-cookie"
	// import request from "../utils/request";
	export default {
		name: 'login-register',
		data() {
			return {
				isLogin: false,
				emailError: false,
				passwordError: false,
				existed: false,
				labelPosition: 'right',
				username: '',
				password: '',
				user: '',
				form: {
					username: '',
					useremail: '',
					userpwd: '',
					role: '',
					checked: ''
				},
				inForm: {
					username: '',
					userpwd: '',
					role: ''
				},
				options: [{
					value: '选项1',
					label: '业主'
				}, {
					value: '选项2',
					label: '管理员'
				}],
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					useremail: [{
							required: true,
							message: '请填写邮箱',
							trigger: 'blur'
						},
						{
							type: 'string',
							message: '邮箱格式不正确',
							trigger: 'blur',
							transform(value) {
								if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
										value)) {
									return true
								} else {}
							}
						},
						{
							type: 'string',
							message: '长度不能超过30位',
							trigger: 'blur',
							max: 30
						}
					],
					userpwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur'
						}
					],
					role: [{
						required: true,
						message: '请选择权限',
						trigger: 'change'
					}],



				}
			}
		},
		methods: {
			changeType() {
				this.isLogin = !this.isLogin
				this.form.username = ''
				this.form.useremail = ''
				this.form.userpwd = '',
					this.form.role = ''
			},
			//调用后台的方法 登录方法
			// login() {
			// 				//axios 获取网络
			// 				var that = this
			// 				this.$axios.post("http://127.0.0.1:10520/api/user/login", {
			// 					username: this.username,
			// 					password: this.password,
			// 					//身份的验证
			// 					indentity: this.role
			// 				}).then(function(res) { //请求成功
			// 					//回调方法里的this，只是调用方法体里面的参数，所以需要在外面将this定义好 JQuery
			// 					if (res.data.status === 1) {
			// 						// JSON.stringify将要序列化成 一个JSON 字符串的值，将值存在sessionStorage读取或保存数据中，设置key值为user
			// 						sessionStorage.setItem("user", JSON.stringify({
			// 							username: that.username,
			// 						}))

			// 						if (that.indentity === "管理员") {
			// 						//路由的跳转－－正常跳转就行
			// 						that.$router.push("adminhome");

			// 						} else if (that.indentity === "业主") {
			// 							//路由的跳转
			// 							that.$router.push("userhome");

			// 						}

			// 					} else if (res.data.status === 0) {
			// 						alert("用户名或者密码错误，请重新输入")
			// 						// window.location.href = 'fail.html'
			// 					}
			// 				}).catch(function(err) { //请求失败
			// 					console.log(err)
			// 				})
			// 			},

			login() {
				const self = this;
				if (self.inForm.username != "" && self.inForm.userpwd != "") {
					Cookies.set('username', self.inForm.username)
					self.$axios({
							method: 'post',
							url: 'http://127.0.0.1:10520/api/user/login',
							data: {
								username: self.inForm.username,
								// email: self.form.useremail,
								password: self.inForm.userpwd,
								role: self.inForm.role
							}
						})
						.then(res => {
							switch (res.data) {
								case 0:
									// alert("登陆成功！");
									this.$message({
										message: '登陆成功',
										type: 'success'
									});
									setToken(res.token);
									setUserName(res.username);
									self.$router.push("userhome");

									break;
								case -1:
									this.emailError = true;
									break;
								case 1:
									this.passwordError = true;
									break;
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					this.$message({
						message: '填写不能为空',
						type: 'warning'
					});
				}
			},
			register() {
				const self = this;
				if (self.form.username != "" && self.form.useremail != "" && self.form.userpwd != "" && self.form
					.role != "") {
					self.$axios({
							method: 'post',
							url: 'http://127.0.0.1:10520/api/user/reg',
							data: {
								username: self.form.username,
								email: self.form.useremail,
								password: self.form.userpwd,
								role: self.form.role
							}
						})
						.then(res => {
							switch (res.data) {
								case 0:
									this.$message({
										message: '注册成功',
										type: 'success'
									});
									this.login();
									break;
								case -1:
									this.existed = true;
									this.$message({
										message: '用户名已经存在，请重新注册',
										type: 'warning'
									});
									break;
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					this.$message({
						message: '填写不能为空',
						type: 'warning'
					});
				}
			},
			
			
			resetForm(form) {
				this.$refs[form].resetFields();
			},
			resetForm1(inForm) {
				this.$refs[inForm].resetFields();
			},
		},
		// created:在模板渲染成html前调用,即通常初始化某些属性值,然后再渲染成视图。
		created() {
			let username = JSON.parse(sessionStorage.getItem("user"))
			if (username) {
				//userName.username==user.username  对应登录界面设置的key里面的value对应的数组值
				this.user = username.username
				console.log("this.user:" + this.user)
			}
		},

	}
</script>

<style scoped="scoped">
	.login-register {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-image: url(../assets/img/bg1.jpeg);
		background-size: cover;
	}

	.contain {
		width: 40%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
			0 0 6px #f0f0f0;
	}

	.big-box {
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}

	.big-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btitle {
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57, 167, 176);
	}

	.bform {
		width: 100%;
		height: 50%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.bbutton {
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57, 167, 176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}

	.small-box {
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.small-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.stitle {
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}

	.scontent {
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}

	.sbutton {
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}

	.big-box.active {
		left: 0;
		transition: all 0.5s;
	}

	.small-box.active {
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}

	.el-checkbox {
		text-indent: 4px;
	}
</style>
