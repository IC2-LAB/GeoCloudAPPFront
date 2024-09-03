import http from '@/service/interface.js'
export default {
  // pv, uv
  // todo 现场打开 内网关闭
  postDataPVuVcommonMe (data) {
    http.postSaveUserBehavior(data).then(res => {
      // console.log(res, 'postSaveUserBehavior','22222222222222222222222222222222222222222222222222222222222222222221')
      if (res.data !== 'false') {
        // 注册
        if (data.fBehaviortype === 0) {
          //_caq.push(['_trackEvent', 'register', 'fCreatetime_register=' + res.data.fCreatetime + ',' +  'userId_register=' + this.registerForm.userId, 'Company_register=' + this.registerForm.Company])
        }
        // 登录
        if (data.fBehaviortype === 1) {
          //_caq.push(['_trackEvent', 'Company_logIn', 'tiem_logIn=' + res.data.fCreatetime + ',' + 'tiem_logIn=' + res.data.fUserid, 'Company_logIn=' + res.data.fUserdept])
        }
        // 查询
        if (data.fBehaviortype === 2) {
          //_caq.push(['_trackEvent', 'searchData', 'fOrdername_searchData=' + res.data.fOrdername + ',' +  'fCreatetime_searchData=' + res.data.fCreatetime + ',' +  'fDatanum_searchData=' + res.data.fDatanum + ',' + 'fDatasize_searchData=' + res.data.fDatasize, 'fUserid_searchData=' + res.data.fUserid])
        }
        // 数据订购-加入购物车
        if (data.fBehaviortype === 3) {
          //_caq.push(['_trackEvent', 'addShoppCart', 'fOrdername_addShoppCart=' + res.data.fOrdername + ',' +  'fCreatetime_orderCreate=' + res.data.fCreatetime + ',' + 'fDatanum_addShoppCart=' + res.data.fDatanum + ',' +  'fDatasize_addShoppCart=' + res.data.fDatasize, 'fUserid_addShoppCart=' + res.data.fUserid])
        }
        // 创建订单
        if (data.fBehaviortype === 4) {
          //_caq.push(['_trackEvent', 'orderCreate', 'fOrdername_orderCreate=' + res.data.fOrdername + ',' + 'fCreatetime_orderCreate=' + res.data.fCreatetime + ',' + 'fDatanum_orderCreate=' + res.data.fDatanum + ',' +  'fDatasize_orderCreate=' + res.data.fDatasize, 'fUserid_orderCreate=' + res.data.fUserid])
        }
        // 下载数据
        if (data.fBehaviortype === 5) {
          //_caq.push(['_trackEvent', 'datadDownLoad', 'fOrdername_datadDownLoad=' + res.data.fOrdername + ',' + 'fCreatetime_datadDownLoad=' + res.data.fCreatetime + ',' + 'fDatanum_datadDownLoad=' + res.data.fDatanum + ',' + 'fDatasize_datadDownLoad=' + res.data.fDatasize, 'fUserid_datadDownLoad=' + res.data.fUserid])
        }
        // 用户访问
        if (data.fBehaviortype === 6) {
          //_caq.push(['_trackEvent', 'Time', 'entryTime=' + sessionStorage.getItem('startTime_v'), 'lastTime=' + res.data.fCreatetime])
        }
      }
    })
  }
}
