let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())              //配置跨域
app.use(router)              //配置路由
let port = 80;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
})
