<template>
<div>
    <div v-if="isNotification" class="fixed bg-blue-200  w-3/4 md:w-1/3 lg:w-1/4 right-0 border-1 z-40 p-2 rounded-2xl top-2 shadow-2xl cursor-pointer  ">
        <div class="py-2 hover:bg-blue-300 pl-2 rounded-2xl ">
            <div class="flex">
                <img class="object-cover h-16 w-14 rounded-2xl border-2 border-white " :src="avatar_information">
                <router-link :to="{name: 'Post',params:{id:post}}" class="pl-2 flex flex-col text-gray-600 font-medium ">
                    <p class="text-blue-800 font-bold">{{name}}</p>
                    <p class="">{{content}} 🤗🤗🤗</p>
                    <small class="">{{moment(time.time).fromNow()}}</small>
                </router-link>
            </div>
        </div>
    </div>
    <div class="block md:hidden relative"><svg @click="showMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer hover:text-blue-500 absolute top-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
    </div>
    <div v-if="menu" class="absolute z-10 bg-blue-100 w-full md:w-2/12 md:bg-white p-1 lg:p-4 ">
        <div class="flex justify-between">
            <div v-if="isLogin" class="flex">
                <router-link :to="{name:'Posted',params:{name: userName}}">
                    <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer" :src="avatar" alt="Profile image" />
                </router-link>

                <svg @click="isPopupNotification=!isPopupNotification" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400 font-medium hover:text-purple-800 cursor-pointer  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div v-if="isPopupNotification" class="fixed bg-blue-100 left-0 md:left-20 top-14 md:top-10 bottom-20 md:bottom-64  w-full md:w-1/4 rounded-2xl shadow-2xl overflow-hidden ">
                    <div class="flex justify-between p-4">
                        <p class="font-bold text-purple-400 ">Thông báo</p>
                        <svg @click="isPopupNotification=!isPopupNotification" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 cursor-pointer hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <!-- <div class="fixed  top-24 md:top-20 w-full md:w-1/4 bottom-20 md:bottom-60 p-4 overflow-y-scroll mb-4"> -->

                    <div class="flex flex-col w-11/12 mx-auto overflow-y-scroll h-96 mb-4">
                        <div v-for="(Notification,index) in Notification.slice().reverse()" :key="index" class=" py-2 hover:bg-blue-300 pl-2 rounded-2xl bg-blue-200 mt-2">
                            <div class="flex">
                                <img class="object-cover h-16 w-14 rounded-2xl border-2 border-white " :src="Notification.avatar">
                                <router-link :to="{name: 'Post',params:{id:Notification.router}}" class="pl-2 flex flex-col text-gray-600 font-medium ">
                                    <p class="text-blue-800 font-bold">{{Notification.name}}</p>
                                    <p class="">{{Notification.content}} 🤗🤗🤗</p>
                                    <small class="">{{moment(Notification.time).fromNow()}}</small>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 ml-3 hover:text-blue-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg> -->
            </div>
            <div v-if="!isLogin" class="flex">

                <router-link to="/login">
                    <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer" src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg" alt="Profile image" />
                </router-link>

            </div>
            <div class="block md:hidden">
                <svg @click="hideMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        <p class="text-gray-700 font-medium pt-4 text-md">Feb 02,2021</p>
        <p class="text-gray-500">08:43 am</p>
        <div class="grid grid-cols-3  md:grid-cols-1">
            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-blue-600 p-2 rounded-xl text-white font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 font-medium text-black hover:text-blue-600 " :to="{name:'Home'}">Trang chủ</router-link>
                </div>
            </div>
            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 text-gray-600 hover:text-blue-600 font-medium" to="/economy">Kinh tế</router-link>
                </div>
            </div>
            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 text-gray-600 hover:text-blue-600 font-medium" to="/sport">Thể thao</router-link>
                </div>
            </div>

            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 text-gray-600 hover:text-blue-600 font-medium" to="/entertainment">Giải trí</router-link>
                </div>
            </div>
            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 text-gray-600 hover:text-blue-600 font-medium" to="health">Sức khỏe</router-link>
                </div>
            </div>

            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3 text-gray-600 hover:text-blue-600 font-medium" to="world">Thế giới</router-link>
                </div>
            </div>
            <div class="flex flex-col pt-2 lg:pt-5">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <router-link class="pt-3 pl-1 md:p-2 md:pl-3  text-gray-600 hover:text-blue-600 font-medium" :to="{name:'Other'}">Các mục khác</router-link>
                </div>
            </div>
            <div class="flex flex-col pt-2 lg:pt-5">
                <div v-if="!isLogin" class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <router-link to="../login" class="pt-3 pl-1 md:p-2 md:pl-3  text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Login</router-link>
                </div>
                
                <div v-if="isLogin" class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 bg-gray-300 p-2 rounded-xl text-gray-500 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <p @click="logout" class="pt-3 pl-1 md:p-2 md:pl-3  text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Đăng xuất</p>
                </div>
            </div>
        </div>
        <Audio/>
    </div>
    <ModalChat />

</div>
</template>

<script>
import axios from 'axios';
import {
    mapGetters
} from 'vuex';
import router from '@/router';
import firebase from 'firebase/app';
import ModalChat from '@/components/ModalChat';
import Audio from '@/layouts/Audio';
import 'firebase/firestore';
let uuid = require("uuid");
export default {
    name: 'Header',
    components: {
        ModalChat,
        Audio
    },
    data() {
        return {
            menu: false,
            width: 0,
            isNotification: false,
            name: '',
            post: '',
            time: '',
            uuid: '',
            avatar_information: '',
            content: '',
            isPopupNotification: false,
            Notification: [],
            key: '',
        }
    },
    computed: mapGetters(['avatar', 'isLogin', 'userName', ]),

    methods: {

        handleResize() {
            this.width = innerWidth;
            return (this.width < 768) ? this.menu = false : this.menu = true;
        },
        showMenu() {
            this.menu = true;
        },
        hideMenu() {
            this.menu = false;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('vuex');
            location.reload();
        },
        checkNotificationLike() {

            let self = this
            const messagesRef = firebase.database().ref(`NotificationLikePost`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                Object.keys(data).forEach(key => {
                    if (data[key].author == this.userName) {
                        // this.isNotification = this.isNotification+1;
                        // this.isNotification.push({
                        this.name = data[key].name;
                        this.post = data[key].router;
                        this.time = data[key].time;
                        this.content = data[key].content;
                        this.uuid = uuid.v1();
                        this.avatar_information = data[key].avatar; // })
                        this.key = key;
                        setTimeout(() => {
                            var updates = {};
                            updates[`/NotificationLikePost/` + this.key] = '0';
                            firebase.database().ref().update(updates);
                        }, 1000)
                    }
                });
                self.$nextTick(() => {
                    self.dataLoaded = true
                })

            });

        },
        // checkNotificationPostChild() {
        //     let self = this
        //     const messagesRef = firebase.database().ref(`NotificationLikePostChild`);
        //     messagesRef.on('value', snapshot => {
        //         const data = snapshot.val();
        //         Object.keys(data).forEach(key => {
        //             if (data[key].send == this.userName) {
        //                 // this.isNotification = this.isNotification+1;
        //                 // this.isNotification.push({
        //                 this.name = data[key].name;
        //                 this.post = data[key].router;
        //                 this.time = data[key].time;
        //                 this.content = data[key].content;
        //                 this.uuid1 = uuid.v1();
        //                 this.avatar_information = data[key].avatar; // })
        //                 return
        //             }
        //         });
        //         self.$nextTick(() => {
        //             self.dataLoaded1 = true
        //         })

        //     });
        // },

        ShowNotificationPost() {
            const messagesRef = firebase.database().ref(`ShowNotificationLikePost`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                Object.keys(data).forEach(key => {
                    if (data[key].author == this.userName) {
                        this.Notification.push({
                            name: data[key].name,
                            avatar: data[key].avatar,
                            content: data[key].content,
                            router: data[key].router,
                            time: data[key].time,
                        })
                        return
                    }
                });
            });
        },

        // ShowNotificationPost1() {
        //     const messagesRef = firebase.database().ref(`NotificationLikePostChild`);
        //     messagesRef.on('value', snapshot => {
        //         const data = snapshot.val();
        //         Object.keys(data).forEach(key => {
        //             if (data[key].send == this.userName) {
        //                 this.Notification.push({
        //                     name:data[key].name,
        //                     avatar:data[key].avatar,
        //                     content:data[key].content,
        //                     router:data[key].router,
        //                     time:data[key].time,
        //                 })
        //                 return
        //             }
        //         });
        //    });
        // },

    },
    created() {
        this.$store.commit('MUTATIONS_CLOSEMESSAGE');

        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user/me', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then(() => {

                }).catch(() => {
                    router.push({
                        name: 'Login'
                    });
                    localStorage.removeItem('token');
                    localStorage.removeItem('vuex');
                });
        }
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    mounted() {
        this.ShowNotificationPost();
        this.checkNotificationLike();
        // this.checkNotificationPostChild();

    },
    watch: {

        // uuid1() {
        //     this.Notification=[];
        //     // this.ShowNotificationPost1();
        //     if (this.dataLoaded1) {
        //         this.isNotification = true;
        //     }
        //     setTimeout(() => {
        //         this.isNotification = false;
        //     }, 10000)

        // },
        uuid() {
            this.Notification = [];

            // this.ShowNotificationPost1();
            if (this.dataLoaded) {
                this.isNotification = true;
            }
            if (this.dataLoaded1) {
                this.isNotification = true;
            }
            setTimeout(() => {
                this.isNotification = false;
            }, 10000)

        }
    }
}
</script>

<style>
article {

    overflow: hidden;
    white-space: nowrap;
    width: 240px;
    display: flex;
}

.wrapper {
    position: relative;
}

.marquee {
    animation: marquee 14s linear infinite;
}

.marquee2 {
    animation: marquee2 14s linear infinite;
    position: absolute;
    top: 0;
}

ul {
    display: flex;
    list-style: none;
    padding-left: 0;
}

li {
    margin: 8px;
}

@keyframes marquee {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-100%);
    }
}

@keyframes marquee2 {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0%);
    }
}
#ImageRotate {
    -webkit-animation:spin 10s linear infinite;
    -moz-animation:spin 10s linear infinite;
    animation:spin 10s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
