<template>
<div class="col-span-4 md:col-span-1 relative">
    <h1 class="font-medium py-2 pl-3 text-gray-600">TIN LIÊN QUAN</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
        <div v-for="(RelatedArticles,index) in RelatedArticles" :key="index" class="w-11/12  mx-auto rounded-2xl bg-white shadow-2xl  mb-2  ">
            <img class="object-cover h-32 w-full rounded-xl border-8 border-blue-50" :src="RelatedArticles.background_img">
            <router-link :to="{name:'Post',params:{id:RelatedArticles.id}}" class="pl-2 font-medium text-blue-500 hover:text-blue-600">{{RelatedArticles.heading}}</router-link>
            <div class="flex px-2 py-2">
                <div>
                    <img class="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-300 hover:border-green-500 cursor-pointer transform hover:scale-110  " :src="RelatedArticles.avatar_link" alt="Profile image" />
                </div>
                <div class="flex flex-col">
                    <router-link :to="{name:'Profile',params:{name:RelatedArticles.name}}" class="font-medium" href="">{{RelatedArticles.name}}</router-link>
                    <p href="">{{moment(RelatedArticles.published_at).format('k:mm-MMM-Qo')}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'RelatedPost',
    computed:mapGetters(['RelatedArticles']),
}
</script>

<style>

</style>
