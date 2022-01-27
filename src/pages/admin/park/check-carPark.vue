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
					<el-form-item>
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible1=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="小区车位查看.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="序号" width="100">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="userid" label="住户姓名" width="100">
				</el-table-column>
				<el-table-column prop="persionNo" label="住户身份证">
				</el-table-column>
				<el-table-column prop="telephone" label="联系电话">
				</el-table-column>
				<el-table-column prop="changedate" label="登记日期" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="carAddress" label="停车车位号" width="100">
				</el-table-column>
				<el-table-column prop="address" label="住户地址">
				</el-table-column>
				<el-table-column prop="state" label="状态">
				</el-table-column>
				<el-table-column prop="pass" label="是否通过">
				</el-table-column>
				<el-table-column label="具体操作" style="width: 200px;">
					<template slot-scope="scope">
						<el-button type="primary" size="small">
							<a @click="handleEdit(scope.$index, scope.row)">审核</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteCarorder(scope.row.id)">删除</a>
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

		<el-dialog title="审核事项" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">

				<el-form-item label="是否通过" prop="pass">
					<el-select v-model="infoList.pass" placeholder="请选择通过与否" style="width:100%">
						<el-option label="通过" value="通过"></el-option>
						<el-option label="未通过" value="未通过"></el-option>
					</el-select>
				</el-form-item>

				<el-button type="primary" @click="edit" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>
		
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
	import axios from "axios";
	import request from "../../../utils/request.js"
	import {
		formatDate
	} from "../../../utils/format.js"
	export default {
		data() {
			return {
				formInline: {
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress: '',
					address: ''
				},
				typeList: [{
					userid: '',
					persionNo: '',
					telephone: '',
					changedate: '',
					carAddress: '',
					address: '',
					state: '',
					pass: ''
				}],
				infoList: {
					pass: '',
					state: "已审核"
				},
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
				json_fields: {
								住户姓名: "userid",
								住户身份证: "persionNo",
								联系电话: "telephone",
								登记日期: "changedate",
								停车车位号:"carAddress",
								住户地址:'address',
								状态:'state',
								是否通过:'pass'
							 },
				json_meta: [
							[
							{
								key: "charset",
								value: "utf-8"
							}
							]
							],
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5, //默认第一页展示10条
				dialogTableVisible: false,
				dialogTableVisible1: false,
				infoListRules: {
					pass: [{
						required: true,
						message: '请选择是否通过',
						trigger: 'blur'
					}],

				}
			}
		},
		created() {
			this.getCarparkList();
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
			this.dialogTableVisible=false;
			},
			edit() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateCarorder",
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
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD hh:mm:ss")
			
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
			resetForm() {
				this.formInline = {},
					this.getCarparkList();
			},
			resetForm1(infoList) {
				this.$refs[infoList].resetFields();
			},
			// 删除小区车位
			deleteCarorder(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteCarorder",
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
							this.getCarparkList();
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
		/* margin-left: 50%; */
	}

	.el-input {
		width: 80%;
	}
</style>
