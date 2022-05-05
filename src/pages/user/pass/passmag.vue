<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>快递管理</el-breadcrumb-item>
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
						<el-button size="mini" type="primary" class="el-icon-search" @click="searchTab">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="快递公司编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="快递公司名称" align="center">
				</el-table-column>
				<el-table-column prop="username" label="负责人" align="center">
				</el-table-column>
				<el-table-column prop="tel" label="联系电话" align="center">
				</el-table-column>
				<el-table-column prop="address" label="快递公司地址" align="center">
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
	export default {
		data() {
			return {
				formInline: {
					name: '',
				},
				typeList: [],
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
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/user/queryPassMag",{
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
	.page {
		width: 30%;
		margin: auto;
		margin-top: 50px;
	}
</style>
