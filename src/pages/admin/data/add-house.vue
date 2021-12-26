<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>住户资料管理</el-breadcrumb-item>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加住户信息</el-breadcrumb-item>
    </el-breadcrumb>

     <el-card>
      <div slot="header" class="clearfix">
        <span>添加保修事项</span>
      </div>
      <el-form :model="addForm" :rules="formRules" label-width="120px">
        <el-form-item label="报修事项名称" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入报修事项名称"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="persionNo">
          <el-input v-model="addForm.persionNo" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="nan"></el-option>
            <el-option label="女" value="nv"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" prop="telephone">
          <el-input v-model="addForm.telephone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item label="人员性质" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择人员性质" style="width:100%">
            <el-option label="业主室长" value="nan"></el-option>
            <el-option label="业主成员" value="nv"></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" >保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        addForm: {
          username: '',
          persionNo: '',
          sex: '',
          telephone: '',
          address: '',
          type: ''
        },
        options: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        formRules: {
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
          persionNo: [{
              required: true,
              message: '请输入身份证号',
              trigger: 'blur'
            },
            {
              size: 18,
              message: '请输入18位身份证号码',
              trigger: 'blur'
            }
          ],
          telephone: [{
              required: true,
              message: '请输入电话号码',
              trigger: 'blur'
            },
            {
              max: 11,
              message: '请输入正确的电话号码',
              trigger: 'blur'
            }
          ],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }, ],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }, ],
          type: [{
            required: true,
            message: '请选择人员性质',
            trigger: 'blur'
          }, ],
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