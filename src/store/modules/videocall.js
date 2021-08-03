const state = {
  ShowOutGoingVideoCall:false,
  
  ModalOnVideoCall:false,
  ModalOnVideoCall1:false,
  
};

const getters = {
    ShowOutGoingVideoCall:(state)=> state.ShowOutGoingVideoCall,

    // NameCall:(state)=> state.NameCall,
    ModalOnVideoCall:(state)=> state.ModalOnVideoCall,
    ModalOnVideoCall1:(state)=> state.ModalOnVideoCall1
};

const actions = {
  
};

const mutations = {
    MUTATIONS_SHOWOUTGOINGVIDEOCALL(state){
      state.ShowOutGoingVideoCall=!state.ShowOutGoingVideoCall;
  },
  MUTATIONS_BUSYFROMCALLER(state){
    state.ShowOutGoingVideoCall=false;
  },
  MUTATIONS_ACCEPTCALL(state){
    state.ModalOnVideoCall=true;

   
  },
  MUTATIONS_ACCEPTCALL1(state){
    state.ModalOnVideoCall1=true;
  },
  CloseModalOnVideoCall(state){
    state.ModalOnVideoCall=false;
  },
  CloseModalOnVideoCall1(state){
    state.ModalOnVideoCall1=false;
    
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
