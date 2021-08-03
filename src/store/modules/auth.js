import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from '@/router';
import Api from '@/apis/Auth.js';
import notification from '@/notification/index.js';

const state = {
  id: '',
  notification: [],
  resetForm: '',
  userName: '',
  avatar_link: '',
  isLogin: false,
  Avatar_refresh:''
};

const getters = {
  id: (state) => state.id,
  userName: (state) => state.userName,
  avatar: (state) => state.avatar_link,
  isLogin: (state) => state.isLogin,
  notification: (state) => state.notification,
  resetForm: (state) => state.resetForm,
  Avatar_refresh: (state) =>state.Avatar_refresh,

  };

const actions = {
  async actionRegistration({ commit }, data) {
    try {
      const response = await axios.post(`${Api.getLink()}/register`, data);
      commit('MUTATIONS_REGISTRATION', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionLogin({ commit }, data) {
    try {
      const response = await axios.post(`${Api.getLink()}/login`, data);
      commit('MUTATIONS_LOGIN', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionResentEmail({ commit }) {
    try {
      const token_email = localStorage.getItem('token_email');
      const newToken = token_email.substring(0, token_email.length - 1);
      const response = await axios.get(`${Api.getLink()}/resend`, {
        headers: { Authorization: 'Bearer ' + newToken },
      });
      commit('MUTATIONS_RESENTEMAIL', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionVerifyEmail({ commit }, data) {
    try {
      const response = await axios.get(`${Api.getLink()}/verifi/${data}`);
      commit('MUTATIONS_VERIFYEMAIL', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionSentEmailForgetPassword({ commit }, data) {
    try {
      const response = await axios.post(
        `${Api.getLink()}/forgetPassword`,
        data
      );
      commit('MUTATIONS_SENTEMAILFORGETPASSWORD', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionChangePassword({ commit }, data) {
    try {
      const response = await axios.post(
        `${Api.getLink()}/handleForgetPassword`,
        data
      );
      commit('MUTATIONS_CHANGEPASSWORD', response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionLoginSociable({ commit }, data) {
    try {
      const response = await axios.post(`${Api.getLink()}/google`, data);
      commit('MUTATIONS_LOGINSOCIABLE', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionGetAvatar({commit},data){
    const response = await axios.get(`${Api.getLink()}/avatar/${data}`)
    commit('MUTATIONS_GETAVATAR',response.data);
  },
  async actionUpdateAvatar({commit},data){
    const response = await axios.post(`${Api.getLink()}/avatar`,data,Api.getHeader())
    commit('MUTATIONS_UPDATEAVATAR',response.data);
  }
  
};

const mutations = {
  MUTATIONS_REGISTRATION(state, data) {
    if (data.status) {
      state.notification = data.message;
      state.resetForm = '1';
      notification.success(data.message);
      router.push({ name: 'Login' });
    } else {
      state.notification = data.message;
      setTimeout(() => {
        state.notification = '';
      }, 3000);
    }
  },
  MUTATIONS_LOGIN(state, data) {
    if (data.status) {
      if (data.message) {
        state.id = data.user.id;
        state.userName = data.user.name;
        state.avatar_link = data.user.avatar_link;
        state.isLogin = true;
        localStorage.setItem('token', data.token);
        router.push({ name: 'Home' });
      } else {
        state.userName = data.user.name;
        localStorage.setItem('token_email', data.token + 1);
        router.push({ name: 'SentEmail' });
      }
    } else {
      if (data.message) {
        state.notification = data.message; //truong hop khong nhap day du thong tin
        setTimeout(() => {
          state.notification = '';
        }, 3000);
      } else {
        notification.error(data.message_err);
      }
    }
  },
  MUTATIONS_RESENTEMAIL(state, data) {
    if (data.status) {
      state.notification = data.message;
      notification.success(data.message);
    }
  },
  MUTATIONS_VERIFYEMAIL(data) {
    if (data.status) {
      localStorage.removeItem('token_email');
      router.push({ name: 'Login' });
    } else {
      router.push({ name: 'Login' });
      localStorage.removeItem('token_email');
    }
  },
  MUTATIONS_SENTEMAILFORGETPASSWORD(state, data) {
    if (data.status) {
      state.notification = data.message;
      notification.success(data.message);
      setTimeout(() => (state.notification = ''), 100);
    } else {
      state.notification = data.message;
      notification.error(data.message.email[0]);
      setTimeout(() => (state.notification = ''), 100);
    }
  },
  MUTATIONS_CHANGEPASSWORD(data) {
    if (data) {
      router.push({ name: 'Login' });
    } else {
      alert('that bai');
    }
  },
  MUTATIONS_LOGINSOCIABLE(state, data) {
    if (data) {
      state.id = data.user.id;
      state.userName = data.user.name;
      state.avatar_link = data.user.avatar_link;
      state.isLogin = true;
      localStorage.setItem('token', data.token);
      router.push({ name: 'Home' });
    }
  },
  // TESTLOAD_DATA(state){
  //   state.load_data=!state.load_data;
  // }
  MUTATIONS_GETAVATAR(state,data){
    state.Avatar_refresh=data.user.avatar_link;
  },
  MUTATIONS_UPDATEAVATAR(state,data){
    state.avatar_link=data.data;
    state.Avatar_refresh=data.data;
    console.log(data.data);
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations,
};
