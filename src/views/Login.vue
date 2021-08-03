<template>
<div class="h-screen bg-gray-50">
    <div class="lg:flex">
        <div class="hidden lg:block w-1/2 mt-10">
            <img class="max-w-md h-4/5 float-right py-4" src="@/assets/images/phone.png">
        </div>
        <div class="w-full lg:w-1/2 pt-14 ">
            <div class="max-w-md mx-auto lg:mx-0  bg-white lg:max-w-xs rounded border border-gray-300 shadow">
                <img class="w-1/2 mx-auto py-4" src="@/assets/images/okmen.png">
                <div class="w-11/12 mx-auto">
                    <form class="w-full text-center " @submit.prevent="handleLogin" method="POST">
                        <input v-model="email" class="border border-gray-300 bg-gray-50 rounded w-11/12 mt-2 py-2 text-gray-600 text-xs pl-2 focus:outline-none focus:border-purple-500" type="text" placeholder="Số điện thoại, tên người dùng hoặc email">
                        <p v-if="notification.email" class="text-red-400 text-xs float-left px-4 pt-1">{{notification.email[0]}}</p>
                        <input v-model="password" class="border border-gray-300 bg-gray-50 rounded w-11/12 mt-2 py-2 text-gray-600 text-xs pl-2 focus:outline-none focus:border-purple-500" type="password" placeholder="Mật khẩu">
                        <p v-if="notification.password" class="text-red-400 text-xs float-left px-4 pt-1">{{notification.password[0]}}</p>
                        <button class="border bg-blue-500 rounded w-11/12 mt-2 py-2 text-white text-xs hover:bg-blue-600" type="submit">Đăng nhập</button>
                    </form>
                    <div class="w-11/12 mt-2 py-2  mx-auto text-xs flex flex-col justify-center">
                        <p class="text-center text-gray-300">━━━━━━━━━━━━━━━━ OR ━━━━━━━━━━━━━━━━</p>
                        <SocicalNetwork />
                        <p @click="showModal" class="text-center text-blue-500 py-1 cursor-pointer hover:text-blue-600">Quên mật khẩu?</p>
                        <router-link to="/"  class="text-center text-blue-500 py-1 cursor-pointer hover:text-blue-600">Trang chủ</router-link>
                    </div>
                </div>
            </div>
            
            <div class="max-w-md mx-auto lg:mx-0 bg-white lg:max-w-xs rounded border border-gray-300 shadow mt-4">
                <div class="flex justify-center text-xs p-4">
                    <p class="">Bạn không có tài khoản?<router-link class="text-blue-500 hover:text-blue-600 font-medium" to="/registration"> Đăng ký</router-link>
                    </p>
                </div>
            </div>
            <div class="max-w-md mx-auto lg:mx-0 lg:max-w-xs flex justify-center py-4 text-xs text-gray-600">
                <p>Tải ứng dụng</p>
            </div>
            <div class="max-w-md mx-auto lg:mx-0 lg:max-w-xs flex justify-center">
                <img class="w-5/12 px-1" src="@/assets/images/apple.png">
                <img class="w-5/12 px-1" src="@/assets/images/android.png">
            </div>
        </div>
    </div>
    <ModalForgetPassword :modalDisplay="modalDisplay" :hideModal="hideModal" @sentEmail="handleGetEmailForgetPassword" />
    <Loading :loading="loading" />
</div>
</template>

<script>
import ModalForgetPassword from '@/components/ModalForgetPassword';
import SocicalNetwork from '@/components/SocialNetwork';
import Loading from '@/components/Loading';
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'Login',
    components: {
        ModalForgetPassword,
        SocicalNetwork,
        Loading
    },
    data() {
        return {
            email: '',
            password: '',
            modalDisplay: false,
            loading: false
        }
    },
    computed: mapGetters(['notification']),
    methods: {
        ...mapActions(['actionLogin']),
        handleLogin() {
            this.actionLogin({
                email: this.email,
                password: this.password,
            })
        },
        showModal() {
            this.modalDisplay = true;
        },
        hideModal() {
            this.modalDisplay = false;
        },
        ...mapActions(['actionSentEmailForgetPassword']),
        handleGetEmailForgetPassword(email) {
            this.actionSentEmailForgetPassword({
                email: email
            })
            console.log(email);
            this.loading = true;
        }
    },
    watch: {
        notification() {
            this.loading = false;
        },
    }
}
</script>

<style>

</style>
