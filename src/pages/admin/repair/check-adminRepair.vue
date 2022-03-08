<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户报修管理</el-breadcrumb-item>
			<el-breadcrumb-item>报修事项信息查看</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="报修事项名称">
						<el-input size="mini" v-model="formInline.name" placeholder="输入保修事项名称"></el-input>
					</el-form-item>
					<el-form-item label="报修人">
						<el-input size="mini" v-model="formInline.inName" placeholder="输入报修人"></el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input size="mini" v-model="formInline.tel" placeholder="输入电话"></el-input>
					</el-form-item>
					<el-form-item label="报修日期">
						<el-date-picker size="mini" v-model="formInline.beDate" type="date" placeholder="选择日期"
							style="width:100%">
						</el-date-picker>
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
						<el-button size="mini" type="primary" class="el-icon-plus" @click="dialogTableVisible2=true">新增
						</el-button>
					</el-form-item>
					<el-form-item>
						<download-excel class="export-excel-wrapper" :data="typeList" :fields="json_fields"
							name="报修信息.xls">
						<el-button type="primary" size="small">导出EXCEL</el-button>
						</download-excel>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
				<el-table-column label="报修事项编号" width="120" align="center">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="name" label="报修事项名称" align="center">
				</el-table-column>
				<el-table-column prop="inName" label="报修人" align="center">
				</el-table-column>
				<el-table-column prop="tel" label="电话" align="center">
				</el-table-column>
				<el-table-column prop="beDate" label="报修日期" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="address" label="住户地址" align="center">
				</el-table-column>
				<el-table-column prop="revalue" label="是否已修" align="center">
				</el-table-column>
				<el-table-column label="具体操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small">
							<a @click="handleEdit1(scope.$index, scope.row)">标记已修</a>
						</el-button>
						<el-button type="primary" size="small" icon="el-icon-view">
							<a @click="handleEdit(scope.$index, scope.row)">查看</a>
						</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete">
							<a @click="deleteRepair(scope.row.id)">删除</a>
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

		<el-dialog title="查看报修事项" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">
				<el-form-item label="报修事项名称" prop="name">
					<el-input v-model="infoList.name" disabled></el-input>
				</el-form-item>
				<el-form-item label="报修人" prop="inName">
					<el-input v-model="infoList.inName" disabled></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="infoList.tel" disabled></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="infoList.address" disabled></el-input>
				</el-form-item>
				<el-form-item label="报修时间" prop="beDate">
					<el-input v-model="infoList.beDate" disabled></el-input>
				</el-form-item>
				<el-form-item label="报修情况说明" prop="mark">
					<el-input v-model="infoList.mark" disabled></el-input>
				</el-form-item>

				<!-- <el-form-item label="备注" prop="revalue" disabled>
					<el-input v-model="infoList.revalue"></el-input>
				</el-form-item> -->

				<el-button @click="goBack" style="margin-left: 45%;">返回</el-button>

			</el-form>
		</el-dialog>

		<el-dialog title="审核事项" :visible.sync="dialogTableVisible1">
			<el-form ref="infoList" :model="infoList" label-width="120px" :rules="infoListRules">

				<el-form-item label="是否已修" prop="revalue">
					<el-select v-model="infoList.revalue" placeholder="请选择已修与否" style="width:100%">
						<el-option label="已修" value="已修"></el-option>
						<el-option label="未修" value="未修"></el-option>
					</el-select>
				</el-form-item>

				<el-button type="primary" @click="save" style="margin-left: 40%;">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button>
				<el-button @click="goBack">返回</el-button>
			</el-form>
		</el-dialog>

		<el-dialog title="新增报修事项" :visible.sync="dialogTableVisible2">
			<el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules">
				<el-form-item label="报修事项名称" prop="name">
					<el-input v-model="addForm.name" placeholder="请输入报修事项名称"></el-input>
				</el-form-item>
				<el-form-item label="报修人" prop="inName">
					<el-input v-model="addForm.inName" placeholder="请输入报修人"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="addForm.tel" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="住户地址" prop="address">
					<el-input v-model="addForm.address" placeholder="请输入住户地址"></el-input>
				</el-form-item>
				<el-form-item label="报修时间" prop="beDate" >
					<el-date-picker type="date" v-model="addForm.beDate" placeholder="请选择报修时间" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="报修情况说明" prop="mark">
					<el-input v-model="addForm.mark" placeholder="请输入保修情况说明"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add" style="margin-left:40%">保存</el-button>
					<el-button @click="resetForm1('addForm')">重置</el-button>
					<el-button @click="goBack" >返回</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios";
	import moment from 'moment';
	import request from "../../../utils/request.js"
	export default {
		data() {
			return {
				formInline: {
					name: '',
					inName: '',
					tel: '',
					beDate: '',
					address: ''
				},
				typeList: [],
				infoList: {
					name: '',
					inName: '',
					tel: '',
					beDate: '',
					address: '',
					// revalue: '已修'
				},
				addForm: {
					name: '',
					inName: '',
					tel: '',
					address: '',
					beDate: '',
					mark: '',
					revalue: '未修',
					img: ''
				},
				addFormRules: {
					name: [{
							required: true,
							message: '请输入报修事项名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					inName: [{
							required: true,
							message: '请输入报修人',
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
							message: '请输入联系电话',
							trigger: 'blur'
						},
						{
							// type: 'number',
							max: 11,
							message: '联系电话输入11位正整数',
							// trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入住户地址',
						trigger: 'blur'
					}, ],
					beDate: [{
						required: true,
						message: '请选择报修时间',
						trigger: 'blur'
					}, ],
					mark: [{
						required: true,
						message: '请输入备注信息',
						trigger: 'blur'
					}, ],

				},
				json_fields: {
								报修事项名称: "name",
								报修人: "inName",
								电话: "tel",
								报修日期: "beDate",
								住户地址: "address",
								是否已修: "revalue"
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
				dialogTableVisible2: false,
				infoListRules: {
					name: [{
						required: true,
						message: '请输入报修事项名称',
						trigger: 'blur'
					}],
					inName: [{
						required: true,
						message: '请输报修人',
						trigger: 'blur'
					}, ],
					tel: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							type: 'number',
							max: 11,
							message: '数电话号码必须为数字',
							trigger: 'blur'
						}
					],
					beDate: [{
						required: true,
						message: '请选择报修时间',
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: '请输入住户地址',
						trigger: 'blur'
					}, ],
					mark: [{
						required: true,
						message: '请输入报修事项说明',
						trigger: 'blur'
					}, ]
				}
			}
		},
		created() {
			this.getRepairList()
		},
		methods: {
			// 时间格式化
			dateFormat: function(row, column) {

				var date = row[column.property];

				if (date == undefined) {
					return ''
				};

				return moment(date).format("YYYY-MM-DD")

			},
			handleEdit1(index, row) {
				this.dialogTableVisible1 = true;
				console.log(index, row)
				//row是该行tableData对应的一行
				this.infoList = row
			},
			add() {
				if (
					this.addForm.name == "" ||
					this.addForm.inName == "" ||
					this.addForm.tel == "" ||
					this.addForm.address == "" ||
					this.addForm.beDate == "" ||
					this.addForm.mark == ""
				) {
					this.$message({
						message: "必填项不能为空！",
						type: "error",
					});
				} else {
					request({
						url: "http://127.0.0.1:10520/api/admin/addRepair",
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
				this.dialogTableVisible2 = false;
				this.getRepairList();
			},
			resetForm(addForm) {
				this.$refs[addForm].resetFields();
			},
			save() {
				request({
					url: "http://127.0.0.1:10520/api/admin/updateRevalue",
					method: "post",
					data: this.infoList,
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
				this.dialogTableVisible1 = false;
				this.dialogTableVisible2 = false;
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
			getRepairList() {
				var self = this;
				axios
					.post("http://127.0.0.1:10520/api/admin/getRepairList", {
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
			resetForm() {
				this.formInline = {},
					this.getRepairList();
			},
			// 删除报修事项信息
			deleteRepair(id) {
				this.$confirm('删除后将无法恢复!, 是否继续?', '提示', {
						confirmButtonText: '删除',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
						customClass: 'winClass',
					})
					.then(() => {
						request({
							url: "http://127.0.0.1:10520/api/admin/deleteRepair",
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
							this.getRepairList();
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
