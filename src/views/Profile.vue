<template>
<div>
    <div class="bg-white mx-auto h-full shadow-inner grid grid-cols-6 overflow-hidden text-xs lg:text-sm">
        <Header />
        <div class="col-span-6 md:col-span-5 overflow-y-auto">
            <Slidebar />
            <LoadingAnimation v-if="!loading"/>
            <main v-if="loading" class="profile-page">
                <HeaderProfile />
                <section class="relative py-16 bg-gray-300">
                    <div class="container mx-auto px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div class="px-6">
                                <AvatarProfile />
                                <div class=" border-t border-gray-300 text-center">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="my-4 flex">
                                        </div>
                                        <div class="grid grid-cols-2 md:flex text-gray-500 font-medium py-4">
                                            <div @click="active('Posted')" class="flex px-2 md:px-4 hover:text-blue-700" :class="(Posted)?'text-blue-500':''">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                </svg>
                                                <router-link :to="{name:'Posted'}" class="cursor-pointer">Tin đã đăng</router-link>
                                            </div>
                                            <div v-if="(this.$route.params.name==userName)" @click="active('Approve')" class="flex px-2 md:px-4 hover:text-blue-700" :class="(Approve)?'text-blue-500':''">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                                <router-link :to="{name:'PostApprove'}" class="cursor-pointer">Đợi phê duyệt</router-link>
                                            </div>
                                            <div v-if="(this.$route.params.name==userName)" @click="active('Saved')" class="flex px-2 md:px-4 hover:text-blue-700" :class="(Saved)?'text-blue-500':''">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                                <router-link :to="{name:'Saved'}" class="cursor-pointer">Tin đã lưu</router-link>
                                            </div>
                                            <div v-if="(this.$route.params.name==userName)" @click="active('Post')" class="flex px-2 md:px-4 hover:text-blue-700" :class="(Post)?'text-blue-500':''">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <router-link :to="{name:'PersonalPost'}" class="cursor-pointer">Đăng tin</router-link>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <router-view></router-view>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                              
                </section>
            </main>
        </div>
    </div>
</div>
</template>

<script>
import Header from '@/layouts/Header';
import Slidebar from '@/layouts/Slidebar';
import Posted from '@/layouts/Posted';
import Saved from '@/layouts/Saved';
import HeaderProfile from '@/layouts/HeaderProfile';
import AvatarProfile from '@/layouts/AvatarProfile';
import { mapActions, mapGetters } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
export default {
    name: 'Profile',
    components: {
        Header,
        Slidebar,
        Saved,
        Posted,
        HeaderProfile,
        AvatarProfile,
        LoadingAnimation
    },
    data(){
        return{
            Posted:true,
            Approve:false,
            Saved:false,
            Post:false,
            loading:false
        }
    },
    computed:mapGetters(['userName']),
    methods:{
        ...mapActions(['actionGetAvatar']),
        getAvatar(){
            this.actionGetAvatar(this.$route.params.name);
        },
        active(data){
            (data=='Posted')?this.Posted=true:this.Posted=false;
            (data=='Approve')?this.Approve=true:this.Approve=false;
            (data=='Saved')?this.Saved=true:this.Saved=false;
            (data=='Post')?this.Post=true:this.Post=false;
        }
    },
    created(){
        this.getAvatar();
        
    },
    mounted(){
        setTimeout(()=>{
            this.loading=true;
        },1000)
    },
    
    
    
   



}
</script>
