var sqlMap = {
    user: {
        // 注册
        reg: 'insert into user (username, email, password, role ) values (?,?,?,?)',
        //登录
        login: 'select * from user where username=? and password=?',
		// 搜索房产管理信息
		ss:'select * from house_mag where rNo like concat("%",?,"%")',
		// 搜索报修实现名称
		queryRepair:'select * from equip where name like concat("%",?,"%")',
		// 搜索物业费信息
		queryPay:'select * from t_change where dNo like concat("%",?,"%") or changedate like concat("%",?,"%")',
		// 搜索小区车位
		queryOrderPark:'select * from carorder where carAddress like concat("%",?,"%")',
		// 搜索快递公司
		queryPassMag:'select * from pass_mag where name like concat("%",?,"%")',
		// 搜索收货日期
		queryColpass:'select * from col_pass where alreadyDate like concat("%",?,"%")',
		// 搜索留言类型
		queryNoteType:'select * from t_leaverword where type=?',
		
		// 查询房产管理信息
		table:'SELECT * FROM `t_change`',
		// 查询报修信息列表
		getRepairList:'select * from equip where inName="住户1"',
		// 查看小区车位
		getOrdercar:`select * from carorder where userid="住户1"`,
		// 查看物业费信息
		getPayList:`select * from t_change`,
		// 查看留言
		getNoteList:`select * from t_leaverword`,
		
		// 查询快递公司
		queryPass:'select * from pass_mag',
	
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
		addNote:'insert into t_leaverword (title,mark,type,time,leaverName) values(?,?,?,?,?)'
		
       
        
    },
	
    admin:{
		// 搜索住户资料
		queryData:'select * from resident where rNo like concat("%",?,"%")',
		// 搜索产权变更信息
		queryHchange:'select * from h_change where rNo like concat("%",?,"%")',
		// 搜索房产管理信息
		// queryHouseMag:'select * from house_mag where rNo or name or sale_status like concat("%",?,"%")',
		// queryHouseMag:'select * from house_mag where CONCAT(rNo, name, sale_status) LIKE CONCAT("%",#{fuzzy},"%")',
		queryHouseMag:'select * from house_mag where rNo like concat("%",?,"%") or name like concat("%",?,"%") or sale_status like concat("%",?,"%")',
		// 搜索管理员信息
		queryAdmin:'select * from admin where AdminName like concat("%",?,"%") or post like concat("%",?,"%")',
		// 搜索保安信息
		queryBA:'select * from ba where name like concat("%",?,"%")',
		// 搜索保安排班信息
		queryPa:'select * from pb where name like concat("%",?,"%")',
		// 搜搜人事管理信息
		queryRenshi:'select * from rs where AdminName like concat("%",?,"%") or post like concat("%",?,"%")',
		
		
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
		// 查看公告列表
		getNoticeList:'select * from notice',
		// 根据id查询公告详情
		getNoticeMain:'select * from notice where id=?',
		// 查看房产管理信息
		getHouseMagList:'select * from house_mag',
		// 住户模糊查询
		// queryUserList:'select * from resident where username like '%*%',
		
		
		// 新增住户信息
		addData:'insert into resident(rNo,username,persionNo,sex,telephone,date,dateDue) values (?,?,?,?,?,?,?)',
		// 添加报修事项
		addRepair:'insert into equip(name,inName,tel,address,beDate,mark,revalue) values(?,?,?,?,?,?,?)',
		// 添加管理员
		addAdmin:'insert into admin(AdminName,persionNo,sex,begDate,post) values(?,?,?,?,?)',
		// 添加物业费
		addPay:'insert into t_change(dNo,zName,type,cases,changeName,waterCase,eCase,gasCase,stopCase,mandCase,remark,state,payabledate) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
		// 新增预定车位
		addOrderPark:'insert into carorder(userid,persionNo,telephone,address,carAddress,changedate,state) values(?,?,?,?,?,?,?)',
		// 添加设备信息
		addEqu:'insert into chanel(name,model,num,beDate,mark,inName,price) values(?,?,?,?,?,?,?)',
		// 添加物业公司员工信息
		addRs:'insert into rs(AdminName,persionNo,sex,begDate,post) values(?,?,?,?,?)',
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
		// 新增公告信息
		addNotice:'insert into notice(title,content,time,name) values (?,?,?,?)',
		// 新增房产管理信息
		addHouseMag:'insert into house_mag(rNo,buildArea,ableArea,name,sale_status,own_status) values (?,?,?,?,?,?)',
		
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
		// 删除公告
		deleteNotice:'delete from notice where id=?',
		// 删除房产信息
		deleteHouseMag:'delete from house_mag where id=?',
		
		// 修改住户信息
		updateData:'update resident set rNo=?,username=?,persionNo=?,sex=?,telephone=?,date=?,dateDue=? where id=?',
		// 修改管理员信息
		updateAdmin:'update admin set AdminName=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 修改保安信息
		updateBa:'update ba set name=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 修改保安排班记录
		updatePb:'update pb set name=?,startTime=?,endTime=? where id=?',
		// 修改物业人员信息
		updateRs:'update rs set AdminName=?,LoginName=?,LoginPwd=?,persionNo=?,sex=?,begDate=?,post=? where id=?',
		// 管理员回复留言
		updateNote:'update t_leaverword set answerContent=?,reDate=? where id=?',
		// 管理员回复投诉
		updateCpt:'update t_leaverword set answerContent=?,reDate=? where id=?',
		// 修改车位明细信息
		updateCarnum:'update carnum set num=? where id=?',
		// 修改设备信息
		updateEqu:'update chanel set name=?,mark=?,model=?,num=?,beDate=?,inName=?,price=? where id=?',
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
		updateColPass:'update col_pass set isreceive=?,alreadyDate=? where id=?',
		// 编辑公告内容
		updateNotice:'update notice set title=?,content=?,time=? where id=?',
		// 编辑房产管理信息
		updateHouseMag:'update house_mag set rNo=?,buildArea=?,ableArea=?,name=?,sale_status=?,own_status=? where id=?',
		
	}
}

module.exports = sqlMap;
// module.exports = router;