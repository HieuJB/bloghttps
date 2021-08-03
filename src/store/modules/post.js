import axios from 'axios';
import Api from '@/apis/Profile.js';
import moment from 'moment';

const state = {
    ArticleById:[],
    RelatedArticles:[],
    like:'',
    comment:'',
    search:'',
    favoritepost:'',
    latestarticles:'',
    ShowMessage:false,
    AudioHeading:'',
    AudioBackground:'',
    Audio:[],
    
};

const getters = {
    ArticleById : (state)=>state.ArticleById,
    Datatime: (state)=>moment(String(state.ArticleById[0].published_at)).format('k:mm-MMM-Qo'),
    Like : (state)=>state.like,
    GetComment: (state)=>state.comment,
    GetSearch: (state)=>state.search,
    GetFavoritePost: (state)=>state.favoritepost,
    GetLatestArticles: (state)=>state.latestarticles,
    ShowMessage: (state)=>state.ShowMessage,
    RelatedArticles: (state)=>state.RelatedArticles,
    Audio: (state)=>state.Audio,
};

const actions = {
  async actiongetArticleById({commit},data){
    const response = await axios.get(`${Api.getLink()}/article/${data}`,Api.getHeader());
    commit('MUTATIONS_GETARTICLEBYID',response.data);
  },
  async actionGetRelatedArticles({commit},data){
    const response = await axios.get(`${Api.getLink()}/articles/GetRelatedArticles/${data}`,Api.getHeader());
    commit('MUTATIONS_GETRELATEDARTICLES',response.data);
    console.log(response.data);
  },
  async actionLikePost({commit},data){
    const response = await axios.post(`${Api.getLink()}/article/likeArticle/${data.id}`,data);
  },
  async actionaddComment({commit},data){
    const response = await axios.post(`${Api.getLink()}/comment`,data,Api.getHeader());
  },
  async actionaddCommentChild({commit},data){
      const response = await axios.post(`${Api.getLink()}/repcomment`,data,Api.getHeader());
      console.log(response.data);  
  },
  async actionSearchData({commit},data){
    const response = await axios.post(`${Api.getLink()}/articles/searchPost`,data)
    commit('MUTATIONS_SEARCHDATA',response.data);
    console.log(response.data);
  },
  async actionCountViewPost({commit},data){
    const response = await axios.post(`${Api.getLink()}/article/increaseViews`,data)
    console.log(response.data);
  },
  async actiongetfavoritePost({commit}){
    const response = await axios.get(`${Api.getLink()}/articles/favoritePost`);
    
    commit('MUTATIONS_GETFAVORITEPOST',response.data);
  },
  async actionGetFavoriteThemedArticles({commit},data){
    const response = await axios.get(`${Api.getLink()}/articles/GetFavoriteThemedArticles/${data}`)
    commit('MUTATIONS_GETFAVORITEPOST',response.data);
  },
  async actionGetTheLatestArticles({commit}){
    const response = await axios.get(`${Api.getLink()}/articles/GetTheLatestArticles`)
    console.log(response.data);
    commit('MUTATIONS_GETTHELATESTARTICLES',response.data)
  },
  async actionGetTheLatestThemedArticles({commit},data){
    const response = await axios.get(`${Api.getLink()}/articles/GetTheLatestThemedArticles/${data}`)
    commit('MUTATIONS_GETTHELATESTARTICLES',response.data)
  }
};

const mutations = {
    MUTATIONS_GETARTICLEBYID(state,data){
        state.ArticleById=data
    },
    MUTATIONS_GETRELATEDARTICLES(state,data){
      state.RelatedArticles=data;
    },
    MUTATIONS_SEARCHDATA(state,data){
        state.search=data
    },
    MUTATIONS_GETFAVORITEPOST(state,data){
        state.favoritepost=data;
        state.search=data;
    },
    MUTATIONS_GETTHELATESTARTICLES(state,data){
        state.latestarticles=data;
        state.search=data;
    },
    MUTATIONS_SHOWMESSAGE(state){
        state.ShowMessage=!state.ShowMessage;
    },
    MUTATIONS_CLOSEMESSAGE(state){
      state.ShowMessage=false;
    },
    MUTATIONS_PLAYAUDIO(state,data){
      console.log(data);
      state.Audio=data;
    }
  

    
    
};

export default {
  state,
  getters,
  actions,
  mutations,
};
