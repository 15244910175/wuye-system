<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>缴费管理</el-breadcrumb-item>
			<el-breadcrumb-item>缴纳费用</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<div slot="header">物业费事项</div>
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单据编号" prop="dNo">
							<el-input v-model="addForm.dNo" placeholder="请输入单据编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住户姓名" prop="zName">
							<el-input v-model="addForm.zName" placeholder="请输入住户姓名"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="缴费方式" prop="type">
							<el-select v-model="addForm.type" placeholder="请选择缴费方式" style="width:100%">
								<el-option label="线上缴费" value="线上缴费"></el-option>
								<el-option label="线下缴费" value="线下缴费"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费总额" prop="cases">
							<el-input v-model="addForm.cases" placeholder="请输入缴费总额"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收费人员" prop="changeName">
							<el-input v-model="addForm.changeName" placeholder="请输入收费人员"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="水费" prop="waterCase">
							<el-input v-model="addForm.waterCase" placeholder="请输入水费"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="电费" prop="eCase">
							<el-input v-model="addForm.eCase" placeholder="请输入电费"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="气费" prop="gasCase">
							<el-input v-model="addForm.gasCase" placeholder="请输入气费"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="停车费" prop="stopCase">
							<el-input v-model="addForm.stopCase" placeholder="请输入停车费"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="维修费用" prop="mandCase">
							<el-input v-model="addForm.mandCase" placeholder="请输入维修费用"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="应缴纳日期" prop="payabledate">
							<el-date-picker v-model="addForm.payabledate" placeholder="请选择应缴纳日期" type="date"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="备注" prop="remark">
							<el-input v-model="addForm.remark" type="textarea" placeholder="请输入备注" style="width: 80%;"></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				
				<el-button type="primary" @click="onSubmit()">保存</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	import request from "../../../utils/request.js"
	// import moment from 'moment';
	import {
		formatDate
	} from "../../../utils/format.js";
	export default {
		data() {
			return {
				addForm: {
					dNo: '',
					zName: '',
					type: '',
					cases: '',
					changeName: '',
					waterCase: '',
					eCase: '',
					gasCase: '',
					stopCase: '',
					mandCase: '',
					changedate: new Date(),
					remark: '',
					state: '未缴费',
					payabledate: ''

				},
				addFormRules: {
					dNo: [{
							required: true,
							message: '请输入单据编号',
							rigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					zName: [{
							required: true,
							message: '请输入住户姓名',
							rigger: 'blur'
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
						message: '请选择缴费方式',
						rigger: 'blur'
					}, ],
					cases: [{
							required: true,
							message: '请输入缴费总额',
							rigger: 'blur'
						},
						{
							type: 'number',
							message: '总额输入正整数',
							trigger: 'blur'
						}
					],
					changeName: [{
						required: true,
						message: '请输入收费人员',
						rigger: 'blur'
					}, ],
					waterCase: [{
							required: true,
							message: '请输入水费',
							rigger: 'blur'
						},
						{
							type: 'number',
							message: '水费输入正整数',
							trigger: 'blur'
						}
					],
					eCase: [{
							required: true,
							message: '请输入电费',
							rigger: 'blur'
						},
						{
							type: 'number',
							message: '电费输入正整数',
							trigger: 'blur'
						}
					],
					gasCase: [{
							required: true,
							message: '请输入气费',
							rigger: 'blur'
						},
						{
							type: `number`,
							message: '气费输入正整数',
							trigger: 'blur'
						}
					],
					stopCase: [{
							required: true,
							message: '请输入停车费',
							rigger: 'blur'
						},
						{
							type: 'number',
							message: '停车费输入正整数',
							trigger: 'blur'
						}
					],
					mandCase: [{
							required: true,
							message: '请输入维修费用',
							rigger: 'blur'
						},
						{
							type: 'number',
							message: '维修费用输入正整数',
							trigger: 'blur'
						}
					],
					remark: [{
						required: true,
						message: '请输入备注信息',
						rigger: 'blur'
					}, ],
					payabledate: [{
						required: true,
						message: '请选择应缴费日期',
						rigger: 'blur'
					}, ],

				}
			}
		},
		
		methods: {
			onSubmit() {
				if (
					// changedate = this.changedate,
					this.addForm.dNo == "" ||
					this.addForm.zName == "" ||
					this.addForm.type == "" ||
					this.addForm.cases == "" ||
					this.addForm.changeName == "" ||
					this.addForm.waterCase == "" ||
					this.addForm.eCase == "" ||
					this.addForm.gasCase == "" ||
					this.addForm.stopCase == "" ||
					this.addForm.mandCase == "" ||
					this.addForm.remark == "" ||
					this.addForm.payabledate == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addPay",
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
