<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户停车车位管理</el-breadcrumb-item>
			<el-breadcrumb-item>查看车位明细信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="车位总数">
						<el-input size="mini" v-model="formInline.num" placeholder="输入车位总数"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="序号" width="150">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="num" label="车位总数">
				</el-table-column>
				<el-table-column label="具体操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small">
							<a @click="dialogTableVisible = true">编辑</a>
						</el-button>
						<el-button type="danger" size="small">
							<a @click="dialogTableVisible = true">删除</a>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-size="pagesize" layout=" prev, pager, next, sizes, jumper"
					:total="typeList.length">
				</el-pagination>
			</div>
			<el-card style="margin-top: 50px;">
				<div slot="header" class="clearfix">
				  <span>车位明细</span>
				</div>
				<el-form ref="infoList" :model="infoList" :rules="infoListRules" >
					<el-form-item label="本年车位数" prop="num">
						<el-input size="mini" v-model="infoList.num"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
		</div>

		<el-dialog title="车位数明细" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">
				<el-form-item label="本年车位数" prop="num">
					<el-input size="mini" v-model="infoList.num"></el-input>
				</el-form-item>

				<el-button type="primary" @click="dialogTableVisible = false">保存</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import axios from "axios";
	export default {
		data() {
			return {
				formInline: {
					num:''
				},
				typeList: [{
					num:''
				}],
				infoList: {
					num:''
				},
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 10, //默认第一页展示10条
				dialogTableVisible: false,
				infoListRules: {
					num: [{
						required: true,
						message: '请选择状态',
						trigger: 'blur'
					},
					{
						type:'number',
						message:'请输入正整数',
						trigger:'blur'
					}
					],
					
				}
			}
		},
		created() {
			this.getNumList()
		},
		methods: {
			getNumList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getNumList", {
			
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
				this.pageSize = val;
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
		margin-left: 50%;
	}

	.el-input {
		width: 80%;
	}
</style>
