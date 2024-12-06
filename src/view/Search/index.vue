<template>
  <div class="profession">
    <MapVue ref="mapView" />
    <div class="title">
      <img class="logoImg" src="@/assets/images/logo.png" style="width: 100%;height: auto">
      <!--<p>遥感数据服务系统</p>-->
      <!-- 查询菜单 -->
      <div class="headNav">
        <div class="headNav-col" @click="showSSZ" color="#5d5d5d" plain><span>行政区</span></div>
        <div class="headNav-col" @click="doubleFunc" color="#5d5d5d" plain><span>传感器</span></div>
        <div class="headNav-col" @click="showDate" color="#5d5d5d" plain><span>时间范围</span></div>
        <div class="headNav-col" @click="showCloud" color="#5d5d5d" plain><span>云量</span></div>
      </div>
    </div>
    <!--加载-->
    <div class="loading">
      <van-loading style="height: 70%;z-index: 99;position: absolute;top: 35%;left: 45%;" vertical color="#303030"
        size="2rem" v-show="listLoading">检索中...
      </van-loading>
    </div>
    <div class="icon">
      <img @click="resetFunc" src="../../assets/images/search/search.jpg" class="sear" />
      <img @click="dioshow" src="../../assets/images/search/ul.png" />
      <!--<img src="../../assets/images/search/position.png"/>
      <img src="../../assets/images/search/fresh.png"/>-->
    </div>
    <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
      <van-loading style="height: 70%;z-index: 99;position: absolute;top: 35%;left: 45%;" vertical color="#303030"
        size="2rem" v-show="loading">加载中...
      </van-loading>
      <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="opintion" @close="show = false" @finish="onFinish"
        @change="onChange" />
      <van-button type="primary" size="large" @click="onAreaChange">完成</van-button>
    </van-popup>
    <van-popup v-model="showPickerDate" position="bottom" :style="{ height: '80%' }">
      <!-- 添加按钮容器 -->
      <div class="button-container">
        <van-button type="danger" size="small" @click="() => quickSelect('threeMonths')">过去3个月</van-button>
        <van-button type="danger" size="small" @click="() => quickSelect('halfYear')">过去半年</van-button>
        <van-button type="danger" size="small" @click="() => quickSelect('oneYear')">过去1年</van-button>
        <van-button type="danger" size="small" @click="() => quickSelect('fiveYears')">过去5年</van-button>
        <van-button type="danger" size="small" @click="() => quickSelect('tenYears')">过去10年</van-button>
      </div>
      <van-calendar class="calendar" :default-date="[yesterday, today]" :poppable="false" type="range"
        @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" ref="calendar" :style="{ height: '90%' }" />
    </van-popup>
    <van-popup v-model="showCloudPicker" round position="bottom" :style="{ height: '30%' }">
      <van-stepper style="line-height: 100px;margin-left: 100px;" v-model="cloudPrecent" input-width="40px"
        button-size="32px" @change="cloudChange" />
      <van-button round type="info" style="margin-left: 125px;" @click="showCloudPicker = false">确定</van-button>
    </van-popup>
    <van-popup v-model="showPicker" round position="bottom" :style="{ height: '60%' }">
      <van-tree-select :items="items" :active-id.sync="activeIds" :main-active-index.sync="activeIndex" />
      <van-button type="primary" size="large" @click="onPoliceClick">完成</van-button>
    </van-popup>
    <!--结果列表界面-->
    <div class="resultContent" v-if="state">
      <van-popup class="resultBox" v-model="resultShow" round position="bottom" :style="{ height: '70%' }">
        <!--分页器-->
        <div class="pagination">
          <div class="Tool">
            <van-checkbox class="allCheck" v-model="checkedDataz" v-if="switchingNameFlag" shape="square"
              @change="checkedDataAll">
              <span>全选</span></van-checkbox>
            <van-button type="info" @click="handleAddShop">加入购物车</van-button>
          </div>
          <van-pagination v-model="currentPage" :total-items="total" :show-page-size="3" @change="handleCurrentChange"
            force-ellipses />
        </div>
        <!--商品-->
        <div class="shopIten">
          <div class="shopItem" v-for="item in tableData" style="margin-top: 0.1rem">
            <div class="ShopImge">
              <van-checkbox :disabled="item.isShop" v-model="item.isSelect" icon-size="100%">
              </van-checkbox>
              <img style="width:30%" :src="item.imageurl" @click="showBigImage(item)">
              <BigImg :visible="photoVisible" :url="bigImgUrl" @closeClick="() => { photoVisible = false }"></BigImg>

            </div>
            <div class="shopInfo">
              <p class="p1">{{ item.F_DATANAME }}</p>
              <!--<div>&nbsp;</div>-->
              <p class="p2">{{ item.F_RECEIVETIME }}</p>
            </div>
          </div>
        </div>
        <div class="BoxHead">
          <img src="../../assets/images/search/返回@2x.png" alt="返回" @click="back" />
          <p>结果列表</p>
          <div class="emty"></div>
        </div>
      </van-popup>
    </div>
    <!--<div v-if="ggShow" class="loginD_Z"
         style="z-index: 99;position: absolute;bottom: 0.1rem;background-color: blanchedalmond;">
      <img style="float:left;" src="@/assets/images/headerImg/tzblue.gif"/>
      <nationNew :lists="listData"></nationNew>
    </div>-->
    <tabBar :barIndex="barIndex" />
  </div>
</template>

<script>
import http from '@/service/interface'
import BigImg from '@/view/Search/components/BigImg.vue'
import { mapActions } from 'vuex'
import tabBar from '@/components/tabBar.vue'
import MapVue from '@/components/cy-map.vue'
import nationNew from '@/view/Search/components/nationNew.vue'
import { h } from '@vue/composition-api'
const gisMap = window.GISMaps['MainMap']
export default {
  components: {
    tabBar,
    MapVue,
    nationNew,
    BigImg
  },
  data() {
    return {
      nodeIdPra: '',
      bigImgUrl: '',
      photoVisible: false,
      ggShow: true,
      new_finished: false,
      loading: false,
      listLoading: false,
      finished: false,
      refreshing: false,
      queryObj: '',
      listData: 'APP端暂时只提供数据查询服务，数据获取请前往PC端门户',
      locationD: [],
      nodeIds: '',
      currentPage: 1,
      intervalDays: 0,
      pageSize: 10,
      tableData: [],
      total: 0,
      checkedDataz: false,
      switchingTableArr: [],
      isNoWkt: 1,
      butD: false,
      notDataListZ: [],
      AllTableDataArr: [],
      startendTime: [],
      switchingSelect: [],
      imageAllCheck: false,
      queryFieldsListTables: [],
      queryFieldsListValues: [],
      showCon: {},
      wkt: '',
      totalNum: 0,
      totalZ: 0,
      queryStatus: 0,
      sensorData: [],
      geometryType: 1,
      newNodeId: '',
      areaCode: '',
      barIndex: 0,
      switchingNameFlag: false,
      mapFlag: true,
      showPickerDate: false,
      showPickerDate1: false,
      minDate: new Date(1970, 1, 1),
      today: new Date(Date.now()),
      yesterday: new Date(Date.now() - 3600 * 1000 * 24 * 90),
      maxDate: new Date(),
      minDate1: new Date(1970, 1, 1),
      maxDate1: new Date(),
      currentDate: new Date(),
      currentDate1: new Date(),
      dateRangeOptions: {
        threeMonths: [new Date(new Date().setMonth(new Date().getMonth() - 3)), new Date()],
        halfYear: [new Date(new Date().setMonth(new Date().getMonth() - 6)), new Date()],
        oneYear: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()],
        fiveYears: [new Date(new Date().setFullYear(new Date().getFullYear() - 5)), new Date()],
        tenYears: [new Date(new Date().setFullYear(new Date().getFullYear() - 10)), new Date()],
      },
      bgDate: '', // 查询时间
      endDate: '',
      cloudPrecent: 20,
      cloud: '',
      showCloudPicker: false,
      resultShow: false,
      city: '',
      tableName: {},
      province: '',
      items: [],
      activeIds: [],
      resultDataZ: '',
      resultData: '',
      activeIndex: 0,
      buttonSelect: false,
      screenDataAll: [],
      show: false,
      showPicker: false,
      fieldValue: '',
      fieldTime: '',
      queryFieldsList: '',
      cascaderValue: '',
      opintion: [],
      country: '',
      state: true
    }
  },
  methods: {
    quickSelect(type) {
      this.$refs.calendar.reset(this.dateRangeOptions[type])
    },
    onPoliceClick() {
      this.showPicker = false
      this.nodeIds = ''
      console.log(this.activeIds, 22222222222)
      if (this.activeIds.length > 0) {
        this.nodeIds = this.activeIds.join(',')
      }
    },
    showBigImage(e) { // 点击图片函数，点击后，把photoVisible设置成true
      if (e !== '') {
        this.photoVisible = true
        this.bigImgUrl = e.imageurl
      }
    },
    handleAddShop() {
      if (localStorage.getItem('userName')) {
        let _this = this
        _this.$toast.top('正在加入购物车中')
        let arr = []
        let shopAdd = []
        _this.obj = {}
        if (this.buttonSelect) {
          if (_this.screenDataAll.length > 0) {
            shopAdd = _this.screenDataAll
          } else {
            shopAdd = _this.tableData
          }
        } else {
          if (_this.switchingNameFlag === true) {
            if (this.checkedDataz) {
              if (_this.AllTableDataArr.length > 0) {
                shopAdd = _this.AllTableDataArr
              }
            } else {
              shopAdd = _this.tableData
            }
          } else {
            shopAdd = _this.tableData
          }
        }
        shopAdd.forEach(item => {
          if (!item.isShop && item.isSelect) {
            _this.obj = {
              receivetime: this.getDateTyPE(item.F_RECEIVETIME),
              dataid: item.F_DATAID,
              dataname: item.F_DATANAME,
              did: item.F_DID,
              productlevel: item.F_PRODUCTLEVEL,
              satelite: item.F_SATELLITEID,
              sensor: item.F_SENSORID,
              datasize: item.F_DATASIZE,
              imageurl: '/mj/metaImage/getImageByTypeForAll?typeId=2&dataId=' + item.F_DID + '&nodeId=' + item.NODEID,
              wktresponse: item.WKTRESPONSE,
              nodename: item.NODENAME,
              cloudpercent: item.F_CLOUDPERCENT,
              sgtablename: item.F_TABLENAME,
              location: item.F_LOCATION + '米',
              nodeid: item.NODEID, // gy,
              // 后加的===
              orbitid: item.F_ORBITID, // gy,
              scenepath: item.F_SCENEPATH, // gy,
              scenerow: item.F_SCENEROW // gy,
            }
            arr.push(_this.obj)
          }
        })
        if (arr.length > 0) {
          http.addAgrsSave({
            data: arr
          }).then(res => {
            if (res.data !== '0') {
              _this.$toast.top('正在加入购物车中')
              // puvu
              this.commonPvzh.postDataPVuVcommonMe({
                fDataIds: res.data,
                fUserid: localStorage.getItem('userName'),
                fClientip: localStorage.getItem('returnCitySNIp'),
                fBehaviortype: 3
              })
              _this.switchingSelect = []
              _this.getShopCheckData(_this.tableData, 0)
              _this.getShopCarNum()
            } else {
              _this.$toast.top('暂无数据加入购物车')
            }
          })
        } else {
          // loading.close()
          _this.$toast.top('请选择未加入购物车数据！')
        }
      } else {
        this.$toast.top('您还未登陆，请先登录！')
      }
    },
    dioshow() {
      this.resultShow = true
    },
    getDateTyPE(string) {
      // var date = new Date(string.replace(/-/g, '/'))
      var date = new Date(string)
      return date
    },
    getShopCheckData(val, index) {
      let ids = []
      if (val.length > 0) {
        val.forEach(item => {
          ids.push(item.F_DATAID)
        })
      }
      if (localStorage.getItem('userName')) {
        http.checkMeansInShopByIds({ data: { dataIds: ids, userid: localStorage.getItem('id') } }).then(res => {
          if (res.data && res.data.length > 0) {
            // 清楚点选框中的勾选状态
            this.switchingSelect.push([])
            this.tableData.forEach(item => {
              if (index === 0) {
                item.isSelect = false
              }
              if (res.data.indexOf(item.F_DATAID) > -1) {
                item.isShop = true
              }
            })
          }
        })
      }
    },
    // 点击分页
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.nameAllSelect = '当前页全选'
      // this.resetChartlet()
      // if (this.tabelPopdata[0] === 0) {
      //   this.handlePageBtn()
      //   this.buttonActiveD = false // 翻页去掉，叠图状态
      //   // this.condition()
      // }
      // else{
      this.queryObj.currentPage = val
      // this.condition()
      this.query(this.queryObj)
      // }
    },
    queryList() {
      let state = this
      if (state.resultDataZ.length === 0) return
      let queryFieldsListZ = state.resultDataZ.tables[0].queryFieldsList
      state.tableName = state.resultDataZ.tables[0].tableName
      if (state.tableName.indexOf(',') > -1) {
        state.newNodeId = ''
        let arrName = state.tableName.split(',')
        let nodeA = state.resultDataZ.nodeId.split(',')
        arrName.forEach((item, index) => {
          state.newNodeId += item + '-' + nodeA[index] + ','
        })
        state.newNodeId = state.newNodeId.slice(0, state.newNodeId.length - 1)
      } else {
        state.newNodeId = state.resultDataZ.nodeId
      }
      queryFieldsListZ.forEach(each => {
        // each.queryValue = []
        each.nodeId = state.newNodeId
        if (each.type === 'RangeDateConfig') {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          if (state.startendTime.length !== 0) {
            each.queryValue = state.startendTime
          } else {
            each.queryValue = [start, end]
          }
        }
        if (each.name === 'f_cloudpercent') {
          if (state.cloud !== '') {
            each.queryValue = [state.cloud]
          } else {
            each.queryValue = [state.cloudPrecent]
          }
        }
        if (each.name === 'f_sensorid') {
          state.locationD = each.queryValue
        }
        if (each.name === 'f_productlevel') {
          this.$delete(queryFieldsListZ, each)
        }
      })
      state.queryFieldsList = queryFieldsListZ
      this.getSensortransData()
    },
    getSensortransData() {
      var _this = this
      http.getSensortrans({
        currentPage: 1,
        pageSize: 1000
      }).then(res => {
        if (res.data && res.data.records.length > 0) {
          _this.sensorData = res.data.records
        } else {
          _this.sensorData = []
        }
        this.constructQueryCondition()
      })
    },
    getAgrsCatalogListLocal() {
      var that = this
      var arr = []
      var childarr = {}
      http.getResolutionpower().then(res => {
        // console.log('getResolutionpower', res)
        if (res.data) {
          var cgqdata = {}
          res.data.children.forEach(i => {
            var child = []
            i.children.forEach(t => {
              if (t.children.length > 0) {
                t.children.forEach(e => {
                  childarr = {
                    text: e.value,
                    id: e.parentnodeid
                  }
                })
              }
              child.push(childarr)
            })
            cgqdata = {
              text: i.FL,
              children: child
            }
            arr.push(cgqdata)
          })
          that.items = arr
        }
        console.log(arr, 1111111)
      })
    },
    doubleFunc() {
      this.showPicker = true
    },
    resetFunc() {
      // this.state = true
      this.listLoading = true
      this.tableData = []
      if (this.nodeIds === '') {
        this.$toast.top('请您至少选一个传感器')
        return
      }
      if (this.areaCode === '') {
        this.$toast.top('您未设置空间信息，请设置')
        return
      }
      http.getQueryTablesFields({ nodeId: this.nodeIds }).then(res => {
        this.resultDataZ = res.data[0]
        this.resultData = res.data[0]
        this.queryList()
      })

      console.log(this.tableData)

      // this.resetChartlet()
    },
    // 获取查询条件
    getQueryCondition() {
      this.nodeIdPra = this.activeIds
      if (this.activeIds.length === 0) {
        this.$toast.top('请您至少选一个传感器')
        return
      }
      console.log(this.activeIds, 'wwwwwwwww')
      if (this.activeIds.indexOf(',') > -1) {
        this.nodeIdPra = this.newNodeId
      }
      this.queryObj = {
        guid: this.guid,
        nodeId: this.newNodeId,
        nodeName: this.tableName,
        geometryType: this.geometryType,
        areaCode: this.areaCode,
        wkt: this.wkt,
        queryStatus: this.queryStatus,
        wktStr: this.wkt,
        isExl: 'false',
        isNoWkt: this.isNoWkt,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        queryType: 'PageQuery',
        intervalDays: this.intervalDays,
        sensortranslations: this.sensorData,
        tables: [{
          tableName: this.tableName,
          queryFieldsList: this.getTimegs(this.queryFieldsList)
        }]
      }
      return true
    },
    getTimegs(val) {
      if (val.length > 0) {
        let _this = this
        val.forEach(item => {
          if (item.name === 'f_receivetime') {
            if (sessionStorage.getItem('timeDE') || sessionStorage.getItem('endtime')) {
              item.queryValue[0] = sessionStorage.getItem('timeDE')
              item.queryValue[1] = sessionStorage.getItem('endtime')
              _this.intervalDays = _this.GetDateDiff(item.queryValue[0], item.queryValue[1], 'day')
              if (_this.intervalDays > 366) {
                _this.$toast.top('您当前选择的时间超过1年，查询可能会慢')
              }
            } else {
              for (let i = 0; i < item.queryValue.length; i++) {
                item.queryValue[i] = _this.timestampToTime(item.queryValue[i])
              }
            }
          }
          if (item.name === 'f_sensorid') {
            item.queryValue = _this.locationD
          }
          // if (item.name === 'f_dataname') {
          //     item.queryValue = [this.dataListShowD]
          // }
        })
        return val
      } else {
        return []
      }
    },
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
    GetDateDiff(startTime, endTime, diffType) {
      startTime = startTime.replace(/\-/g, '/')
      endTime = endTime.replace(/\-/g, '/')
      diffType = diffType.toLowerCase()
      var sTime = new Date(startTime)
      var eTime = new Date(endTime)
      var timeType = 1
      switch (diffType) {
        case 'second':
          timeType = 1000
          break
        case 'minute':
          timeType = 1000 * 60
          break
        case 'hour':
          timeType = 1000 * 3600
          break
        case 'day':
          timeType = 1000 * 3600 * 24
          break
        default:
          break
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType))
    },
    // 构造查询条件
    constructQueryCondition() {
      this.initWebSocket()
      this.getQueryCondition()
      if (this.nodeIdPra) {
        if (this.wkt === '' && this.areaCode === '') {
          this.$toast.top('您未设置空间信息，请设置')
        } else {
          let index = 0
          this.queryObj.tables[0].queryFieldsList.forEach(item => {
            if (item.alisaName === '传感器') {
              index = item.queryValue.length
            }
          })
          this.condition()
        }
      }
    },
    condition() {
      // this.setClearPoint(3)
      // gisMap.clearAllFeatures()
      this.query(this.queryObj)
    },
    query(obj) {
      this.currentPage
      // 打点查询不能用到索引，以打点的wkt加减0.0001变为一个矩形作为查询条件可以用到索引，查询速度就快了
      // let _this = this
      // this.butD = true
      /* if (this.menuShow) {
        document.getElementsByClassName('el-notification')[0].style.right = '500px'
      } else {
        document.getElementsByClassName('el-notification')[0].style.right = '20px'
      } */
      if (this.currentPage === 1 || this.queryObj.currentPage === 1) {
        obj.currentPage = 1
        this.queryObj.currentPage = 1
        // this.total = 0
        // this.totalT = 0
        // this.totalNum = 0
      } else {
        this.currentPage = obj.currentPage
        this.queryObj.currentPage = obj.currentPage
      }

      let _this = this

      if (this.nodeIds.indexOf(',') > -1) {
        http.findPageQueryByNodes(obj).then(res => {
          this.listLoading = false
          // 先清空这个缓存，然后传入查询对象到缓存里，供定点查询使用
          let time = new Date().getTime()
          obj.time = time
          obj.objType = 'WX'
          localStorage.setItem('searchDataToWX', JSON.stringify(obj))

          if (res.data.total === 80000) {
            _this.$toast.top('当前查询结果超过8万条，请修改查询条件！')
            return
          }
          this.listResult(res, function () {
            if (res.data.total > 0) {
              if (_this.currentPage === 1) {
                gisMap.featuresSourceAllImage.clear()
                _this.coverage()
              } else {
              }
            } else {
              _this.butD = false
              _this.$toast.top('查询暂无数据')
              _this.total = 0
              _this.totalT = 0
              _this.fullscreenLoading = false
            }
          })
        })
        if (this.currentPage === 1 || this.queryObj.currentPage === 1) {
          obj.currentPage = 1
          this.queryObj.currentPage = 1
          // this.total = 0
          // this.totalT = 0
          // this.totalNum = 0
        } else {
          this.currentPage = obj.currentPage
          this.queryObj.currentPage = obj.currentPage
        }
      } else {
        http.findQuery(obj).then(res => {
          this.listLoading = false
          if (res.data.total === 80000) {
            _this.$toast.top('当前查询结果超过8万条，请修改查询条件！')
            return
          }
          this.listResult(res, function () {
            if (res.data.total && res.data.total > 0) {
              if (_this.guid !== res.data.guid) {
                _this.$toast.top('您短时间内查询次数较频繁，请放缓查询时间间隔')
                return
              }

              if (_this.currentPage === 1) {
                gisMap.featuresSourceAllImage.clear()
                _this.coverage()
              } else {
              }
            } else {
              _this.butD = false
              _this.$toast.top('查询暂无数据')
              _this.total = res.data.total
              _this.totalT = res.data.total
              _this.fullscreenLoading = false
            }
          })
        })
        if (this.currentPage === 1 || this.queryObj.currentPage === 1) {
          obj.currentPage = 1
          this.queryObj.currentPage = 1
          // this.total = 0
          // this.totalT = 0
          // this.totalNum = 0
        } else {
          this.currentPage = obj.currentPage
          this.queryObj.currentPage = obj.currentPage
        }
      }
    },
    getNotDataList(val) {
      this.notDataListZ = []
      // http.getNotDataListSceneId(this.queryObj).then(res => {
      if (val && val.length > 0) {
        val.forEach((item, index) => {
          // item =
          this.notDataListZ.push({
            value: item,
            id: index
          })
        })
        // this.notDataListZ = res.data.notDataList
      }
      // })
    },
    getTotalNum(val) {
      // this.totalNum = 0
      if (val !== 0) {
        this.totalNum = val
        let zc = parseInt(val / 30)
        let ys = val % 30
        if (zc !== 0 && ys !== 0) {
          this.totalNum = zc + 1
        } else if (zc !== 0 && ys === 0) {
          this.totalNum = zc
        } else {
          this.totalNum = 1
        }
      }
    },
    addPolygonAllData(res, index) {
      if (res.length > 0) {
        res.forEach(item => {
          let feature = {
            attributes: item,
            style: {
              fillcolor: 'rgba(88,231,218, 0.5)',
              strokecolor: index === 1 ? 'rgba(127,30,222, 0.9)' : 'rgba(44,117,242, 0.5)',
              strokewidth: 2
              // fillcolor: 'rgba(3, 168, 158, 0.1)',
              // strokecolor: 'rgba(3, 168, 158, 0.3)',
              // strokewidth: 2
            },
            geometry: item.WKTRESPONSE
          }
          // 添加面到地图
          if (index === 1) {
            gisMap.addPolygon(feature)
          } else {
            gisMap.addPolygon(feature, index)
          }
        })
      }
    },
    coverage() {
      let _this = this
      _this.checkedDataz = false
      _this.switchingTableArr = []
      _this.butD = true
      _this.AllTableDataArr = []
      // 回调合并面
      if (_this.nodeIds.indexOf(',') > -1) {
        http.findCoverageByNodes(_this.queryObj).then(res => {
          _this.butD = false
          if (res.data.pageList) {
            _this.getNotDataList(res.data.excelUnFindList)

            let totalTemp = 0
            res.data.pageList.forEach(item => {
              if (item.SIZENUM) {
                totalTemp += item.SIZENUM
              }
            })
            _this.total = totalTemp
            _this.totalT = totalTemp
            _this.getTotalNum(_this.total)
            // _this.switchingTableArr = res.data.pageList
            // _this.AllTableDataArr = res.data.pageList
            // _this.setActiveName('result')
          }
          _this.checkedDataAll()
          // if (_this.nodeId === '10091' || _this.nodeId === '10092' || _this.nodeId === '10093' || _this.nodeId === '10094' || _this.nodeId === '10101' || _this.nodeId === '10111' ||
          //   _this.nodeId === '10121') {
          //   // 生成图例
          //   // _this.createTlByPageList(res.data.pageList, _this.nodeId)
          // }
          // 画框
          _this.addPolygonAllData(res.data.pageList, 'featuresSourceAllImage')
          // _this.resultStyleByCatalog(res.data.pageList, _this.nodeId, false)
        })

        // 20220711 mj 新增异步查询获取全选所有的列表
        http.findNewAgrsAllListWktForHCNodes(this.queryObj).then(res => {
          _this.AllTableDataArr = []
          _this.butD = false
          if (res.data.pageList) {
            this.getNotDataList(res.data.excelUnFindList)

            _this.total = res.data.total
            _this.totalT = res.data.total
            this.getTotalNum(res.data.total)
            // _this.switchingTableArr = res.data.pageList
            _this.AllTableDataArr = res.data.pageList
            // _this.setActiveName('result')
          }
          _this.checkedDataAll()
          // if (_this.nodeId === '10091' || _this.nodeId === '10092' || _this.nodeId === '10093' || _this.nodeId === '10094' || _this.nodeId === '10101' || _this.nodeId === '10111' ||
          //   _this.nodeId === '10121') {
          //   // 生成图例
          //   // _this.createTlByPageList(res.data.pageList, _this.nodeId)
          // }
          // 画框
          // _this.addPolygonAllData(res.data.pageList, 'featuresSourceAllImage')
          // _this.resultStyleByCatalog(res.data.pageList, _this.nodeId, false)

          _this.switchingNameFlag = true
        })
      } else {
        http.findCoverage(this.queryObj).then(res => {
          _this.butD = false
          if (res.data.pageList) {
            this.getNotDataList(res.data.excelUnFindList)
            if (res.data.pageList[0].SIZENUM !== undefined) {
              _this.total = res.data.pageList[0].SIZENUM
              _this.totalT = res.data.pageList[0].SIZENUM
            } else {
              _this.total = res.data.pageList.length
              _this.totalT = res.data.pageList.length
            }
            this.getTotalNum(_this.total)
            // _this.switchingTableArr = res.data.pageList
            // _this.AllTableDataArr = res.data.pageList
            // _this.setActiveName('result')
          }
          _this.checkedDataAll()
          // if (_this.nodeId === '10091' || _this.nodeId === '10092' || _this.nodeId === '10093' || _this.nodeId === '10094' || _this.nodeId === '10101' || _this.nodeId === '10111' ||
          //   _this.nodeId === '10121') {
          //   // 生成图例
          //   // _this.createTlByPageList(res.data.pageList, _this.nodeId)
          // }
          if (_this.guid !== res.data.guid) {
            _this.$toast.top('非本次查询结果')
            return
          }
          // // 画框
          // if(this.currentPage ===){
          //
          // }
          _this.addPolygonAllData(res.data.pageList, 'featuresSourceAllImage')
          // _this.resultStyleByCatalog(res.data.pageList, _this.nodeId, false)
        })

        // 20220711 mj 新增异步查询获取全选所有的列表 单卫星
        http.findNewAgrsAllListWktForHCNodes(this.queryObj).then(res => {
          _this.AllTableDataArr = []
          _this.butD = false
          if (res.data.pageList) {
            this.getNotDataList(res.data.excelUnFindList)

            _this.total = res.data.total
            _this.totalT = res.data.total
            this.getTotalNum(res.data.total)
            // _this.switchingTableArr = res.data.pageList
            _this.AllTableDataArr = res.data.pageList
            // _this.setActiveName('result')
          }
          _this.checkedDataAll()
          _this.switchingNameFlag = true
        })
      }
    },
    checkedDataAll(val) {
      // 清空当前点选数据所有勾选
      this.switchingSelect = []
      let dataALL = []
      // 筛选数据和全部数据的区分 this.buttonSelect = true 是筛选数据 否则就是  全部数据
      if (this.buttonSelect) {
        dataALL = this.screenDataAll
      } else {
        dataALL = this.AllTableDataArr
      }
      if (this.checkedDataz) {
        dataALL.map((item, index) => {
          item.isSelect = true
          // this.$set(dataALL, index, item)
          item.F_RECEIVETIME = this.timestampToTime(item.F_RECEIVETIME)
          item.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=1&dataId=' + item.F_DID + '&nodeId=' + item.NODEID
        })
        this.tableData.map((item, index) => {
          item.isSelect = true
          // this.$set(this.tableData, index, item)
          // 当前点选数据所有勾选
          this.switchingSelect.push(item.F_DID.toString())
        })
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isSelect = true
        }
        this.imageAllCheck = true
      } else {
        // 清空当前点选数据所有勾选
        this.switchingSelect = []
        this.tableData.map((item, index) => {
          item.isSelect = false
          // this.$set(this.tableData, index, item)
        })
        dataALL.map((item, index) => {
          item.isSelect = false
          // this.$set(dataALL, index, item)
          item.F_RECEIVETIME = this.timestampToTime(item.F_RECEIVETIME)
          item.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=1&dataId=' + item.F_DID + '&nodeId=' + item.NODEID
        })
        this.imageAllCheck = false
      }
    },

    listResult(res, callback) {
      if (res.data === null || res.data.pageList === null || Object.keys(res.data).length === 0) {
        this.$toast.top('查询暂无数据')
        this.butD = false
        return
      }
      this.nameChartlet = '叠加'
      let data = res.data.pageList
      if (data) {
        data.forEach(d => {
          d.isSelect = false
          d.isShop = false
          // d.nodeId = d.NODEID.toString()
          // d.isMapping = false
          if (d.isMapping === undefined) {
            d.isMapping = false
          }
          d.isSeamless = false
          d.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=1&dataId=' + d.F_DID + '&nodeId=' + d.NODEID
          d.F_RECEIVETIME = this.timestampToTime(d.F_RECEIVETIME)
        })
      } else {
        this.tableData = []
      }
      this.tableData = data
      let dataObj = {
        total: this.total,
        tableData: data
      }
      sessionStorage.setItem('dataObj', JSON.stringify(dataObj))
      this.tableDataT = data
      // gisMap.clearCurrentFeatures()
      gisMap.clearAllFeatures()
      //
      let _seft = this
      if (_seft.tableData) {
        this.addPolygonAllData(_seft.tableData, 1)
        this.getShopCheckData(_seft.tableData)
        this.tableDataP = _seft.tableData
        this.nodeIdP = _seft.nodeId
        if (_seft.AllTableDataArr.length > 0) {
          _seft.arrAll = _seft.AllTableDataArr.slice((this.currentPage - 1) * 30, this.currentPage * 30 + 1)
          _seft.tableData.forEach(e => {
            for (let i = 0; i < _seft.arrAll.length; i++) {
              if (_seft.arrAll[i].F_DATAID === e.F_DATAID) {
                e.isSelect = _seft.arrAll[i].isSelect
              }
            }
          })
        }
        if (callback) {
          callback()
        }
      }
    },
    showSSZ() {
      this.show = true
    },
    showDate() {
      this.showPickerDate = true
    },
    showCloud() {
      this.showCloudPicker = true
    },
    onAreaChange() {
      this.show = false
      this.zoomto(this.areaCode)
    },
    onChange({ selectedOptions }) {
      gisMap.clearAllFeatures()
      let that = this
      that.areaCode = selectedOptions[selectedOptions.length - 1].value
    },
    confirm(val) {
      this.show = false
    },
    cloudChange(val) {
      this.cloud = val
      // console.log(val)
    },
    getAreaCodes() {
      let _this = this
      _this.loading = true
      http.getAreaCode({
        showWkt: false,
        code: '000000',
        qType: 0,
        showType: 0,
        showSub: true,
        showAllSub: true
      }).then(res => {
        _this.valueLabel(res.data)
        _this.country = JSON.parse(JSON.stringify(res.data).replace(/child/g, 'children'))
        this.country.forEach(item => {
          _this.opintion = item.children
          console.log(_this.opintion)
        })
        _this.loading = false
      })
    },
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    getGuid() {
      return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4())
    },
    initWebSocket() {
      this.guid = this.getGuid()
    },
    valueLabel(val) {
      let _this = this
      val.map(item => {
        if (item.child !== undefined && item.child.length > 0) {
          item.value = '156' + item.code
          item.text = item.name
          _this.valueLabel(item.child)
        } else {
          delete item.child
          item.value = '156' + item.code
          item.text = item.name
        }
      })
    },
    onFinish({ selectedOptions }) {
      gisMap.clearAllFeatures()
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
      this.zoomto(this.areaCode)
    },
    zoomto(code) {
      gisMap.clearAll()
      http.getAreaWkt({
        code
      }).then(res => {
        let wktResponse = res.data
        let feature = {
          'attributes': {},
          'style': {
            fillcolor: 'rgba(255, 255, 255, 0)',
            strokecolor: 'red',
            strokewidth: 2
          },
          'geometry': wktResponse
        }
        // this.setQueryStatus(0)
        // this.setWkt('') // 之前注释掉是因为行政区划这样查询太慢,这个修改成传code到后台联查,现在这里清空是为了使用code查询时候不受wkt的干扰
        // this.setWkt(wktResponse)
        gisMap.drawPolygon(feature)
        let f = gisMap.transformFeatureFromWkt(wktResponse)
        // 飞到某地
        gisMap.flyTo(f, () => {
        })
        // this.setActiveName('condition')
      })
    },
    // 确认选择日志类型
    onConfirm(date) {
      const [start, end] = date
      this.showPickerDate = false
      this.startendTime = [this.timestampToTime(start), this.timestampToTime(end)]
      alert(this.startendTime)
      // this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    back() {
      this.resultShow = false
    },
    ...mapActions('searchStore', {
      setActiveName: 'setActiveName',
      setDetailShow: 'setDetailShow',
      setClearPoint: 'setClearPoint',
      setShopIDs: 'setShopIDs',
      settlList: 'settlList',
      setCode: 'setCode',
      setWkt: 'setWkt',
      setQueryStatus: 'setQueryStatus',
      setname: 'setname',
      setSwitchingSelect: 'setSwitchingSelect',
      setDialogShowDataZ: 'setDialogShowDataZ',
      setHfShowTl: 'setHfShowTl',
      setNodeIndexData: 'setNodeIndexData',
      setHcShowTl: 'setHcShowTl',
      setHdShowTl: 'setHdShowTl',
      setHyShowTl: 'setHyShowTl'
    })
  },
  mounted() {
    this.getAreaCodes()
    this.getAgrsCatalogListLocal()
  }
}
</script>

<!--eslint-disable-->
<style scoped>
.vanTabs {
  height: 100px;
}

.content {}


.profession {
  /* background-color: #f9fbff; */

  /* .van-nav-bar {
      background-color: #39a8fc !important;

    /deep/ .van-icon,
    /deep/ .van-nav-bar__title {
      color: #fff !important;
    }

    } */

}

/** 导航（新）*/
.profession .title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #FFFFFF;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profession .title img {
  width: 100%;
  height: auto;
  /*align-self: center;
    margin-top: 1.062rem;
    font-size: 0.48rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #070707;
    line-height: 0.67rem;*/

}

.profession .headNav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.333rem;
}

.profession .headNav .headNav-col {}

.profession .headNav .headNav-col span {
  font-size: 0.387rem;
  font-family: "PingFangSC-Regular, PingFang SC";
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.profession .icon {
  position: fixed;
  right: 0.4rem;
  bottom: 2.24rem;
  z-index: 3;
  width: 1rem;
  height: 3.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profession .icon img {

  width: 1rem;
  height: 1rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0px 12px 0px rgba(34, 45, 55, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(0px);

}

.profession .icon .sear {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0px 12px 0px rgba(34, 45, 55, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(0px);
}

.pagination {
  width: 100%;
}

.pagination .Tool {
  width: 100%;
  height: 7%;
  background: #FFFFFF;
  position: fixed;
  bottom: 1.05rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 4;
}

.pagination .Tool img {
  width: 0.3rem;
  height: 0.6rem;
}

.loading {
  align-self: center;
}

.resultContent {}

.BoxHead {
  height: 9.6%;
  width: 100%;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
}

.BoxHead img {
  width: 0.3rem;
  height: 0.6rem;
  align-self: center;
  position: relative;
  top: 0.24rem;
  left: 0.36rem;
}

.BoxHead p {
  font-size: 0.48rem;
  font-family: " PingFangSC-Medium, PingFang SC";
  font-weight: 500;
  color: #070707;
  line-height: 0.67rem;
  align-self: center;
  position: relative;
  top: 0.24rem;
}

.BoxHead .emty {
  width: 0.4rem;
  height: 0.4rem;
}

.shopIten {
  width: 100%;
  height: 77.2%;
  overflow: scroll;

}

.shopIten .shopItem {
  display: flex;
  height: 15.4%;
  background: #FFFFFF;
}

.ShopImge {
  width: 41.05%;
  display: flex;

}

.ShopImge img {
  width: 57.8%;
  height: 70.3%;
  border-radius: 0.13rem;
  align-self: center;
  flex: 0.7;
  margin-left: 0.31rem;
}

.shopInfo {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  /* 在长单词或URL地址内部进行换行*/
  word-break: break-all;
  /* 允许单词内自动换行，如果一个单词很长的话*/
  overflow: hidden;
  text-overflow: ellipsis;
  /* 溢出用省略号显示*/
  -webkit-line-clamp: 2;
  background: #FFFFFF;
  position: relative;
  right: 0.4rem;
}

.shopInfo .p1 {
  font-size: 0.4rem;
  font-family: "PingFangSC-Medium, PingFang SC";
  font-weight: 500;
  color: #070707;
}

.shopInfo .p2 {
  font-size: 0.4rem;
}

/** */

/* .right-btn-sel {
    position: absolute;
    float: left;
    z-index: 10;
    top: 1.2rem;
    height: 45px;
    background-color: white;
  } */


/**Vant样式*/
.van-nav-bar__title {
  font-size: 0.48rem;
  font-family: "PingFangSC-Medium, PingFang SC";
  font-weight: 500;
  color: #070707;
  line-height: 0.67rem;
}

.resultContent .van-popup {
  height: 100% !important;
  border-radius: none !important;
  background: #F6F6F6;
  overflow-y: hidden;
}

.resultContent .van-popup--bottom.van-popup--round {
  border-radius: 0;
}

.resultBox {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}

.resultContent .van-pagination {
  background: #FFFFFF;
}

.resultContent .van-overlay {}

.resultContent .van-loading {}

.ShopImge .van-checkbox {
  align-self: center;
  margin-left: 0.4rem;
}

.Tool .allCheck span {
  font-size: 0.373rem;
  font-family: "PingFangSC-Regular, PingFang SC";
  font-weight: 400;
  color: #121212;
}

.Tool .van-radio {
  margin-left: 0.4rem;
}

.Tool .van-button {
  width: auto;
  height: 0.8rem;
  background: #4675F1;
  border-radius: 0.427rem;
  align-self: center;
  margin-right: 0.4rem;
}

.Tool .van-button span {
  font-size: 0.35rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 0.533rem;
}

.button-container {
  display: flex;
  justify-content: space-around;
  padding: 5px;
}
</style>
