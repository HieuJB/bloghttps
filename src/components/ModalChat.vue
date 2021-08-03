<template>
<div>
    <div v-if="ShowMessage" class="fixed w-1/2 md:w-1/3 lg:w-1/4 bg-white bottom-0 right-20 h-3/5 z-50 shadow-2xl rounded-t-2xl  overflow-hidden">
        <div class="fixed flex w-1/2 md:w-1/3 lg:w-1/4 h-14 shadow-xl">
            <img class="p-2 inline object-cover w-14 h-14 mr-2 rounded-full  border-gray-300 hover:border-green-500 cursor-pointer" :src="(Avatar_Click)?Avatar_Click:Avatar_refresh" alt="Profile image" />
            <!-- <img class="p-2 inline object-cover w-14 h-14 mr-2 rounded-full  border-gray-300 hover:border-green-500 cursor-pointer" :src="(Avatar_Click==''?Avatar_refresh:Avatar_Click)" alt="Profile image" /> -->

            <div class="flex justify-between my-auto w-full ">
                <p class="font-medium text-lg text-gray-600">{{this.$route.params.name}}</p>
                <div class="flex">
                    <svg @click="ShowModalVideoCall" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 mr-2 text-pink-500 hover:text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg @click="closePopupChat" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 mr-2 text-pink-500 hover:text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg @click="closePopupChat" class="h-6 w-6 mt-1 mr-4 text-pink-500 hover:text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>  
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-14 w-full  overflow-y-scroll h-3/4 p-1 " id="container">
            <div v-for="(DisplayMessages,index) in DisplayMessages" :key="index">
                <div v-if="DisplayMessages.Sender!==userName" class="flex flex-col w-full relative mb-3">
                    <small class="text-pink-300 absolute left-2 ">{{DisplayMessages.Sender}}</small>
                    <div class="relative">
                        <div :class="(DisplayMessages.Content!=='' ? 'flex mt-4 float-left ' : 'flex  mt-4')">
                            <img class="p-1 inline object-cover w-10 h-10 rounded-full border-gray-300 hover:border-green-500 cursor-pointer" :src="DisplayMessages.AvatarSender" alt="Profile image" />
                            <p v-if="DisplayMessages.Content!==''" class="p-2 pt-3 bg-pink-300 rounded-2xl text-xs text-gray-700 ">
                                {{DisplayMessages.Content}}
                            </p>
                            <div v-if="DisplayMessages.image!=='1'" class="flex flex-col"  >
                                <img v-for="(Image,index) in DisplayMessages.image" :key="index"  class="object-contain h-36 " :src="Image.src">
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <small class="text-gray-500 float-left ml-2  ">{{moment(DisplayMessages.time).fromNow()}}</small>
                    </div>
                </div>
                <div v-if="DisplayMessages.Sender==userName" class="flex flex-col w-full relative mb-3">
                    <small class=" text-blue-300 absolute right-2">{{DisplayMessages.Sender}}</small>
                    <div class="relative">
                        <div :class="(DisplayMessages.Content!=='' ? 'flex mt-4 float-right ' : 'flex flex-row-reverse mt-4')">
                            <p v-if="DisplayMessages.Content!==''" class="p-2 pt-3 bg-blue-200 rounded-2xl text-xs text-gray-700 ">
                                {{DisplayMessages.Content}}
                            </p>
                            <img class="p-1 inline object-cover w-10 h-10 rounded-full border-gray-300 hover:border-green-500 cursor-pointer" :src="DisplayMessages.AvatarSender" alt="Profile image" />
                            <div v-if="DisplayMessages.image!=='1'" class="flex flex-col"  >
                                <img v-for="(Image,index) in DisplayMessages.image" :key="index"  class="object-contain h-36 " :src="Image.src">
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <small class="text-gray-500 float-right mr-2 ">{{moment(DisplayMessages.time).fromNow()}}</small>
                    </div>
                </div>
            </div>
            <vue-dropzone id="imgDropzone" v-if="showDropzone" class="w-11/12 ml-3 text-xs cursor-pointer absolute bottom-14" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
        </div>
        <div class="fixed bottom-0 w-1/2 md:w-1/3 lg:w-1/4 h-14 shadow-2xl pt-1 ">
            <div class="flex justify-between">
                <svg @click="DisplayDropzone" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer h-6 w-6 text-pink-500 mt-3 ml-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                <input v-on:keyup.enter="handleSendMessage" v-model="contentChat" class="bg-gray-200 p-2 mt-1 w-3/4 rounded-2xl focus:outline-none" type="text" placeholder="Nhập tin nhắn vào đây..." />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-500 mt-2  mr-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
            </div>
        </div>
    </div>
    <div v-if="ShowPopupAvartarSender" class="fixed bottom-0 right-0 z-50">
        <div v-for="(DisplayPopupAvatar,index) in DisplayPopupAvatar" :key="index" class="mb-7">
            <div v-if="DisplayPopupAvatar.Avatar" @click="ShowPopupMessage(DisplayPopupAvatar.Sender,DisplayPopupAvatar.Avatar)">
                <img :src="DisplayPopupAvatar.Avatar" class="inline object-cover w-14 h-14 mr-2 rounded-full border-2 border-blue-500 hover:border-green-600 cursor-pointer" />
            </div>
        </div>
    </div>
    <ModalVideoCall />
    <ModalOnVideoCall/>
    <ModalOnVideoCall1/>
    <ModalReceiveVideoCall/>
</div>
</template>
<script>
import {
    mapGetters
} from 'vuex';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
import firebase from 'firebase/app';
import 'firebase/firestore';
import ModalVideoCall from '@/components/ModalVideoCall';
import ModalOnVideoCall from '@/components/ModalOnVideoCall';
import ModalOnVideoCall1 from '@/components/ModalOnVideoCall1';
import ModalReceiveVideoCall from '@/components/ModalReceiveVideoCall';
import Notification from '@/notification/index.js';

export default {
    name: 'ModalChat',
    components: {
        vueDropzone: vue2Dropzone,
        ModalVideoCall,
        ModalOnVideoCall,
        ModalOnVideoCall1,
        ModalReceiveVideoCall,
        
    },
    computed: mapGetters(['Avatar_refresh', 'userName', 'avatar', 'ShowMessage']),
    data() {
        return {
            images: [],
            showDropzone: false,
            popupChat: false,
            contentChat: '',
            ShowPopupAvartarSender: true,
            DisplayMessages: [],
            DisplayPopupAvatar: [],
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 50,
                thumbnailHeight: 50,
                addRemoveLinks: false,
                acceptedFiles: ".jpg, .jpeg, .png",
                dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Thêm ảnh"
            },
            Avatar_Click:''
           
        }
    },
    methods: {
        DisplayDropzone() {
            this.showDropzone = !this.showDropzone;
            setTimeout(() => {
                this.scrollToEnd();
            }, 300)
        },
        ShowModalVideoCall(){
            firebase.database().ref(`BusyCallHandling${this.$route.params.name}`).once("value", snapshot => {
            if (snapshot.exists()){
                Notification.error('Máy bận');
                }else{
                    this.$store.commit('MUTATIONS_SHOWOUTGOINGVIDEOCALL');
                    this.$store.commit('MUTATIONS_SHOWMESSAGE');
                }
            });
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
                this.avatar_link = downloadUrl;
                // console.log(this.avatar_link);
                this.showDropzone = false;
                this.images=[];
                this.images.push({
                    src: downloadUrl
                });
                this.$refs.imgDropzone.removeFile(file);
            } catch (error) {
                console.log(error);
            }
        },
        closePopupChat() {
            this.$store.commit('MUTATIONS_SHOWMESSAGE');
        },
        UploadImage() {
             
            // const images=this.images;
            // console.log(images);
            // const image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png';
            this.handleSendMessage(this.images)
        },
        // openPopupChat(){
        //     this.$store.commit('MUTATIONS_SHOWMESSAGE');
        //     this.ShowDetailedMessages(Sender);
        // },
        ShowPopupMessage(Sender,Avatar) {
            this.ShowPopupAvartarSender = false;
            this.$store.commit('MUTATIONS_SHOWMESSAGE');
            this.ShowDetailedMessages(Sender,Avatar);
            const messagesRef = firebase.database().ref(`NotificationMessage`).child(this.userName).child(Sender);
            messagesRef.remove();

        },
        scrollToEnd() {
            var container = this.$el.querySelector("#container");
            container.scrollTop = container.scrollHeight;
        },
        handleSendMessage(image) {
            if (image.isTrusted) {
                image = '1';
            }
            const key1 = this.userName + this.$route.params.name;
            const key2 = this.$route.params.name + this.userName;
            const current = new Date();
            const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const Sender = this.userName;
            const AvatarSender = this.avatar;
            const Receiver = this.$route.params.name;
            const AvatarReceiver = this.Avatar_refresh;
            const Content = this.contentChat;
            var ref = firebase.database().ref("messager");
            ref.once("value")
                .then(function (snapshot) {
                    if (snapshot.child(key1).exists()) {
                        const messagesRef = firebase.database().ref(`messager`).child(key1);
                        messagesRef.push({
                            Sender: Sender,
                            AvatarSender: AvatarSender,
                            Receiver: Receiver,
                            AvatarReceiver: AvatarReceiver,
                            Content: Content,
                            time: date + ' ' + time,
                            image: image
                        });
                        const messagesRef1 = firebase.database().ref(`NotificationMessage`).child(Receiver).child(Sender);
                        messagesRef1.set(AvatarSender);
                    } else if (snapshot.child(key2).exists()) {
                        const messagesRef = firebase.database().ref(`messager`).child(key2);
                        messagesRef.push({
                            Sender: Sender,
                            AvatarSender: AvatarSender,
                            Receiver: Receiver,
                            AvatarReceiver: AvatarReceiver,
                            Content: Content,
                            time: date + ' ' + time,
                            image: image
                        });

                        const messagesRef1 = firebase.database().ref(`NotificationMessage`).child(Receiver).child(Sender);
                        messagesRef1.set(AvatarSender);
                    } else {
                        const messagesRef = firebase.database().ref(`messager`).child(key1);
                        messagesRef.push({
                            Sender: Sender,
                            AvatarSender: AvatarSender,
                            Receiver: Receiver,
                            AvatarReceiver: AvatarReceiver,
                            Content: Content,
                            time: date + ' ' + time,
                            image: image
                        });

                        const messagesRef1 = firebase.database().ref(`NotificationMessage`).child(Receiver).child(Sender);
                        messagesRef1.set(AvatarSender);
                    }
                });
            this.contentChat = '';
            setTimeout(() => {
                this.scrollToEnd();
            }, 400)
        },
        ShowDetailedMessages(Sender,Avatar) {
            if (Sender) {
                this.$route.params.name = Sender;
            }
            this.Avatar_Click=Avatar;
            const key1 = this.userName + this.$route.params.name;
            const key2 = this.$route.params.name + this.userName;
            const messagesRef = firebase.database().ref(`messager`).child(key1);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    this.DisplayMessages = data;
                    setTimeout(() => {
                        this.scrollToEnd();
                    }, 300)
                }
            });
            const messagesRef1 = firebase.database().ref(`messager`).child(key2);
            messagesRef1.on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    this.DisplayMessages = data;
                    setTimeout(() => {
                        this.scrollToEnd();
                    }, 300)
                }
            });
        },
        ShowPopupSender() {
            const messagesRef1 = firebase.database().ref(`NotificationMessage`).child(this.userName);
            messagesRef1.on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    Object.keys(data).forEach(key => {
                        const starCountRef = firebase.database().ref(`NotificationMessage`).child(this.userName).child(key);
                        starCountRef.on('value', (snapshot) => {
                            const data = snapshot.val();
                            this.DisplayPopupAvatar.push({
                                Sender: key,
                                Avatar: data
                            });
                        });
                    });
                }
            })
        },

    },

    mounted() {
        this.ShowDetailedMessages();
        this.ShowPopupSender();
        console.log(this.DisplayPopupAvatar);
    },
    watch: {
        ShowMessage() {
            setTimeout(() => {
                this.scrollToEnd();
            }, 200)
        },
        images() {
            this.UploadImage();
           
        }
    }

}
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
