let db = require('../db')

exports.login = (req, res) => {
  var sql = 'select * from userinfo where username = ? and password = ?'
  db.query(sql, [req.query.username, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }

      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}

exports.register = (req, res) => {
  const sql1 = 'select * from userinfo where username = ?'
  const sql2 = 'insert into userinfo (username, password,email) value (?, ?,?)'
  db.query(sql1, [req.body.params.username], (err, data) => {
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }
    if(data.length > 0) {
      return res.send({
        status: 202,
        message: '用户名已存在'
      })
    }else{
      // return res.send({
      //   status: 200,
      //   message: '注册成功'
      // })
      db.query(sql2, [req.body.params.username, req.body.params.password,req.body.params.email], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "注册失败"
            })
        }
        res.send({
          status: 200,
          message: "注册成功"
        })
      })
    }
  })
}
