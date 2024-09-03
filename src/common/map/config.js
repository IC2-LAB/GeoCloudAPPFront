/*eslint-disable*/
import {ipUrlConfig} from '@/utils/common'
// 外网
// let qzmap = localStorage.getItem('map') === null ? ipUrlConfig().map : localStorage.getItem('map')
// let qzgeoserver = localStorage.getItem('geoserver') === null ? ipUrlConfig().geoserver : localStorage.getItem('geoserver')
// let qzlocalImageserver = localStorage.getItem('localImageserver') === null ? ipUrlConfig().localImageserver : localStorage.getItem('localImageserver')
// let bendi = localStorage.getItem('bendi') === null ? ipUrlConfig().bendi : localStorage.getItem('bendi')
// 内网
let qzmap = process.env.NODE_ENV === 'production' ? ipUrlConfig().map : '/qz/map'
let qzgeoserver = process.env.NODE_ENV === 'production' ? ipUrlConfig().geoserver : '/qz/geoserver'
let qzlocalImageserver = process.env.NODE_ENV === 'production' ? ipUrlConfig().localImageserver : '/qz/localImageserver'
let bendi = process.env.NODE_ENV === 'production' ? ipUrlConfig().bendi : '/qz/bendi'
export default {
  'type': '2d',
  'engine': 'openlayers',
  'view': {
    // center: [116.55, -45.57],
    center: [116.55, 35.57],
    projection: 'EPSG:4326',
    zoom: 5 ,
    minZoom: 4,
    maxZoom: 19
  },
  'layers': [
    //  {
    //   "name": "矢量",
    //   "layerName": "sl",
    //   "layerUrl": "http://t1.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6557db1c1a37d8ef0762d6efd494ab77",
    //   "layerType": "XYZ",
    //   "visible": true
    // },
    // {
    //   "name": "影像",
    //   "layerName": "yx",
    //   "layerUrl": "http://t5.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6557db1c1a37d8ef0762d6efd494ab77",
    //   "layerType": "XYZ",
    //   "layerIcon":"",
    //   "visible": false
    // },
    // {
    //   "name": "sc_zhxm:regbj",
    //   "layerName": "sc_zhxm:regbj",
    //   "layerUrl": "/sc/scly/geoserver/sc_zhxm/wms",
    //   "layerType": "WMS",
    //   "layerIcon":"",
    //   "visible": true
    // },
    // {
    //   "name": "sc_zhxm:wlbj",
    //   "layerName": "sc_zhxm:wlbj",
    //   "layerUrl": "/sc/scly/geoserver/sc_zhxm/wms",
    //   "layerType": "WMS",
    //   "layerIcon":"",
    //   "visible": true
    // }
    {
      "name": "影像",
      "layerName": "yx",
      "layerType": "XYZ",
      // 在线底图
      "layerUrl": 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f09b5f106ccb1b3172b79dad5bbdfc65',
      // 离线底图
      //"layerUrl": "/arcgisServer/tdt/map/{z}/{x}/{y}.png",
      "layerIcon":"",
      "visible": true
    },
    {
      "name": "影像",
      "layerName": "yxz",
      "layerType": "XYZ",
      "layerUrl": 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f09b5f106ccb1b3172b79dad5bbdfc65',
      //"layerUrl": "/arcgisServer/tdt/mapi/{z}/{x}/{y}.png",
      "layerIcon":"",
      "visible": true
    }
    /*{
      "name": "浙江影像",
      "layerName": "zjyx",
      "layerUrl": "https://ditu.zjzwfw.gov.cn/services/wmts/imgmap/default/oss?token=a499a0bfcce19d01fc606d3a7afb442e&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=imgmap&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpgpng",
      "layerType": "XYZ4326",
      "layerIcon":"",
      "visible": false
    },
    // {
    //   "name": "国家级公益林分布图",
    //   "layerName": "国家级公益林分布图",
    //   "layerUrl": qzmap + "/lygt/e8124edf109346edbf390e4ab379bcd5/arcgis/rest/services/GCS330825_1010_GJJGYLFBT/GCS330825_1010_GJJGYLFBT/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    //  {
    //   "name": "省级公益林分布图",
    //   "layerName": "省级公益林分布图",
    //   "layerUrl": qzmap + "/lygt/e8124edf109346edbf390e4ab379bcd5/arcgis/rest/services/GCS330825_1010_GJJGYLFBT/GCS330825_1010_GJJGYLFBT/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    // {
    //   "name": "省级生态公益林分布",
    //   "layerName": "省级生态公益林分布",
    //   "layerUrl": qzmap + "/qzgt18/23aed4917dc44204af826940a7be69f6/arcgis/rest/services/GCS330800_1010_LYZY/GCS330800_1010_SJSTGYLFB/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    //  {
    //   "name": "植被与土质",
    //   "layerName": "植被与土质",
    //   "layerUrl": qzmap + "/qzgt16/40f36033247544d480e8ebb8cc6e045f/arcgis/rest/services/GCS330800_1001_JCDL/GCS330800_1001_JCDL_ZBYTZ/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    // {
    //   "name": "2018年地类图斑",
    //   "layerName": "2018年地类图斑",
    //   "layerUrl": qzmap + "/qzgt18/bfe7fd3116004eeeaf2b13f61bc49de7/arcgis/rest/services/GCS330800_1002_TDLYXZ_2018/GCS330800_1002_TDLYXZ_DLTB_2018/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    {
      "name": "中心区",
      "layerName": "piesat:中心区",
      "layerUrl": qzgeoserver + "/piesat/wms",
      "layerType": "WMS",
      "visible": true
    },
    // {
    //   "name": "风光带",
    //   "layerName": "piesat:风光带",
    //   "layerUrl": qzgeoserver + "/piesat/wms",
    //   "layerType": "WMS",
    //   "visible": false
    // },
    {
      "name": "样板区",
      "layerName": "piesat:样板区",
      "layerUrl": qzgeoserver + "/piesat/wms",
      "layerType": "WMS",
      "visible": false
    },
    // {
    //   "name": "特色点",
    //   "layerName": "piesat:衢州-特色点",
    //   "layerUrl": qzgeoserver + "/piesat/wms",
    //   "layerType": "WMS",
    //   "visible": false
    // },
    // {
    //   "name": "计划资金分布",
    //   "layerName": "计划资金分布",
    //    "layerUrl": qzlocalImageserver + "/qz/zijin/{z}/{x}/{y}.png",
    //   "layerType": "XYZ4326",
    //   "visible": false
    // },
    // {
    //   "name": "2021设计成果",
    //   "layerName": "2021设计成果",
    //   "layerUrl": bendi + "/arcgis/rest/services/qz_2021/MapServer",
    //   "layerType": "arcgis",
    //   "visible": false
    // },
    // taylor
    {
      "name": "遥感影像2018年",
      "layerName": "遥感影像2018年",
      "layerType": "arcgis",
      "layerUrl": bendi + "/arcgis/rest/services/kh201801/MapServer",
      "visible": false
    },
    {
      "name": "遥感影像2020年",
      "layerName": "遥感影像2020年",
      "layerType": "XYZ4326",
      "layerUrl": qzlocalImageserver + "/qzszlh/kh/{z}/{x}/{y}.png",
      "visible": false
    },
    {
      "name": "遥感影像2021年",
      "layerName": "遥感影像2021年",
      "layerType": "XYZ4326",
      "layerUrl": qzlocalImageserver + "/qzszlh/img08-qz/{z}/{x}/{y}.png",
      "visible": false
    },
    // 行政边界在最上面
    {
      "name": "浙江行政区划图",
      "layerName": "行政区划图",
      "layerUrl": qzlocalImageserver + "/qzszlh/Qzssjj/{z}/{x}/{y}.png",
      "layerType": "XYZ4326",
      "visible": true
    },
    {
      "name": "行政区划图",
      "layerName": "行政区划图",
      "layerUrl": qzlocalImageserver + "/qzszlh/Quzhouquhua/{z}/{x}/{y}.png",
      "layerType": "XYZ4326",
      "visible": true
    }*/
  ],
  'controls': {
    //鼠标移动 联动经纬度显示
    'coordinate': {
      'show': false,
      'style':'\'position: absolute;top:auto;bottom:0;left:calc(50% - 50px);width: 200px;  height: 20px;  z-index: 2000\''
    },
    //地图底图切换
    'mapswitch': {
      'show': false,
      'style':'\'position: absolute;top:auto;bottom:30px;left:calc(50% - 50px);width: 200px;  height: 100px;  z-index: 2000\''
    },
    //控制地图全图的，还有点问题这个
    'fullScreen': {
      'show': false
    }
  }
}
