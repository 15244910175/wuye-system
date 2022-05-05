<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>留言管理</el-breadcrumb-item>
			<el-breadcrumb-item>投诉、留言区</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="t_box">
			<div class="search">
				<el-form ref="formInline" :model="formInline" :inline="true" class="demo-form-inline">
					<el-form-item label="留言/投诉类型">
						<el-select size="mini" v-model="formInline.type" placeholder="请选择留言类型" style="width:100%">
							<el-option label="留言" value="留言"></el-option>
							<el-option label="投诉" value="投诉"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item >
						<el-button size="mini" type="primary" class="el-icon-search" @click="searchTab">查询</el-button>
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
				<el-table-column label="留言投诉编号" align="center" width="120">
					<template slot-scope="scope">{{scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" align="center">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center">
				</el-table-column>
				<el-table-column prop="mark" label="留言内容" align="center">
				</el-table-column>
				<!-- <el-table-column prop="leaverName" label="留言者">
				</el-table-column> -->
				<el-table-column prop="time" label="参与时间" align="center" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="answerContent" label="管理员回复" align="center">
				</el-table-column>
				<el-table-column prop="reDate" label="回复时间" align="center" :formatter="dateFormat">
				</el-table-column>
			</el-table>
			<div class="page" >
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="5" layout="total, prev, pager, next, sizes, jumper"
					:total="typeList.length">
				</el-pagination>
			</div>
			
		</div>
		
		<el-dialog title="投诉与留言" :visible.sync="dialogTableVisible">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="mark">
					<el-input v-model="addForm.mark" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="留言类型" prop="type">
					<el-select v-model="addForm.type" placeholder="请选择留言类型" style="width:100%">
						<el-option label="留言" value="留言"></el-option>
						<el-option label="投诉" value="投诉"></el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="resetForm1('addForm')">重置</el-button>
			</el-form>
		</el-dialog>
		
	</div>
</template>
<script>
	import moment from 'moment';
	import axios from "axios";
	import request from "../../../utils/request.js"
	import {formatDate} from "../../../utils/format.js"
	export default {
		data() {
			return {
				formInline: {
					type: '',
				},
				typeList: [{
					title: '',
					mark: '',
					leaverName: '',
					time: '',
					answerContent: '',
					reDate: ''
				}],
				addForm: {
					title: '',
					mark: '',
					type: '',
					time: '',
					leaverName:''
				},
				addFormRules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					mark: [{
							required: true,
							message: '请输入留言内容',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					type: [{
						required: true,
						message: '请选择留言类型',
						trigger: 'blur'
					}, ],
				},
				dialogTableVisible:false,
				currentPage: 1, //默认第一页
				total: 0, //总条数
				pagesize: 5 //默认第一页展示10条
			}
		},
		created() {
			this.getNoteList();
		},
		methods: {
			// 时间格式化
			dateFormat:function(row,column){
			
			        var date = row[column.property];
			
			        if(date == undefined){return ''};
			
			        return moment(date).format("YYYY-MM-DD HH:mm:ss")
			
			    },
			// 搜索
			searchTab() {
				var self=this;
				axios
				    .get("http://127.0.0.1:10520/api/user/queryNoteType",{
					params:{
						type:this.formInline.type
					}
				})
				.then(function(res){
					console.log(res);
					if(res.data.msg==="查询成功"){
						self.$message.success("查询成功！");
						self.typeList=res.data.list;
						self.total = res.data.list.length;
					}
					
				})
				},
			
			resetForm(){
				this.formInline={},
				this.getNoteList();
			},
			getNoteList() {
			  var self = this;
			  //登陆成功之后get获取接口数据
			  axios
			    .post("http://127.0.0.1:10520/api/user/getNoteList", {
			      //   params: {
			      //     pageNum: 5,
			      //     pageSize: 300
			      //   }
			    })
			    .then(function (res) {
			      if (res.data.status == 1) {
			        console.log("获取数据");
			        self.$message.success("数据已获取到！");
			      }
			      self.typeList = res.data.list;
			      // console.log(self.typeList);
			      console.log(res);
			    });
			},
			onSubmit() {
				this.addForm.time = formatDate(new Date());
				// this.title=this.title;
				// this.typeId = this.uuid();
				const params = {
					title: this.addForm.title,
					mark: this.addForm.mark,
					type: this.addForm.type,
					time: this.addForm.time
				};
				if (
					this.addForm.title == "" ||
					this.addForm.type == "" ||
					// this.addForm.time == "" ||
					// this.addForm.beDate == "" ||
					this.addForm.mark == ""
				) {
					this.$message({
						message: "参数不能为空！",
						type: "error",
					});
				} else {
				request({
					url: "http://127.0.0.1:10520/api/user/addNote",
					method: "post",
					data: params
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
				this.getNoteList();
				this.dialogTableVisible=false;
			},
			resetForm1(addForm) {
				this.$refs[addForm].resetFields();
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
		margin-top: 30px;
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
		/* margin-left: 100%; */
	}
	.el-input {
		width: 80%;
	}
</style>
