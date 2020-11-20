import Vue from 'vue'
import Vuex from 'vuex'
/* import login from './modules/login'
import h5 from './modules/h5'
import uploadGroup from './modules/upload_group'
 */
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  strict: debug
})
