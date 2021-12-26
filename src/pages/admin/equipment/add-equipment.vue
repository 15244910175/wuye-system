<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>添加设备信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div slot="header">设备信息</div>
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="120px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="addForm.model" placeholder="请输入设备型号"></el-input>
        </el-form-item>
        <el-form-item label="设备数量" prop="num">
          <el-input v-model="addForm.num" placeholder="请输入设备数量"></el-input>
        </el-form-item>
         <el-form-item label="采购时间" prop="beDate">
          <el-input v-model="addForm.beDate" placeholder="请选择采购时间"></el-input>
        </el-form-item>
         <el-form-item label="设备说明" prop="mark">
          <el-input type="textarea" v-model="addForm.mark" placeholder="请输入设备说明"></el-input>
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
        model:'',
        num:'',
        beDate:'',
        mark:''
      },
      addFormRules:{
          name: [
            {required: true,message: '请输入设备名称',trigger: 'blur'}
          ],
          model: [
            {required: true,message: '请输入设备型号',trigger: 'blur'},
          ],
          num: [
            {required: true,message: '请选择性别',trigger: 'blur'},
            {type:'number' ,message: '数量必须为数字',trigger: 'blur'}
          ],
          beDate: [
            {required: true,message: '请选择采购时间',trigger: 'blur'},
          ],
          mark:[
            {required: true,message: '请输入设备说明',trigger: 'blur'},
          ]
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