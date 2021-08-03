<template>
<div>
    <div class="flex justify-center ">
        <unicon class="pt-1" name="facebook-f" fill="blue" icon-style="monochrome" />
        <p @click="loginFacebook()" class="pt-2 text-blue-500  cursor-pointer font-medium hover:text-blue-600 ">Đăng nhập bằng Facebook</p>
    </div>
    <div @click="loginGoogle()" class="flex justify-center ">
        <p class=" pt-1">
            <unicon class="" name="google" fill="blue" icon-style="monochrome" />
        </p>
        <p href="" class="pt-2 text-blue-500  cursor-pointer font-medium hover:text-blue-600 ">Đăng nhập bằng Google</p>
    </div>
</div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';

import {
    mapActions
} from 'vuex';
export default {
    name: 'SocicalNetwork',
    components: {
        facebookLogin
    },
    data() {
        return {
            name: '',
            email: '',
            avatar_link: '',
            sociable: ''

        }
    },
    methods: {
        async loginGoogle() {
            
           
            const googleUser = await this.$gAuth.signIn();
            //   console.log("googleUser", googleUser);
            //   console.log("googleUser", googleUser);
            //   console.log("getId", googleUser.getId());
            //   console.log("getBaseProfile", googleUser.getBasicProfile());
            this.name = googleUser.getBasicProfile().Ne;
            this.email = googleUser.getBasicProfile().zt;
            this.avatar_link = googleUser.getBasicProfile().KI;
            this.sociable = 'google';
            
        },
        ...mapActions(['actionLoginSociable']),

        loginFacebook(){
          var provider = new firebase.auth.FacebookAuthProvider();  
            firebase.auth().signInWithPopup(provider).then((result)=>{
                var user = result.user;
                this.name=user.displayName;
                this.email=user.email;
                this.avatar_link=user.photoURL;
                this.sociable = 'facebook';
            })
        }
    },
    watch: {

        email() {

            this.actionLoginSociable({
                name: this.name,
                email: this.email,
                avatar_link: this.avatar_link,
                sociable: this.sociable,
                role_name: 'reader',
    
            })
            

        }

    }
}
</script>

<style>

</style>
