const express = require("express");
const router = express.Router();
const controller = require("../src/controller/file.controller");
let login = require('../API/login')

router.post("/upload", controller.upload);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);
router.get('/login', login.login)
router.post('/register', login.register)

module.exports = router


