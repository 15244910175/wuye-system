<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户报修管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加报修事项</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<div slot="header">添加报修事项</div>
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="报修事项名称" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入单据编号"></el-input>
				</el-form-item>
				<el-form-item label="报修人" prop="inName">
					<el-input v-model="addForm.inName" placeholder="请输入住户姓名"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="addForm.tel" placeholder="请输入缴费方式"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="addForm.address" placeholder="请输入缴费总额"></el-input>
				</el-form-item>
					<el-form-item label="报修时间" prop="beDate">
						<el-input v-model="addForm.beDate" placeholder="请输入收费人员"></el-input>
					</el-form-item>
					<el-form-item label="保修情况说明" prop="mark">
						<el-input v-model="addForm.mark" type="textarea" placeholder="请输入备注"></el-input>
					</el-form-item>
					<el-button type="primary">保存</el-button>
					<el-button @click="resetForm('addForm')">重置</el-button>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				addForm: {
					name: '',
					inName: '',
					tel: '',
					address: '',
					beDate: '',
					mark: ''
				},
				addFormRules: {
					name: [{
							required: true,
							message: '请输入报修事项名称',
							rigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					inName: [{
							required: true,
							message: '请输入报修人',
							rigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					tel: [{
							required: true,
							message: '请输入联系电话',
							rigger: 'blur'
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
						rigger: 'blur'
					}, ],
					beDate: [{
						required: true,
						message: '请输入报修时间',
						rigger: 'blur'
					}, ],
					mark: [{
						required: true,
						message: '请输入备注信息',
						rigger: 'blur'
					}, ],

				}
			}
		},
		methods: {
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
