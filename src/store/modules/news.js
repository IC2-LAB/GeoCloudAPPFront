const state = {
  newsData: ''
}

const mutations = {
  SET_NEWS_DATA: (state, newsData) => {
    state.newsData = newsData
  }
}

const actions = {
  setNewsData ({
    commit,
    state
  }, newsData) {
    commit('SET_NEWS_DATA', newsData)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
