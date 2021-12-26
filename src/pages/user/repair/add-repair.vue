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
        <span>添加保修事项</span>
      </div>
      <el-form :model="data" :rules="rules" label-width="120px">
        <el-form-item label="报修事项名称" prop="name">
          <el-input v-model="data.name" placeholder="请输入报修事项名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel" style="">
          <el-input v-model="data.tel" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="住户地址" prop="address">
          <el-input v-model="data.address" placeholder="请输入住户地址"></el-input>
        </el-form-item>
        <el-form-item label="报修时间" prop="beDate">
          <el-date-picker v-model="data.beDate" type="datetime" placeholder="选择日期时间" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报修情况说明" prop="mark">
          <el-input type="textarea" v-model="data.mark" placeholder="请输入报修情况说明"></el-input>
        </el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          name: '',
          tel: '',
          address: '',
          beDate: '',
          mark: ''
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
  .el-form-item{
    text-align-last:justify;
	text-align:justify;
	text-justify:distribute-all-lines; 
	/* border: 1px solid red; */
  }
  .el-form-item .el-input {
    text-align: left;
  }
</style>