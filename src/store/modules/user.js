import http from '@/service/interface'
import {
  getToken,
  setToken
} from '@/utils/auth'

const state = {
  token: sessionStorage.getItem('token'),
  picId: '',
  flag: '',
  fromId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PIC_ID: (state, picId) => {
    state.picId = picId
  },
  SET_FROMID: (state, fromId) => {
    state.fromId = fromId
  }
}

const actions = {
  // 用户名登录
  LoginByUsername ({
    commit
  }, userInfo) {
    const username = userInfo.account.trim()
    return new Promise((resolve, reject) => {
      http.loginByUsername({
        loginName: username,
        password: userInfo.pass,
        sysName: window.systemName
      }).then(response => {
        const data = response.data || response.data.data
        const status = response.data.status || response.status
        if (status === 200) {
          // console.log('token', data)
          sessionStorage.setItem('token', data)
          localStorage.setItem('token', data)
          setToken(data)
          commit('SET_TOKEN', data)
        } else {
          return false
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  GetUserInfo ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      http.getUserInfo().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setToken ({
    commit,
    state
  }, token) {
    commit('SET_TOKEN', token)
  },
  setPicId ({
    commit,
    state
  }, picId) {
    commit('SET_PIC_ID', picId)
  },
  setFromid ({
    commit,
    state
  }, picId) {
    commit('fromId', picId)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
