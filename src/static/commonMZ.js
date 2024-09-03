// import http from '@/service/interface'
export default {
  getTimepvuvD: function (timestamp) {
    // http.getTimepvuv({}).then(res => {
    console.log(timestamp, 'reas+')
    // })
  },
  dataSizeFormatterZ (dataSize, str) {
    if (dataSize) {
      var datasize = parseFloat(dataSize)
      // var str = ['KB', 'M', 'G', 'T', 'P']
      for (var i = 0; i < str.length; i++) {
        if (datasize <= 1024) {
          return datasize.toFixed(2) + str[i]
        } else {
          datasize = datasize / 1024.0
        }
      }
      return 1
    } else if (dataSize === 0) {
      return 0
    } else {
      return '-'
    }
  },
  dataSizeFormatter (dataSize) {
    if (dataSize) {
      var datasize = parseFloat(dataSize)
      var str = ['KB', 'M', 'G', 'T', 'P']
      for (var i = 0; i < str.length; i++) {
        if (datasize <= 1024) {
          return datasize.toFixed(2) + str[i]
        } else {
          datasize = datasize / 1024.0
        }
      }
      return 1
    } else if (dataSize === 0) {
      return 0
    } else {
      return '-'
    }
  },
  timeStamp (val) {
    var time = parseInt(val) + '秒'
    if (parseInt(val) > 60) {
      // var second = parseInt(val) % 60
      var min = parseInt(val / 60)
      time = min + '分'
      // time = min + '分' + second + '秒'

      if (min > 60) {
        min = parseInt(val / 60) % 60
        var hour = parseInt(parseInt(val / 60) / 60)
        time = hour + '小时'
        // time = hour + '小时' + min + '分' + second + '秒'

        if (hour > 24) {
          hour = parseInt(parseInt(val / 60) / 60) % 24
          var day = parseInt(parseInt(parseInt(val / 60) / 60) / 24)
          time = day + '天'
          // time = day + '天' + hour + '小时' + min + '分' + second + '秒'

          if (day > 365) {
            hour = parseInt(parseInt(val / 60) / 60) % 24
            var year = parseInt(parseInt(parseInt(val / 60) / 60) / 24 / 365)
            time = year + '年'
            // time = day + '天' + hour + '小时' + min + '分' + second + '秒'
          }
        }
      }
    }
    return time
  },
  timestampToTimeD: function (timestamp) {
    if (typeof (timestamp) === 'string' || timestamp === null) {
      return timestamp
    } else {
      var date = timestamp
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + ' ' + h + m + s
    }
  },
  timestampToTimeT: function (timestamp) {
    if (typeof (timestamp) === 'string' || timestamp === null) {
      return timestamp
    } else {
      var date = timestamp
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + 'T' + h + m + s
    }
  }
}
