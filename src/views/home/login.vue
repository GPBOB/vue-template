<template>
  <div class="login">
    <div class="loginForm">
      <p class="loginTitle">青羊区复工复产安全生产平台</p>
      <Input
        type="text"
        v-model="phone"
        class="loginInput"
        placeholder="请输入手机账号"
      />
      <Input
        type="password"
        v-model="password"
        class="loginInput"
        placeholder="请输入密码"
      />
      <Button
        type="primary"
        class="loginInput"
        @click="login"
        :disabled="isLogin"
        >登录</Button
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
const userApi = require(`@/api/user`).default;
export default {
  name: 'login',
  data() {
    return {
      phone: '',
      password: '',
      isLogin: false
    };
  },
  created() {
    // console.log(111)
  },
  computed: {},
  components: {},
  methods: {
    ...mapMutations(['setTokens', 'setuserInfo']),
    login() {
      this.isLogin = true;
      userApi
        .login({
          phone: this.phone,
          password: this.password
        })
        .then(res => {
          this.isLogin = false;
          this.setTokens(res.data.data.token);
          this.getUserInfo();
        })
        .catch(err => {
          this.isLogin = false;
          this.$Message.error({
            content: err.response.data.message
          });
        });
    },
    getUserInfo() {
      userApi.getLoginUserInfo().then(res => {
        if (res.data.data != '') {
          this.isLogin = false;
          this.setuserInfo(res.data.data);
          // let permission = vuex.state.user.userInfo.deptLevel;
          this.$Message.success('登录成功');
          this.$router.push({
            path: '/'
          });
        } else {
          this.isLogin = false;
          this.$Message.fail('登录失败');
        }
      });
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(../../assets/images/loginBg.png);
  background-size: 100% 100%;
  .loginLogo {
    width: 200px;
    height: 200px;
  }
  .loginForm {
    width: 400px;
    height: 250px;
    border-radius: 10px;
    box-shadow: 1px 2px 16px #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    .loginTitle {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      line-height: 50px;
    }
    .loginInput {
      width: 300px;
      margin: 10px;
    }
  }
}
</style>
