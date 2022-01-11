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
            <el-input size="mini" v-model="formInline.dNo" placeholder="输入单据编号"></el-input>
          </el-form-item>
          <el-form-item label="住户姓名">
            <el-input size="mini" v-model="formInline.zName" placeholder="输入住户姓名"></el-input>
          </el-form-item>
          <el-form-item label="缴纳日期">
            <el-date-picker size="mini" v-model="formInline.changedate" type="date" placeholder="选择日期" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
          	<el-button size="mini" type="primary" class="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item>
          	<el-button size="mini" type="primary" class="el-icon-refresh" @click="resetForm">重置</el-button>
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
        <el-table-column prop="changedate" label="缴纳日期"  :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="cases" label="缴费总额">
        </el-table-column>
        <el-table-column label="具体操作" width="200px" >
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <a @click="handleEdit(scope.$index, scope.row)">查看详细信息</a>
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

  <!-- <el-dialog title="费用事项" :visible.sync="dialogTableVisible">
  <el-table :data="infoList">
    <el-table-column property="dNo" label="单据编号" width="150"></el-table-column>
    <el-table-column property="zName" label="住户姓名" width="200"></el-table-column>
    <el-table-column property="type" label="缴费方式"></el-table-column>
    <el-table-column property="cases" label="缴费总额"></el-table-column>
    <el-table-column property="changeName" label="收费人员"></el-table-column>
    <el-table-column property="waterCase" label="水费"></el-table-column>
    <el-table-column property="eCase" label="电费"></el-table-column>
    <el-table-column property="gascase" label="气费"></el-table-column>
    <el-table-column property="stopCase" label="停车费"></el-table-column>
    <el-table-column property="mandCase" label="维修费用"></el-table-column>
    <el-table-column property="remark" label="备注"></el-table-column>
  </el-table>
</el-dialog> -->
<el-dialog title="维修费用" :visible.sync="dialogTableVisible">
			<el-form ref="infoList" :model="infoList"  label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单据编号" prop="dNo">
							<el-input v-model="infoList.dNo" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住户姓名" prop="zName">
							<el-input v-model="infoList.zName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="缴费方式" prop="type">
							<el-input v-model="infoList.type" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费总额" prop="cases">
							<el-input v-model="infoList.cases" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收费人员" prop="changeName">
							<el-input v-model="infoList.changeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="水费" prop="waterCase">
							<el-input v-model="infoList.waterCase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="电费" prop="eCase">
							<el-input v-model="infoList.eCase" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="气费" prop="gasCase">
							<el-input v-model="infoList.gascase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			
				<el-row>
					<el-col :span="12">
						<el-form-item label="停车费" prop="stopCase">
							<el-input v-model="infoList.stopCase" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="维修费用" prop="mandCase">
							<el-input v-model="infoList.mandCase" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="infoList.remark" type="textarea" ></el-input>
				</el-form-item>
				<!-- <el-button type="primary" @click="dialogTableVisible = false">保存</el-button>
				<el-button @click="resetForm1('infoList')">重置</el-button> -->
				<el-button @click="goBack" style="margin-left: 45%;">返回</el-button>
			</el-form>
		</el-dialog>
  </div>
</template>

<script>
	import moment from 'moment';
import axios from 'axios';
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
          gascase:'',
          stopCase:'',
          mandCase:'',
          remark:''
        }],
		infoList:[{
			dNo: '',
			zName: '',
			changedate: '',
			cases: '',
			type: '',
			waterCase:'',
			eCase:'',
			gascase:'',
			stopCase:'',
			mandCase:'',
			remark:''
		}],
        dialogTableVisible: false,
        currentPage: 1, //默认第一页
        total: 0, //总条数
        pagesize: 5 //默认第一页展示10条
      }
    },
    created() {
      // 加载列表
      this.getPayList();
    },
    methods: {
		// 时间格式化
		dateFormat:function(row,column){
		
		        var date = row[column.property];
		
		        if(date == undefined){return ''};
		
		        return moment(date).format("YYYY-MM-DD HH:mm:ss")
		
		    },
		
		
		resetForm(){
			this.formInline={},
			this.getPayList();
		},
		handleEdit(index, row) {
						this.dialogTableVisible=true;
					      console.log(index, row)
					      //row是该行tableData对应的一行
					      this.infoList = row
					    },
       getPayList() {
        var self = this;
        axios
          .post("http://127.0.0.1:10520/api/user/getPayList", {
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

      goBack() {
      // router.push("check-admin");
      this.dialogTableVisible=false;
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
  .el-input {
  	width: 80%;
  }
</style>