const models = require('../../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../../db/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
// 住户信息查询
router.post('/getUserList', (req, res) => {
	var sql = $sql.admin.getUserList;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function (err, result) {
	  var data = JSON.parse(JSON.stringify(result))
	  
	  return res.send({
		status: 1,
		msg: "查询成功",
		list: data
	  })
	})
  });