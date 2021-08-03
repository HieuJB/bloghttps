<template>
<div class="w-full bg-gray-100 ">
    <div class="flex justify-between font-medium w-11/12 mx-auto py-2">
        <a href="" class="text-xs xl:text-sm">TIN MỚI NHÂT</a>
        <p @click="showAll" class="cursor-pointer text-xs xl:text-sm text-gray-500 hover:text-blue-500">XEM TẤT CẢ</p>
    </div>
    <div class="w-11/12  mx-auto ">
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(GetLatestArticles,index) in GetLatestArticles.slice(0,6)" :key="index" class="flex bg-white rounded-2xl shadow-2xl border border-gray-200">
                <div class="w-1/3 p-2 ">
                    <img class="object-cover rounded-xl h-28 w-full cursor-pointer transform hover:scale-110" :src="GetLatestArticles.background_img">
                </div>
                <div class="w-4/6 text-xs text-gray-600 flex flex-col pt-1 relative">

                    <a class="font-medium text-xs lg:text-sm text-gray-600" href="">{{GetLatestArticles.name_categorie}}</a>
                    <router-link :to="{name: 'Post', params:{id:GetLatestArticles.id}}" class="text-xs text-blue-500 hover:text-blue-700" href="">{{GetLatestArticles.heading}}</router-link>
                    <div class="flex justify-between">
                        <div class="absolute bottom-0 font-medium py-2">
                            <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110" :src="GetLatestArticles.avatar_link">
                            
                        </div>
                        <div class="absolute bottom-0 left-14 font-medium py-2">
                            <router-link :to="{name:'Posted',params:{name: GetLatestArticles.name}}">{{GetLatestArticles.name}}</router-link>
                        </div>
                        <div class="absolute bottom-0 right-0 mr-2 font-medium py-2 text-gray-500 ">
                            <p>{{moment(GetLatestArticles.published_at).fromNow()}}</p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import router from "@/router";
export default {
    name: 'LatestNews',
    props: {
        theme: Number,
    },
    computed: mapGetters(['GetLatestArticles']),
    methods: {
        ...mapActions(['actionGetTheLatestArticles', 'actionGetTheLatestThemedArticles']),
        showAll() {
            if (this.theme == 0) {
                this.actionGetTheLatestArticles()
                router.push({
                    name: "Search",
                });
            } else {
                this.actionGetTheLatestThemedArticles(this.theme)
                router.push({
                    name: "Search",
                });
            }
        },
    },
    mounted() {
        console.log(this.GetLatestArticles);
        if (this.theme == 0) {
            this.actionGetTheLatestArticles()
        } else {
            this.actionGetTheLatestThemedArticles(this.theme)
        }
    }
}
</script>

<style>

</style>
