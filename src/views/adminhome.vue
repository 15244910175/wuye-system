<template>
	<el-container class="home-container">
		<!-- 头部区域 -->
		<el-header>
			<div>
				<!-- <img src="../assets/shop-logo.jpg" alt=""> -->
				<span>小区物业管理系统</span>
			</div>

			<div class="header-right">
				<div class="header-user-con">
					<!-- 全屏显示 -->
					<div class="btn-fullscreen" @click="handleFullScreen">
						<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
					</div>
					<!-- 消息中心 -->
					<div class="btn-bell">
						<el-tooltip effect="dark" is-dot :content="message?`有${message}条未读消息`:`消息中心`"
							placement="bottom">
							<router-link to="/note">
								<i class="el-icon-bell"></i>
							</router-link>
						</el-tooltip>
						<span class="btn-bell-badge" v-if="message"></span>
					</div>
					<!-- 用户头像 -->
					<div class="user-avator">
						<img src="../assets/img/img.jpg">
						<!-- {{userName}} -->
					</div>
					<el-button type="info" @click="loginout" style="margin-left: 10%;;">退出</el-button>
				</div>
			</div>

		</el-header>

		<!-- 主体区域 -->
		<el-container>
			<!-- 侧边栏区域 -->
			<el-aside :width="isCollapse ? '64px' :'200px'">
				<div class="toggle-button" @click="toggleCollapse">|||</div>
				<!-- 侧边栏菜单区域 -->
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#3B9FFF" :unique-opened="true"
					:collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">

					<el-submenu index="1">
						<template slot="title">
							<i class="iconfont icon-zhuhuziliao"></i>
							<span>住户资料管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="check-house" class="el-icon-menu">查看住户租赁资料</el-menu-item>
							<el-menu-item index="h-change" class="el-icon-menu">产权变更管理</el-menu-item>

						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-house"></i>
							<span>房产管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="house-mag" class="el-icon-menu">房产管理信息</el-menu-item>

						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="iconfont icon-xitongguanliyuan"></i>
							<span>系统管理员管理</span>
						</template>
						<el-menu-item-group>

							<el-menu-item index="check-admin" class="el-icon-menu">查看管理员</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-s-custom"></i>
							<span>保安管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="check-baoan" class="el-icon-menu">查看保安信息</el-menu-item>
							<el-menu-item index="check-Scheduling" class="el-icon-menu">查看保安排班记录</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="iconfont icon-hrrenshirenshiguanli380"></i>
							<span>人事管理</span>
						</template>
						<el-menu-item-group>

							<el-menu-item index="check-renshi" class="el-icon-menu">查看物业公司员工信息</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title">
							<i class="iconfont icon-shebeiguanli"></i>
							<span>设备管理</span>
						</template>
						<el-menu-item-group>

							<el-menu-item index="check-equipment" class="el-icon-menu">查看设备信息</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title">
							<i class="iconfont icon-wuyejiaofei"></i>
							<span>缴费管理</span>
						</template>
						<el-menu-item-group>

							<el-menu-item index="check-adminPay" class="el-icon-menu">缴纳物业费信息查看</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="8">
						<template slot="title">
							<i class="iconfont icon-wuyebaoxiu"></i>
							<span>住户报修管理</span>
						</template>
						<el-menu-item-group>

							<el-menu-item index="check-adminRepair" class="el-icon-menu">报修事项信息查看</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="9">
						<template slot="title">
							<i class="iconfont icon-tingche"></i>
							<span>住户停车车位管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="check-park" class="el-icon-menu">查看车位明细信息</el-menu-item>

							<el-menu-item index="check-carPark" class="el-icon-menu">小区车位查看</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="10">
						<template slot="title">
							<i class="el-icon-truck"></i>
							<span>小区快递管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="pass-mag" class="el-icon-menu">快递公司管理</el-menu-item>
							<el-menu-item index="col-pass" class="el-icon-menu">代收快递信息管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="11">
						<template slot="title">
							<i class="el-icon-s-tools"></i>
							<span>留言管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="note" class="el-icon-menu">留言信息管理</el-menu-item>
							<el-menu-item index="complaint" class="el-icon-menu">投诉管理</el-menu-item>

						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="12">
						<template slot="title">
							<i class="el-icon-bell"></i>
							<span>公告管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="noticeMag" class="el-icon-menu">公告信息管理</el-menu-item>

						</el-menu-item-group>
					</el-submenu>


				</el-menu>
			</el-aside>
			<!-- 右侧主题内容区域 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="visibleEditPasswordDialog" width="30%">
			<el-form ref="passForm" :model="passForm" :rules="passFormRules" label-width="80px">
				<el-form-item label="新密码" prop="password">
					<el-input v-model="passForm.password"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="visibleEditPasswordDialog = false">关 闭</el-button>
				<el-button type="primary" @click="visibleEditPasswordDialog = false">确认修改</el-button>
			</span>
		</el-dialog>
		<!-- 修改用户信息 -->
		<el-dialog title="修改用户信息" :visible.sync="visibleEditInfoDialog" width="30%">
			<el-form ref="infoForm" :model="infoForm" :rules="infoFormRules" label-width="80px">
				<el-form-item label="用户昵称" prop="username">
					<el-input v-model="infoForm.username"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱" prop="email">
					<el-input v-model="infoForm.email"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="visibleEditInfoDialog = false">关 闭</el-button>
				<el-button type="primary" @click="visibleEditInfoDialog = false">确认修改</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>

<script>
	import {
		getUserName,
		getUsername
	} from "../utils/auth"
	export default {
		data() {
			return {
				username: "",
				// 是否折叠
				isCollapse: false,
				// 被激活的链接地址
				activePath: '',
				visibleEditPasswordDialog: false,
				visibleEditInfoDialog: false,
				fullscreen: false,
				message: '',
				passForm: {
					password: ''
				},
				infoForm: {
					username: '',
					email: ''
				},
				passFormRules: {
					password: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}]
				},
				infoFormRules: {
					username: [{
						required: true,
						message: '请输入用户昵称',
						trigger: 'blur'
					}],
					email: [{
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
				}
			}
		},
		created() {
			// this.getMenuList(),
			this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods: {
			loginout() {
				window.sessionStorage.clear();
				this.$router.push('/');
			},
			hadleCommand(command) {
				if (command == "loginout") {
					localStorage.removeItem("username");
					this.$router.push("/");
				}
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},
			// 获取所有菜单
			// async getMenuList() {
			//   const {
			//     data: res
			//   } = await this.axios.get('menus')
			//   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			//   this.menulist = res.data
			//   console.log(res)
			// },
			// 点击按钮，切换菜单的折叠与展开
			toggleCollapse() {
				this.isCollapse = !this.isCollapse
			},
			// 保存链接的激活状态
			saveNavState(activePath) {
				window.sessionStorage.setItem('activePath', activePath),
					this.activePath = activePath
			}
		},
		//  computed: {
		//   username() {
		//     let userName = localStorage.getItem("ms_username");
		//     return userName ? userName : this.name;
		//   },
		// },
		mounted() {
			this.username = getUserName();
		},
	}
</script>

<style lang="less" scoped>
	.home-container {
		height: 100%;
	}

	.el-header {
		background-color: #373F41;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 0px;
		color: #fff;
		font-size: 24px;
		position: relative;
		box-sizing: border-box;
		float: left;


		>div {
			display: flex;
			align-items: center;

			span {
				padding-left: 15px;
			}
		}


	}

	.el-aside {
		background-color: #333744;

		.toggle-button {
			background-color: #4A5064;
			font-size: 15px;
			line-height: 24px;
			color: #fff;
			text-align: center;
			letter-spacing: 0.2em;
			cursor: pointer;
		}

		.el-menu {
			border-right: none;
		}
	}

	.el-main {
		background-color: #EAEDF1;
		// padding:10px;
	}

	.iconfont {
		margin-right: 10px;
	}

	.user-avator {
		margin-left: 20px;
	}

	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.user-name {
		margin-left: 10px;
	}

	.el-dropdown-link {
		color: #ffffff;
		cursor: pointer;
	}

	.header-right {
		float: right;
		padding-right: 50px;
	}

	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
	}

	.btn-fullscreen {
		transform: rotate(45deg);
		margin-right: 5px;
		font-size: 24px;
	}

	.btn-bell,
	.btn-fullscreen {
		position: relative;
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 15px;
		cursor: pointer;
	}

	.btn-bell-badge {
		position: absolute;
		right: 0;
		top: -2px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #f56c6c;
		color: #fff;
	}

	.btn-bell .el-icon-bell {
		color: #fff;
	}

	.user-name {
		margin-left: 10px;
	}

	.user-avator {
		margin-left: 20px;
	}

	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
	}

	.el-dropdown-menu__item {
		text-align: center;
	}

	.collapse-btn:hover {
		background-color: #009688 !important;
	}
</style>
