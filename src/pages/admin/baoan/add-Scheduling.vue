<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>保安管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增保安排班</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div slot="header">每天排班信息</div>
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
        <el-form-item label="保安姓名" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入保安姓名"></el-input>
        </el-form-item>
        <el-form-item label="工作上班时间" prop="startTime">
          <el-date-picker v-model="addForm.startTime" type="datetime" placeholder="请选择工作上班时间" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="下班时间" prop="endTime">
          <el-date-picker v-model="addForm.endTime" type="datetime" placeholder="请选择下班时间" style="width:100%"></el-date-picker>
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
        name:'',
        startTime:'',
        endTime:''
      },
      addFormRules:{
          name: [
            {required: true,message: '请输入保安姓名',trigger: 'blur'},
            {min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
          ],
          startTime: [
            {required: true,message: '请选择开始上班时间',trigger: 'blur'},
          ],
          endTime: [
            {required: true,message: '请选择下班时间',trigger: 'blur'},
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