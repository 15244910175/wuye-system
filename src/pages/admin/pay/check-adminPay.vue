<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>缴费管理</el-breadcrumb-item>
			<el-breadcrumb-item>缴纳物业费信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="单据编号">
						<el-input size="mini" v-model="formInline.dNo" placeholder="输入单据编号"></el-input>
					</el-form-item>
					<el-form-item label="住户姓名">
						<el-input size="mini" v-model="formInline.zName" placeholder="输入住户姓名"></el-input>
					</el-form-item>
					<el-form-item label="是否缴费">
						<el-select v-model="formInline.state" placeholder="请选择是否缴费" style="width:100%" size="mini">
							<el-option label="已缴费" value="已缴费"></el-option>
							<el-option label="未缴费" value="未缴费"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible2=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="缴费信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="物业费编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="dNo" label="单据编号" align="center">
				</el-table-column>
				<el-table-column prop="zName" label="住户姓名" align="center">
				</el-table-column>
				<el-table-column prop="payabledate" label="应缴纳日期" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="changedate" label="缴纳日期" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="cases" label="缴费总额" align="center">
				</el-table-column>
				<el-table-column prop="state" label="是否缴费" align="center">
				</el-table-column>
				<el-table-column label="具体操作" align="center" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-view">
							<a @click="handleEdit1(scope.$index, scope.row)">标记已缴费</a>
						</el-button>
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deletePay(scope.row.id)">删除</a>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize"
					layout="total, prev, pager, next, sizes, jumper" :total="typeList.length">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="编辑维修费用" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单据编号" prop="dNo">
							<el-input v-model="infoList.dNo" placeholder="请输入单据编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住户姓名" prop="zName">
							<el-input v-model="infoList.zName" placeholder="请输入住户姓名"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="缴费方式" prop="type">
							<el-select v-model="infoList.type" placeholder="请选择缴费方式" style="width:100%">
								<el-option label="线上缴费" value="线上缴费"></el-option>
								<el-option label="线下缴费" value="线下缴费"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费总额" prop="cases">
							<el-input v-model="infoList.cases" placeholder="请输入缴费总额"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收费人员" prop="changeName">
							<el-input v-model="infoList.changeName" placeholder="请输入收费人员"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="水费" prop="waterCase">
							<el-input v-model="infoList.waterCase" placeholder="请输入水费"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="电费" prop="eCase">
							<el-input v-model="infoList.eCase" placeholder="请输入电费"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="气费" prop="gasCase">
							<el-input v-model="infoList.gascase" 请输入气费></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="停车费" prop="stopCase">
							<el-input v-model="infoList.stopCase" placeholder="请输入停车费"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="维修费用" prop="mandCase">
							<el-input v-model="infoList.mandCase" placeholder="请输入维修费用"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="应缴纳日期" prop="payabledate">
					<el-date-picker v-model="infoList.payabledate" type="date" placeholder="请选择应缴纳日期" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="备注" prop="remark" >
					<el-input v-model="infoList.remark" type="textarea" placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-button type="primary" @click="save" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
		<el-dialog title="缴费情况" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">

				<el-form-item label="是否缴费" prop="state">
					<el-select v-model="infoList.state" placeholder="请选择已修与否" style="width:100%">
						<el-option label="已缴费" value="已缴费"></el-option>
						<el-option label="未缴费" value="未缴费"></el-option>
					</el-select>
				</el-form-item>

				<el-button type="primary" @click="save1" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
		
		<el-dialog title="新增维修费用" :visible.sync="dialogTableVisible2">
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
						<el-form-item label="气费" prop="gascase">
							<el-input v-model="addForm.gascase" placeholder="请输入气费"></el-input>
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
				<el-form-item label="应缴纳日期" prop="payabledate">
					<el-date-picker v-model="addForm.payabledate" type="date" placeholder="请选择应缴纳日期" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="addForm.remark" type="textarea" placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-button type="primary" @click="add" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from "axios";
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					dNo: '',
					zName: '',
					state: ''
				},
				typeList: [{
					name: '',
					beDate: '',
					model: '',
					inName: '',
					state: '',
					payabledate:''
				}],
				infoList: {
					dNo: '',
					zName: '',
					type: '',
					cases: '',
					changeName: '',
					waterCase: '',
					eCase: '',
					gascase: '',
					stopCase: '',
					mandCase: '',
					remark: '',
					changedate:new Date(),
					payabledate:''
				},
				addForm: {
					dNo: '',
					zName: '',
					type: '',
					cases: '',
					changeName: '',
					waterCase: '',
					eCase: '',
					gascase: '',
					stopCase: '',
					mandCase: '',
					// changedate: new Date(),
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
							// type: 'number',
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
							// type: 'number',
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
							// type: 'number',
							message: '电费输入正整数',
							trigger: 'blur'
						}
					],
					gascase: [{
							required: true,
							message: '请输入气费',
							rigger: 'blur'
						},
						{
							// type: `number`,
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
							// type: 'number',
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
							// type: 'number',
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
				
				},
				json_fields: {
								单据编号: "dNo",
								住户姓名: "zName",
								应缴纳日期: "payabledate",
								缴纳日期: "changedate",
								缴费总额: "cases",
								是否缴费: "state"
							 },
				json_meta: [
							[
							{
								key: "charset",
								value: "utf-8"
							}
							]
							],
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
				dialogTableVisible: false,
				dialogTableVisible1: false,
				dialogTableVisible2: false,
				infoListRules: {
					name: [{
						required: true,
						message: '请输入设备名称',
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: '请输入设备型号',
						trigger: 'blur'
					}, ],
					num: [{
							required: true,
							message: '请选择性别',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '数量必须为数字',
							trigger: 'blur'
						}
					],
					beDate: [{
						required: true,
						message: '请选择采购时间',
						trigger: 'blur'
					}, ],
					mark: [{
						required: true,
						message: '请输入设备说明',
						trigger: 'blur'
					}, ]
				}
			}
		},
		
		created() {
			this.getPayListL();
		},
		methods: {
			handleEdit1(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			save1() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateAlrdypay",
					method: "post",
					data: this.infoList,
				}).then(res => {
					console.log(res);
					if (res.msg === "修改成功") {
						this.$message({
							message: "修改成功！",
							type: "success"
						});
						this.dialogTableVisible1 = false;
					}
				});
			},
			handleEdit(index, row) {
				this.dialogTableVisible = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			save() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updatePay",
					method: "post",
					data: this.infoList
				}).then(res => {
					console.log(res);
					if (res.msg === "修改成功") {
						this.$message({
							message: "修改成功！",
							type: "success"
						});
						this.dialogTableVisible = false;
					}
				});
			},
			add() {
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
				this.getPayListL();
				this.dialogTableVisible2=false;
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			// 时间格式化
			dateFormat: function(row, column) {

				var date = row[column.property];

				if (date == undefined) {
					return ''
				};

				return moment(date).format("YYYY-MM-DD")

			},
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
				this.dialogTableVisible1 = false;
				this.dialogTableVisible2 = false;
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},

			getPayListL() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getPayListL", {

					})
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("获取数据");
							self.$message.success("数据已获取到！");
						}
						self.typeList = res.data.list;
						// console.log(self.typeList);
						console.log(res);
					})
			},
			resetForm() {
				this.formInline = {},
					this.getPayListL();
			},
			// 删除物业费信息
			deletePay(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deletePay",
							method: "post",
							data: {
								id: id
							}
						}).then(res => {
							console.log(res);
							this.$message({
								type: 'success',
								message: '删除成功!',
							})
							this.getPayListL();
						})
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '删除失败',
						})
					});
			},
			handleSizeChange(val) {
				this.pagesize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
		}

	}
</script>
<style scoped>
	.t_box {
		height: 100%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.search {
		/* width: 30%; */
		float: left;
	}

	.page {
		width: 30%;
		margin: auto;
		margin-top: 50px;
	}

	/* .el-form-item {
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute;
		text-justify: distribute-all-lines;
		
	} */

	.el-button {
		/* position: relative; */
		/* text-align: center; */
		/* margin-left: 50%; */
	}

	.el-input {
		width: 80%;
	}
</style>
