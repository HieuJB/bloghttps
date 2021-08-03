<template>
<div class="">
    <div class="bg-white mx-auto h-full shadow-inner grid grid-cols-6 overflow-hidden text-xs lg:text-sm">
        <Header />
        <div class="col-span-6 md:col-span-5 overflow-y-auto">
            <Slidebar />
            <h1 class="font-medium py-2">Kết quả</h1>
            <SeeAll/>
        </div>
    </div>
    <!-- <Footer /> -->
</div>
</template>

<script>
import Header from '@/layouts/Header';
// import Footer from '@/layouts/Footer';
import Slidebar from '@/layouts/Slidebar';
import SeeAll from '@/layouts/SeeAll';

export default {
    name: 'Search',
    components: {
        Header,
        // Footer,
        Slidebar,
        SeeAll
    },
}
</script>

<style>

</style>
