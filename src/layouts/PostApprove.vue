<template>
<section class="text-gray-600 body-font">
    <div v-if="PostUnconfirmed.length" class="container pt-2 pb-8 mx-auto">
        <div class="flex flex-wrap -m-4">
            <div v-for="(PostUnconfirmed,index) in PostUnconfirmed" :key="index" class="p-4 md:w-1/3">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="PostUnconfirmed.background_img" alt="blog">
                    <div class="p-6">
                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Chuyên mục</h2>
                        <h1 class="title-font text-lg font-medium text-blue-500 mb-3">{{PostUnconfirmed.name_categories}}</h1>
                        <p class="font-medium mb-3">{{PostUnconfirmed.heading}}</p>
                        <div class="flex items-center flex-wrap justify-between ">
                            <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Đọc thêm
                                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                            <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Đang phê duyệt...</a>
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
    mapActions,
    mapGetters
} from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
export default {
    name: 'PostApprove',
    components:{
        LoadingAnimation
    },
    data() {
        return {
            amount: '3'
        }
    },
    computed: mapGetters(['id', 'PostUnconfirmed']),
    methods: {
        IncreasePosts() {
            this.actionGetPostUnconfirmed({
                id: this.id,
                amount: parseInt(this.amount)+parseInt(3)
            });
            this.amount=parseInt(this.amount)+parseInt(3);
        },
        ...mapActions(['actionGetPostUnconfirmed']),
    },
    created() {
        this.actionGetPostUnconfirmed({
            id: this.id,
            amount: this.amount
        })
    }
}
</script>

<style>

</style>
