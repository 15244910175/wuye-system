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
		
		
		// 添加报修事项
		addRepair:'insert into equip (name,tel,address,beDate,mark) values (?,?,?,?,?)',
        // 修改密码
        updatePwd:'update user set password=? where id=?',
        // 修改用户名与邮箱
        updateUserEmail:'update user set username=?,email=? where id=?',
        // // 用户密码查询
        queryPwd:'select password from user',
        // 用户名与邮箱、权限查询
        queryUserEmailRole:'select username,email,role,password from user',

       
        // 查看物业费信息
        getPayList:`select * t_change`,
       
        // 查看留言
        getNoteList:`select * from t_leaverword`
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
		getRenshiList:'select AdminName,persionNo,beDate,post from rs',
		
        // 查看住户信息
        getUserList:'selectt * from resident',
		
    }
}

module.exports = sqlMap;
// module.exports = router;