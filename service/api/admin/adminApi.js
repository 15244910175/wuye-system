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



// 新增住户信息
router.post('/addData', (req, res) => {
  var sql = $sql.admin.addData;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.username, req.body.persionNo, req.body.sex, req.body.telephone,req.body.address,req.body.type], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
// 新增报修事项
router.post('/addRepair', (req, res) => {
  var sql = $sql.admin.addRepair;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.inName, req.body.tel, req.body.address,req.body.beDate,req.body.mark,req.body.revalue], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 新增预定车位
router.post('/addOrderPark', (req, res) => {
  var sql = $sql.admin.addOrderPark;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.userid, req.body.persionNo, req.body.telephone, req.body.address,req.body.carAddress,req.body.state], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});



// 添加物业费用
router.post('/addPay', (req, res) => {
  var sql = $sql.admin.addPay;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.dNo, req.body.zName, req.body.type, req.body.cases,req.body.changeName,req.body.waterCase,req.body.eCase,req.body.gasCase,req.body.stopCase,req.body.mandCase,req.body.remark,req.body.state,req.body.payabledate], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 添加设备信息
router.post('/addEqu', (req, res) => {
  var sql = $sql.admin.addEqu;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.model, req.body.num, req.body.beDate,req.body.mark], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});


// 新增物业公司员工信息
router.post('/addRs', (req, res) => {
  var sql = $sql.admin.addRs;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.AdminName, req.body.persionNo, req.body.sex, req.body.begDate], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});


// 新增保安排班
router.post('/addPb', (req, res) => {
  var sql = $sql.admin.addPb;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.startTime, req.body.endTime], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 新增保安
router.post('/addba', (req, res) => {
  var sql = $sql.admin.addba;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.persionNo, req.body.sex, req.body.begDate,req.body.post], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 新增管理员
router.post('/addAdmin', (req, res) => {
  var sql = $sql.admin.addAdmin;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.AdminName, req.body.LoginName, req.body.persionNo, req.body.sex,req.body.begDate,req.body.post], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
// 新增车位总数明细
router.post('/addCarnum', (req, res) => {
  var sql = $sql.admin.addCarnum;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.num, req.body.date], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 删除住户信息
router.post('/deleteHouse', (req, res) => {
  var sql = $sql.admin.deleteHouse;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});


// 删除管理员
router.post('/deleteAdmin', (req, res) => {
  var sql = $sql.admin.deleteAdmin;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});

// 删除保安
router.post('/deleteBa', (req, res) => {
  var sql = $sql.admin.deleteBa;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});

// 删除保安排班
router.post('/deletePb', (req, res) => {
  var sql = $sql.admin.deletePb;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
// 删除物业人员
router.post('/deleteRs', (req, res) => {
  var sql = $sql.admin.deleteRs;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
// 删除设备信息
router.post('/deleteEqu', (req, res) => {
  var sql = $sql.admin.deleteEqu;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
//删除物业费信息
router.post('/deletePay', (req, res) => {
  var sql = $sql.admin.deletePay;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
//删除报修事项信息
router.post('/deleteRepair', (req, res) => {
  var sql = $sql.admin.deleteRepair;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});

//删除车位明细
router.post('/deleteCarnum', (req, res) => {
  var sql = $sql.admin.deleteCarnum;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
//删除小区车位
router.post('/deleteCarorder', (req, res) => {
  var sql = $sql.admin.deleteCarorder;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});
//删除留言、投诉
router.post('/deleteNote', (req, res) => {
  var sql = $sql.admin.deleteNote;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});

// 修改住户信息
router.post('/updateData', (req, res) => {
  var sql = $sql.admin.updateData;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.username, req.body.telephone, req.body.persionNo, req.body.address,req.body.sex,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 修改管理员信息
router.post('/updateAdmin', (req, res) => {
  var sql = $sql.admin.updateAdmin;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.AdminName, req.body.LoginName, req.body.LoginPwd, req.body.persionNo,req.body.sex,req.body.begDate,req.body.post,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 修改保安信息
router.post('/updateBa', (req, res) => {
  var sql = $sql.admin.updateBa;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.persionNo,req.body.sex,req.body.begDate,req.body.post,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 修改保安排版记录
router.post('/updatePb', (req, res) => {
  var sql = $sql.admin.updatePb;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.startTime,req.body.endTime,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 修改物业人员信息
router.post('/updateRs', (req, res) => {
  var sql = $sql.admin.updateRs;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.AdminName, req.body.LoginName,req.body.LoginPwd,req.body.persionNo,req.body.sex,req.body.begDate,req.body.post,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 管理员回复留言
router.post('/updateNote', (req, res) => {
  var sql = $sql.admin.updateNote;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.answerContent,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 管理员回复投诉
router.post('/updateCpt', (req, res) => {
  var sql = $sql.admin.updateCpt;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.answerContent,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});






// 修改车位总数信息
router.post('/updateCarnum', (req, res) => {
  var sql = $sql.admin.updateCarnum;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.num,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 修改物业费用信息
router.post('/updatePay', (req, res) => {
  var sql = $sql.admin.updatePay;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.dNo, req.body.type,req.body.changeName,req.body.zName,req.body.cases,req.body.waterCase,req.body.eCase,req.body.gasCase,req.body.stopCase,req.body.mandCase,req.body.remark,req.body.payabledate,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 修改设备信息
router.post('/updateEqu', (req, res) => {
  var sql = $sql.admin.updateEqu;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name, req.body.mark,req.body.model,req.body.num,req.body.beDate,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 标记已修
router.post('/updateRevalue', (req, res) => {
  var sql = $sql.admin.updateRevalue;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.revalue,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 标记已缴费
router.post('/updateAlrdypay', (req, res) => {
  var sql = $sql.admin.updateAlrdypay;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.state,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});






// 审核小区车位
router.post('/updateCarorder', (req, res) => {
  var sql = $sql.admin.updateCarorder;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.pass,req.body.state, req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
module.exports = router;
