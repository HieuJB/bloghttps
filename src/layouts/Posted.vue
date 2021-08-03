<template>
<section class="text-gray-600 body-font">
    <div v-if="PostConfirmed.length" class="container pt-2 pb-8 mx-auto">
        <div class="flex flex-wrap -m-4">
            <div v-for="(PostConfirmed,index) in PostConfirmed" :key="index" class="p-4 md:w-1/3">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="PostConfirmed.background_img" alt="blog">
                    <div class="p-6">
                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Chuyên mục</h2>
                        <h1 class="title-font text-lg font-medium text-gray-500 mb-3">{{PostConfirmed.name_categorie}}</h1>
                        <p class="leading-relaxed mb-3">{{PostConfirmed.heading}}</p>
                        <div class="flex items-center flex-wrap ">
                            <router-link :to="{name:'Post',params:{id:PostConfirmed.id}}" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Đọc thêm
                                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </router-link>
                            <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>{{PostConfirmed.hit_count}}
                            </span>

                            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>{{PostConfirmed.like_count}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="IncreasePosts" class="bg-white hover:bg-blue-600 hover:text-indigo-50 text-gray-800 font-semibold py-2 px-8 mt-8 border border-gray-400 rounded shadow">
            Xem thêm
        </button>
    </div>
    <div v-else>
        <LoadingAnimation/>
    </div>
</section>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
export default {
    name: 'Posted',
    components:{
        LoadingAnimation
    },
    data() {
        return {
            amount: '3'
        }
    },
    computed: mapGetters(['id', 'PostConfirmed']),
    methods: {
        IncreasePosts() {
            this.actionGetPostConfirmed({
                id: this.$route.params.name,
                amount: parseInt(this.amount) + parseInt(3)
            });
            this.amount = parseInt(this.amount) + parseInt(3);
        },
        ...mapActions(['actionGetPostConfirmed']),
    },
    created() {
        this.actionGetPostConfirmed({
            id: this.$route.params.name,
            amount: this.amount
        })
    }
}
</script>

<style>

</style>
