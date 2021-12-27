<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>缴费管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看缴纳物业费信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="form" :model="formInline" :inline="true" class="demo-form-inline">
          <el-form-item label="单据编号">
            <el-input size="mini" v-model="formInline.dNo"></el-input>
          </el-form-item>
          <el-form-item label="住户姓名">
            <el-input size="mini" v-model="formInline.zName"></el-input>
          </el-form-item>
          <el-form-item label="缴纳日期">
            <el-date-picker v-model="formInline.changedate" type="date" placeholder="选择日期" style="width:100%">
            </el-date-picker>
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
        <el-table-column prop="dNo" label="单据编号">
        </el-table-column>
        <el-table-column prop="zName" label="住户姓名">
        </el-table-column>
        <el-table-column prop="changedate" label="缴纳日期">
        </el-table-column>
        <el-table-column prop="cases" label="缴费总额">
        </el-table-column>
        <el-table-column label="具体操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <a @click="dialogTableVisible = true">查看详细信息</a>
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

  <el-dialog title="费用事项" :visible.sync="dialogTableVisible">
  <el-table :data="typeList">
    <el-table-column property="dNo" label="单据编号" width="150"></el-table-column>
    <el-table-column property="zName" label="住户姓名" width="200"></el-table-column>
    <el-table-column property="type" label="缴费方式"></el-table-column>
    <el-table-column property="cases" label="缴费总额"></el-table-column>
    <el-table-column property="changeName" label="收费人员"></el-table-column>
    <el-table-column property="waterCase" label="水费"></el-table-column>
    <el-table-column property="eCase" label="电费"></el-table-column>
    <el-table-column property="gasCase" label="气费"></el-table-column>
    <el-table-column property="stopCase" label="停车费"></el-table-column>
    <el-table-column property="mandCase" label="维修费用"></el-table-column>
    <el-table-column property="remark" label="备注"></el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        formInline: {
          dNo: '',
          zName: '',
          changedate: '',
          case: ''
        },
        typeList: [{
          dNo: '',
          zName: '',
          changedate: '',
          cases: '',
          type: '',
          waterCase:'',
          eCase:'',
          gasCase:'',
          stopCase:'',
          mandCase:'',
          remark:''
        }],
        dialogTableVisible: false,
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 10 //默认第一页展示10条
      }
    },
    created() {
      // 加载列表
      this.getPayList();
    },
    methods: {
      //  getPayList() {
      //   var self = this;
      //   axios
      //     .post("http://127.0.0.1:10520/api/user/getPayList", {
      //       //   params: {
      //       //     pageNum: 5,
      //       //     pageSize: 300
      //       //   }
      //     })
      //     .then(function (res) {
      //       if (res.data.status == 1) {
      //         console.log("获取数据");
      //         self.$message.success("数据已获取到！");
      //       }
      //       self.typeList = res.data.list;
      //       // console.log(self.typeList);
      //       console.log(res);
      //     });
      // },

      
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