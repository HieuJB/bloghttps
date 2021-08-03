<template>
<div class="h-screen bg-gray-100">
    <div class="w-full mx-auto pt-14 ">
        <div class="bg-white max-w-xs rounded-xl border border-gray-300 shadow mx-auto flex flex-col items-center">
            <img class="w-1/2 pt-4 pb-2" src="@/assets/images/okmen.png">
            <a class="text-gray-500 pb-2 font-medium text-sm" href="">Đăng ký để xem ảnh và video từ bạn bè</a>
            <div class="w-11/12 mt-2 py-2  mx-auto text-xs flex flex-col justify-center">
                <SocicalNetwork/>
                <p class="text-center text-gray-300">━━━━━━━━━━━━━━━━ OR ━━━━━━━━━━━━━━━━</p>
            </div>
            <div class="w-11/12">
                <form class="w-full text-center " @submit.prevent="handleRegistration" method="POST">
                    <input v-model="name" class="border border-gray-300 bg-gray-50 rounded w-11/12 mt-2 py-2 text-gray-600 text-xs pl-2 focus:outline-none focus:border-purple-500" type="text" placeholder="Tên người dùng">
                    <p v-if="notification.name" class="text-red-400 text-xs float-left px-3 pt-1">{{notification.name[0]}}</p>
                    <input v-model="email" class="border border-gray-300 bg-gray-50 rounded w-11/12 mt-2 py-2 text-gray-600 text-xs pl-2 focus:outline-none focus:border-purple-500" type="text" placeholder="Số điện thoại hoặc email">
                    <p v-if="notification.email" class="text-red-400 text-xs float-left px-3 pt-1">{{notification.email[0]}}</p>
                    <input v-model="password" class="border border-gray-300 bg-gray-50 rounded w-11/12 mt-2 py-2 text-gray-600 text-xs pl-2 focus:outline-none focus:border-purple-500" type="password" placeholder="Mật khẩu">
                    <p v-if="notification.password" class="text-red-400 text-xs float-left px-3 pt-1">{{notification.password[0]}}</p>
                    <vue-dropzone v-if="show_upload" id="imgDropzone" class="w-11/12 mx-auto mt-6 mb-4 h-24 text-xs cursor-pointer" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                    <div v-for="image in images" :key="image.src">
                        <img class="object-cover h-48 mx-auto mt-2" :src="image.src">
                    </div>
                    <button class="border bg-blue-500 rounded w-11/12 mt-2 py-2 text-white text-xs hover:bg-blue-600">Đăng ký</button>
                </form>
            </div>
            <div class="w-11/12 text-xs py-4">
                <p class="text-center text-gray-500 px-4">Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi.</p>
            </div>
        </div>
        <div class="max-w-xs mx-auto bg-white border border-gray-300  rounded  shadow mt-4 flex justify-center ">
            <p class="text-xs p-4">Bạn có tài khoản?<router-link class="text-blue-500 hover:text-blue-600 font-medium" to="/login"> Đăng nhập</router-link>
            </p>
        </div>
        <div class="max-w-xs py-4 text-xs text-gray-600 mx-auto flex justify-center">
            <p>Tải ứng dụng</p>
        </div>
        <div class="max-w-xs mx-auto flex justify-center ">
            <img class="w-5/12 px-1" src="@/assets/images/apple.png">
            <img class="w-5/12 px-1" src="@/assets/images/android.png">
        </div>
    </div>
    <Loading :loading="loading" />
</div>
</template>


<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loading from '@/components/Loading';
import SocicalNetwork from '@/components/SocialNetwork';
export default {
    name: 'Registration',
    components: {
        vueDropzone: vue2Dropzone,
        Loading,
        SocicalNetwork
    },
    data() {
        return {
            images: [],
            avatarLink:'https://newsmd1fr.keeng.net/tiin/archive/images/20210220/145211_facebook_doi_anh_dai_dien_2.jpg',
            show_upload: true,
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                addRemoveLinks: false,
                acceptedFiles: ".jpg, .jpeg, .png",
                dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Thêm ảnh đại diện"
            },
            name: '',
            email: '',
            password: '',
            loading: false
        }
    },
    computed: mapGetters(['notification', 'resetForm']),
    methods: {
        async afterComplete(file) {
            try {
                const imageName = uuid.v1();
                var metaData = {contentType: "image/png"}
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`images/${imageName}.png`)
                await imageRef.put(file, metaData);
                const downloadUrl = await imageRef.getDownloadURL()
                this.avatarLink=downloadUrl;
                this.images.push({src: downloadUrl});
                this.$refs.imgDropzone.removeFile(file);
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions(['actionRegistration']),
        handleRegistration() {
            this.actionRegistration({
                name: this.name,
                email: this.email,
                password: this.password,
                avatar_link:this.avatarLink,
                role_id:'4'
            })
            this.loading = true;
        }
    },
    watch: {
        images() {
            this.show_upload = false;
            
        },
        notification() {
            this.loading = false;
        },
        // resetForm() {
        //     this.name = '',
        //     this.email = '',
        //     this.password = ''
        //     this.images=[]
        // }
    }
}
</script>

<style scoped>
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");


</style>
