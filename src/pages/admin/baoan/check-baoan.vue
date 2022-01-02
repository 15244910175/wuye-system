<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>保安管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看保安信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="formInline" :model="formInline" :inline="true">
          <el-form-item label="保安姓名">
            <el-input size="mini" v-model="formInline.name" placeholder="输入保安姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input size="mini" v-model="formInline.persionNo" placeholder="输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="工作开始日期">
            <el-date-picker size="mini" v-model="formInline.begDate" type="date" placeholder="请选择工作日期" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="职务">
            <el-input size="mini" v-model="formInline.post" placeholder="输入职务"></el-input>
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
        <el-table-column prop="name" label="保安姓名">
        </el-table-column>
        <el-table-column prop="persionNo" label="身份证号">
        </el-table-column>
        <el-table-column prop="begDate" label="工作开始日期">
        </el-table-column>
        <el-table-column prop="post" label="职务">
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

    <el-dialog title="管理员信息" :visible.sync="dialogTableVisible">
      <el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
        <el-form-item label="保安人员姓名" prop="name">
          <el-input v-model="infoList.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="persionNo">
          <el-input v-model="infoList.persionNo"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="infoList.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="nan"></el-option>
            <el-option label="女" value="nv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作开始日期" prop="begDate">
          <el-date-picker v-model="infoList.begDate" type="date" placeholder="请选择工作日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职务" prop="post">
          <el-input v-model="infoList.post"></el-input>
        </el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
	import axios from "axios";
  export default {
    data() {
      return {
        formInline: {
          name: '',
          persionNo: '',
          begDate: '',
          post: ''
        },
        typeList: [{
          name: '',
          persionNo: '',
          begDate: '',
          post: ''
        }],
        infoList: {
          AdminName: '',
          LoginName: '',
          LoginPwd: '',
          persionNo: '',
          sex: '',
          begDate: '',
          post: ''
        },
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 10, //默认第一页展示10条
        dialogTableVisible: false,
        infoListRules:{
          name: [
            {required: true,message: '请输入管理员姓名',trigger: 'blur'},
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
    },
	created(){
		this.getBaList();
	},
    methods: {
		getBaList() {
		  var self = this;
		  //登陆成功之后get获取接口数据
		  axios
		    .post("http://127.0.0.1:10520/api/admin/getBaList", {
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