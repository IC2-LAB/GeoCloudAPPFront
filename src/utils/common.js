/* eslint-disable */
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function getGuid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
export function initguid () {
  return getGuid()
}

export function isValidIP (ip) {
  var reg = /^http:\/\/.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]).+.$/
  return reg.test(ip)
}

// 格式化日期，如月、日、时、分、秒保证为2位数
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 参数number为毫秒时间戳，format为需要转换成的日期格式
export function formatTime (number, format) {
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  if (number === undefined || number === 'undefined') format = '-'
  return format
}

export function dataSizeFun (limit) {
  var size = ''
  if (limit < 0.1 * 1024) {
    size = limit.toFixed(2) + 'KB'
  } else if (limit < 0.1 * 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + 'MB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = (limit / (1024 * 1024)).toFixed(2) + 'GB'
  } else {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'TB'
  }
  var sizestr = size + ''
  var len = sizestr.indexOf('\.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') {
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

export function defaultDate (flag, beginEndTime, date) {
  let orderDate = null
  if (flag === 'default' && beginEndTime === 'start' && date === '') {
    orderDate = new Date(new Date(new Date().setTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime() - 3600 * 1000 * 24 * 30)).setHours(0, 0, 0, 0))
  } else if (flag === 'default' && beginEndTime === 'end' && date === '') {
    orderDate = new Date(new Date(new Date().setTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 60000)).setHours(23, 59, 59, 59))
  } else if (flag === 'notDefault' && beginEndTime === 'start' && date !== '') {
    orderDate = new Date(new Date(new Date().setTime(new Date(new Date(date).setHours(0, 0, 0, 0)).getTime())).setHours(0, 0, 0, 0))
  } else if (flag === 'notDefault' && beginEndTime === 'end' && date !== '') {
    orderDate = new Date(new Date(new Date().setTime(new Date(new Date(date).setHours(0, 0, 0, 0)).getTime())).setHours(23, 59, 59, 59))
  }
  return orderDate
}
// 验证身份证号码
function checkIdNum (rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

export function getRules () {
  let rulesData = {
    bdid: [
      {required: true, message: '请输入保单号', trigger: 'onBlur'},
      { pattern: /^[0-9a-zA-Z_]*$/, message: '保单号格式不正确', trigger: 'onBlur'}
    ],
    tbr: [
      {required: true, message: '请输入投保人', trigger: 'onBlur'},
      { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的姓名' }
    ],
    lxdh: [
      { required: true, message: '请输入联系电话', trigger: 'onBlur' },
      { pattern: /^[0-9]*$/, message: '电话号码不正确' }
    ],
    tbzw: [
      {required: true, message: '请输入投保作物名称', trigger: 'onBlur'}
    ],
    tbmj: [
      {required: true, message: '请输入投保作物面积', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    tbfy: [
      {required: true, message: '请输入投保费用', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    tbje: [
      {required: true, message: '请输入投保金额', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    sfz: [
      {required: true, message: '请输入', trigger: 'onBlur'},
      { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '证件号码不正确' }
    ],
    yhkkh: [
      { required: true, message: '请输入银行卡卡号', trigger: 'onBlur' },
      { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请输入正确的银行卡卡号' }
    ],
    dz: [
      { required: true, message: '请输入地址', trigger: 'onBlur' }
    ],
    tbsj: [
      { required: true, message: '请选择投保时间', trigger: 'change' }
    ],
    sxsj: [
      { required: true, message: '请选择生效时间', trigger: 'onchange' }
    ],
    dqsj: [
      { required: true, message: '请选择到期时间', trigger: 'onBlur' }
    ],
    longitude: [
      { required: true, message: '请输入经度', trigger: 'onBlur' },
      { pattern: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/, message: '请输入正确的经度' }

    ],
    latitude: [
      { required: true, message: '请输入纬度', trigger: 'onBlur' },
      { pattern: /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/, message: '请输入正确的纬度' }
    ],
    kzwyssmj: [
      {required: true, message: '请输入损失面积', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    kzwysscd: [
      {required: true, message: '请输入损失程度', trigger: 'onBlur'}
    ],
    kzygsscd: [
      {required: true, message: '请输入损失程度', trigger: 'onBlur'}
    ],
    kzygssmj: [
      {required: true, message: '请输入损失面积', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    dsqrssmj: [
      {required: true, message: '请输入损失面积', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    dsqrsscd: [
      {required: true, message: '请输入损失程度', trigger: 'onBlur'}
    ],
    dsqrssje: [
      {required: true, message: '请输入损失金额', trigger: 'onBlur'},
      { pattern: /^([0-9]\d*(\.\d+)?|0)$/, message: '请输入数值' }
    ],
    ypIp: [
      {required: true, message: '请输入ip地址', trigger: 'onBlur'}
    ],
    systemIp: [
      {required: true, message: '请输入ip地址', trigger: 'onBlur'}
    ]
  }
  return rulesData
}

export function getIp (obj, type) {
  if (type === 'system') {
    if (obj.ip1) {
      localStorage.setItem('system', obj.ip1)
    } else {
      localStorage.setItem('system', '')
    }
  } else if (type === 'yp') {
    if (obj.ip2) {
      localStorage.setItem('yp', obj.ip2)
    } else {
      localStorage.setItem('yp', '')
    }
  } else if (type === 'all') {
    localStorage.setItem('system', obj.ip1)
    localStorage.setItem('yp', obj.ip2)
  } else if (type === 'projectmanage') {
    if (obj.projectmanage) {
      localStorage.setItem('projectmanage', obj.projectmanage)
    } else {
      localStorage.setItem('projectmanage', '')
    }
  } else if (type === 'csgc') {
    if (obj.csgc) {
      localStorage.setItem('csgc', obj.csgc)
    } else {
      localStorage.setItem('csgc', '')
    }
  } else if (type === 'api') {
    if (obj.api) {
      localStorage.setItem('api', obj.api)
    } else {
      localStorage.setItem('api', '')
    }
  } else if (type === 'bendi') {
    if (obj.bendi) {
      localStorage.setItem('bendi', obj.bendi)
    } else {
      localStorage.setItem('bendi', '')
    }
  } else if (type === 'map') {
    if (obj.map) {
      localStorage.setItem('map', obj.map)
    } else {
      localStorage.setItem('map', '')
    }
  } else if (type === 'acgisServer') {
    if (obj.acgisServer) {
      localStorage.setItem('acgisServer', obj.acgisServer)
    } else {
      localStorage.setItem('acgisServer', '')
    }
  } else if (type === 'geoserver') {
    if (obj.geoserver) {
      localStorage.setItem('geoserver', obj.geoserver)
    } else {
      localStorage.setItem('geoserver', '')
    }
  } else if (type === 'localImageserver') {
    if (obj.localImageserver) {
      localStorage.setItem('localImageserver', obj.localImageserver)
    } else {
      localStorage.setItem('localImageserver', '')
    }
  } else if (type === 'previewServer') {
    if (obj.previewServer) {
      localStorage.setItem('previewServer', obj.previewServer)
    } else {
      localStorage.setItem('previewServer', '')
    }
  }
}

export function ipUrlConfig() {
  const ip = {
    // 公司外网正式环境
    system: 'http://1.119.169.71:10003/qzszlh/system',
    yp: 'http://1.119.169.71:10003/qzszlh/appbusiness',
    projectmanage: 'http://1.119.169.71:10003/qzszlh/appbusiness',
    csgc: 'http://1.119.169.71:10003/qzszlh/appbusiness',
    api: 'http://1.119.169.71:10003/qzszlh/appbusiness',
    bendi: 'http://1.119.169.71:10003/qzszlh/bendi',
    map: 'http://1.119.169.71:10003/qzszlh/map',
    acgisServer: 'http://1.119.169.71:10003/qzszlh/acgisServer',
    geoserver: 'http://1.119.169.71:10003/qzszlh/geoserver',
    localImageserver: 'http://1.119.169.71:10003/qzszlh/localImageserver',
    previewServer: 'http://1.119.169.71:10003/qzszlh/previewServer',
    // downloadFileServer :'http://10.1.100.48:9988/qzszlh/downloadFileServer/',
    downloadFileServer :'http://1.119.169.71:10003/qzszlh/downloadFileServer',

    // 客户云服务器
    // system: 'http://220.191.237.241:9988/qzszlh/system',
    // yp: 'http://220.191.237.241:9988/qzszlh/appbusiness',
    // projectmanage: 'http://220.191.237.241:9988/qzszlh/appbusiness',
    // csgc: 'http://220.191.237.241:9988/qzszlh/appbusiness',
    // api: 'http://220.191.237.241:9988/qzszlh/appbusiness',
    // bendi: 'http://220.191.237.241:9988/qzszlh/bendi',
    // map: 'http://220.191.237.241:9988/qzszlh/map',
    // acgisServer: 'http://220.191.237.241:9988/qzszlh/acgisServer',
    // geoserver: 'http://220.191.237.241:9988/qzszlh/geoserver',
    // localImageserver: 'http://220.191.237.241:9988/qzszlh/localImageserver',
    // previewServer: 'http://220.191.237.241:9988/qzszlh/previewServer',
    // downloadFileServer :'http://220.191.237.241:9988/qzszlh/downloadFileServer',
  }
  return ip
}
