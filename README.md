# login_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 运行前须知
* 项目中使用到的数据库和数据表需自行在本地创建，并修改./server/db/index.js中的对应信息
* 没有数据库的，需要创建一个test数据库，在数据库中创建一个user表用户存储用户登录信息，包含name和password两个属性
* 如已有数据库，记得修改./server/db/index.js中的对应信息，以及./server/API/login.js中的sql语句
* 最后，运行项目前，记得先运行服务器（终端：...项目地址/server>node app.js），否则接口会访问不了，server文件夹下关于服务器的内容有修改的，保存后要重启服务器
### 项目运行有问题
可参考https://blog.csdn.net/weixin_52580677/article/details/123369240
有问题博客文章留言