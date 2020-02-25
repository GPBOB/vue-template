import Vue from 'vue'
import config from '@/config'

export default {
  login(params) {
    return Vue.axios.post(`${config.base_url}/gateway/login`, params)
  },
  getLoginUserInfo() {
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/getUserInfo`)
  },
  editPswd(params){
    return Vue.axios.post(`${config.base_url}/roses-system/user/updateUserPassword`,params)
  }
}
