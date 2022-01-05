<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>保安管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看保安排班记录</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="formInline" :model="formInline" :inline="true">
          <el-form-item label="保安姓名">
            <el-input size="mini" v-model="formInline.name" placeholder="输入保安姓名"></el-input>
          </el-form-item>
          <el-form-item label="上班时间">
            <el-date-picker size="mini" v-model="formInline.startTime" type="datetime" placeholder="请选择上班时间" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下班时间">
            <el-date-picker size="mini" v-model="formInline.endTime" type="datetime" placeholder="请选择下班时间" style="width:100%">
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
        <el-table-column prop="name" label="保安姓名">
        </el-table-column>
        <el-table-column prop="startTime" label="上班时间">
        </el-table-column>
        <el-table-column prop="endTime" label="下班时间">
        </el-table-column>
        <el-table-column label="具体操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small">
              <a @click="dialogTableVisible = true">编辑</a>
            </el-button>
            <el-button type="danger" size="small">
              <a @click="deletePb(scope.row.id)">删除</a>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
       	:current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pagesize" layout=" prev, pager, next, sizes, jumper"
       	:total="typeList.length">
       </el-pagination>
      </div>
    </div>

    <el-dialog title="管理员信息" :visible.sync="dialogTableVisible">
      <el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
        <el-form-item label="保安姓名" prop="name">
          <el-input v-model="infoList.name"></el-input>
        </el-form-item>
        <el-form-item label="上班时间" prop="startTime">
          <el-date-picker v-model="infoList.startTime" type="datetime" placeholder="请选择工作日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下班时间" prop="endTime">
          <el-date-picker v-model="infoList.endTime" type="datetime" placeholder="请选择工作日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
	import axios from "axios";
	import request from "../../../utils/request.js"
	
  export default {
    data() {
      return {
        formInline: {
          name: '',
          startTime: '',
          endTime: '',
        },
        typeList: [{
          name: '',
          startTime: '',
          endTime: '',
        }],
        infoList: {
          name: '',
          startTime: '',
          endTime: '',
        },
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 5, //默认第一页展示10条
        dialogTableVisible: false,
        infoListRules: {
          name: [{
              required: true,
              message: '请输入保安姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          startTime: [{
            required: true,
            message: '请选择工作开始时间',
            trigger: 'blur'
          }, ],
          endTime: [{
            required: true,
            message: '请选择工作开始时间',
            trigger: 'blur'
          }, ],
        }
      }
    },
	created(){
		this.getBAaScList();
	},
    methods: {
		getBAaScList() {
		  var self = this;
		  //登陆成功之后get获取接口数据
		  axios
		    .post("http://127.0.0.1:10520/api/admin/getBAaScList", {
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
		
		// 删除保安排班
		deletePb(id) {
			request({
			        url: "http://127.0.0.1:10520/api/admin/deletePb",
			        method: "post",
			        data: { id: id }
			      }).then(res => {
			        console.log(res);
			        if (res.msg === "删除成功") {
			          this.$message({
			            message: "删除成功！",
			            type: "success"
			          });
			          this.getBAaScList();
			        }else {
						this.$message({
							message:'删除失败！',
							type:"danger"
						})
					}
			      });
		},
      handleSizeChange(val) {
        this.pagesize = val;
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
    /* margin-left: 50%; */
  }
</style>