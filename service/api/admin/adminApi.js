const models = require('../../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../../db/sqlMap');
const xlsx = require('node-xlsx');


// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// 搜索住户资料
router.get('/queryData', (req, res) => {
	var sql = $sql.admin.queryData;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.rNo], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});
// 搜索产权变更
router.get('/queryHchange', (req, res) => {
	var sql = $sql.admin.queryHchange;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.rNo], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "查询成功",
			list: data
		})
	})
});
// 搜索房产管理信息
router.get('/queryHouseMag', (req, res) => {
	var sql = $sql.admin.queryHouseMag;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.rNo,params.name,params.sale_status], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
// var data = req.body;
		return res.send({
			status: 1,
			msg: "查询成功",
			list:data
		})
	})
});
// 搜索管理员信息
router.get('/queryAdmin', (req, res) => {
	var sql = $sql.admin.queryAdmin;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.AdminName,params.post], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
// var data = req.body;
		return res.send({
			status: 1,
			msg: "查询成功",
			list:data
		})
	})
});
// 搜索管理员信息
router.get('/queryBA', (req, res) => {
	var sql = $sql.admin.queryBA;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.name], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
// var data = req.body;
		return res.send({
			status: 1,
			msg: "查询成功",
			list:data
		})
	})
});
// 搜索保安排班信息
router.get('/queryPa', (req, res) => {
	var sql = $sql.admin.queryPa;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.name], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
// var data = req.body;
		return res.send({
			status: 1,
			msg: "查询成功",
			list:data
		})
	})
});
// 搜索人事管理信息
router.get('/queryRenshi', (req, res) => {
	var sql = $sql.admin.queryRenshi;
	var params = req.query;
	console.log(params);
	conn.query(sql, [params.AdminName,params.post], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))
// var data = req.body;
		return res.send({
			status: 1,
			msg: "查询成功",
			list:data
		})
	})
});


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

// 模糊查询住户信息







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
// 产权变更管理
router.post('/getHchangeList', (req, res) => {
	var sql = $sql.admin.getHchangeList;
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

// 租赁资料
router.post('/getleaseholdList', (req, res) => {
	var sql = $sql.admin.getleaseholdList;
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
// 查看快递公司信息
router.post('/getPassMagList', (req, res) => {
	var sql = $sql.admin.getPassMagList;
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
// 查看代收快递信息
router.post('/getColpassList', (req, res) => {
	var sql = $sql.admin.getColpassList;
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
// 查看公告列表
router.post('/getNoticeList', (req, res) => {
	var sql = $sql.admin.getNoticeList;
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
// 查看房产信息列表
router.post('/getHouseMagList', (req, res) => {
	var sql = $sql.admin.getHouseMagList;
	var params = req.body;
	console.log(params);
	conn.query(sql, [], function(err, result) {
		var data = JSON.parse(JSON.stringify(result))

		return res.send({
			status: 1,
			msg: "获取数据成功",
			list: data
		})
	})
});



// 新增住户信息
router.post('/addData', (req, res) => {
  var sql = $sql.admin.addData;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.rNo,req.body.username, req.body.persionNo, req.body.sex, req.body.telephone,req.body.date,req.body.dateDue], function (err, result) {
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
  conn.query(sql, [req.body.userid, req.body.persionNo, req.body.telephone, req.body.address,req.body.carAddress,req.body.changedate,req.body.state], function (err, result) {
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
  conn.query(sql, [req.body.name, req.body.model, req.body.num, req.body.beDate,req.body.mark,req.body.inName,req.body.price], function (err, result) {
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
  conn.query(sql, [req.body.AdminName, req.body.persionNo, req.body.sex, req.body.begDate,req.body.post], function (err, result) {
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
  conn.query(sql, [req.body.AdminName, req.body.persionNo, req.body.sex,req.body.begDate,req.body.post], function (err, result) {
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


// 新增租赁信息
router.post('/addLeasehold', (req, res) => {
  var sql = $sql.admin.addLeasehold;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name,req.body.rNo,req.body.persionNo,req.body.reTime,req.body.dateDue], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});

// 新增产权变更信息
router.post('/addHchange', (req, res) => {
  var sql = $sql.admin.addHchange;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.rNo,req.body.oldOwner,req.body.nowOwner,req.body.changedate], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
// 新增代收快递信息
router.post('/addColPass', (req, res) => {
  var sql = $sql.admin.addColPass;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name,req.body.username,req.body.tel,req.body.address,req.body.date,req.body.isreceive], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
// 新增房产管理信息
router.post('/addHouseMag', (req, res) => {
  var sql = $sql.admin.addHouseMag;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.rNo,req.body.buildArea,req.body.ableArea,req.body.name,req.body.sale_status,req.body.own_status], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});



// 新增快递公司管理
router.post('/addPassMag', (req, res) => {
  var sql = $sql.admin.addPassMag;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name,req.body.username,req.body.tel,req.body.address], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
// 新增公告信息
router.post('/addNotice', (req, res) => {
  var sql = $sql.admin.addNotice;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.title,req.body.content,req.body.time,req.body.name], function (err, result) {
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
// 删除租赁信息
router.post('/deleteLeasehold', (req, res) => {
  var sql = $sql.admin.deleteLeasehold;
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
// 删除产权变更信息
router.post('/deleteHchange', (req, res) => {
  var sql = $sql.admin.deleteHchange;
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

// 删除快递公司管理信息
router.post('/deletePassMag', (req, res) => {
  var sql = $sql.admin.deletePassMag;
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
// 删除代收快递信息
router.post('/deleteColPass', (req, res) => {
  var sql = $sql.admin.deleteColPass;
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
// 删除公告
router.post('/deleteNotice', (req, res) => {
  var sql = $sql.admin.deleteNotice;
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
// 删除房产信息
router.post('/deleteHouseMag', (req, res) => {
  var sql = $sql.admin.deleteHouseMag;
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
  conn.query(sql, [req.body.rNo,req.body.username, req.body.persionNo, req.body.sex,req.body.telephone,req.body.date,req.body.dateDue,req.body.id], function (err, result) {
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
  conn.query(sql, [req.body.AdminName,req.body.persionNo,req.body.sex,req.body.begDate,req.body.post,req.body.id], function (err, result) {
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
  conn.query(sql, [req.body.answerContent,req.body.reDate,req.body.id], function (err, result) {
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
  conn.query(sql, [req.body.answerContent,req.body.reDate,req.body.id], function (err, result) {
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
  conn.query(sql, [req.body.name, req.body.mark,req.body.model,req.body.num,req.body.beDate,req.body.inName,req.body.price,req.body.id], function (err, result) {
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
// 编辑租赁信息
router.post('/updateLeasehold', (req, res) => {
  var sql = $sql.admin.updateLeasehold;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name,req.body.rNo,req.body.persionNo,req.body.reTime,req.body.dateDue,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 编辑产权变更管理
router.post('/updateHchange', (req, res) => {
  var sql = $sql.admin.updateHchange;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.rNo,req.body.oldOwner,req.body.nowOwner,req.body.changedate,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 编辑快递公司管理信息
router.post('/updatePassMag', (req, res) => {
  var sql = $sql.admin.updatePassMag;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.name,req.body.username,req.body.tel,req.body.address,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 编辑代收快递信息
router.post('/updateColPass', (req, res) => {
  var sql = $sql.admin.updateColPass;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.isreceive,req.body.alreadyDate,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 编辑公告内容
router.post('/updateNotice', (req, res) => {
  var sql = $sql.admin.updateNotice;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.title,req.body.content,req.body.time,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});
// 编辑房产管理信息
router.post('/updateHouseMag', (req, res) => {
  var sql = $sql.admin.updateHouseMag;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.rNo,req.body.buildArea,req.body.ableArea,req.body.name,req.body.sale_status,req.body.own_status,req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 住户资料导出
router.get('/exportExcel',async (req,res) => {
    let data = [];
    let title = ['住户编号','房号','住户姓名','住户电话','住户身份证','住户性别','住户入住时间'];
    data.push(title);
    let result = await PayInfo.find();
    result.forEach(item => {
        let arrInner = [];
        arrInner.push(item.id);
        arrInner.push(item.rNo);
        arrInner.push(item.username);
        arrInner.push(item.telephone);
        arrInner.push(item.persionNo);
        arrInner.push(item.sex);
        arrInner.push(item.date);
        data.push(arrInner);
    });
    let buffer = xlsx.build([
        {
            name:'住户资料信息',
            data:data
        }
    ]);
    console.log(buffer);
    res.send(buffer);
    // fs.writeFileSync('./excel.xlsx',buffer,{'flag':'w'});

})

module.exports = router;
