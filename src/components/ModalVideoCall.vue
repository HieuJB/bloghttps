<template>
<div v-if="ShowOutGoingVideoCall" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-400 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 p-6">
                <p class="font-bold text-xl">Cuộc gọi đi</p>
                <div class="flex pt-4">
                    <img class="object-cover h-20 w-20 rounded-full p-1 bg-blue-200 ml-1" :src="Avatar_refresh">
                    <div class="flex flex-col pt-2 ml-2">
                        <p class="font-bold pb-1">Đang kết nối tới {{this.$route.params.name}}</p>
                        <p class="text-gray-400">Cuộc gọi sẽ bắt đầu ngay sau khi được trả lời.</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p @click="MUTATIONS_SHOWOUTGOINGVIDEOCALL" class="p-2 text-blue-600 font-medium pr-6 cursor-pointer hover:text-red-500">Hủy cuộc gọi</p>
                    <div class=" flex justify-center items-center">
                        <p class="p-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700">Đang kết nối...</p>
                        <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import { mapGetters, mapMutations } from 'vuex';
let uuid = require("uuid");
import Notification from '@/notification/index.js';
export default {
    name: 'ModalVideoCall',
    data(){
      return{
        id:''
      }
    },
    computed:mapGetters(['ShowOutGoingVideoCall','Avatar_refresh','userName','avatar']),
    methods:{
      ...mapMutations(['MUTATIONS_SHOWOUTGOINGVIDEOCALL']),
      // HandleCallSuccessful(){
      //   firebase.database().ref(`NotificationCall${this.$route.params.name}`).once("value", snapshot => {
      //     if (snapshot.exists()){
      //         Notification.error('Máy bận');
      //     }
      //   });
      // },
      NotificationBusyFromCaller(){
        const messagesRef = firebase.database().ref(`NotificationBusyFromCaller${this.userName}`);
              messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                if(data){
                    this.$store.commit('MUTATIONS_BUSYFROMCALLER');
                    firebase.database().ref(`NotificationBusyFromCaller${this.userName}`).remove();
                    Notification.error('Người gọi không muốn nghe máy');
                    return;
                }
            });
      },
      WaitingAcceptCall(){
        const messagesRef = firebase.database().ref(`${this.$route.params.name}`);
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                if(data){
                    this.$store.commit('MUTATIONS_ACCEPTCALL');
                    // this.$store.commit('MUTATIONS_BUSYFROMCALLER');   
                    
                }
            });
      }
    },
    watch:{
      ShowOutGoingVideoCall(){
        if(this.ShowOutGoingVideoCall){
          const id = uuid.v1();
          const messagesRef = firebase.database().ref(`NotificationCall${this.$route.params.name}`).child(this.$route.params.name);
                messagesRef.push({
                name: this.userName,
                avatar: this.avatar,
                uuid:id
          });
          firebase.database().ref(`BusyCallHandling${this.userName}`).set('1');
          firebase.database().ref(`BusyCallHandling${this.$route.params.name}`).set('1');
        }else{
          firebase.database().ref(`NotificationCall${this.$route.params.name}`).remove();
          firebase.database().ref(`BusyCallHandling${this.userName}`).remove();
          firebase.database().ref(`BusyCallHandling${this.$route.params.name}`).remove();
        }
        return
      },
      // uuid(){
      //   console.log(this.uuid);
      // }
    },
    mounted(){
      this.NotificationBusyFromCaller();
      this.WaitingAcceptCall();
      // this.HandleCallSuccessFul();
      
    },
    
    
}
</script>

<style>

</style>
