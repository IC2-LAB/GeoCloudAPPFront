import axios from 'axios'
axios.defaults.timeout = 60000
export function exportFile (statName, statParam, outputName) {
  axios.post('/zzl/api/DataStat/GetExcel', { statName, statParam, outputName}, { responseType: 'blob' }).then(response => {
    // 下载的文件名
    let blob = new Blob([response.data], { type: response.data.type })
    uploadFile(blob, outputName)
  }).catch(error => {
    console.log(error + 'download error (batch)')
  })
}
function uploadFile (blob, zipName) {
  if ('download' in document.createElement('a')) {
    // 非IE下载
    let elink = document.createElement('a')
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    elink.download = zipName
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    // IE10+
    navigator.msSaveBlob(blob, zipName)
  }
}
