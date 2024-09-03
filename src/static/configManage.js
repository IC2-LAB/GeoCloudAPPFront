import http from '@/service/interface'
import store from '@/store/index.js'
export const configManage = {
  formInline: {
    sysName: '',
    sysLog: '',
    copyrightInfor: '',
    recordInfor: '',
    contactAddress: '',
    contactTele: '',
    contactPost: '',
    accountValPer: '',
    onlineUsersNub: '',
    frequency: '',
    vectorMap: '',
    imageMap: '',
    threeMap: '',
    serviceToken: '',
    maskURL: '',
    longTopLeft: '',
    latTopLeft: '',
    longTopRight: '',
    latTopRight: ''
  },
  arr: [],
  getConfigSation: function () {
    http.sysInfolist().then(res => {
      let data = res.data
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].sysKey === 'sysName') {
          configManage.formInline.sysName = data[i].sysValue
          store.state.configManage.systemName = data[i].sysValue
        }
        if (data[i].sysKey === 'sysLog') {
          configManage.formInline.sysLog = data[i].sysValue
          store.state.configManage.titleImgSrc = data[i].sysValue
        }
        if (data[i].sysKey === 'copyrightInfor') {
          configManage.formInline.copyrightInfor = data[i].sysValue
          store.state.configManage.copyrightInfor = data[i].sysValue
        }
        if (data[i].sysKey === 'recordInfor') {
          configManage.formInline.recordInfor = data[i].sysValue
          store.state.configManage.recordInfor = data[i].sysValue
        }
        if (data[i].sysKey === 'contactAddress') {
          configManage.formInline.contactAddress = data[i].sysValue
          store.state.configManage.contactAddress = data[i].sysValue
        }
        if (data[i].sysKey === 'contactTele') {
          configManage.formInline.contactTele = data[i].sysValue
          store.state.configManage.contactTele = data[i].sysValue
        }
        if (data[i].sysKey === 'contactPost') {
          configManage.formInline.contactPost = data[i].sysValue
          store.state.configManage.contactPost = data[i].sysValue
        }
        if (data[i].sysKey === 'accountValPer') {
          configManage.formInline.accountValPer = data[i].sysValue
        }
        if (data[i].sysKey === 'onlineUsersNub') {
          configManage.formInline.onlineUsersNub = data[i].sysValue
        }
        if (data[i].sysKey === 'frequency') {
          configManage.formInline.frequency = data[i].sysValue
        }
        if (data[i].sysKey === 'vectorMap') {
          configManage.formInline.vectorMap = data[i].sysValue
          store.state.configManage.vectorMap = data[i].sysValue
        }
        if (data[i].sysKey === 'imageMap') {
          configManage.formInline.imageMap = data[i].sysValue
        }
        if (data[i].sysKey === 'threeMap') {
          configManage.formInline.threeMap = data[i].sysValue
        }
        if (data[i].sysKey === 'serviceToken') {
          configManage.formInline.serviceToken = data[i].sysValue
        }
        if (data[i].sysKey === 'maskURL') {
          configManage.formInline.maskURL = data[i].sysValue
        }
        if (data[i].sysKey === 'longTopLeft') {
          configManage.formInline.longTopLeft = data[i].sysValue
          store.state.configManage.leftTopLong = data[i].sysValue
        }
        if (data[i].sysKey === 'latTopLeft') {
          configManage.formInline.latTopLeft = data[i].sysValue
          store.state.configManage.leftTopLat = data[i].sysValue
        }
        if (data[i].sysKey === 'longTopRight') {
          configManage.formInline.longTopRight = data[i].sysValue
          store.state.configManage.rightBottomLong = data[i].sysValue
        }
        if (data[i].sysKey === 'latTopRight') {
          configManage.formInline.latTopRight = data[i].sysValue
          store.state.configManage.rightBottomLat = data[i].sysValue
        }
      }
    })
    return configManage.formInline
  },
  saveUpdataConfig: function (params) {
    http.sysSaveSysInfo({
      params
    }).then(res => {
      if (res.data === 'true') {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        // this.initTableSysConfig()
      } else {
        this.$message({
          type: 'info',
          message: '保存失败!'
        })
      }
    })
  }
}
