<!--
<template>
  <div class="Draw">
    <div id="mapContainer" class="map" ></div>
    <van-nav-bar
      title="画地块"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row class="rowClass">
      <van-col span="12">
        <van-button round type="info" size="normal">手绘</van-button>
      </van-col>
      <van-col span="12">
        <van-button round type="default" size="normal">GPS测量</van-button>
      </van-col>
    </van-row>
    <div class="DrawFoot">
      <van-row class="rowClassFoot">
        <van-col span="4" class="DrawFootCol">
          <img src="../../img/select.png" alt="">
          <span>选择</span>
        </van-col>
        <van-col offset="6" span="4" class="DrawFootCol">
          <img src="../../img/back.png" alt="">
          <span>回撤</span>
        </van-col>
        <van-col offset="6" span="4" class="DrawFootCol">
          <img src="../../img/finish.png" alt="">
          <span>完成</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
// var WKT = require('terraformer-wkt-parser')
var AMap = null
export default {
  data () {
    return {
    }
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
        // AMap.plugin(['AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation'], () => {
        //   var toolbar = new AMap.ToolBar()
        //   this.mapObj.addControl(toolbar)
        //   var MapType = new AMap.MapType()
        //   this.mapObj.addControl(MapType)
        //   this.geolocation = new AMap.Geolocation({
        //     enableHighAccuracy: true,
        //     timeout: 10000,
        //     buttonPosition: 'LB',
        //     buttonOffset: new AMap.Pixel(10, 20),
        //     zoomToAccuracy: true
        //   })
        // })
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
    onClickLeft () {
      this.$router.push({path: '/Tool'})
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.Draw{
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title{
      color: #fff !important;
    }
  }
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .rowClass{
    .h(120);
    .lh(90);
    width: 100%;
    position: fixed;
    z-index: 10;
    background-color: rgba(178, 178, 178, .5);
    text-align: center;
    button{
      .w(200);
    }
  }
  .DrawFoot{
    position: fixed;
    z-index: 10;
    width: 100%;
    .bottom(40);
    .h(130);
    .rowClassFoot{
      width: 90%;
      margin: 0 auto;
      height: 100%;
      .lh(50);
      background-color: rgba(255, 255, 255);
      .b-radius(10);
      .DrawFootCol{
        text-align: center;
        img{
          width: 100%;
        }
        span{
          .mt(-40);
          display: inherit;
          .fs(20);
          color: #bbb;
        }
      }
    }
  }
}
</style>
-->
