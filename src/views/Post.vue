<template>
<div class="">

    <div class="bg-white mx-auto h-full shadow-inner grid grid-cols-6 text-xs lg:text-sm">
        <Header />
        <div class="col-span-6 md:col-span-5 ">
            <Slidebar />
            <div v-if="!loadingPage">
                <LoadingAnimation />
            </div>
            <div v-if="loadingPage" class="grid grid-cols-4 pt-2">
                <div v-for="(ArticleById,index) in ArticleById" :key="index" class="reverseorder col-span-4 md:col-span-3">
                    <div class="p-2 relative">
                        <img class="object-cover h-60 md:h-96 w-full  rounded-2xl border-8 border-blue-50 shadow-2xl blur-2xl" :src="ArticleById.background_img">
                        <div class="w-full lg:w-10/12 mx-auto bg-white rounded-2xl shadow-2xl border-8 border-blue-50 p-2 mt-2 md:absolute top-3/4 left-0 right-0 ">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {{ArticleById.name_categorie}}
                            </button>

                            <h1 class="pt-2 font-medium text-xl text-gray-700">{{ArticleById.heading}}</h1>
                            <div class="flex justify-between">
                                <div class="flex py-4">
                                    <div>
                                        <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110  " :src="ArticleById.avatar_link" />
                                    </div>
                                    <div class="flex flex-col">
                                        <a class="font-medium text-blue-500" href="">{{ArticleById.name}}</a>
                                        <p href="" class="font-medium text-gray-600">{{(Datatime=='Invalid date')?'Đợi xác nhận':Datatime}}</p>
                                    </div>
                                </div>
                                <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>{{ArticleById.hit_count}} lượt xem
                                </span>
                            </div>
                            <audio controls>
                                <source :src="ArticleById.podcast" type="audio/mpeg">
                            </audio>
                            <div class="py-2">
                                <div class="" v-html="ArticleById.content"></div>
                                <div class="mt-5 relative">
                                    <div class="mb-2">

                                        <div class="flex justify-between">
                                            <svg v-if="isLogin" @click="like" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-200 cursor-pointer mb-2" :class="(isLike)?'text-pink-600':''" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                            </svg>
                                            <svg v-if="isLogin" @click="save" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-200 cursor-pointer mb-2" :class="(isSave)?'text-pink-600':''" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" clip-rule="evenodd" />
                                            </svg>

                                        </div>
                                        <p class="text-gray-600 font-medium px-1">{{realtime_like}} lượt thích</p>
                                    </div>
                                    <div v-if="isLogin" class="w-full ">
                                        <input v-model="content_comment" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="" placeholder="Nhập bình luận tại đây....">
                                        <button @click="commentToFireBase" class=" ml-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded" type="button">
                                            Bình luận
                                        </button>
                                         
                                    </div>
                                    <div class="py-2">
                                        <p class="font-medium text-gray-600">{{comment_show.length}} Bình luận</p>
                                    </div>
                                    <div class="flex flex-col-reverse">
                                        <div v-for="(comment_show,index) in comment_show" :key="index" class="flex flex-col   py-2  p-2  rounded-2xl border-2 border-indigo-100 mt-2">
                                            <div class="flex">
                                                <div>
                                                    <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110  " :src="comment_show.avatar" alt="Profile image" />
                                                </div>
                                                <router-link :to="{name: 'Profile',params:{name: comment_show .name}}" class="flex flex-col">
                                                    <a class="font-medium text-blue-500" href="">{{(comment_show.name==ArticleById.name)?comment_show.name+' (Author) 🤗':comment_show.name}}</a>
                                                    <p href="" class="font-medium text-gray-500">{{moment(comment_show.published_at).fromNow()}}</p>

                                                </router-link>
                                            </div>
                                            <div class="text-gray-500 font-medium ">
                                                <p class="py-2">{{comment_show.content}}</p>
                                                <p @click="reply(index)" class="pb-2 cursor-pointer hover:text-green-600 font-medium text-gray-600">Trả lời</p>
                                                <div v-if="index==id_show" class="w-full">
                                                    <input v-model="replyofreply" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="" placeholder="Nhập trả lời tại đây....">
                                                    <button @click="replychild(index,comment_show.id,comment_show.name)" class=" ml-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                                        Trả lời
                                                    </button>
                                                </div>
                                                <div class="flex flex-col-reverse">
                                                    <div v-for="(data,index) in comment_show.reply" :key="index" class="w-11/12 mx-auto flex flex-col py-2  p-2  rounded-2xl border-2 border-indigo-100 mt-2">
                                                        <div class="flex">
                                                            <div>
                                                                <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110  " :src="data.avatar" alt="Profile image" />
                                                            </div>
                                                            <router-link :to="{name: 'Profile',params:{name: data.name}}" class="flex flex-col">
                                                                <a class="font-medium text-blue-500" href="">{{(data.name==ArticleById.name)?data.name+' (Author) 🤗':data.name}}</a>
                                                                <p href="">{{moment(data.published_at).fromNow()}}</p>

                                                            </router-link>
                                                        </div>
                                                        <div class="text-gray-700 ">
                                                            <p class="py-2">{{data.content}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RelatedPost />
                
            </div>

        </div>
    </div>
    
</div>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Header from '@/layouts/Header';
import Slidebar from '@/layouts/Slidebar';
import RelatedPost from '@/layouts/RelatedPost';
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    name: 'Post',
    components: {
        Header,
        Slidebar,
        LoadingAnimation,
        RelatedPost
    },
    data() {
        return {
            isLike: false,
            isSave: false,
            realtime_like: '0',
            user_key: '',
            content_comment: '',
            comment_show: [],
            id_show: '',
            replyofreply: '',
            realtime_count_post: '',
            loading: false,
            keySave: '',
            loadingPage: false,
        }
    },

    computed: mapGetters(['ArticleById', 'isLogin', 'userName', 'Datatime', 'avatar', 'id', 'GetComment']),
    methods: {
        ...mapActions(['actiongetArticleById', 'actionGetRelatedArticles', 'actionLikePost', 'actionCommentPost', 'actionaddComment', 'actionaddCommentChild', 'actionCountViewPost']),
        ...mapMutations(['TESTLOAD_DATA']),
        getArticleById() {
            this.actiongetArticleById(this.$route.params.id)
        },
        GetRelatedArticles() {
            this.actionGetRelatedArticles(this.$route.params.id)
        },
        like() {
            const current = new Date();
            const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            this.isLike = !this.isLike;
            if (this.isLike) {
                var updates = {};
                updates[`LikePost${this.$route.params.id}`] = parseInt(this.realtime_like) + parseInt(1)
                firebase.database().ref().update(updates);

                const messagesRef = firebase.database().ref(`LikePostUser${this.$route.params.id}`);
                messagesRef.push({
                    name: this.userName,
                });
                if (this.ArticleById[0].name !== this.userName) {
                    const messagesRef1 = firebase.database().ref(`NotificationLikePost`);
                    messagesRef1.push({
                        name: this.userName,
                        author: this.ArticleById[0].name,
                        router: this.$route.params.id,
                        content: 'Đã thích bài viết của bạn',
                        time: date + ' ' + time,
                        avatar: this.avatar,

                    });

                    const messagesRef = firebase.database().ref(`ShowNotificationLikePost`);
                    messagesRef.push({
                        name: this.userName,
                        author: this.ArticleById[0].name,
                        router: this.$route.params.id,
                        content: 'Đã thích bài viết của bạn: ',
                        time: date + ' ' + time,
                        avatar: this.avatar,
                    });
                }
            } else {
                var updates = {};
                updates[`LikePost${this.$route.params.id}`] = parseInt(this.realtime_like) - parseInt(1)
                firebase.database().ref().update(updates);
                var updates_user = {};
                updates_user[`/LikePostUser${this.$route.params.id}/` + this.user_key] = ({
                    'name': ''
                });
                firebase.database().ref().update(updates_user);
            }
        },
        save() {
            if (this.isSave == false) {
                const messagesRef = firebase.database().ref(`SavePost`);
                messagesRef.push({
                    background: this.ArticleById[0].background_img,
                    heading: this.ArticleById[0].heading,
                    router: this.$route.params.id,
                    categorie: this.ArticleById[0].name_categorie,
                    name: this.userName
                }).then((snap) => {
                    this.keySave = snap.key
                });
                this.isSave = true;
            } else {
                var updates = {};
                updates[`/SavePost/` + this.keySave] = "";
                firebase.database().ref().update(updates);
                this.isSave = false;
            }
        },
        checkSave() {
            const messagesRef = firebase.database().ref(`SavePost`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                Object.keys(data).forEach(key => {
                    if (data[key].name == this.userName) {
                        this.keySave = key;
                        this.isSave = true;
                        return true;
                    }
                });
            });
        },

        makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        },
        commentToFireBase() {
            const token = this.makeid(20);
            if (this.content_comment == '') {
                return
            };
            const current = new Date();
            const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const messagesRef = firebase.database().ref(`CommentPost${this.$route.params.id}`);
            messagesRef.push({
                'id': token,
                'name': this.userName,
                'avatar': this.avatar,
                'content': this.content_comment,
                'article_id': this.$route.params.id,
                'user_id': this.id,
                'published_at': date + ' ' + time,
            });

            if (this.userName !== this.ArticleById[0].name) {
                const messagesRef1 = firebase.database().ref(`NotificationLikePost`);
                messagesRef1.push({
                    name: this.userName,
                    author: this.ArticleById[0].name,
                    router: this.$route.params.id,
                    content: 'Đã bình luận bài viết của bạn: ' + this.content_comment,
                    time: date + ' ' + time,
                    avatar: this.avatar,
                });

                const messagesRef = firebase.database().ref(`ShowNotificationLikePost`);
                messagesRef.push({
                    name: this.userName,
                    author: this.ArticleById[0].name,
                    router: this.$route.params.id,
                    content: 'Đã bình luận bài viết của bạn: ' + this.content_comment,
                    time: date + ' ' + time,
                    avatar: this.avatar,
                });
            }

            this.actionaddComment({
                content: this.content_comment,
                article_id: this.$route.params.id,
                user_id: this.id,
                is_published: 1,
                token: token
            })
            this.content_comment = '';
        },
        reply(id) {
            this.id_show = id;
        },
        replychild(key, id, name) {
            if (this.replyofreply == '') {
                return
            };
            const current = new Date();
            const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const messagesRef = firebase.database().ref(`CommentPost${this.$route.params.id}`).child(key).child('reply')
            messagesRef.push({
                'id': id,
                'name': this.userName,
                'avatar': this.avatar,
                'content': this.replyofreply,
                'article_id': this.$route.params.id,
                'user_id': this.id,
                'published_at': date + ' ' + time,
            });
            // this.ArticleById[0].name
            // if (name !== this.userName) {

            //     const messagesRef1 = firebase.database().ref(`NotificationLikePostChild`);
            //     messagesRef1.push({
            //         name: this.userName,
            //         send: name,
            //         router: this.$route.params.id,
            //         content: 'Đã trả lời bình luận của bạn: ' + this.replyofreply,
            //         time: date + ' ' + time,
            //         avatar: this.avatar,
            //     });
            // }

            if (name !== this.userName) {

                const messagesRef1 = firebase.database().ref(`NotificationLikePost`);
                messagesRef1.push({
                    name: this.userName,
                    author: name,
                    router: this.$route.params.id,
                    content: 'Đã trả lời bình luận của bạn: ' + this.replyofreply,
                    time: date + ' ' + time,
                    avatar: this.avatar,
                });

                const messagesRef = firebase.database().ref(`ShowNotificationLikePost`);
                messagesRef.push({
                    name: this.userName,
                    author: name,
                    router: this.$route.params.id,
                    content: 'Đã trả lời bình luận của bạn: ' + this.replyofreply,
                    time: date + ' ' + time,
                    avatar: this.avatar,
                });
            }

            this.actionaddCommentChild({
                token: id,
                user_id: this.id,
                content: this.replyofreply,
            });
            this.replyofreply = ''
        },
        getCommentFromFireBase() {
            const messagesRef = firebase.database().ref(`CommentPost${this.$route.params.id}`)
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    this.comment_show = data;
                }
            });
        },
        setLikeDefault() {
            const messagesRef1 = firebase.database().ref(`LikePost${this.$route.params.id}`);
            messagesRef1.on('value', snapshot => {
                const data = snapshot.val();
                if (!data) {
                    const messagesRef = firebase.database().ref(`LikePost${this.$route.params.id}`);
                    messagesRef.set(0);
                }
            });

        },
        getRealtimeLikeFromFirebase() {
            var starCountRef = firebase.database().ref(`LikePost${this.$route.params.id}`);
            starCountRef.on('value', (snapshot) => {
                const data = snapshot.val();
                this.realtime_like = data;
            })
        },
        checkuserLikeFromFireBase() {
            const messagesRef = firebase.database().ref(`LikePostUser${this.$route.params.id}`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                Object.keys(data).forEach(key => {
                    if (data[key].name == this.userName) {
                        this.isLike = true;
                        this.user_key = key;
                        return
                    }
                });
            });
        },

        GetCountViewPostFromFireBase() {
            var starCountRef = firebase.database().ref(`CountViewPost${this.$route.params.id}`);
            starCountRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.realtime_count_post = data;
                } else {
                    const messagesRef1 = firebase.database().ref(`CountViewPost${this.$route.params.id}`);
                    messagesRef1.set(1);
                }
            })
        },
        setCountPostFromFireBase() {
            var updates = {};
            updates[`CountViewPost${this.$route.params.id}`] = parseInt(this.realtime_count_post) + parseInt(1)
            firebase.database().ref().update(updates);
        },
       

    },
    created() {
        this.checkSave();
        const messagesRef = firebase.database().ref(`NotificationLikePost`);
        messagesRef.once("value")
            .then(function (snapshot) {
                var a = snapshot.exists(); // true
                if (a == false) {
                    messagesRef.push({
                        name: ' ',
                        author: ' ',
                        router: ' ',
                        content: ' ',
                        time: ' ',
                        avatar: ' ',
                    });
                }
            });

        const messagesRef1 = firebase.database().ref(`NotificationLikePostChild`);
        messagesRef1.once("value")
            .then(function (snapshot) {
                var a = snapshot.exists(); // true
                if (a == false) {
                    messagesRef1.push({
                        name: ' ',
                        author: ' ',
                        router: ' ',
                        content: ' ',
                        time: ' ',
                        avatar: ' ',
                    });
                }
            });

        setTimeout(() => {
            this.loading = true;
            this.setCountPostFromFireBase()
        }, 60000);
        this.GetCountViewPostFromFireBase()
        this.getArticleById();
        this.GetRelatedArticles();
        this.setLikeDefault();
        this.getRealtimeLikeFromFirebase();
        this.checkuserLikeFromFireBase();
        
    },
     
    mounted() {
        
        setTimeout(() => {
            this.loadingPage = true;
        }, 1000)
        this.getCommentFromFireBase();
    },
    watch: {
        realtime_like() {
            this.actionLikePost({
                id: this.$route.params.id,
                like_count: this.realtime_like
            })

        },
        realtime_count_post() {
            if (this.loading) {
                this.actionCountViewPost({
                    id: this.$route.params.id,
                    hit_count: this.realtime_count_post
                })
            }
            this.loading = false;
        },
        
    },

}
</script>

<style>

</style>
