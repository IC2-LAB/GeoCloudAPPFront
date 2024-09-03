<!--
<template>
  <div class="container">
    <div id="mapContainer" class="map" ></div>
    <div class="info" style="position: absolute;top:10px;right: 10px;z-index: 1;font-size: 12px;    background: #fff;
    border-radius: 10px;">
      <p id='status'></p><hr>
      <p id='result'></p><hr>
    </div>
    <van-button v-show="isLocateing" loading type="info" loading-text="定位中..." />
    <van-button v-show="showLinesBtn" @click="clickClock()" round type="primary" size="small"
                :style="{'padding': '14px', 'position': 'absolute', 'left': '100px', 'bottom': '30px'  }"
    >{{btnText}}</van-button>
    &lt;!&ndash; 历史轨迹点击按钮&ndash;&gt;
    <van-button v-show="showLinesBtn" @click="showLinesPanel()" round type="info" size="small"
                :style="{'padding': '14px', 'position': 'absolute', 'left': '190px', 'bottom': '30px'  }"
    >历史轨迹</van-button>
    &lt;!&ndash;<van-icon v-show="showLinesBtn" @click="showLinesPanel()" name="more"&ndash;&gt;
              &lt;!&ndash;:style="{'padding': '0px', 'position': 'absolute', 'left': '190px', 'bottom': '30px', 'color': '#fff!important', 'font-size': '32px!important'}" />&ndash;&gt;
    &lt;!&ndash;<van-icon @click="location()" name="location" :style="{'padding': '0px', 'position': 'absolute', 'right': '10px', 'bottom': '67px', 'color': '#fff!important', 'font-size': '32px!important'}" />&ndash;&gt;
    <van-button v-show="showLocateBtn" @click="searchProject()" round type="info" size="small"
                :style="{'padding': '14px', 'position': 'absolute', 'left': '80px', 'bottom': '31px'  }"
    >搜索项目</van-button>
    <div v-show="showLocateBtn" style="position: absolute;left: 170px;bottom: 35px;background: #eee;height: 26px;border-radius: 2px;">
      <van-stepper  v-model="coordinateRangeValue" step="1" theme="round"
                    button-size="25" disable-input  :style="{'float': 'left', 'padding': '0px'}"/>
      <div style="font-size: 15px;padding-top: 1px;display: inline-block;line-height: 25px;height: 25px;float: left;padding-left: 5px;">(公里) </div>
    </div>

    <div v-show="showLocateControlBtn" @click="showLocateControl()" style="position: absolute;right: 15px;bottom: 100px;width: 35px;height: 35px;padding: 0px;background: #fff;border-radius: 50%; box-shadow: 0px 0px 3px 1px #dcdcdc;">
      <img :src="require('@/assets/img/locate.png')" height="100%"/>
    </div>
    <div @click="showLinesControl()"  style="position: absolute;right: 15px;bottom: 34px;width: 35px;height: 35px;padding: 0px;background: #fff;border-radius: 50%;box-shadow: 0px 0px 3px 1px #dcdcdc;">
      <img :src="require('@/assets/img/line1.png')" height="100%"/>
    </div>
    <van-popup
      v-model="showHis"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '60%' }"
    >
    <linesPanel @addNewLines="addNewLines" style="margin-top: 40px;" ref="linesPanelObj"></linesPanel>
    </van-popup>
    <van-dialog confirmButtonText="关闭" v-model="showProject" :style="{'height': '80%', 'width': '99%', 'overflow-y': 'auto'}">
      <MessageInfo style="margin-top: 0px;" :dataAll="dataAll"></MessageInfo>
    </van-dialog>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import linesPanel from './linesPanel'
import MessageInfo from '@/view/More/components/Message'
import {Dialog, Notify} from 'vant'
// import http from '@/api/interface.js'
// var Terraformer = require('terraformer')
// var WKT = require('terraformer-wkt-parser')

var AMap = null
export default {
  name: 'amap',
  components: {
    linesPanel,
    MessageInfo
  },
  data () {
    return {
      curId: null, // 默认是没有的，如果有那么就需要默认加载上
      dataAll: {},
      mapItems: {},
      showLocateBtn: false, // 操作定位
      showLinesBtn: false, // 操作轨迹
      showLocateControlBtn: true, // 开启轨迹的时候隐藏，以防点击
      isLocateing: false,
      curMarker: null,
      curPolyline: null,
      startMarker: null,
      endMarker: null,
      btnText: '开始记录',
      mapObj: null,
      features: [],
      showHis: false, // 历史轨迹列表
      showProject: false, // 项目信息
      params: {
        coordinatePoint_wkt: '',
        coordinateRange: 1000
      },
      coordinateRangeValue: 5,
      timer: null,
      points: [], // 定时记录的points 信息
      isClock: false // 定时是否开启
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // https://www.narutogis.com/sx/index.html#/map
      AMapLoader.load({
        'key': 'f20e73b56c05e85d6d462c449a6667c9', // 申请好的Web端开发者Key，首次调用 load 时必填
        // 'version': '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        'plugins': [] // 插件列表
      }).then((amap) => {
        AMap = amap
        // var satellite = new AMap.TileLayer.Satellite()
        // var roadNet = new AMap.TileLayer.RoadNet()
        this.mapObj = new AMap.Map('mapContainer', {
          resizeEnable: true,
          zoom: 8,
          center: [116.405285, 39.904989],
          layers: [
            // satellite
            // roadNet
          ]
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation'], () => {
          var toolbar = new AMap.ToolBar()
          this.mapObj.addControl(toolbar)
          var MapType = new AMap.MapType()
          this.mapObj.addControl(MapType)
          this.geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonPosition: 'LB',
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true
          })
        })
        // 2。0 ？？
        // this.mapObj.on('click', ev => {
        //   // console.log('click', ev)
        // })

        // var mybounds = new AMap.Bounds([116.319665, 39.855919], [116.468324, 39.9756])
        // this.mapObj.setBounds(mybounds)
        // this.location()
      }).catch(e => {
        // console.log(e)
      })
    },
    showLinesControl () {
      if (this.showLinesBtn) {
        if (this.isClock) {
          Dialog.confirm({
            message: '还有轨迹在记录，确定放弃吗？'
          }).then(() => {
            this.clearLines()
            this.clockStop()
            this.showLocateBtn = false
            this.showLinesBtn = false
          })
        } else {
          this.showLocateBtn = false
          this.showLinesBtn = false
          this.clearLines()
        }
      } else {
        // 如果有之前加载project的东西，需要清除掉
        this.clearProjects()
        this.showLocateBtn = false
        this.showLinesBtn = true
      }
    },
    showLocateControl () {
      // 如果有之前加载project的东西，需要清除掉
      this.clearLines()
      this.showLocateBtn = !this.showLocateBtn

      this.showLinesBtn = false
    },
    clearProjects () {
      if (this.features && this.features.length > 0) {
        for (let i = 0; i < this.features.length; i++) {
          this.mapObj.remove(this.features[i])
        }
        this.features = []
        this.mapItems = {}
      }
      if (this.curMarker) {
        this.mapObj.remove(this.curMarker)
      }
      if (this.circle) {
        this.mapObj.remove(this.circle)
      }
    },
    clearLines () {
      this.points = []
      // this.clockStop()
      // 绘制线，点大于1之后
      if (this.curPolyline) {
        this.mapObj.remove(this.curPolyline)
      }
      if (this.startMarker) {
        this.mapObj.remove(this.startMarker)
      }
      if (this.endMarker) {
        this.mapObj.remove(this.endMarker)
      }
    },
    clickClock () {
      if (!this.isClock) {
        // 开始时钟
        Dialog.confirm({
          message: '确定开始轨迹记录吗？'
        }).then(() => {
          this.showLocateControlBtn = false
          this.points = []
          this.clockStart()
        })
      } else {
        // 开始时钟
        Dialog.confirm({
          message: '确定结束轨迹记录吗？'
        }).then(() => {
          this.clockStop()
          this.saveLine()
        })
      }
    },
    clockStart () {
      this.btnText = '结束记录'
      this.clearLines()
      this.stm = new Date()
      this.isClock = true
      this.location() // 先调用一次
      this.timer = setInterval(this.location, 1000 * 20) // 20 秒一次
    },
    clockStop () {
      this.btnText = '开始记录'
      this.etm = new Date()
      this.isClock = false
      this.showLocateControlBtn = true
      clearInterval(this.timer)
    },
    dateFormat (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    saveLine () {
      // Dialog.confirm({
      //   message: '确定保存轨迹记录吗？'
      // }).then(() => {
      //
      // })
      // 保存轨迹
      // let param = {
      //   lines: JSON.stringify(this.points),
      //   timeseries: this.dateFormat(this.stm) + ' 至 ' + this.dateFormat(this.etm),
      //   title: '',
      //   fusername: localStorage.username
      // }
      // 保存数据到后台
      // http['createUserTrajectory'](param).then(res => {
      //   // console.log(res)
      //   Notify({ type: 'success', message: '轨迹保存成功' })
      // })
    },
    searchProject () {
      this.clearProjects()
      // 获取默认选的距离
      this.location()
    },
    location () {
      this.isLocateing = true
      this.geolocation.getCurrentPosition((status, result) => {
        this.isLocateing = false
        if (this.isClock) {
          if (status === 'complete') {
            this.onClockComplete(result)
          } else {
            // console.log('getCurrentPosition', 'error', result)
          }
        } else {
          if (status === 'complete') {
            this.onLocationComplete(result)
          } else {
            // console.log('getCurrentPosition', 'error', result)
          }
        }
      })
    },
    onLocationError (data) {
      // console.log(data)
      document.getElementById('result').innerHTML = data
    },
    onClockComplete (data) {
      // // console.log('onClockComplete', data.position)
      if (this.points.length === 0) { // 开始
        this.points.push([data.position.lng, data.position.lat])
        let startIcon = new AMap.Icon({
          size: new AMap.Size(35, 44),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-9, -3)
        })
        this.startMarker = new AMap.Marker({
          position: new AMap.LngLat(this.points[this.points.length - 1][0], this.points[this.points.length - 1][1]),
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30)
        })
        this.mapObj.add(this.startMarker)
        // this.mapObj.setZoomAndCenter(12, [data.position.lng, data.position.lat])
        this.mapObj.setCenter(new AMap.LngLat(data.position.lng, data.position.lat))
      } else {
        this.points.push([data.position.lng, data.position.lat])
        let path = []
        this.points.forEach(item => {
          path.push(new AMap.LngLat(item[0], item[1]))
        })
        // 绘制线，点大于1之后
        if (this.curPolyline) {
          this.mapObj.remove(this.curPolyline)
        }
        this.curPolyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 1,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 8,
          // 折线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          showDir: true
        })
        this.mapObj.add(this.curPolyline)

        if (this.endMarker) {
          this.mapObj.remove(this.endMarker)
        }
        var endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-95, -3)
        })
        this.endMarker = new AMap.Marker({
          position: new AMap.LngLat(data.position.lng, data.position.lat),
          icon: endIcon,
          offset: new AMap.Pixel(-13, -30)
        })
        this.mapObj.add(this.endMarker)
        // this.mapObj.setZoomAndCenter(12, [data.position.lng, data.position.lat])
        this.mapObj.setCenter(new AMap.LngLat(data.position.lng, data.position.lat))
      }
    },
    onLocationComplete (data) {
      // // console.log(data)
      // document.getElementById('status').innerHTML = '定位成功'
      // var str = []
      // str.push('定位结果：' + data.position)
      // str.push('定位类别：' + data.location_type)
      // if (data.accuracy) {
      //   str.push('精度：' + data.accuracy + ' 米')
      // } // 如为IP精确定位结果则没有精度信息
      // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
      // document.getElementById('result').innerHTML = str.join('<br>')

      if (this.curMarker) {
        this.mapObj.remove(this.curMarker)
      }
      let locIcon = new AMap.Icon({
        size: new AMap.Size(23, 23),
        image: require('@/assets/img/loc.png'),
        imageOffset: new AMap.Pixel(0, 0),
        imageSize: new AMap.Size(23, 23)
      })

      let lng = 109.656347
      let lat = 31.100665
      // let lng = data.position.lng
      // let lat = data.position.lat

      this.curMarker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        title: data.formattedAddress,
        icon: locIcon, // require('@/assets/img/loc.png'),
        offset: new AMap.Pixel(-11, -11)
      })
      this.mapObj.add(this.curMarker)
      // this.mapObj.setZoomAndCenter(10, [data.position.lng, data.position.lat])
      // 添加距离范围圆圈
      this.addCircle(lng, lat, this.coordinateRangeValue)
      // 加载项目
      this.getList(lng, lat, this.coordinateRangeValue)
    },
    addCircle (lng, lat, radius) {
      if (this.circle) {
        this.mapObj.remove(this.circle)
      }
      this.circle = new AMap.Circle({
        center: new AMap.LngLat(lng, lat), // 圆心位置
        radius: radius * 1000,
        strokeColor: '#F33',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#ee2200',
        fillOpacity: 0.35
      })
      this.mapObj.add(this.circle)
      this.mapObj.setFitView(null, true)
    },
    showLinesPanel () {
      this.showHis = true
      this.$nextTick(() => {
        this.$refs['linesPanelObj'].onLoad()
      })
    },
    addNewLines (points) {
      if (this.isClock) {
        Notify({ type: 'warning', message: '轨迹记录中，暂时不能查看历史轨迹' })
        return
      }
      this.clearLines()
      this.showHis = false
      let path = []
      this.points = points
      this.points.forEach(item => {
        path.push(new AMap.LngLat(item[0], item[1]))
      })
      // 绘制线，点大于1之后
      if (this.curPolyline) {
        this.mapObj.remove(this.curPolyline)
      }
      this.curPolyline = new AMap.Polyline({
        path: path,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 1,
        strokeColor: '#3366FF',
        strokeOpacity: 1,
        strokeWeight: 8,
        // 折线样式还支持 'dashed'
        strokeStyle: 'solid',
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        showDir: true
      })
      this.mapObj.add(this.curPolyline)
      this.mapObj.setFitView()
    },
    addFeatureClick (feature) {
      try {
        AMap.event.addListener(feature, 'click', (ev) => {
          this.showProject = true
          this.dataAll = this.mapItems[ev.target.Ce.id]
        })
      } catch (e) {
        feature.on('click', (ev) => {
          this.showProject = true
          this.dataAll = this.mapItems[ev.target.Ce.id]
        })
      }
    },
    getList (lng, lat, radius) {
      // let data = `POINT(${lng} ${lat})`
      // // var data = `POINT(109.656347 31.100665)` // 109.656347 31.100665
      // let param = {coordinatePoint_wkt: data, coordinateRange: radius * 1000, pageNum: 1, pageSize: 10000}
      // this.mapItems = {}
      // http['queryProjectBasicInfosByPointRange'](param).then(res => {
      //   let {dataList, dataTotal} = res.data.data
      //   if (dataList && dataList.length) {
      //     // console.log(dataList, dataTotal)
      //     dataList.forEach(item => {
      //       if (item.wkt && item.wkt.length > 0) {
      //         // console.log(item.wkt)
      //         this.mapItems[item.id] = item
      //         let geoJSON = WKT.parse(item.wkt)
      //         // console.log(geoJSON)
      //         let feature
      //         if (geoJSON.type === 'Point') {
      //           feature = new AMap.Marker({
      //             position: new AMap.LngLat(geoJSON.coordinates[0], geoJSON.coordinates[1]),
      //             title: item.projectName,
      //             id: item.id
      //           })
      //           this.mapObj.add(feature)
      //           this.features.push(feature)
      //         } else if (geoJSON.type === 'LineString') {
      //           // console.log(item)
      //           let path = []
      //           geoJSON.coordinates.forEach(item => {
      //             path.push(new AMap.LngLat(item[0], item[1]))
      //           })
      //           feature = new AMap.Polyline({
      //             path: path,
      //             borderWeight: 2,
      //             strokeColor: 'red',
      //             lineJoin: 'round'
      //           })
      //           this.mapObj.add(feature)
      //           this.features.push(feature)
      //         } else if (geoJSON.type === 'Polygon') {
      //           let path = []
      //           geoJSON.coordinates[0].forEach(item => {
      //             path.push(new AMap.LngLat(item[0], item[1]))
      //           })
      //           feature = new AMap.Polygon({
      //             path: path,
      //             fillColor: '#ffe545',
      //             borderWeight: 1,
      //             strokeColor: 'red'
      //           })
      //           this.mapObj.add(feature)
      //           this.features.push(feature)
      //         }
      //         this.addFeatureClick(feature)
      //       }
      //     })
      //   }
      // }).catch((err) => {
      //   // console.log(err)
      // })
    }
  }
}
</script>

<style>
.map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.amap-logo{
  display: none;
  opacity:0 !important;
}
.amap-copyright {
  opacity:0;
}
/*强制位置 2.0的不生效*/
.amap-geolocation{
  right: auto!important;
  left: 15px!important;
}
/*.amap-toolbar{*/
  /*right: auto!important;*/
  /*left: 16px;*/
  /*bottom: 60px!important;*/
/*}*/
.amap-toolbar{
  right: auto!important;
  left: 10px;
  /*bottom: 20px!important;*/
}
.van-icon {
  font-size: 32px;
}
.amap-maptype-list{

}
.amap-ctrl-overlay-layer{
  display: none!important;
}
</style>
-->
