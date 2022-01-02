<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>缴费管理</el-breadcrumb-item>
			<el-breadcrumb-item>缴纳物业费信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true">
					<el-form-item label="单据编号">
						<el-input size="mini" v-model="formInline.dNo" placeholder="输入单据编号"></el-input>
					</el-form-item>
					<el-form-item label="住户姓名">
						<el-input size="mini" v-model="formInline.zName" placeholder="输入住户姓名"></el-input>
					</el-form-item>
					<el-form-item label="缴纳日期">
						<el-date-picker size="mini" v-model="formInline.changedate" type="date" placeholder="选择日期" style="width:100%">
						</el-date-picker>
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
				<el-table-column prop="dNo" label="单据编号">
				</el-table-column>
				<el-table-column prop="zName" label="住户姓名">
				</el-table-column>
				<el-table-column prop="changedate" label="缴纳日期" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="cases" label="缴费总额">
				</el-table-column>
				<el-table-column label="具体操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" size="small">
							<a @click="dialogTableVisible = true">查看</a>
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

		<el-dialog title="设备信息" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList"  label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单据编号" prop="dNo">
							<el-input v-model="infoList.dNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住户姓名" prop="zName">
							<el-input v-model="infoList.zName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="缴费方式" prop="type">
							<el-input v-model="infoList.type" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费总额" prop="cases">
							<el-input v-model="infoList.cases" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收费人员" prop="changeName">
							<el-input v-model="infoList.changeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="水费" prop="waterCase">
							<el-input v-model="infoList.waterCase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="电费" prop="eCase">
							<el-input v-model="infoList.eCase" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="气费" prop="gasCase">
							<el-input v-model="infoList.gasCase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			
				<el-row>
					<el-col :span="12">
						<el-form-item label="停车费" prop="stopCase">
							<el-input v-model="infoList.stopCase" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="维修费用" prop="mandCase">
							<el-input v-model="infoList.mandCase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="infoList.remark" type="textarea" ></el-input>
				</el-form-item>
				<el-button type="primary" @click="dialogTableVisible = false">返回</el-button>
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
					dNo: '',
					zName: '',
					changedate: ''
				},
				typeList: [{
					name: '',
					beDate: '',
					model: '',
					inName: ''
				}],
				infoList: {
					dNo: '',
					zName: '',
					type: '',
					cases: '',
					changeName: '',
					waterCase: '',
					eCase: '',
					gasCase: '',
					stopCase: '',
					mandCase: '',
					remark: ''
				},
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 10, //默认第一页展示10条
				dialogTableVisible: false,
				infoListRules: {
					name: [{
						required: true,
						message: '请输入设备名称',
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: '请输入设备型号',
						trigger: 'blur'
					}, ],
					num: [{
							required: true,
							message: '请选择性别',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '数量必须为数字',
							trigger: 'blur'
						}
					],
					beDate: [{
						required: true,
						message: '请选择采购时间',
						trigger: 'blur'
					}, ],
					mark: [{
						required: true,
						message: '请输入设备说明',
						trigger: 'blur'
					}, ]
				}
			}
		},
		created(){
			this.getPayListL();
		},
		methods: {
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD HH:mm:ss")
			
			    },
			getPayListL() {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getPayListL", {
			
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
