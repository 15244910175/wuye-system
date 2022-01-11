<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>保安管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增保安排班</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<div slot="header">每天排班信息</div>
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="保安姓名" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入保安姓名"></el-input>
				</el-form-item>
				<el-form-item label="工作上班时间" prop="startTime">
					<el-date-picker v-model="addForm.startTime" type="datetime" placeholder="请选择工作上班时间"
						style="width:100%"></el-date-picker>
				</el-form-item>
				<el-form-item label="下班时间" prop="endTime">
					<el-date-picker v-model="addForm.endTime" type="datetime" placeholder="请选择工作下班时间" style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
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
					name: '',
					startTime: '',
					endTime: ''
				},
				addFormRules: {
					name: [{
							required: true,
							message: '请输入保安姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					startTime: [{
						required: true,
						message: '请选择开始上班时间',
						trigger: 'blur'
					}, ],
					endTime: [{
						required: true,
						message: '请选择下班时间',
						trigger: 'blur'
					}, ],
				}
			}
		},
		methods: {
			onSubmit() {
				if (
					this.addForm.name == "" ||
					this.addForm.startTime == "" ||
					this.addForm.endTime == "" 
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
				request({
				        url: "http://127.0.0.1:10520/api/admin/addPb",
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
					  }
			},
			init() {
			      // this.dialog_state = false;
			      this.addForm = {};
			    },
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

	.el-button {
		/* position: relative; */
		/* text-align: center; */
		margin-left: 50%;
	}
</style>
