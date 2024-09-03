<!--eslint-disable-->
<template>
  <div class="contain">
    <div class="headnav">
      <img src="../../../assets/images/shop/back.png" @click="back" alt="返回上一级" />
      <p class="title">订购信息填写</p>
      <p class="empty">&nbsp;</p>
    </div>
    <div class="board" ref="ruleForm1">
      <van-cell-group>
        <van-field v-model="formLabelAlign.user" :disabled="userDisabled" label="申请人" placeholder="请输入"  />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formLabelAlign.phone" :disabled="phoneDisabled" label="联系方式" placeholder="请输入" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formLabelAlign.company" :disabled="companyDisabled" label="申请单位" placeholder="请输入" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="formLabelAlign.proName" label="项目名称" placeholder="请输入" />
      </van-cell-group>
      <!--<van-cell-group>
              <van-field
      v-model="formLabelAlign.company"
      is-link
      :disabled="companyDisabled"
      label="申请单位"
      placeholder="请选择"
      @click="companyShow = true"
      />
          <van-popup v-model="companyShow" round position="bottom">
            <van-cascader
              v-model="selectValue"
              title="申请单位"
              :options="options"
              @close="companyShow = false"
              @finish="onCompanyFinish"
              active-color="#4675F1"
          />
          </van-popup>
      </van-cell-group>-->
      <van-cell-group>
        <van-field
          v-model="formLabelAlign.employ"
          is-link
          readonly
          label="数据用途"
          placeholder="请选择"
          @click="employShow = true"
        />

        <van-popup v-model="employShow" round position="bottom">
          <van-cascader
            v-model="selectValue"
            title="数据用途"
            :options="usageOptions"
            @close="employShow = false"
            @finish="onEmployFinish"
            active-color="#4675F1"
          />
        </van-popup>

      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="formLabelAlign.getMethod"
          is-link
          readonly
          label="获取方式"
          placeholder="请选择"
          @click="methodShow = true"
        />
        <van-popup v-model="methodShow" round position="bottom">
          <van-cascader
            v-model="selectValue"
            title="获取方式"
            :options="getMethodOptions"
            @close="methodShow = false"
            @finish="onMethodsFinish"
            active-color="#4675F1"
            :transition-appear="true"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="textarea" label="备注" placeholder="请输入" />
      </van-cell-group>
    </div>
    <div class="FTool">
      <div class="Tbox">
        <img src="../../../assets/images/shop/back.png" alt="返回" />
        <p @click="back">返回</p>
      </div>

      <van-button v-if="isAudited===1 || isAudited==='1' " type="info" @click="next">下一步</van-button>
      <van-button v-if="isAudited===0 || isAudited==='0' " type="info" @click="submitOrder">提交订单</van-button>

    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<!--eslint-disable-->
<script>
  import FootNav from '@/view/Shop/car/components/foot/footNav.vue'
  import http from '@/service/interface'
  export default {
    components:{
      FootNav
    },
    data(){
      var validateUserCardId = (rule, value, callback) => {
        // let regPass = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
        // if (regPass.test(value) === '') {
        if (value === '') {
          callback(new Error('请输入项目名称！'))
        } else {
          callback()
          // if (value) {
          //   callback()
          // } else {
          //   // callback(new Error('请输入正确的身份证信息'))
          // }
        }
      }
      var companyD = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写完整的单位名称，与介绍信保持一致!'))
        } else {
          callback()
        }
      }
      var numberL = (rule, value, callback) => {
        var regPass = new RegExp('^[0-9]{11}$')
        if (value === '') {
          callback(new Error('电话号码不能为空！'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的电话号码！'))
          }
        }
      }
      return {
        methodShow: false,
        employShow: false,
        companyShow: false,
        selectValue: '',
        value: '',
        show: false,
        options: [],
        orderZY: false,
        orderDataSize : window.orderDataSize,
        dialogShowData: {},
        titleDialog: '订购数据详情',
        showDiv: false,
        isAudited: 1,
        textarea: '',
        lengthAll: '',
        tableDataAll: [],
        rules: {
          proName: [
            { validator: validateUserCardId, trigger: 'blur' }
            // { min: 15, message: '请输入正确的证件信息', trigger: ['blur', 'change'] }
          ]
        },
        rulesL: {
          phone: [
            { validator: numberL, trigger: 'blur' }
          ],
          company: [
            { validator: companyD, trigger: 'blur' }
          ]
        },
        dataSizeAll: 0,
        filesForm: {},
        dialogFormDataClear: false,
        dialogFormDataClearSub: false,
        approvalDocData: '',
        uploadFileList: {
          taskDataCard: [],
          identityCard: [],
          introductionLetter: [],
          otherDoc: [],
          regisForm: []
        },
        formLabelWidth: '80px',
        dialogFormVisible: false,
        getMethodOptions: [],
        usageOptions: [
          {
            label: '地质矿产资源调查与评价',
            text: '地质矿产资源调查与评价',
            value: '地质矿产资源调查与评价'},
          {
            label: '矿产资源开发现状调查与监管',
            text: '矿产资源开发现状调查与监管',
            value: '矿产资源开发现状调查与监管'},
          {
            label: '地质灾害调查与监测',
            text: '地质灾害调查与监测',
            value: '地质灾害调查与监测'},
          {
            label: '灾害应急',
            text: '灾害应急',
            value: '灾害应急'},
          {
            label: '生态地质调查与监测',
            text: '生态地质调查与监测',
            value: '生态地质调查与监测'},
          {
            label: '境外地质',
            text: '境外地质',
            value: '境外地质'},
          {
            label: '土地利用',
            text: '土地利用',
            value: '土地利用'},
          {
            label: '测绘',
            text: '测绘',
            value: '测绘'},
          {
            label: '科研',
            text: '科研',
            value: '科研'},
          {
            label: '其他',
            text: '其他',
            value: '其他'}
        ],
        dialogVisible: false,
        userDisabled: false,
        companyDisabled: false,
        phoneDisabled: false,
        isUserAddress: false,
        total: 0,
        currentPage: 1,
        dataTypeData: ['原始影像数据', '档案资料数据', '航空影像数据', '标准产品', 'J星产品'],
        pageSize: 10,
        labelPosition: 'left',
        formLabelAlign: {
          user: '',
          phone: '',
          company: '',
          proName: '',
          employ: '',
          downloadWay: '2',
          disFrequency: '',
          delayInterval: '',
          extractionPaths: '',
          descriptor: '',
          getMethod: '在线下载',
          userCardId: ''
        },
        formLabelAlign1: {},
        tableData: [],
        companyData: [],
        downloadWayData: [
          {label: '下载', value: '0'},
          {label: '推送', value: '1'},
          {label: '离线拷贝', value: '2'}
        ],
        disFrequencyData: [
          {label: '按天', value: '0'},
          {label: '按周', value: '1'},
          {label: '按月', value: '2'},
          {label: '按年', value: '3'}
        ],
        delayIntervalData: [
          {label: '不延迟', value: '0'},
          {label: '延迟1小时', value: '1'},
          {label: '延迟2小时', value: '2'}
        ],
        extractionPathsData: [],
        orderId: [],
        arrProName: '',
        orderDataList: [],
        orderDataList1: [],
        orderDataCpUrl: ['', ''],
        orderDataCpUrl1: ['', ''],
        userID: '',
        orderReference: '',
        list: [],
        upDataD: [
          {
            id: 0,
            label: '任务来源说明文件'
          },
          {
            id: 0,
            label: '签字后的分发登记表'
          },
          {
            id: 0,
            label: '介绍信'
          },
          {
            id: 0,
            label: '身份证'
          },
          {
            id: 0,
            label: '其他附件'
          }
        ],
        dialogForNewUnit: false,
        dialogForNewUnit2: false,
        form2: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form3: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        fieldValue: ''

      }
    },
    methods:{
      next(){
        if (this.formLabelAlign.user === '' || this.formLabelAlign.company === '' || this.formLabelAlign.getMethod === '' || this.formLabelAlign.proName === '' || this.formLabelAlign.employ === '' || this.formLabelAlign.user === '') {
          this.$toast.top('必填项不能为空！');
        } else {
          if (this.tableData.length > 0) {
            /*this.$refs['ruleForm1'].validate((valid) => {
              if (valid) {
                this.createOrder()
              }
            })*/
            this.createOrder()
          } else {
            this.$toast.top('订购数据不能为空！');
          }
        }

      },
      createOrder () {
        this.orderReference = this.createName()
        this.orderId = []
        this.shopfIds = []
        this.tableDataAll.forEach(item => {
          this.orderId.push(parseInt(item.did))
          this.shopfIds.push(item.id)
        })
        this.confirmOrder()
      },
      back(){
        this.$router.go(-1);
      },
      confirmOrder () {
        let userID = ''
        /*if (window.systemName === 'FW') {
          userID = JSON.parse(JSON.parse(localStorage.getItem('principalUserID')).principal).userId
        } else if (window.systemName === 'DZY') {*/
        userID = localStorage.getItem('loginName')
        /*}*/
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        http.createOrder({data: {
            // uploadFileList: '',
            getMethod: this.formLabelAlign.getMethod, // 获取方式
            // userCardId: this.formLabelAlign.userCardId, // 身份证号
            shopIds: this.orderId, // 数据ID
            shopfIds: this.shopfIds, // 数据fId
            sstatus: -1,
            loginUser: userID,
            dataType: '2', // 数据类别1:资料数据 2：非资料数据
            ordername: this.orderReference, // 订单名称
            productName: this.formLabelAlign.proName, // 项目名称
            distmethod: this.formLabelAlign.getMethod === '在线下载' ? 0 : this.formLabelAlign.getMethod === '推送'?1:2,
            // distfrequency: this.formLabelAlign.disFrequency,
            // delaytime: this.formLabelAlign.delayInterval,
            description: this.textarea, // 备注
            dataNum: this.total, // 数据条数
            dataSum: this.dataSizeAll, // 数据总量
            applyUserUsed: this.formLabelAlign.employ, // 使用用途
            applyuser: this.formLabelAlign.user, // 申请人
            applyUserPhone: this.formLabelAlign.phone, // 申请人联系方式
            applyUserUnit: this.formLabelAlign.company, // 申请人单位
            type: 0
          }}).then(res => {
          this.orderReference = ''
          this.orderDataList = []
          this.orderDataCpUrl = ['', '']
          loading.close()
          console.log(res, 'oorderpfdjpsdjgpe')
          if (res.data !== 'false') {
            this.showDiv = true
            // res.data.forEach(item => {
            for (var key in res.data) {
              if (key === 'cpordername') {
                this.orderReference += '产品订单：' + res.data[key] + ' 创建成功， '
                this.orderDataList.push(res.data[key])
                this.orderDataList1 = this.orderDataList
                this.orderDataCpUrl[0] = res.data[key]
              } else if (key === 'zlordername') {
                this.orderReference += '资料订单：' + res.data[key] + ' 创建成功， '
                this.orderDataList.push(res.data[key])
                this.orderDataList1 = this.orderDataList
              } else if (key === 'cporderurl') {
                this.orderDataCpUrl[1] = res.data[key]
              }
            }
            this.$toast.top('订单数据属性信息保存成功！');
            this.commonPvzh.postDataPVuVcommonMe({
              fOrdername: this.orderDataCpUrl[0],
              fUserid: localStorage.getItem('userName'),
              fClientip: localStorage.getItem('returnCitySNIp'),
              fUseragent: localStorage.getItem('userAgent'),
              fDetailurl: window.location.href,
              fBehaviortype: 4
            })
            this.formLabelAlign1 = this.formLabelAlign
            this.orderDataCpUrl1 = this.orderDataCpUrl
            console.log('orderDataList',this.orderDataList1)
            console.log('dataCpUrl',this.orderDataCpUrl1)
            console.log('formLabelAlign',this.formLabelAlign1)
            this.$router.push({path:'/upload',query:{orderDataCpUrl:this.orderDataCpUrl1,formLabelAlign:this.formLabelAlign1,orderDataList:this.orderDataList1}});
          } else {
            this.$toast.top('订单数据属性信息保存失败！');
          }
        })
      },
      // 获取此用户是否为免审用户
      getUserIsAudited(){
        let userID = localStorage.getItem('loginName')
        http.getUserIsAudited({
          loginName: userID
        }).then(res =>{
          res.data.isAudited
          this.isAudited = res.data.isAudited
        })
      },
      submitOrder() {
        if (this.formLabelAlign.user === '' || this.formLabelAlign.company === '' || this.formLabelAlign.getMethod === '' || this.formLabelAlign.proName === '' || this.formLabelAlign.employ === '' || this.formLabelAlign.user === '') {
          /*this.$message({
            message: '必填项不能为空！',
            type: 'warning'
          })*/
          this.$toast.top('必填项不能为空！');
        } else {
          if (this.tableData.length > 0) {
            this.createNewOrder()
          } else {
            this.$toast.top('订购数据不能为空！');
          }
        }

      },
      createNewOrder () {
        this.orderReference = this.createName()
        this.orderId = []
        this.shopfIds = []
        this.tableDataAll.forEach(item => {
          this.orderId.push(parseInt(item.did))
          this.shopfIds.push(item.id)
        })
        this.confirmNewOrder()
      },
      confirmNewOrder () {
        let userID = ''
        /*if (window.systemName === 'FW') {
          userID = JSON.parse(JSON.parse(localStorage.getItem('principalUserID')).principal).userId
        } else if (window.systemName === 'DZY') {*/
        userID = localStorage.getItem('loginName')
        /*}*/
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        http.createOrder({data: {
            // uploadFileList: '',
            getMethod: this.formLabelAlign.getMethod, // 获取方式
            // userCardId: this.formLabelAlign.userCardId, // 身份证号
            shopIds: this.orderId, // 数据ID
            shopfIds: this.shopfIds, // 数据fId
            sstatus: 1,
            loginUser: userID,
            dataType: '2', // 数据类别1:资料数据 2：非资料数据
            ordername: this.orderReference, // 订单名称
            productName: this.formLabelAlign.proName, // 项目名称
            distmethod: this.formLabelAlign.getMethod === '在线下载' ? 0 : this.formLabelAlign.getMethod === '推送'?1:2,
            // distfrequency: this.formLabelAlign.disFrequency,
            // delaytime: this.formLabelAlign.delayInterval,
            description: this.textarea, // 备注
            dataNum: this.total, // 数据条数
            dataSum: this.dataSizeAll, // 数据总量
            applyUserUsed: this.formLabelAlign.employ, // 使用用途
            applyuser: this.formLabelAlign.user, // 申请人
            applyUserPhone: this.formLabelAlign.phone, // 申请人联系方式
            applyUserUnit: this.formLabelAlign.company, // 申请人单位
            type: 0
          }}).then(res => {
          this.orderReference = ''
          this.orderDataList = []
          this.orderDataCpUrl = ['', '']
          loading.close()
          console.log(res, 'oorderpfdjpsdjgpe')
          if (res.data !== 'false') {

            // res.data.forEach(item => {
            for (var key in res.data) {
              if (key === 'cpordername') {
                this.orderReference += '产品订单：' + res.data[key] + ' 创建成功， '
                this.orderDataList.push(res.data[key])
                this.orderDataList1 = this.orderDataList
                this.orderDataCpUrl[0] = res.data[key]
                console.log('orderDataList',orderDataList)
                console.log('dataCpUrl',orderDataCpUrl)
              } else if (key === 'zlordername') {
                this.orderReference += '资料订单：' + res.data[key] + ' 创建成功， '
                this.orderDataList.push(res.data[key])
                this.orderDataList1 = this.orderDataList
              } else if (key === 'cporderurl') {
                this.orderDataCpUrl[1] = res.data[key]
              }
            }
            this.$toast.top('订单数据属性信息保存成功!');
            this.$router.push({name: '/order'})
            this.getShopCarNum()

          } else {
            this.$toast.top('订单数据属性信息保存失败!');
          }
        })
      },
      // 自动创建订单名称
      createName () {
        let name = ''
        let d = new Date()
        d.getYear() // 年月日[NW][WDP]0000
        name += d.getFullYear()
        var m = d.getMonth() + 1
        name += (m > 9 ? m : ('0' + m))
        var day = d.getDate()
        name += (day > 9 ? day : ('0' + day))
        name += 'WP'
        var hh = d.getHours()
        name += (hh > 9 ? hh : ('0' + hh))
        var mm = d.getMinutes()
        name += (mm > 9 ? mm : ('0' + mm))
        var ss = d.getSeconds()
        name += (ss > 9 ? ss : ('0' + ss))
        var mis = d.getMilliseconds()
        if (mis < 10) {
          name += ('00' + mis)
        } else if (mis < 100 && mis > 9) {
          name += ('0' + mis)
        } else {
          name += mis
        }
        return name
      },
      onCompanyFinish({selectedOptions}) {
        this.companyShow = false
        this.formLabelAlign.company = selectedOptions.map((option) => option.text).join('/')
        //this.zoomto(this.areaCode)
      },
      onMethodsFinish({selectedOptions}) {
        this.methodShow = false
        this.formLabelAlign.getMethod = selectedOptions.map((option) => option.text).join('/')
        //this.zoomto(this.areaCode)
      },
      onEmployFinish({selectedOptions}) {
        this.employShow = false
        this.formLabelAlign.employ = selectedOptions.map((option) => option.text).join('/')
        //this.zoomto(this.areaCode)
      },
      dialogResetFields () {
        if (this.dialogVisible === false) {
          if (this.$refs['ruleForm1'] !== undefined) {
            this.$refs['ruleForm1'].resetFields()
          }
          if (this.$refs['ruleForm2'] !== undefined) {
            this.$refs['ruleForm2'].resetFields()
          }
        }
      },
      getPushAddressdByUserId() {
        var loginName=localStorage.getItem('userId')
        http.getPushAddressdByLoingName({loginName:loginName}).then(res => {
          if (res.data === 'true') {

            this.isUserAddress = true
          } else {
            this.isUserAddress = false
          }

        })

      },
      getUserData () {
        let _this = this
        http.userGetById().then(res => {
          _this.userID = res.data.id
          _this.formLabelAlign.user = res.data.nickName
          _this.formLabelAlign.phone = res.data.phoneMobile
          // this.formLabelAlign.company = res.data.unit
          // if (res.data.groupIds[0]) {
          // this.getgroupGetById(res.data.groupIds[0])
          // }
          if (_this.formLabelAlign.user) {
            _this.userDisabled = true
          }
          if (_this.formLabelAlign.company) {
            _this.companyDisabled = true
          }
          if (_this.formLabelAlign.phone) {
            _this.phoneDisabled = true
          }
        })
      },
      getdataAllSize () {
        let dataid = JSON.parse(sessionStorage.getItem('shopIDs'))
        let ids = JSON.parse(localStorage.getItem('IDs'))
        http.getAllShopDataForPage({
          data: {
            // dataIds: dataid
            idsStr: ids
          }
        }).then(res => {
          let arrid = []
          res.data.list.forEach(item => {
            arrid.push(item.dataid)
          })
          this.getOrderShopSizeAll(arrid)
          this.tableDataAll = res.data.list
        })
      },
      getOrderShopSizeAll (val) {
        http.getOrderShopSize({data: {dataIds: val}}).then(res => {
          if (res.data) {
            if (res.data > this.orderDataSize) { // 大于20个G只能到馆取
              this.getMethodOptions = [
                {
                  label: '线下拷贝',
                  text: '在线下载',
                  value: '线下拷贝'
                }
              ]
              this.formLabelAlign.getMethod = '线下拷贝'
              this.orderZY = true
            } else {
              this.orderZY = false
              this.getMethodOptions = [
                {
                  label: '在线下载',
                  text: '在线下载',
                  value: '在线下载'
                },
                {
                  label: '线下拷贝',
                  text: '在线下载',
                  value: '线下拷贝'
                }
              ]

            }
            this.dataSizeAll = this.dataSizeFormatter(res.data)
            console.log(this.dataSizeAll,"111111111111111")
          } else {
            this.dataSizeAll = 0
          }
          localStorage.setItem('dataSizeAll', this.dataSizeAll)
        })
      },
      getShopData () {
        let dataid = JSON.parse(sessionStorage.getItem('shopIDs'))
        let ids = JSON.parse(localStorage.getItem('IDs'))
        console.log(ids, 'ids')
        http.getAllShopDataForPage({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          data: {
            // dataIds: dataid
            idsStr: ids
          }
        }).then(res => {
          console.log(res, 'getShopData')
          let arrid = []
          res.data.list.forEach(item => {
            arrid.push(item.dataid)
            item.datatype = this.dataTypeData[Number(item.datatype)]
            item.datatypename = 'GF1_MSS压缩包'
            item.datasize = this.dataSizeFormatter(item.datasize)
            item.cloudpercent = item.cloudpercent + '%'
          })
          this.tableData = res.data.list
          this.total = res.data.total
        })
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
      getUnitList(){
        http.getUnitList(
          {data:{
              status: 1
            }}
        ).then(res =>{
          this.options = res.data
          console.log("获取下拉框列表：",this.options)
        })
      }
    },
    mounted () {
      //this.pageSize = this.changeFixedPageSizeZ(document.documentElement.clientHeight - 597, 45)
      this.getUserIsAudited()
      //this.dialogResetFields()
      this.getPushAddressdByUserId()
      this.getUserData()
      this.getShopData()
      this.getdataAllSize()
      this.getUnitList()
    }

  }
</script>

<!--eslint-disable-->
<style>
  .contain{
    width: 100%;
    height: 100%;
    background: #F6F6F6;
  }
  .contain .headnav{
    display: flex;
    width: 100%;
    height: 9.6%;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px #E5EBEE;
  }
  .contain .headnav img{
    width: 0.48rem;
    height: 0.48rem;
    position: relative;
    left: 0.36rem;
    top: 0.88rem;
  }
  .contain .headnav .empty{
    width: 0.48rem;
    height: 0.48rem;
  }
  .contain .headnav .title{
    font-size: 0.48rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #070707;
    line-height: 0.67rem;
    position: relative;
    top: 0.8rem;
  }
  .contain .board{
    width: 100%;
    position: relative;
    top: 11.5%;
  }
  .contain .FTool{
    height: 8.25%;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px -1px 0px 0px #E5EBEE;
    position: absolute;
    bottom: 7.35%;
    left: 0;
    display: flex;
    justify-content: space-between;
  }
  .contain .FTool img{
    width: 0.48rem;
    height: 0.48rem;
    align-self: center;
    position: relative;
    left: 0.427rem;
  }
  .contain .FTool p{
    font-size: 0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #121212;
    line-height: 0.533rem;
    position: relative;
    left: 0.427rem;
    align-self: center;
  }

  .van-overlay{
    background-color:silver;
    opacity: 0.2;
  }
  .van-cell-group{
    width: 100%;
    height: 1.28rem;
  }
  .van-button{
    width: 2.48rem;
    height: 0.8rem;
    background: #4675F1;
    border-radius: 32px;
    position: relative;
    right: 0.4rem;
    align-self: center;
  }

  .van-button span{
    font-size: 0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.533rem;
  }
  .Tbox{
    display: flex;

  }
</style>
