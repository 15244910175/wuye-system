<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>设备管理</el-breadcrumb-item>
			<el-breadcrumb-item>查看设备信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="设备名称">
						<el-input size="mini" v-model="formInline.name" placeholder="输入设备名称"></el-input>
					</el-form-item>
					<el-form-item label="采购时间">
						<el-date-picker size="mini" v-model="formInline.beDate" type="date" placeholder="选择采购时间"
							style="width:100%">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="设备型号">
						<el-input size="mini" v-model="formInline.model" placeholder="输入设备型号"></el-input>
					</el-form-item>
					<el-form-item label="登记人">
						<el-input size="mini" v-model="formInline.inName" placeholder="输入登记人"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible1=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="设备资料.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="序号" width="150">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="设备名称">
				</el-table-column>
				<el-table-column prop="num" label="设备数量">
				</el-table-column>
				<el-table-column prop="beDate" label="采购时间" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="model" label="设备型号">
				</el-table-column>
				<el-table-column prop="inName" label="购买人">
				</el-table-column>
				<el-table-column prop="mark" label="设备说明">
				</el-table-column>
				<el-table-column label="具体操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteEqu(scope.row.id)">删除</a>
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

		<el-dialog title="编辑设备信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="infoList.name" placeholder="请输入设备名称"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="infoList.model" placeholder="请输入设备型号"></el-input>
				</el-form-item>
				<el-form-item label="设备数量" prop="num">
					<el-input v-model="infoList.num" placeholder="请输入设备数量"></el-input>
				</el-form-item>
				<el-form-item label="采购时间" prop="beDate">
					<el-date-picker v-model="infoList.beDate" type="date" placeholder="请选择工作日期" style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="购买人" prop="inName">
					<el-input v-model="infoList.inName" placeholder="请输入购买人"></el-input>
				</el-form-item>
				<el-form-item label="设备说明" prop="mark">
					<el-input v-model="infoList.mark" placeholder="请输入设备说明"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="edit">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
		<el-dialog title="设备信息" :visible.sync="dialogTableVisible1">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入设备名称"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="addForm.model" placeholder="请输入设备型号"></el-input>
				</el-form-item>
				<el-form-item label="设备数量" prop="num">
					<el-input v-model="addForm.num" placeholder="请输入设备数量"></el-input>
				</el-form-item>
				<el-form-item label="采购时间" prop="beDate">
					<el-date-picker v-model="addForm.beDate" type="date" placeholder="请选择工作日期" style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="购买人" prop="inName">
					<el-input v-model="addForm.inName" placeholder="请输入购买人"></el-input>
				</el-form-item>
				<el-form-item label="设备说明" prop="mark">
					<el-input v-model="addForm.mark" placeholder="请输入设备说明"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="add">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios";
	import moment from 'moment';
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					name: '',
					beDate: '',
					model: '',
					inName: ''
				},
				typeList: [{
				}],
				infoList: {
					name: '',
					model: '',
					num: '',
					beDate: '',
					mark: '',
					inName:''
				},
				addForm: {
					name: '',
					model: '',
					num: '',
					beDate: '',
					mark: '',
					inName:''
				},
				json_fields: {
								设备名称: "name",
								设备数量: "num",
								采购时间: "beDate",
								设备型号: "model",
								设备说明: "mark"
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
					inName: [{
						required: true,
						message: '请输入购买人',
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
				},
				addFormRules: {
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
					inName: [{
						required: true,
						message: '请输入购买人',
						trigger: 'blur'
					}, ],
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
			this.getEquipList();
		},
		methods: {
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
				this.dialogTableVisible1=false;
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			add() {
					  if (
					  	this.addForm.name == "" ||
					  	this.addForm.model == "" ||
					  	this.addForm.num == "" ||
					  	this.addForm.beDate == "" ||
					  	this.addForm.mark == ""
					  ) {
					  	this.$message({
					  		message: "必填项不能为空！",
					  		type: "error",
					  	});
					  } else {
				request({
					url: "http://127.0.0.1:10520/api/admin/addEqu",
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
				this.dialogTableVisible1=false;
				this.getEquipList();
			},
			handleEdit(index, row) {
				this.dialogTableVisible = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateEqu",
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
			getEquipList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getEquipList", {

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
					this.getEquipList();
			},

			// 删除设备信息
			deleteEqu(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteEqu",
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
							this.getEquipList();
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
<style>
	.winClass{
		width: 500px;
	}
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
		/* margin-left: 50%; */
	}
</style>
