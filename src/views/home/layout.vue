<template>
  <div class="layout">
    <Menu>
      <MenuItem
        v-show="role==item.meta.role  && item.meta.isMenu"
        :name="item.name"
        v-for="(item,index) in menuRouter"
        :key="index"
        @click.native="menuTo(item.path)"
      >
        <i class="iconfont" :class="item.meta.icon" />
        <span>{{item.meta.name_str}}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      menuRouter: [],
      role: ""
    };
  },
  created() {},
  mounted() {
    this.menuRouter = this.$router.options.routes[0].children;
    this.role = this.$store.state.user.userInfo.deptLevel;
  },
  components: {},
  methods: {
    menuTo(paths) {
      this.$router.push({ path: paths });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 240px;
  min-height: 100%;
  background-color: #e7eaef;
   .iconfont {
    font-size: 24px;
  }
}

/deep/ .ivu-menu {
 margin-top: 20px;
 .ivu-menu-item{
   .ivu-icon,span{
     font-size: 16px;
   }
 }
}
.ivu-menu-light{
  background-color: #e7eaef;
}
</style>
