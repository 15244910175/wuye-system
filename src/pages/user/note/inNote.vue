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
          <el-form-item label="标题" >
            <el-input size="mini" v-model="formInline.title"></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <el-input size="mini" v-model="formInline.mark"></el-input>
          </el-form-item>
          <el-form-item label="留言者">
            <el-input size="mini" v-model="formInline.leaverName"></el-input>
          </el-form-item>
          <el-form-item label="参与日期">
            <el-date-picker size="mimi" v-model="formInline.time" type="date" placeholder="选择日期" >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="回复日期">
            <el-date-picker type="date" size="mini" v-model="formInline.reDate"></el-date-picker>
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
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="mark" label="留言内容">
        </el-table-column>
        <el-table-column prop="leaverName" label="留言者">
        </el-table-column>
        <el-table-column prop="time" label="参与时间">
        </el-table-column>
        <el-table-column prop="answerContent" label="管理员回复">
        </el-table-column>
        <el-table-column prop="reDate" label="回复时间">
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
      formInline: {
          title: '',
          mark: '',
          leaverName: '',
          time: '',
          answerContent: '',
          reDate: '',
        },
         typeList: [{
           title: '',
          mark: '',
          leaverName: '',
          time: '',
          answerContent: '',
          reDate: ''
         }],
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 10 //默认第一页展示10条
    }
  },
  created(){
    this.getNoteList();
  },
    methods: {
       getNoteList() {
        var self = this;
        //登陆成功之后get获取接口数据
        axios
          .post(`http://127.0.0.1:10520/api/user/getNoteList`, {
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
  margin-top: 30px;
}
</style>