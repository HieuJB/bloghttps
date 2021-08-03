import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import post from './modules/post'
import videocall from './modules/videocall'

import createPersistedState from "vuex-persistedstate";



Vue.use(Vuex)

const storeData = {
	modules: {
		auth,
		profile,
		post,
		videocall
	},
	plugins: [createPersistedState({
		paths: ['auth'],
	})],
}

const store = new Vuex.Store(storeData)

export default store