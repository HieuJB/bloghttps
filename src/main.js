import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniFacebookFMonochrome,uniGoogleMonochrome } from 'vue-unicons/dist/icons'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2';
import GAuth from 'vue-google-oauth2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueProgressBar from 'vue-progressbar'
import tinymce from 'vue-tinymce-editor'
import VueClipboard from 'vue-clipboard2'
import moment from 'moment';

const gauthOption = {
  clientId: '939096767575-dar4k0q06d524jbn5p3tp9v26blti2na.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.prototype.moment = moment
Vue.use(VueClipboard)
Vue.component('tinymce', tinymce)
Vue.use(VueProgressBar, options)
Vue.use(GAuth, gauthOption);
Vue.use(VueSweetalert2);
Unicon.add([uniFacebookFMonochrome,uniGoogleMonochrome])
Vue.use(Unicon);
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD_qhaQNzDZ9uDqIXsHNUP4w44mIqQSJT0",
  authDomain: "fir-image-uploader-b0851.firebaseapp.com",
  projectId: "fir-image-uploader-b0851",
  storageBucket: "fir-image-uploader-b0851.appspot.com",
  messagingSenderId: "316639555391",
  appId: "1:316639555391:web:b77fadfe103c29f12e6d8a",
  measurementId: "G-S69FR3N9QB"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
window.firebase=firebase;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
