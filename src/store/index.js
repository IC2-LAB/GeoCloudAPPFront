import Vue from 'vue'
import Vuex from 'vuex'
import searchStore from './modules/searchStore'
import manage from './modules/manage'
import user from './modules/user'
import news from './modules/news'
import {configManage} from '@/static/configManage'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    searchStore,
    user,
    manage,
    configManage,
    news
  }
})
