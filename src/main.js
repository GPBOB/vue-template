import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import {getToken} from "./utils/auth";

Vue.use(VueAxios, axios)
Vue.use(ViewUI)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

const whiteList=['login', 'error404']

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    let token = getToken()
    if (token) {
        if(to.path==="/login"){
            next('/')
        }
        else {
            next('/')
        }
    }
    else if (whiteList.indexOf(to.name) !== -1) {
        // 在免登录白名单，直接进入
        next();
    } else {
        next({
            path: '/login'
        });
    }
})

router.afterEach(() => {
    ViewUI.LoadingBar.finish();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
