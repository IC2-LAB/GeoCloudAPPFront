export default {
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp)
    // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + ' ' + h + m + s
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
  getDateTyPE (string) {
    // var date = new Date(string.replace(/-/g, '/'))
    var date = new Date(string)
    return date
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
  getTimeDataG: function (temper) {
    var dt = new Date(Date.parse(temper.replace(/-/g, '/')))
    return dt
  },
  setDateTime (fnTime) {
    var x = fnTime // 取得时间"2017-07-08 13:00:00"
    var time = new Date(x)
    var timeNum = 8// 小时数
    time.setHours(time.getHours() + timeNum)
    return time
  }
}
