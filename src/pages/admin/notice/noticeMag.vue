<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>公告管理</el-breadcrumb-item>
			<el-breadcrumb-item>公告信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="发布时间">
						<el-date-picker size="mini" v-model="formInline.time" placeholder="选择公告发布时间"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible=true">新增公告</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="公告信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="公告编号" width="150">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="title" label="公告标题" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="content" label="公告内容" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="time" label="发布时间" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="name" label="发布人">
				</el-table-column>
				<el-table-column label="具体操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteNotice(scope.row.id)">删除</a>
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
		
		<el-dialog title="新增公告信息" :visible.sync="dialogTableVisible">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="addForm.content" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="add">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
		<el-dialog title="编辑公告信息" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="infoList.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="infoList.content" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="edit">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios";
	import moment from 'moment';
	import request from "../../../utils/request.js"
	import {
		formatDate
	} from "../../../utils/format.js"
	export default {
		data() {
			return {
				json_fields: {
								公告标题: "title",
								公告内容: "content",
								发布时间: "time",
								发布人: "name"
							 },
				json_meta: [
							[
							{
								key: "charset",
								value: "utf-8"
							}
							]
							],
				formInline:{
					time:'',
				},
				addForm:{
					title:'',
					content:'',
					time:'',
					name:'管理处'
				},
				infoList:{
					title:'',
					content:'',
					time:''
				},
				addFormRules: {
					title: [{
						required: true,
						message: '请输入公告标题',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入公告内容',
						trigger: 'blur'
					}, ],
					},
					infoListRules: {
						title: [{
							required: true,
							message: '请输入公告标题',
							trigger: 'blur'
						}],
						content: [{
							required: true,
							message: '请输入公告内容',
							trigger: 'blur'
						}, ],
						},
				typeList:[],
				dialogTableVisible:false,
				dialogTableVisible1:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
			}
		},
		created() {
			this.getNoticeList()
		},
		methods:{
			// 时间格式化
			dateFormat: function(row, column) {
			
				var date = row[column.property];
			
				if (date == undefined) {
					return ''
				};
			
				return moment(date).format("YYYY-MM-DD hh:mm:ss")
			
			},
			resetForm() {
				this.formInline = {};
					this.getNoticeList();
			},
			getNoticeList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getNoticeList", {
			
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
			// 新增公告信息
			add() {
				this.addForm.time = formatDate(new Date());
				// this.title=this.title;
				// this.typeId = this.uuid();
				const params = {
					title:this.addForm.title,
					content:this.addForm.content,
					time:this.addForm.time,
					name:this.addForm.name
				};
				if (
					this.addForm.title == "" ||
					this.addForm.content == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
				request({
					url: "http://127.0.0.1:10520/api/admin/addNotice",
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
				this.dialogTableVisible=false;
				this.getNoticeList();
			},
			
			handleEdit(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateNotice",
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
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
				this.dialogTableVisible1=false;
			},
			// 删除公告信息
			deleteNotice(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteNotice",
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
							this.getNoticeList();
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
	.page {
		width: 30%;
		margin: auto;
		margin-top: 50px;
	}
</style>
