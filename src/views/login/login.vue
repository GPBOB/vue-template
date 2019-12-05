<template>
    <div>
        <p>login</p>
        <input type="text" v-model="loginData.phone">
        <input type="password" v-model="loginData.password">
        <button @click="loginUser">登录</button>
    </div>
</template>

<script>
    import loginApi from '@/api/login'
    import store from 'store'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                loginData: {
                    phone: '',
                    password: '',
                    // userType: -1
                }
            }
        },
        methods: {
            ...mapActions(['doLogin','getUserInfo']),
            loginUser() {
                this.doLogin(this.loginData).then(res => {
                    this.getUserInfo().then(response=>{
                        console.log(response)
                        this.$store.dis
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>