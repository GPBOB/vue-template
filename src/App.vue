<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
    provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
   methods: {
    reload() {
      const _self = this;
      _self.isRouterAlive = false;
      _self.$nextTick(() => {
        _self.isRouterAlive = true;
      });
    }
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1475001_51bblx8jux4.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  min-width: 1440px;
  height: 100%;
  overflow: auto;
}
</style>
