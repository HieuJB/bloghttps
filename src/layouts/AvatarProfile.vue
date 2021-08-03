<template>
<div>
    <div class=" grid grid-cols-1 md:grid-cols-3 ">
        <div class="flex justify-center py-4 lg:pt-2 pt-4">
            <div class="mr-4 pl-0 md:pl-3 text-center">
                <span class="text-xs md:text-xl font-bold block uppercase tracking-wide text-gray-700">22</span><span class="text-sm text-gray-500">Friends</span>
            </div>
            <div class="mr-4 pl-0 md:pl-3 text-center">
                <span class="text-xs md:text-xl font-bold block uppercase tracking-wide text-gray-700">00</span><span class="text-sm text-gray-500">Photos</span>
            </div>
            <div class="lg:mr-4 pl-0 md:pl-3 text-center">
                <span class="text-xs md:text-xl font-bold block uppercase tracking-wide text-gray-700">89</span><span class="text-sm text-gray-500">Comments</span>
            </div>
        </div>
        <div class="flex justify-center">
            <label for="my-modal-2" class="">
                <img alt="..." :src="Avatar_refresh" class="cursor-pointer object-cover h-32 shadow-xl rounded-full  align-middle border-none md:absolute  md:-m-16 md:-ml-20 lg:-ml-16" style="max-width: 150px;" />
            </label>
            <input type="checkbox" id="my-modal-2" class="modal-toggle">
            <div v-if="(userName==this.$route.params.name)" class="modal shadow-2xl">
                <div class="modal-box">
                    <h1 class="ml-5 font-medium text-purple-600 ">CẬP NHẬP THÔNG TIN ẢNH CỦA BẠN</h1>
                    <vue-dropzone v-if="showDropzone"  id="imgDropzone" class="w-2/3 ml-6 mt-6 mb-4 h-14 text-xs cursor-pointer" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                    <div v-for="image in images" :key="image.src">
                        <img class="object-cover h-48 ml-6 mt-2 py-2" :src="image.src">
                    </div>                    
                    <select ref="optinon" class=" select select-bordered select-primary w-11/12 ml-5 max-w-xs">
                        <option disabled="disabled" selected="selected">Lựa chọn bạn muốn cập nhập</option> 
                            <option value="1">Ảnh bìa</option> 
                            <option value="2">Ảnh đại diện</option> 
                        </select>
                    <input hidden type="text" v-model="avatar_link">
                    
                    <div class="modal-action">
                        <label @click="updateAvatar" for="my-modal-2" class="btn btn-primary">CẬP NHẬP</label>
                        <label for="my-modal-2" class="btn">ĐÓNG</label>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showChat" @click="popupMessager" class="flex justify-center py-4 lg:pt-2 pt-4">
            <button class="flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-purple-400 rounded shadow">
                Messenger <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pb-1  text-blue-500 cursor-pointer hover:text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
            </button>

        </div>

    </div>
    <div class="text-center">
        <h3 class="text-4xl font-semibold leading-normal text-purple-500 ">
            {{this.$route.params.name}}
        </h3>
    </div>
    <ModalChat/>
</div>
</template>

<script>
import {
  mapActions,
    mapGetters
} from 'vuex';
import firebase from 'firebase/app';
import 'firebase/firestore';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
import ModalChat from '@/components/ModalChat'
export default {
    name: 'AvatarProfile',
    components: {
        ModalChat,
        vueDropzone: vue2Dropzone,
    },
    data() {
        return {
            images: [],
            showDropzone:true,
            showChat: false,
            showModalChat: false,
            recipientAvatar: '',
            avatar_link:'https://cdn.vietnambiz.vn/2020/3/23/9005608425724062764144382127330218338156544n-1584933586723443851956.jpg',
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                addRemoveLinks: false,
                acceptedFiles: ".jpg, .jpeg, .png",
                dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Thêm ảnh đại diện"
            },
            
        }
    },
    computed: mapGetters(['avatar', 'Avatar_refresh', 'isLogin', 'userName','id']),
    methods: {
        ...mapActions(['actionUpdateAvatar']),
        async afterComplete(file) {
            try {
                const imageName = uuid.v1();
                var metaData = {contentType: "image/png"}
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`images/${imageName}.png`)
                await imageRef.put(file, metaData);
                const downloadUrl = await imageRef.getDownloadURL()
                this.avatar_link=downloadUrl;
                this.showDropzone=false;
                this.images.push({src: downloadUrl});
                this.$refs.imgDropzone.removeFile(file);
            } catch (error) {
                console.log(error);
            }
        },
        updateAvatar(){
           
           if(this.$refs.optinon.value==''){
               return true;
           }else if(this.$refs.optinon.value==2){
                this.actionUpdateAvatar({
                    id:this.id,
                    avatar_link:this.avatar_link,
                })
           }else{

           }
            // this.actionUpdateAvatar({
            //     id:this.id,
            //     avatar_link:this.avatar_link,
            // })
        },
        popupMessager() {
            this.$store.commit('MUTATIONS_SHOWMESSAGE');
        },
        isChat() {
            if (this.isLogin && this.$route.params.name !== this.userName) {
                this.showChat = true;
            }
        },
        closePopupChatfromChild(handle) {
            this.showModalChat = handle;
        },
        
        
    },
    mounted() {
        this.isChat();
    }
}
</script>

<style>

</style>
