<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>保安管理</el-breadcrumb-item>
			<el-breadcrumb-item>查看保安信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="保安姓名">
						<el-input size="mini" v-model="formInline.name" placeholder="输入保安姓名"></el-input>
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
							name="保安信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="保安编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="保安姓名" align="center">
				</el-table-column>
				<el-table-column prop="persionNo" label="身份证号" align="center">
				</el-table-column>
				<el-table-column prop="sex" label="性别" align="center">
				</el-table-column>
				<el-table-column prop="begDate" label="工作开始日期" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="post" label="职务" align="center">
				</el-table-column>
				<el-table-column label="具体操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteBa(scope.row.id)">删除</a>
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

		<el-dialog title="编辑保安信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="infoList.name" placeholder="请输入保安姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="infoList.sex" placeholder="请选择性别" style="width:100%">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证" prop="persionNo">
					<el-input v-model="infoList.persionNo" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item label="职务" prop="post">
					<el-input v-model="infoList.post" placeholder="请输入职务"></el-input>
				</el-form-item>
				<el-form-item label="工作开始日期" prop="begDate">
					<el-date-picker v-model="infoList.begDate" type="date" placeholder="请选择工作日期" style="width:100%">
					</el-date-picker>
				</el-form-item>
			
				<el-button type="primary" style="margin-left: 40%;" @click="edit"> 保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		<el-dialog title="新增保安信息" :visible.sync="dialogTableVisible1">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入保安姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证" prop="persionNo">
					<el-input v-model="addForm.persionNo" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item label="职务" prop="post">
					<el-input v-model="addForm.post" placeholder="请输入职务"></el-input>
				</el-form-item>
				<el-form-item label="工作开始日期" prop="begDate">
					<el-date-picker v-model="addForm.begDate" type="date" placeholder="请选择工作日期" style="width:100%">
					</el-date-picker>
				</el-form-item>
				
				<el-button type="primary" style="margin-left: 40%;" @click="add"> 保存</el-button>
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
				},
				typeList: [],
				infoList: {
				    name:'',
					persionNo: '',
					sex: '',
					begDate: '',
					post: ''
				},
				addForm: {
				    name:'',
					persionNo: '',
					sex: '',
					begDate: '',
					post: ''
				},
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
				json_fields: {
								保安姓名: "name",
								身份证号: "persionNo",
								性别: "sex",
								工作开始日期: "begDate",
								职务: "post"
							 },
				json_meta: [
							[
							{
								key: "charset",
								value: "utf-8"
							}
							]
							],
				dialogTableVisible: false,
				dialogTableVisible1: false,
				infoListRules: {
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
					persionNo: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							min: 18,
							max: 18,
							message: '长度18为个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}, ],
					begDate: [{
						required: true,
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
					post: [{
							required: true,
							message: '请输入职务',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
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
					persionNo: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							min: 18,
							max: 18,
							message: '长度18为个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}, ],
					begDate: [{
						required: true,
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
					post: [{
							required: true,
							message: '请输入职务',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		created() {
			this.getBaList();
		},
		methods: {
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/admin/queryBA",{
					params:{
						name:this.formInline.name
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
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
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
			handleEdit(index, row) {
				this.dialogTableVisible = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateBa",
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
					this.addForm.name == "" ||
					this.addForm.persionNo == "" ||
					this.addForm.sex == "" ||
					this.addForm.begDate == "" ||
					this.addForm.post == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
				request({
					url: "http://127.0.0.1:10520/api/admin/addba",
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
				this.getBaList();
				this.dialogTableVisible1=false;
			},
			getBaList() {
				var self = this;
				//登陆成功之后get获取接口数据
				axios
					.post("http://127.0.0.1:10520/api/admin/getBaList", {
						//   params: {
						//     pageNum: 5,
						//     pageSize: 300
						//   }
					})
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("获取数据");
							self.$message.success("数据已获取到！");
						}
						self.typeList = res.data.list;
						// console.log(self.typeList);
						console.log(res);
					});
			},
			resetForm() {
				this.formInline = {},
					this.getBaList();
			},

			// 删除保安信息
			deleteBa(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteBa",
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
							this.getBaList();
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
	.winClass {
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
</style>
