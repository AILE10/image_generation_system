<template>
  <div id="main">
    <el-container>
      <el-header>
        <div class="name" >
            欢迎使用图像生成系统
        </div>
        <div class="user">
          你好：{{username}}
        </div>
      </el-header>
      <el-main>

      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>

import * as THREE from "three";
import FOG from "vanta/src/vanta.fog";

export default {
  data () {
    return {
      username: ''
    };
  },
  created() {
    this.username = this.$route.query.name;
  }
}
</script>

<style scoped>
#main {
    width: 100%;
  }
  .el-header{
    color: #333;
    line-height: 60px;
  }
  .el-main{
      width: 100%;
      height: 100vh;
      background-image: url("../assets/img/background.jpg");
  }
  .el-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .logo {
    float: left;
    margin: 0 auto;
  }
  .logo img{
    padding-top: 5px;
    height: 50px;
  }
  .user {
    float: right;
    color: #000000;
    font-size: 22px;
    margin-right: 50px;
  }
  .name{
    float: left;
    color: #000000;
    font-size: 22px;
    margin-right: 50px;
  }
</style>



