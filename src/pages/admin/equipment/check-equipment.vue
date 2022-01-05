<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看设备信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="t_box">
      <div class="search">
        <el-form ref="formInline" :model="formInline" :inline="true">
          <el-form-item label="设备名称">
            <el-input size="mini" v-model="formInline.name" placeholder="输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label="采购时间">
            <el-date-picker size="mini" v-model="formInline.beDate" type="date" placeholder="选择采购时间" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input size="mini" v-model="formInline.model" placeholder="输入设备型号"></el-input>
          </el-form-item>
          <el-form-item label="登记人">
            <el-input size="mini" v-model="formInline.inName" placeholder="输入登记人"></el-input>
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
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="beDate" label="采购时间">
        </el-table-column>
        <el-table-column prop="model" label="设备型号">
        </el-table-column>
        <el-table-column prop="inName" label="登记人">
        </el-table-column>
        <el-table-column label="具体操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small">
              <a @click="dialogTableVisible = true">编辑</a>
            </el-button>
            <el-button type="danger" size="small">
              <a @click="deleteEqu(scope.row.id)">删除</a>
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

    <el-dialog title="设备信息" :visible.sync="dialogTableVisible">
      <el-form ref="infoList" :model="infoList" :rules="infoListRules" label-width="120px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="infoList.name"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="infoList.model"></el-input>
        </el-form-item>
        <el-form-item label="设备数量" prop="num">
          <el-input v-model="infoList.num"></el-input>
        </el-form-item>
        <el-form-item label="采购时间" prop="beDate">
          <el-date-picker v-model="infoList.beDate" type="date" placeholder="请选择工作日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设备说明" prop="mark">
          <el-input v-model="infoList.mark"></el-input>
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
          beDate:'',
          model:'',
          inName:''
        },
        typeList: [{
          name: '',
          beDate:'',
          model:'',
          inName:''
        }],
        infoList: {
          name: '',
          model:'',
          num:'',
          beDate:'',
          mark:''
        },
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 5, //默认第一页展示10条
        dialogTableVisible: false,
        infoListRules: {
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
    },
	created(){
		this.getEquipList();
	},
    methods: {
		getEquipList() {
			var self = this;
			axios.post("http://127.0.0.1:10520/api/admin/getEquipList", {
		
				})
				.then(function(res) {
					if (res.data.status == 1) {
						console.log("获取数据");
						self.$message.success("数据已获取到！");
					}
					self.typeList = res.data.list;
					// console.log(self.typeList);
					console.log(res);
				})
		},
		
		// 删除设备信息
		deleteEqu(id) {
			request({
			        url: "http://127.0.0.1:10520/api/admin/deleteEqu",
			        method: "post",
			        data: { id: id }
			      }).then(res => {
			        console.log(res);
			        if (res.msg === "删除成功") {
			          this.$message({
			            message: "删除成功！",
			            type: "success"
			          });
			          this.getEquipList();
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