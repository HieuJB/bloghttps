<template>
<div v-if="GetSearch">
    <div v-for="(GetSearch,index) in GetSearch.slice(0,data)" :key="index" class="my-4  shadow-xl py-2 ">
        <a href="#" class="flex w-full transform transition-all duration-300 scale-100 hover:scale-95">
            <div class="block h-36 w-1/3 md:w-1/4 rounded overflow-hidden">
                <img :src="GetSearch.background_img">
            </div>
            <router-link :to="{name:'Post',params:{id:GetSearch.id}}" class="pl-3 w-3/5">
                <p class="text-xs text-gray-500 uppercase font-semibold pb-1">{{GetSearch.name_categorie}}</p>
                <h3 class="text-md font-semibold leading-tight mb-3 text-blue-500">{{GetSearch.heading}}</h3>
                <div class="flex absolute bottom-0 ">
                    <div>
                        <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110  " :src="GetSearch.avatar_link" />
                    </div>
                    <div class="flex flex-col">
                        <a href="">{{GetSearch.name}}</a>
                        <p href="">{{moment(GetSearch.published_at).format('k:mm-MMM-Qo')}}</p>
                    </div>
                </div>
            </router-link>
        </a>
    </div>
    <div class="flex my-12 ">
        <button @click="IncreasePosts" class="mx-auto py-4 bg-white hover:bg-blue-600  hover:text-indigo-50 text-gray-800 font-semibold  px-8  border border-gray-400 rounded shadow">
            Xem thêm
        </button>

    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'SeeAll',
    data(){
        return{
            data:10
        }
    },
    computed: mapGetters(['GetSearch']),
    methods:{
        IncreasePosts(){
            this.data=parseInt(this.data)+parseInt(10);
        }
    }
}
</script>

<style>

</style>
