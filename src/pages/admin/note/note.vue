<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>留言管理</el-breadcrumb-item>
			<el-breadcrumb-item>留言信息查看管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="留言标题">
						<el-input size="mini" v-model="formInline.title" placeholder="输入标题"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="留言信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="留言信息编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" align="center">
				</el-table-column>
				<el-table-column prop="mark" label="留言内容" align="center">
				</el-table-column>
				<el-table-column prop="leaverName" label="留言者" align="center">
				</el-table-column>
				<el-table-column prop="time" label="留言时间" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="具体操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-chat-line-square">
							<a @click="handleEdit(scope.$index, scope.row)">管理员回复</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteNote(scope.row.id)">删除</a>
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

		<el-dialog title="信息回复" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">

				<el-form-item label="标题" prop="title">
					<el-input v-model="infoList.title" disabled></el-input>
				</el-form-item>
				<el-form-item label="留言者" prop="leaverName">
					<el-input v-model="infoList.leaverName" disabled></el-input>
				</el-form-item>
				<el-form-item label="投诉/留言内容" prop="mark">
					<el-input v-model="infoList.mark" disabled></el-input>
				</el-form-item>
				<el-form-item label="投诉/留言时间" prop="time">
					<el-input v-model="infoList.time" disabled></el-input>
				</el-form-item>
				<el-form-item label="管理员回复" prop="answerContent">
					<el-input type="textarea" v-model="infoList.answerContent"></el-input>
				</el-form-item>

				<el-button type="primary" @click="save" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from "axios";
	import request from "../../../utils/request.js"
	import {
		formatDate
	} from "../../../utils/format.js"
	export default {
		data() {
			return {
				formInline: {
					title: '',
				},
				typeList: [{
					title: '',
					mark: '',
					leaverName: '',
					time: '',
				}],
				infoList: {
					title: '',
					mark: '',
					leaverName: '',
					time: '',
					answerContent: '',
					reDate:''
				},
				json_fields: {
								标题: "title",
								留言内容: "mark",
								留言者: "leaverName",
								留言时间: "time"
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
				infoListRules: {
					answerContent: [{
						required: true,
						message: '请输入回复内容',
						trigger: 'blur'
					}],

				}
			}
		},
		created() {
			this.getNoteList();
		},
		methods: {
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			handleEdit(index, row) {
				this.dialogTableVisible = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			save() {
				this.infoList.reDate=formatDate(new Date());
				const params = {
					beDate: this.infoList.beDate,
				};
				request({
					url: "http://127.0.0.1:10520/api/admin/updateNote",
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
			// 时间格式化
			dateFormat: function(row, column) {

				var date = row[column.property];

				if (date == undefined) {
					return ''
				};

				return moment(date).format("YYYY-MM-DD HH:mm:ss")

			},
			getNoteList() {
				var self = this;
				//登陆成功之后get获取接口数据
				axios
					.post("http://127.0.0.1:10520/api/admin/getNoteList", {
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
					this.getNoteList();
			},
			// 删除留言信息
			deleteNote(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteNote",
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
							this.getNoteList();
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
