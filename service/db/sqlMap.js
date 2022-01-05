var sqlMap = {
    user: {
        // 注册
        reg: 'insert into user (username, email, password, role ) values (?,?,?,?)',
        //登录
        login: 'select * from user',
		// 查询报修信息列表
		getRepairList:'select * from equip',
		// 查看小区车位
		getOrdercar:`select * from carorder`,
		// 查看物业费信息
		getPayList:`select * from t_change`,
		// 查看留言
		getNoteList:`select * from t_leaverword`,
	
	
        // 修改密码
        updatePwd:'update user set password=? where id=?',
        // 修改用户名与邮箱
        updateUserEmail:'update user set username=?,email=? where id=?',
        // // 用户密码查询
        queryPwd:'select password from user',
        // 用户名与邮箱、权限查询
        queryUserEmailRole:'select username,email,role,password from user',
		
		// 添加报修事项
		addRepair:'insert into equip(name,tel,address,beDate,mark,revalue) values(?,?,?,?,?,?)',
		// 添加留言、投诉
		addNote:'insert into t_leaverword (title,mark,type,time,leaverName) values(?,?,?,?)'
		
       
        
    },
	
    admin:{
		// 查询报修信息列表
		getRepairList:'select * from equip',
		// 查看管理员
		getAdminList:`select * from admin`,
		// 查看保安排班信息
		getBAaScList:`select * from pb`,
		// 查看保安信息
		getBaList:`select * from ba`,
		// 查看设备信息
		getEquipList:`select * from chanel`,
		// 查看留言
		getNoteList:`select * from t_leaverword where type="留言"`,
		// 查看投诉
		getCptList:`select * from t_leaverword where type="投诉"`,
		// 小区车位查看
		getCarparkList:`select * from carorder`,
		// 查看车位明细信息
		getNumList:`select * from carnum`,
		// 查看缴纳物业费信息
		getPayListL:`select * from t_change`,
		// 查看物业公司员工信息
		getRenshiList:'select * from rs',
        // 查看住户信息
        getUserList:'select * from resident',
		
		// 新增住户信息
		addData:'insert into resident(username,persionNo,sex,telephone,address,type) values (?,?,?,?,?,?)',
		// 添加报修事项
		addRepair:'insert into equip(name,inName,tel,address,beDate,mark,revalue) values(?,?,?,?,?,?,?)',
		// 添加管理员
		addAdmin:'insert into admin(AdminName,LoginName,persionNo,sex,begDate,post) values(?,?,?,?,?,?)',
		// 添加物业费
		addPay:'insert into t_change(dNo,zName,type,cases,changeName,waterCase,eCase,gasCase,stopCase,mandCase,remark) values (?,?,?,?,?,?,?,?,?,?,?)',
		// 新增预定车位
		addOrderPark:'insert into carorder(userid,persionNo,telephone,address,carAddress,state) values(?,?,?,?,?,?)',
		// 添加设备信息
		addEqu:'insert into chanel(name,model,num,beDate,mark) values(?,?,?,?,?)',
		// 添加物业公司员工信息
		addRs:'insert into rs(AdminName,persionNo,sex,begDate) values(?,?,?,?)',
		// 添加保安排班
		addPb:'insert into pb(name,startTime,endTime) values(?,?,?)',
		// 添加保安信息
		addba:'insert into ba(name,persionNo,sex,begDate,post) values(?,?,?,?,?)',
		
		
		// 删除住户信息
		deleteHouse:'delete from resident where id = ?',
		// 删除管理员
		deleteAdmin:'delete from admin where id = ?',
		// 删除保安
		deleteBa:'delete from ba where id = ?',
		// 删除保安排班
		deletePb:'delete from pb where id = ?',
		// 删除物业人员信息
		deleteRs:'delete from rs where id= ? ',
		// 删除设备信息
		deleteEqu:'delete from chanel where id= ? ',
		// 删除物业费信息
		deletePay:'delete from t_change where id= ? ',
		// 删除报修事项信息
		deleteRepair:'delete from equip where id= ? ',
		// 删除车位明细
		deleteCarnum:'delete from carnum where id= ? ',
		// 删除小区车位
		deleteCarorder:'delete from carorder where id= ? ',
		// 删除留言、投诉
		deleteNote:'delete from t_leaverword where id= ? ',
		
	}
}

module.exports = sqlMap;
// module.exports = router;