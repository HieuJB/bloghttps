<template>
<div>
    <vue-dropzone id="imgDropzone" class="cursor-pointer mt-1 mb-2" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
    <div class="grid grid-cols-3 p-2 ">
        <div v-for="image in images" :key="image.src">
            <img class="object-cover h-48 w-1/2  mx-auto" :src="image.src" v-clipboard:success="onCopy" v-clipboard:error="onError" v-clipboard:copy="image.src">
        </div>
    </div>
    <div class=" mb-9 float-left text-left  w-full">
        <div class="">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                CHUYÊN MỤC BÀI VIẾT
            </label>
            <select v-model="post.category_id" id="selectbox" class="w-1/2  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                <option value="">CHỌN CHUYÊN MỤC</option>
                <option value="1">THỂ THAO</option>
                <option value="2">KINH TẾ</option>
                <option value="3">GIẢI TRÍ</option>
                <option value="4">SỨC KHỎE</option>
                <option value="5">THẾ GIỚI</option>
                <option value="6">CÁC MỤC KHÁC</option>
            </select>
        </div>
        <div class="">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                TIÊU ĐỀ BÀI VIẾT
            </label>
            <textarea v-model="post.heading" class="resize  w-1/2  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Nhập tiêu đề bài viết tại đây...."></textarea>
        </div>
        <div class="">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                LINK ẢNH BÌA BÀI VIẾT
            </label>
            <input v-model="post.background_img" class="resize appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="grid-password" type="text" placeholder="Nhập tiêu đề tại đây...">
        </div>
        <div class="">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-password">
                PODCAST BÀI VIẾT
            </label>
            <textarea v-model="podcast" class="resize  w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Nhập podcast tại đây...."></textarea>
        </div>

        <div class="my-2">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                NỘI DUNG BÀI VIẾT
            </label>
            <tinymce id="d1" :other_options="tinyOptions" v-model="post.content"></tinymce>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded" @click="CreatePodcast">
            ĐĂNG BÀI
        </button>
    </div>
    
    <Loading :loading="loading" />
</div>
</template>

<script>
import axios from 'axios';
import notification from '@/notification/index.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Loading from '@/components/Loading';
import {
    mapActions,
    mapGetters
} from 'vuex';
let uuid = require("uuid");
export default {
    name: 'PersonalPost',
    components: {
        vueDropzone: vue2Dropzone,
        Loading
    },
    data() {
        return {
            loading: false,
            podcast: '',
            link: '',
            images: [],
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                addRemoveLinks: false,
                acceptedFiles: ".jpg, .jpeg, .png",
                dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Thêm ảnh để lấy link sau khi hoàn thành nhấn vào ảnh để lấy link"
            },
            editorContent: '',
            tinyOptions: {
                'height': 350,
                'width': 800,
            },
            post: {
                background_img: '',
                heading: '',
                podcast: '',
                content: '',
                user_id: '',
                category_id: '',
            }
        }
    },
    methods: {
        async CreatePodcast() {
            if (this.podcast == '') {
                notification.error('Vui lòng nhập đầy đủ thông tin');
                return
            }
            this.loading = true;
            const response = await axios.post('https://api.zalo.ai/v1/tts/synthesize', new URLSearchParams({
                input: this.podcast
            }), {
                headers: {
                    'apikey': '1rZUkxbEvqCQYi6ZGmJX2ru9Ki78J214',
                    'content-type': 'application/x-www-form-urlencoded'
                },
            });
            this.post.podcast = response.data.data.url;
            console.log(this.post.podcast);
        },
        onCopy() {
            notification.success('Lấy link thành công');
        },
        onError() {
            notification.error('Lấy link thất bại');
        },
        async afterComplete(file) {
            try {
                const imageName = uuid.v1();
                var metaData = {
                    contentType: "image/png"
                }
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`images/${imageName}.png`)
                await imageRef.put(file, metaData);
                const downloadUrl = await imageRef.getDownloadURL()
                this.avatarLink = downloadUrl;
                this.images.push({
                    src: downloadUrl
                });
                this.$refs.imgDropzone.removeFile(file);
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions(['actionAddPost'])
    },
    computed: {
        action() {
            return this.post.podcast;
        },
        ...mapGetters(['id']),
    },
    watch: {
        action() {
            this.loading = false;
            this.actionAddPost({
                background_img: this.post.background_img,
                heading: this.post.heading,
                podcast: this.post.podcast,
                content: this.post.content,
                user_id: this.id,
                category_id: this.post.category_id
            });
        }

    }

}
</script>

<style>

</style>
