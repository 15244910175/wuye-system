<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>住户报修管理</el-breadcrumb-item>
      <el-breadcrumb-item>报修事项信息查看</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="formInline" :model="formInline" :inline="true" class="demo-form-inline">
          <el-form-item label="报修事项名称">
            <el-input size="mini" v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="报修人">
            <el-input size="mini" v-model="formInline.inName"></el-input>
          </el-form-item>
          <el-form-item label="报修时间">
            <el-date-picker v-model="formInline.beDate" type="date" placeholder="选择日期" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="住户地址">
            <el-input size="mini" v-model="formInline.address"></el-input>
          </el-form-item>
         <el-form-item>
         	<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
         </el-form-item>
         <el-form-item>
         	<el-button size="mini" type="primary" class="el-icon-refresh">重置</el-button>
         </el-form-item>
        </el-form>
      </div>
      <el-table :data="typeList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
        <el-table-column label="序号" width="150">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="报修事项名称">
        </el-table-column>
        <el-table-column prop="inName" label="报修人">
        </el-table-column>
        <el-table-column prop="tel" label="电话">
        </el-table-column>
        <el-table-column prop="beDate" label="报修日期">
        </el-table-column>
        <el-table-column prop="address" label="住户地址">
        </el-table-column>
        <el-table-column prop="revalue" label="是否已修">
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
  // import request from "@/utils/request";
  export default {
    // name: 'articleType',
    data() {
      return {

        formInline: {
          name: '',
          inName: '',
          tel: '',
          beDate: '',
          address: '',
          revalue: ''
        },
        typeList: [{
          name: '',
          inName: '',
          tel: '',
          beDate: '',
          address: '',
          revalue: ''
        }, ],

        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 10 //默认第一页展示10条
      }
    },
    created() {
      // 加载列表
      this.getRepairList();
    },
    methods: {

      getRepairList() {
        var self = this;
        axios
          .post("http://127.0.0.1:10520/api/user/getRepairList", {
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
      handleDelete(id) {

      },
      updateType(id) {

      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      toCreate() {
        // this.$router.push("createArticleType");
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