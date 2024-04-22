<template>
  <div id="building">
   <el-container class="home-container">
       <!--头部  -->
       <el-header>
           <div>
<!--              <img src="../assets/img/background.jpg" alt="">-->
              <span>图像生成系统</span>
           </div>
         <div class="user">
          你好：{{username}}
        </div>
           <!-- 退出按钮 -->
            <el-button type="info" @click="logout">退出</el-button>
       </el-header>
       <!-- 页面主体区  嵌套容器  包裹 Aside与Main -->
       <el-container>
             <!-- 左侧 -->
             <el-aside width="200px">

             </el-aside>
             <!-- 主体 -->
             <el-main>Main</el-main>
       </el-container>


   </el-container>
  </div>
</template>

<script >

export default{
  name:'Home',
    data () {
      return {
        username: ''
      };
    },
    created() {
      this.username = this.$route.query.name;
    },
   methods:{
    // 退出操作
    logout(){
    // 清空token
     window.sessionStorage.clear()
    //  将登录页面转入到登录界面
    this.$router.push('/login')
    }
   }
}
</script>


<style scoped lang="less">
    // 标签的名字就是类的名字
   .home-container{
    height: 100%;
   }
  .el-header{
     background-color: #c4d9f6;
     opacity: 0.25;
     display: flex;
     justify-content: space-between;
     padding-left: 0px;
    //  居中
     align-items:center;
    //  文本颜色
    color: rgba(1, 42, 17, 0.96);
    // 文字大小
    font-size: 20px;

    // 给header中嵌套的div进行样式改造
    // 子代选择器
    >div{
      display:flex;
    //   纵向居中
      align-items:center;

    //   在给div中的span改造样式
       >span{
        margin-left: 20px;
       }
    }
  }

  .el-aside{
    background: rgb(196, 217, 246);
    opacity: 0.25;

  }

  .el-main{
    background-color: #EAEDF1;
    width: 100%;
    height: 100vh;
  }
    .user {
    float: right;
    color: #043819;
    font-size: 22px;
    margin-right: 50px;
  }

#building{
background:url("../assets/img/img.png");
width:100%;			//大小设置为100%
height:100%;			//大小设置为100%
position:fixed;
background-size:100% 100%;}
</style>

