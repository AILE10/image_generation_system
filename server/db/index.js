let mysql = require('mysql')

let db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'
})

module.exports = db