<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户报修管理</el-breadcrumb-item>
			<el-breadcrumb-item>报修事项信息查看</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true" class="demo-form-inline">
					<el-form-item label="报修事项名称">
						<el-input size="mini" v-model="formInline.name" placeholder="输入名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-search" @click="searchTab">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible=true">新增</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="报修编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="报修事项名称" align="center">
				</el-table-column>
				<!-- <el-table-column prop="inName" label="报修人">
				</el-table-column> -->
				<el-table-column prop="tel" label="电话" align="center">
				</el-table-column>
				<el-table-column prop="beDate" label="报修时间" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="address" label="住户地址" align="center">
				</el-table-column>
				 <el-table-column prop="revalue" label="是否已修" align="center">
				 </el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" layout="total, prev, pager, next, sizes, jumper"
					:total="typeList.length">
				</el-pagination>
			</div>
		</div>
		
		<el-dialog title="新增报修事项" :visible.sync="dialogTableVisible" style="text-align: center;">
			<el-form :model="data" ref="data" :rules="rules" label-width="120px">
				<el-form-item label="报修事项名称" prop="name">
					<el-input v-model="data.name" placeholder="请输入报修事项名称"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="data.tel" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="data.address" placeholder="请输入住户地址"></el-input>
				</el-form-item>
				<el-form-item label="报修情况说明" prop="mark">
					<el-input type="textarea" v-model="data.mark" placeholder="请输入报修情况说明"></el-input>
				</el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button @click="resetForm1('data')">重置</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import axios from "axios";
	import moment from 'moment';
	import {
	formatDate
	} from "../../../utils/format.js"
	import request from "../../../utils/request";
	export default {
		// name: 'articleType',
		data() {
			return {

				formInline: {
					name: '',
				},
				typeList: [{
					name: '',
					inName: '',
					tel: '',
					beDate: '',
					address: '',
					revalue: ''
				}, ],
				data: {
					name: '',
					tel: '',
					address: '',
					beDate: '',
					mark: '',
					revalue: '未修',
					img: []
				},
				rules:{
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					tel: [{
							required: true,
							message: '请输入联系方式',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入地址',
						trigger: 'blur'
					}],
					beDate: [{
						required: true,
						message: '请选择日期时间',
						trigger: 'blur'
					}],
					mark: [{
							required: true,
							message: '请输入报修情况说明',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
				},
				dialogTableVisible:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			// 加载列表
			this.getRepairList();
		},
		mounted() {
		   // 加载列表
		   // this.searchTab();
		 },
		methods: {
			
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD HH:mm:ss")
			
			    },
			resetForm(){
				this.formInline.name="",
				this.getRepairList();
			},
			getRepairList() {
				var self = this;
				axios.get("http://127.0.0.1:10520/api/user/getRepairList", {
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
						self.total = self.typeList.length;
						// console.log(self.typeList);
						console.log(res);
					});
			},
			// 搜索
			searchTab() {
				var self=this;
				axios.get("http://127.0.0.1:10520/api/user/queryRepair",{
					params:{
						name:this.formInline.name
					}
				})
				.then(function(res){
					if(res.data.msg==="查询成功"){
						self.$message.success("查询成功！");
						
						self.typeList=res.data.list;
						self.total = res.data.list.length;
					}
					
				})
				},
			    //   request({
			    //     url: "http://127.0.0.1:10520/api/user/queryRepair",
			    //     method: "get",
			    //     data: {}
			    //   }).then(res => {
			    //     console.log(res);
			    //     if (res.msg === "查询成功") {
			    //       self.typeList = res.list;
			    //       self.total = self.typeList.length;
			    //     }
			    //   });
			    // },
			onSubmit() {
				this.data.beDate = formatDate(new Date());
				// this.title=this.title;
				// this.typeId = this.uuid();
				const params = {
					name: this.data.name,
					tel: this.data.tel,
					address: this.data.address,
					mark:this.data.mark,
					beDate: this.data.beDate,
				};
				if (
					this.data.name == "" ||
					this.data.tel == "" ||
					this.data.address == "" ||
					// this.data.beDate == "" ||
					this.data.mark == ""
				) {
					this.$message({
						message: "参数不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/user/addRepair",
						method: "post",
						data: this.data
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
				this.data = {};
				this.dialogTableVisible=false;
				this.getRepairList();
			},
			resetForm1(data) {
				this.$refs[data].resetFields();
			},
			handleDelete(id) {

			},
			updateType(id) {

			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			},
			toCreate() {
				// this.$router.push("createArticleType");
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

	.search {
		/* width: 30%; */
		float: left;
	}
/* .el-table {
	width: 95%;
} */
/* .el-button {
	text-align: center;
} */

	.page {
		width: 30%;
		margin: auto;
		margin-top: 30px;
	}
	
</style>
