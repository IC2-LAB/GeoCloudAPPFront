/* eslint-disable */
import Map from "ol/Map"
import store from '@/store/index.js'
import Vue from 'vue/dist/vue.esm.js'
import http from '@/service/interface.js'
import View from "ol/View"
import Overlay from 'ol/Overlay'
import Tile from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import Vector from "ol/source/Vector"
import VEctor from "ol/layer/Vector"
import Fill from "ol/style/Fill"
import Stroke from "ol/style/Stroke"
import Style from "ol/style/Style"
import Text from "ol/style/Text"
import Circle from "ol/style/Circle"
import WKT from "ol/format/WKT"
import Draw from "ol/interaction/Draw"
import VectorLayer from "ol/layer/Vector"
import MousePosition from 'ol/control/MousePosition'
import {createStringXY} from 'ol/coordinate'
import VectorSource from "ol/source/Vector"
import {
  createBox
} from "ol/interaction/Draw"
import Polygon from "ol/geom/Polygon"
import LineString from "ol/geom/LineString"
import Point from "ol/geom/Point"
import Feature from "ol/Feature"
import {
  getArea,
  getLength
} from "ol/sphere"
import {
  unByKey
} from "ol/Observable"
import ImageLayer from 'ol/layer/Image'
import Icon from 'ol/style/Icon'
import {
  getCenter,
  getHeight
} from 'ol/extent.js'
import Projection from 'ol/proj/Projection'
import Static from 'ol/source/ImageStatic'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import {
  Message
} from 'element-ui'

import $ from 'jquery'
String.prototype.myReplace=function(f,e){
  var reg = new RegExp(f,"g"); //创建正则RegExp对象
  return this.replace(reg,e);
}

// import Cesium from 'cesium/Cesium'
// noinspection ES6UnusedImports
// import widgets from 'cesium/Widgets/widgets.css'
//
// $('<style>.red:before{background-color:green}</style>').appendTo('head');
/**
 * openlayer5.3 ,Cesium1.5.4地图核心js
 * @author kbh 2019年1月29日14:30:59
 */
// var gisMap = {}
//var baseMapLayers=[];//基础底图图层
//var specialMapLayers=[];//专题地图图层
//var contrastMapLayers=[];//对比地图图层
//var featureLayers=[];//要素地图图层
//var initcallbackfunc = null;
//zIndex说明
//0-10级地图地图
//11-30专题图
//31-40标绘地图
export const gisMap = {
  resolution: {
    "5.36441802978515E-06": "3000", //街道18
    "1.07288360595703E-05": "6000", //17
    "2.1457672119140625E-05": "12000", //16
    "4.29153442382814E-05": "25000", //15
    "8.58306884765629E-05": "50000", //14
    "0.000171661376953125": "100000", //13
    "0.00034332275390625": "2000000", //12
    "0.0006866455078125": "400000", //11
    "0.001373291015625": "800000", //10
    "0.00274658203125": "1500000", //9
    "0.0054931640625": "3000000", //8
    "0.010986328125": "6000000", //7
    "0.02197265625": "12000000", //6
    "0.0439453125": "25000000", //5
    "0.087890625": "50000000", //4
    "0.17578125": "100000000", //3
    "0.3515625": "2000000000", //2
    "0.703125": "400000000" //1
  },
  twoDMapDivObj: null,
  twoDMapDivObj0: null,
  twoDMapDivObj1: null,
  twoDMapDivObj2: null,
  twoDMapDivObj3: null,
  twoDMapDiv: null, //2ddiv
  threeDMapDiv: null, //3ddiv
  threeDMap: null, //3d地图对象
  threeDMapImagerLayers: null,
  threeDMapLayers: [],
  baseMapLayers: [], //2d基础底图图层
  baseMapLayers0: [],
  baseMapLayers1: [],
  baseMapLayers2: [],
  baseMapLayers3: [],
  baseMapInitParameters: [], ///初始化参数
  specialMapLayers: [], //2d专题地图图层
  specialMapLayer: null, //2d专题地图图层
  overlayLayers: [], //贴图图层
  overlayLayer: null, //贴图图层
  m: {},
  initcallbackfunc: null,
  maps: [],
  mapTargetDivs: [], //地图对象集合
  outputD: 0,
  map: null, //2d地图对象
  map0: null,
  map1: null,
  map2: null,
  map3: null,
  gisMapContentDiv: null,
  heitht: '',
  swipe: null, //席卷对象
  drawSource: new Vector({
    wrapX: false
  }),
  drawSoruceVectorLayer: null, //绘图图层
  measureSource: new Vector(),
  measureSoruceVectorLayer: null, //测量图层
  featuresSource: new Vector(),
  featuresSourcePageImage: new Vector(),
  featuresSourceAllImage: new Vector(),
  featuresSourceVectorLayer: null, //标绘图层
  featuresSourceVectorLayerPageImage: null, //标绘图层每页的景
  featuresSourceVectorLayerAllImage: null, //标绘图层全部的景
  darwState: false,
  viewC: {},
  viewArrCy: [],
  viewArrIndexCy: 0,
  isReplayCy: false,
  viewCy: {},
  sourceFeature: {},
  controlLayerComponent: {},
  bookListData: [],
  bookListComponent: {},
  featurePopInfo: {
    "isFeaturePopOpen": false,
    "container": null,
    "content": null,
    "closer": null,
    "contentInfo": null
  },
  featurePop: null,
  draw: null, //绘图对象
  drawData: null,
  view: null,
  // 分屏图层数组
  swipeSpecialMapLayers: [],
  // 分屏图层顺序
  ZindexCy: 10,
  // 分屏事件监听
  fenpingListener: null,
  drawInfo: {
    "isDraw": false,
    /**
     * 当前绘制的要素（Currently drawn feature.）
     * @type {Feature}
     */
    "sketch": null,
    /**
     * 帮助提示框对象（The help tooltip element.）
     * @type {Element}
     */
    "helpTooltipElement": null,
    /**
     *帮助提示框显示的信息（Overlay to show the help messages.）
     * @type {Overlay}
     */
    "helpTooltip": null,
  },
  measure: null, //测距对象
  measureInfo: {
    "measureTooltips": [],
    "isMeasure": false,
    "isMeasureArea": false,
    /**
     * 当前绘制的要素（Currently drawn feature.）
     * @type {Feature}
     */
    "sketch": null,
    /**
     * 帮助提示框对象（The help tooltip element.）
     * @type {Element}
     */
    "helpTooltipElement": null,
    /**
     *帮助提示框显示的信息（Overlay to show the help messages.）
     * @type {Overlay}
     */
    "helpTooltip": null,
    /**
     * 测量工具提示框对象（The measure tooltip element. ）
     * @type {Element}
     */
    "measureTooltipElement": null,
    /**
     * 测量工具提示框内容对象（The measure tooltip Content element. ）
     * @type {Element}
     */
    "measureTooltipContentElement": null,
    /**
     *测量工具中显示的测量值（Overlay to show the measurement.）
     * @type {Overlay}
     */
    "measureTooltip": null,
    /**
     *  当用户正在绘制多边形时的提示信息文本
     * @type {string}
     */
    "continuePolygonMsg": '双击结束',
    /**
     * 当用户正在绘制线时的提示信息文本
     * @type {string}
     */
    "continueLineMsg": '双击结束',
    "measureResults": [],
    /**
     * 测量工具提示框关闭对象（The measure tooltip close element. ）
     * @type {Element}
     */
    "measureTooltipCloseElement": null,
    "measureTooltipId": 0,
    "measureTooltipElements": [],
    "measureResult": null,
    "lastPoint": null
  },
  /**
   * @Description:  //初始化地图
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  baseMapInit: function(baseMapInitParameters, initcallback, gisMapContentDiv, twoDMapDiv, threeDMapDiv, flage) {
    gisMap.baseMapInitParameters = baseMapInitParameters
    gisMap.viewCy = this.baseMapInitParameters.view
    gisMap.gisMapContentDiv = gisMapContentDiv
    this.view = new View(baseMapInitParameters.view)
    if (gisMapContentDiv != null) {
      $('<style>.map {\n' +
        '            width: 100%;\n' +
        '            height: 100%;\n' +
        '            position: absolute;\n' +
        '            box-sizing: border-box;\n' +
        '            padding: 0;\n' +
        '            margin: 0;\n' +
        '            float:left;\n' +
        // '            border-left: 2px solid #333;\n' +
        '        }</style>').appendTo('head')
      var swipe = " <div id=\"swipe\" class=\"swipe_bg\" title=\"水平拖动\" style=\"visibility: hidden\" onmouseover=\"this.style.cursor='w-resize'\" onmouseout=\"this.style.cursor='default'\">\n" +
        "        <div class=\"swipe_drag\">\n" +
        "        </div>\n" +
        "    </div>";
      $("#" + gisMapContentDiv + "").append(swipe)
      $('<style> .swipe_bg {\n' +
        '            position: absolute;/*相对于父div占满*/\n' +
        '            z-index: 10;\n' +
        '            width: 4px;\n' +
        '            background-color:rgb(216,216,216);\n' +
        '            border: 1px solid #848484;\n' +
        '        }</style>').appendTo('head');
      $('<style>.swipe_drag {\n' +
        '            border-radius:5px;\n' +
        '            left:-10px;\n' +
        '            top:50%;\n' +
        '            bottom:50%;\n' +
        '            position: absolute;\n' +
        '            width: 24px;\n' +
        '            height: 34px;\n' +
        '            background-color:rgb(216,216,216);\n' +
        '            background-image:url(../common/js/gis_plugin/swipe/vDrag.png);\n' +
        '            background-repeat:no-repeat;\n' +
        '            background-size:100% 100%;\n' +
        '            -moz-background-size:100% 100%;\n' +
        '            border:  solid 1px #848484;\n' +
        '        }</style>').appendTo('head')
      gisMap.initcallbackfunc = initcallback;
      gisMap.twoDMapDiv = twoDMapDiv;
      gisMap.threeDMapDiv = threeDMapDiv;
      if (gisMap.twoDMapDiv != null) {
        //初始化2d地图
        gisMap.map = new Map({
          layers: gisMap.baseMapLayerInit(gisMap.baseMapInitParameters),
          target: gisMap.twoDMapDiv,
          view: gisMap.view
        })
        for (let j = 0; j < 4; j++) {
          var targetDiv = "div" + j;
          gisMap.mapTargetDivs.push(targetDiv);
          var mapDiv = " <div id=" + targetDiv + " class=\"map\" >" +
            "        </div>\n";
          $("#" + gisMap.gisMapContentDiv + "").append(mapDiv);
          // switch (j) {
          //   case 0:
          //     {
          //       //0
          //       gisMap.map0 = new Map({
          //         layers: gisMap.baseMapLayerInit0(gisMap.baseMapInitParameters),
          //         target: targetDiv,
          //         views: gisMap.map.getView()
          //       });
          //       break;
          //     }
          //   case 1:
          //     {
          //       // 1
          //       gisMap.map1 = new Map({
          //         layers: gisMap.baseMapLayerInit1(gisMap.baseMapInitParameters),
          //         target: targetDiv,
          //         views: gisMap.map.getView()
          //       });
          //       break;
          //     }
          //   case 2:
          //     {
          //       // 2
          //       gisMap.map2 = new Map({
          //         layers: gisMap.baseMapLayerInit2(gisMap.baseMapInitParameters),
          //         target: targetDiv,
          //         views: gisMap.map.getView()
          //       });
          //       break;
          //     }
          //   case 3:
          //     {
          //       // 3
          //       gisMap.map3 = new Map({
          //         layers: gisMap.baseMapLayerInit3(gisMap.baseMapInitParameters),
          //         target: targetDiv,
          //         views: gisMap.map.getView()
          //       });
          //       break;
          //     }
          // }
        }
      }
      // // console.log(gisMap.threeDMapDiv)
      // if (gisMap.threeDMapDiv != null) {
      //   //初始化3d地图
      //   gisMap.threeDMap = new Cesium.Viewer(gisMap.threeDMapDiv, {
      //     animation: false, //是否显示动画控件
      //     homeButton: false, //是否显示home键
      //     geocoder: false, //是否显示地名查找控件        如果设置为true，则无法查询
      //     baseLayerPicker: false, //是否显示图层选择控件
      //     timeline: false, //是否显示时间线控件
      //     fullscreenButton: true, //是否全屏显示
      //     scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      //     infoBox: false, //是否显示点击要素之后显示的信息
      //     sceneModePicker: false, //是否显示投影方式控件  三维/二维
      //     navigationInstructionsInitiallyVisible: false,
      //     navigationHelpButton: false, //是否显示帮助信息控件
      //     selectionIndicator: false, //是否显示指示器组件
      //     //加载谷歌卫星影像
      //     //imageryProvider : new Cesium.UrlTemplateImageryProvider({url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"})
      //   });
      //   gisMap.threeDMap._cesiumWidget._creditContainer.style.display = "none"; //	去除版权信息
      //
      //   gisMap.threeDMapImagerLayers = gisMap.threeDMap.imageryLayers;
      //   for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      //     var baseMaplayer = baseMapInitParameters.layers[i];
      //     switch (baseMaplayer.layerType) {
      //       case "XYZ":
      //         var layer = gisMap.threeDMapImagerLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //           url: baseMaplayer.layerUrl,
      //           visible: baseMaplayer.visible
      //         }));
      //         gisMap.threeDMapLayers.push(baseMaplayer);
      //         break;
      //     }
      //   }
      //   var resolution = gisMap.map.getView().getResolution();
      //   var scale = gisMap.resolution[resolution]
      //   gisMap.threeDMap.camera.flyTo({
      //     destination: Cesium.Cartesian3.fromDegrees(baseMapInitParameters.views.center[0], baseMapInitParameters.views.center[1], scale) //相机飞入点
      //   });
      // }
      if (gisMap.drawSoruceVectorLayer == null) {
        gisMap.drawSoruceVectorLayer = new VEctor({
          source: gisMap.drawSource,
          zIndex: 50
        });
        gisMap.map.addLayer(gisMap.drawSoruceVectorLayer);
      }
      if (gisMap.measureSoruceVectorLayer == null) {
        gisMap.measureSoruceVectorLayer = new VEctor({
          source: gisMap.measureSource,
          style: new Style({ //图层样式
            fill: new Fill({
              //填充颜色
              color: 'rgba(37,241,239,0.2)'
            }),
            stroke: new Stroke({
              color: '#ffcc33', //边框颜色
              width: 2 // 边框宽度
            }),
            image: new Circle({
              radius: 5,
              stroke: new Stroke({
                color: '#ffcc33', //边框颜色
                width: 1
              }),
              fill: new Fill({
                color: '#ffffff' //填充颜色
              }),

            })
          }),
          zIndex: 32
        });
        gisMap.map.addLayer(gisMap.measureSoruceVectorLayer);
        // gisMap.map0.addLayer(gisMap.measureSoruceVectorLayer);
        // gisMap.map1.addLayer(gisMap.measureSoruceVectorLayer);
        // gisMap.map2.addLayer(gisMap.measureSoruceVectorLayer);
        // gisMap.map3.addLayer(gisMap.measureSoruceVectorLayer);
      }
      if (gisMap.featuresSourceVectorLayer == null) {
        gisMap.featuresSourceVectorLayer = new VEctor({
          source: gisMap.featuresSource,
          zIndex: 34
        });
        gisMap.featuresSourceVectorLayer.name = "featuresSourceVectorLayer";
        gisMap.map.addLayer(gisMap.featuresSourceVectorLayer);
        // gisMap.map0.addLayer(gisMap.featuresSourceVectorLayer);
        // gisMap.map1.addLayer(gisMap.featuresSourceVectorLayer);
        // gisMap.map2.addLayer(gisMap.featuresSourceVectorLayer);
        // gisMap.map3.addLayer(gisMap.featuresSourceVectorLayer);
      }
      if (gisMap.featuresSourceVectorLayerAllImage == null) {
        gisMap.featuresSourceVectorLayerAllImage = new VEctor({
          source: gisMap.featuresSourceAllImage,
          zIndex: 33
        });
        gisMap.featuresSourceVectorLayerAllImage.name = "featuresSourceVectorLayerAllImage";
        gisMap.map.addLayer(gisMap.featuresSourceVectorLayerAllImage);
        // gisMap.map0.addLayer(gisMap.featuresSourceVectorLayerAllImage);
        // gisMap.map1.addLayer(gisMap.featuresSourceVectorLayerAllImage);
        // gisMap.map2.addLayer(gisMap.featuresSourceVectorLayerAllImage);
        // gisMap.map3.addLayer(gisMap.featuresSourceVectorLayerAllImage);
      }
      if (gisMap.featuresSourceVectorLayerPageImage == null) {
        gisMap.featuresSourceVectorLayerPageImage = new VEctor({
          source: gisMap.featuresSourcePageImage,
          zIndex: 35
        });
        gisMap.featuresSourceVectorLayerPageImage.name = "featuresSourceVectorLayerPageImage";
        gisMap.map.addLayer(gisMap.featuresSourceVectorLayerPageImage);
        // gisMap.map0.addLayer(gisMap.featuresSourceVectorLayerPageImage);
        // gisMap.map1.addLayer(gisMap.featuresSourceVectorLayerPageImage);
        // gisMap.map2.addLayer(gisMap.featuresSourceVectorLayerPageImage);
        // gisMap.map3.addLayer(gisMap.featuresSourceVectorLayerPageImage);
      }
      // if (gisMap.searchFeaturesSourceVectorLayer == null) {
      //     gisMap.searchFeaturesSourceVectorLayer = new VEctor({
      //         source: gisMap.searchFeaturesSource,
      //         zIndex: 33
      //     });
      //     gisMap.searchFeaturesSourceVectorLayer.name = "searchFeaturesSourceVectorLayer";
      //     gisMap.map.addLayer(gisMap.searchFeaturesSourceVectorLayer);
      //     gisMap.map0.addLayer(gisMap.searchFeaturesSourceVectorLayer);
      //     gisMap.map1.addLayer(gisMap.searchFeaturesSourceVectorLayer);
      //     gisMap.map2.addLayer(gisMap.searchFeaturesSourceVectorLayer);
      //     gisMap.map3.addLayer(gisMap.searchFeaturesSourceVectorLayer);
      // }
      // if (gisMap.overlayLayer == null) {
      //   gisMap.overlayLayer = new ImageLayer({
      //     // source: gisMap.featuresSource,
      //     zIndex: 34
      //   });
      //   gisMap.overlayLayer.name = "overlayLayer";
      //   gisMap.map.addLayer(gisMap.featuresSourceVectorLayer);
      // }
      if (gisMap.featuresSourceVectorLayer != null) {
        gisMap.featureOverlay = new VectorLayer({
          source: new VectorSource(),
          map: gisMap.map,
          style: new Style({
            stroke: new Stroke({
              color: '#f00',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(255,0,0,0.1)'
            })
          })
        });
      }
      gisMap.maps.push(gisMap.map);
      // gisMap.maps.push(gisMap.map0);
      // gisMap.maps.push(gisMap.map1);
      // gisMap.maps.push(gisMap.map2);
      // gisMap.maps.push(gisMap.map3);
      gisMap.twoDMapDivObj = $("#" + gisMap.twoDMapDiv);
      gisMap.twoDMapDivObj0 = $('#div0');
      gisMap.twoDMapDivObj1 = $('#div1');
      gisMap.twoDMapDivObj2 = $('#div2');
      gisMap.twoDMapDivObj3 = $('#div3');
      if (gisMap.mapTargetDivs.length > 0) {
        for (let i = 0; i < gisMap.mapTargetDivs.length; i++) {
          $("#" + gisMap.mapTargetDivs[i] + "").remove();
        }
      }
      gisMap.addControls(baseMapInitParameters.controls)
      gisMap.initPop()
      if (initcallback != null) {
        gisMap.initcallbackfunc('init completed.');
      }
    }
  },
  //添加控件
  addControls(options){
    let data = options||{}
    if(data.hasOwnProperty("coordinate")&&data.coordinate.show){
      //创建地图鼠标移动，经纬度坐标联动显示
      let style = data.coordinate.style||"position: absolute;top:auto;bottom:0;left:calc(50% - 50px);width: 200px;  height: 20px;  z-index: 2000"
      let mousePosition = ' <div style="'+style+'"   id="'+gisMap.twoDMapDiv +'_coordinate"></div>';
      // $("#" + this["own_id"] + "2d").append(mousePosition);
      $("#" + gisMap.twoDMapDiv).append(mousePosition);
      let mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById(gisMap.twoDMapDiv +'_coordinate'),
        undefinedHTML: '&nbsp;'
      });
      gisMap.map.addControl(mousePositionControl);//这个在上边已经加了 ,上边先注释掉
    }
    // if(data.hasOwnProperty("fullScreen")&&data.fullScreen.show){
    //   //将全屏显示控件加载到map中
    //   var fullScreenControl = new FullScreen();
    //   gisMap.map.addControl(fullScreenControl);
    // }
  },
  clearAllDraws: function() {
    gisMap.drawSoruceVectorLayer.getSource().clear();
  },
  clearAllMeasure: function() {
    gisMap.measureSoruceVectorLayer.getSource().clear();
  },
  clearAllFeatures: function() {
    if (gisMap.featuresSourceVectorLayer != null) {
      gisMap.featuresSourceVectorLayer.getSource().clear();
    }
    if (gisMap.featuresSourceVectorLayerAllImage != null) {
      gisMap.featuresSourceVectorLayerAllImage.getSource().clear();
    }
    for (let key in gisMap.m) {
      gisMap.map.removeLayer(gisMap.m[key])
    }
  },
  // 清除当前页图层
  clearCurrentFeatures: function() {
    gisMap.featuresSourceVectorLayer.getSource().clear();
    // gisMap.featuresSourceVectorLayerAllImage.getSource().clear();
  },
  // 清除所有数据画框
  clearCurrentAllFeatures: function() {
    gisMap.featuresSourceVectorLayer.getSource().clear();
    gisMap.featuresSourceVectorLayerAllImage.getSource().clear();
  },
  clearAll: function() {
    gisMap.drawSoruceVectorLayer.getSource().clear();
    gisMap.measureSoruceVectorLayer.getSource().clear();
    gisMap.featuresSourceVectorLayer.getSource().clear();
    gisMap.featuresSourceVectorLayerAllImage.getSource().clear();
    gisMap.featuresSourceVectorLayerPageImage.getSource().clear();
    for (let key in gisMap.m) {
      gisMap.map.removeLayer(gisMap.m[key])
    }
    for (let i = 0; i < gisMap.measureInfo.measureResults.length; i++) {
      var measureTooltips = gisMap.measureInfo.measureResults[i].measureTooltips;
      for (let j = 0; j < measureTooltips.length; j++) {
        let measureTooltip = measureTooltips[j];
        gisMap.map.removeOverlay(measureTooltip);
      }
    }
  },
  clearAllzh: function() {
    // gisMap.drawSoruceVectorLayer.getSource().clear();
    gisMap.measureSoruceVectorLayer.getSource().clear();
    gisMap.featuresSourceVectorLayer.getSource().clear();
    gisMap.featuresSourceVectorLayerAllImage.getSource().clear();
    gisMap.featuresSourceVectorLayerPageImage.getSource().clear();
    for (let key in gisMap.m) {
      gisMap.map.removeLayer(gisMap.m[key])
    }
  },
  // zbb
  removeAll: function() {
    // gisMap.clearAll()
    gisMap.drawSoruceVectorLayer = null
    gisMap.measureSoruceVectorLayer = null
    gisMap.featuresSourceVectorLayer = null
    gisMap.featuresSourceVectorLayerAllImage = null
    gisMap.featuresSourceVectorLayerPageImage = null
    // gisMap.clearAll()
    // gisMap.map.removeLayer(gisMap.featuresSourceVectorLayerAllImage)
    // gisMap.map.removeLayer(gisMap.featuresSourceVectorLayerPageImage)
  },
  removeLayer: function() {
    gisMap.map.removeLayer(gisMap.featuresSourcePageImage)
  },
  drawLayerIndexChange: function(zIndex) {
    gisMap.drawSoruceVectorLayer.values_.zIndex = zIndex;
    gisMap.map.updateSize();
  },
  measureLayerIndexChange: function(zIndex) {
    gisMap.drawSoruceVectorLayer.values_.zIndex = zIndex;
    gisMap.map.updateSize();
  },
  featuresLayerIndexChang: function(zIndex) {
    gisMap.drawSoruceVectorLayer.values_.zIndex = zIndex;
    gisMap.map.updateSize();
  },
  /**
   * @Description:  //创建底图图层
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  baseMapLayerInit: function(baseMapInitParameters) {
    for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = new Tile({
            name: baseMaplayer.name,
            title: baseMaplayer.name,
            source: new XYZ({
              url: baseMaplayer.layerUrl
            }),
            visible: baseMaplayer.visible
          });
          gisMap.baseMapLayers.push(layer);
          break;
        case "arcgis":
          var specialMapLayer = new ImageLayer({
            name: baseMaplayer.name,
            source: new ImageArcGISRest({
              ratio: 1,
              url: baseMaplayer.layerUrl,
              visible: baseMaplayer.visible,
              projection: new Projection({
                units: 'degrees',
                code: 'EPSG:4326'
              })
            })
          })
          gisMap.baseMapLayers.push(specialMapLayer)
          // gisMap.specialMapLayers.push(specialMapLayer);
          // gisMap.map.addLayer(specialMapLayer);
          break;
      }
    }
    return gisMap.baseMapLayers;
  },
  baseMapLayerInit0: function(baseMapInitParameters) {
    for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = new Tile({
            name: baseMaplayer.name,
            title: baseMaplayer.name,
            source: new XYZ({
              url: baseMaplayer.layerUrl
            }),
            visible: baseMaplayer.visible
          });
          gisMap.baseMapLayers0.push(layer);
          break;
      }
    }
    return gisMap.baseMapLayers0;
  },
  baseMapLayerInit1: function(baseMapInitParameters) {
    for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = new Tile({
            name: baseMaplayer.name,
            title: baseMaplayer.name,
            source: new XYZ({
              url: baseMaplayer.layerUrl
            }),
            visible: baseMaplayer.visible
          });
          gisMap.baseMapLayers1.push(layer);
          break;
      }
    }
    return gisMap.baseMapLayers1;
  },
  baseMapLayerInit2: function(baseMapInitParameters) {
    for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = new Tile({
            name: baseMaplayer.name,
            title: baseMaplayer.name,
            source: new XYZ({
              url: baseMaplayer.layerUrl
            }),
            visible: baseMaplayer.visible
          });
          gisMap.baseMapLayers2.push(layer);
          break;
      }
    }
    return gisMap.baseMapLayers2;
  },
  baseMapLayerInit3: function(baseMapInitParameters) {
    for (let i = 0; i < baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = new Tile({
            name: baseMaplayer.name,
            title: baseMaplayer.name,
            source: new XYZ({
              url: baseMaplayer.layerUrl
            }),
            visible: baseMaplayer.visible
          });
          gisMap.baseMapLayers3.push(layer);
          break;
      }
    }
    return gisMap.baseMapLayers3;
  },
  /**
   * @Description:  //切换地图
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  baseMapLayerChange: function(name) {
    for (let i = 0; i < gisMap.baseMapLayers.length; i++) {
      var baseMaplayer = gisMap.baseMapLayers[i];
      if (baseMaplayer.values_.name == name) {
        baseMaplayer.values_.visible = true;
      } else {
        baseMaplayer.values_.visible = false;
      }
    }
    gisMap.map.updateSize();
  },
  /**
   * @Description:  //切换地图,保留图层
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  baseMapLayerChangeVisible: function(name, exceptname) {
    for (let i = 0; i < gisMap.baseMapLayers.length; i++) {
      var baseMaplayer = gisMap.baseMapLayers[i];
      if (baseMaplayer.values_.name == name || baseMaplayer.values_.name.indexOf(exceptname) != -1) {
        baseMaplayer.values_.visible = true;
      } else {
        baseMaplayer.values_.visible = false;
      }

    }
    gisMap.map.updateSize();
  },
  /**
   * @Description:  //创建专题地图图层
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  specialMapLayerInit: function(initSpecialMapParameter) {
    for (let i = 0; i < initSpecialMapParameter.layers.length; i++) {
      var initSpecialMaplayer = initSpecialMapParameter.layers[i];
      switch (initSpecialMaplayer.layerType) {
        case "WMS":
          var layer = new Image({
            name: initSpecialMaplayer.name,
            source: new ImageWMS({
              url: initSpecialMaplayer.layerUrl,
              params: {
                LAYERS: initSpecialMaplayer.layerName,
              }
            }),
            zIndex: 10 + i,
            visible: initSpecialMaplayer.visible
          });
          gisMap.specialMapLayers.push(layer);
          gisMap.map.addLayer(layer);
          break;
      }
    }
  },
  /**
   * @Description:  //显示隐藏专题图层
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  specialMapLayerChange: function(checkLayer) {
    for (let i = 0; i < gisMap.specialMapLayers.length; i++) {
      var specialMapLayer = gisMap.specialMapLayers[i];
      if (specialMapLayer.values_.name == checkLayer.name) {
        specialMapLayer.values_.visible = checkLayer.visible;
        break;
      }
    }
    gisMap.map.updateSize();
  },
  /**
   * @Description:  //指定专题图层显示层级
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  specialMapLayerIndexChange: function(changeLayer) {
    for (let i = 0; i < gisMap.specialMapLayers.length; i++) {
      var specialMapLayer = gisMap.specialMapLayers[i];
      if (specialMapLayer.values_.name == changeLayer.name) {
        specialMapLayer.values_.zIndex = changeLayer.zIndex;
        break;
      }
    }
    gisMap.map.updateSize();
  },
  /**
   * @Description:  //专题图层显示层级上移一级
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  specialMapLayerIndexUp: function(layerName) {
    for (let i = 0; i < gisMap.specialMapLayers.length; i++) {
      var specialMapLayer = gisMap.specialMapLayers[i];
      if (specialMapLayer.values_.name == layerName) {
        specialMapLayer.values_.zIndex = specialMapLayer.values_.zIndex + 1;
        break;
      }
    }
    gisMap.map.updateSize();
  },
  /**
   * @Description://专题图层显示层级下移一级
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/1/31
   */
  specialMapLayerIndexDown: function(layerName) {
    for (let i = 0; i < gisMap.specialMapLayers.length; i++) {
      var specialMapLayer = gisMap.specialMapLayers[i];
      if (specialMapLayer.values_.name == layerName) {
        specialMapLayer.values_.zIndex = specialMapLayer.values_.zIndex - 1;
        break;
      }
    }
    gisMap.map.updateSize();
  },
  /**
   * @Description:通过图层名称获取图层对象
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/1
   */
  getBaseLayer: function(layerName) {
    let layers = gisMap.baseMapLayers;
    var layer = null;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].values_.name == layerName) {
        layer = layers[i];
        break;
      }
    }
    return layer;
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  mapSplitInit: function(number) {
    gisMap.closeSwipe();
    var width = (100 / number);
    var heitht = gisMap.height;
    $("#" + gisMap.twoDMapDiv + "").remove()
    if (gisMap.mapTargetDivs.length > 0) {
      for (let i = 0; i < gisMap.mapTargetDivs.length; i++) {
        $("#" + gisMap.mapTargetDivs[i] + "").remove();
      }
    }
    if (number == 1) {
      $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj);
      $('<style>.map {\n' +
        '            width:' + width + '%;\n' +
        '            height: 100%;\n' +
        '            position: absolute;\n' +
        '            float:left;\n' +
        '        }</style>').appendTo('head');
    } else {
      switch (number) {
        case 2:
          {
            width = 50;
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj0);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj1);
            break;
          }
        case 4:
          {
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj0);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj1);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj2);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj3);
            width = 50;
            heitht = 50;
            break;
          }
        case 3:
          {
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj0);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj1);
            $("#" + gisMap.gisMapContentDiv + "").append(gisMap.twoDMapDivObj2);
          }
      }
      $('<style>.map {\n' +
        '            width:' + width + '%;\n' +
        '            height:' + heitht + '%;\n' +
        '            position: relative;\n' +
        '            float:left;\n' +
        '            border: 1px solid #333;\n' +
        '        }</style>').appendTo('head');
      // var map;
      gisMap.mapTargetDivs = [];
      // gisMap.maps = [];
      for (let j = 0; j < number; j++) {
        var targetDiv = "div" + j;
        gisMap.mapTargetDivs.push(targetDiv);
      }
    }
    gisMap.allMapUpdateSize();
    gisMap.allMapUpdateRender();
    // }
    // }
  },
  allMapUpdateSize: function() {
    gisMap.map.updateSize();
    // gisMap.map0.updateSize();
    // gisMap.map1.updateSize();
    // gisMap.map2.updateSize();
    // gisMap.map3.updateSize();
  },
  allMapUpdateRender: function() {
    gisMap.map.render();
    // gisMap.map0.render();
    // gisMap.map1.render();
    // gisMap.map2.render();
    // gisMap.map3.render();
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  drawPolygon: function(feature) {
    //gisMap.drawSource.clear();
    var style = new Style({
      fill: new Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(255, 255, 255, 0)'
      }),
      stroke: new Stroke({ //边界样式
        color: '#ffcc33',
        width: 20
      })
    });
    if (feature.style) {
      style = new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
          color: feature.style.fillcolor
        }),
        stroke: new Stroke({ //边界样式
          color: feature.style.strokecolor,
          width: feature.style.strokewidth
        })
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    gisMap.sourceFeature = feature
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(gisMap.sourceFeature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    var source = gisMap.drawSoruceVectorLayer.getSource();
    source.addFeature(featureTemp);

  },

  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/27
   */
  openDrawPolygon: function(drawType, callDrawDataFunc, drawToolStyle) {
    gisMap.drawInfo.isDraw = true;
    gisMap.openDrawTool(drawType, callDrawDataFunc, drawToolStyle);
  },
  openDrawRectangle: function(drawType, callDrawDataFunc, drawToolStyle) {
    gisMap.drawInfo.isDraw = true;
    gisMap.openDrawTool(drawType, callDrawDataFunc, drawToolStyle);
  },
  /**
   * @Description:绘图工具
   * @Param:drawType【点：Point，线：LineString，面：Polygon，矩形：Rectangle[Circle]，圆形：Circle，自定义图形：】
   * @return:
   * @Author: kbh
   * @Date: 2019/2/19
   */
  openDrawTool: function(drawType, callDrawDataFunc, drawToolStyle) { // 初始化地图绘制控件
    // alert("1")
    gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
    if (gisMap.drawInfo.helpTooltipElement) {
      if (gisMap.drawInfo.helpTooltipElement.parentNode) {
        gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
      }
    }
    let rings = "";
    $('<style>.drawTooltip {\n' +
      '            position: relative;\n' +
      '            background:#ffffff;\n' +
      '            border-radius: 4px;\n' +
      '            color: #000000;\n' +
      '            padding: 2px 2px;\n' +
      '            opacity: 0.7;\n' +
      '            white-space: nowrap;\n' +
      '            border: 1px solid #000000;\n' +
      '            font-size:6px\n' +
      '        }</style>').appendTo('head');
    gisMap.map.getInteractions().item(1).setActive(false);
    if (gisMap.draw) {
      gisMap.map.removeInteraction(gisMap.draw); //移除绘制图形
    }
    // alert("2")
    gisMap.map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      var helpMsg = '单击绘制'; //当前默认提示信息
      if (gisMap.drawInfo.sketch) {
        helpMsg = "双击结束"
      }
      gisMap.drawInfo.helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
      gisMap.drawInfo.helpTooltip.setPosition(evt.coordinate); //设置帮助提示框的位置
    }); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
    //////////////////////////////////////////////////////////////////////////////
    gisMap.darwState = true;
    var style = new Style({
      //样式填充
      fill: new Fill({
        //填充颜色
        color: 'rgba(37,241,239,0.2)'
      }),
      //笔触
      stroke: new Stroke({
        //笔触颜色
        color: '#ffcc33',
        //笔触宽度
        width: 1
      })
    });
    if (drawToolStyle) {
      style = new Style({
        //样式填充
        fill: new Fill({
          //填充颜色
          color: drawToolStyle.fillcolor
        }),
        //笔触
        stroke: new Stroke({
          //笔触颜色
          color: drawToolStyle.strokecolor,
          //笔触宽度
          width: drawToolStyle.strokewidth
        })
      });
    }
    if (drawType == 'Point') {
      style = new Style({
        //把点的样式换成ICON图标
        fill: new Fill({
          //填充颜色
          color: 'rgba(37,241,239,0.2)'
        }),
        //图形样式，主要适用于点样式
        image: new Circle({
          //半径大小
          radius: 5,
          //填充
          fill: new Fill({
            //填充颜色
            color: '#e81818'
          })
        }),
        //层
        zIndex: 20
      })
    }
    gisMap.drawSoruceVectorLayer.setStyle(style);
    if (gisMap.draw) {
      gisMap.map.removeInteraction(gisMap.draw);
    }

    if (drawType == 'Point') {
      gisMap.draw = new Draw({
        source: gisMap.drawSource,
        type: (drawType),

      });
      gisMap.draw.on('drawstart', function(evt) {
        gisMap.clearAll()
        gisMap.drawInfo.sketch = evt.feature; //绘制的要素
        rings = "";
      }, this);
      gisMap.map.addInteraction(gisMap.draw);
      //创建帮助提示框
      gisMap.drawInfo.helpTooltipElement = document.createElement('div');
      gisMap.drawInfo.helpTooltipElement.className = 'drawTooltip';
      gisMap.drawInfo.helpTooltip = new Overlay({
        element: gisMap.drawInfo.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      gisMap.map.addOverlay(gisMap.drawInfo.helpTooltip);
      gisMap.draw.on('drawend', function(evt) {
        var arr = gisMap.draw.sketchCoords_;
        var rings = "POINT(" + arr[0].toFixed(4) + " " + arr[1].toFixed(4) + ")";
        gisMap.drawData = rings;
        gisMap.map.removeEventListener('pointermove');
        gisMap.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
        gisMap.drawInfo.sketch = null;
        gisMap.drawInfo.isDraw = false;
        gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
        if (gisMap.drawInfo.helpTooltipElement) {
          if (gisMap.drawInfo.helpTooltipElement.parentNode) {
            gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
          }
        }
        if (callDrawDataFunc)
          callDrawDataFunc(rings);
      });
    }
    if (drawType == 'LineString') {
      gisMap.draw = new Draw({
        source: gisMap.drawSource,
        type: (drawType),
        style: style
      });
      gisMap.draw.on('drawstart', function(evt) {
        gisMap.clearAll()
        gisMap.drawInfo.sketch = evt.feature; //绘制的要素
        rings = "";
      }, this);
      gisMap.map.addInteraction(gisMap.draw);
      //创建帮助提示框
      gisMap.drawInfo.helpTooltipElement = document.createElement('div');
      gisMap.drawInfo.helpTooltipElement.className = 'drawTooltip';
      gisMap.drawInfo.helpTooltip = new Overlay({
        element: gisMap.drawInfo.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      gisMap.map.addOverlay(gisMap.drawInfo.helpTooltip);
      gisMap.draw.on('drawend', function(evt) {
        var arr = gisMap.draw.sketchCoords_;
        var rings0 = "";
        for (var i = 0; i < arr.length; i++) {
          rings0 += arr[i][0].toFixed(4) + " " + arr[i][1].toFixed(4) + ",";
        }
        rings += "LINESTRING(" + rings0.substring(0, rings0.length - 1) + ")";
        gisMap.drawData = rings;
        gisMap.map.removeEventListener('pointermove');
        gisMap.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
        gisMap.drawInfo.sketch = null;
        gisMap.drawInfo.isDraw = false;
        gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
        if (gisMap.drawInfo.helpTooltipElement) {
          if (gisMap.drawInfo.helpTooltipElement.parentNode) {
            gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
          }
        }
        if (callDrawDataFunc)
          callDrawDataFunc(rings);
      });
    }
    if (drawType == 'Polygon') {
      gisMap.draw = new Draw({
        source: gisMap.drawSource,
        type: (drawType),
        //style: style
      });
      gisMap.draw.on('drawstart', function(evt) {
        // gisMap.clearAll()
        gisMap.drawInfo.sketch = evt.feature; //绘制的要素
        rings = "";
      }, this);
      gisMap.map.addInteraction(gisMap.draw);
      //创建帮助提示框
      gisMap.drawInfo.helpTooltipElement = document.createElement('div');
      gisMap.drawInfo.helpTooltipElement.className = 'drawTooltip';
      gisMap.drawInfo.helpTooltip = new Overlay({
        element: gisMap.drawInfo.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      gisMap.map.addOverlay(gisMap.drawInfo.helpTooltip);
      gisMap.draw.on('drawend', function(evt) {
        // alert("3")
        var arr = gisMap.draw.sketchCoords_;
        var rings0 = "";
        for (var i = 0; i < arr[0].length; i++) {
          rings0 += arr[0][i][0].toFixed(4) + " " + arr[0][i][1].toFixed(4) + ",";
        }
        rings += "POLYGON((" + rings0 + arr[0][0][0].toFixed(4) + " " + arr[0][0][1].toFixed(4) + "))";


        gisMap.drawData = rings;
        gisMap.map.removeEventListener('pointermove');
        gisMap.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
        gisMap.drawInfo.sketch = null;
        gisMap.drawInfo.isDraw = false;
        gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
        if (gisMap.drawInfo.helpTooltipElement) {
          if (gisMap.drawInfo.helpTooltipElement.parentNode) {
            gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
          }
        }
        if (callDrawDataFunc)
          callDrawDataFunc(rings);
      });
    }
    if (drawType == 'Rectangle') {
      gisMap.draw = new Draw({
        source: gisMap.drawSource,
        type: 'Circle',
        style: style,
        geometryFunction: createBox()
      });
      gisMap.map.addInteraction(gisMap.draw);
      //创建帮助提示框
      gisMap.drawInfo.helpTooltipElement = document.createElement('div');
      gisMap.drawInfo.helpTooltipElement.className = 'drawTooltip';
      gisMap.drawInfo.helpTooltip = new Overlay({
        element: gisMap.drawInfo.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      gisMap.map.addOverlay(gisMap.drawInfo.helpTooltip);
      gisMap.draw.on('drawstart', function(evt) {
        gisMap.clearAll()
        gisMap.drawInfo.sketch = evt.feature; //绘制的要素
        rings = "";
      });
      gisMap.draw.on('drawend', function(evt) {
        var geom = evt.feature.getGeometry();
        var leftuplong = geom.extent_[0];
        var leftuplat = geom.extent_[3];

        var rightuplong = geom.extent_[2];
        var rightuplat = geom.extent_[3];

        var rightbottomlong = geom.extent_[2];
        var rightbottomlat = geom.extent_[1];

        var leftbottomlong = geom.extent_[0];
        var leftbottomlat = geom.extent_[1];
        rings += "POLYGON((" +
          leftuplong.toFixed(4) + " " + leftuplat.toFixed(4) + "," +
          rightuplong.toFixed(4) + " " + rightuplat.toFixed(4) + "," +
          rightbottomlong.toFixed(4) + " " + rightbottomlat.toFixed(4) + "," +
          leftbottomlong.toFixed(4) + " " + leftbottomlat.toFixed(4) + "," +
          leftuplong.toFixed(4) + " " + leftuplat.toFixed(4) + "))";

        gisMap.drawData = rings;
        gisMap.map.removeEventListener('pointermove');
        gisMap.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
        gisMap.drawInfo.sketch = null;
        gisMap.drawInfo.isDraw = false;
        gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
        if (gisMap.drawInfo.helpTooltipElement) {
          if (gisMap.drawInfo.helpTooltipElement.parentNode) {
            gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
          }
        }
        if (callDrawDataFunc)
          callDrawDataFunc(rings);
      }, this);
    }
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  closeDrawTool: function() { //关闭地图绘制控件
    if (gisMap.draw) {
      gisMap.map.removeInteraction(gisMap.draw);
      //gisMap.drawSoruceVectorLayer.getSource().clear();
      gisMap.darwState = false;
    }
  },
  //放大
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  zoomOut: function() {
    gisMap.map.getView().setZoom(gisMap.map.getView().getZoom() + 1);
  },
  //缩小
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  zoomIn: function() {
    gisMap.map.getView().setZoom(gisMap.map.getView().getZoom() - 1);
  },
  //初始化地图
  zoomToInit: function() {
    gisMap.map.getView().setZoom(gisMap.map.getView().getZoom() - 50);
    let d = [111.68266464081933, 35.36046341030467];
    gisMap.map.getView().setCenter(d);
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/27
   */
  openPan: function() {
    gisMap.map.getInteractions().item(2).setActive(true)
    gisMap.closeSwipe()
    gisMap.map.removeEventListener('pointermove');
    gisMap.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
    gisMap.drawInfo.sketch = null;
    gisMap.drawInfo.isDraw = false;
    gisMap.map.removeInteraction(gisMap.draw); //移除测量工具
    if (gisMap.drawInfo.helpTooltipElement) {
      if (gisMap.drawInfo.helpTooltipElement.parentNode) {
        gisMap.drawInfo.helpTooltipElement.parentNode.removeChild(gisMap.drawInfo.helpTooltipElement);
      }
    }
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/27
   */
  closePan: function() {
    gisMap.map.getInteractions().item(2).setActive(false);
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  addIcon: function(feature) {
    var style = new Style({
      /**{olx.style.IconOptions}类型*/
      image: new Icon(
        ({
          // anchor: [0.5, 60],
          // anchorOrigin: 'top-right',
          // anchorXUnits: 'fraction',
          // anchorYUnits: 'pixels',
          // offsetOrigin: 'top-right',
          // // offset:[0,10],
          // //图标缩放比例
          scale: 0.5,
          //透明度
          //opacity: 0.75,
          //图标的url
          src: '../common/js/gis_plugin/img/blueIcon.png'
        })
      )
    });
    if (feature.style) {
      style = new Style({
        /**{olx.style.IconOptions}类型*/
        image: new Icon(
          ({

            //图标缩放比例
            scale: feature.style.imagescale,
            //图标的url
            src: feature.style.imagesrc
          })
        )
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(feature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    gisMap.featuresSource.addFeature(featureTemp);
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  toggleStaticImage: function(isChecked, feature, index) {
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(feature.geometry);
    var sourceProj = gisMap.map.getView().getProjection(); //获取投影坐标系
    if (isChecked) {
      var overlayLayer = new ImageLayer({
        index: index,
        source: new Static({
          url: feature.imagesrc,
          projection: sourceProj,
          imageExtent: featureTemp.getGeometry().getExtent()
        }),
        zIndex: ++gisMap.ZindexCy + 99
      })
      gisMap.m[index] = overlayLayer
      gisMap.overlayLayers.push(gisMap.m)
      gisMap.map.addLayer(gisMap.m[index])
    } else {
      gisMap.map.removeLayer(gisMap.m[index])
      // gisMap.overlayLayers[index].removeLayer(imageLayer)
    }
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  addPoint: function(feature,source) {
    //gisMap.drawSource.clear();
    var style = new Style({
      //把点的样式换成ICON图标
      fill: new Fill({
        //填充颜色
        color: 'rgba(37,241,239,0.2)'
      }),
      //图形样式，主要适用于点样式
      image: new Circle({
        //半径大小
        radius: 3,
        //填充
        fill: new Fill({
          //填充颜色
          color: '#0009e8'
        })
      }),
      //层
      zIndex: 20
    })
    if (feature.style) {
      feature.geometry == ''
      style = new Style({
        //填充色
        fill: new Fill({
          color: feature.style.fillcolor
        }),
        //边线颜色
        stroke: new Stroke({
          color: feature.style.strokecolor,
          width: feature.style.strokewidth
        }),
        //形状
        image: new Circle({
          //半径大小
          radius: 2,
          //填充
          fill: new Fill({
            //填充颜色
            color: '#4be309'
          })
        }),
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(feature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    if (source) {
      if (source === "featuresSourcePageImage") { //范围框图层
        gisMap.featuresSourcePageImage.addFeature(featureTemp);
      }
      if (source === "featuresSourceAllImage") { //合并面图层
        gisMap.featuresSourceAllImage.addFeature(featureTemp);
      }
    } else {
      gisMap.featuresSource.addFeature(featureTemp);
    }
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  addLineString: function(feature) {
    //gisMap.drawSource.clear();
    var style = new Style({
      fill: new Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(255, 255, 255, 0)'
      }),
      stroke: new Stroke({ //边界样式
        color: '#ffcc33',
        width: 1
      })
    });
    if (feature.style) {
      style = new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
          color: feature.style.fillcolor
        }),
        stroke: new Stroke({ //边界样式
          color: feature.style.strokecolor,
          width: feature.style.strokewidth
        })
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(feature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    gisMap.featuresSource.addFeature(featureTemp);
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  addPolygon: function(feature, source) {
    //gisMap.drawSource.clear();
    var style = new Style({
      fill: new Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(255, 255, 255, 0.1)'
      }),
      stroke: new Stroke({ //边界样式
        color: '#ffcc33',
        width: 1
      })
    });
    if (feature.style) {
      style = new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
          color: feature.style.fillcolor
        }),
        stroke: new Stroke({ //边界样式
          color: feature.style.strokecolor,
          width: feature.style.strokewidth
        })
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    //转wkt为feature
    var featureTemp = gisMap.transformFeatureFromWkt(feature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    if (source) {
      if (source === "featuresSourcePageImage") { //范围框图层
        gisMap.featuresSourcePageImage.addFeature(featureTemp);
      }
      if (source === "featuresSourceAllImage") { //合并面图层
        gisMap.featuresSourceAllImage.addFeature(featureTemp);
      }
    } else {
      gisMap.featuresSource.addFeature(featureTemp);
    }

  },
  addCrossPolygon: function(feature, nodeId, source) {
    var _this = this;
    if (feature.geometry == undefined) {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    //转wkt为feature
    var featureTemp = _this.transformFeatureFromWkt(feature.geometry);
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var cnv1 = document.createElement('canvas');
    cnv1.width = 10;
    cnv1.height = 10;
    var ctx1 = cnv1.getContext("2d");
    //注意，Canvas的坐标系是：Canvas画布的左上角为原点(0,0)，向右为横坐标，向下为纵坐标，单位是像素(px)。
    //开始一个新的绘制路径
    ctx1.beginPath();
    //定义直线的起点坐标为(10,10)
    ctx1.moveTo(0, 0);
    //定义直线的终点坐标为(50,10)
    ctx1.lineTo(10, 10);
    //沿着坐标点顺序的路径绘制直线
    ctx1.moveTo(10, 0);
    //定义直线的终点坐标为(50,10)
    ctx1.lineTo(0, 10);
    ctx1.strokeStyle = feature.style.strokecolor;
    ctx1.lineWidth = 1;
    //沿着坐标点顺序的路径绘制直线
    ctx1.stroke();
    //关闭当前的绘制路径
    ctx1.closePath();
    var img = new Image();
    img.src = cnv1.toDataURL("image/png");
    img.onload = function() {
      var pattern = ctx.createPattern(img, 'repeat');
      //ctx.fillStyle = 'red';
      featureTemp.setStyle(new Style({
        stroke: new Stroke({
          color: feature.style.strokecolor,
          //lineDash: [5],
          width: 1
        }),
        fill: new Fill({
          color: pattern
        })
      }));
      //添加到图层
      if (source) {
        if (source == "featuresSourceAllImage") { //合并面图层
          gisMap.featuresSourceAllImage.addFeature(featureTemp);
        }
      }
    };
  },
  addCrossPolygon1: function(feature, nodeId, source, imgdata) {
    var _this = this;
    // var style = new Style({
    //   fill: new Fill({ //矢量图层填充颜色，以及透明度
    //     // color: 'rgba(255, 255, 255, 0)'
    //   }),
    //   stroke: new Stroke({ //边界样式
    //     // color: '#ffcc33',
    //     // width: 1
    //   })
    // });
    // if (feature.style) {
    //   style = new Style({
    //     fill: new Fill({ //矢量图层填充颜色，以及透明度
    //       color: feature.style.fillcolor
    //     }),
    //     stroke: new Stroke({ //边界样式
    //       color: feature.style.strokecolor,
    //       width: feature.style.strokewidth
    //     })
    //   });
    // }
    if (feature.geometry == undefined) {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    //转wkt为feature
    var featureTemp = _this.transformFeatureFromWkt(feature.geometry);

    //cavans方法
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    var img = new Image();
    img.setAttribute('src', imgdata);
    img.onload = function() {
      var pat = ctx.createPattern(img, "repeat");
      ctx.fillStyle = 'red';
      featureTemp.setStyle(new Style({
        stroke: new Stroke({
          color: feature.style.fillcolor,
          // lineDash: [5],
          width: 1
        }),
        fill: new Fill({
          color: pat
        })
      }));
    };
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    if (source) {
      if (source == "featuresSourceAllImage") { //合并面图层
        gisMap.featuresSourceAllImage.addFeature(featureTemp);
      }
    }
    //_this.featuresSource.addFeature(featureTemp);
    // return featureTemp;
  },
  addCrossPolygon2: function(feature, source, style,countnum,nodeId,itemtype) {
    var _this = this;
    if (feature.geometry == undefined) {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    //转wkt为feature
    var featureTemp = _this.transformFeatureFromWkt(feature.geometry);
    if(countnum === '1' && source === 'featuresSource' && (nodeId ==='10091' || nodeId ==='10092' || nodeId ==='10093' || nodeId ==='10111')){
      // 获取对应的CanvasRenderingContext2D对象(画笔)
      var cnv1 = document.createElement('canvas')
      cnv1.width = 10
      cnv1.height = 10
      var ctx1 = cnv1.getContext('2d')
      ctx1.fillStyle = 'rgba(110,110,110,0.8)'//覆盖颜色
      ctx1.fillRect(0, 0, 10, 10)
      // 开始一个新的绘制路径
      ctx1.beginPath()
      if (itemtype === 'hc') {
        ctx1.moveTo(0, 0)
        ctx1.lineTo(10, 10)
        ctx1.moveTo(10, 0)
        ctx1.lineTo(0, 10)
      } else if (itemtype === 'hd') {
        ctx1.moveTo(0, 0)
        ctx1.lineTo(0, 10)
        ctx1.moveTo(10, 0)
        ctx1.lineTo(10, 10)
      } else if (itemtype === 'hf') {
        ctx1.moveTo(0, 0)
        ctx1.lineTo(10, 0)
        ctx1.moveTo(0, 10)
        ctx1.lineTo(10, 10)
      } else if (itemtype === 'hy') {
        ctx1.moveTo(0, 0)
        ctx1.lineTo(0, 10)
        ctx1.moveTo(0, 0)
        ctx1.lineTo(10, 0)
      }
      ctx1.strokeStyle = 'rgba(110,110,110,0.5)'//网格颜色
      ctx1.lineWidth = '1'
      // 沿着坐标点顺序的路径绘制直线
      ctx1.stroke()
      // 关闭当前的绘制路径
      ctx1.closePath()
      var img = new Image()
      img.src = cnv1.toDataURL('image/png')
      var pat1 = ctx1.createPattern(cnv1, 'repeat')
      style = new Style({
        stroke: new Stroke({
          color: 'rgba(110,110,110,0.5)',//边框颜色
          // lineDash: [5],
          width: 2,
          countnum: ''
        }),
        fill: new Fill({
          color: pat1
        })
      })

    }
    if(countnum === '1' && source === 'featuresSourceAllImage' && (nodeId ==='10091' || nodeId ==='10092' || nodeId ==='10093' || nodeId ==='10111')){
      var cnv = document.createElement('canvas')
      cnv.width = 10
      cnv.height = 10
      var ctx = cnv.getContext('2d')

      // 开始一个新的绘制路径
      ctx.beginPath()
      if (itemtype === 'hc') {
        ctx.moveTo(0, 0)
        ctx.lineTo(10, 10)
        ctx.moveTo(10, 0)
        ctx.lineTo(0, 10)
      } else if (itemtype === 'hd') {
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 10)
        ctx.moveTo(10, 0)
        ctx.lineTo(10, 10)
      } else if (itemtype === 'hf') {
        ctx.moveTo(0, 0)
        ctx.lineTo(10, 0)
        ctx.moveTo(0, 10)
        ctx.lineTo(10, 10)
      } else if (itemtype === 'hy') {
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 10)
        ctx.moveTo(0, 0)
        ctx.lineTo(10, 0)
      }

      ctx.strokeStyle = 'rgba(110,110,110,0.5)'//网格颜色
      ctx.lineWidth = '1'
      // 沿着坐标点顺序的路径绘制直线
      ctx.stroke()
      // 关闭当前的绘制路径
      ctx.closePath()
      var pat = ctx.createPattern(cnv, 'repeat')
      // 加填充和网格了
      style = new Style({
        stroke: new Stroke({
          color: 'rgba(110,110,110,0.5)',//边框颜色
          // lineDash: [5],
          width: 2,
          countnum: ''
        }),
        fill: new Fill({
          color: pat
        })
      })
    }
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    if (source) {
      if (source == "featuresSource") { //合并面图层
        gisMap.featuresSource.addFeature(featureTemp);
      }
      if (source == "featuresSourceAllImage") { //合并面图层
        gisMap.featuresSourceAllImage.addFeature(featureTemp);
      }
    }
  },
  addCrossPolygon3: function(features) {
    gisMap.featuresSourceAllImage.addFeatures(features);

  },
  toggleLayer: function(isChecked, url, val) {
    if (isChecked) {
      gisMap.specialMapLayer = new ImageLayer({
        source: new ImageArcGISRest({
          ratio: 1,
          params: {
            'LAYERS': 'show:' + val,
          },
          url: url,
          projection: new Projection({
            units: 'degrees',
            code: 'EPSG:4326'
          })
        })
      })
      gisMap.specialMapLayers.push(gisMap.specialMapLayer);
      gisMap.map.addLayer(gisMap.specialMapLayer);
    } else {
      gisMap.map.removeLayer(gisMap.specialMapLayer);
    }
  },
  //转wkt为feature
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  transformFeatureFromWkt: function(wkt) {
    var format = new WKT();
    var feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326'
    });
    return feature;
  },
  // 多边形定位
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  zoomToPolygon: function(feature, level) {
    if (!feature) {
      return;
    }
    var polygon = feature.getGeometry();
    var point = gisMap.getCenterPoint(polygon.getExtent());
    gisMap.map.getView().fit(polygon.getExtent());
    var zoom = gisMap.map.getView().getZoom() + 1;
    gisMap.map.getView().animate({
      zoom: zoom,
      center: [point[0], point[1]],
    });
    setTimeout(function() {
      var zoom = zoom - 1;
      gisMap.map.getView().animate({
        zoom: zoom,
        center: [point[0], point[1]],
      });
      gisMap.map.getView().fit(polygon.getExtent());
    }, 500);

  },
  // 点定位
  zoomToPoint: function(feature, level) {
    if (!feature) {
      return
    }
    var polygon = feature.getGeometry()
    var point = gisMap.getCenterPoint(polygon.getExtent())
    gisMap.map.getView().animate({
      zoom: level,
      center: [point[0], point[1]],
    })
  },
  getExtentHeight: function(extent) {
    var l = getHeight(extent)
    return l;
  },
  getExtentCenter: function(extent) {
    var c = getCenter(extent)
    return c;
  },
  //定位到某地
  zoomTo: function(feature) {
    var polygon = feature.getGeometry()
    var r = gisMap.map.getView().getResolutionForExtent(polygon.getExtent(), gisMap.map.getSize());
    gisMap.map.getView().setResolution(r);
    gisMap.map.getView().setCenter(gisMap.getExtentCenter(polygon.getExtent()));
  },
  // 飞到某地
  flyTo: function(feature, done) {
    var duration = 2000;
    var parts = 2;
    var called = false;
    var polygon = feature.getGeometry()
    var location = gisMap.getCenterPoint(polygon.getExtent());
    var r = gisMap.map.getView().getResolutionForExtent(polygon.getExtent(), gisMap.map.getSize());
    var zoom = gisMap.map.getView().getZoomForResolution(r);

    function callback(complete) {
      --parts
      if (called) {
        return
      }
      if (parts === 0 || !complete) {
        called = true
        done(complete)
      }
    }
    gisMap.map.getView().animate({
      center: location,
      duration: duration
    }, callback);
    gisMap.map.getView().animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom - 1,
      duration: duration / 2
    }, callback);
  },
  zoomToLevel: function(level) {
    if (!level) {
      return;
    }
    gisMap.map.getView().animate({
      zoom: level
    });
  },
  //获取当前可视级别
  getMapLevel: function() {
    var zoom = gisMap.map.getView().getZoom();
    return zoom;
  },
  //获取可视范围
  getMapView: function() {
    var view = gisMap.map.getView();
    return arr = view.calculateExtent(gisMap.map.getSize());
  },
  getPixelFromCoordinate: function(point) //[arr[0],arr[1]]
  {
    gisMap.map.getPixelFromCoordinate([point.x, point, y]);
  },

  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  getCenterPoint: function(arr) {
    var k = arr.length / 2;
    var xarr = 0,
      yarr = 0;
    for (var i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        xarr += arr[i];
      } else {
        yarr += arr[i];
      }
    }
    var x = xarr / k;
    var y = yarr / k;
    var point = [x, y];
    return point;
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  measureArea: function() {
    gisMap.measureInfo.isMeasure = true;
    gisMap.openMeasureTool("area");
    gisMap.measureInfo.isMeasureArea = true;
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  measureLength: function() {
    gisMap.measureInfo.isMeasure = true;
    gisMap.openMeasureTool("LineString");
    gisMap.measureInfo.isMeasureArea = false;
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  openMeasureTool: function(type) {
    if (gisMap.measureInfo.isMeasure) {
      $('<style>.measureTooltip {\n' +
        '            position: relative;\n' +
        '            background:#ffffff;\n' +
        '            border-radius: 4px;\n' +
        '            color: #000000;\n' +
        '            padding: 2px 2px;\n' +
        '            opacity: 0.7;\n' +
        '            white-space: nowrap;\n' +
        '            border: 1px solid #000000;\n' +
        '            font-size:6px\n' +
        '        }</style>').appendTo('head');

      gisMap.map.getInteractions().item(1).setActive(false);
      if (gisMap.measure) {
        gisMap.map.removeInteraction(gisMap.measure); //移除绘制图形
      }
      gisMap.map.on('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
        var helpMsg = '单击绘制'; //当前默认提示信息
        //判断绘制几何类型设置相应的帮助提示信息
        if (gisMap.measureInfo.sketch) {
          var geom = (gisMap.measureInfo.sketch.getGeometry());
          if (geom instanceof Polygon) {
            helpMsg = gisMap.measureInfo.continuePolygonMsg; //绘制多边形时提示相应内容
          } else if (geom instanceof LineString) {
            helpMsg = gisMap.measureInfo.continueLineMsg; //绘制线时提示相应内容
          }
        }
        gisMap.measureInfo.helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
        gisMap.measureInfo.helpTooltip.setPosition(evt.coordinate); //设置帮助提示框的位置
      }); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
      var type = (type == 'area' ? 'Polygon' : 'LineString');
      gisMap.measure = new Draw({
        //source: gisMap.measureSource,//测量绘制层数据源
        type: /** @type {GeometryType} */ (type), //几何图形类型
        style: new Style({ //图层样式
          fill: new Fill({
            //填充颜色
            color: 'rgba(37,241,239,0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33', //边框颜色
            width: 2 // 边框宽度
          }),
          image: new Circle({
            radius: 5,
            stroke: new Stroke({
              color: '#ffcc33', //边框颜色
              width: 2
            }),
            fill: new Fill({
              color: '#ffffff' //填充颜色
            }),
          })
        })
      });
      gisMap.map.addInteraction(gisMap.measure);
      gisMap.createMeasureTooltip(); //创建测量工具提示框
      gisMap.createHelpTooltip(); //创建帮助提示框
      //定义一个事件监听
      var listener;
      //定义一个控制鼠标点击次数的变量
      var count = 0;
      //绑定交互绘制工具开始绘制的事件
      gisMap.measure.on('drawstart',
        function(evt) {
          // set sketch
          gisMap.measureInfo.sketch = evt.feature; //绘制的要素
          /** @type {Coordinate|undefined} */
          var tooltipCoord = evt.coordinate; // 绘制的坐标
          //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
          listener = gisMap.measureInfo.sketch.getGeometry().on('change', function(evt) {
            var geom = evt.target; //绘制几何要素
            console.log(evt, 'geom')
            //gisMap.measureSource.addFeature(new Feature(geom));
            var output;
            if (geom instanceof Polygon) {
              gisMap.map.removeEventListener('singleclick');
              // gisMap.map.removeEventListener('dblclick');
              output = gisMap.formatArea( /** @type {Polygon} */ (geom)); //面积值
              tooltipCoord = geom.getInteriorPoint().getCoordinates(); //坐标
            } else if (geom instanceof LineString) {
              output = gisMap.formatLength( /** @type {LineString} */ (geom)); //长度值
              tooltipCoord = geom.getLastCoordinate(); //坐标
            }
            gisMap.measureInfo.measureTooltipContentElement.innerHTML = output; //将测量值设置到测量工具提示框中显示
            gisMap.measureInfo.measureTooltip.setPosition(tooltipCoord); //设置测量工具提示框的显示位置
            gisMap.measureInfo.lastPoint = tooltipCoord;
          });
          //地图单击事件
          gisMap.map.on('singleclick', function(evt) {
            //如果是第一次点击，则设置测量提示框的文本内容为起点
            if (count === 0) {
              gisMap.measureInfo.measureTooltipContentElement.innerHTML = "起点";
              gisMap.outputD = 0
            }
            if (gisMap.measureInfo.measureResult !== gisMap.measureInfo.measureTooltipContentElement.innerHTML &&
              gisMap.measureInfo.measureTooltipContentElement.innerHTML !== "") {
              if (gisMap.measureInfo.measureTooltipContentElement.innerHTML !== "起点") {
                gisMap.outputD = gisMap.measureInfo.measureTooltipContentElement.innerHTML
              }
              //设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
              gisMap.measureInfo.measureTooltip.setPosition(evt.coordinate);
              //根据鼠标点击位置生成一个点
              var point = new Point(evt.coordinate);
              //将该点要素添加到矢量数据源中
              var feature = new Feature(point);
              feature.id = gisMap.measureInfo.measureTooltipId;
              gisMap.measureSource.addFeature(feature);
              //更改测量提示框的样式，使测量提示框可见
              gisMap.measureInfo.measureTooltipElement.className = 'measureTooltip';
              //创建测量提示框
              gisMap.createMeasureTooltip();
              //gisMap.createMeasureTooltipClose();//重新创建一个测试工具提示框显示结果
              //点击次数增加
              count++;
              // gisMap.measureInfo.measureResult = gisMap.measureInfo.measureTooltipContentElement.innerHTML;
            }
          });
        }, this);
      //绑定交互绘制工具结束绘制的事件
      gisMap.measure.on('drawend',
        function(evt) {

          var geom = evt.feature; //绘制几何要素
          geom.id = gisMap.measureInfo.measureTooltipId;
          gisMap.measureInfo.measureTooltipId++;
          gisMap.measureSource.addFeature(geom);
          if (!gisMap.measureInfo.isMeasureArea) {
            //根据鼠标点击位置生成一个点
            var point = new Point(gisMap.measureInfo.lastPoint);
            //将该点要素添加到矢量数据源中
            var feature = new Feature(point);
            feature.id = gisMap.measureInfo.measureTooltipId;
            gisMap.measureSource.addFeature(feature);
            gisMap.map.removeEventListener('pointermove');
            gisMap.map.removeEventListener('singleclick');
            count = 0;

            gisMap.createMeasureTooltipClose(); //重新创建一个关闭工具提示框显示结果
            // unset sketch
            gisMap.measureInfo.sketch = null; //置空当前绘制的要素对象
            // unset tooltip so that a new one can be created
            gisMap.measureInfo.measureTooltipElement = null; //置空测量工具提示框对象

            gisMap.measureInfo.isMeasure = false;

            gisMap.map.removeInteraction(gisMap.measure); //移除测量工具

          }

          if (gisMap.measureInfo.helpTooltipElement) {
            if (gisMap.measureInfo.helpTooltipElement.parentNode) {
              gisMap.measureInfo.helpTooltipElement.parentNode.removeChild(gisMap.measureInfo.helpTooltipElement);
            }
          }
          if (gisMap.measureInfo.isMeasureArea) {
            gisMap.createMeasureTooltipClose(); //重新创建一个关闭工具提示框显示结果
            // unset sketch
            gisMap.measureInfo.sketch = null; //置空当前绘制的要素对象
            // unset tooltip so that a new one can be created
            gisMap.measureInfo.measureTooltipElement = null; //置空测量工具提示框对象

            gisMap.measureInfo.isMeasure = false;

            gisMap.map.removeInteraction(gisMap.measure); //移除测量工具

            if (gisMap.measureInfo.helpTooltipElement) {
              if (gisMap.measureInfo.helpTooltipElement.parentNode) {
                gisMap.measureInfo.helpTooltipElement.parentNode.removeChild(gisMap.measureInfo.helpTooltipElement);
              }
            }
          }
          unByKey(listener);
        }, this);
    }
  },
  /**
   *创建一个新的帮助提示框（tooltip）
   */
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  createHelpTooltip: function() {
    gisMap.measureInfo.helpTooltipElement = document.createElement('div');
    gisMap.measureInfo.helpTooltipElement.className = 'measureTooltip';
    gisMap.measureInfo.helpTooltip = new Overlay({
      element: gisMap.measureInfo.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    gisMap.map.addOverlay(gisMap.measureInfo.helpTooltip);
  },
  /**
   *创建一个新的测量工具提示框（tooltip）
   */
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  createMeasureTooltip: function() {
    gisMap.measureInfo.measureTooltipElement = document.createElement('div');
    gisMap.measureInfo.measureTooltipElement.className = 'measureTooltip';
    gisMap.measureInfo.measureTooltipContentElement = document.createElement('div');
    gisMap.measureInfo.measureTooltipContentElement.style.display = "inline";
    gisMap.measureInfo.measureTooltipElement.append(gisMap.measureInfo.measureTooltipContentElement);

    gisMap.measureInfo.measureTooltip = new Overlay({
      element: gisMap.measureInfo.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    gisMap.measureInfo.measureTooltips.push(gisMap.measureInfo.measureTooltip);
    gisMap.map.addOverlay(gisMap.measureInfo.measureTooltip);
    gisMap.measureInfo.measureTooltipId++;
  },
  /**
   *创建一个新的测量工具关闭提示框（tooltip）
   */
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  createMeasureTooltipClose: function() {
    gisMap.measureInfo.measureTooltipElement.className = 'measureTooltip';
    gisMap.measureInfo.measureTooltipElement.append(gisMap.measureInfo.measureTooltipContentElement);
    gisMap.measureInfo.measureTooltipCloseElement = document.createElement('a');
    gisMap.measureInfo.measureTooltipCloseElement.innerHTML = "✖";
    gisMap.measureInfo.measureTooltipCloseElement.setAttribute("id", gisMap.measureInfo.measureTooltipId);
    gisMap.measureInfo.measureTooltipCloseElement.setAttribute("title", "清除本次测量结果");
    gisMap.measureInfo.measureTooltipCloseElement.style.cursor = "pointer";
    gisMap.measureInfo.measureTooltipCloseElement.style.display = "inline";
    gisMap.measureInfo.measureTooltipElement.append(gisMap.measureInfo.measureTooltipCloseElement);
    gisMap.measureInfo.measureTooltipCloseElement.onclick = function(evt) {
      var id = evt.currentTarget.getAttribute("id");
      var measureSourceFeatures = gisMap.measureSource.getFeatures();
      for (let i = 0; i < gisMap.measureInfo.measureResults.length; i++) {
        if (id == gisMap.measureInfo.measureResults[i].id) {
          var measureTooltips = gisMap.measureInfo.measureResults[i].measureTooltips;
          for (let j = 0; j < measureTooltips.length; j++) {
            let measureTooltip = measureTooltips[j];
            gisMap.map.removeOverlay(measureTooltip);
          }
          if (i > 0) {
            //临时数组存放
            var tempArray1 = gisMap.measureInfo.measureResults[i].measureSourceFeatures; //临时数组1
            var tempArray2 = gisMap.measureInfo.measureResults[i - 1].measureSourceFeatures; //临时数组2
            var result = [];
            for (var k = 0; k < tempArray1.length; k++) {
              var obj = tempArray1[k];
              var num = obj.id;
              var isExist = false;
              for (var l = 0; l < tempArray2.length; l++) {
                var aj = tempArray2[l];
                var n = aj.id;
                if (n == num) {
                  isExist = true;
                  break;
                }
              }
              if (!isExist) {
                result.push(obj);
              }
            }
            for (var n = 0; n < result.length; n++) {
              gisMap.measureSource.removeFeature(result[n]);
            }
          } else {
            for (var n = 0; n < gisMap.measureInfo.measureResults[i].measureSourceFeatures.length; n++) {
              gisMap.measureSource.removeFeature(gisMap.measureInfo.measureResults[i].measureSourceFeatures[n]);
            }
          }
        }
      }
    };
    var obj = {
      "id": gisMap.measureInfo.measureTooltipId,
      "measureTooltips": gisMap.measureInfo.measureTooltips,
      "measureSourceFeatures": gisMap.measureSource.getFeatures()
    }
    gisMap.measureInfo.measureResults.push(obj);
    gisMap.measureInfo.measureTooltips = [];
    gisMap.measureInfo.measureTooltipId++;
  },

  /**
   * 测量长度输出
   * @param {LineString} line
   * @return {string}
   */
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/2/26
   */
  formatLength: function(line) {
    var sourceProj = gisMap.map.getView().getProjection(); //获取投影坐标系
    // 方法1
    // var geom = (line.clone().transform(sourceProj, 'EPSG:3857'));
    // var length = getLength(geom);
    //方法2
    // var length = getLength(line, {
    //   projection: sourceProj /*, radius: 6371008.8*/
    // });
    var length = getLength(line, {projection: sourceProj});
    // console.log(length, 'length')
    var output;
    var outputCrent = '';
    var a = '';
    var distance = (Math.round(length / 1000 * 100) / 100);
    var arrayOut = []
    // if (length > 100) {
    // output = (Math.round(length / 1000 * 100) / 100) + ' ' + '公里'
    if (gisMap.outputD !== 0) {
      arrayOut = gisMap.outputD.split('<br>')
      // console.log(arrayOut, 'arrayOut')
      a = parseInt(arrayOut[0].slice(0, arrayOut[0].length))
      outputCrent = (distance - a).toFixed(2) + ' ' + '公里'
      output = distance + ' ' + '公里' + '<br>(+' + outputCrent + ')';
    } else {
      output = distance + ' ' + '公里'
    }
    //换算成KM单位
    // } else {
    //   outputCrent = gisMap.outputD - (Math.round(length / 1000 * 100) / 100) + ' ' + '米'
    //   output = (Math.round(length * 100) / 100) + ' ' + '米' + '<br>' + outputCrent;  //m为单位
    //   gisMap.outputD = Math.round(length * 100) / 100
    // }
    return output; //返回线的长度
  },
  /**
   * 测量面积输出
   * @param {Polygon} polygon
   * @return {string}
   */
  formatArea: function(polygon) {
    var sourceProj = gisMap.map.getView().getProjection(); //获取投影坐标系
    //方法1
    // var geom = (polygon.clone().transform(sourceProj, 'EPSG:3857'));
    // var area = getArea(geom);
    //方法2
    var area = getArea(polygon, {
      projection: sourceProj /*, radius: 6371008.8*/
    })
    var output;
    if (area > 10000) {
      output = (Math.round(area / 1000000 * 100) / 100) + ' ' + '平方公里'; //换算成KM单位
    } else {
      output = (Math.round(area * 100) / 100) + ' ' + '平方米'; //m为单位
    }
    return output; //返回多边形的面积
  },
  /**
   * @Description:
   * @Param:
   * @return:
   * @Author: mhd
   * @Date: 2019/2/26
   */
  addFeatureClick: function(callBackFeatureClick, poPshow) {
    gisMap.featurePopInfo.isFeaturePopOpen = true;
    //初始化弹出窗样式
    $('<style>.feature-popup {\n' +
      '\t\tposition: absolute;\n' +
      '\t\tbackground-color: white;\n' +
      '\t\t-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n' +
      '\t\tfilter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n' +
      '\t\tpadding: 15px;\n' +
      '\t\tborder-radius: 10px;\n' +
      '\t\tborder: 1px solid #cccccc;\n' +
      '\t\tbottom: 12px;\n' +
      '\t\tleft: -50px;\n' +
      '\t\tmin-width: 200px;\n' +
      '\t}</style>').appendTo('head');
    $('<style>.feature-popup:after, .feature-popup:before {\n' +
      '            top: 100%;\n' +
      '            border: solid transparent;\n' +
      '            content: " ";\n' +
      '            height: 0;\n' +
      '            width: 0;\n' +
      '            position: absolute;\n' +
      '            pointer-events: none;\n' +
      '        }</style>').appendTo('head');
    $('<style> .feature-popup:after {\n' +
      '            border-top-color: white;\n' +
      '            border-width: 10px;\n' +
      '            left: 48px;\n' +
      '            margin-left: -10px;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup:before {\n' +
      '            border-top-color: #cccccc;\n' +
      '            border-width: 11px;\n' +
      '            left: 48px;\n' +
      '            margin-left: -11px;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup-closer {\n' +
      '            text-decoration: none;\n' +
      '            position: absolute;\n' +
      '            top: 2px;\n' +
      '            right: 8px;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup-closer:after {\n' +
      '            content: "✖";\n' +
      '        }</style>').appendTo('head');

    gisMap.featurePopInfo.container = document.createElement('div');
    gisMap.featurePopInfo.container.className = 'feature-popup';
    gisMap.featurePopInfo.popupCloser = document.createElement('a');
    gisMap.featurePopInfo.popupCloser.className = 'feature-popup-closer';
    gisMap.featurePopInfo.container.append(gisMap.featurePopInfo.popupCloser);
    // 弹出窗内容DIV
    gisMap.featurePopInfo.content = document.createElement('div');
    gisMap.featurePopInfo.container.append(gisMap.featurePopInfo.content);
    gisMap.featurePopInfo.content.style.visibility = "hidden";
    // 弹出窗关闭

    gisMap.featurePopInfo.popupCloser.setAttribute("title", "关闭");
    gisMap.featurePopInfo.popupCloser.style.cursor = "pointer";
    gisMap.featurePopInfo.popupCloser.style.display = "inline";

    gisMap.featurePop = new Overlay(
      /** @type {olx.OverlayOptions} */
      ({
        //要转换成overlay的HTML元素
        element: gisMap.featurePopInfo.container,
        //当前窗口可见
        autoPan: true,
        //Popup放置的位置
        positioning: 'bottom-center',
        //是否应该停止事件传播到地图窗口
        stopEvent: false,
        autoPanAnimation: {
          //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
          duration: 250
        }
      }));
    // openlayers只有针对整个地图事件监听，可以通过以下方式达到对feature监听，也可对feature自定义点击事件。
    gisMap.map.on('click', function(e) {
      // 在点击时获取像素区域
      var pixel = gisMap.map.getEventPixel(e.originalEvent);
      gisMap.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer) {
          if (layer.name == "featuresSourceVectorLayerPageImage") {
            // coodinate存放了点击时的坐标信息
            var coodinate = e.coordinate;
            callBackFeatureClick(gisMap.featurePopInfo.content, feature);

            // 显示overlay
            if (poPshow) {
              if (!gisMap.darwState) {
                gisMap.featurePopInfo.content.style.visibility = "visible";
                // 设置overlay的显示位置
                var center = getCenter(feature.values_.geometry.extent_);
                gisMap.featurePop.setPosition(center);
                //gisMap.featurePop.setPosition(coodinate);
                gisMap.map.addOverlay(gisMap.featurePop);
              }
            }
          }
        }

      });
    });
    // 鼠标移动事件
    gisMap.map.on('pointermove', function(e) {
      if (e.dragging) {
        return;
      }
      var pixel = gisMap.map.getEventPixel(e.originalEvent);
      var feature = gisMap.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer) {
          if (layer.name == "featuresSourceVectorLayer") {
            return feature;
          }
        }
        return null;
      })
      if (feature) {
        // store.dispatch('getRowId', feature.attributes.F_DATAID)
      } else {
        // store.dispatch('getRowId', "")
      }
    });
    gisMap.featurePopInfo.popupCloser.onclick = function(evt) {
      gisMap.featurePopInfo.content.style.visibility = "hidden";
      gisMap.featurePop.setPosition(undefined);
    };
  },



  addHighlight: function(val) {
    var srv = gisMap.featureOverlay.getSource();
    srv.clear();
    var style = new Style({
      fill: new Fill({ // 矢量图层填充颜色，以及透明度
        color: 'rgba(255, 255, 255, 0)'
      }),
      stroke: new Stroke({ // 边界样式
        color: '#ffcc33',
        width: 3
      })
    });
    if (val) {
      // 转wkt为feature
      var featureTemp = gisMap.transformFeatureFromWkt(val.WKTRESPONSE);
      // 应用样式
      featureTemp.setStyle(style);
      gisMap.featureOverlay.getSource().addFeature(featureTemp)
    }

  },
  closeFeaturePop: function() {
    gisMap.featurePopInfo.isFeaturePopOpen = false;
    gisMap.map.removeOverlay(gisMap.featurePop);
  },
  openTwoDMap: function() {
    $("#" + gisMap.twoDMapDiv).css("visibility", "visible");
    //$("#" + gisMap.threeDMapDiv).css("visibility", "hidden");
    // gisMap.threeDMap.entities.removeAll();
    // Map.handler = Map.handler && Map.handler.destroy();
    gisMap.threeDMap.destroy()
    gisMap.threeDMap = null
    $("#" + gisMap.threeDMapDiv).empty
  },
  openThreeDMap: function() {
    //$("#" + gisMap.twoDMapDiv).css("visibility", "hidden");
    $("#" + gisMap.threeDMapDiv).css("visibility", "visible");
    //初始化3d地图
    gisMap.threeDMap = new Cesium.Viewer(gisMap.threeDMapDiv, {
      animation: false, //是否显示动画控件
      homeButton: false, //是否显示home键
      geocoder: false, //是否显示地名查找控件        如果设置为true，则无法查询
      baseLayerPicker: false, //是否显示图层选择控件
      timeline: false, //是否显示时间线控件
      fullscreenButton: true, //是否全屏显示
      scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      infoBox: false, //是否显示点击要素之后显示的信息
      sceneModePicker: false, //是否显示投影方式控件  三维/二维
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false, //是否显示帮助信息控件
      selectionIndicator: false, //是否显示指示器组件
      //加载谷歌卫星影像
      //imageryProvider : new Cesium.UrlTemplateImageryProvider({url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"})
    });
    gisMap.threeDMap._cesiumWidget._creditContainer.style.display = "none"; //	去除版权信息

    gisMap.threeDMapImagerLayers = gisMap.threeDMap.imageryLayers;
    for (let i = 0; i < this.baseMapInitParameters.layers.length; i++) {
      var baseMaplayer = this.baseMapInitParameters.layers[i];
      switch (baseMaplayer.layerType) {
        case "XYZ":
          var layer = gisMap.threeDMapImagerLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            url: baseMaplayer.layerUrl,
            visible: baseMaplayer.visible
          }));
          gisMap.threeDMapLayers.push(baseMaplayer);
          break;
      }
    }
    // var resolution = gisMap.map.getView().getResolution();
    // var scale = gisMap.resolution[resolution]
    // gisMap.threeDMap.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(this.baseMapInitParameters.views.center[0], this.baseMapInitParameters.views.center[1], scale) //相机飞入点
    // });


    // setTimeout(function() {
    var loactionTectEntity = gisMap.threeDMap.entities.add({
      name: 'loactionTectEntity',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -109.080842, 45.002073,
          -105.91517, 45.002073,
          -104.058488, 44.996596,
          -104.053011, 43.002989,
          -104.053011, 41.003906,
          -105.728954, 40.998429,
          -107.919731, 41.003906,
          -109.04798, 40.998429,
          -111.047063, 40.998429,
          -111.047063, 42.000709,
          -111.047063, 44.476286,
          -111.05254, 45.002073, -109.080842, 45.002073
        ]),
        height: 0,
        material: Cesium.Color.RED.withAlpha(0.8),
        outline: false,
        outlineColor: Cesium.Color.BLACK
      }
    });
    gisMap.threeDMap.flyTo(loactionTectEntity);
    // }, 10000)
    //gisMap.closeSwipe();
  },
  mapOpenSwipe: function() {
    if (gisMap.swipe) {
      gisMap.closeSwipe()
    } else if (!gisMap.swipe) {
      document.getElementById("swipe").style.height = (document.getElementById("mapDiv").offsetHeight - 10) / 50 + 'rem'
      document.getElementById("swipe").style.visibility = "visible" // 显示
      gisMap.swipe = document.getElementsByClassName("swipe_bg")[0] // 获取元素
      var x, y // 存储div的坐标
      var isDrop = false // 移动状态的判断鼠标按下才能移动
      gisMap.swipe.onmousedown = function(e) {
        var e = e || window.event // 要用event这个对象来获取鼠标的位置
        x = e.clientX - gisMap.swipe.offsetLeft
        y = e.clientY - gisMap.swipe.offsetTop
        isDrop = true // 设为true表示可以移动
      }

      document.onmousemove = function(e) {
        // 是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        if (isDrop) {
          var e = e || window.event
          var moveX = e.clientX - x // 得到距离左边距离                    　　
          var moveY = e.clientY - y // 得到距离上边距离
          var maxX = document.documentElement.clientWidth - gisMap.swipe.offsetWidth
          var maxY = document.documentElement.clientHeight - gisMap.swipe.offsetHeight
          // 范围限定
          moveX = Math.min(maxX, Math.max(0, moveX))
          moveY = Math.min(maxY, Math.max(0, moveY))
          gisMap.swipe.style.left = moveX + "px"
          gisMap.map.render()
        } else {
          return
        }
      }
      document.onmouseup = function() {
        isDrop = false // 设置为false不可移动
      }
      let productBaseMap = '/productBaseMap/arcgis/rest/services/HBLY/2016_suixian/MapServer'
      let specialMapLayer = new ImageLayer({
        name: 'showSwipe',
        source: new ImageArcGISRest({
          ratio: 1,
          params: {
            'LAYERS': 'show:' + 0,
          },
          url: productBaseMap
        }),
        id: 999,
        zIndex: ++gisMap.ZindexCy
      })
      gisMap.swipeSpecialMapLayers.push(specialMapLayer)
      gisMap.map.addLayer(specialMapLayer)
      let widthPx = 1
      if (document.body.clientWidth == 1440) {
        widthPx = 2
      }
      gisMap.fenpingListener = gisMap.getMapLayer("showSwipe").on('precompose', function(event) {
        let ctx = event.context
        let width = ctx.canvas.width * (gisMap.swipe.offsetLeft / ctx.canvas.width)
        ctx.save()
        ctx.beginPath()

        ctx.rect(width * widthPx, 0, ctx.canvas.width - width, ctx.canvas.height)
        ctx.clip()
      });
      gisMap.getMapLayer('showSwipe').on('postcompose', function(event) {
        var ctx = event.context
        ctx.restore()
      })
    }
  },
  // 关闭卷帘
  closeSwipe: function() {
    if (gisMap.swipe) gisMap.swipe.style.left = 0 + 'px'
    gisMap.swipe = null
    if (this.fenpingListener) unByKey(gisMap.fenpingListener)
    gisMap.map.removeLayer(gisMap.getMapLayer('showSwipe'))
    gisMap.map.render()
    document.getElementById('swipe').style.visibility = 'hidden'
  },
  // 获取指定名字获取图层
  getMapLayer: function(name, index) {
    let layer = null
    let layers = gisMap.map.getLayers()
    for (let i = 0; i < layers.array_.length; i++) {
      let _layer = layers.array_[i]
      if (_layer.values_.name == name) {
        layer = _layer
      }
    }
    return layer
  },
  // 清除点击表格定位重绘的图层
  productTableFeaturesRemove: function() {
    var productTableFeatures = gisMap.featuresSource.getFeatures()
    for (var i = 0; i < productTableFeatures.length; i++) {
      if (productTableFeatures[i].attributes["productTable_id"] === '') {
        gisMap.featuresSource.removeFeature(productTableFeatures[i])
        break
      }
    }
  },
  // 清除移入表格定位重绘的图层
  productTableHoverRemove: function(nodeId) {
    var productTableHoverFeatures = gisMap.featuresSource.getFeatures()
    // console.log(productTableHoverFeatures)
    for (var i = 0; i < productTableHoverFeatures.length; i++) {
      if (productTableHoverFeatures[i].attributes["productTable_hover"] === '') {
        gisMap.featuresSource.removeFeature(productTableHoverFeatures[i])
      }
    }
  },
  // 清除移入表格定位重绘的图层
  productTableCRemove: function() {
    var productTableHoverFeatures = gisMap.featuresSource.getFeatures()
    for (var i = 0; i < productTableHoverFeatures.length; i++) {
      if (productTableHoverFeatures[i].attributes["productTable_hover"] === '123') {
        gisMap.featuresSource.removeFeature(productTableHoverFeatures[i])
      }
    }
  },
  // 改变位置分辨率
  checkZoomAndCenter: function() {
    if (gisMap.isReplayCy) {
      gisMap.isReplayCy = false
      return
    }
    gisMap.viewArrCy = gisMap.viewArrCy.slice(0, gisMap.viewArrIndexCy + 1)
    let wkt = gisMap.sourceFeature
    let zoom = gisMap.map.getView().getZoom()
    let obj = {
      wkt,
      zoom
    }
    gisMap.viewArrCy.push(obj)
    gisMap.viewArrIndexCy = gisMap.viewArrCy.length - 1
    // gisMap.judgeViewImg(gisMap.viewArrIndexCy)
  },
  // 回放-前放
  computeViewArr: function(handle) {
    gisMap.isReplayCy = true
    let index = gisMap.viewArrIndexCy
    if (handle === 'prev') {
      index = index - 1 < 0 ? index : --index
    } else if (handle === 'next') {
      index = index + 1 > gisMap.viewArrCy.length - 1 ? index : ++index
    }
    // gisMap.judgeViewImg(index)
    gisMap.viewArrIndexCy = index
    gisMap.localtionCy(gisMap.viewArrCy[index])
  },
  // 定位
  localtionCy: function(local = {}) {
    gisMap.clearAllDraws()
    let feature = local.wkt
    gisMap.drawPolygon(feature)
    let f = gisMap.transformFeatureFromWkt(feature.geometry)
    // 飞到某地
    gisMap.flyTo(f, () => {})
  },
  // 书签
  bookList: function(e) {
    if (Object.keys(this.bookListComponent).length) {
      this.bookListComponent._data.divVisible = !this.bookListComponent._data.divVisible
      if (this.bookListComponent._data.divVisible) {
        bookTestGet()
      }
      this.bookListComponent._data.bookListData = this.bookListData
      this.bookListComponent._data.inputDivFlag = false
      return
    }
    const template = document.createElement('template')
    e.target.parentNode.appendChild(template)
    // let height = this.vm.$el.parentNode.clientHeight + 'px'
    const component = Vue.component('bookListDiv', {
      data() {
        return {
          bookListData: [],
          divVisible: true,
          styles: {
            position: 'absolute',
            width: '4.5rem',
            height: '5.5rem',
            background: '#fff',
            top: '.84rem',
            left: '7.8rem',
            padding: '.15rem',
            zIndex: 10000
          },
          liStyle: {
            height: '.4rem',
            lineHeight: '.4rem',
            padding: '.1rem 0',
            overflow: 'hidden',
            color: '#fff'
          },
          inputDivFlag: false,
          mapName: '',
          imgSrc: require('@/assets/img/delete.png')
        }
      },
      methods: {
        inputDivShow() {
          this.inputDivFlag = true
        },
        addBookList() {
          if (!this.mapName) {
            Message.error('书签名称不能为空')
            return
          }
          let wkt = ''
          wkt = store.state.searchStore.wkt || gisMap.sourceFeature.geometry
          // console.log(store.searchStore.wkt)
          let mapConfigList = []
          gisMap.specialMapLayers.map(each => {
            let obj = {
              serviceId: each.values_.id,
              serviceOrder: each.values_.zIndex,
              serviceStatus: each.values_.visible ? 1 : 0,
            }
            mapConfigList.push(obj)
          })
          let dataObj = {
            name: this.mapName,
            mapConfigList,
            wkt,
            center: gisMap.map.getView().getCenter().join(','),
            zoom: gisMap.map.getView().getZoom()
          }
          // let param = new URLSearchParams()
          // param.append('bookmarksVoJson', JSON.stringify(dataObj))
          http.addBookList(dataObj).then(res => {
            if (res) {
              Message.success('添加成功！')
              bookTestGet()
            } else {
              Message.error('书签名称已存在!')
            }
          })
        },
        deleteBook(item) {
          http.deleteBookList({
            id: item.id
          }).then(res => {
            if (res.data === true) {
              Message.success('删除成功！')
              bookTestGet()
            }
          }).catch(err => {
            Message.error(err)
          })
        },
        positionBook(data) {
          gisMap.clearAllDraws()
          let {
            center,
            zoom,
            mapConfigList,
            wkt
          } = data
          gisMap.specialMapLayers.map(each => {
            mapConfigList.map(item => {
              if (each.values_.id == item.serviceId) {
                each.values_.zIndex = item.serviceOrder
                each.values_.visible = item.serviceStatus
              }
            })
          })
          if (Object.keys(gisMap.controlLayerComponent).length) {
            gisMap.controlLayerComponent._data.specialMapLayers = gisMap.specialMapLayers
          }
          let arr = center.split(',')
          center = arr.map(each => {
            return Number(each)
          })
          let feature = {
            'attributes': {

            },
            'style': {
              fillcolor: 'rgba(255, 255, 255, 0)',
              strokecolor: 'red',
              strokewidth: 2
            },
            'geometry': wkt
          }
          let local = {
            center,
            zoom,
            wkt: feature
          }
          gisMap.drawPolygon(feature)
          gisMap.map.getView().animate({
            zoom: local.zoom,
            center: local.center
          })
        },
        gbshuqian() {
          this.divVisible = false
        }
      },
      template: `<div :style="{...styles}" v-show='divVisible' @click.stop>
        <div style="width: 100%;height: .6rem;borderBottom: 1px solid #ccc;lineHeight: .6rem;">
          <span style="display: inline-block;float: left;marginLeft: .1rem;">我的书签</span>
          <i style="display: inline-block;float: right;marginRight: .1rem;color: #E07F40;" @click="gbshuqian"> X </i>
        </div>
        <ul style="height:4rem;overflow:auto">
          <li v-for='item in bookListData' :style="{...liStyle}">
            <span style="float:left;cursor:pointer;color:black" @click='positionBook(item)'>{{item.name}}</span>
            <span style="float:right;background:#fff;padding:1px 2px;borderRadius:2px;cursor:pointer" @click='deleteBook(item)'>
              <img :src="imgSrc" />
            </span>
          </li>
        </ul>
        <div style="position:absolute;width:100%;bottom:5px;left:0;text-align: center;" v-show='!inputDivFlag'>
          <button style="background:#029567;color:#fff;padding:1px 2px;width:1rem;borderRadius:2px;cursor:pointer" @click="inputDivShow">添加</button>
        </div>
        <div style="position:absolute;width:100%;bottom:5px;left:0;text-align: center;" v-show='inputDivFlag'>
          <input type="text" style="width:60%;border:1px solid #ccc;" placeholder='请输入书签名称' v-model='mapName'/>
          <button style="width:20%;borderRadius:2px;padding:1px 2px;background:#4c9afc;color:#fff;cursor:pointer" @click="addBookList">确认</button>
        </div>
      </div>`
    })
    this.bookListComponent = new component()
    this.bookListComponent.$mount(template)
    bookTestGet()

    function bookTestGet() {
      http.getBookList().then(res => {
        gisMap.bookListComponent._data.bookListData = res.data
      }).catch(err => {
        Message.error(err)
      })
    }
  },
  // 点击弹出框
  initPop: function() {
    gisMap.featurePopInfo.isFeaturePopOpen = true
    //初始化弹出窗样式
    $('<style>.feature-popup {\n' +
      '\t\tposition: absolute;\n' +
      '\t\tbackground-color: white;\n' +
      '\t\t-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n' +
      '\t\tfilter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n' +
      '\t\tpadding: 20px;\n' +
      // '\t\tborder-radius: 10px;\n' +
      '\t\tborder: 1px solid #316BFC;\n' +
      '\t\tbottom: 12px;\n' +
      '\t\tleft: -50px;\n' +
      '\t\tcursor: default;\n' +
      '\t}</style>').appendTo('head');
    // 弹窗详情
    $('<style>.feature-popup-detail {\n' +
      '\t\tposition: absolute;\n' +
      '\t\tbackground-color: #316BFC;\n' +
      '\t\height: 30px;\n' +
      '\t\line-height: 30px;\n' +
      '\t\ttop: 0px;\n' +
      '\t\tleft: 0px;\n' +
      '\t\color: #fff;\n' +
      '\t\width: 99%;\n' +
      '\t\padding-left: 4px;\n' +
      // '\t\tmin-width: 222px;\n' +
      '\t}</style>').appendTo('head');
    $('<style>.feature-popup:after, .feature-popup:before {\n' +
      '            top: 100%;\n' +
      '            border: solid transparent;\n' +
      '            content: " ";\n' +
      '            height: 0;\n' +
      '            width: 0;\n' +
      '            position: absolute;\n' +
      '            pointer-events: none;\n' +
      '        }</style>').appendTo('head');
    $('<style> .feature-popup:after {\n' +
      '            border-top-color: white;\n' +
      '            border-width: 10px;\n' +
      '            left: 48px;\n' +
      '            margin-left: -10px;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup:before {\n' +
      '            border-top-color: #cccccc;\n' +
      '            border-width: 11px;\n' +
      '            left: 48px;\n' +
      '            margin-left: -11px;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup-closer {\n' +
      '            text-decoration: none;\n' +
      '            position: absolute;\n' +
      '            top: 8px;\n' +
      '            color: #fff;\n' +
      '            right: 8px;\n' +
      '            z-index: 2;\n' +
      '        }</style>').appendTo('head');
    $('<style>.feature-popup-closer:after {\n' +
      '            content: "✖";\n' +
      '        }</style>').appendTo('head');
    let str = document.createElement('span');
    str.innerHTML = '详情信息'
    str.className = 'feature-popup-detail'
    let detailDiv = document.createElement('div');
    detailDiv.append(str)
    gisMap.featurePopInfo.container = document.createElement('div');
    gisMap.featurePopInfo.container.className = 'feature-popup';
    gisMap.featurePopInfo.container.style.zIndex = '999';
    gisMap.featurePopInfo.popupCloser = document.createElement('a');
    gisMap.featurePopInfo.popupCloser.className = 'feature-popup-closer';
    gisMap.featurePopInfo.container.append(gisMap.featurePopInfo.popupCloser);
    gisMap.featurePopInfo.container.append(detailDiv);
    // 弹出窗内容DIV
    gisMap.featurePopInfo.content = document.createElement('div');
    gisMap.featurePopInfo.container.append(gisMap.featurePopInfo.content);
    gisMap.featurePopInfo.content.style.visibility = "hidden";

    gisMap.featurePopInfo.popupCloser.setAttribute("title", "关闭气泡");
    gisMap.featurePopInfo.popupCloser.style.cursor = "pointer";
    gisMap.featurePopInfo.popupCloser.style.display = "inline";

    gisMap.featurePopInfo.popupCloser.setAttribute("id", "popupCloser");
    gisMap.featurePopInfo.content.setAttribute("id", "PopInfo");

    gisMap.featurePop = new Overlay(
      /** @type {olx.OverlayOptions} */
      ({
        //要转换成overlay的HTML元素
        element: gisMap.featurePopInfo.container,
        //当前窗口可见
        autoPan: true,
        //Popup放置的位置
        positioning: 'bottom-center',
        //是否应该停止事件传播到地图窗口
        // stopEvent: false,
        // 如果设置为ture，那么叠置层被放在装载控件的那个div容器中
        //（该div容器css类名为ol-overlaycontainer-stopevent）
        // 如果设置为false，那么叠置层被放在css类名为ol-overlaycontainer的div容器下
        //，由className属性（默认为'ol-overlay-container ol-selectable'）指定类名的div容器中

        autoPanAnimation: {
          //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
          duration: 250
        }
      }));
    gisMap.map.addOverlay(gisMap.featurePop);
    gisMap.featurePopInfo.popupCloser.onclick = function(evt) {
      gisMap.featurePopInfo.popupCloser.blur(); //解决事件冲突
      gisMap.featurePopInfo.content.style.visibility = "hidden";
      gisMap.featurePop.setPosition(undefined);
      return false;
    }
  },
  addPop: function(point, divContent, addPopFinish) {
    gisMap.featurePopInfo.content.innerHTML = divContent
    gisMap.featurePopInfo.content.style.visibility = "visible";
    // 设置overlay的显示位置
    gisMap.featurePop.setPosition(point);
    addPopFinish()
  },
  removePop: function() {
    //_this.popInfo.popupCloser.blur();//解决事件冲突
    gisMap.featurePopInfo.content.style.visibility = "hidden";
    gisMap.featurePop.setPosition(undefined);
  }
}
