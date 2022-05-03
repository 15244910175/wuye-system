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
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible1=true">新增
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="车位编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="userid" label="住户姓名" align="center">
				</el-table-column>
				<el-table-column prop="persionNo" label="住户身份证" align="center">
				</el-table-column>
				<el-table-column prop="telephone" label="联系电话" align="center">
				</el-table-column>
				<el-table-column prop="changedate" label="登记日期" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="carAddress" label="停车车位号" align="center">
				</el-table-column>
				<el-table-column prop="address" label="住户地址" align="center">
				</el-table-column>
				<el-table-column prop="state" label="状态" align="center">
				</el-table-column>
				<el-table-column prop="pass" label="是否通过" align="center">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" layout="total, prev, pager, next, sizes, jumper"
					:total="typeList.length">
				</el-pagination>
			</div>
		</div>
		
		<el-dialog title="预定小区车位" :visible.sync="dialogTableVisible1">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="住户姓名" prop="userid">
					<el-input v-model="addForm.userid" placeholder="请输入住户姓名"></el-input>
				</el-form-item>
				<el-form-item label="住户身份证" prop="persionNo">
					<el-input v-model="addForm.persionNo" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="telephone">
					<el-input v-model="addForm.telephone" placeholder="请输入联系方式"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="addForm.address" placeholder="请输入住户地址"></el-input>
				</el-form-item>
				<el-form-item label="预留车位号" prop="carAddress">
					<el-input v-model="addForm.carAddress" placeholder="请输入预留车位号"></el-input>
				</el-form-item>
				<el-button type="primary" @click="add">保存</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from 'axios';
	export default {
		data() {
			return {
				dialogTableVisible1: false,
				formInline: {
					userid: '',
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
				addForm: {
					userid: '',
					persionNo: '',
					telephone: '',
					address: '',
					carAddress: '',
					state:"未审核",
					changedate:''
				},
				addFormRules: {
					userid: [{
							required: true,
							message: '请输入住户姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					persionNo: [{
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
					telephone: [{
							required: true,
							message: '请输入联系电话',
							trigger: 'blur'
						},
						{
							type: 'number',
							max: 11,
							message: '联系电话输入11位正整数',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入住户地址',
						trigger: 'blur'
					}, ],
					carAddress: [{
						required: true,
						message: '请输入预留车位号',
						trigger: 'blur'
					}, ],
				
				},
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
			add() {
				this.addForm.changedate = formatDate(new Date());
				// this.title=this.title;
				// this.typeId = this.uuid();
				const params = {
					userid:this.addForm.userid,
					persionNo:this.addForm.persionNo,
					telephone:this.addForm.telephone,
					address:this.addForm.address,
					carAddress:this.addForm.carAddress,
					changedate:this.addForm.changedate
				};
				if (
					this.addForm.userid == "" ||
					this.addForm.persionNo == "" ||
					this.addForm.telephone == "" ||
					this.addForm.address == "" ||
					this.addForm.carAddress == "" 
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
				request({
					url: "http://127.0.0.1:10520/api/admin/addOrderPark",
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
				this.getCarparkList();
				this.dialogTableVisible1=false;
			},
			resetForm(addForm) {
				this.$refs[addForm].resetFields();
			},
			goBack() {
			this.dialogTableVisible1=false;	
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
	.page {
		width: 30%;
		margin: auto;
		margin-top: 30px;
	}
</style>
