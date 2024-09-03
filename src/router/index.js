import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Search from '@/view/Search'
import SearchLogin from '@/view/Search/components/SearchLogin.vue'
import Map from '@/view/Map/AMap'
import Profession from '@/view/Profession/index'
import Insurance from '@/view/Insurance/index'
import NewForm from '@/view/Insurance/components/new.vue'
import Audit from '@/view/Insurance/components/audit.vue'
import Tool from '@/view/Tool/index'
import Draw from '@/view/Tool/components/Draw/index'
import More from '@/view/More'
import Message from '@/view/More/components/Message'
import Local from '@/view/More/components/Local'
import MyImage from '@/view/More/components/MyImage'
import Vedio from '@/view/More/components/Vedio'
import Shop from '@/view/Shop/car/index.vue'
import ShopSubmit from '@/view/Shop/submit/index.vue'
import upload from '@/view/Shop/submit/components/upload.vue'
import Order from '@/view/Examine/Vcontroller.vue'
import dataQuert from '@/view/Examine/dataQuert.vue'
import seeUl from '@/view/Examine/seeUl.vue'
import photo from '@/view/Shop/submit/components/photo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchLogin',
      component: SearchLogin
    },
    {
      path: '/dataQuert',
      name: 'dataQuert',
      component: dataQuert
    },
    {
      path: '/photo',
      name: 'photo',
      component: photo
    },
    {
      path: '/seeUl',
      name: 'seeUl',
      component: seeUl
    },

    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/shopSubmit',
      name: 'shopsubmit',
      component: ShopSubmit
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/Profession',
      name: 'Profession',
      component: Profession
    },
    {
      path: '/Insurance',
      name: 'Insurance',
      component: Insurance
    },
    {
      path: '/NewForm',
      name: 'NewForm',
      component: NewForm
    },
    {
      path: '/Audit',
      name: 'Audit',
      component: Audit
    },
    {
      path: '/Tool',
      name: 'Tool',
      component: Tool
    },
    {
      path: '/Draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/more',
      name: 'more',
      component: More,
      redirect: '/more/message',
      children: [
        {
          path: '/more/message',
          name: 'message',
          component: Message
        },
        {
          path: '/more/local',
          name: 'local',
          component: Local
        },
        {
          path: '/more/myImage',
          name: 'myImage',
          component: MyImage
        },
        {
          path: '/more/vedio',
          name: 'vedio',
          component: Vedio
        }
      ]
    }
  ]
})
