<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>小区快递管理</el-breadcrumb-item>
			</el-breadcrumb-item>
			<el-breadcrumb-item>代收快递信息管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="收货日期">
						<el-date-picker v-model="formInline.alreadyDate" type="date" placeholder="请选择收货日期"></el-date-picker>
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
				<el-table-column label="收货编号" width="150">
					<template slot-scope="scope">{{0}}{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="快递公司名称">
				</el-table-column>
				<el-table-column prop="address" label="收货地址">
				</el-table-column>
				<el-table-column prop="date" label="代收货日期" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="alreadyDate" label="收货日期" :formatter="dateFormat">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize"
					layout="total, prev, pager, next, sizes, jumper" :total="typeList.length">
				</el-pagination>
			</div>
		</div>
		
	</div>
</template>

<script>
	import request from "../../../utils/request.js"
	import axios from "axios";
	import moment from 'moment';
	export default {
		data() {
			return {
				formInline: {
					alreadyDate:''
				},
				typeList: [],
				dialogTableVisible: false,
				dialogTableVisible1:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getColpassList()
		},
		methods: {
			dateFormat: function(row, column) {
			
				var date = row[column.property];
			
				if (date == undefined) {
					return ''
				};
			
				return moment(date).format("YYYY-MM-DD")
			
			},
			resetForm() {
				this.formInline = {}
				this.getColpassList();
			},
			getColpassList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getColpassList", {

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
			// 新增代收快递信息
			add() {
				if (
					this.addForm.name == "" ||
					this.addForm.username == "" ||
					this.addForm.tel == "" ||
					this.addForm.address == "" || 
					this.addForm.date == "" ||
					this.addForm.isreceive == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addColPass",
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
				this.getColpassList();
			},
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
				this.dialogTableVisible1=false;
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			handleEdit(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateColPass",
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
							url: "http://127.0.0.1:10520/api/admin/deleteColPass",
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
							this.getColpassList();
						})
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '删除失败',
						})
					});
			},
			
			resetForm1(infoList) {
				this.$refs[addForm].resetFields();
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
