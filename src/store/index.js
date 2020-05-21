import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import h5 from './modules/h5'
import uploadGroup from './modules/upload_group'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    h5,
    uploadGroup
  },
  strict: debug
})
