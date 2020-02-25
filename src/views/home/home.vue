<template>
  <div class="home">
    <div class="content">
      <div class="topBar">
        <div class="sysName">
          <span>青羊区复工复产安全生产平台</span>
        </div>
        <Dropdown>
          <div class="menuTop">
            <img :src="$store.state.user.userInfo.headPortrait" alt />
            <div class="userInfo">
              <!-- <p class="userName">离线</p> -->
              <p class="userRole">{{$store.state.user.userInfo.name}}</p>
              <Icon type="ios-arrow-down"></Icon>
            </div>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="openChange">修改密码</DropdownItem>
          </DropdownMenu>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="loginOut">安全退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <!-- <div class="userExit" @click="loginOut">安全退出</div> -->
      </div>
      <div class="sysContent">
        <Layout></Layout>
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Modal title="修改密码" v-model="pwdModel" :mask-closable="false">
      <Form>
        <Row>
          <Col span="24">
            <FormItem label="旧密码">
              <Input type="password" v-model="password" placeholder="请输入旧密码" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="新密码">
              <Input type="password" v-model="newPassword" placeholder="请输入新密码" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="确认新密码">
              <Input type="password" v-model="rePassword" placeholder="请输入新密码" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="changePswd">修改</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Layout from "views/home/layout";
import { mapMutations, mapState } from "vuex";
import store from "@/utils/store";
const userApi = require(`@/api/user`).default;
export default {
  name: "AppMain",
  data() {
    return {
      store,
      pwdModel: false,
      password: "",
      newPassword: "",
      rePassword: ""
    };
  },
  created() {},
  components: {
    Layout
  },
  inject: ["reload"],
  methods: {
    ...mapMutations(["loginOutUser"]),
    loginOut() {
      this.loginOutUser();
      this.$router.push({ path: "/login" });
    },
    openChange() {
      this.pwdModel = true;
    },
    cancel() {
      this.reload();
    },
    changePswd() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (this.password == "") {
        this.$Message.info("请输入旧密码");
        return false;
      }
      if (this.newPassword == "") {
        this.$Message.info("请输入新密码");
        return false;
      }
      if (!reg.test(this.newPassword)) {
        this.$Message.info("密码至少包含数字和英文，长度6-20");
        return false;
      }
      if (this.rePassword != this.newPassword) {
        this.$Message.info("请重复密码鱼新密码不同！");
        return false;
      }
      userApi
        .editPswd({
          password: this.password,
          newPassword: this.newPassword
        })
        .then(() => {
          this.$Message.success("修改成功");
          this.loginOutUser();
          this.$store.commit("setIsMountedRoute",false)
          this.$router.push({path:"/login"})
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
        });
    }
  },
  computed: {
    ...mapState(["user"])
    // eslint-disable-next-line vue/return-in-computed-property
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  .content {
    width: 100%;
    .topBar {
      width: 100%;
      height: 80px;
      color: #fff;

      background-color: #2b59c1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sysName {
        margin-left: 20px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .userExit {
        margin-right: 20px;
        font-size: 18px;
        cursor: pointer;
      }
      .menuTop {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .userInfo {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .userName {
            font-size: 20px;
          }
        }
      }
    }
    .sysContent {
      width: 100%;
      min-height: calc(100% - 120px);
      box-shadow: 1px 2px 5px #333333;
      display: flex;
      .mainContent {
        width: calc(100% - 240px);
      }
    }
  }
}
</style>
