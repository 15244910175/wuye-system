<template>
	<div>

		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>房产管理</el-breadcrumb-item>
			</el-breadcrumb-item>
			<el-breadcrumb-item>房产管理信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="房号">
						<el-input size="mini" v-model="formInline.rNo" placeholder="输入房号"></el-input>
					</el-form-item>
					<el-form-item label="房型名称">
						<el-input size="mini" v-model="formInline.name" placeholder="输入房型名称"></el-input>
					</el-form-item>
					<el-form-item label="出售状况">
						<el-input size="mini" v-model="formInline.sale_status" placeholder="输入出售状况" ></el-input>
					</el-form-item>

					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search" @click="searchTab">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="房产管理信息.xls">
							<!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
							<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="房产编号" align="center" width="120">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<!-- <el-table-column prop="id" label="住户id">
				</el-table-column> -->
				<el-table-column prop="rNo" label="房号" align="center">
				</el-table-column>
				<el-table-column prop="buildArea" label="建筑面积(平方米)" align="center">
				</el-table-column>
				<el-table-column prop="ableArea" label="使用面积(平方米)" align="center">
				</el-table-column>
				<el-table-column prop="name" label="房型名称" align="center">
				</el-table-column>
				<el-table-column prop="sale_status" label="出售状况" align="center">
				</el-table-column>
				<el-table-column prop="own_status" label="产权状况" align="center">
				</el-table-column>
				<el-table-column label="具体操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-edit">
							<a @click="handleEdit(scope.$index, scope.row)">编辑</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteHouseMag(scope.row.id)">删除</a>
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

		<el-dialog title="新增房产信息" :visible.sync="dialogTableVisible">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="addForm.rNo" placeholder="请输入房号"></el-input>
				</el-form-item>
				<el-form-item label="建筑面积" prop="buildArea">
					<el-input v-model="addForm.buildArea" placeholder="请输入建筑面积"></el-input>
				</el-form-item>
				<el-form-item label="使用面积" prop="ableArea">
					<el-input v-model="addForm.ableArea" placeholder="请输入如使用面积"></el-input>
				</el-form-item>
				<el-form-item label="房型名称" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入房型名称"></el-input>
				</el-form-item>
				<el-form-item label="出售状况" prop="sale_status">
					<el-input v-model="addForm.sale_status" placeholder="请输入出售状况"></el-input>
				</el-form-item>
				<el-form-item label="产权状况" prop="own_status">
					<el-input v-model="addForm.own_status" placeholder="请输入产权状况"></el-input>
				</el-form-item>
				<el-button type="primary" style="margin-left: 40%;" @click="add">保存</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>

		<el-dialog title="编辑房产信息" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
				<el-form-item label="房号" prop="rNo">
					<el-input v-model="infoList.rNo" placeholder="请输入房号"></el-input>
				</el-form-item>
				<el-form-item label="建筑面积" prop="buildArea">
					<el-input v-model="infoList.buildArea" placeholder="请输入建筑面积"></el-input>
				</el-form-item>
				<el-form-item label="使用面积" prop="ableArea">
					<el-input v-model="infoList.ableArea" placeholder="请输入使用面积"></el-input>
				</el-form-item>
				<el-form-item label="房型名称" prop="name">
					<el-input v-model="infoList.name" placeholder="请输入房型名称"></el-input>
				</el-form-item>
				<el-form-item label="出售状况" prop="sale_status">
					<el-input v-model="infoList.sale_status" placeholder="请输入出售状况"></el-input>
				</el-form-item>
				<el-form-item label="产权状况" prop="own_status">
					<el-input v-model="infoList.own_status" placeholder="请输入产权状况"></el-input>
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
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					rNo: '',
					name: '',
					sale_status: ''
				},
				addForm: {
					rNo: '',
					buildArea: '',
					ableArea: '',
					name: '',
					sale_status: '',
					own_status: ''
				},
				infoList: {
					rNo: '',
					buildArea: '',
					ableArea: '',
					name: '',
					sale_status: '',
					own_status: ''
				},
				addFormRules: {
					name: [{
						required: true,
						message: '请输入房型名称',
						trigger: 'blur'
					}],
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
					buildArea: [{
						required: true,
						message: '请输入建筑面积',
						trigger: 'blur'
					}, ],
					ableArea: [{
						required: true,
						message: '请输入使用面积',
						trigger: 'blur'
					}, ],
					sale_status: [{
						required: true,
						message: '请输入出售状况',
						trigger: 'blur'
					}, ],
					own_status: [{
						required: true,
						message: '请输入产权状况',
						trigger: 'blur'
					}, ],
				},
				infoListRules: {
					name: [{
						required: true,
						message: '请输入房型名称',
						trigger: 'blur'
					}],
					rNo: [{
						required: true,
						message: '请输入房号',
						trigger: 'blur'
					}, ],
					buildArea: [{
						required: true,
						message: '请输入建筑面积',
						trigger: 'blur'
					}, ],
					ableArea: [{
						required: true,
						message: '请输入使用面积',
						trigger: 'blur'
					}, ],
					sale_status: [{
						required: true,
						message: '请输入出售状况',
						trigger: 'blur'
					}, ],
					own_status: [{
						required: true,
						message: '请输入产权状况',
						trigger: 'blur'
					}, ],
				},
				json_fields: {
					房号: "rNo",
					建筑面积: "buildArea",
					使用面积: "ableArea",
					房型名称: "name",
					出售状况: "sale_status",
					产权状况: "own_status"
				},
				json_meta: [
					[{
						key: "charset",
						value: "utf-8"
					}]
				],
				typeList: [],
				dialogTableVisible: false,
				dialogTableVisible1: false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 8 //默认第一页展示10条
			}
		},
		created() {
			this.getHouseMagList()
		},
		mounted() {
			this.searchTab()
		},
		methods: {
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/admin/queryHouseMag",{
					params:{
						rNo:this.formInline.rNo,
						name:this.formInline.name,
						sale_status:this.formInline.sale_status
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
			// 查询房产信息
			getHouseMagList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getHouseMagList", {

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
					this.getHouseMagList();
			},
			// 新增住户信息
			add() {
				if (
					this.addForm.rNo == "" ||
					this.addForm.buildArea == "" ||
					this.addForm.ableArea == "" ||
					this.addForm.sale_status == "" ||
					this.addForm.own_status == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addHouseMag",
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
				this.getHouseMagList();
			},
			handleEdit(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateHouseMag",
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
			goBack() {
				// router.push("check-admin");
				this.dialogTableVisible = false;
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
			},
			// 删除住户信息
			deleteHouseMag(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteHouseMag",
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
							this.getHouseMagList();
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
	
	.page {
		width: 30%;
		margin: auto;
		margin-top: 50px;
	}
</style>
