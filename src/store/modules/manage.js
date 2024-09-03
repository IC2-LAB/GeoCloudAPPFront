import http from '@/service/interface'
const state = {
  nodeTreeID: [],
  clientHeight: '',
  perm: null,
  dataPermissionCode: '',
  dataPermissionWkt: '',
  wktAndCode: false,
  menuData: []
}
const actions = {
  setNodeId ({ commit, state }, id) {
    localStorage.setItem('treeIds', id)
    commit('SET_NODE_ID', id)
  },
  getRegularRules ({ commit, state }, obj) {
    http.getRegularRules({}).then(res => {
      localStorage.setItem('regularRules', JSON.stringify(res.data))
    })
  },
  setDataPermissionCode ({ commit, state }, code) {
    commit('SET_DATA_PERMISSION_CODE', code)
  },
  setClientHeight ({ commit, state }, h) {
    commit('SET_CLIENT_HEIGHT', h)
  },
  handlePerm ({ commit, state }, perm) {
    commit('SET_Perm', perm)
  },
  setMenuData ({ commit, state }, perm) {
    commit('SET_MENU_DATA', perm)
  },
  setDataPermissionWkt ({ commit, state }, wkt) {
    commit('SET_DATA_PERMISSION_WKT', wkt)
  },
  setDataPermissionWktAndCode ({ commit, state }, val) {
    commit('SET_DATA_PERMISSION_WKT_AND_CODE', val)
  }
}

const mutations = {
  SET_NODE_ID (state, data) {
    state.nodeTreeID = data
  },
  SET_CLIENT_HEIGHT (state, data) {
    state.clientHeight = data
  },
  SET_Perm (state, data) {
    state.perm = data
  },
  SET_DATA_PERMISSION_CODE (state, data) {
    state.dataPermissionCode = data
  },
  SET_DATA_PERMISSION_WKT (state, data) {
    state.dataPermissionWkt = data
  },
  SET_MENU_DATA (state, data) {
    state.menuData = data
  },
  SET_DATA_PERMISSION_WKT_AND_CODE (state, data) {
    state.wktAndCode = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
