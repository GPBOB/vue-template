import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import VueRouter from 'vue-router';
import App from './App.vue';
import ViewUI from 'view-design';
import store from './vuex';
import BaiduMap from 'vue-baidu-map';
import ECharts from 'vue-echarts';
import 'echarts';
import Distpicker from 'v-distpicker';
import 'view-design/dist/styles/iview.css';
// 全局样式
import './assets/css/main.less';
// 私有样式
import './assets/css/task.less';

import { getToken } from './utils/auth';

Vue.use(VueAxios, axios);
Vue.use(ViewUI);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'xPFidhcoj8Ud03zPoXrr5Hh6IBHsedCg'
});

Vue.component('v-chart', ECharts);
Vue.component('v-distpicker', Distpicker);
Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    const token = getToken();
    config.headers.Accept = '*/*';
    if (token) config.headers.Authorization = `Bearer ${token}`; // 请求头
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

router.beforeEach((to, from, next) => {
  const createRouter = routes =>
    new VueRouter({
      mode: 'hash',
      routes
    });
  let token = getToken();
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      console.log(store.state.routerStore.isMountedRoute)
      if (store.state.routerStore.isMountedRoute) {
        next();
      } else {
        store.dispatch('GenerateRoutes', 5).then(res => {
          // 重置路由表
          router.matcher = createRouter(res).matcher;
          // 生成可访问的路由表
          router.options.routes[0].redirect=res[0].path
          router.options.routes[0].children.push(...res);
          // router.addRoutes(res); // 动态添加可访问路由表
          console.log(router);
          store.commit('setIsMountedRoute', true);
          next(); // hack方法 确保addRoutes已完成
        });
      }
    }
  } else {
    if (to.path == '/login') {
      // 如果是登录页面的话，直接next()
      next();
    } else {
      // 否则 跳转到登录页面
      // eslint-disable-next-line no-console
      next({
        path: '/login'
      });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
