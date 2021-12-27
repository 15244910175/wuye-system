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
							<el-input v-model="addForm.type" placeholder="请输入缴费方式"></el-input>
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
				<el-form-item label="备注" prop="remark">
					<el-input v-model="addForm.remark" type="textarea" placeholder="请输入备注"></el-input>
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
					remark: ''
				},
				addFormRules: {
					dNo: [
						{required: true,message: '请输入单据编号',rigger: 'blur'},
						{min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
					],
					zName: [
						{required: true,message: '请输入住户姓名',rigger: 'blur'},
						{min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
					],
					type: [
						{required: true,message: '请输入缴费方式',rigger: 'blur'},
					],
					cases: [
						{required: true,message: '请输入缴费总额',rigger: 'blur'},
						{type: 'number',message: '总额输入正整数',trigger: 'blur'}
					],
					changeName: [
						{required: true,message: '请输入收费人员',rigger: 'blur'},
					],
					waterCase: [
						{required: true,message: '请输入水费',rigger: 'blur'},
						{type: 'number',message: '水费输入正整数',trigger: 'blur'}
					],
					eCase: [
						{required: true,message: '请输入电费',rigger: 'blur'},
						{type: 'number',message: '电费输入正整数',trigger: 'blur'}
					],
					gasCase: [
						{required: true,message: '请输入气费',rigger: 'blur'},
						{type: `number`,message: '气费输入正整数',trigger: 'blur'}
					],
					stopCase: [
						{required: true,message: '请输入停车费',rigger: 'blur'},
						{type: 'number',message: '停车费输入正整数',trigger: 'blur'}
					],
					mandCase: [
						{required: true,message: '请输入维修费用',rigger: 'blur'},
						{type: 'number',message: '维修费用输入正整数',trigger: 'blur'}
					],
					remark: [
						{required: true,message: '请输入备注信息',rigger: 'blur'},
					],
					
				}
			}
		},
		methods:{
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
