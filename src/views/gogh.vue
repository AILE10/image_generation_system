<template>
  <div id="building">
    <el-container class="home-container">
      <!--头部  -->
      <el-header>
        <div>
          <span>图像生成系统</span>
        </div>
        <div class="user">
          你好：{{ username }}
        </div>
        <!-- 退出按钮 -->
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区  嵌套容器  包裹 Aside与Main -->
      <el-container>
        <!-- 左侧 -->
        <el-aside width="200px">
          <!--          <div class="toggle-button" @click="toggleCollapse()">|||</div>-->
          <!-- 侧边栏菜单区域 -->
          <el-menu
              active-text-color="e6c35c"
              background-color="#545c64"
              text-color="#fff">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>生成类型选择</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="gogh">油画风格</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人主页</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="check">历史生成查询</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="2-2" @click="ques">问题反馈</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <carousel-3d
              :animationSpeed="1000"
              :autoplay="true"
              :autoplayTimeout="3000"
              :controlsHeight="60"
              :display="5"
              :height="350"
              :perspective="35"
              :width="524"
              controlsVisible
          >
            <slide v-for="(item, i) in slides" :key="i" :index="i">

              <!--通过插槽作用域可以拿到点击的图片的索引-->
              <template v-slot:default="obj">
                <img :src="item.src" alt="" @click="imgClick(obj)">
              </template>
            </slide>
          </carousel-3d>
          <el-upload
              :before-remove="beforeRemove"
              :file-list="fileList"
              :limit="5"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              action="http://localhost:80/api/hold/imgload"
              class="upload-demo"
              multiple>
            <div style="display: table-cell; vertical-align: middle;">
            <el-button class="slide"  >点击上传生成图像</el-button>
            </div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {Carousel3d, Slide} from 'vue-carousel-3d'

export default {
  name: 'gogh',
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      username: '',
      fileList: [],//图片列表
      form: {
        num: 0,
        title: '',
        city: '',
        exhibitionType: '',
        extension: '',
        businessHours: '',
        location: '',
        name: '',
        number: '',
        imgBanner: '',
        img: [],
        content: ''
      },
      slides: [
        {
          src: 'https://c.wallhere.com/photos/21/60/1600x1200_px_artwork_blossoms_Classic_Art_painting_Vincent_Van_Gogh-843291.jpg!d',
        },
        {
          src: 'https://c.wallhere.com/photos/8b/99/Vincent_van_Gogh_oil_painting_painting_landscape-1233395.jpg!d',
        },
        {
          src: 'https://c.wallhere.com/photos/28/20/Vase_with_Irises_Vincent_van_Gogh-2185469.jpg!d',
        },
        {
          src: 'https://c.wallhere.com/photos/e5/10/Vincent_van_Gogh_flowers_garden_women_plants_artwork_painting_classic_art-1845885.jpg!d',
        },
        {
          src: 'https://c.wallhere.com/photos/76/85/workers_field_plants_landscape_Vincent_van_Gogh_artwork_classical_art_classic_art-1845887.jpg!d',
        }
      ]
    };
  },
  created() {
    this.username = this.$route.query.name;
  },
  methods: {
    // 退出操作
    //图片上传成功
    uploadSuccess(res, file) {
      //当上传的图片名为"banner.jpg"，则将图片路径赋给form.imgBanner，否则给form.img数组
      if (res.data.name === "banner.jpg") { //我的banner图名字都叫banner.jpg
        this.form.imgBanner = res.data.path
      } else {
        this.form.img.push(res.data.path)
      }
    },
    //删除图片时
    handleRemove(file, fileList) {
      console.log(file, fileList, '1111111');
      //删除图片时也要把form.imgBanner和form.img里的数据删除
      if (file.name === "banner.jpg") {
        this.form.imgBanner = ''
      } else {
        //给数组封装一个方法，用来删除数组中指定的数据
        Array.prototype.contains = function (obj) {
          var i = this.length;
          while (i--) {
            if (this[i] === obj) {
              return i;  // 返回的这个 i 就是元素的索引下标，
            }
          }
          return false;
        }
        const path = file.response.data.path
        this.form.img.splice(this.form.img.contains(path), 1)
        // console.log(this.form.img,'删除后的form.img')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    logout() {
      // 清空token
      window.sessionStorage.clear()
      //  将登录页面转入到登录界面
      this.$router.push('/login')
    },
    gogh() {
      this.$router.push({
            path: '/gogh',
            query: {
              name: this.username
            }
          }
      )

    },
    check() {
      this.$router.push({
            path: '/check',
            query: {
              name: this.username
            }
          }
      )

    },
    ques() {
      this.$router.push({
            path: '/ques',
            query: {
              name: this.username
            }
          }
      )

    }
  }

}
</script>


<style lang="less" scoped>
// 标签的名字就是类的名字
.home-container {
  height: 100%;
}

.el-header {
  background-color: #c4d9f6;
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  //  居中
  align-items: center;
  //  文本颜色
  color: rgba(1, 42, 17, 0.96);
  // 文字大小
  font-size: 30px;

  // 给header中嵌套的div进行样式改造
  // 子代选择器
  > div {
    display: flex;
    //   纵向居中
    align-items: center;

    //   在给div中的span改造样式
    > span {
      margin-left: 20px;
    }
  }
}

.toggle-button {
  background-color: #5a4a64; //背景色(浅灰)
  font-size: 10px; //字体大小10像素
  line-height: 24px; //行高24像素
  color: rgba(129, 17, 17, 0.49); //字体颜色白色
  text-align: center; //字体居中
  letter-spacing: 0.2em; //字体之间的距离
  cursor: pointer; //鼠标的形状（手形）
}

.el-aside {
  background: rgb(196, 217, 246);
  opacity: 0.5;

}

.el-main {
  background-color: #EAEDF1;
  width: 100%;
  height: 100vh;
  opacity: 0.8;
}

.user {
  float: right;
  color: #0a0808;
  font-size: 22px;
  margin-right: 50px;
}

#building {
  background: url("../assets/img/img_1.png");
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  position: fixed;
  background-size: 100% 100%;
}
.slide {
    border: 2px solid #2980b9;
    color: #2980b9;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: .5s;
    text-align: center;
}

.slide::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 0;
    height: 100%;
    left: 0;
    background-color: #2980b9;
    transition: ease-in-out .5s;
}

.slide:hover::before {
    width: 100%;
}
</style>

