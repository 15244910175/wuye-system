<template>
	<div>
		<!-- 根据区分投诉、留言 -->
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>留言管理</el-breadcrumb-item>
			<el-breadcrumb-item>投诉管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="标题">
						<el-input size="mini" v-model="formInline.title" placeholder="输入标题"></el-input>
					</el-form-item>
					<el-form-item label="留言内容">
						<el-input size="mini" v-model="formInline.mark" placeholder="输入留言内容"></el-input>
					</el-form-item>
					<el-form-item label="留言者">
						<el-input size="mini" v-model="formInline.leaverName" placeholder="输入留言者"></el-input>
					</el-form-item>
					<el-form-item label="参与时间">
						<el-date-picker size="mini" v-model="formInline.time" type="datetime" placeholder="选择时间"
							style="width:100%">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>

					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="序号" width="150">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column prop="mark" label="留言内容">
				</el-table-column>
				<el-table-column prop="leaverName" label="留言者">
				</el-table-column>
				<el-table-column prop="time" label="参与时间" :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="具体操作" width="400" style="text-align: center;">
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

				<el-form-item label="标题" prop="name">
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

				<el-button type="primary" @click="save()" style="margin-left: 40%;">保存</el-button>
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
	export default {
		data() {
			return {
				formInline: {
					title: '',
					mark: '',
					leaverName: '',
					time: '',
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
					answerContent: ''
				},
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
			this.getCptList();
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
				request({
					url: "http://127.0.0.1:10520/api/admin/updateCpt",
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
			getCptList() {
				var self = this;
				//登陆成功之后get获取接口数据
				axios
					.post("http://127.0.0.1:10520/api/admin/getCptList", {
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
					this.getCptList();
			},
			// 删除投诉信息
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
							this.getCptList();
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
	.t_box {
		height: 100%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.search {
		width: 100%;
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

	.el-input {
		width: 80%;
	}
</style>
