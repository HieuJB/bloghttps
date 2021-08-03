<template>
<div class="py-4">
    <div class="flex justify-between md:justify-between">
        <div class="flex pl-8">
            <img class="h-10 pb-1" src="../assets/images/logo.png">
            <p class="pt-3 text-gray-600 font-medium hidden  xl:block " href="">CHÀO BẠN,</p><span>
                <p v-if="userName" class="pt-3 text-gray-400 font-medium ">{{userName}}</p>
            </span>
        </div>

        <div class="flex flex-col relative hidden md:block">
            <div class="text-gray-700 font-medium">
                <p class=" text-center">TÌNH HÌNH COVID-19</p>
            </div>
            <div class="flex">
                <p class="pl-2 font-medium text-red-300 ">Số ca nhiễm: 33000</p>
                <p class="pl-2 font-medium text-green-300 ">Bình phục: 29000</p>
                <p class="pl-2 font-medium text-gray-500 ">Tử vong: 360</p>
            </div>

        </div>
        <div class="flex pr-2 ">
            <input v-model="dataSearch" v-on:keyup="handleSearch" class="mr-2 bg-gray-100 rounded text-gray-400 p-2 w-24 sm:w-40	 focus:outline-none focus:shadow-outline focus:border-purple-500 " type="text" placeholder="Tìm kiếm tại đây...">
            <router-link :to="{name: 'Search'}" class="bg-blue-400 p-2 text-white font-medium rounded hover:bg-green-400">Search</router-link>
        </div>

        <div v-if="dataSearch" class="absolute w-full md:w-1/2 lg:w-1/3 bg-white top-16 right-0 z-10 rounded-2xl shadow-2xl pt-2">
            <div v-for="(GetSearch,index) in GetSearch.slice(0,6)" :key="index" class="flex bg-white rounded-2xl shadow-2xl border border-gray-200 ">
                <div class="w-1/4 p-2 ">
                    <img class="object-cover rounded-xl h-16 w-full cursor-pointer transform hover:scale-110" :src="GetSearch.background_img">
                </div>
                <router-link :to="{name:'Post',params:{id: GetSearch.id}}" class="w-3/4 text-xs text-gray-600 flex flex-col pt-1 relative">
                    <a class="font-medium text-xs lg:text-sm text-gray-600" href="">{{GetSearch.name_categorie}}</a>
                    <a class="text-xs text-blue-500 hover:text-blue-700 font-medium" href="dsadsa">{{GetSearch.heading}}</a>
                    <div class="flex p-2">
                        <img class="rounded-full object-cover h-6 w-6" :src="GetSearch.avatar_link">
                        <p class="font-medium pt-1 pl-1 text-gray-600">{{GetSearch.name}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: 'Slidebar',
    data() {
        return {
            isLogin: false,
            dataSearch: ''
        }
    },
    computed: mapGetters(['userName', 'GetSearch']),
    methods: {
        ...mapActions(['actionSearchData']),
        handleSearch() {
            this.actionSearchData({
                key: this.dataSearch
            })
        }
    }
}
</script>

<style>

</style>
