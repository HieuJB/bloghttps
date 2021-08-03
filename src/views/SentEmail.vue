<template>
<div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
    <div class="mail__wrapper max-w-md mx-auto">
        <div class="mail__content bg-white p-8 shadow-md">
            <div class="content__header h-64 flex flex-col items-center justify-center text-center tracking-wide leading-normal bg-purple-500 -mx-8 -mt-8">
                <h1 class="text-red text-5xl"></h1>
                <p class="text-white text-2xl">THÔNG BÁO</p>
            </div>
            <div class="content__body py-8 border-b">
                <p>
                    Chào {{userName}}!<br><br>
                    Chúng tôi đã gửi cho bạn một email để xác nhận nhưng có vẻ bạn vẫn chưa xác nhận nó.
                </p>
                <p class="mt-2">
                    Nếu bạn không tìm thấy trong hòm thư bạn có thể nhấn vào nút dưới để gửi lại thư .
                </p>
                <div class="flex justify-between">
                    <button @click="handleresentEmail" class="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        GỬI LẠI THƯ
                    </button>
                    <button @click="handleLogout" class="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        ĐĂNG XUẤT
                    </button>
                </div>
            </div>
            <div class="content__footer text-center text-grey-darker">
                <h3 class="text-base sm:text-lg mb-4">Cảm ơn bạn đã sử dụng website của chúng tôi!</h3>
            </div>
        </div>
        <div class="mail__meta text-center text-sm text-grey-darker mt-8">
            <div class="meta__social flex justify-center my-4">
                <a href="#" class="flex items-center justify-center mr-4 bg-blue-700 text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="flex items-center justify-center mr-4 bg-blue-700 text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-instagram"></i></a>
                <a href="#" class="flex items-center justify-center bg-blue-700 text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-twitter"></i></a>
            </div>
            <div class="meta__help">
                <p class="leading-loose">
                    Liên hệ để biết thêm? <a href="#" class="text-grey-darkest">trunghieuit061099@gmail.com</a>
                    <br>
                </p>
            </div>
        </div>
    </div>
    <Loading :loading="loading"/>
</div>
</template>

<script>
import router from '@/router';
import Loading from '@/components/Loading';
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: 'SentEmail',
    components: {
        Loading
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: mapGetters(['userName', 'notification']),
    methods: {
        ...mapActions(['actionResentEmail']),
        handleresentEmail() {
            this.actionResentEmail();
            this.loading = true;
        },
        handleLogout() {
            localStorage.removeItem('token_email');
            router.push({
                name: 'Login'
            });
        }
    },
    watch: {
        notification() {
            this.loading = false;
        }
    }

}
</script>

<style scoped>
.loader {
    border-top-color: #3498db;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
