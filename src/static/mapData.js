/*eslint-disable*/
export const baseMapInitParameters = {
  "view": {
    // 设置地图中心
    center: [108.2, 29.07],
    // 指定投影使用EPSG:4326一个等同于WGS84坐标系
    projection: 'EPSG:4326',
    zoom: 1,
    minZoom: 4,
    maxZoom: 19
  },
  // todo
  "layers": [
    //   {
    //     "name": "影像",
    //     "layerName": "lyrs",
    //     "layerUrl": "http://10.1.100.154:8084/tdt/img/{z}/{x}/{y}.png",
    //     "layerType": "XYZ",
    //     "visible": true
    //   },
    {
      "name": "矢量",
      "layerName": "pb",
      // "layerUrl":"http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=a5e26349bb90e852754c59c28e79b853",
      // "layerUrl":'/arcgisServer/tdt/map/{z}/{x}/{y}.png',
      "layerUrl": window.mapConfigZ.url_mapline,
      "layerType": "XYZ",
      "visible": true
    },
    {
      "name": "矢量标注",
      "layerName": "pbi",
      // "layerUrl": "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=a5e26349bb90e852754c59c28e79b853",
      // "layerUrl": '/arcgisServer/tdt/mapi/{z}/{x}/{y}.png',
      "layerUrl": window.mapConfigZ.url_mapline_bz,
      "layerType": "XYZ",
      "visible": true
    }
    // {
    //  "name": "ceshi",
    //  "layerName": "ceshi",
    //  "layerUrl": "/arcgisServer/arcgis/rest/services/HBLY/BHJC_DataService/MapServer",
    //  "layerType": "arcgis",
    //  "visible": true
    // }
  ],
  "controls": {
    //鼠标移动 联动经纬度显示
    "coordinate": {
      "show": true,
      "style":" transition: right 0.8s;position: absolute;top:auto;bottom:15px;right:27%;z-index: 2000;background: #fff;border-radius: 4px;padding: 3px 5px;"
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
