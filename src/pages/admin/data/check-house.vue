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
					<el-form-item label="住户姓名">
						<el-input size="mini" v-model="formInline.username" placeholder="输入住户姓名"></el-input>
					</el-form-item>
					<el-form-item label="住户电话">
						<el-input size="mini" v-model="formInline.telephone" placeholder="输入住户电话"></el-input>
					</el-form-item>
					<el-form-item label="住户身份证">
						<el-input size="mini" v-model="formInline.persionNo" placeholder="输入住户身份证"></el-input>
					</el-form-item>
					<el-form-item label="住户地址">
						<el-input size="mini" v-model="formInline.address" placeholder="输入住户地址"></el-input>
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
				<!-- <el-table-column prop="id" label="住户id">
				</el-table-column> -->
				<el-table-column prop="username" label="住户姓名">
				</el-table-column>
				<el-table-column prop="telephone" label="住户电话">
				</el-table-column>
				<el-table-column prop="persionNo" label="住户身份证">
				</el-table-column>
				<el-table-column prop="address" label="住户地址">
				</el-table-column>
				<el-table-column prop="sex" label="住户性别">
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
					layout=" prev, pager, next, sizes, jumper" :total="typeList.length">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="住户信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="住户姓名" prop="username">
					<el-input v-model="infoList.username"></el-input>
				</el-form-item>
				<el-form-item label="住户密码" prop="password">
					<el-input v-model="infoList.password"></el-input>
				</el-form-item>
				<el-form-item label="住户身份证" prop="persionNo">
					<el-input v-model="infoList.persionNo"></el-input>
				</el-form-item>
				<el-form-item label="住户性别" prop="sex">
					<el-select v-model="infoList.sex" placeholder="请选择性别" style="width:100%">
						<el-option label="男" value="nan"></el-option>
						<el-option label="女" value="nv"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="住户电话" prop="telephone">
					<el-input v-model="infoList.telephone"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="infoList.address"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="save">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import axios from "axios";
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					username: '',
					telephone: '',
					persionNo: '',
					address: '',
				},
				typeList: [{
					username: '',
					telephone: '',
					persionNo: '',
					address: '',
					sex: '',
					id: ''
				}, ],
				infoList: {
					username: '',
					password: '',
					persionNo: '',
					sex: '',
					telephone: '',
					address: ''
				},
				infoListRules: {
					username: [{
						required: true,
						message: '请输入住户名称',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
					persionNO: [{
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
						},
						{
							type: 'number',
							message: '数量必须为数字',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入住户地址',
						trigger: 'blur'
					}, ],
				},
				dialogTableVisible: false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getUserList()
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
				axios.post("http://127.0.0.1:10520/api/admin/getUserList", {

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
					this.getUserList();
			},
			// 删除住户信息
			deleteHouse(id) {
				request({
					url: "http://127.0.0.1:10520/api/admin/deleteHouse",
					method: "post",
					data: {
						id: id
					}
				}).then(res => {
					console.log(res);
					if (res.msg === "删除成功") {
						this.$message({
							message: "删除成功！",
							type: "success"
						});
						this.getUserList();
					} else {
						this.$message({
							message: '删除失败！',
							type: "danger"
						})
					}
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
		/* width: 150px; */
	}
</style>
