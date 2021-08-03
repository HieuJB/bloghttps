import axios from 'axios';
import Api from '@/apis/Profile.js';
import notification from '@/notification/index.js';

const state = {
  PostUnconfirmed: [],
  PostConfirmed: [],
  // Avatar_refresh:''
};

const getters = {
  PostUnconfirmed: (state) => state.PostUnconfirmed,
  PostConfirmed: (state) => state.PostConfirmed,
  // Avatar_refresh: (state) =>state.Avatar_refresh,
};

const actions = {
  async actionAddPost({ commit }, data) {
    try {
      const response = await axios.post(
        `${Api.getLink()}/article`,
        data,
        Api.getHeader()
      );
      commit('MUTATIONS_ADDARTICLE', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionGetPostUnconfirmed({ commit }, data) {
    try {
      const response = await axios.get(
        `${Api.getLink()}/articles/unconfirmed/${data.id}/${data.amount}`,
        Api.getHeader()
      );
      commit('MUTATIONS_GETPOSTUNCONFIRMED', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async actionGetPostConfirmed({ commit }, data) {
    try {
      const response = await axios.get(
        `${Api.getLink()}/articles/confirmed/${data.id}/${data.amount}`,
        Api.getHeader()
      );
      commit('MUTATIONS_GETPOSTCONFIRMED', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  // async actionGetAvatar({commit},data){
  //   const response = await axios.get(`${Api.getLink()}/user/avatar/${data}`)
  //   commit('MUTATIONS_GETAVATAR',response.data);
  // },
  // async actionUpdateAvatar({commit},data){
  //   const response = await axios.post(`${Api.getLink()}/user/avatar`,data,Api.getHeader())
  //   if(response.data.status==true){
  //     location.reload();
  //   }
  // }
};

const mutations = {
  MUTATIONS_ADDARTICLE(state, data) {
    if (data.status) {
      notification.success('Thêm thành công');
    } else {
      notification.error('Vui lòng nhập đầy đủ thông tin');
    }
  },
  MUTATIONS_GETPOSTUNCONFIRMED(state, data) {
    state.PostUnconfirmed = data.data;
  },
  MUTATIONS_GETPOSTCONFIRMED(state, data) {
    state.PostConfirmed = data.data;
  },
  // MUTATIONS_GETAVATAR(state,data){
  //   state.Avatar_refresh=data.user.avatar_link;
  // }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
