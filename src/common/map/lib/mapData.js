/*eslint-disable*/
export const baseMapInitParameters = {
  "type": "2d",//默认只有2d ;如果想同时能随意切换三维，那么 type "23d";如果只有三维 type "3d" (未来扩展还能换引擎)
  "engine": "openlayers",//默认就是ol ,还支持 "arcgis3" "arcgis4" "antV7" 二三维有各种组合
  "view": {
    // 设置地图中心
    center: [108.2, 29.07],
    // 指定投影使用EPSG:4326一个等同于WGS84坐标系
    projection: 'EPSG:4326',
    zoom: 10,
    minZoom: 4,
    maxZoom: 10
  },
  "layers": [
    {
      "name": "矢量",
      "layerName": "pb",
      "layerUrl": "/acgisServer/tdt/map/{z}/{x}/{y}.png",
      "layerType": "XYZ",
      "visible": true
    },
     {
      "name": "矢量",
      "layerName": "pbi",
      "layerUrl": "/acgisServer/tdt/mapi/{z}/{x}/{y}.png",
      "layerType": "XYZ",
      "visible": true
    },
    {
      "name": "影像",
      "layerName": "image",
      "layerUrl": "/acgisServer/tdt/img/{z}/{x}/{y}.png",
      "layerType": "XYZ",
      "layerIcon":"",
      "visible": false
    }
  ],
  "controls": {
    //鼠标移动 联动经纬度显示
    "coordinate": {
      "show": true,
      "style":"position: absolute;top:auto;bottom:30px;left:calc(50% - 50px);width: 200px;  height: 20px;  z-index: 2000"
    },
    //地图底图切换
    "mapswitch": {
      "show": false,
      "style":"\"position: absolute;top:auto;bottom:30px;left:calc(50% - 50px);width: 200px;  height: 100px;  z-index: 2000\""
    },
    //控制地图全图的，还有点问题这个
    "fullScreen": {
      "show": false
    }
  }
}
