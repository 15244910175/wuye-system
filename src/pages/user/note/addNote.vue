<template>
	<div>


		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>留言管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加留言、投诉</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="box-card">
			<div slot="header">添加投诉、留言</div>
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="mark">
					<el-input v-model="addForm.mark" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="留言类型" prop="type">
					<el-select v-model="addForm.type" placeholder="请选择留言类型" style="width:100%">
						<el-option label="留言" value="留言"></el-option>
						<el-option label="投诉" value="投诉"></el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import request from "../../../utils/request.js"
	import {
		formatDate
	} from "../../../utils/format.js";
	export default {
		data() {
			return {
				addForm: {
					title: '',
					mark: '',
					type: '',
					time: '',
					leaverName:''
				},
				addFormRules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					mark: [{
							required: true,
							message: '请输入留言内容',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					type: [{
						required: true,
						message: '请选择留言类型',
						trigger: 'blur'
					}, ],
				},
				time: ''
			}
		},
		methods: {
			onSubmit() {
				this.time = formatDate(new Date());
				// this.title=this.title;
				// this.typeId = this.uuid();
				const params = {
					title: this.addForm.title,
					mark: this.addForm.mark,
					type: this.addForm.type,
					time: this.time
				};
				request({
					url: "http://127.0.0.1:10520/api/user/addNote",
					method: "post",
					data: params
				}).then(res => {
					console.log(res);
					if (res.msg === "新增成功") {
						this.$message({
							message: "恭喜你，新增成功",
							type: "success"
						});
						this.init();
					}
				});
			},
			init() {
				// this.dialog_state = false;
				this.addForm = {};
			},
			//显示当前时间（年月日时分秒）
			timeFormate(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) :
					new Date(timeStamp).getMonth() + 1;
				let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp)
					.getDate();
				let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp)
					.getHours();
				let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(
					timeStamp).getMinutes();
				let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(
					timeStamp).getSeconds();
				this.nowTime = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ':' + ss;
			},
			nowTimes() {
				this.timeFormate(new Date());
				setInterval(this.nowTimes, 1000);
				this.clear()
			},
			clear() {
				clearInterval(this.nowTimes)
				this.nowTimes = null;
			},
			resetForm(addForm) {
				this.$refs[addForm].resetFields();
			},
		},
		mounted() {
			this.nowTimes();
		},
		beforeDestroy() {
			this.clear();
		}
	}
</script>

<style>
	div {
		position: relative;
	}

	.el-card {
		position: absolute;
		/* text-align: center; */
		margin-top: 30px;
		margin-left: 300px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 700px;
		height: 600px;
	}

	.el-form-item {
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines;
		/* border: 1px solid red; */
	}

	.el-button {
		/* position: relative; */
		/* text-align: center; */
		margin-left: 40%;
	}
</style>
