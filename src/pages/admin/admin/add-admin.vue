<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div slot="header">管理员信息</div>
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
        <el-form-item label="管理员姓名" prop="AdminName">
          <el-input v-model="addForm.AdminName" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="LoginName">
          <el-input v-model="addForm.LoginName" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="persionNo">
          <el-input v-model="addForm.persionNo" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="nan"></el-option>
            <el-option label="女" value="nv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作开始日期" prop="begDate">
          <el-date-picker v-model="addForm.begDate" type="date" placeholder="请选择工作日期" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="职务" prop="post">
          <el-input v-model="addForm.post" placeholder="请输入职务"></el-input>
        </el-form-item>
        <el-button type="primary" >保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return{
      addForm:{
        AdminName:'',
        LoginName:'',
        persionNo:'',
        sex:'',
        begDate:'',
        post:''
      },
      addFormRules:{
          AdminName: [
            {required: true,message: '请输入管理员姓名',trigger: 'blur'},
            {min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
          ],
           LoginName: [
            {required: true,message: '请输入登录账号',trigger: 'blur'},
            {min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
          ],
          persionNo: [
            {required: true,message: '请输入身份证号',trigger: 'blur'},
            {min: 18,max: 18,message: '长度18为个字符',trigger: 'blur'}
          ],
          sex: [
            {required: true,message: '请选择性别',trigger: 'blur'},
          ],
          begDate: [
            {required: true,message: '请选择工作开始时间',trigger: 'blur'},
          ],
          post: [
            {required: true,message: '请输入职务',trigger: 'blur'},
            {min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
          ],
        }
    }
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