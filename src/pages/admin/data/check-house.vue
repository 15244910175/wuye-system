<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户资料管理</el-breadcrumb-item>
			</el-breadcrumb-item>
			<el-breadcrumb-item>查看住户资料信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="住户房号">
						<el-input size="mini" v-model="formInline.rNo" placeholder="输入住户房号"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search" @click="searchTab">查询</el-button>
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
							name="住户资料.xls">
							<!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
							<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>


				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="住户编号" align="center" width="120">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="rNo" label="房号" align="center" width="120">
				</el-table-column>
				<el-table-column prop="username" label="住户姓名" align="center" width="120">
				</el-table-column>
				<el-table-column prop="telephone" label="住户电话" align="center">
				</el-table-column>
				<el-table-column prop="persionNo" label="住户身份证" align="center">
				</el-table-column>
				<el-table-column prop="sex" label="住户性别" align="center" width="120">
				</el-table-column>
				<el-table-column prop="date" label="借租时间" :formatter="dateFormat" align="center" width="120">
				</el-table-column>
				<el-table-column prop="dateDue" label="到期时间" :formatter="dateFormat" align="center" width="120">
				</el-table-column>
				<el-table-column label="具体操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteHouse(scope.row.id)">删除</a>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[8,16,24,32]" :page-size="pagesize"
					layout="total, prev, pager, next, sizes, jumper" :total="typeList.length">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="编辑住户信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="infoList.rNo" placeholder="请输入房号"></el-input>
				</el-form-item>
				<el-form-item label="住户姓名" prop="username">
					<el-input v-model="infoList.username" placeholder="请输入住户姓名"></el-input>
				</el-form-item>
				<el-form-item label="住户身份证" prop="persionNo">
					<el-input v-model="infoList.persionNo" placeholder="请输入住户身份证"></el-input>
				</el-form-item>
				<el-form-item label="住户性别" prop="sex">
					<el-select v-model="infoList.sex" placeholder="请选择性别" style="width:100%">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="住户电话" prop="telephone">
					<el-input v-model="infoList.telephone" placeholder="请输入电话号码"></el-input>
				</el-form-item>
				<el-form-item label="借租时间" prop="date">
					<el-date-picker v-model="infoList.date" type="date" placeholder="请选择住户入住时间" style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="到期时间" prop="dateDue">
					<el-date-picker v-model="infoList.dateDue" type="date" placeholder="请选择住户入住时间" style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="edit">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>

		<el-dialog title="新增住户信息" :visible.sync="dialogTableVisible1">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="addForm.rNo" placeholder="请输入房号"></el-input>
				</el-form-item>
				<el-form-item label="住户姓名" prop="username">
					<el-input v-model="addForm.username" placeholder="请输入住户姓名"></el-input>
				</el-form-item>
				<el-form-item label="住户身份证" prop="persionNo">
					<el-input v-model="addForm.persionNo" placeholder="请输入住户身份证"></el-input>
				</el-form-item>
				<el-form-item label="住户性别" prop="sex">
					<el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="住户电话" prop="telephone">
					<el-input v-model="addForm.telephone" placeholder="请输入住户电话"></el-input>
				</el-form-item>
				<el-form-item label="借租时间" prop="date">
					<el-date-picker v-model="addForm.date" type="date" placeholder="请选择住户入住时间" style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="到期时间" prop="dateDue">
					<el-date-picker v-model="addForm.dateDue" type="date" placeholder="请选择住户入住时间" style="width: 100%;">
					</el-date-picker>
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
					rNo: '',
				},
				typeList: [{
					username: '',
					telephone: '',
					persionNo: '',
					rNo: '',
					sex: '',
					date: '',
					id: ''
				}, ],
				infoList: {
					username: '',
					rNo: '',
					persionNo: '',
					sex: '',
					telephone: '',
					date: '',
					dateDue: ''
				},
				addForm: {
					username: '',
					rNo: '',
					persionNo: '',
					sex: '',
					telephone: '',
					date: '',
					dateDue: ''
				},
				infoListRules: {
					username: [{
						required: true,
						message: '请输入住户名称',
						trigger: 'blur'
					}],
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
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
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}, ],
					telephone: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}, ],
					dateDue: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}, ],
				},
				addFormRules: {
					username: [{
						required: true,
						message: '请输入住户名称',
						trigger: 'blur'
					}],
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
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
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}, ],
					telephone: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}, ],
					dateDue: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}, ],
				},
				json_fields: {
					房号: "rNo",
					住户姓名: "username",
					住户电话: "telephone",
					住户身份证: "persionNo",
					住户性别: "sex",
					住户入住时间: "date"
				},
				json_meta: [
					[{
						key: "charset",
						value: "utf-8"
					}]
				],

				dialogTableVisible: false,
				dialogTableVisible1: false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 8 //默认第一页展示10条
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/admin/queryData",{
					params:{
						rNo:this.formInline.rNo
					}
				})
				.then(function(res){
					console.log(res);
					if(res.data.msg==="查询成功"){
						self.$message.success("查询成功！");
						self.typeList=res.data.list;
						self.total = res.data.list.length;
					}
					
				})
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
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			handleEdit(index, row) {
				this.dialogTableVisible = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateData",
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

			// 查询住户信息
			getUserList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getUserList")
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("获取数据");
							self.$message.success("数据已获取到！");
						}
						self.typeList = res.data.list;
						console.log(res);
					})
			},
			resetForm() {
				this.formInline = {},
					this.getUserList();
			},

			queryInfo() {
				if (
					this.formInline.rNo == "" ||
					this.formInline.date == ""
				) {
					this.$message({
						message: "参数不能为空！",
						type: "error",
					});
				} else {
					axios
						.get("http://127.0.0.1:10520/api/admin/search", {
							rNo: this.formInline.rNo,
							date: this.formInline.date,
						})
						.then((res) => {
							console.log(res);
						});
				}
			},

			// 新增住户信息
			add() {
				if (
					this.addForm.username == "" ||
					this.addForm.rNo == "" ||
					this.addForm.sex == "" ||
					this.addForm.telephone == "" ||
					this.addForm.persionNo == "" ||
					this.addForm.date == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addData",
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
				this.dialogTableVisible1 = false;
				this.getUserList();
				// this.$refs[addForm].resetFields();
			},
			// 删除住户信息
			deleteHouse(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteHouse",
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
							this.getUserList();
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

	.el-button {
		/* text-align: center; */
	}

	.el-table-column {
		/* width: 100px; */
		/* text-align: center; */
	}

	.winClass {
		font-size: 40px;
		width: 500px;
	}
</style>
