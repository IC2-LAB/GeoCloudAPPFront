/* eslint-disable */
import "ol/ol.css";
import Map from "ol/Map"
import View from "ol/View"
import Overlay from 'ol/Overlay'
import Fill from "ol/style/Fill"
import Stroke from "ol/style/Stroke"
import Style from "ol/style/Style"
import Circle from "ol/style/Circle"
import Draw from "ol/interaction/Draw"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import Tile from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import TileGrid from 'ol/tilegrid/TileGrid'
import {
  createBox
} from "ol/interaction/Draw"
import Polygon from "ol/geom/Polygon"
import LineString from "ol/geom/LineString"
import Point from "ol/geom/Point"
import Feature from "ol/Feature"
import {getRenderPixel} from 'ol/render'
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
// import {Message} from 'element-ui'
import MousePosition from 'ol/control/MousePosition'
import FullScreen from 'ol/control/FullScreen'
import layerUtils from './lib/layerUtils'
import featureUtils from './lib/featureUtils'
import calcUtils from "./lib/calcUtils"
import {createStringXY} from 'ol/coordinate'

import $ from 'jquery'
/**
 * openlayer5.3 ,Cesium1.66地图核心js
 */
//var baseMapLayers=[];//基础底图图层
//var specialMapLayers=[];//专题地图图层
//var contrastMapLayers=[];//对比地图图层
//var featureLayers=[];//要素地图图层

//zIndex说明
//0-10级地图底图
//11-30专题图
//31-40标绘地图

// 可动态实例化的 地图对象 ，封装，地图创建，图层控制常用函数，测量，基础工具
// modify by dlw 2020-02-10 08:45
export default class GISMap {
  // taylor
  featureTempWkt = null //高亮feature
  version = '0.3.1' //组件版本
  //初始化一些属性
  //绘制使用 的数据源
  drawSource = new VectorSource({  wrapX: false  })
  //测量使用 的数据源
  measureSource = new VectorSource()
  featuresSource = new VectorSource()
  featuresSourceAllImage = new VectorSource() //标绘图层每页的景
  featuresSourcePageImage = new VectorSource()//标绘图层
  featureSHPSource =  new VectorSource()//shp图层
  drawInfo =
      {
        "isDraw": false,
        "sketch": null,//当前绘制的要素（Currently drawn feature.）
        "helpTooltipElement": null,//帮助提示框对象（The help tooltip element.）
        "helpTooltip": null,//帮助提示框显示的信息（Overlay to show the help messages.）
      }
  measure = null//测距对象
  measureInfo =
      {
        "measureTooltips": [],
        "isMeasure": false,
        "isMeasureArea": false,
        "sketch": null,//当前绘制的要素（Currently drawn feature.）
        "helpTooltipElement": null,//帮助提示框对象（The help tooltip element.）
        "helpTooltip": null,//帮助提示框显示的信息（Overlay to show the help messages.）
        "measureTooltipElement": null,//测量工具提示框对象（The measure tooltip element. ）
        "measureTooltipContentElement": null,//测量工具提示框内容对象（The measure tooltip Content element. ）
        "measureTooltip": null,//测量工具中显示的测量值（Overlay to show the measurement.）
        "continuePolygonMsg": '双击结束',
        "continueLineMsg": '双击结束',
        "measureResults": [],
        "measureTooltipCloseElement": null,
        "measureTooltipId": 0,
        "measureTooltipElements": [],
        "measureResult": null,
        "lastPoint": null
      }
  //标绘图层全部的景
  darwState = false
  //绘图对象
  draw = null
  drawData = null
  // 分屏图层顺序
  ZindexCy = 10
  m = {}
  isReplayCy =  false
  //贴图图层
  overlayLayers= []

  swipe = null //席卷对象

  featurePopInfo = {
    "isFeaturePopOpen": false,
    "container": null,
    "content": null,
    "closer": null,
    "contentInfo": null
  }

  featurePop = null
  mark = null
  markTimer = null
  viewArrCy = []

  viewArrIndexCy = 0
  bookListData = []
  bookListComponent = {}
  baseMapLayers = []
  controlLayerComponent = {}
  // 分屏图层数组
  swipeSpecialMapLayers = []
  // 分屏事件监听
  fenpingListener = null
  viewCy = {}
  gifLayer = [] //gif图层
  specialMapLayers = [] //2d专题地图图层
  specialMapLayers2 = [] //2d专题地图图层
  specialMapLayer = null //2d专题地图图层
  specialMapLayer2 = null //2d专题地图图层
  //构造函数
  constructor(name) {
    // // console.log("开始实例化："+ name);
    this["own_id"] = name||"myMap"; //private
    if(window.GISMaps){
      window.GISMaps[this["own_id"]]=this; //赋值到全局变量
    }else{
      window.GISMaps = {};
      window.GISMaps[this["own_id"]]=this; //赋值到全局变量
    }
  }
  show2d(){
    $("#"+this["own_id"] +"3d").css("z-index","1");
    $("#"+this["own_id"] +"2d").css("z-index","2");
    this.vis3d = false;
  }
  layersList = [] // 图层控制插件对应的list
  baseMapInit(baseMapInitParameters, initcallback,gisMapContentDiv,has3D ) {
    //has3D 是否同时生产三维 地球
    this.baseMapInitParameters = baseMapInitParameters;
    this.viewCy = this.baseMapInitParameters.view;
    this.gisMapContentDiv = gisMapContentDiv;
    this.view = new View(baseMapInitParameters.view);
    this.tagType = baseMapInitParameters.type||"2d";
    this.layersList = []
    if (gisMapContentDiv != null) {
      var mapContent2d = ' <div style="position: absolute;top:0;bottom:0;left:0;right:0;display: block;z-index: 2;background: #ffffff;opacity: 0.9;" class="map" id="'+this["own_id"] +'2d"></div>';
      $("#" + gisMapContentDiv + "").append(mapContent2d)
      // this.addSwipeStyle();
      //实例化全屏显示控件

      this.baseMapLayers = layerUtils.getLayers(this.baseMapInitParameters.layers);
      //创建 地图
      this.map = new Map({
        controls:[],//s defaultControls().extend([mousePositionControl]),//待改造 不需要这种添加
        layers: this.baseMapLayers,//使用图层工具创建 layers
        target: this["own_id"]+"2d",
        view: this.view
      });
      //重新定位 initextent
      if(this.baseMapInitParameters.initExtent){
        var r = this.map.getView().getResolutionForExtent(this.baseMapInitParameters.initExtent, this.map.getSize());
        this.map.getView().setResolution(r);
        this.map.getView().setCenter(this.getExtentCenter(this.baseMapInitParameters.initExtent));

        this.baseMapInitParameters.view.center = this.getExtentCenter(this.baseMapInitParameters.initExtent);
        this.baseMapInitParameters.view.zoom = this.map.getView().getZoom();
      }
      this.drawSoruceVectorLayer = new VectorLayer({source: this.drawSource, zIndex: 31});
      this.map.addLayer(this.drawSoruceVectorLayer);
      this.layersList.unshift({
        layer: this.drawSoruceVectorLayer,
        name: '工具绘制图层',
        key: 'drawSoruceVectorLayer',
        vis: true,
        index: 31})
      //根据创建情况，看是否需要，加参数控制
      this.measureSoruceVectorLayer = new VectorLayer({
        source: this.measureSource,
        style: new Style({ //图层样式
          fill: new Fill({  color: 'rgba(37,241,239,0.2)' }),
          stroke: new Stroke({  color: '#ffcc33',   width: 2  }),
          image: new Circle({ radius: 5,
            stroke: new Stroke({  color: '#ffcc33', width: 1   }),
            fill: new Fill({ color: '#ffffff'  }),
          })
        }),
        zIndex: 32
      });
      this.map.addLayer(this.measureSoruceVectorLayer);
      this.layersList.unshift({
        layer: this.measureSoruceVectorLayer,
        name: '工具测量图层',
        key: 'measureSoruceVectorLayer',
        vis: true,
        index: 32})

      this.featuresSourceVectorLayer = new VectorLayer({source: this.featuresSource, zIndex: 9993});
      this.featuresSourceVectorLayer.name = "featuresSourceVectorLayer";
      this.map.addLayer(this.featuresSourceVectorLayer);
      this.layersList.unshift({
        layer: this.featuresSourceVectorLayer,
        name: '点图层',
        key: 'featuresSourceVectorLayer',
        vis: true,
        index: 9993})

      this.addControls(baseMapInitParameters.controls)

      // this.addEvents()
      if (initcallback != null) {
        initcallback('init completed.')
      }
    } else {
      // console.log("map div target is null")
    }
  }
  //销毁当前的实例， 变量，以及绑定监听，以及DOM元素
  baseMapDestory(){
    //删除监听
    //删除dom
    //删除layer
    //删除map
  }
  // 根据数据重置地图视野，数据，图层等
  reloadMap (baseMapInitParameters, initcallback) {
    // 清除之前的业务图层
    this.clearAllDraws()
    this.clearAllMeasure()
    this.clearAllFeatures()
    this.specialMapLayers2.map((item, index) => {
      try{
        this.map.removeLayer(item);
      } catch (e){
      }
    })
    this.specialMapLayers2 = []
    this.specialMapLayers.map((item, index) => {
      try{
        this.map.removeLayer(item);
      } catch (e){
      }
    })
    this.specialMapLayers = []
    // 加载新底图数据
    let llys = layerUtils.getLayers(baseMapInitParameters.layers)
    llys.forEach(layer => {
      this.map.addLayer(layer)
    })
    // fly to
    let view = baseMapInitParameters.view
    // this.map.getView().animate({
    //   zoom: view.zoom,
    //   center: view.center
    // })
    this.flyTo2(view.center, view.zoom, ()=>{
      // 删除之前的图层然后
      this.baseMapLayers.forEach(layer => {
        this.map.removeLayer(layer)
      })
      this.baseMapLayers = []
      this.viewCy = view
      this.baseMapLayers = llys
    })
  }
  // 闪烁并且定位点
  flashPoint (data) {
    // window.GISMaps.MainMap.getView().animate({
    //   zoom: data.zoom,
    //   center:  data.center
    // }, () => {
      //数据
      if (this.mark) {
        this.mark.close()
        clearTimeout(this.markTimer)
        this.markTimer = null
      }
      let citys = [{
        'name': '',
        'lnglat': data.center,
        'color': '#ff3b20',
        'type': 'circle',
        'speed': 0.5,
      }]
      this.mark = new window.FlashMarker(this.map, citys)
      this.markTimer = setTimeout(()=>{
        if (this.mark) {
          this.mark.close()
          this.mark = null
        }
      }, 3000)
    // })
  }
  //添加控件
  addControls(options){
    let data = options||{}
    if(data.hasOwnProperty("coordinate")&&data.coordinate.show){
      //创建地图鼠标移动，经纬度坐标联动显示
      let style = data.coordinate.style||"position: absolute;top:auto;bottom:0;left:calc(50% - 50px);width: 200px;height: 20px;  z-index: 2000"
      let mousePosition = ' <div style="'+style+'" id="'+this["own_id"] +'_coordinate"></div>';
      $("#" + this["own_id"] + "2d").append(mousePosition);

      let mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById(this["own_id"]+'_coordinate'),
        undefinedHTML: ''
      });
      this.map.addControl(mousePositionControl);//这个在上边已经加了 ,上边先注释掉
    }
    if(data.hasOwnProperty("fullScreen")&&data.fullScreen.show){
      //将全屏显示控件加载到map中
      var fullScreenControl = new FullScreen();
      this.map.addControl(fullScreenControl);
    }
  }
  //返回到原始范围
  zoomToInitView(){
    this.map.getView().animate({
      zoom: this.viewCy.zoom,
      center: this.viewCy.center
    })
  }
  //设置视图为了多地图联动来的
  setView(mainView){
    this.map.setView(mainView);
  }
  getView(){
    return this.view
  }
  addSwipeStyle() {
    //这块添加了部分样式到全局
    $('<style>.map {\n' +
        '            width: 100%;\n' +
        '            height: 100%;\n' +
        '            position: absolute;\n' +
        '            box-sizing: border-box;\n' +
        '            padding: 0;\n' +
        '            margin: 0;\n' +
        '            float:left;\n' +
        '            border-left: 2px solid #333;\n' +
        '        }</style>').appendTo('head');
    //为了卷帘，添加元素，默认还是隐藏
    var swipe = " <div id=\"swipe\" class=\"swipe_bg\" title=\"水平拖动\" style=\"visibility: hidden\" onmouseover=\"this.style.cursor='w-resize'\" onmouseout=\"this.style.cursor='default'\">\n" +
        "        <div class=\"swipe_drag\">\n" +
        "        </div>\n" +
        "    </div>";
    $("#" + this.gisMapContentDiv + "").append(swipe);
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
        '        }</style>').appendTo('head');
  }

  getName() {
    return "007";
  }
  clearAllDraws () {
    this.drawSoruceVectorLayer.getSource().clear()
  }
  clearAllMeasure () {
    this.measureSoruceVectorLayer.getSource().clear()
  }
  clearAllFeatures () {
    this.featuresSourceVectorLayer.getSource().clear()
  }
  clearAllImageFeatures () {
    this.featuresSourceVectorLayerAllImage.getSource().clear()
  }
  clearSHP () {
    this.map.removeLayer(this.featureSHPSource)
  }
  clearVector () {
    this.map.removeLayer(this.specialMapLayer)
  }
  clearAll () {
    this.drawSoruceVectorLayer.getSource().clear();
    this.measureSoruceVectorLayer.getSource().clear();
  }

  drawLayerIndexChange (zIndex) {
    this.drawSoruceVectorLayer.values_.zIndex = zIndex;
    this.map.updateSize()
  }
  measureLayerIndexChange (zIndex) {
    this.drawSoruceVectorLayer.values_.zIndex = zIndex;
    this.map.updateSize()
  }
  featuresLayerIndexChang (zIndex) {
    this.drawSoruceVectorLayer.values_.zIndex = zIndex;
    this.map.updateSize()
  }
  //切换地图  底图切换有可能联动 ，多屏情况
  baseMapLayerChange (name) {
    for (let i = 0; i < this.baseMapLayers.length; i++) {
      var baseMaplayer = this.baseMapLayers[i];
      if (baseMaplayer.values_.name == name) {
        baseMaplayer.values_.visible = true;
      } else {
        baseMaplayer.values_.visible = false;
      }
    }
    this.map.updateSize();
  }
  addLayer (data){
    let layer = layerUtils.getLayer(data);
    this.map.addLayer(layer)
    this.layersList.unshift({
      layer: layer,
      name: data.name,
      key: data.name,
      vis: true,
      index: ++this.ZindexCy + 99})
  }
  removeLayer (key){
    for (let i = 0; i < this.layersList.length; i++) {
      var item = this.layersList[i];
      if (item.key == key) {
        this.map.removeLayer(item.layer)
        this.layersList.splice(i,1)
        break;
      }
    }
  }
  setLayerVis (key, vis) {
    for (let i = 0; i < this.layersList.length; i++) {
      var item = this.layersList[i];
      if (item.key == key) {
        item.layer.values_.visible = vis
        break;
      }
    }
    this.map.updateSize();
  }
  setLayerZIndex (key, index){
    for (let i = 0; i < this.layersList.length; i++) {
      var item = this.layersList[i];
      if (item.key == key) {
        item.layer.values_.zIndex = index
        break;
      }
    }
    this.map.updateSize();
  }
  //切换地图,保留图层
  baseMapLayerChangeVisible (name, exceptname) {
    for (let i = 0; i < this.baseMapLayers.length; i++) {
      var baseMaplayer = this.baseMapLayers[i];
      if (baseMaplayer.values_.name == name || baseMaplayer.values_.name.indexOf(exceptname) != -1) {
        baseMaplayer.values_.visible = true;
      } else {
        baseMaplayer.values_.visible = false;
      }
    }
    this.map.updateSize();
  }
  //创建专题地图图层  ，这个函数没有找到用的地方，可能不需要，带删除
  specialMapLayerInit (initSpecialMapParameter) {
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
          this.specialMapLayers.push(layer);
          this.map.addLayer(layer);
          break;
      }
    }
  }
  //显示隐藏专题图层
  specialMapLayerChange (checkLayer) {
    for (let i = 0; i < this.specialMapLayers.length; i++) {
      var specialMapLayer = this.specialMapLayers[i];
      if (specialMapLayer.values_.name == checkLayer.name) {
        specialMapLayer.values_.visible = checkLayer.visible;
        break;
      }
    }
    this.map.updateSize();
  }
  //指定专题图层显示层级
  specialMapLayerIndexChange (changeLayer) {
    for (let i = 0; i < this.specialMapLayers.length; i++) {
      var specialMapLayer = this.specialMapLayers[i];
      if (specialMapLayer.values_.name == changeLayer.name) {
        specialMapLayer.values_.zIndex = changeLayer.zIndex;
        break;
      }
    }
    this.map.updateSize();
  }
  //专题图层显示层级上移一级
  specialMapLayerIndexUp (layerName) {
    for (let i = 0; i < this.specialMapLayers.length; i++) {
      var specialMapLayer = this.specialMapLayers[i];
      if (specialMapLayer.values_.name == layerName) {
        specialMapLayer.values_.zIndex = specialMapLayer.values_.zIndex + 1;
        break;
      }
    }
    this.map.updateSize();
  }
  //专题图层显示层级下移一级
  specialMapLayerIndexDown (layerName) {
    for (let i = 0; i < this.specialMapLayers.length; i++) {
      var specialMapLayer = this.specialMapLayers[i];
      if (specialMapLayer.values_.name == layerName) {
        specialMapLayer.values_.zIndex = specialMapLayer.values_.zIndex - 1;
        break;
      }
    }
    this.map.updateSize();
  }
  //通过图层名称获取图层对象
  getBaseLayer (layerName) {
    let layers = this.baseMapLayers;
    var layer = null;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].values_.name == layerName) {
        layer = layers[i];
        break;
      }
    }
    return layer;
  }
  //通过图层名称获取图层对象
  getBaseLayerByTitle (layerName) {
    let layers = this.baseMapLayers;
    var layer = null;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].values_.title == layerName) {
        layer = layers[i];
        break;
      }
    }
    return layer;
  }
  //分屏的初始化，待改造
  mapSplitInit (number) {
    // this.closeSwipe();
    // var width = (100 / number);
    // var heitht = this.height;
  }
  //
  drawPolygon (feature) {
    //gisMap.drawSource.clear();
    var style = null;
    if (feature.style) {
      style = new Style({
        fill: new Fill({ color: feature.style.fillcolor }),
        stroke: new Stroke({ color: feature.style.strokecolor,  width: feature.style.strokewidth })
      });
    }else{
      style = new Style({
        fill: new Fill({  color: 'rgba(255, 255, 255, 0)' }),
        stroke: new Stroke({color: '#ffcc33', width: 1})
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
    this.sourceFeature = feature;
    //转wkt为feature
    var featureTemp = featureUtils.transformFeatureFromWkt(this.sourceFeature.geometry);
    //应用样式
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    var source = this.drawSoruceVectorLayer.getSource();
    source.addFeature(featureTemp);
  }
  //转wkt为feature
  transformFeatureFromWkt (wkt) {
    return featureUtils.transformFeatureFromWkt(wkt);
  }
  //转feature为wkt
  transformWktFromFeature (feature) {
    return featureUtils.transformWktFromFeature(feature);
  }
  //转wkt为feature
  transformFeatureFromWkt3857 (wkt) {
    return featureUtils.transformFeatureFromWkt3857(wkt);
  }
  //转feature为wkt
  transformWktFromFeature3857 (feature) {
    return featureUtils.transformWktFromFeature3857(feature);
  }
  openDrawPolygon (drawType, callDrawDataFunc, drawToolStyle) {
    this.drawInfo.isDraw = true;
    this.openDrawTool(drawType, callDrawDataFunc, drawToolStyle);
  }
  openDrawRectangle (drawType, callDrawDataFunc, drawToolStyle) {
    this.drawInfo.isDraw = true;
    this.openDrawTool(drawType, callDrawDataFunc, drawToolStyle);
  }
  //外部有调用的直接，尽量不允许
  setDrawState(tag){
    this.darwState = tag;
  }
  //绘图工具
  //drawType【点：Point，线：LineString，面：Polygon，矩形：Rectangle[Circle]，圆形：Circle，自定义图形：】
  openDrawTool (drawType, callDrawDataFunc, drawToolStyle) { // 初始化地图绘制控件
    this.drawType = drawType;
    if (this.drawInfo.helpTooltipElement) {
      if (this.drawInfo.helpTooltipElement.parentNode) {
        this.drawInfo.helpTooltipElement.parentNode.removeChild(this.drawInfo.helpTooltipElement);
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
    this.map.getInteractions().item(1).setActive(false);

    if (this.draw) {
      this.map.removeInteraction(this.draw); //移除绘制图形
      this.draw = null;
    }
    var self =this;
    this.map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      var helpMsg = '单击绘制'; //当前默认提示信息
      if (self.drawInfo.sketch) {
        helpMsg = "双击结束";
      }
      self.drawInfo.helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
      self.drawInfo.helpTooltip.setPosition(evt.coordinate); //设置帮助提示框的位置
    }); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
    //////////////////////////////////////////////////////////////////////////////
    this.darwState = true;
    var style = new Style({
      fill: new Fill({
        color: 'rgba(37,241,239,0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 1
      })
    });
    if (drawToolStyle) {
      style = new Style({
        fill: new Fill({
          color: drawToolStyle.fillcolor
        }),
        stroke: new Stroke({
          color: drawToolStyle.strokecolor,
          width: drawToolStyle.strokewidth
        })
      });
    }
    if (drawType == 'Point') {
      style = new Style({
        fill: new Fill({
          color: 'rgba(37,241,239,0.2)'
        }),
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: '#e81818'
          })
        }),
        zIndex: 20
      })
    }
    this.drawSoruceVectorLayer.setStyle(style);

    if (drawType == 'Point') {
      this.draw = new Draw({
        source: this.drawSource,
        type: drawType
      });
    }
    if (drawType == 'LineString') {
      this.draw = new Draw({
        source: this.drawSource,
        type: (drawType),
        style: style
      });
    }
    if (drawType == 'Polygon') {
      this.draw = new Draw({
        source: this.drawSource,
        type: (drawType)
      });
    }
    if (drawType == 'Rectangle') {
      this.draw = new Draw({
        source: this.drawSource,
        type: 'Circle',
        style: style,
        geometryFunction: createBox()
      });
    }

    this.draw.on('drawstart', function (evt) {
      self.clearAll();
      self.drawInfo.sketch = evt.feature; //绘制的要素
      rings = "";
    });
    this.map.addInteraction(this.draw);
    //创建帮助提示框
    this.drawInfo.helpTooltipElement = document.createElement('div');
    this.drawInfo.helpTooltipElement.className = 'drawTooltip';
    this.drawInfo.helpTooltip = new Overlay({
      element: this.drawInfo.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.drawInfo.helpTooltip);

    this.draw.on('drawend', function (evt) {
      if(self.drawType=="Point"){
        var arr = self.draw.sketchCoords_;
        rings = "POINT(" + arr[0].toFixed(4) + " " + arr[1].toFixed(4) + ")";
      }
      if(self.drawType=="LineString") {
        var arr = self.draw.sketchCoords_;
        var rings0 = "";
        for (var i = 0; i < arr.length; i++) {
          rings0 += arr[i][0].toFixed(4) + " " + arr[i][1].toFixed(4) + ",";
        }
        rings += "LINESTRING(" + rings0.substring(0, rings0.length - 1) + ")";
      }
      if(self.drawType=="Polygon") {
        var arr = self.draw.sketchCoords_;
        var rings0 = "";
        for (var i = 0; i < arr[0].length; i++) {
          rings0 += arr[0][i][0].toFixed(4) + " " + arr[0][i][1].toFixed(4) + ",";
        }
        rings += "POLYGON((" + rings0 + arr[0][0][0].toFixed(4) + " " + arr[0][0][1].toFixed(4) + "))";
      }
      if(self.drawType=="Rectangle") {
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
      }
      self.drawData = rings;
      self.map.removeEventListener('pointermove');
      self.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
      self.drawInfo.sketch = null;
      self.drawInfo.isDraw = false;
      self.map.removeInteraction(self.draw); //移除测量工具
      self.draw = null;
      if (self.drawInfo.helpTooltipElement) {
        if (self.drawInfo.helpTooltipElement.parentNode) {
          self.drawInfo.helpTooltipElement.parentNode.removeChild(self.drawInfo.helpTooltipElement);
        }
      }
      if (callDrawDataFunc){
        callDrawDataFunc(rings);
      }
    });
  }
  //放大
  zoomOut () {
    this.map.getView().setZoom(this.map.getView().getZoom() + 1);
  }
  //缩小
  zoomIn () {
    this.map.getView().setZoom(this.map.getView().getZoom() - 1);
  }
  closeDrawTool () { //关闭地图绘制控件
    if (this.draw) {
      this.map.removeInteraction(this.draw);
      this.draw = null;
      this.darwState = false;
    }
  }
  openPan () {
    this.map.getInteractions().item(2).setActive(true);
    // this.closeSwipe();
    this.map.removeEventListener('pointermove');
    this.drawInfo.drawTooltipElement = null; //置空测量工具提示框对象
    this.drawInfo.sketch = null;
    this.drawInfo.isDraw = false;
    this.map.removeInteraction(this.draw); //移除测量工具
    if (this.drawInfo.helpTooltipElement) {
      if (this.drawInfo.helpTooltipElement.parentNode) {
        this.drawInfo.helpTooltipElement.parentNode.removeChild(this.drawInfo.helpTooltipElement);
      }
    }
  }
  closePan () {
    this.map.getInteractions().item(2).setActive(false);
  }
  addIcon (feature) {
    let style;
    if (feature.style) {
      style = new Style({image: new Icon(({scale: feature.style.scale,  src: feature.style.src}))  });
    }else{
      style = new Style({image: new Icon(({scale: 0.5,src: '../common/js/gis_plugin/img/blueIcon.png'})) });
    }
    if (feature.geometry == undefined) {
      return;
    }
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    this.featuresSource.addFeature(featureTemp);
  }
  addGif (checked, geometry, attributes, img, name, clickFunc) {
    if (checked) {
      const el = document.createElement('div');
      el.x = geometry.x;
      el.y = geometry.y;
      el.name = name
      el.attr = attributes;
      el.innerHTML = `<img src="${img.src}" />`
      const imgLayer = new Overlay({
        name: name ? name : '',
        positioning: 'center-center',
        //属性
        attributes,
        //overly放置的div
        element: el,
        stopEvent: false
      });
      this.gifLayer.push(imgLayer);
      this.map.addOverlay(imgLayer);
      imgLayer.setPosition([el.x, el.y]);
      if (clickFunc) {
        el.onclick = function (evt) {
          if (!evt.currentTarget.attr) {
            return;
          }
          let attr = evt.currentTarget.attr;
          attr.x = evt.currentTarget.attr.x ? evt.currentTarget.attr.x : 0;
          attr.y = evt.currentTarget.attr.y ? evt.currentTarget.attr.y : 0;
          clickFunc(attr);
        };
      }
    } else {
      this.gifLayer.forEach((item) => {
        this.map.removeOverlay(item)
      });
    }
  }
  addIconV (feature) {
    let style;
    if (feature.style) {
      style = new Style({image: new Icon(({scale: feature.style.scale,  src: feature.style.src}))  });
    }else{
      style = new Style({image: new Icon(({scale: 0.5,src: '../common/js/gis_plugin/img/blueIcon.png'})) });
    }
    if (feature.geometry == undefined) {
      return;
    }
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    this.featuresSource.addFeature(featureTemp);
  }

  toggleStaticImage (isChecked, feature, index) {
    if (isChecked) {
      //转wkt为feature
      if (feature.geometry == null) {
        return
      }
      var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
      var sourceProj = this.map.getView().getProjection(); //获取投影坐标系
      var overlayLayer = new ImageLayer({
        index: index,
        source: new Static({
          url: feature.imagesrc,
          projection: sourceProj,
          imageExtent: featureTemp.getGeometry().getExtent()
        }),
        zIndex: ++this.ZindexCy + 99
      });
      this.m[index] = overlayLayer;
      this.map.addLayer(this.m[index]);
    } else {
      this.map.removeLayer(this.m[index]);
    }
  }

  addPoint (feature) {
    var style = new Style({
      fill: new Fill({
        color: 'rgba(37,241,239,0.2)'
      }),
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: '#e81818'
        })
      }),
      zIndex: 20
    })
    if (feature.style) {
      style = new Style({
        fill: new Fill({
          color: feature.style.fillcolor
        }),
        stroke: new Stroke({
          color: feature.style.strokecolor,
          width: feature.style.strokewidth
        }),
        image: new Circle({
          radius: feature.style.imageradius,
          fill: new Fill({
            color: feature.style.imagefillcolor
          })
        })
      });
    }
    if (feature.geometry == undefined) {
      return;
    }
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    this.featuresSource.addFeature(featureTemp);
  }

  addLineString (feature) {
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
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    this.featuresSource.addFeature(featureTemp);
  }
  addPolygon (feature, source) {
    //this.drawSource.clear(); //是否要清空
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
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    if (source) {
      if (source == "featuresSourcePageImage") {//范围框图层
        this.featuresSourcePageImage.addFeature(featureTemp);
      }
      if (source == "featuresSourceAllImage") {//合并面图层
        this.featuresSourceAllImage.addFeature(featureTemp);
      }
      if (source == "featureSHPSource") {
        this.featureSHPSource.addFeature(featureTemp);
      }
    } else {
      this.featuresSource.addFeature(featureTemp);
    }
  }
  /*addPolygon (feature, source) {
    //this.drawSource.clear(); //是否要清空
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
    if (feature.geometry == undefined || feature.geometry === '') {
      return;
    }
    if (feature.geometry.indexOf("）") != -1) {
      feature.geometry = feature.geometry.replace("）", ")");
    }
    if (feature.geometry.indexOf("（") != -1) {
      feature.geometry = feature.geometry.replace("（", "(");
    }
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    if (source !== underfind) {
      source.addFeature(featureTemp);
    } else {
      this.featuresSource.addFeature(featureTemp);
    }
  }*/
  // addPolygon (feature, source) {
  //   //this.drawSource.clear(); //是否要清空
  //   var style = new Style({
  //     fill: new Fill({ //矢量图层填充颜色，以及透明度
  //       color: 'rgba(255, 255, 255, 0)'
  //     }),
  //     stroke: new Stroke({ //边界样式
  //       color: '#ffcc33',
  //       width: 1
  //     })
  //   });
  //   if (feature.style) {
  //     style = new Style({
  //       fill: new Fill({ //矢量图层填充颜色，以及透明度
  //         color: feature.style.fillcolor
  //       }),
  //       stroke: new Stroke({ //边界样式
  //         color: feature.style.strokecolor,
  //         width: feature.style.strokewidth
  //       })
  //     });
  //   }
  //   if (feature.geometry == undefined || feature.geometry === '') {
  //     return;
  //   }
  //   if (feature.geometry.indexOf("）") != -1) {
  //     feature.geometry = feature.geometry.replace("）", ")");
  //   }
  //   if (feature.geometry.indexOf("（") != -1) {
  //     feature.geometry = feature.geometry.replace("（", "(");
  //   }
  //   var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
  //   featureTemp.setStyle(style);
  //   featureTemp.attributes = feature.attributes;
  //   if (source) {
  //     if (source == "featuresSourcePageImage") {//范围框图层
  //       this.featuresSourcePageImage.addFeature(featureTemp);
  //     }
  //     if (source == "featuresSourceAllImage") {//合并面图层
  //       this.featuresSourceAllImage.addFeature(featureTemp);
  //     }
  //     if (source == "featureSHPSource") {
  //       this.featureSHPSource.addFeature(featureTemp);
  //     }
  //   } else {
  //     this.featuresSource.addFeature(featureTemp);
  //   }
  // }

  addCrossPolygon (feature, nodeId, source, style) {
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
    var featureTemp = featureUtils.transformFeatureFromWkt(feature.geometry);
    featureTemp.setStyle(style);
    featureTemp.attributes = feature.attributes;
    //添加到图层
    if (source) {
      if (source == "featuresSourceAllImage") { //合并面图层
        gisMap.featuresSourceAllImage.addFeature(featureTemp);
      }
    }
  }

  toggleLayer (isChecked, url, val, name, type) {
    let arr = ['yumi', 'xiaomai', 'huasheng']
    if (isChecked) {
      let index = arr.includes(name) ? 9999 : 999
      this.specialMapLayer = new ImageLayer({
        name: name !== undefined ? name : '',
        zIndex: ++this.ZindexCy + index,
        source: new ImageArcGISRest({
          ratio: 1,
          params: {
            // 'LAYERS': 'show:' + val,
          },
          url: url,
          projection: new Projection({
            units: 'degrees',
            code: 'EPSG:4326'
          })
        })
      });
      // this.specialMapLayer = layerUtils.getLayer({layerType: 'OnlineTileArcGIS4326',name: val, layerUrl: url, visible: true});
      this.specialMapLayers.push(this.specialMapLayer);
      this.map.addLayer(this.specialMapLayer);
    } else {
      this.specialMapLayers.map((item, index) => {
        if (!arr.includes(item.values_.name) && type === 'ny') {
          try{
            // let myIndex = this.specialMapLayer.findIndex((value) => value === item)
            this.map.removeLayer(item);
            this.specialMapLayers.splice(index, 1)
          } catch (e) {}
        } else if (type !== 'ny') {
          this.map.removeLayer(item);
          this.specialMapLayers = []
        }
      })
    }
  }
  toggleLayer2 (isChecked, url, val, name) {
    if (isChecked) {
      //分辨率
      var resolutions = [
        1.40625,//0
        0.703125,//1
        0.3515625,//2
        0.17578125,//3
        0.087890625,//4
        0.0439453125,//5
        0.02197265625,//6
        0.010986328125,//7
        0.0054931640625,//8
        0.00274658203125,//9
        0.001373291015625,//10
        0.0006866455078125,//11
        0.00034332275390625,//12
        0.000171661376953125,//13
        0.0000858306884765625,//14
        0.00004291534423828125,//15
        0.000021457672119140625,//16
        0.000010728836059570312,//17
        0.000005364418029785156,//18
        // 0.000002682209014892578,//19
        // 0.000001341104507446289//20
      ];
      //瓦片矩阵
      // var origin = [-400.0, 400.0];
      var origin = [-180.0, 90.0];
      var tileGrid = new TileGrid({
        tileSize: 256,
        origin: origin,
        resolutions: resolutions
      });
      this.specialMapLayer2 = new Tile({
        name: name,
        title: name,
        source: new XYZ({
          tileGrid: tileGrid,
          projection: 'EPSG:4326',//必填
          url: url+'/tile/{z}/{y}/{x}',
        })
      });
      // this.specialMapLayer2 = new ImageLayer({
      //   name: name !== undefined ? name : '',
      //   source: new ImageArcGISRest({
      //     ratio: 1,
      //     params: {
      //       'LAYERS': 'show:' + val,
      //     },
      //     url: url,
      //     projection: new Projection({
      //       units: 'degrees',
      //       code: 'EPSG:4326'
      //     })
      //   })
      // });
      // this.specialMapLayer = layerUtils.getLayer({layerType: 'OnlineTileArcGIS4326',name: val, layerUrl: url, visible: true});
      this.specialMapLayers2.push(this.specialMapLayer2);
      this.map.addLayer(this.specialMapLayer2);
    } else {
      this.specialMapLayers2.map((item, index) => {
        try{
          this.map.removeLayer(item);
        } catch (e){
        }
      })
      this.specialMapLayers2 = []
    }
  }
  // 多边形定位
  zoomToPolygon (feature, level) {
    if (!feature) {
      return;
    }
    var polygon = feature.getGeometry();
    var point = this.getCenterPoint(polygon.getExtent());
    this.map.getView().fit(polygon.getExtent());
    var zoom = this.map.getView().getZoom() + 1;
    this.map.getView().animate({
      zoom: zoom,
      center: [point[0], point[1]],
    });
    var self =this;
    setTimeout(function () {
      var zoom = zoom - 1;
      self.map.getView().animate({
        zoom: zoom,
        center: [point[0], point[1]],
      });
      self.map.getView().fit(polygon.getExtent());
    }, 500);
  }
  // 点定位
  zoomToPoint (feature, level) {
    if (!feature) {
      return
    }
    var polygon = feature.getGeometry();
    var point = this.getCenterPoint(polygon.getExtent());
    this.map.getView().animate({
      zoom: level,
      center: [point[0], point[1]]
    })
  }

  getExtentHeight (extent) {
    var l = getHeight(extent);
    return l;
  }
  getExtentCenter (extent) {
    var c = getCenter(extent);
    return c;
  }
  //定位到某地
  zoomTo (feature) {
    var polygon = feature.getGeometry();
    var r = this.map.getView().getResolutionForExtent(polygon.getExtent(), this.map.getSize());
    this.map.getView().setResolution(r);
    this.map.getView().setCenter(this.getExtentCenter(polygon.getExtent()));
  }
  flyTo2(location, endZoom, done) {
    var duration = 2500;
    var zoom = this.map.getView().getZoom();
    var parts = 2;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    this.map.getView().animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );
    this.map.getView().animate(
      {
        zoom: zoom - 3,
        duration: duration / 2,
      },
      {
        zoom: endZoom,
        duration: duration / 2,
      },
      callback
    );
  }
  //飞到某地
  flyTo (feature, done) {
    var duration = 2000;
    var parts = 2;
    var called = false;
    var polygon = feature.getGeometry();
    var location = this.getCenterPoint(polygon.getExtent());
    var r = this.map.getView().getResolutionForExtent(polygon.getExtent(), this.map.getSize().map(item => item + 500));
    // taylor注释 zoom太大
    // var zoom = this.map.getView().getZoomForResolution(r);
    var zoom = 8
    function callback(complete) {
      --parts;
      if (called) {
        return
      }
      if (parts === 0 || !complete) {
        called = true;
        // taylor注释因为报错
        // done(complete)
      }
    }

    this.map.getView().animate({
      center: location,
      duration: duration
    }, callback);
    this.map.getView().animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom - 1,
      duration: duration / 2
    }, callback);
  }
  zoomToLevel (level) {
    if (!level) {
      return;
    }
    this.map.getView().animate({
      zoom: level
    });
  }
  //获取当前可视级别
  getMapLevel () {
    var zoom = this.map.getView().getZoom();
    return zoom;
  }
  //获取可视范围
  getMapView () {
    var view = this.map.getView();
    return arr = view.calculateExtent(this.map.getSize());
  }

  getPixelFromCoordinate (point)  {
    this.map.getPixelFromCoordinate([point.x, point, y]);
  }

  getCenterPoint (arr) {
    return calcUtils.getCenterPoint(arr);
  }
  measureArea () {
    this.measureInfo.isMeasure = true;
    this.openMeasureTool("area");
    this.measureInfo.isMeasureArea = true;
  }
  measureLength () {
    this.measureInfo.isMeasure = true;
    this.openMeasureTool("LineString");
    this.measureInfo.isMeasureArea = false;
  }
  openMeasureTool (type) {
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

    this.map.getInteractions().item(1).setActive(false);
    if (this.measure) {
      this.map.removeInteraction(this.measure); //移除绘制图形
    }
    var self = this;
    this.map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      var helpMsg = '单击绘制'; //当前默认提示信息
      //判断绘制几何类型设置相应的帮助提示信息
      if (self.measureInfo.sketch) {
        var geom = (self.measureInfo.sketch.getGeometry());
        if (geom instanceof Polygon) {
          helpMsg = self.measureInfo.continuePolygonMsg; //绘制多边形时提示相应内容
        } else if (geom instanceof LineString) {
          helpMsg = self.measureInfo.continueLineMsg; //绘制线时提示相应内容
        }
      }
      self.measureInfo.helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
      self.measureInfo.helpTooltip.setPosition(evt.coordinate); //设置帮助提示框的位置
    }); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
    var type = (type == 'area' ? 'Polygon' : 'LineString');
    this.measure = new Draw({
      //source: gisMap.measureSource,//测量绘制层数据源
      type: /** @type {GeometryType} */ (type), //几何图形类型
      style: new Style({ //图层样式
        fill: new Fill({
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
    this.map.addInteraction(this.measure);
    this.createMeasureTooltip(); //创建测量工具提示框
    this.createHelpTooltip(); //创建帮助提示框
    //定义一个事件监听
    var listener;
    //定义一个控制鼠标点击次数的变量
    var count = 0;
    //绑定交互绘制工具开始绘制的事件
    this.measure.on('drawstart',function (evt) {
      self.measureInfo.sketch = evt.feature; //绘制的要素
      var tooltipCoord = evt.coordinate; // 绘制的坐标
      //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
      listener = self.measureInfo.sketch.getGeometry().on('change', function (evt) {
        var geom = evt.target; //绘制几何要素
        var output;
        if (geom instanceof Polygon) {
          self.map.removeEventListener('singleclick');
          output = self.formatArea(/** @type {Polygon} */ (geom)); //面积值
          tooltipCoord = geom.getInteriorPoint().getCoordinates(); //坐标
        } else if (geom instanceof LineString) {
          output = self.formatLength(/** @type {LineString} */ (geom)); //长度值
          tooltipCoord = geom.getLastCoordinate(); //坐标
        }
        self.measureInfo.measureTooltipContentElement.innerHTML = output; //将测量值设置到测量工具提示框中显示
        self.measureInfo.measureTooltip.setPosition(tooltipCoord); //设置测量工具提示框的显示位置
        self.measureInfo.lastPoint = tooltipCoord;
      });
      //地图单击事件
      self.map.on('singleclick', function (evt) {
        //如果是第一次点击，则设置测量提示框的文本内容为起点
        if (count == 0) {
          self.measureInfo.measureTooltipContentElement.innerHTML = "起点";
        }
        if (self.measureInfo.measureResult != self.measureInfo.measureTooltipContentElement.innerHTML &&
            self.measureInfo.measureTooltipContentElement.innerHTML != "") {
          //设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
          self.measureInfo.measureTooltip.setPosition(evt.coordinate);
          //根据鼠标点击位置生成一个点
          var point = new Point(evt.coordinate);
          //将该点要素添加到矢量数据源中
          var feature = new Feature(point);
          feature.id = self.measureInfo.measureTooltipId;
          self.measureSource.addFeature(feature);
          //更改测量提示框的样式，使测量提示框可见
          self.measureInfo.measureTooltipElement.className = 'measureTooltip';
          //创建测量提示框
          self.createMeasureTooltip();
          //gisMap.createMeasureTooltipClose();//重新创建一个测试工具提示框显示结果
          //点击次数增加
          count++;
          self.measureInfo.measureResult = self.measureInfo.measureTooltipContentElement.innerHTML;
        }
      });
    });
    //绑定交互绘制工具结束绘制的事件
    this.measure.on('drawend',function (evt) {
      var geom = evt.feature; //绘制几何要素
      geom.id = self.measureInfo.measureTooltipId;
      self.measureInfo.measureTooltipId++;
      self.measureSource.addFeature(geom);
      if (!self.measureInfo.isMeasureArea) {
        //根据鼠标点击位置生成一个点
        var point = new Point(self.measureInfo.lastPoint);
        //将该点要素添加到矢量数据源中
        var feature = new Feature(point);
        feature.id = self.measureInfo.measureTooltipId;
        self.measureSource.addFeature(feature);
        self.map.removeEventListener('pointermove');
        self.map.removeEventListener('singleclick');
        count = 0;
        self.createMeasureTooltipClose(); //重新创建一个关闭工具提示框显示结果
        self.measureInfo.sketch = null; //置空当前绘制的要素对象
        self.measureInfo.measureTooltipElement = null; //置空测量工具提示框对象
        self.measureInfo.isMeasure = false;
        self.map.removeInteraction(self.measure); //移除测量工具
      }
      if (self.measureInfo.helpTooltipElement) {
        if (self.measureInfo.helpTooltipElement.parentNode) {
          self.measureInfo.helpTooltipElement.parentNode.removeChild(self.measureInfo.helpTooltipElement);
        }
      }
      if (self.measureInfo.isMeasureArea) {
        self.createMeasureTooltipClose(); //重新创建一个关闭工具提示框显示结果
        self.measureInfo.sketch = null; //置空当前绘制的要素对象
        self.measureInfo.measureTooltipElement = null; //置空测量工具提示框对象
        self.measureInfo.isMeasure = false;
        self.map.removeInteraction(self.measure); //移除测量工具
        if (self.measureInfo.helpTooltipElement) {
          if (self.measureInfo.helpTooltipElement.parentNode) {
            self.measureInfo.helpTooltipElement.parentNode.removeChild(self.measureInfo.helpTooltipElement);
          }
        }
      }
      unByKey(listener);
    });
  }
  /**
   *创建一个新的帮助提示框（tooltip）
   */
  createHelpTooltip () {
    this.measureInfo.helpTooltipElement = document.createElement('div');
    this.measureInfo.helpTooltipElement.className = 'measureTooltip';
    this.measureInfo.helpTooltip = new Overlay({
      element: this.measureInfo.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.measureInfo.helpTooltip);
  }
  /**
   *创建一个新的测量工具提示框（tooltip）
   */
  createMeasureTooltip () {
    this.measureInfo.measureTooltipElement = document.createElement('div');
    this.measureInfo.measureTooltipElement.className = 'measureTooltip';
    this.measureInfo.measureTooltipContentElement = document.createElement('div');
    this.measureInfo.measureTooltipContentElement.style.display = "inline";
    this.measureInfo.measureTooltipElement.append(this.measureInfo.measureTooltipContentElement);

    this.measureInfo.measureTooltip = new Overlay({
      element: this.measureInfo.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.measureInfo.measureTooltips.push(this.measureInfo.measureTooltip);
    this.map.addOverlay(this.measureInfo.measureTooltip);
    this.measureInfo.measureTooltipId++;
  }
  /**
   *创建一个新的测量工具关闭提示框（tooltip）
   */
  createMeasureTooltipClose () {
    this.measureInfo.measureTooltipElement.className = 'measureTooltip';
    this.measureInfo.measureTooltipElement.append(this.measureInfo.measureTooltipContentElement);
    this.measureInfo.measureTooltipCloseElement = document.createElement('a');
    this.measureInfo.measureTooltipCloseElement.innerHTML = "✖";
    this.measureInfo.measureTooltipCloseElement.setAttribute("id", this.measureInfo.measureTooltipId);
    this.measureInfo.measureTooltipCloseElement.setAttribute("title", "清除本次测量结果");
    this.measureInfo.measureTooltipCloseElement.style.cursor = "pointer";
    this.measureInfo.measureTooltipCloseElement.style.display = "inline";
    this.measureInfo.measureTooltipElement.append(this.measureInfo.measureTooltipCloseElement);
    var gisMap = this;
    this.measureInfo.measureTooltipCloseElement.onclick = function (evt) {
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
      "id": this.measureInfo.measureTooltipId,
      "measureTooltips": this.measureInfo.measureTooltips,
      "measureSourceFeatures": this.measureSource.getFeatures()
    };
    this.measureInfo.measureResults.push(obj);
    this.measureInfo.measureTooltips = [];
    this.measureInfo.measureTooltipId++;
  }
  formatLength (line) {
    return calcUtils.formatLength(this.map,line); //返回线的长度
  }
  formatArea (polygon) {
    return calcUtils.formatArea(this.map,polygon); //返回多边形的面积
  }

  addFeatureClick (callBackFeatureClick, poPshow) {
    this.featurePopInfo.isFeaturePopOpen = true;
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

    this.featurePopInfo.container = document.createElement('div');
    this.featurePopInfo.container.className = 'feature-popup';
    this.featurePopInfo.popupCloser = document.createElement('a');
    this.featurePopInfo.popupCloser.className = 'feature-popup-closer';
    this.featurePopInfo.container.append(this.featurePopInfo.popupCloser);
    // 弹出窗内容DIV
    this.featurePopInfo.content = document.createElement('div');
    this.featurePopInfo.container.append(this.featurePopInfo.content);
    this.featurePopInfo.content.style.visibility = "hidden";
    // 弹出窗关闭
    this.featurePopInfo.popupCloser.setAttribute("title", "关闭");
    this.featurePopInfo.popupCloser.style.cursor = "pointer";
    this.featurePopInfo.popupCloser.style.display = "inline";

    this.featurePop = new Overlay(
        ({
          //要转换成overlay的HTML元素
          element: this.featurePopInfo.container,
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
    let self = this;
    // openlayers只有针对整个地图事件监听，可以通过以下方式达到对feature监听，也可对feature自定义点击事件。
    this.map.on('click', function (e) {
      // 在点击时获取像素区域
      var pixel = self.map.getEventPixel(e.originalEvent);
      self.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        if (layer) {
          if (layer.name == "featuresSourceVectorLayerPageImage") {
            // coodinate存放了点击时的坐标信息
            var coodinate = e.coordinate;
            callBackFeatureClick(self.featurePopInfo.content, feature);
            // 显示overlay
            if (poPshow) {
              if (!self.darwState) {
                self.featurePopInfo.content.style.visibility = "visible";
                // 设置overlay的显示位置
                var center = getCenter(feature.values_.geometry.extent_);
                self.featurePop.setPosition(center);
                self.map.addOverlay(self.featurePop);
              }
            }
          }
        }
      });
    });
    // 鼠标移动事件
    this.map.on('pointermove', function (e) {
      if (e.dragging) {
        return;
      }
      var pixel = self.map.getEventPixel(e.originalEvent);
      var feature = self.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        if (layer) {
          if (layer.name == "featuresSourceVectorLayer") {
            return feature;
          }
        }
        return null;
      });
      if (feature) {
        // store.dispatch('getRowId', feature.attributes.F_DATAID)
      } else {
        // store.dispatch('getRowId', "")
      }
    });
    this.featurePopInfo.popupCloser.onclick = function (evt) {
      self.featurePopInfo.content.style.visibility = "hidden";
      self.featurePop.setPosition(undefined);
    };
  }
  addHighlight (val, isshow) {
    // var srv = this.featureOverlay.getSource();
    // srv.clear();
    // var srv = this.featuresSource.getFeatures();
    if (isshow) {
      if (this.featureTempWkt) {
        this.featuresSource.removeFeature(this.featureTempWkt)
      }
      var style = new Style({
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgba(255, 255, 255, .1)'
        }),
        stroke: new Stroke({ // 边界样式
          color: '#ffcc33',
          width: 3
        })
      });
      if (val) {
        // 转wkt为feature
        this.featureTempWkt = featureUtils.transformFeatureFromWkt(val.WKTRESPONSE);
        // 应用样式
        this.featureTempWkt.setStyle(style);
        // this.featureOverlay.getSource().addFeature(featureTemp)
        this.featuresSource.addFeature(this.featureTempWkt)
      }
    } else {
      this.featuresSource.removeFeature(this.featureTempWkt)
    }
  }
  closeFeaturePop () {
    this.featurePopInfo.isFeaturePopOpen = false;
    this.map.removeOverlay(this.featurePop);
  }
  openTwoDMap () {
  }
  openThreeDMap () {
  }
  // 获取指定名字获取图层
  getMapLayer (name, index) {
    let layer = null;
    let layers = this.map.getLayers();
    for (let i = 0; i < layers.array_.length; i++) {
      let _layer = layers.array_[i];
      if (_layer.values_.name == name) {
        layer = _layer
      }
    }
    return layer
  }
  // 清除点击表格定位重绘的图层
  productTableFeaturesRemove () {
    var productTableFeatures = this.featuresSource.getFeatures();
    for (var i = 0; i < productTableFeatures.length; i++) {
      if (productTableFeatures[i].attributes["productTable_id"] === '') {
        this.featuresSource.removeFeature(productTableFeatures[i]);
        break
      }
    }
  }
  // 清除移入表格定位重绘的图层
  productTableHoverRemove () {
    var productTableHoverFeatures = this.featuresSource.getFeatures();
    for (var i = 0; i < productTableHoverFeatures.length; i++) {
      if (productTableHoverFeatures[i].attributes["productTable_hover"] === '') {
        this.featuresSource.removeFeature(productTableHoverFeatures[i]);
        break
      }
    }
  }
  coverAnaRemoveFearture (feature) {
    var coverAnaFeatures = this.featuresSourceAllImage.getFeatures();
    for (var i = 0; i < coverAnaFeatures.length; i++) {
      if (coverAnaFeatures[i].attributes === feature.attributes) {
        this.featuresSourceAllImage.removeFeature(coverAnaFeatures[i]);
        break
      }
    }
  }
  // 改变位置分辨率
  checkZoomAndCenter () {
    if (this.isReplayCy) {
      this.isReplayCy = false;
      return
    }
    this.viewArrCy = this.viewArrCy.slice(0, this.viewArrIndexCy + 1);
    let wkt = this.sourceFeature;
    let zoom = this.map.getView().getZoom();
    let obj = {wkt, zoom};
    this.viewArrCy.push(obj);
    this.viewArrIndexCy = this.viewArrCy.length - 1;
  }
  // 回放-前放
  computeViewArr (handle) {
    this.isReplayCy = true;
    let index = this.viewArrIndexCy;
    if (handle === 'prev') {
      index = index - 1 < 0 ? index : --index
    } else if (handle === 'next') {
      index = index + 1 > this.viewArrCy.length - 1 ? index : ++index
    }
    this.viewArrIndexCy = index;
    this.localtionCy(this.viewArrCy[index]);
  }
  // 定位
  localtionCy (local = {}) {
    this.clearAllDraws();
    let feature = local.wkt;
    this.drawPolygon(feature);
    let f = featureUtils.transformFeatureFromWkt(feature.geometry);
    // 飞到某地
    this.flyTo(f, () => {
    })
  }

  panTangtherMaps = []
  _test_move = true
  togeterMapMove (maps){
    // [map1 , map2]
    var self = this;
    var maps = maps;
    if(maps.length == 2) {
      maps[0].events.register("move", maps[0], function() {
        if( self._test_move) {
          var  c1 = this.getCenter();
          var z1 = this.getZoom();
          self._test_move = false;
          if(maps[1])
            maps[1].setCenter(c1,z1);
          self._test_move = true;
        }
      });
      if(maps[1])
        maps[1].events.register("move", maps[1], function() {
          if( self._test_move) {
            var  c1 = this.getCenter();
            var z1 = this.getZoom();
            self._test_move = false;
            maps[0].setCenter(c1,z1);
            self._test_move = true;
          }
        });
    }
  }
  // 开启卷帘
  mapOpenSwipe (name) {
    var _this = this;
    // let objLayer = layerUtils.getLayer(name)
    let objLayer = _this.getMapLayer(name)
    _this.loadCssCode(' .swipe_bg {' +
        'position: relative;/*相对于父div占满*/' +
        'z-index: 10;' +
        'width: 4px;' +
        'background-color:rgb(216,216,216);' +
        'border:  solid 1px #848484;' +
        '			 -moz-user-select:none;\n'+
        '			 -moz-user-select: none;\n'+
        '			 -webkit-user-select: none;\n'+
        '			 -ms-user-select: none;\n'+
        '			 -khtml-user-select: none;\n'+
        '			 user-select: none;\n'+
        '}');
    _this.loadCssCode('.swipe_drag {' +
        'border-radius:5px;' +
        'left:-10px;' +
        'top:50%;' +
        'bottom:50%;' +
        'position: absolute;' +
        'width: 24px;' +
        'height: 34px;' +
        'background-color:rgb(216,216,216);' +
        //'background-image:url(../common/js/gis_plugin/swipe/vDrag.png);' +
        'background-repeat:no-repeat;' +
        'background-size:100% 100%;' +
        '-moz-background-size:100% 100%;' +
        'border:  solid 1px #848484;' +
        '-moz-user-select:none;\n'+
        '}');
    if (!_this.swipe) {
      var width = 100;
      var heitht = 100;
      var swipe = document.createElement('div');
      swipe.setAttribute("id", "swipe");
      swipe.setAttribute("class", "swipe_bg");
      swipe.setAttribute("title", "水平拖动");
      swipe.style.visibility = "hidden";
      swipe.innerHTML = "<div class=swipe_drag></div>";
      document.getElementById(_this.gisMapContentDiv).append(swipe);
      document.getElementById("swipe").style.height = document.getElementById(_this.gisMapContentDiv).offsetHeight - 2 + "px";
      document.getElementById("swipe").style.visibility = "visible"; //显示
      swipe.onmousemove=function (e) {
        this.style.cursor = 'w-resize';
      }
      swipe.onmouseout=function (e) {
        this.style.cursor = 'default';
      }
      _this.swipe = document.getElementById("swipe"); //获取元素

      var height = document.getElementById(_this.gisMapContentDiv).clientHeight;
      var width = document.getElementById(_this.gisMapContentDiv).clientWidth;

      _this.swipe.style.left = width / 2 + "px";
    }

    var x; //存储div的坐标
    var isDrop = false; //移动状态的判断鼠标按下才能移动
    _this.swipe.onmousedown = function (e) {
      var e = e || window.event; //要用event这个对象来获取鼠标的位置
      x = e.clientX - _this.swipe.offsetLeft;
      isDrop = true; //设为true表示可以移动
    }

    var moveX;
    document.onmousemove = function (e) {
      //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
      if (isDrop) {
        var e = e || window.event;
        moveX = e.clientX - x; //得到距离左边距离
        _this.swipe.style.left = moveX + "px";
        _this.map.render()
      } else {
        return;
      }
    }
    document.onmouseup = function () {
      isDrop = false; //设置为false不可移动
    }
    _this.map.on('pointerdrag', function(event){
      // isDrop = true
      _this.map.render()
    })
    objLayer.on('prerender', function(event) {
      if (isDrop) {
        var ctx = event.context;
        var mapSize = _this.map.getSize();
        var layerWidth = moveX;
        var tl = getRenderPixel(event, [layerWidth, 0]);
        var tr = getRenderPixel(event, [mapSize[0], 0]);
        var bl = getRenderPixel(event, [layerWidth, mapSize[1]]);
        var br = getRenderPixel(event, mapSize);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        ctx.clip();
      }
    });

    objLayer.on('postrender', function(event) {
      var ctx = event.context;
      ctx.restore();
    });
  }
  // 关闭卷帘
  closeSwipe () {
    var _this = this;
    if (_this.swipe) {
      _this.swipe.style.left = 0 + "px";
      var height = document.body.clientHeight;
      var width = document.body.clientWidth;
      document.getElementById("swipe").style.visibility = "hidden";
      var child = document.getElementById("swipe");
      if (child)
        child.parentNode.removeChild(child)
      _this.swipe = null;
    }
  }
  loadCssCode (code) {
    var _this = this;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    try {
      //for Chrome Firefox Opera Safari
      style.appendChild(document.createTextNode(code));
    } catch (ex) {
      //for IE
      style.styleSheet.cssText = code;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
}
