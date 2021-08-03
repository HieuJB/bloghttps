<template>
    <section class="text-gray-600 body-font">
        <div v-if="data.length" class="container pt-2 pb-8 mx-auto">
            <div class="flex flex-wrap -m-4">
                <div v-for="(data,index) in data" :key="index" class="p-4 md:w-1/3">
                    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="data.background" alt="blog">
                        <div class="p-6">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Chuyên mục</h2>
                            <h1 class="title-font text-lg font-medium text-blue-500 mb-3">{{data.categorie}}</h1>
                            <p class="font-medium mb-3">{{data.heading}}</p>
                            <div class="flex items-center flex-wrap justify-between ">
                                <router-link :to="{name:'Post',params:{id:data.router}}" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Đọc thêm
                                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
        <LoadingAnimation/>
    </div>
    </section>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation';
import { mapGetters } from 'vuex';
export default {
    name:'Saved',
    components:{
        LoadingAnimation
    },
    data(){
        return{
            data:[]
        }
    },
    computed:mapGetters(['userName']),
    methods:{
        checkSave(){
            const messagesRef = firebase.database().ref(`SavePost`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                Object.keys(data).forEach(key => {
                    if (data[key].name == this.userName) {
                        this.data.push({
                            background:data[key].background,
                            heading: data[key].heading,
                            categorie: data[key].categorie,
                            router: data[key].router
                        })
                        return true;
                    }
                });
            });
        },
    },
    mounted(){
        this.checkSave();
    }
}
</script>

<style>

</style>