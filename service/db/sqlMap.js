var sqlMap = {
    user: {
        add: 'insert into user (username, email, password, role ) values (?,?,?,?)',
        select: 'select * from user'
    }
}

module.exports = sqlMap;