//地图参数配置示例 add by dlw 2020-02-18
/*eslint-disable*/
export const baseMapInitParameters = {
  "type": "2d",//默认只有2d ;如果想同时能随意切换三维，那么 type "23d";如果只有三维 type "3d" (未来扩展还能换引擎)
  "engine": "openlayers",//默认就是ol ,还支持 "arcgis3" "arcgis4" "antV7" 二三维有各种组合
  "view": {
    // 设置地图中心
    center: [108.2, 29.07],
    // 指定投影使用EPSG:4326一个等同于WGS84坐标系，默认是3857
    projection: 'EPSG:4326',
    zoom: 5,
    minZoom: 4,
    maxZoom: 19
  },
  "layers": [
    {
      "name": "矢量",
      "layerName": "light",
      "layerUrl": "http://www.narutogis.com:6080/arcgis/rest/services/mappub_newlight4326/MapServer",
      "layerType": "arcgis_tile",
      "layerIcon":"",
      "visible": true
    },
    {
      "name": "影像",
      "layerName": "dark",
      "layerUrl2": "http://www.narutogis.com:6080/arcgis/rest/services/mappub_newdark4326/MapServer",
      "layerUrl3": "http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer",
      "layerUrl": "http://www.narutogis.com:6080/arcgis/rest/services/China_dark/MapServer",
      "layerType": "arcgis_tile",
      "layerIcon":"",
      "visible": false
    }
  ],
  "controls": {
    //鼠标移动 联动经纬度显示
    "coordinate": {
      "show": true,
      "style":"\"position: absolute;top:auto;bottom:0;left:calc(50% - 50px);width: 200px;  height: 20px;  z-index: 2000\""
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
