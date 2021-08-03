<template>
<div v-if="ModalOnVideoCall1"  class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="flex items-end justify-center min-h-screen pt-4 px-4  text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom  rounded-lg text-left overflow-hidden transform transition-all sm:my-12 sm:align-middle w-full md:w-1/2 h-screen">

            <div class="bg-white p-1 h-3/4 rounded-2xl mt-8 ">
                <svg @click="CloseModalOnVideoCall1" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 float-right cursor-pointer text-red-500 hover:text-red-700 shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="  h-full p-4  ">
                    <vue-jitsi-meet  ref="jitsiRef" domain="meet.jit.si" :options="jitsiOptions"></vue-jitsi-meet>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    JitsiMeet
} from '@mycure/vue-jitsi-meet';
import { mapGetters } from 'vuex';
export default {
    components: {
        VueJitsiMeet: JitsiMeet
    },
    computed: {
        ...mapGetters(['userName','ModalOnVideoCall1']),
        jitsiOptions() {
            return {
                roomName: this.userName,
                noSSL: false,
                userInfo: {
                    email: 'vsa@gmail.com',
                    displayName: this.userName,
                },
                configOverwrite: {
                    enableNoisyMicDetection: false,
                },
                interfaceConfigOverwrite: {
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    SHOW_CHROME_EXTENSION_BANNER: false
                },
                onload: this.onIFrameLoad,
            };
        },
    },
    methods: {
        onIFrameLoad() {
        },
        CloseModalOnVideoCall1(){
            this.$store.commit('CloseModalOnVideoCall1');
            firebase.database().ref(`NotificationCall${this.userName}`).remove();
            // firebase.database().ref(`BusyCallHandling${this.NameCall1}`).remove();
            firebase.database().ref(`BusyCallHandling${this.userName}`).remove();
            firebase.database().ref(`${this.userName}`).remove();
        }
    },
};
</script>
