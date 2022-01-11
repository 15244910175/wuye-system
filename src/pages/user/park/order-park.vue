<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户停车车位管理</el-breadcrumb-item>
			<el-breadcrumb-item>预定小区车位查看</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="form" :model="formInline" :inline="true" class="demo-form-inline">
					<el-form-item label="住户姓名">
						<el-input size="mini" v-model="formInline.userid" placeholder="输入住户姓名"></el-input>
					</el-form-item>
					<el-form-item label="住户身份证">
						<el-input size="mini" v-model="formInline.persionNo" placeholder="输入住户身份证"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input size="mini" v-model="formInline.telephone" placeholder="输入联系方式"></el-input>
					</el-form-item>
					<el-form-item label="登记日期">
						<el-date-picker size="mini" v-model="formInline.changedate" type="date" placeholder="选择日期"
							style="width:100%">
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
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
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
				<el-table-column prop="pass" label="是否通过">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" layout=" prev, pager, next, sizes, jumper"
					:total="typeList.length">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from 'axios';
	export default {
		data() {
			return {
				formInline: {
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress: '',
					address: '',
				},
				typeList: [{
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress: '',
					address: '',
					state: '',
					pass:''
				}],
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getOrdercar();
		},
		methods: {
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD HH:mm:ss")
			
			    },
			resetForm(){
				this.formInline={},
				this.getOrdercar();
			},
			getOrdercar() {
				var self = this;
				//登陆成功之后get获取接口数据
				axios
					.post("http://127.0.0.1:10520/api/user/getOrdercar", {
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
			handleSizeChange(val) {
				console.log(`每页 ${size} 条`);
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
/* .el-table {
	width: 95%;
} */
	.page {
		width: 30%;
		margin: auto;
		margin-top: 30px;
	}
</style>
