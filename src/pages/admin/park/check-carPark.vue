<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户停车车位管理</el-breadcrumb-item>
			<el-breadcrumb-item>小区车位查看</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="住户姓名">
						<el-input size="mini" v-model="formInline.userid" placeholder="输入住户姓名"></el-input>
					</el-form-item>
					<el-form-item label="住户身份证">
						<el-input size="mini" v-model="formInline.persionNo" placeholder="输入住户身份证"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input size="mini" v-model="formInline.telephone" placeholder="输入联系电话"></el-input>
					</el-form-item>
					<el-form-item label="登记日期">
						<el-date-picker size="mini" v-model="formInline.changedate" type="date" placeholder="选择日期" style="width:100%">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="停车车位号">
						<el-input size="mini" v-model="formInline.carAddress" placeholder="输入停车车位号"></el-input>
					</el-form-item>
					<el-form-item label="住户地址">
						<el-input size="mini" v-model="formInline.address" placeholder="输入住户地址"></el-input>
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
				<el-table-column prop="userid" label="住户姓名">
				</el-table-column>
				<el-table-column prop="persionNo" label="住户身份证">
				</el-table-column>
				<el-table-column prop="telephone" label="联系电话">
				</el-table-column>
				<el-table-column prop="changedate" label="登记日期" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="carAddress" label="停车车位号">
				</el-table-column>
				<el-table-column prop="address" label="住户地址">
				</el-table-column>
				<el-table-column prop="state" label="状态">
				</el-table-column>
				<el-table-column label="具体操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small">
							<a @click="dialogTableVisible = true">审核</a>
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
		</div>

		<el-dialog title="审核事项" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">
				
				<el-form-item label="是否通过" prop="state">
				  <el-select v-model="infoList.state" placeholder="请选择性别" style="width:100%">
				    <el-option label="通过" value="nan"></el-option>
				    <el-option label="不通过" value="nv"></el-option>
				  </el-select>
				</el-form-item>

				<el-button type="primary" @click="dialogTableVisible = false">保存</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment';
import axios from "axios";
	export default {
		data() {
			return {
				formInline: {
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress:'',
					address: ''
				},
				typeList: [{
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress:'',
					address: '',
					state:''
				}],
				infoList: {
					state:''
				},
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 10, //默认第一页展示10条
				dialogTableVisible: false,
				infoListRules: {
					state: [{
						required: true,
						message: '请选择状态',
						trigger: 'blur'
					}],
					
				}
			}
		},
		created() {
			this.getCarparkList();
		},
		methods: {
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD HH:mm:ss")
			
			    },
			getCarparkList() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getCarparkList", {
			
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
