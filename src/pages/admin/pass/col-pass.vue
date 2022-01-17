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
					<el-form-item label="收货人">
						<el-input size="mini" v-model="formInline.name" placeholder="请输入收货人"></el-input>
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
				<el-table-column label="收货编号" width="150">
					<template slot-scope="scope">{{0}}{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="快递公司名称">
				</el-table-column>
				<el-table-column prop="username" label="收货人">
				</el-table-column>
				<el-table-column prop="tel" label="联系电话">
				</el-table-column>
				<el-table-column prop="address" label="收货地址">
				</el-table-column>
				<el-table-column prop="date" label="代收货日期">
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
	</div>
</template>

<script>
	import request from "../../../utils/request.js"
	import axios from "axios";
	export default {
		data() {
			return {
				formInline: {
					username: '',
				},
				typeList: [],
				dialogTableVisible: false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getColpassList()
		},
		methods: {
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
