<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户资料管理</el-breadcrumb-item>
			</el-breadcrumb-item>
			<el-breadcrumb-item>产权变更管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="现房主">
						<el-input size="mini" v-model="formInline.nowOwner" placeholder="请输入现房主"></el-input>
					</el-form-item>
					<el-form-item label="变更时间">
						<el-date-picker type="date" size="mini" v-model="formInline.changedate" placeholder="选择变更时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
					<download-excel
					    class = "export-excel-wrapper"
					    :data = "typeList"
					    :fields = "json_fields"
					    name = "产权变更信息.xls">
					    <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
					    <el-button type="primary" size="small">导出EXCEL</el-button>
					</download-excel>
					</el-form-item>
					
				</el-form>
			</div>
				<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
					<el-table-column label="产权变更编号" width="150">
						<template slot-scope="scope">{{scope.$index+1}}</template>
					</el-table-column>
					<el-table-column prop="rNo" label="房号">
					</el-table-column>
					<el-table-column prop="oldOwner" label="原房主">
					</el-table-column>
					<el-table-column prop="nowOwner" label="现房主">
					</el-table-column>
					<el-table-column prop="changedate" label="变更时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column label="具体操作">
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
						:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize"
						layout="total, prev, pager, next, sizes, jumper" :total="typeList.length">
					</el-pagination>
				</div>

		</div>

		<el-dialog title="产权变更信息" :visible.sync="dialogTableVisible">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="addForm.rNo"></el-input>
				</el-form-item>
				<el-form-item label="原房主" prop="oldOwner">
					<el-input v-model="addForm.oldOwner"></el-input>
				</el-form-item>
				<el-form-item label="现房主" prop="nowOwner">
					<el-input v-model="addForm.nowOwner"></el-input>
				</el-form-item>
				<el-form-item label="产权变更时间" prop="changedate">
					<el-date-picker v-model="addForm.changedate" type="date"></el-date-picker>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="add">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		<el-dialog title="产权变更管理" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="infoList.rNo"></el-input>
				</el-form-item>
				<el-form-item label="原房主" prop="oldOwner">
					<el-input v-model="infoList.oldOwner"></el-input>
				</el-form-item>
				<el-form-item label="现房主" prop="nowOwner">
					<el-input v-model="infoList.nowOwner"></el-input>
				</el-form-item>
				<el-form-item label="变更时间" prop="changedate">
					<el-date-picker v-model="infoList.changedate" type="date"></el-date-picker>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="edit">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import request from "../../../utils/request.js"
	import axios from "axios";
	import moment from 'moment';
	// import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					nowOwner: '',
					changedate: ''
				},
				typeList: [],
				addForm: {
					rNo: '',
					oldOwner: '',
					nowOwner: '',
					changedate: ''
				},
				infoList: {
					rNo: '',
					oldOwner: '',
					nowOwner: '',
					changedate: ''
				},
				addFormRules: {
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
					oldOwner: [{
						required: true,
						message: '请输入原房主',
						trigger: 'blur'
					}, ],
					nowOwner: [{
						required: true,
						message: '请输入现房主',
						trigger: 'blur'
					}, ],
					changedate: [{
						required: true,
						message: '请选择产权变更时间',
						trigger: 'blur'
					}, ],
				},
				infoListRules: {
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
					oldOwner: [{
						required: true,
						message: '请输入原房主',
						trigger: 'blur'
					}, ],
					nowOwner: [{
						required: true,
						message: '请输入现房主',
						trigger: 'blur'
					}, ],
					changedate: [{
						required: true,
						message: '请选择产权变更时间',
						trigger: 'blur'
					}, ],
				},
				json_fields: {
				        房号: "rNo",
				        原房主: "oldOwner",
				        现房主: "nowOwner",
				        变更时间: "changedate"
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
				dialogTableVisible1:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getHchangeList()
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
			getHchangeList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getHchangeList", {

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
			// 新增产权变更信息
			add() {
				if (
					this.addForm.rNo == "" ||
					this.addForm.oldOwner == "" ||
					this.addForm.nowOwner == "" ||
					this.addForm.changedate == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addHchange",
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
				this.dialogTableVisible = false;
				this.getHchangeList();
			},
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
				this.dialogTableVisible1=false;
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			resetForm() {
				this.formInline = {},
					this.getHchangeList();
			},
		handleEdit(index, row) {
			this.dialogTableVisible1 = true;
			console.log(index, row)
			//row是该行tableData对应的一行
			this.infoList = row
		},
		edit() {
			request({
				url: "http://127.0.0.1:10520/api/admin/updateHchange",
				method: "post",
				data: this.infoList
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
		// 删除产权变更信息
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
						url: "http://127.0.0.1:10520/api/admin/deleteHchange",
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
						this.getHchangeList();
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
		/* margin-left: 50%; */
	}

	.page {
		width: 30%;
		margin: auto;
		margin-top: 50px;
	}
</style>
