<template>
  <div class="body">
    <div class="main-box">

      <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
        <form v-model="registerForm">
          <h2 class="title">注册</h2>
          <input class="form__input" v-model="registerForm.username" type="text" placeholder="请输入用户名"/>
          <input class="form__input" v-model="registerForm.email" type="text" placeholder="请输入邮箱"/>
          <input class="form__input" v-model="registerForm.password" type="password" placeholder="请输入密码"/>
          <div class="form__button" v-on:click="register">立即注册</div>
        </form>
      </div>
      <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
        <form v-model="loginForm">
          <h2 class="title">登录</h2>
          <input class="form__input" v-model="loginForm.username" type="text" placeholder="用户名/邮箱"/>
          <input class="form__input" v-model="loginForm.password" type="password" placeholder="请输入密码"/>
          <div class="form__button" v-on:click='login'>立即登录</div>
        </form>
      </div>
      <div :class="['switch', { 'login': isLogin }]">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle_top"></div>
        <div class="switch__container">
          <h2>{{ isLogin ? '您好 !' : '欢迎回来 !' }}</h2>
          <p>
            {{isLogin ? '如果您还没有账号，请点击下方立即注册按钮进行账号注册' : '如果您已经注册过账号，请点击下方立即登录按钮进行登录'}}
          </p>
          <div class="form__button" @click="isLogin = !isLogin">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data() {
    return {
      isLogin: true,
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      if(this.loginForm.username == '') {
        this.$message.error('用户名不能为空');
      }else if(this.loginForm.password == '') {
        this.$message.error('密码不能为空');
      }else{
        this.axios.get('/login', {
          params: {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        }).then(res=>{
          if(res.data.status == 200) {
            this.$router.push({
              path: '/home',
              query: {
                name: this.loginForm.username
              }
            })
          }else{
            this.$alert('用户名或密码错误', '登录失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.loginForm.username = '',
                this.loginForm.password = ''
              }
            });
          }
        }).catch(err=>{
            console.log("登录失败" + err);
        })
      }
    },

    register() {
      if(this.registerForm.username == '') {
        this.$message.error('用户名不能为空');
      }else if(this.registerForm.password == '') {
        this.$message.error('密码不能为空');
      }else if(this.registerForm.email == '') {
        this.$message.error('邮箱不能为空');}else{
        this.axios.post('/register', {
          params: {
            username: this.registerForm.username,
            email:this.registerForm.email,
            password: this.registerForm.password
          }
        }).then(res => {
          // console.log(res.data.message);
          if(res.data.status == 200) {
            this.$alert('注册成功', '注册成功', {
              confirmButtonText: '确定',
            })
          }else if(res.data.status == 202) {
            this.$alert('用户名已存在', '注册失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.registerForm.username= '',
                this.registerForm.email = '',
                    this.registerForm.password = ''
              }
            })
          }else{
            console.log(res.message);
          }
        }).catch(err => {
          console.log('操作失败' + err);
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  background-image: url("../assets/img/img.png");
  background-size: cover;
  color: #a0a5a8;

}

.main-box {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 1px 1px 100px 10PX #ecf0f3;
  border-radius: 12px;
  overflow: hidden;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;

      .form__icon {
        object-fit: contain;
        width: 30px;
        margin: 0 5px;
        opacity: .5;
        transition: .15s;

        &:hover {
          opacity: 1;
          transition: .15s;
          cursor: pointer;

        }
      }

      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }

      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }

  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }

  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }

  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }

  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }

  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;

    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }

    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }

    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;

      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }

  .login {
    left: calc(100% - 400px);

    .switch__circle {
      left: 0;
    }
  }

  .form__button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;

    &:hover {
      box-shadow: 2px 2px 3px 0 rgba(255, 255, 255, 50%),
      -2px -2px 3px 0 rgba(116, 125, 136, 50%),
      inset -2px -2px 3px 0 rgba(255, 255, 255, 20%),
      inset 2px 2px 3px 0 rgba(0, 0, 0, 30%);
    }
  }
}
</style>
