import axios from 'axios'
import qs from 'qs'
import {
  SM4Util
} from './sm4encry'
import { getToken } from '@/utils/auth'
import {
  Notification
} from 'element-ui'
import searchStore from '@/store/modules/searchStore'
// 在config.js文件中统一存放一些公共常量，方便之后维护
// import { baseURL } from './config.js'
const baseURL = ''

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)
axios.interceptors.request.use(function (config) {
  // 显示loading
  // if (sessionStorage.getItem('token') !== 'undefined' && sessionStorage.getItem('token') !== '' && sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== null) {
  if (config.url.indexOf('/login/loginByToken') !== -1) {
    return config
  }
  if (getToken()) {
    // console.log(config.url,"config.urlconfig.urlconfig.urlconfig.urlconfig.urlconfig.url")
    if (config.url.indexOf('material') !== -1) {
      config.headers = {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW5neWFvIiwianRpIjoiNzM2Yzg0NzUtYjJkMC00Yzc0LTg5YzktNWM2MmM0ZDk4MGY4IiwibmJmIjoxNTkyMTUxMDIwLCJleHAiOjE2Nzg1NTEwMjAsImlzcyI6IllEVFIiLCJhdWQiOiJoYW5neWFvIn0.W917fEu8xnL6fZPo-g6kjIRW-aeHa_0qOEVSRw7Ru0g'
      }
    } else if (config.url.indexOf('mhd') !== -1 || config.url.indexOf('logoutNew') !== -1 || config.url.indexOf('deleteTokenByUserID') !== -1 || config.url.indexOf('getAgrsCatalogTree') !== -1) {
      config.headers = {
        Authorization: ''
      }
    } else {
      // if (window.systemName === 'FW') {
      //   config.headers = {
      //     Authorization: 'Bearer ' + getToken()
      //   }
      // } else {
      //   config.headers = {}
      config.headers = {
        Authorization: 'Bearer ' + getToken()
      }
      // }
    }
  }
  return config
}, function (error) {
  // 请求错误时弹框提示，或做些其他事
  // Notification.error({
  //   message: error || '数据获取失败！',
  //   position: 'bottom-right',
  //   duration: 1500
  // })
  // return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)
axios.interceptors.response.use(function (response) {
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response
}, function (error) {
  // 对响应错误做点什么
  // Notification.error({
  //   message: error || '数据获取失败！',
  //   position: 'bottom-right',
  //   duration: 1500
  // })
  // return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (response) {
  // if (response.request.status === 401) {
  //   console.log('后台错误')
  // } else if (response.request.status === 403) {
  //   // Notification.error({
  //   //   message: '您的权限不足，请联系管理员！',
  //   //   position: 'bottom-right',
  //   //   duration: 1500
  //   // })
  // } else {
  //   console.log(response)
  // }
}

// 封装数据返回成功提示函数
function successState (res) {
  if (res.config.url === '/system/login/loginForm' || res.config.url === '/mj/ssoLogin/getAppTokenData') {
    searchStore.state.disShow = true
  }
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (!res.data.hasOwnProperty('status') || ('status' in res.data && res.data.status === 200)) {
    res.data = res.data.data || res.data
    return res.data
  } else {
    if (res.config.url === '/system/login/loginForm' || res.config.url === '/system/user/updatePassword' || res.config.url === '/mj/ssoLogin/getAppTokenData') {
      if (typeof (res.data.data) === 'string') {
        Notification.error({
          message: res.data.data,
          position: 'bottom-right',
          duration: 1500
        })
      }
    }
    //   // Message.error(res.data.data || res.data)
    // } else if (res.data.message) {
    //   Notification.error({
    //     message: res.data.message || res.message,
    //     position: 'bottom-right',
    //     duration: 1500
    //   })
    //   // Message.error(res.data.message || res.message)
    // } else if (res.data) {
    //   Notification.error({
    //     message: res.data.data || res.data,
    //     position: 'bottom-right',
    //     duration: 1500
    //   })
    //   // Message.error(res.data.data || res.data)
    // } else if (!res.data.message && !res.data.data) {
    //   Notification.error({
    //     message: '后台未返回数据',
    //     position: 'bottom-right',
    //     duration: 1500
    //   })
    //   // Message.error('后台未返回数据')
    // }
    // return res.data
  }
}

// 封装axios
function apiAxios (method = 'GET', url, params) {
  let httpDefault = {
    method: method,
    baseURL: baseURL,
    url: url,
    params: method === 'GET' ? params : {},
    data: method === 'POST' ? params : {},
    // data: method === 'POST' ? {
    //       obj: params === undefined ? '' : SM4Util.encryptData_ECB(JSON.stringify(params)),
    //       encryptFlag: true
    //     } : {},
    timeout: 6000000,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }
  }
  if (/exportShpWidthAttributes/.test(url)) {
    httpDefault.responseType = 'blob'
  }
  // 处理请求返回体
  return new Promise((resolve, reject) => {
    axios(httpDefault).then((res) => {
      // if (httpDefault.url === '/mj/agrsSpatial/getByProvinceList' && window.errorHtml && res === undefined) {
      //   window.location.href = '/static/error.html'
      // }
      if (/exportShpWidthAttributes/.test(res.config.url)) {
        resolve(res.data)
      }
      if (/testConn/.test(res.config.url)) {
        // res.data.data = SM4Util.decryptData_ECB(res.data.data)
        resolve(res.data)
      }
      if (res.status === 200) {
        if (res.data.decryptFlag && res.data.decryptFlag === true) {
          res.data.data = JSON.parse(SM4Util.decryptData_ECB(res.data.data))
        } else if (!res.data.decryptFlag && res.data.decryptFlag === false) {
          res.data = res.data
        }
        let suc = successState(res)
        suc ? resolve(res) : null
      }
    }).catch((response) => {
      errorState(response)
      reject(response)
    })
  })
}

export const http = {
  getAxios: function (url, params) {
    return apiAxios('GET', url, params)
  },
  postAxios: function (url, params) {
    return apiAxios('POST', url, params)
  },
  deleteAxios: function (url, params) {
    return apiAxios('POST', url, params)
  }
}
