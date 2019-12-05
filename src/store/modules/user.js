import {getToken, setToken, removeToken} from '@/utils/auth'
import store from 'store'
import loginApi from '@/api/login'


const user = {
    state: {
        token: getToken(),
        userInfo: store.get('userInfo'),
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo
    },
    mutations: {
        SET_TOKEN(state, data) {
            state.token = data
            setToken(data)
        },
        SET_USER_INFO(state, data) {
            state.userInfo = data
            store.set("userInfo", data)
        }
    },
    actions: {
        //登录
        doLogin({commit}, params) {
            return new Promise((resolve, reject) => {
                loginApi.login(params).then(res => {
                    commit('SET_TOKEN', res.data.data.token)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        //获取用户信息
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                loginApi.loginUserInfo().then(res => {
                    commit('SET_USER_INFO', res.data.data)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}

export default user