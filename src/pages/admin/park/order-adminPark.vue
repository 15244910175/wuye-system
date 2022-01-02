<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户停车车位管理</el-breadcrumb-item>
			<el-breadcrumb-item>预定小区车位</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<div slot="header">预定车位</div>
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="住户姓名" prop="userid">
					<el-input v-model="addForm.userid" placeholder="请输入住户姓名"></el-input>
				</el-form-item>
				<el-form-item label="住户身份证" prop="persionNo">
					<el-input v-model="addForm.persionNo" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="telephone">
					<el-input v-model="addForm.telephone" placeholder="请输入联系方式"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="addForm.address" placeholder="请输入住户地址"></el-input>
				</el-form-item>
				<el-form-item label="预留车位号" prop="carAddress">
					<el-input v-model="addForm.carAddress" placeholder="请输入预留车位号"></el-input>
				</el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				addForm: {
					userid: '',
					persionNo: '',
					telephone: '',
					address: '',
					carAddress: '',
				},
				addFormRules: {
					userid: [{
							required: true,
							message: '请输入住户姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					persionNo: [{
							required: true,
							message: '请输入身份证',
							trigger: 'blur'
						},
						{
							min: 18,
							max: 18,
							message: '请输入18位字符',
							trigger: 'blur'
						}
					],
					telephone: [{
							required: true,
							message: '请输入联系电话',
							trigger: 'blur'
						},
						{
							type: 'number',
							max: 11,
							message: '联系电话输入11位正整数',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入住户地址',
						trigger: 'blur'
					}, ],
					carAddress: [{
						required: true,
						message: '请输入预留车位号',
						trigger: 'blur'
					}, ],

				}
			}
		},
		methods: {
			onSubmit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/addOrderPark",
					method: "post",
					data: this.addForm
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
			resetForm(addForm) {
				this.$refs[addForm].resetFields();
			}
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
		width: 750px;
		height: 600px;
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
		/* height: 600px; */
	}

	.el-form-item {
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute;
		text-justify: distribute-all-lines;
		/* border: 1px solid red; */
	}

	.el-input {
		width: 80%;
	}

	.el-button {
		/* position: relative; */
		/* text-align: center; */
		margin-left: 40%;
	}
</style>
