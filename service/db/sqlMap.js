var sqlMap = {
    user: {
        // 注册
        reg: 'insert into user (username, email, password, role ) values (?,?,?,?)',
        //登录
        login: 'select * from user',

        // 修改密码
        updatePwd:'update user set password=? where id=?',
        // 修改用户名与邮箱
        updateUserEmail:'update user set username=?,email=? where id=?',
        // // 用户密码查询
        // queryPwd:'select password from user',
        // 用户名与邮箱、权限查询
        queryUserEmailRole:'select username,email,role,password from user',

        // 查询报修信息列表
        getRepairList:'select * from equip',
        // 查看物业费信息
        getPayList:`select * t_change`,
        // 查看小区车位
        getOrdercar:`select * from carorder`,
        // 查看留言
        getNoteList:`select * from t_leaverword`
    },
    admin:{
        // 查看住户信息
        getUserList:'selectt * from resident',
    }
}

module.exports = sqlMap;