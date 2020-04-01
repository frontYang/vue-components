const state = {
  // 组件索引
  current: '',

  // 组件列表
  elements: []
}

const getters = {}

const mutations = {
  setElement(state, data) {
    switch (data.status) {
      case 'init':
        // 初始化
        state.elements.push([...data.element])
        state.current = state.elements.length - 1
        break

      case 'modify':
        // 修改

        break

      case 'delete':
        // 删除

        break

      default:
        break
    }
  }
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
