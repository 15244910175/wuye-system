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
					
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="公告编号" width="150">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="title" label="公告标题" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="公告内容" show-overflow-tooltip >
				 <template slot-scope="scope">
				    <p @click="detail(scope.row)">{{scope.row.content}}</p>
				  </template>
				</el-table-column>
				<el-table-column prop="time" label="发布时间" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="name" label="发布人">
				</el-table-column>
				
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize"
					layout=" total,prev, pager, next, sizes, jumper" :total="typeList.length">
				</el-pagination>
			</div>
			
		</div>
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
				formInline:{
					time:'',
				},
				typeList:[],
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
			}
		},
		created() {
			this.getNoticeList()
		},
		methods:{
			    detail(row) {
			      //查看详情
			      this.$router.push({ path: "main/" + row.id });
			    },
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
