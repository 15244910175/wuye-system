<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人事管理</el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>添加物业公司员工信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div slot="header">员工信息</div>
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
        <el-form-item label="员工姓名" prop="AdminName">
          <el-input v-model="addForm.AdminName" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工身份证" prop="persionNo">
          <el-input v-model="addForm.persionNo" placeholder="请输入员工身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="nan"></el-option>
            <el-option label="女" value="nv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作开始日期" prop="begDate">
          <el-date-picker v-model="addForm.begDate" type="date" placeholder="请选择工作开始日期" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
	import request from "../../../utils/request.js"
export default {
  data() {
    return{
      addForm:{
        AdminName:'',
        persionNo:'',
        sex:'',
        begDate:''
      },
      addFormRules:{
          AdminName: [
            {required: true,message: '请输入员工姓名',trigger: 'blur'},
            {min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
          ],
          persionNo: [
            {required: true,message: '请输入员工身份证号码',trigger: 'blur'},
            {min: 18,max: 18,message: '输入18位字符',trigger: 'blur'}
          ],
          sex: [
            {required: true,message: '请选择性别',trigger: 'blur'},
          ],
          begDate: [
            {required: true,message: '请选择工作开始日期',trigger: 'blur'},
          ],
        }
    }
  },
  methods:{
	  onSubmit() {
	  	request({
	  		url: "http://127.0.0.1:10520/api/admin/addRs",
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
	  },
	  init() {
	  	// this.dialog_state = false;
	  	this.addForm = {};
	  },
  }
}
</script>
<style>
 div {
    position: relative;
  }

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

  .box-card {
    width: 700px;
    /* height: 600px; */
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
  
</style>