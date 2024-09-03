import axios from 'axios'
import { SM4Util } from './sm4encry'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
// 在config.js文件中统一存放一些公共常量，方便之后维护
// import { baseURL } from './config.js'
const baseURL = ''

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)
axios.interceptors.request.use(function (config) {
  // 显示loading
  if (getToken() !== 'undefined' && getToken() !== 'null' && getToken() !== undefined && getToken() !== null) {
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      authorization: 'Bearer ' + getToken()
    }
  }
  return config
}, function (error) {
  // 请求错误时弹框提示，或做些其他事
  Message.error(error || '数据获取失败！')
  return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response
}, function (error) {
  // 对响应错误做点什么
  Message.error(error || '数据获取失败！')
  return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else if (response && response.status === 401) {
    Message.error('权限不足，请联系管理员！')
  } else {
    // Message.error('数据获取失败！')
  }
}

// 封装数据返回成功提示函数
function successState (res) {
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.data.status === 200) {
    res.data = res.data.data
    return res.data
  } else if (res.data.status === 4011 || res.data.status === 4012 || res.data.status === 4013 || res.data.status === 4014 || res.data.status === 5001 || res.data.status === 5002 || res.data.status === 5003 || res.data.status === 5004) {
    Message.error(res.data.data)
  }
}

// 封装axios
function apiAxios (method, url, params) {
  let httpDefault = {
    method: method,
    baseURL: baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' ? params : null,
    data: method === 'POST' ? { obj: SM4Util.encryptData_ECB(JSON.stringify(params)), encryptFlag: true } : null,
    timeout: 500000
  }

  // 注意Promise使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then((res) => {
        if (res.status === 200) {
          if (res.data.decryptFlag && res.data.decryptFlag === true) {
            // // console.log(JSON.parse(SM4Util.decryptData_ECB(res.data.data)))
            // res.data = JSON.parse(JSON.parse(SM4Util.decryptData_ECB(res.data.data)))
            res.data = JSON.parse(SM4Util.decryptData_ECB(res.data.data))
          }
          successState(res)
          resolve(res)
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
  }
}
