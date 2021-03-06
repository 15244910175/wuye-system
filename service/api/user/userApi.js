const models = require('../../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../../db/sqlMap');
// const multer = require('multer')
const fs = require('fs')
// const formatDate=require("../../../src/utils/format.js")
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();


// 登录接口
router.post('/login', (req, res) => {
	const params = req.body;
	const sql = $sql.user.login ;
	// console.log(sel_email);
	conn.query(sql, [params.username,params.password], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1"); // -1 表示查询不到，用户不存在
		} else {
			if (results[0].username == params.username && results[0].password == params.password) {
				res.send("0"); // 0 表示用户存在并且密码正确
			} else {
				res.send("1"); // 1 表示用户存在，但密码不正确
			}
		}
	})
});
// 注册接口
router.post('/reg', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.user.login;
	const add_sql = $sql.user.reg;
	console.log(sel_sql);

	conn.query(sel_sql, [params.username,params.password], (error, results) => {
		if (error) {
			// console.log(err);
			throw error;
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.send("-1"); // -1 表示用户名已经存在
		} else {
			conn.query(add_sql, [params.username, params.email, params.password, params.role], (err,
				rst) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rst);
					res.send("0"); // 0 表示用户创建成功
				}
			});
		}
	});
});

router.get('/ss',(req,res)=>{
	const params= req.query;
	const sql = $sql.user.ss ;
	
	conn.query(sql, [params.rNo], (error, result)=> {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})


// 搜索保修事项
router.get('/queryRepair',(req,res)=>{
	const params= req.query;
	console.log(params);
	const sql = $sql.user.queryRepair ;
	conn.query(sql, [params.name], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})
// 搜索物业费信息
router.get('/queryPay',(req,res)=>{
	const params= req.query;
	console.log(params);
	const sql = $sql.user.queryPay ;
	conn.query(sql, [params.dNo,params.changedate], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})
// 搜索小区车位
router.get('/queryOrderPark',(req,res)=>{
	const params= req.query;
	console.log(params);
	const sql = $sql.user.queryOrderPark ;
	conn.query(sql, [params.carAddress], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})
// 搜索快递公司
router.get('/queryPassMag',(req,res)=>{
	const params= req.query;
	console.log(params);
	const sql = $sql.user.queryPassMag ;
	conn.query(sql, [params.name], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})
// 搜索收获信息
// router.get('/queryColpass',(req,res)=>{
// 	const params= req.query;
// 	console.log(params);
// 	const sql = $sql.user.queryColpass ;
// 	conn.query(sql, [formatDate(params.paralreadyDate)], function(err, result) {
// 		var data = JSON.parse(JSON.stringify(result))
	
// 		return res.send({
// 			status: 1,
// 			msg: "查询成功",
// 			list: data
// 		})
// 	})
// })
// 搜索留言类型
router.get('/queryNoteType',(req,res)=>{
	const params= req.query;
	console.log(params);
	const sql = $sql.user.queryNoteType ;
	conn.query(sql, [params.type], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
	
		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
})

// 查看报修列表
router.get('/getRepairList', (req, res) => {
	var sql = $sql.user.getRepairList;
	var params = req.query;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});
//   查看小区车位
router.post('/getOrdercar', (req, res) => {
	var sql = $sql.user.getOrdercar;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});
//   查看留言
router.post('/getNoteList', (req, res) => {
	var sql = $sql.user.getNoteList;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});
// 根据id查看公告详情
router.post('/getNoticeMain', (req, res) => {
	var sql = $sql.admin.getNoticeMain;
	var params=req.body;
	console.log(params);
	var id = req.query.id;
	conn.query(sql, [id],(err, result)=> {
		// var data = JSON.parse(JSON.stringify(result))
		if(err) throw err;
		res.send({
			status: 1,
			msg: "查询成功",
			list: result
		});
	})
});
// 新增报修事项
router.post('/addRepair', (req, res) => {
	var sql = $sql.user.addRepair;
	// var params = req.body;
	console.log(req);
	conn.query(sql, [req.body.name, req.body.tel, req.body.address, req.body.beDate, req.body.mark, req.body
		.revalue
	], function(err, result) {
		var data = req.body;
		console.log(result)
		return res.send({
			status: 1,
			msg: "新增成功",
			data: data
		})
	})
});

// 新增留言、投诉
router.post('/addNote', (req, res) => {
	var sql = $sql.user.addNote;
	// var params = req.body;
	console.log(req);
	conn.query(sql, [req.body.title, req.body.mark, req.body.type, req.body.time, req.body.leaverName],
		function(err, result) {
			var data = req.body;
			console.log(result)
			return res.send({
				status: 1,
				msg: "新增成功",
				data: data
			})
		})
});

// 修改用户名
router.post('/updateUserEmail', (req, res) => {
	var sql = $sql.user.updateUserEmail;
	console(req);
	conn.query(sql, [req.body.username, req.body.password, req.body.id], function(err, result) {
		var data = req.body;
		console.log(result)
		return res.send({
			status: 1,
			msg: '修改用户名和邮箱成功',
			data: data
		})
	})
});
// 修改密码
router.post('/updatePwd', (req, res) => {
	var sql = $sql.user.updatePwd;
	console(req);
	conn.query(sql, [req.body.password, req.body.id], function(err, result) {
		var data = req.body;
		console.log(result)
		return res.send({
			status: 1,
			msg: '修改密码成功',
			data: data
		})
	})
})

// 修改密码
// 修改
router.post('/updatePwd', (req, res) => {
	var sql = $sql.user.updatePwd;
	// var params = req.body;
	console.log(req);
	conn.query(sql, [req.body.username, req.body.email, req.body.role, req.body.password, req.body.id],
		function(err, result) {
			var data = req.body;
			console.log(result)
			return res.send({
				status: 1,
				msg: "修改密码成功",
				data: data
			})
		})
});

// 用户信息查看查询
router.post('/queryUserEmailRole', (req, res) => {
	var sql = $sql.user.queryUserEmailRole;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});

// 查看住户资料接口



// 查看物业费用列表
router.post('/getPayList', (req, res) => {
	var sql = $sql.user.getPayList;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});


// 添加报修事项
// 新增文章类型
router.post('/addRepair', (req, res) => {
	var sql = $sql.user.addRepair;
	// var params = req.body;
	console.log(req);
	conn.query(sql, [req.body.name, req.body.tel, req.body.address, req.body.beDate, req.body.mark], function(
		err, result) {
		var data = req.body;
		console.log(result)
		return res.send({
			status: 1,
			msg: "新增成功",
			data: data
		})
	})
});

// 图片上传
//图片上传
// router.post(
// 	"/imgload",
// 	multer({
// 		//设置文件存储路径
// 		dest: "public/images",
// 	}).array("file", 1),
// 	function(req, res, next) {
// 		let files = req.files;
// 		let file = files[0];
// 		let fileInfo = {};
// 		let path = "public/images/" + Date.now().toString() + "_" + file.originalname;
// 		fs.renameSync("./public/images/" + file.filename, path);
// 		//获取文件基本信息
// 		fileInfo.type = file.mimetype;
// 		fileInfo.name = file.originalname;
// 		fileInfo.size = file.size;
// 		fileInfo.path = path;
// 		res.send({
// 			code: 200,
// 			msg: "OK",
// 			data: fileInfo,
// 		});
// 	}
// )


module.exports = router;
