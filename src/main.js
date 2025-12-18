// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/flexible.js'
import Vant, { Loading, Notify } from 'vant'
import 'vant/lib/index.css'
import less from 'less'
import router from './router'
import Element from 'element-ui'
import { hasPermission } from '@/utils/hasPermission'
import commonPvzh from '@/static/commonPvzh'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

import commonMethod from '@/static/commonMethod'
import VueCompositionAPI from '@vue/composition-api'
import Mui from 'vue-awesome-mui'

Vue.config.productionTip = false
Vue.use(Mui)
Vue.use(VueCompositionAPI)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(less)
Vue.use(Vant)
Vue.use(Element)
Vue.prototype.commonMethod = commonMethod
Vue.prototype.$notify = Notify
Vue.config.productionTip = false
Vue.prototype.hasPerm = hasPermission
Vue.prototype.commonPvzh = commonPvzh

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
