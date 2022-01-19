<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/adminhome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>公告管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path:'/notice'}">公告信息</el-breadcrumb-item>
			<el-breadcrumb-item>公告详情信息</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row :gutter="5" type="flex" v-for="item in List" :key='item.id' @click.native="routerJump(item.id)">

			<el-col :span="14">
				<div class="grid-content bg-purple-light">
					<span class="content">{{item.content}}</span><br>
					</span>
					<br>
					<!-- 公司名称和地址  -->
					<div class="LOCAL">
						<span class="company">
							{{item.title}}
						</span>

						<span class="city" >
							{{item.time}}
						</span>
					</div>
				</div>
			</el-col>
		</el-row>


	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				id:'',
				List:{
					id:'',
					title:'',
					content:'',
					time:''
				}
			}
		},
		created() {
			this.getNoticeList()
		},
		mounted: function() {
			this.id=this.$route.params.id;
			console.log(this.$route.params.id);
			this.getNoticeList(this.id)
		},

		methods: {
			// 时间格式化
			dateFormat: function(row, column) {
			
				var date = row[column.property];
			
				if (date == undefined) {
					return ''
				};
			
				return moment(date).format("YYYY-MM-DD hh:mm:ss")
			
			},
			getNoticeList(id) {
				var self = this;
				axios.post("http://127.0.0.1:10520/api/admin/getNoticeList?id="+this.id, {
					})
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("获取数据");
							self.$message.success("数据已获取到！");
						}
						self.List = res.data.list;
						console.log(self.List);
						console.log(res);
					})
				
			},
		},
	}
	
</script>

<style>
</style>
