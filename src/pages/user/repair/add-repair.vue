<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>住户报修事项</el-breadcrumb-item>
			<el-breadcrumb-item>添加报修事项</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<div slot="header" class="clearfix">
				<span>添加报修事项</span>
			</div>
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
				<el-form-item label="报修日期" prop="beDate">
					<el-date-picker v-model="data.beDate" type="datetime" placeholder="选择日期时间" style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="报修情况说明" prop="mark">
					<el-input type="textarea" v-model="data.mark" placeholder="请输入报修情况说明"></el-input>
				</el-form-item>
				<el-form-item label="图片说明" prop="img">

					<el-upload class="upload-demo" action="http://127.0.0.1:10520/api/user/imgload"
						:on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="5"
						:on-exceed="handleExceed" :file-list="fileList" :on-success="uploadSuccess">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>

				</el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button @click="resetForm('data')">重置</el-button>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	import axios from "axios";
	import request from "../../../utils/request.js"
	import {
		formatDate
	} from "../../../utils/format.js"
	export default {
		data() {
			return {
				fileList:[],//图片列表
				data: {
					name: '',
					tel: '',
					address: '',
					beDate: '',
					mark: '',
					revalue: '未修',
					img: []
				},
				rules: {
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
				}
			}
		},
		methods: {
			//图片上传成功
			uploadSuccess(res, file) {
				//当上传的图片名为"banner.jpg"，则将图片路径赋给form.imgBanner，否则给form.img数组
				if (res.data.name === "banner.jpg") { //我的banner图名字都叫banner.jpg
					this.form.imgBanner = res.data.path
				} else {
					this.form.img.push(res.data.path)
				}
			},
			//删除图片时
			handleRemove(file, fileList) {
				console.log(file, fileList, '1111111');
				//删除图片时也要把form.imgBanner和form.img里的数据删除
				if (file.name === "banner.jpg") {
					this.form.imgBanner = ''
				} else {
					//给数组封装一个方法，用来删除数组中指定的数据
					Array.prototype.contains = function(obj) {
						var i = this.length;
						while (i--) {
							if (this[i] === obj) {
								return i; // 返回的这个 i 就是元素的索引下标，
							}
						}
						return false;
			 	}
					const path = file.response.data.path
			  this.form.img.splice(this.form.img.contains(path), 1)
					// console.log(this.form.img,'删除后的form.img')
				}
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},


			onSubmit() {
				if (
					this.data.name == "" ||
					this.data.tel == "" ||
					this.data.address == "" ||
					this.data.beDate == "" ||
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
			},
			resetForm(data) {
				this.$refs[data].resetFields();
			}
		}
	}
</script>
<style>
	.el-card {
		position: absolute;
		/* text-align: center; */
		margin-top: 30px;
		margin-left: 300px;
		width: 750px;
		height: 600px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.el-form-item {
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines;
		/* border: 1px solid red; */
	}

	.el-form-item .el-input {
		text-align: left;
	}

	.el-button {
		margin-left: 40%;
	}
</style>
