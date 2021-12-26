<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>住户资料管理</el-breadcrumb-item>
      </el-breadcrumb-item>
      <el-breadcrumb-item>查看住户资料信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="formInline" :model="formInline" :inline="true">
          <el-form-item label="住户姓名">
            <el-input size="mini" v-model="formInline.username"></el-input>
          </el-form-item>
          <el-form-item label="住户电话">
            <el-input size="mini" v-model="formInline.telephone"></el-input>
          </el-form-item>
          <el-form-item label="住户身份证">
            <el-input size="mini" v-model="formInline.persionNo"></el-input>
          </el-form-item>
          <el-form-item label="住户地址">
            <el-input size="mini" v-model="formInline.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary">
              <i class="el-icon-search"></i>查询</el-button>
            <el-button size="mini" type="primary">
              <i class="el-icon-refresh"></i>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
        <el-table-column label="序号" width="150">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="住户姓名">
        </el-table-column>
        <el-table-column prop="telephone" label="住户电话">
        </el-table-column>
        <el-table-column prop="peisionNo" label="住户身份证">
        </el-table-column>
        <el-table-column prop="address" label="住户地址">
        </el-table-column>
        <el-table-column prop="sex" label="住户性别">
        </el-table-column>
        <el-table-column label="具体操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small">
              <a @click="dialogTableVisible = true">编辑</a>
            </el-button>
            <el-button type="danger" size="small">
              <a @click="dialogTableVisible = true">删除</a>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pagesize" layout=" prev, pager, next, sizes, jumper" :total="typeList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return{
      formInline:{
        username:'',
        telephone:'',
        persionNo:'',
        address:'',
      },
      typeList:[{
        username:'',
        telephone:'',
        persionNo:'',
        address:'',
        sex:''
      },],
       dialogTableVisible: false,
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 10 //默认第一页展示10条
    }
  },
  created(){
    this.getUserList()
  },
  methods:{
    getUserList(){
      var self=this;
      axios.post("http://127.0.0.1:10520/api/user/getUserList",{

      })
      .then(function(res){
        if(res.data.status==1){
          console.log("获取数据");
          self.$message.success("数据已获取到！");
        }
        self.typeList=res.data.list;
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
</style>