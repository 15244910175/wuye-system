<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>住户资料管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看住户资料信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>住户信息</span>
      </div>
      <el-form :model="dataForm" :rules="rules" label-width="100px">
        <el-form-item label="住户姓名" prop="username">
          <el-input v-model="dataForm.username" placeholder="请输入住户姓名"></el-input>
        </el-form-item>
        <el-form-item label="住户密码" prop="password">
          <el-input v-model="dataForm.password" placeholder="请输入住户密码"></el-input>
        </el-form-item>
        <el-form-item label="住户身份证" prop="persionNo">
          <el-input v-model="dataForm.persionNo" placeholder="请输入住户身份证"></el-input>
        </el-form-item>
        <el-form-item label="住户性别" prop="sex">
          <el-select v-model="dataForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="nan"></el-option>
            <el-option label="女" value="nv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住户电话" prop="telephone">
          <el-input v-model="dataForm.telephone" placeholder="请输入住户电话"></el-input>
        </el-form-item>
        <el-form-item label="住户地址" prop="address">
          <el-input v-model="dataForm.address" placeholder="请输入住户地址"></el-input>
        </el-form-item>
        <el-button type="primary">保存</el-button>
		<el-button @click="resetForm(`dataForm`)">重置</el-button>
      </el-form>
    </el-card>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dataForm: {
          username: '',
          password: '',
          persionNo: '',
          sex: '',
          telephone: '',
          address: ''
        },
        rules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          persionNo: [{
              required: true,
              message: '请输入身份证',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
           telephone: [{
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
            }
          ],
        }
      }
    },
	methods:{
		resetForm(dataForm) {
		        this.$refs[dataForm].resetFields();
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
    height: 600px;
  }
.el-form-item{
    text-align-last:justify;
	text-align:justify;
	text-justify:distribute-all-lines; 
	/* border: 1px solid red; */
  }
  .el-button {
    /* position: relative; */
    /* text-align: center; */
	margin-left: 40%;
  }
</style>