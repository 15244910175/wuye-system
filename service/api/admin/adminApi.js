const models = require('../../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../../db/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// 查看报修列表
router.post('/getRepairList', (req, res) => {
	var sql = $sql.admin.getRepairList;
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
// 查看管理员
router.post(`/getAdminList`, (req, res) => {
	var sql = $sql.admin.getAdminList;
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
// 查看保安信息
router.post(`/getBaList`, (req, res) => {
	var sql = $sql.admin.getBaList;
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
// 查看保安排班信息
router.post(`/getBAaScList`, (req, res) => {
	var sql = $sql.admin.getBAaScList;
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
// 查看设备信息
router.post(`/getEquipList`, (req, res) => {
	var sql = $sql.admin.getEquipList;
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
// 查看缴纳物业费信息
router.post(`/getPayListL`, (req, res) => {
	var sql = $sql.admin.getPayListL;
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
// 查看留言信息
router.post('/getNoteList', (req, res) => {
	var sql = $sql.admin.getNoteList;
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
// 查看投诉信息
router.post('/getCptList', (req, res) => {
	var sql = $sql.admin.getCptList;
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
// 小区车位查看
router.post(`/getCarparkList`, (req, res) => {
	var sql = $sql.admin.getCarparkList;
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
// 查看车位明细信息
router.post(`/getNumList`, (req, res) => {
	var sql = $sql.admin.getNumList;
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


// 查看物业公司员工信息
// 报错：SyntaxError: Unexpected token u in JSON at position 0
router.post(`/getRenshiList`, (req, res) => {
	var sql = $sql.admin.getRenshiList;
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



// 查看住户信息
// 报错：SyntaxError: Unexpected token u in JSON at position 0
router.post('/getUserList', (req, res) => {
	var sql = $sql.admin.getUserList;
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



module.exports = router;
