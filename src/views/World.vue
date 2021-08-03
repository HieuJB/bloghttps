<template>
<div class="">
    <div class="bg-white mx-auto h-full shadow-inner grid grid-cols-6 overflow-hidden text-xs lg:text-sm">
        <Header/>
        <div class="col-span-6 md:col-span-5 overflow-y-auto">
            <Slidebar/>
            <HotNews :theme="theme" />
            <LatestNews :theme="theme"/>
            <FeaturedAuthor />
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import HotNews from '@/layouts/HotNews';
import LatestNews from '@/layouts/LatestNews';
import FeaturedAuthor from '@/layouts/FeaturedAuthor';
import Slidebar from '@/layouts/Slidebar';

export default {
    name: "World",
    components: {
        Header,
        Footer,
        HotNews,
        LatestNews,
        FeaturedAuthor,
        Slidebar
    },
    data(){
        return{
            theme:5
        }
    }
    
};
</script>

<style scoped>

</style>
