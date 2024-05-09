const express = require("express");
const router = express.Router();
let login = require('../API/login')
const multer = require('multer')
const fs = require('fs')
router.get('/login', login.login)
router.post('/register', login.register)
router.post('/feedback', login.feedback)
//图片上传
router.post(
    "/api/hold/imgload",
    multer({
      //设置文件存储路径
      dest: "../picture",
    }).array("file", 1),
    function (req, res, next) {
      let files = req.files;
      let file = files[0];
      let fileInfo = {};
      let path = "../picture/" + Date.now().toString() + "_" + file.originalname;
      fs.renameSync("../picture/" + file.filename, path);
      //获取文件基本信息
      fileInfo.type = file.mimetype;
      fileInfo.name = file.originalname;
      fileInfo.size = file.size;
      fileInfo.path = path;
      res.send({
        code: 200,
        msg: "OK",
        data: fileInfo,
      });
    }
)



module.exports = router


