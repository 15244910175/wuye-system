<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>保安管理</el-breadcrumb-item>
			<el-breadcrumb-item>查看保安排班记录</el-breadcrumb-item>
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
							name="保安排班信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="序号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="保安姓名" align="center">
				</el-table-column>
				<el-table-column prop="startTime" label="上班时间" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="endTime" label="下班时间" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="具体操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deletePb(scope.row.id)">删除</a>
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

		<el-dialog title="编辑保安排班信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="保安姓名" prop="name">
					<el-input v-model="infoList.name" placeholder="请输入保安姓名"></el-input>
				</el-form-item>
				<el-form-item label="上班时间" prop="startTime">
					<el-date-picker v-model="infoList.startTime" type="datetime" placeholder="请选择工作日期"
						style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="下班时间" prop="endTime">
					<el-date-picker v-model="infoList.endTime" type="datetime" placeholder="请选择工作日期" style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="edit">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
		<el-dialog title="新增保安排班信息" :visible.sync="dialogTableVisible1">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="保安姓名" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入保安姓名"></el-input>
				</el-form-item>
				<el-form-item label="上班时间" prop="startTime">
					<el-date-picker v-model="addForm.startTime" type="datetime" placeholder="请选择工作日期"
						style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="下班时间" prop="endTime">
					<el-date-picker v-model="addForm.endTime" type="datetime" placeholder="请选择工作日期" style="width:100%">
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
					name: '',
				},
				typeList: [{
					name: '',
					startTime: '',
					endTime: '',
				}],
				infoList: {
					name: '',
					startTime: '',
					endTime: '',
				},
				addForm:{
					name: '',
					startTime: '',
					endTime: '',
				},
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
				json_fields: {
								保安姓名: "name",
								上班时间: "startTime",
								下班时间: "endTime"
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
					startTime: [{
						required: true,
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
					endTime: [{
						required: true,
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
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
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
					endTime: [{
						required: true,
						message: '请选择工作开始时间',
						trigger: 'blur'
					}, ],
				}
			}
		},
		created() {
			this.getBAaScList();
		},
		methods: {
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD hh:mm:ss")
			
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
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/admin/queryPa",{
					params:{
						name:this.formInline.name,
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
			add() {
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
				  this.getBAaScList();
				  this.dialogTableVisible1=false;
			    },
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updatePb",
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
			getBAaScList() {
				var self = this;
				//登陆成功之后get获取接口数据
				axios
					.post("http://127.0.0.1:10520/api/admin/getBAaScList", {
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
					this.getBAaScList();
			},
			// 删除保安排班
			deletePb(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deletePb",
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
							this.getBAaScList();
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
