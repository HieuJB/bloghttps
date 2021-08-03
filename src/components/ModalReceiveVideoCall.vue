<template>
<div v-if="ShowIncomingCall" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-400 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 p-6">
                <p class="font-bold text-xl">Cuộc gọi đến ...</p>
                <div class="flex pt-4">
                    <img class="object-cover h-20 w-20 rounded-full p-1 bg-blue-200 ml-1" :src="avatar">
                    <div class="flex flex-col pt-2 ml-2">
                        <p class="font-bold pb-1">{{name}} đang gọi cho bạn</p>
                        <p class="text-gray-400">Cuộc gọi sẽ bắt đầu ngay sau khi được trả lời.</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p @click="CancelCall" class="p-2 text-blue-600 font-medium pr-6 cursor-pointer hover:text-red-500">Từ chối</p>
                    <div @click="AcceptCall" class="flex pt-2 bg-blue-500 px-2 rounded text-white hover:bg-blue-700 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p class="font-medium px-1">Chấp nhận</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'ModalReceiveVideoCall',
    computed:mapGetters(['userName']),
    data(){
        return{
            ShowIncomingCall:false,
            avatar:'',
            name:'',
            uuid:''
        }
    },
    methods: {
        ReceivingCall() {
            const messagesRef = firebase.database().ref(`NotificationCall${this.userName}`).child(this.userName);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                if(data){
                    this.ShowIncomingCall=true;
                    Object.keys(data).forEach(key => {
                        this.avatar=data[key].avatar;
                        this.name=data[key].name;
                        this.uuid=data[key].uuid;
                     });
                }else{
                    this.ShowIncomingCall=false;
                }
            });
        },
        CancelCall(){
            firebase.database().ref(`NotificationCall${this.userName}`).remove();
            firebase.database().ref(`BusyCallHandling${this.name}`).remove();
            firebase.database().ref(`BusyCallHandling${this.userName}`).remove();
            firebase.database().ref(`NotificationBusyFromCaller${this.name}`).set('1');
        },
        AcceptCall(){
            firebase.database().ref(`${this.userName}`).set('1');
            this.$store.commit('MUTATIONS_ACCEPTCALL1');
        },
    },
    mounted() {
        this.ReceivingCall();
    },
}
</script>

<style>

</style>
