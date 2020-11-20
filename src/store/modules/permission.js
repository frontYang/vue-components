// import { asyncRoutes, constantRoutes } from '@/router'
import { routerAll as asyncRoutes } from '@/router'
const state = {
  routes: asyncRoutes,
  addRoutes: asyncRoutes
}

const mutations = {
  /* SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  } */
}

const actions = {
  /* generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = asyncRoutes || []
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  } */
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
