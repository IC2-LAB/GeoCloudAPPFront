export var isDown = function (that, url, name) {
  var a = document.createElement('a')
  var flag = 'download' in a
  // console.log(url)
  if (flag) {
    a.href = url
    a.download = name
    a.click()
  } else {
    that.$message.error('当前浏览器不支持该下载方式，请切换浏览器重试！')
  }
}
/**
 * dataurl: base64
 * filename: 设置文件名称
*/
export const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}
/**
 * 说明
 *  1、正式版220，最新一版：1.8.3 11
 *  2、测试版10003，最新一版：1.30.0 30
 *  3、注意后续升级时，先从第二个小数点后的数字开始递增
 */
export const apkversion = {
  "fVersion": "1.30.0",
  // "fVersion": "1.8.15",
  "fName":"apk",
  "fSrc":"",
  "fUpdateContent":""
}
