<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>小区快递管理</el-breadcrumb-item>
			</el-breadcrumb-item>
			<el-breadcrumb-item>快递公司管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="快递公司名称">
						<el-input size="mini" v-model="formInline.name" placeholder="请输入快递公司名称"></el-input>
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
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="快递公司编号" width="150">
					<template slot-scope="scope">{{0}}{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="快递公司名称">
				</el-table-column>
				<el-table-column prop="username" label="负责人">
				</el-table-column>
				<el-table-column prop="tel" label="联系电话">
				</el-table-column>
				<el-table-column prop="address" label="快递公司地址">
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

		<el-dialog title="快递公司管理信息" :visible.sync="dialogTableVisible">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="快递公司名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="addForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="快递公司地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="add">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		<el-dialog title="快递公司管理信息" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="快递公司名称" prop="name">
					<el-input v-model="infoList.name"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="username">
					<el-input v-model="infoList.username"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="infoList.tel"></el-input>
				</el-form-item>
				<el-form-item label="快递公司地址" prop="address">
					<el-input v-model="infoList.address"></el-input>
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
	export default {
		data() {
			return {
				formInline: {
					name: '',
				},
				typeList: [],
				addForm: {
					name: '',
					username: '',
					tel: '',
					address: ''
				},
				infoList: {
					name: '',
					username: '',
					tel: '',
					address: '',
				},
				addFormRules: {
					name: [{
						required: true,
						message: '请输入快递名称',
						trigger: 'blur'
					}, ],
					username: [{
						required: true,
						message: '请输入快递负责人',
						trigger: 'blur'
					}, ],
					tel: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: '请输入快递公司地址',
						trigger: 'blur'
					}, ],
				},
				infoListRules: {
					name: [{
						required: true,
						message: '请输入快递名称',
						trigger: 'blur'
					}, ],
					username: [{
						required: true,
						message: '请输入快递负责人',
						trigger: 'blur'
					}, ],
					tel: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: '请输入快递公司地址',
						trigger: 'blur'
					}, ],
				},
				dialogTableVisible: false,
				dialogTableVisible1:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getPassMagList()
		},
		methods: {
			resetForm() {
				this.formInline = {}
				this.getPassMagList();
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			getPassMagList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getPassMagList", {

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
			add() {
				if (
					this.addForm.name == "" ||
					this.addForm.username == "" ||
					this.addForm.tel == "" ||
					this.addForm.address == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addPassMag",
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
				this.getPassMagList();
			},
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
				this.dialogTableVisible1 = false;
			},
			// 删除快递公司管理信息 
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
							url: "http://127.0.0.1:10520/api/admin/deletePassMag",
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
							this.getPassMagList();
						})
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '删除失败',
						})
					});
			},
			handleEdit(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updatePassMag",
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
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
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
