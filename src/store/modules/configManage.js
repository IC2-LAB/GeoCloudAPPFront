import { configManage } from '@/static/configManage'
import http from '@/service/interface'
const state = {
  systemName: '',
  titleImgSrc: '@/assets/img/logo.png',
  copyrightInfor: '北京市',
  recordInfor: '已备案',
  contactAddress: '北京市',
  contactTele: '(010) 813333333',
  contactPost: '110000',
  vectorMap: '',
  leftTopLong: '',
  leftTopLat: '',
  rightBottomLong: '',
  rightBottomLat: '',
  resultDataDetails: null,
  orderDataDetails: null,
  shopDataDetails: null,
  createShopDataDetails: null,
  commonHeight: '',
  shopCarNum: 0
}

// getters
const getters = {}

// actions
const actions = {
  getCommonHeight ({ commit, state }, h) {
    commit('SET_COMMONHEIGHT', h)
  },
  getConfigSation ({ commit, state }) {
    configManage.getConfigSation()
  },
  getShopCarNum ({ commit, state }) {
    http.getagrsListCount({
      data: {
        datatype: '0'
      }
    }).then(res => {
      if (typeof (res.data) === 'object') {
        commit('SET_SHOPCARNUM', res.data.data)
      } else {
        commit('SET_SHOPCARNUM', res.data)
      }
    })
  },
  getOrderDetails ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      http.getDetails({dataid: obj.id, nodeid: obj.nodeId, sq: false}).then(res => {
        if (res.data.list && res.data.list !== undefined) {
          res.data.list.forEach(item => {
            item.label = item.value
            if (item.value && item.value.length > 10) {
              item.value = item.value.substring(0, 9) + '...'
            }
          })
        }
        if (obj.type === 'result') {
          commit('SET_RESULTDATADETAILS', res)
        } else if (obj.type === 'order') {
          commit('SET_ORDERDATADETAILS', res)
        } else if (obj.type === 'shop') {
          commit('SET_SHOPDATADETAILS', res)
        } else if (obj.type === 'shopCreate') {
          commit('SET_CREATESHOPDATADETAILS', res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// mutations
const mutations = {
  SET_SYSTEMNAME (state, name) {
    state.systemName = name
  },
  SET_COPYRIGHTINFOR (state, name) {
    state.copyrightInfor = name
  },
  SET_RECORDS (state, name) {
    state.recordInfor = name
  },
  SET_ADDRESS (state, name) {
    state.contactAddress = name
  },
  SET_TELE (state, name) {
    state.contactTele = name
  },
  SET_CONTACTPOST (state, name) {
    state.contactPost = name
  },
  SET_VECTORMAP (state, name) {
    state.vectorMap = name
  },
  SET_TITLEIMGSRC (state, src) {
    state.titleImgSrc = src
  },
  SET_RESULTDATADETAILS (state, data) {
    state.resultDataDetails = data
  },
  SET_ORDERDATADETAILS (state, data) {
    state.orderDataDetails = data
  },
  SET_SHOPDATADETAILS (state, data) {
    state.shopDataDetails = data
  },
  SET_CREATESHOPDATADETAILS (state, data) {
    state.createShopDataDetails = data
  },
  SET_COMMONHEIGHT (state, data) {
    state.commonHeight = data
  },
  SET_SHOPCARNUM (state, num) {
    state.shopCarNum = num
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
