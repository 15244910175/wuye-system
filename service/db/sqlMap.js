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
		// 产权变更管理
		getHchangeList:'select * from h_change',
		// 租赁资料
		getleaseholdList:'select * from leasehold',
		// 查看快递公司信息
		getPassMagList:'select * from pass_Mag',
		// 查看代收快递信息
		getColpassList:'select * from col_pass',
		
		// 新增住户信息
		addData:'insert into resident(rNo,username,persionNo,sex,telephone,date) values (?,?,?,?,?,?)',
		// 添加报修事项
		addRepair:'insert into equip(name,inName,tel,address,beDate,mark,revalue) values(?,?,?,?,?,?,?)',
		// 添加管理员
		addAdmin:'insert into admin(AdminName,LoginName,persionNo,sex,begDate,post) values(?,?,?,?,?,?)',
		// 添加物业费
		addPay:'insert into t_change(dNo,zName,type,cases,changeName,waterCase,eCase,gasCase,stopCase,mandCase,remark,changedate,state,payabledate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
		// 新增车位总数明细
		addCarnum:'insert into carnum(num,date) values (?,?)',
		// 新增租赁信息
		addLeasehold:'insert into leasehold(name,rNo,persionNo,reTime,dateDue) values (?,?,?,?,?)',
		// 新增产权变更信息
		addHchange:'insert into h_change(rNo,oldOwner,nowOwner,changedate) values (?,?,?,?)',
		// 新增代收快递信息·
		addColPass:'insert into col_pass(name,username,tel,address,date,isreceive) values (?,?,?,?,?,?)',
		
		
		// 新增快递公司管理信息
		addPassMag:'insert into pass_mag(name,username,tel,address) values (?,?,?,?)',
		
		
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
		// 删除租赁信息
		deleteLeasehold:'delete from leasehold where id=?',
		// 删除产权变更信息
		deleteHchange:'delete from h_change where id=?',
		// 删除快递公司信息
		deletePassMag:'delete from pass_mag where id=?',
		// 删除代收快递信息
		deleteColPass:'delete from col_pass where id=?',
		
		// 修改住户信息
		updateData:'update resident set rNo=?,username=?,persionNo=?,sex=?,telephone=?,date=? where id=?',
		// 修改管理员信息
		updateAdmin:'update admin set AdminName=?,LoginName=?,LoginPwd=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 修改保安信息
		updateBa:'update ba set name=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 修改保安排班记录
		updatePb:'update pb set name=?,startTime=?,endTime=? where id=?',
		// 修改物业人员信息
		updateRs:'update rs set AdminName=?,LoginName=?,LoginPwd=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 管理员回复留言
		updateNote:'update t_leaverword set answerContent=? where id=?',
		// 管理员回复投诉
		updateCpt:'update t_leaverword set answerContent=? where id=?',
		// 修改车位明细信息
		updateCarnum:'update carnum set num=? where id=?',
		// 修改设备信息
		updateEqu:'update chanel set name=?,mark=?,model=?,num=?,beDate=? where id=?',
		// 修改物业费信息
		updatePay:'update t_change set dNo=?,type=?,changeName=?,zName=?,cases=?,waterCase=?,eCase=?,gasCase=?,stopCase=?,mandCase=?,remark=?,payabledate=? where id=?',
		// 标记已修
		updateRevalue:'update equip set revalue=? where id=?',
		// 标记已缴费
		updateAlrdypay:'update t_change set state=? where id=?',
		// 审核小区车位
		updateCarorder:'update carorder set pass=?,state=? where id=?',
		// 编辑租赁信息
		updateLeasehold:'update leasehold set name=?,rNo=?,persionNo=?,reTime=?,dateDue=? where id=?',
		// 编辑产权变更管理
		updateHchange:'update h_change set rNo=?,oldOwner=?,nowOwner=?,changedate=? where id=?',
		// 编辑快递公司信息
		updatePassMag:'update pass_mag set name=?,username=?,tel=?,address=? where id=?',
		// 编辑代收快递信息领取与否
		updateColPass:'update col_pass set isreceive=? where id=?',
	}
}

module.exports = sqlMap;
// module.exports = router;