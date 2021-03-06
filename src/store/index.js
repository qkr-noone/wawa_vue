import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playerData: [],
    playState: false,
    playList: [],
    currentIndex: -1,
    routerUrl: '',
    fullScreen: false,
    navToggle: false,
    isTr: false,
    isDemaskNav: false
  },
  mutations,
  actions
})

export default store
