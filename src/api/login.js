import axiosHttp from '@/utils/request'


const loginHttp = {
    login(params) {
        return axiosHttp.post('/gateway/login', params)
    },
    loginUserInfo(){
        return axiosHttp.post('/gateway/getCurrentLoginUserSimpleModel')
    }
}
export default loginHttp