/* eslint-disable */
import $ from 'jquery'
// import Cesium from 'cesium/Cesium.js'
// import TaskProcessor from 'cesium/Core/TaskProcessor'
// import 'cesium/Widgets/widgets.css'

export const gisMap3D = {
  layerParameters: null,
  initSpecialMapParameter: null,
  currentMapName: "矢量",
  flickerPoint: [],
  flickerPointTemp: [],
  isThreeMap: false,
  resolution: [
    {
      "level": 0,
      "resolution": 1.40625,
      "scale": 590995197.1416691
    },
    {
      "level": 1,
      "resolution": 0.703125,
      "scale": 295497598.5708346
    },
    {
      "level": 2,
      "resolution": 0.3515625,
      "scale": 147748799.2854173
    },
    {
      "level": 3,
      "resolution": 0.17578125,
      "scale": 73874399.64270864
    },
    {
      "level": 4,
      "resolution": 0.087890625,
      "scale": 36937199.82135432
    },
    {
      "level": 5,
      "resolution": 0.0439453125,
      "scale": 18468599.91067716
    },
    {
      "level": 6,
      "resolution": 0.02197265625,
      "scale": 9234299.95533858
    },
    {
      "level": 7,
      "resolution": 0.010986328125,
      "scale": 4617149.97766929
    },
    {
      "level": 8,
      "resolution": 0.0054931640625,
      "scale": 2308574.98883465
    },
    {
      "level": 9,
      "resolution": 0.00274658203125,
      "scale": 1154287.49441732
    },
    {
      "level": 10,
      "resolution": 0.001373291015625,
      "scale": 577143.747208662
    },
    {
      "level": 11,
      "resolution": 0.0006866455078125,
      "scale": 288571.873604331
    },
    {
      "level": 12,
      "resolution": 0.00034332275390625,
      "scale": 144285.936802165
    },
    {
      "level": 13,
      "resolution": 0.000171661376953125,
      "scale": 72142.9684010827
    },
    {
      "level": 14,
      "resolution": 0.0000858306884765625,
      "scale": 36071.4842005414
    },
    {
      "level": 15,
      "resolution": 0.00004291534423828125,
      "scale": 18035.7421002707
    },
    {
      "level": 16,
      "resolution": 0.000021457672119140625,
      "scale": 9017.87105013534
    },
    {
      "level": 17,
      "resolution": 0.000010728836059570312,
      "scale": 4508.93552506767
    },
    {
      "level": 18,
      "resolution": 0.000005364418029785156,
      "scale": 2254.467762533835
    },
    {
      "level": 19,
      "resolution": 0.000002682209014892578,
      "scale": 1127.233881266918
    },
    {
      "level": 20,
      "resolution": 0.000001341104507446289,
      "scale": 563.6169406334588
    }
  ],
  scaleLineControl: null,
  poPshow: false,
  callBackFeatureClick: null,
  callBackThreeDMapFeatureClick: null,
  gisMap3DContentDiv: null,
  threeDMapDiv: null, //3ddiv
  threeDMapDivObj: null, //3ddiv
  threeDMap: null, //3d地图对象
  threeDMapHandler: null, //3d地图事件
  threeDMapDrawHandler: null, //3d绘图事件
  threeDMapDragZoomHandler: null, //拉框放大事件
  threeDMapMeasureHandler: null, //3d绘图事件
  threeDMapMeasureVolumeHandler: null, //体积测量事件
  threeDMapSlopeSurfaceAnalysisHandler: null, // 坡面分析事件
  threeDMapSlopeAnalysisHandler: null, // 坡度分析事件
  threeDMapSlopeSurfaceAnalysis: {
    "AnalysiseEntitys": [], // 测量物体
  },
  threeDMapHeightMeasureHandler: null, //高度测量
  threeDMapRriangleMeasure: null, //三角测量
  threeDMapMeasureVolume: {
    "sectionCircles": [], //圆形切面
    "measesureEntitys": [], //测量物体
    "polygons": [], //测量范围
    "points": [] //点集合
  },
  threeDMapMeasureTooltip: null,
  threeDMapTooltip: {
    "threeDMapTooltip": null,
    "meassageInfo": null
  },
  measure_entities: null,
  threeDMapImagerLayers: null,
  threeDMapLayers: [], //3d基础底图图层
  threeDSpecialMapLayers: [], //3d专题地图图层
  initcallbackfunc: null,
  darwState: false,
  threeDFeaturePopInfo: {
    "isFeaturePopOpen": false,
    "container": null,
    "content": null,
    "closer": null,
    "contentInfo": null
  },
  /**
   * @Description:  地图初始化
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  initgisMap3D: function(initParameters, initcallback, gisMapContentDiv, threeDMapDiv) {
    gisMap3D.threeDMapDiv = threeDMapDiv;
    gisMap3D.initcallbackfunc = initcallback;
    if (gisMap3D.threeDMapDiv != null) {
      //初始化3d地图
      gisMap3D.threeDMap = new Cesium.Viewer(gisMap3D.threeDMapDiv, {
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
        imageryProvider: false //必须写不然加载不出球
        //加载谷歌卫星影像
        //imageryProvider : new Cesium.UrlTemplateImageryProvider({url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"})
      });
      gisMap3D.threeDMap._cesiumWidget._creditContainer.style.display = "none"; //	去除版权信息
      // gisMap3D.threeDMap.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
      gisMap3D.threeDMapImagerLayers = gisMap3D.threeDMap.imageryLayers;
    }

    // if (gisMapContentDiv != null) {
    //     //地图容器样式
    //     gisMap3D.loadCssCode('.gisMapContent {' +
    //         'position: relative;' +
    //         'border: none;' +
    //         'padding: 0px;' +
    //         'margin: 0px;' +
    //         'left: 0px;' +
    //         'top: 0px;' +
    //         'width: 100%;' +
    //         'height: 100%;\\n\' +')
    //     gisMap3D.initParameters = initParameters;
    //     gisMap3D.gisMapContentDiv = gisMapContentDiv;
    //     gisMap3D.threeDMapDiv = threeDMapDiv;
    //     if (gisMap3D.threeDMapDiv != null) {
    //         //初始化3d地图
    //         gisMap3D.threeDMap = new Cesium.Viewer(gisMap3D.threeDMapDiv, {
    //             // animation: false, //动画控制，默认true
    //             // geocoder: false,//地名查找,默认true
    //             // timeline: false,//时间线,默认true
    //             // homeButton: false,//主页按钮，默认true
    //             // fullscreenButton: false,//全屏按钮,默认显示true
    //             // infoBox: false,//点击要素之后显示的信息,默认true
    //             // navigationHelpButton: false,//导航帮助说明,默认true
    //             // navigationInstructionsInitiallyVisible: false,
    //             // sceneModePicker: false,//是否显示地图2D2.5D3D模式
    //
    //             animation: false,       //是否显示动画控件
    //             homeButton: false,       //是否显示home键
    //             geocoder: false,         //是否显示地名查找控件        如果设置为true，则无法查询
    //             baseLayerPicker: false, //是否显示图层选择控件
    //             timeline: false,        //是否显示时间线控件
    //             fullscreenButton: false, //是否全屏显示
    //             // fullscreenElement : document.body,//全屏时渲染的HTML元素,
    //             scene3DOnly: false,     //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //             infoBox: false,         //是否显示点击要素之后显示的信息
    //             sceneModePicker: false,  //是否显示投影方式控件  三维/二维
    //             navigationInstructionsInitiallyVisible: false,
    //             navigationHelpButton: false,     //是否显示帮助信息控件
    //             selectionIndicator: false,        //是否显示指示器组件
    //             sceneMode: 3, //初始场景模式 1: 2D模式 ,2: 2D循环模式 ,3 :3D模式  Cesium.SceneMode
    //             imageryProvider: false//必须写不然加载不出球
    //         });
    //         //gisMap.threeDMap.extend(Cesium.viewerCesiumNavigationMixin, {});
    //         gisMap3D.threeDMap.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //         gisMap3D.threeDMap.scene.globe.depthTestAgainstTerrain = false;//高程遮挡效果
    //         // gisMap.threeDMap.scene.globe.enableLighting=true;
    //         gisMap3D.threeDMap.scene.highDynamicRange =false;//控制模糊
    //         gisMap3D.threeDMap._cesiumWidget._creditContainer.style.display = "none";  //	去除版权信息
    //
    //         // gisMap._openTwoAndThreeMapSynchronization();
    //
    //         /**
    //          * 设置后当相机高度达到设置的最大和最小高度时将不再放大和缩小
    //          */
    //         gisMap3D.threeDMap.scene.screenSpaceCameraController.minimumZoomDistance = 100;//相机的高度的最小值
    //         gisMap3D.threeDMap.scene.screenSpaceCameraController.maximumZoomDistance = 590995197.1416691;  //相机高度的最大值400000000
    //
    //
    //         gisMap3D.threeDMapHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    //
    //         gisMap3D.threeDMap.camera.setView({
    //             destination: Cesium.Cartesian3.fromDegrees(initParameters.views.center[0],initParameters.views.center[1],gisMap3D.resolution[initParameters.views.zoom].scale)
    //         });
    //
    //         if (gisMap3D.threeDMapDiv) {
    //
    //             gisMap3D.threeDMapDivObj = document.getElementById(gisMap3D.threeDMapDiv);
    //             var child = document.getElementById(gisMap3D.threeDMapDiv);
    //             if (child)
    //             {
    //                 child.parentNode.removeChild(child);
    //             }
    //         }
    //     }
    if (initcallback != null) {
      gisMap3D.initcallbackfunc('init completed.');
    }
    // }
  },
  /**
   * @Description:  加载css样式
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  loadCssCode: function(code) {
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
  },
  /**
   * @Description:  添加图层
   * @Param:  parameters：图层参数
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  addLayer: function(_parameters) {
    gisMap3D.layerParameters = _parameters;
    if (gisMap3D.threeDMapDiv != null) {
      for (var i = 0; i < gisMap3D.layerParameters.layers.length; i++) {
        var layerParameter = gisMap3D.layerParameters.layers[i];
        switch (layerParameter.layerType) {
          case "WMS":
            var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
              // url :'https://nationalmap.gov.au/proxy/http://geoserver.nationalmap.nicta.com.au/geotopo_250k/ows',//initSpecialMaplayer.layerUrl,
              show: layerParameter.visible,
              url: layerParameter.layerUrl,
              layers: layerParameter.layerName,
              // layers : 'Hydrography:bores',
              parameters: {
                service: 'WMS',
                transparent: true,
                format: 'image/png'
              }
            }));
            layer.show = layerParameter.visible;
            var layerObj = {
              layer: layer,
              name: layerParameter.name
            }
            gisMap3D.threeDMapLayers.push(layerObj);
            break;
          case "XYZ":
            {
              var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                // layers: layerParameter.layerName,
                url: layerParameter.layerUrl
              }));
              layer.show = layerParameter.visible;
              layer.Gamma = 0.06;
              layer.Brightness = 3.0; //亮度
              layer.Contrast = 1.0; //对比度
              layer.Hue = 0; //色调
              layer.Saturation = 1.0; //饱和度
              var layerObj = {
                layer: layer,
                name: layerParameter.name
              }
              gisMap3D.threeDMapLayers.push(layerObj);
              break;
            }
          case "THREEDWMTS":
            {
              var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                // layers: layerParameter.layerName,
                url: layerParameter.layerUrl,
                layer: layerParameter.layer,
                style: layerParameter.style, //"default",
                format: layerParameter.format, //"tiles",
                tileMatrixSetID: layerParameter.matrixSet,
                maximumLevel: layerParameter.maximumLevel
                //tileMatrixSetID:"GoogleMapsCompatible"//layerParameter.ESPG
                // show: layerParameter.visible
              }));
              layer.show = layerParameter.visible;
              layer.Gamma = 0.5;
              layer.brightness = 2.0; //亮度
              layer.contrast = 1.0; //对比度
              layer.hue = 0; //色调
              layer.saturation = 1.0; //饱和度
              var layerObj = {
                layer: layer,
                name: layerParameter.name
              }
              gisMap3D.threeDMapLayers.push(layerObj);
              break;
            }
          case "ImageArcGIS":
            {
              var projection; // = new ol.proj.Projection({//定义坐标系
              //     code: parameters.code,//'EPSG:4326',
              //     units: parameters.units//'degrees'
              // });
              var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.ArcgisMap3DServerImageryProvider({
                layers: layerParameter.layers,
                url: layerParameter.layerUrl
              }));
              layer.show = layerParameter.visible;
              layer.alpha = 0.8;
              // layer.Gamma = 0.5;
              // layer.brightness = 2.0;//亮度
              // layer.contrast = 1.0;//对比度
              // layer.hue = 0;//色调
              // layer.saturation = 1.0;//饱和度
              var layerObj = {
                layer: layer,
                name: layerParameter.name
              }
              gisMap3D.threeDMapLayers.push(layerObj);
              break;
            }
          case "TileArcGIS":
            {
              var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.ArcgisMap3DServerImageryProvider({
                // layers: layerParameter.layerName,
                url: layerParameter.layerUrl
              }));
              layer.show = layerParameter.visible;
              layer.Gamma = 0.5;
              layer.brightness = 2.0; //亮度
              layer.contrast = 1.0; //对比度
              layer.hue = 0; //色调
              layer.saturation = 1.0; //饱和度
              var layerObj = {
                layer: layer,
                name: layerParameter.name
              }
              gisMap3D.threeDMapLayers.push(layerObj);
              break;
            }
          case "ImageStatic":
            {
              var layer = gisMap3D.threeDMapImagerLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                // url :'https://nationalmap.gov.au/proxy/http://geoserver.nationalmap.nicta.com.au/geotopo_250k/ows',//initSpecialMaplayer.layerUrl,
                show: layerParameter.visible,
                url: layerParameter.layerUrl,
                // rectangle : Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
                rectangle: Cesium.Rectangle.fromDegrees(layerParameter.extent[0], layerParameter.extent[1], layerParameter.extent[2], layerParameter.extent[3]),
                // layers: layerParameter.layerName
              }));
              layer.show = layerParameter.visible;
              var layerObj = {
                layer: layer,
                name: layerParameter.name
              }
              gisMap3D.threeDMapLayers.push(layerObj);
              break;
            }
        }
      }
    }

  },
  /**
   * @Description:  隐藏图层
   * @Param:  name：图层名称
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  hideLayer: function(name) {
    if (gisMap3D.threeDMapDiv != null) {
      for (var i = 0; i < gisMap3D.threeDMapLayers.length; i++) {
        var layer = gisMap3D.threeDMapLayers[i]
        if (layer.name == name) {
          layer.layer.show = false;
        }
      }
    }

  },
  /**
   * @Description:  显示图层
   * @Param:  name：图层名称
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  showLayer: function(name) {
    if (gisMap3D.threeDMapDiv != null) {
      for (var i = 0; i < gisMap3D.threeDMapLayers.length; i++) {
        var layer = gisMap3D.threeDMapLayers[i]
        if (layer.name == name) {
          layer.layer.show = true;
        }
      }
    }

  },
  /**
   * @Description:  删除图层
   * @Param: name：图层名称
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  removeLayer: function(name) {
    if (gisMap3D.threeDMapDiv != null) {
      let arr = [...gisMap3D.threeDMapLayers]
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].name == name) {
          gisMap3D.threeDMapImagerLayers.remove(arr[i].layer);
          gisMap3D.threeDMapLayers.splice(i, 1)
        }
      }
    }
  },
  /**
   * @Description:  打开三维地图
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/4/9
   */
  openThreeDMap: function() {
    if (gisMap3D.threeDMapDiv != null) {
      gisMap3D.loadCssCode('.map {width:' + 100 + '%;height:' + 100 + '%;float:left;position:absolute;box-sizing: border-box;}');
      document.getElementById(gisMap3D.gisMap3DContentDiv).append(gisMap3D.threeDMapDivObj);
      gisMap3D.isThreeMap = true;
      document.getElementById(gisMap3D.threeDMapDiv).style.visibility = "visible";
    }

    // gisMap3D._openTwoAndThreeMapSynchronization();
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
    var format = new ol.format.WKT();
    var feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326'
    });
    return feature;
  },
  threeDMapZoomToPoint: function(centerPoint, scale) {
    gisMap3D.threeDMap.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(centerPoint[0], centerPoint[1], scale) //相机飞入点
    });
  },
  threeDMapZoomToPolygon: function(polygon) {
    var rect = [110.2, 35.6, 112.3, 36.7];
    var loactionTectEntity = window.gisMap3D.threeDMap.entities.add({
      name: 'loactionTectEntity',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray(polygon),
        height: 0,
        material: Cesium.Color.RED.withAlpha(0),
        outline: false,
        outlineColor: Cesium.Color.blue
      }
    });
    window.gisMap3D.threeDMap.flyTo(loactionTectEntity, {
      duration: 5,
      offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90))
    });
    // gisMap3D.threeDMap.zoomTo(loactionTectEntity);
    var removeEndEvent = gisMap3D.threeDMap.camera.moveEnd.addEventListener(function(moveEndPosition) {
      if (loactionTectEntity)
        gisMap3D.threeDMap.entities.remove(loactionTectEntity);
      removeEndEvent = undefined
    });
    // return loactionTectEntity;
    //gisMap3D.threeDMap.entities.remove(loactionTectEntity);
    //var flyPromise = gisMap3D.threeDMap.flyTo(loactionTectEntity);
  },
  /**
   * @Description:打开地形
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/3/27
   */
  openTerrain: function(url) {
    var scene = gisMap3D.threeDMap.scene;
    var terrainProvider;
    terrainProvider = new Cesium.CesiumTerrainProvider({
      url: url, // '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
      requestWaterMask: true
    });
    scene.terrainProvider = terrainProvider;
    // gisMap3D.threeDMap.scene.globe.depthTestAgainstTerrain = true;//高程遮挡效果
  },
  /**
   * @Description:关闭地形
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/3/27
   */
  closeTerrain: function() {
    var scene = gisMap3D.threeDMap.scene;
    var terrainProvider;
    terrainProvider = new Cesium.EllipsoidTerrainProvider({});
    scene.terrainProvider = terrainProvider;
    // gisMap3D.threeDMap.scene.globe.depthTestAgainstTerrain = false;//高程遮挡效果
  },
  getThreeMapHeight: function() {
    if (gisMap3D.threeDMapDiv != null) {
      var height = Math.ceil(gisMap3D.threeDMap.camera.positionCartographic.height);
      return height;
    }
    return 0;
  },
  getTwoMaplevle: function() {
    if (gisMap3D.twoDMapDiv != null) {
      var level = gisMap3D.map.getView().getZoom();
      return level
    }
    return 0;
  },
  /**
   * 清空漫游路径
   * @method stopFly3DPaths
   * @param
   * @return
   */
  clearFly3DPaths: function() {
    gisMap3D.threeDMap.trackedEntity = undefined;
    // bxmap.FlyCesium.isDrawFly = false;
    // bxmap.FlyCesium.draw3DObj = null;
    gisMap3D.threeDMap.entities.removeAll(); //清空所有模型
    //清空绘制飞行路线
    if (this.drawPolyline) {
      gisMap3D.threeDMap.scene.primitives.remove(this.drawPolyline);
      this.drawPolyline = null;
    }
  },
  /**
   * 飞行漫游路径
   * @method showFly3DPaths
   * @param  pathsData 飞行路径信息,格式如下:{"orientation":{"heading":2.411783930363565,"pitch":-0.21097267398444197,"roll":0.0015622392231300353},"position": {"x":-2206260.239730831,"y":5510911.392077349,"z":2331987.10863007}, "geometry":{"type": "LineString", "coordinates": [[101.80089882736969, 26.60700234866561], [101.80082205161088, 26.607156056057718]]} }
   * @param  position 飞行路径跳转位置
   * @return
   */
  showFly3DPaths: function(pathsData) {
    this.clearFly3DPaths();
    gisMap3D.threeDMap.camera.setView({
      destination: pathsData.position,
      orientation: pathsData.orientation,
    });
    setTimeout(function() {
      executeFly3D();
    }, 200);

    function executeFly3D() {
      if (pathsData && pathsData.geometry) {
        var path = gisMap3D.transformFeatureFromWkt(pathsData.geometry);
        var positionA = path.values_.geometry.flatCoordinates;
        var position = [];
        if (positionA.length > 0) {
          var count = 0;
          for (var i = 0; i < positionA.length; i++) {
            count++
            if ((count % 2) == 0) {
              var x = positionA[i - 1]
              var y = positionA[i]
              position.push({
                x: x,
                y: y
              });
            }

          }
        } else {
          return;
        }

        function computeCirclularFlight() {
          var property = new Cesium.SampledPositionProperty();
          for (var i = 0; i < position.length; i++) {
            if (i == 0) {
              var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
              //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
              var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 0);
              property.addSample(time, _position);
            }
            if (i < 10000 && i > 0) {
              var position_a = new Cesium.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1]);
              if (i < 976) {
                //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 0);
              } else if (i > 975 && i < 986) {
                //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 20 * (i - 980));
                var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 0);
              } else if (i > 985) {
                //var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 200);
                var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 0);
              }

              var positions = [Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_a), Cesium.Ellipsoid.WGS84.cartesianToCartographic(_position)];
              var a = new Cesium.EllipsoidGeodesic(positions[0], positions[1]);
              var long = a.surfaceDistance;
              var _time = long / 50;
              var time = Cesium.JulianDate.addSeconds(property._property._times[i - 1], _time, new Cesium.JulianDate());

              property.addSample(time, _position);
            }
          }
          return property;
        }

        var start = Cesium.JulianDate.fromDate(new Date(2018, 3, 15, 16));
        var stop = Cesium.JulianDate.addSeconds(start, 30000, new Cesium.JulianDate());

        //Make sure viewer is at the desired time.
        gisMap3D.threeDMap.clock.startTime = start.clone();
        gisMap3D.threeDMap.clock.stopTime = stop.clone();
        gisMap3D.threeDMap.clock.currentTime = start.clone();
        gisMap3D.threeDMap.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        //gisMap3D.threeDMap.clock.clockRange = Cesium.ClockRange.UNBOUNDED; //
        //gisMap3D.threeDMap.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; //
        //gisMap3D.threeDMap.clock.multiplier = 10;//值越大，飞行越快
        gisMap3D.threeDMap.clock.multiplier = 0.6;
        gisMap3D.threeDMap.clock.canAnimate = false;
        gisMap3D.threeDMap.clock.shouldAnimate = true; //设置时间轴动态效果

        var _position = computeCirclularFlight();

        gisMap3D.threeDMap.entityFly = gisMap3D.threeDMap.entities.add({
          //Set the entity availability to the same interval as the simulation time.
          availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
          })]),
          position: _position,
          orientation: new Cesium.VelocityOrientationProperty(_position),
          /*model: {
              uri:GLOBAL.domainResource+"/systems/common-bx-gis/models/cesium/SampleData/models/CesiumAir/Cesium_Air.gltf",
              scale: 6,
              minimumPixelSize: 64,
              //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
          },*/
          point: {
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            pixelSize: 15,
          },
          //Show the path as a pink line sampled in 1 second increments.
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            //width: 30
            width: 10
          }
        });
        gisMap3D.threeDMap.trackedEntity = gisMap3D.threeDMap.entityFly;
        setTimeout(function() {
          gisMap3D.threeDMap.camera.zoomOut(500.0); //缩小地图，避免底图没有数据
        }, 100);
      } else {
        return;
      }
    }
  },
  /**
   * 暂停飞行漫游路径
   * @method pauseFly3DPaths
   * @return
   */
  pauseFly3DPaths: function() {
    var clockViewModel = gisMap3D.threeDMap.clockViewModel;
    if (clockViewModel.shouldAnimate) {
      clockViewModel.shouldAnimate = false;
    } else if (gisMap3D.threeDMap.clockViewModel.canAnimate) {
      clockViewModel.shouldAnimate = true;
    }
  },
  /**
   * 向前飞行漫游路径
   * @method playForwardFly3DPaths
   * @return
   */
  playForwardFly3DPaths: function() {
    var clockViewModel = gisMap3D.threeDMap.clockViewModel;
    var multiplier = clockViewModel.multiplier;
    if (multiplier < 0) {
      clockViewModel.multiplier = -multiplier;
    }
    clockViewModel.shouldAnimate = true;
  },
  /**
   * 向后飞行漫游路径
   * @method playForwardFly3DPaths
   * @return
   */
  playReverseFly3DPaths: function() {
    var clockViewModel = gisMap3D.threeDMap.clockViewModel;
    var multiplier = clockViewModel.multiplier;
    if (multiplier > 0) {
      clockViewModel.multiplier = -multiplier;
    }
    clockViewModel.shouldAnimate = true;
  },
  /**
   * 设定飞行漫游路径
   * @method DrawFly3DPaths
   * @return
   */
  DrawFly3DPaths: function(drawHelper) {
    var T = this;
    this.clearFly3DPaths();
    drawHelper.startDrawingPolyline({
      callback: function(positions) {
        T.drawPolyline = new DrawHelper.PolylinePrimitive({
          positions: positions,
          width: 5,
          type: "plot",
          geodesic: true
        });
        gisMap3D.threeDMap.scene.primitives.add(T.drawPolyline);
        T.drawPolyline.setEditable();
        //构造设定路线的返回信息
        var coordinates = [];
        var position = null;
        var heading = null;
        var pitch = null;
        var roll = null;
        for (var i = 0; i < positions.length; i++) {
          var cartographic = Cesium.Cartographic.fromCartesian(positions[i]); //世界坐标转地理坐标（弧度）
          var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180]; //地理坐标（弧度）转经纬度坐标
          //console.log(point);
          coordinates.push(point);
        }
        //orientation":{"heading":2.411783930363565,"pitch":-0.21097267398444197,"roll":0.0015622392231300353},"position": {"x":-2206260.239730831,"y":5510911.392077349,"z":2331987.10863007},
        position = drawHelper._cameraPosition;
        heading = drawHelper._cameraHeading;
        pitch = drawHelper._cameraPitch;
        roll = drawHelper._cameraRoll;
        var pathsData = {
          "orientation": {
            "heading": heading,
            "pitch": pitch,
            "roll": roll
          },
          "position": position,
          "geometry": {
            "type": "LineString",
            "coordinates": coordinates
          }
        };
        if (bxmap.FlyCesium) {
          bxmap.FlyCesium.draw3DObj = T.draw3DObj = pathsData;
          bxmap.FlyCesium.isDrawFly = true;
        }
        //return T.draw3DObj;

      }
    });
  },
  /**
   * 退出飞行漫游路径
   * @method stopFly3DPaths
   * @param
   * @return
   */
  stopFly3DPaths: function() {
    var start = Cesium.JulianDate.fromDate(new Date());
    gisMap3D.threeDMap.clock.startTime = start.clone();
    var stop = Cesium.JulianDate.addSeconds(start, 300000000, new Cesium.JulianDate());
    gisMap3D.threeDMap.clock.stopTime = stop.clone();
    //gisMap3D.threeDMap.entities.remove(this.entityFly);
    this.clearFly3DPaths();
  },
  /**
   * @Description:高度测量
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/7/3
   */
  heightMeasure: function() {
    gisMap3D.threeDMapHeightMeasureHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    gisMap3D.threeDMapHeightMeasureHandler.setInputAction(function(event) {
      // Pick----屏幕坐标
      //Cartesian----世界坐标
      //cartographic-----地理坐标（弧度）
      var position = event.position; //屏幕坐标
      var ellipsoid = gisMap3D.threeDMap.scene.globe.ellipsoid;
      //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
      var cartesian = gisMap3D.threeDMap.camera.pickEllipsoid(position, ellipsoid);
      if (cartesian) {
        //将笛卡尔三维坐标转为地图坐标（弧度）
        var cartographic = gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //将地图坐标（弧度）转为十进制的度数
        var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
        var alti_String = (gisMap3D.threeDMap.camera.positionCartographic.height / 1000).toFixed(2);
      }
      var ray = gisMap3D.threeDMap.camera.getPickRay(event.position); //屏幕坐标转换成经纬度坐标。
      var position = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //转笛卡尔空间直角坐标系-世界坐标系
      if (Cesium.defined(position)) {

        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
        var geoPt1 = gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(position);
        alert("点击处海拔高度为：" + cartographic.height + "米," + "X:" + position.x + ",Y:" + position.y);
        gisMap3D.threeDMapHeightMeasureHandler.destroy()
      } else {}
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },
  /**
   * @Description:  三角测量
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/4/18
   */
  triangleMeasure: function() {
    gisMap3D.measure_entities = gisMap3D.threeDMap.entities.add(new Cesium.Entity());
    gisMap3D.threeDMapTriangleMeasureHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene._imageryLayerCollection);
    var positionsTriangle = [];
    var tempPoints; //保存直角点
    var poly = null;
    gisMap3D.threeDFeaturePopInfo.container = document.createElement('div');
    gisMap3D.threeDFeaturePopInfo.container.setAttribute("id", "threeDMapMeasureTooltip");

    gisMap3D.threeDMapMeasureTooltip = document.createElement('div');

    var threeDMapDiv = document.getElementById(gisMap3D.threeDMapDiv);
    var threeDMapMeasureTooltip = document.getElementById("threeDMapMeasureTooltip");
    if (threeDMapMeasureTooltip)
      threeDMapDiv.removeChild(threeDMapMeasureTooltip);
    threeDMapDiv.append(gisMap3D.threeDMapMeasureTooltip);

    var cartesian = null;
    var floatingPoint; //浮动点
    gisMap3D.threeDMapMeasureTooltip.style.display = "block";
    gisMap3D.threeDMapTriangleMeasureHandler.setInputAction(function(movement) {
      gisMap3D.threeDMapMeasureTooltip.style.left = movement.endPosition.x + 3 + "px";
      gisMap3D.threeDMapMeasureTooltip.style.top = movement.endPosition.y - 25 + "px";
      gisMap3D.threeDMapMeasureTooltip.innerHTML = '<p>单击开始，双击结束</p>';
      cartesian = gisMap3D.threeDMap.scene.pickPosition(movement.endPosition);
      if (positionsTriangle.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolylinePrimitive(positionsTriangle);
        } else {
          positionsTriangle.pop();
          positionsTriangle.push(cartesian.clone());
          tempPoints = positionsTriangle;
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    gisMap3D.threeDMapTriangleMeasureHandler.setInputAction(function(movement) {
      gisMap3D.threeDMapMeasureTooltip.style.display = "none";
      if (positionsTriangle.length == 0) {
        cartesian = gisMap3D.threeDMap.scene.pickPosition(movement.position);
        positionsTriangle.push(cartesian.clone());
        positionsTriangle.push(cartesian.clone());
        floatingPoint_g = floatingPoint = gisMap3D.threeDMap.entities.add({
          parent: gisMap3D.measure_entities,
          name: '多边形面积',
          position: positionsTriangle[0],
          point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.none
          }
        });
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    gisMap3D.threeDMapTriangleMeasureHandler.setInputAction(function(movement) {
      gisMap3D.threeDMapTriangleMeasureHandler.destroy();
      gisMap3D.threeDMapMeasureTooltip.style.display = "none";
      //在三维场景中添加线
      var tempPositions1 = [];
      var tempPositions2 = [];
      tempPositions1.push(positionsTriangle[0].clone());
      // tempPositions1.push(tempPoints.clone());
      tempPositions1.push(positionsTriangle[1].clone());
      var textDistance = gisMap3D.getHeight(tempPositions1) + "米";
      gisMap3D.threeDMap.entities.add({
        parent: gisMap3D.measure_entities,
        name: '等经纬度',
        position: tempPositions1[0].clone(),
        polyline: {
          show: true,
          positions: tempPositions1,
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.RED
          }),
          width: 2
        },
        label: {
          text: textDistance,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -20)
        }
      });
      tempPositions2.push(tempPoints[0].clone());
      tempPositions2.push(positionsTriangle[1].clone());
      textDistance = gisMap3D.getSpaceDistance(tempPositions2) + "公里";

      gisMap3D.threeDMap.entities.add({
        parent: gisMap3D.measure_entities,
        name: '等高度直线',
        position: tempPositions2[0].clone(),
        polyline: {
          show: true,
          positions: tempPositions2,
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.RED
          }),
          width: 2
        },
        label: {
          text: textDistance,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(60, -20)
        }
      });

    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    var PolylinePrimitive = (function() {
      function _(positions) {
        this.options = {
          parent: gisMap3D.measure_entities,
          name: '直线',
          polyline: {
            show: true,
            positions: [],
            material: Cesium.Color.GOLD,
            width: 2
          },
          label: {
            font: '18px sans-serif',
            fillColor: Cesium.Color.GOLD,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(20, -40)
          }
        };
        this.positions = positions;
        this._init();
      }

      _.prototype._init = function() {
        var _self = this;
        var _update = function() {
          return positions;
        };
        var _update_label = function() {
          return positions[1].clone();
        };
        var _text = function() {
          var text_temp = gisMap3D.getSpaceDistance(positions);
          text_temp = text_temp + "公里";
          return text_temp;
        };
        //实时更新polygon.hierarchy
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
        this.options.position = new Cesium.CallbackProperty(_update_label, false);
        this.options.label.text = new Cesium.CallbackProperty(_text, false);
        gisMap3D.threeDMap.entities.add(this.options);
      };
      return _;
    })();
  },
  /**
   * @Description:  获取高度
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/4/18
   */
  getHeight: function(_positions) {
    var cartographic = Cesium.Cartographic.fromCartesian(_positions[0]);
    var cartographic1 = Cesium.Cartographic.fromCartesian(_positions[1]);
    var height_temp = cartographic1.height - cartographic.height;
    return height_temp.toFixed(2);
  },
  //空间两点距离计算函数
  getSpaceDistance: function(positions) {
    var distance = 0;
    for (var i = 0; i < positions.length - 1; i++) {

      var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      //返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      distance = distance + s;
    }
    return distance.toFixed(2);
  },
  /**
   * @Description:坡度分析
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/24
   */
  slopeAnalysis: function() {
    gisMap3D.threeDMapSlopeAnalysisHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
  },
  /**
   * @Description:清除  剖面坡度分析实体
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/7/6
   */
  clearSlopeSurfaceAnalysisEntiyt: function() {
    for (var i = 0; i < gisMap3D.threeDMapSlopeSurfaceAnalysis.AnalysiseEntitys.length; i++) {
      var analysiseEntity = gisMap3D.threeDMapSlopeSurfaceAnalysis.AnalysiseEntitys[i];
      if (analysiseEntity) {
        gisMap3D.threeDMap.entities.remove(analysiseEntity);
      }
    }
  },
  /**
   * @Description:剖面坡度分析
   * @Param:interval:间隔值点数量,callBackSurfaceAnalysis回调函数
   * @return:
   * @Author: kbh
   * @Date: 2019/4/18
   */
  slopeSurfaceAnalysis: function(interval, callBackSurfaceAnalysis) {
    if (interval == null || interval == 0) {
      interval = 100;
    }
    gisMap3D.threeDMapSlopeSurfaceAnalysisHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    gisMap3D.createThreeMapTooltip();
    var minPoints = 2;
    var options = {
      polyline: {
        show: true,
        positions: [],
        material: Cesium.Color.RED,
        width: 3,
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      description: "自定义line",
    };
    var positions = [];
    var movementPositions0 = [];
    var movementPositions1 = [];
    var poly = undefined;
    gisMap3D.threeDMapSlopeSurfaceAnalysisHandler.setInputAction(function(startMovement) {
      var startPosition = {
        "x": startMovement.position.x,
        "y": startMovement.position.y,
      };
      if (startPosition != null) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(startMovement.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          if (cartesian) {
            if (positions.length == 0) {
              positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //startPoint=cartesian;
            movementPositions0.push(cartesian)
            //startPoint1=movement.position;
            movementPositions1.push(startPosition);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    gisMap3D.threeDMapSlopeSurfaceAnalysisHandler.setInputAction(function(movement) {
      var position = movement.endPosition;
      if (position != null) {
        if (positions.length == 0) {
          gisMap3D.showThreeMapTooltip(position, "单击开始");
        } else {
          gisMap3D.threeDMapSlopeSurfaceAnalysisHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          var position1;
          var cartographic;
          var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
          if (ray)
            position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
          if (position1)
            cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
          if (cartographic) {
            //海拔
            var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
            var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            if (cartesian) {
              if (positions.length >= minPoints) {
                if (!Cesium.defined(poly)) {
                  poly = gisMap3D.threeDMap.entities.add(options);
                  gisMap3D.threeDMapSlopeSurfaceAnalysis.AnalysiseEntitys.push(poly);
                  poly.polyline.positions = new Cesium.CallbackProperty(function() {
                    return positions;
                  }, false) //调用Cesium方法实现实时更新
                } else {
                  if (cartesian != undefined) {
                    positions.pop();
                    cartesian.y += (1 + Math.random());
                    positions.push(cartesian);
                  }
                }
              }
              gisMap3D.showThreeMapTooltip(position, "双击结束");
            }
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    gisMap3D.threeDMapSlopeSurfaceAnalysisHandler.setInputAction(function(endMovement) {
      // var endPosition = endMovement.position;
      var endPosition = {
        "x": endMovement.position.x,
        "y": endMovement.position.y,
      };
      if (endPosition != null) {
        if (positions.length < minPoints) {
          return;
        } else {
          // var cartesian = gisMap3D.threeDMap.scene.camera.pickEllipsoid(position, gisMap3D.threeDMap.scene.globe.ellipsoid);
          var position1;
          var cartographic;
          var ray = gisMap3D.threeDMap.scene.camera.getPickRay(endMovement.position);
          if (ray)
            position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
          if (position1)
            cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
          if (cartographic) {
            //海拔
            var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
            var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            //startPoint=cartesian;
            movementPositions0.push(cartesian)
            //startPoint1=movement.position;
            movementPositions1.push(endPosition);
            if (cartesian) {
              gisMap3D.threeDMapSlopeSurfaceAnalysisHandler.destroy()
              gisMap3D.setThreeMapTooltipVisible(false);
            }
          }
          var pointSum = interval;
          var distance = Math.round(Cesium.Cartesian3.distance(movementPositions0[0], movementPositions0[1])); //dp1、dp2 都是三维坐标系//空间贴地距离算高程
          var path = [];
          path.push(movementPositions0[0]);
          path.push(movementPositions0[1]);
          var Len = 0;
          var Len1 = 0;
          var Len2 = 0;
          len1 = gisMap3D.getSpaceDistance(path); //三维距离包含高度
          var startray1 = gisMap3D.threeDMap.scene.camera.getPickRay(movementPositions1[0]); //屏幕转地理坐标：
          var endray1 = gisMap3D.threeDMap.scene.camera.getPickRay(movementPositions1[1]); //屏幕转地理坐标：
          var startPosition1 = gisMap3D.threeDMap.scene.globe.pick(startray1, gisMap3D.threeDMap.scene); //地理坐标转三维坐标
          var endPosition1 = gisMap3D.threeDMap.scene.globe.pick(endray1, gisMap3D.threeDMap.scene); //地理坐标转三维坐标

          var startCartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(startPosition1);
          var endCartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(endPosition1);

          var startLat1 = Cesium.Math.toDegrees(startCartographic1.latitude);
          var startLng1 = Cesium.Math.toDegrees(startCartographic1.longitude);
          var endLat1 = Cesium.Math.toDegrees(endCartographic1.latitude);
          var endLng1 = Cesium.Math.toDegrees(endCartographic1.longitude);

          Len2 = Math.round(gisMap3D.getStraightLineDistance(startLng1, startLat1, endLng1, endLat1)); //空间水平距离

          // 计算起点和终点之间的地形高度
          var positions1 = [Cesium.Cartographic.fromCartesian(movementPositions0[0])];

          var tempStartPoint = Cesium.Cartographic.fromCartesian(movementPositions0[0]);
          var tempEndPoint = Cesium.Cartographic.fromCartesian(movementPositions0[1]);
          for (var i = 1; i < pointSum; i++) {
            var cart = Cesium.Cartesian3.lerp(movementPositions0[0], movementPositions0[1], i / pointSum, new Cesium.Cartesian3());
            positions1.push(Cesium.Cartographic.fromCartesian(cart));
          }
          positions1.push(Cesium.Cartographic.fromCartesian(movementPositions0[1]));
          //var promise = Cesium.sampleTerrainMostDetailed(gisMap3D.threeDMap.terrainProvider, positions1);
          var heightArr = []; //插值点高度数组
          var heightDValueArr = []; //差值点高度差数组
          var heightDistanceArr = []; //差值点距离数组
          var heightSlopeArr = []; //插值点坡度数组
          //positions1[i].height切片高度
          for (var i = 0; i < positions1.length; i++) {
            heightArr.push(Math.round(gisMap3D.threeDMap.scene.globe.getHeight(positions1[i]))); //海拔高度
            if ((i + 1) < positions1.length) {

              var startLatTemp = Cesium.Math.toDegrees(positions1[i].latitude);
              var startLngTemp = Cesium.Math.toDegrees(positions1[i].longitude);
              var endLatTemp = Cesium.Math.toDegrees(positions1[i + 1].latitude);
              var endLngTemp = Cesium.Math.toDegrees(positions1[i + 1].longitude);

              var distanceTemp = Math.round(gisMap3D.getStraightLineDistance(startLngTemp, startLatTemp, endLngTemp, endLatTemp)); //空间水平距离
              heightDistanceArr.push(distanceTemp);
            }
          }
          for (var j = 0; j < heightArr.length; j++) {
            if ((j + 1) < heightArr.length) {
              heightDValueArr.push(Math.abs(heightArr[j] - heightArr[j + 1])); //差值点高度差
            }
          }
          heightSlopeArr.push(0);
          for (var k = 0; k < heightDistanceArr.length; k++) {

            //A
            //**
            //****
            //*******
            //**********
            //************
            //***************
            //******************
            //********************B
            //C

            var ab = Math.sqrt(heightDValueArr[k] * heightDValueArr[k] + heightDistanceArr[k] * heightDistanceArr[k]);
            var bc = heightDistanceArr[k];
            var ca = heightDValueArr[k];
            var cosABC = (ab * ab + bc * bc - ca * ca) / (2 * ab * bc) //余弦值
            var angleABC = Math.acos(cosABC); //弧度
            angleABC = (angleABC * 180 / Math.PI).toFixed(2) //转度
            heightSlopeArr.push(angleABC);
            //heightSlopeArr.push(Math.acos((heightDistanceArr[k]*heightDistanceArr[k]+heightDistanceArr[k]*heightDistanceArr[k])/2*Math.sqrt(heightDValueArr[k]*heightDValueArr[k]+heightDistanceArr[k]*heightDistanceArr[k])*heightDistanceArr[k])*180/Math.PI);
          }
          // var slope= Cesium.Math.toDegrees(Cesium.Cartesian3.angleBetween(movementPositions0[0], movementPositions0[1]))* 180 / Math.PI;;
          var data = {
            "slope": heightSlopeArr, //坡度
            "distance": distance, //距离
            "heightArr": heightArr //高度
          }
          callBackSurfaceAnalysis(data)

        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  },
  threeDMapDrawTool: function(drawType, callDrawDataFunc, drawToolStyle) {
    var entitie = null;
    gisMap3D.threeDMapDrawHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    gisMap3D.createThreeMapTooltip();
    if (drawType == 'Point') //点
    {
      //单击鼠标左键画点
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          entitie = gisMap3D.threeDMap.entities.add({
            position: cartesian,
            point: {
              color: Cesium.Color.RED,
              pixelSize: 5,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
          });
          gisMap3D.threeDMapDrawHandler.destroy();
          gisMap3D.setThreeMapTooltipVisible(false);
          callDrawDataFunc(entitie);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position = movement.endPosition;
        if (position != null) {
          gisMap3D.showThreeMapTooltip(position, "单击绘制");
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
    if (drawType == 'LineString') //线
    {
      var minPoints = 2;
      var options = {
        polyline: {
          clampToGround: true,
          show: true,
          positions: [],
          material: Cesium.Color.RED,
          width: 3,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        description: "自定义line",
      };
      var positions = [];
      var poly = undefined;
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        if (movement.position != null) {
          var position1;
          var cartographic;
          var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position);
          if (ray)
            position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
          if (position1)
            cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
          if (cartographic) {
            //海拔
            var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
            var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            if (cartesian) {
              if (positions.length == 0) {
                positions.push(cartesian.clone());
              }
              positions.push(cartesian);
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position = movement.endPosition;
        if (position != null) {
          if (positions.length == 0) {
            gisMap3D.showThreeMapTooltip(position, "单击开始");
          } else {
            var position1;
            var cartographic;
            var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
            if (ray)
              position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
            if (position1)
              cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
            if (cartographic) {
              //海拔
              var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
              var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
              if (cartesian) {
                if (positions.length >= minPoints) {
                  if (!Cesium.defined(poly)) {
                    poly = gisMap3D.threeDMap.entities.add(options);
                    poly.polyline.positions = new Cesium.CallbackProperty(function() {
                      return positions;
                    }, false) //调用Cesium方法实现实时更新
                  } else {
                    if (cartesian != undefined) {
                      positions.pop();
                      cartesian.y += (1 + Math.random());
                      positions.push(cartesian);
                    }
                  }
                }
                gisMap3D.showThreeMapTooltip(position, "双击结束");
              }
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position = movement.position;
        if (position != null) {
          if (positions.length < minPoints + 2) {
            return;
          } else {
            var cartesian = gisMap3D.threeDMap.scene.camera.pickEllipsoid(position, gisMap3D.threeDMap.scene.globe.ellipsoid);
            if (cartesian) {
              gisMap3D.threeDMapDrawHandler.destroy()
              gisMap3D.setThreeMapTooltipVisible(false);
            }
          }
        }
        entitie = poly;
        callDrawDataFunc(entitie);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    if (drawType == 'Polygon') //多边形
    {
      var options = {
        name: '多边形',
        polygon: {
          hierarchy: [],
          perPositionHeight: true,
          material: Cesium.Color.BLACK.withAlpha(0.4),
          outline: true,
          outlineWidth: 2,
          outlineColor: Cesium.Color.RED,
          height: 0
        }
      };
      var positions = [];
      var poly = undefined;
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          positions.push(cartesian);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //鼠标移动
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          gisMap3D.showThreeMapTooltip(movement.endPosition, "点击开始");
          if (!Cesium.defined(poly)) {
            positions.push(cartesian);
            poly = gisMap3D.threeDMap.entities.add(options);
            poly.polygon.hierarchy = new Cesium.CallbackProperty(function() {
              return positions;
            }, false) //调用Cesium方法实现实时更新
          } else {
            if (cartesian != undefined) {
              positions.pop();
              cartesian.y += (1 + Math.random());
              positions.push(cartesian);
            }
          }
          if (positions.length >= 2) {
            gisMap3D.showThreeMapTooltip(movement.endPosition, "双击结束");
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //鼠标右键单击结束绘制
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        gisMap3D.threeDMap.trackedEntity = undefined;
        gisMap3D.threeDMapDrawHandler.destroy();
        gisMap3D.setThreeMapTooltipVisible(false);
        // entitie=poly;
        // callDrawDataFunc(entitie);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    if (drawType == 'Rectangle') //矩形
    {
      // gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
      // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = false;
      // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = false;
      // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = false;
      // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
      var pointsArr = [];
      var shape = {
        points: [],
        rect: null,
        entity: null
      };
      var tempPosition;
      gisMap3D.threeDMapDrawHandler.setInputAction(function(click) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(click.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          //选择的点在球面上
          if (cartesian) {
            if (shape.points.length == 0) {
              pointsArr.push(cartesian);
              shape.points.push(gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(cartesian));
              shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
              shape.rect.east += 0.000001;
              shape.rect.north += 0.000001;
              shape.entity = gisMap3D.threeDMap.entities.add({
                rectangle: {
                  coordinates: shape.rect,
                  material: Cesium.Color.BLACK.withAlpha(0.4),
                  outline: true,
                  outlineWidth: 2,
                  outlineColor: Cesium.Color.RED,
                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                }
              });
              bufferEntity = shape.entity;
            } else {
              gisMap3D.threeDMapDrawHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
              gisMap3D.threeDMapDrawHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
              gisMap3D.threeDMapDrawHandler.destroy();
              gisMap3D.setThreeMapTooltipVisible(false);
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      //鼠标移动
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        var position = movement.endPosition;
        if (position != null) {
          gisMap3D.showThreeMapTooltip(position, "点击拖动");
          if (shape.points.length == 0) {

          } else {
            var position1;
            var cartographic;
            var ray = gisMap3D.threeDMap.scene.camera.getPickRay(position);
            if (ray)
              position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
            if (position1)
              cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
            if (cartographic) {
              //海拔
              var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
              var cartesian = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
              //选择的点在球面上
              if (cartesian) {
                pointsArr[1] = cartesian;
                shape.points[1] = gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
                if (shape.rect.west == shape.rect.east)
                  shape.rect.east += 0.000001;
                if (shape.rect.south == shape.rect.north)
                  shape.rect.north += 0.000001;
                shape.entity.rectangle.coordinates = shape.rect;
              }
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      gisMap3D.threeDMapDrawHandler.setInputAction(function(movement) {
        gisMap3D.threeDMapDrawHandler.destroy();
        gisMap3D.setThreeMapTooltipVisible(false);
        // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
        gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = true;
        // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
        gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = true;
        // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
        gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = true;
        // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
        gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = true;
        entitie = shape.entity;
        callDrawDataFunc(entitie);
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
    }
    return entitie;
  },
  getPointFromWindowPoint: function(point) {
    if (gisMap3D.threeDMap.scene.terrainProvider.constructor.name == "EllipsoidTerrainProvider") {
      return gisMap3D.threeDMap.camera.pickEllipsoid(point, gisMap3D.threeDMap.scene.globe.ellipsoid); //获取当前点击视线与椭球面相交处的坐标
    } else {
      var ray = gisMap3D.threeDMap.scene.camera.getPickRay(point);
      console.log(ray);
      return gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
    }
  },
  showThreeMapTooltip: function(position, message) {
    if (position && message) {
      gisMap3D.setThreeMapTooltipVisible(true);
      gisMap3D.threeDMapTooltip.meassageInfo.innerHTML = message;
      gisMap3D.threeDMapTooltip.threeDMapTooltip.style.left = position.x + 20 + "px";
      gisMap3D.threeDMapTooltip.threeDMapTooltip.style.top = (position.y - 20) + "px";
    }
  },
  createThreeMapTooltip: function() {
    if (gisMap3D.threeDMapTooltip.threeDMapTooltip) {
      var cesiumViewer = document.getElementsByClassName("cesium-viewer");
      var threeDMapTooltip = document.getElementById("threeDMapTooltip");
      if (cesiumViewer != null && threeDMapTooltip != null) {
        cesiumViewer.removeChild(threeDMapTooltip);
      }
    } else {
      gisMap3D.threeDMapTooltip.threeDMapTooltip = document.createElement('DIV');
      gisMap3D.threeDMapTooltip.threeDMapTooltip.className = "threeDMapTooltip";
      gisMap3D.threeDMapTooltip.meassageInfo = document.createElement('DIV');
      gisMap3D.threeDMapTooltip.threeDMapTooltip.appendChild(gisMap3D.threeDMapTooltip.meassageInfo);
      document.getElementsByClassName("cesium-viewer")[0].append(gisMap3D.threeDMapTooltip.threeDMapTooltip);
    }
  },
  setThreeMapTooltipVisible: function(visible) {
    gisMap3D.threeDMapTooltip.threeDMapTooltip.style.display = visible ? 'block' : 'none';
  },
  threeDMapGraphicClaer: function() {
    gisMap3D.threeDMap.entities.removeAll();
  },
  /**
   * @Description:  3d测量
   * @Param:  type:{distance:距离，area：面积}
   * @return:
   * @Author: kbh
   * @Date: 2019/5/10
   */
  threeDMapMeasure: function(type) {
    gisMap3D.createThreeMapTooltip();
    gisMap3D.threeDMapMeasureHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    var isDraw = false;
    var polylinePath = [];
    var polylineCartographic = []; //弧度数组,地表插值用
    var polyline = undefined;
    var polygonPath = [];
    var polygon = undefined;
    var scene = gisMap3D.threeDMap.scene;
    var ellipsoid = gisMap3D.threeDMap.scene.globe.ellipsoid;
    var billboards = new Cesium.BillboardCollection();
    scene.primitives.add(billboards);
    var WebMercatorProjection = new Cesium.WebMercatorProjection();
    var entities = [];
    var billboard = undefined;
    //隐藏选中容器标识
    $(".cesium-selection-wrapper").hide();
    gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    isDraw = true;
    if (type == "distance") {
      var options = {
        polyline: {
          show: true,
          width: 4,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE.withAlpha(0.5),
            outlineWidth: 0,
            outlineColor: Cesium.Color.ORANGE
          }),
          depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.RED,
            outlineWidth: 1,
            outlineColor: Cesium.Color.RED
          }),
          followSurface: true
        }
      };
      gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          //地理坐标（弧度）转经纬度坐标
          var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          //var point = Cesium.Cartesian3.fromDegrees(currentLon, currentLat, height);
          if (isDraw) {
            gisMap3D.showThreeMapTooltip(movement.endPosition, "点击开始")
            if (polylinePath.length < 1) {
              return;
            }
            if (!Cesium.defined(polyline)) {
              polylinePath.push(point);
              if (!Cesium.defined(polylinePath)) {
                throw new Cesium.DeveloperError('positions is required!');
              }
              if (polylinePath.length < 2) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
              }
              var material = Cesium.Material.fromType(Cesium.Material.ColorType);
              material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 0.5);

              polyline = gisMap3D.threeDMap.entities.add(options);
              polyline.polyline.positions = new Cesium.CallbackProperty(function() {
                return polylinePath;
              }, false) //调用Cesium方法实现实时更新
            } else {
              polylinePath.pop();
              polylinePath.push(point);
            }
            if (polylinePath.length >= 1) {
              // if (polyline && polyline.path) {
              // var distance=getDistance(polyline.path);
              //  tooltip.innerHTML='<p>长度：'+distance+'</p><p>双击确定终点</p>';
              gisMap3D.showThreeMapTooltip(movement.endPosition, "双击结束")
              // }
            }
          }
        }

      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      //线段之间地表插值
      var SurfaceLine = function(cartographic) {
        polylineCartographic.push(cartographic);
        var terrainSamplePositions = [];
        if (polylineCartographic.length > 1) {
          var p1 = polylineCartographic[polylineCartographic.length - 2];
          var p2 = polylineCartographic[polylineCartographic.length - 1];
          var a = Math.abs(p1.longitude - p2.longitude) * 10000000;
          var b = Math.abs(p1.latitude - p2.latitude) * 10000000;
          if (a > b) b = a;
          var length = parseInt(b / 10);
          if (length > 1000) length = 1000;
          if (length < 2) length = 2;
          for (var i = 0; i < length; ++i) {
            terrainSamplePositions.push(
              new Cesium.Cartographic(
                Cesium.Math.lerp(p1.longitude, p2.longitude, i / (length - 1)),
                Cesium.Math.lerp(p1.latitude, p2.latitude, i / (length - 1))
              )
            );
          }

        } else {
          terrainSamplePositions = polylineCartographic;
        }
        if (terrainSamplePositions.length > 0) {
          for (var j = 0; j < terrainSamplePositions.length; j++) {
            //地理坐标（弧度）转经纬度坐标
            var cartographic = terrainSamplePositions[j];
            var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            polylinePath.push(point);
            //console.log(point);
          }
        }
      }

      gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          //地理坐标（弧度）转经纬度坐标
          var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          if (isDraw) {
            if (polyline)
              polylinePath.pop();
            SurfaceLine(cartographic);
            var text = "起点";
            if (polyline) {
              text = getDistance(polylinePath);
            }
            entities.push(gisMap3D.threeDMap.entities.add({
              position: point,
              point: {
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                show: true,
                color: Cesium.Color.SKYBLUE,
                pixelSize: 3,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 1
              },
              label: {
                text: text,
                font: '16px sans-serif',
                style: Cesium.LabelStyle.FILL,
                outlineWidth: 1,
                fillColor: Cesium.Color.WHITE,
                showBackground: false,
                backgroundColor: Cesium.Color.ORANGE.withAlpha(1),
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                pixelOffset: new Cesium.Cartesian2(5.0, -20.0),
              }
            }));
          }
        }

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      gisMap3D.threeDMapMeasureHandler.setInputAction(function() {
        gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        gisMap3D.threeDMap.trackedEntity = undefined;
        isDraw = false;
        billboard = billboards.add({
          show: true,
          id: "measureTool",
          position: polylinePath[polylinePath.length - 1],
          pixelOffset: new Cesium.Cartesian2(0.0, 20),
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scale: 1.0,
          image: '../common/js/gis_plugin/img/close.png',
          color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });

        gisMap3D.setThreeMapTooltipVisible(false)
        //关闭按钮执行事件
        gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
          var pickedObjects = {};
          pickedObjects = scene.drillPick(movement.position);
          if (Cesium.defined(pickedObjects)) {
            for (var i = 0; i < pickedObjects.length; i++)
              if (pickedObjects[i].primitive == billboard) {
                gisMap3D.threeDMap.entities.remove(polyline.lineEntity);
                for (var j = 0; j < entities.length; j++) {
                  gisMap3D.threeDMap.entities.remove(entities[j]);
                }
                entities = [];
                billboards.remove(billboard);
                polylinePath = [];
                polyline = undefined;
                gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
              }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      //}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      //获取线段距离
      var getDistance = function(path) {
        var Len = 0;
        var distance = 0 + '米';
        var cg, cs, x1, y1, x2, y2;
        for (i = 0; i < path.length - 1; i += 1) {
          cg = ellipsoid.cartesianToCartographic(path[i]);
          cs = WebMercatorProjection.project(cg);
          x1 = cs.x;
          y1 = cs.y;
          cg = ellipsoid.cartesianToCartographic(path[i + 1]);
          cs = WebMercatorProjection.project(cg);
          x2 = cs.x;
          y2 = cs.y;
          Len = Len + Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
        }
        if (Len > 0) {
          distance = Len.toFixed(2) + '米'
        }
        if (Len / 1000 >= 1) {
          distance = (Len / 1000).toFixed(2) + '公里';
        }
        return distance;
      }
    }
    if (type == "area") {
      var options = {
        polygon: {
          show: true,
          hierarchy: undefined,
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          material: Cesium.Color.YELLOW.withAlpha(0.3)
        }
      }
      var tempLabelCollection = new Cesium.LabelCollection();
      var measureDisplayLabel = tempLabelCollection.add({
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        font: '16px sans-serif',
        verticalOrigin: Cesium.VerticalOrigin.TOP
      });
      scene.primitives.add(tempLabelCollection);
      gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
        //新增部分
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          if (isDraw) {
            gisMap3D.showThreeMapTooltip(movement.endPosition, "点击开始")
            if (polygonPath.length < 2) {
              return;
            }
            if (!Cesium.defined(polygon)) {
              polygonPath.push(point);
              if (!Cesium.defined(polygonPath)) {
                throw new Cesium.DeveloperError('positions is required!');
              }
              if (polygonPath.length < 3) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于3');
              }
              polygon = gisMap3D.threeDMap.entities.add(options);
              polygon.polygon.hierarchy = new Cesium.CallbackProperty(function() {
                return polygonPath;
              }, false) //调用Cesium方法实现实时更新
            } else {
              polygonPath.pop();
              polygonPath.push(point);
            }
            if (polygonPath.length >= 2) {
              var label = String(countAreaInCartesian3(polygonPath));
              label = label.substr(0, label.indexOf(".", 0));
              var text;
              if (label.length < 6)
                text = label + "平方米";
              else {
                label = String(label / 1000000);
                label = label.substr(0, label.indexOf(".", 0) + 3);
                text = label + "平方公里"
              }
              measureDisplayLabel.text = text;
              measureDisplayLabel.position = countCenter(polygonPath);
              gisMap3D.showThreeMapTooltip(movement.endPosition, "双击结束")
            }
          }
        }

      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
        var position1;
        var cartographic;
        var ray = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position);
        if (ray)
          position1 = gisMap3D.threeDMap.scene.globe.pick(ray, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
        if (position1)
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        if (cartographic) {
          //海拔
          var height = gisMap3D.threeDMap.scene.globe.getHeight(cartographic);
          var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
          if (isDraw) {
            polygonPath.push(point);
            entities.push(gisMap3D.threeDMap.entities.add({
              position: point,
              point: {
                show: true,
                color: Cesium.Color.SKYBLUE,
                pixelSize: 3,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 1
              },
            }));
          }
        }

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      gisMap3D.threeDMapMeasureHandler.setInputAction(function() {
        gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        gisMap3D.threeDMap.trackedEntity = undefined;
        isDraw = false;
        billboard = billboards.add({
          show: true,
          id: "measureTool",
          position: polygonPath[polygonPath.length - 1],
          pixelOffset: new Cesium.Cartesian2(0.0, 20),
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scale: 1.0,
          image: '../common/js/gis_plugin/img/close.png',
          color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        });
        //关闭按钮执行事件
        gisMap3D.threeDMapMeasureHandler.setInputAction(function(movement) {
          var pickedObjects = {};
          pickedObjects = scene.drillPick(movement.position);
          if (Cesium.defined(pickedObjects)) {
            for (var i = 0; i < pickedObjects.length; i++)
              if (pickedObjects[i].primitive == billboard) {
                gisMap3D.threeDMap.entities.remove(polygon.polygonEntity);
                for (var j = 0; j < entities.length; j++) {
                  gisMap3D.threeDMap.entities.remove(entities[j]);
                }
                entities = [];
                billboards.remove(billboard);
                tempLabelCollection.remove(measureDisplayLabel);
                polygonPath = [];
                polygon = undefined;
                gisMap3D.threeDMapMeasureHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
              }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        gisMap3D.setThreeMapTooltipVisible(false)
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      var countCenter = function(ps) {
        var x = 0;
        y = 0;
        z = 0;
        for (var j = 0; j < ps.length; j++) {
          x += ps[j].x;
          y += ps[j].y;
          z += ps[j].z
        }
        var center = new Cesium.Cartesian3(x / ps.length, y / ps.length, z / ps.length);
        return center
      }
      var countAreaInCartesian3 = function(pointsold) {
        var points = new Array(pointsold.length);
        for (var i = 0; i < pointsold.length; i++) {
          points[i] = PItoDU(ellipsoid.cartesianToCartographic(pointsold[i]))
        }
        var center = 0;
        for (var i = 0; i < points.length; i++)
          center += points[i].longitude;
        center = center / points.length;
        for (var i = 0; i < points.length; i++) {
          points[i] = GASProjection.Gauss_to_XY(points[i].longitude, points[i].latitude, center)
        }
        return Math.abs(countArea(points))
      }
      var PItoDU = function(location) {
        location.longitude = location.longitude / Math.PI * 180;
        location.latitude = location.latitude / Math.PI * 180;
        return location;
      }
      var countArea = function(ps) {
        var s = 0;
        for (var i = 0; i < ps.length; i++) {
          var p1 = ps[i];
          var p2;
          if (i < ps.length - 1)
            p2 = ps[i + 1];
          else
            p2 = ps[0];
          s += p1.x * p2.y - p2.x * p1.y
        }
        return s / 2
      }
    }
    GASProjection.Gauss_to_XY = function(L, B, middleL2) {
      var t = 0,
        yita = 0;
      var nn = 0;
      var n = 0;
      var middleL = GASProjection.to_Radian(middleL2);
      B = GASProjection.to_Radian(B);
      L = GASProjection.to_Radian(L);
      var dL = L - middleL;
      var cosB = Math.cos(B);
      n = to_N(B);
      nn = n * Math.cos(B);
      t = Math.tan(B);
      yita = e2 * cosB;
      var pow_t2 = Math.pow(t, 2);
      var pow_t4 = Math.pow(t, 4);
      var pow_yita2 = Math.pow(yita, 2);
      var pow_yita4 = Math.pow(yita, 4);
      var pow_cosB3 = Math.pow(cosB, 3);
      var pow_cosB5 = Math.pow(cosB, 5);
      var tY = to_Sm(B) + Math.pow(dL, 2) / 2 * nn * cosB * t + Math.pow(dL, 4) / 24 * t * nn * pow_cosB3 * (5.0 - pow_t2 + 9.0 * pow_yita2 + 4 * pow_yita4) + Math.pow(dL, 6) / 720 * t * nn * pow_cosB5 * (61.0 - 58.0 * t * t + pow_t4 + 270 * pow_yita2 - 330 * t * t * pow_yita2);
      var tX = dL * n * cosB + Math.pow(dL, 3) / 6.0 * n * pow_cosB3 * (1 - t * t + yita * yita) + Math.pow(dL, 5) / 120.0 * n * pow_cosB5 * (5 - 18 * t * t + pow_t4 + 14.0 * pow_yita2 - 58.0 * pow_yita2 * pow_t2);
      return new Cesium.Cartesian2(tX, tY)
    };
    GASProjection.to_Radian = function(degree) {
      return degree * Math.PI / 180.0
    };
    GASProjection.to_Sm = function(B) {
      var AA, BB, CC, DD, EE;
      AA = 1 + (GASProjection.e1 * GASProjection.e1) * 3 / 4 + Math.pow(GASProjection.e1, 4.0) * 45 / 64 + Math.pow(GASProjection.e1, 6) * 175 / 256 + Math.pow(GASProjection.e1, 8) * 11025 / 16384;
      BB = Math.pow(GASProjection.e1, 2) * 3 / 4 + Math.pow(GASProjection.e1, 4) * 15 / 16 + Math.pow(GASProjection.e1, 6) * 525 / 512 + Math.pow(GASProjection.e1, 8) * 2205 / 2048;
      CC = Math.pow(GASProjection.e1, 4) * 15 / 64 + Math.pow(GASProjection.e1, 6) * 105 / 256 + Math.pow(GASProjection.e1, 8) * 2205 / 4096;
      DD = Math.pow(GASProjection.e1, 6) * 35 / 512 + Math.pow(GASProjection.e1, 8) * 315 / 2048;
      EE = Math.pow(GASProjection.e1, 8) * 315 / 16384;
      return GASProjection.aEarth * (1 - GASProjection.e1 * GASProjection.e1) * (AA * B - BB / 2 * Math.sin(2 * B) + CC / 4 * Math.sin(4 * B) - DD / 6 * Math.sin(6 * B) + EE / 8 * Math.sin(8 * B))
    };
    GASProjection.to_N = function(B) {
      var ans = (GASProjection.aEarth / Math.sqrt(1.00 - GASProjection.e1 * GASProjection.e1 * Math.sin(B) * Math.sin(B)));
      return ans
    };
    GASProjection.Gauss_to_XY = function(L, B, middleL2) {
      var t = 0,
        yita = 0;
      var nn = 0;
      var n = 0;
      var middleL = GASProjection.to_Radian(middleL2);
      B = GASProjection.to_Radian(B);
      L = GASProjection.to_Radian(L);
      var dL = L - middleL;
      var cosB = Math.cos(B);
      n = GASProjection.to_N(B);
      nn = n * Math.cos(B);
      t = Math.tan(B);
      yita = GASProjection.e2 * cosB;
      var pow_t2 = Math.pow(t, 2);
      var pow_t4 = Math.pow(t, 4);
      var pow_yita2 = Math.pow(yita, 2);
      var pow_yita4 = Math.pow(yita, 4);
      var pow_cosB3 = Math.pow(cosB, 3);
      var pow_cosB5 = Math.pow(cosB, 5);
      var tY = GASProjection.to_Sm(B) + Math.pow(dL, 2) / 2 * nn * cosB * t + Math.pow(dL, 4) / 24 * t * nn * pow_cosB3 * (5.0 - pow_t2 + 9.0 * pow_yita2 + 4 * pow_yita4) + Math.pow(dL, 6) / 720 * t * nn * pow_cosB5 * (61.0 - 58.0 * t * t + pow_t4 + 270 * pow_yita2 - 330 * t * t * pow_yita2);
      var tX = dL * n * cosB + Math.pow(dL, 3) / 6.0 * n * pow_cosB3 * (1 - t * t + yita * yita) + Math.pow(dL, 5) / 120.0 * n * pow_cosB5 * (5 - 18 * t * t + pow_t4 + 14.0 * pow_yita2 - 58.0 * pow_yita2 * pow_t2);
      return new Cesium.Cartesian2(tX, tY)
    };
    GASProjection.Sm_to_B = function(Sm) {
      var B;
      var B2, B4, B6, B8, fai;
      var AA, BB, CC, DD, EE;
      var A2, A4, A6, A8;
      AA = 1 + (GASProjection.e1 * GASProjection.e1) * 3 / 4 + Math.pow(GASProjection.e1, 4.0) * 45 / 64 + Math.pow(GASProjection.e1, 6) * 175 / 256 + Math.pow(GASProjection.e1, 8) * 11025 / 16384;
      BB = Math.pow(GASProjection.e1, 2) * 3 / 4 + Math.pow(GASProjection.e1, 4) * 15 / 16 + Math.pow(GASProjection.e1, 6) * 525 / 512 + Math.pow(GASProjection.e1, 8) * 2205 / 2048;
      CC = Math.pow(GASProjection.e1, 4) * 15 / 64 + Math.pow(GASProjection.e1, 6) * 105 / 256 + Math.pow(GASProjection.e1, 8) * 2205 / 4096;
      DD = Math.pow(GASProjection.e1, 6) * 35 / 512 + Math.pow(GASProjection.e1, 8) * 315 / 2048;
      EE = Math.pow(GASProjection.e1, 8) * 315 / 16384;
      fai = Sm / (GASProjection.aEarth * (1 - GASProjection.e1 * GASProjection.e1) * AA);
      A2 = BB / AA / 2;
      A4 = -CC / AA / 4;
      A6 = DD / AA / 6;
      A8 = -EE / AA / 8;
      B2 = A2 - A2 * A4 - A4 * A6 - 0.5 * Math.pow(A2, 3) - A2 * Math.pow(A4, 2) + 0.5 * Math.pow(A2, 2) * A6 - 18.3 * Math.pow(A2, 3) * A4;
      B4 = A4 + Math.pow(A2, 2) - A2 * A6 * 2 - 4 * A2 * A2 * A4 - 1.3 * Math.pow(A2, 4);
      B6 = A6 + 3 * A2 * A4 - 3 * A2 * A8 + 1.5 * Math.pow(A2, 3) - 4.5 * A2 * A4 * A4 - 9 * A2 * A2 * A6 - 12.5 * Math.pow(A2, 3) * A4;
      B8 = A8 + 2 * A4 * A4 + 4 * A2 * A6 + 8 * A2 * A2 * A4 + 2.7 * Math.pow(A2, 4);
      B = fai + B2 * Math.sin(2 * fai) + B4 * Math.sin(4 * fai) + B6 * Math.sin(6 * fai) + B8 * Math.sin(8 * fai);
      return B
    };
    GASProjection.Gauss_to_BL = function(x, y, m_fL0) {
      var bf;
      var n, t, yita;
      bf = GASProjection.Sm_to_B(y);
      n = GASProjection.to_N(bf);
      t = Math.tan(bf);
      yita = GASProjection.e2 * Math.cos(bf);
      var B = bf + t * (-1 - yita * yita) * x * x / (2.0 * Math.pow(n, 2)) + t * (5 + 3 * Math.pow(t, 2) + 6.0 * Math.pow(yita, 2) - 6.0 * Math.pow(t, 2) * Math.pow(yita, 2) - 3.0 * Math.pow(yita, 4) - 9.0 * Math.pow(t, 2) * Math.pow(yita, 4)) * Math.pow(x, 4) / (24.0 * Math.pow(n, 4)) + t * (-61.0 - 90.0 * Math.pow(t, 2) - 45.0 * Math.pow(t, 4) - 107 * Math.pow(yita, 2) + 162 * Math.pow(t, 2) * Math.pow(yita, 2) + 45 * Math.pow(t, 4) * Math.pow(yita, 2)) * Math.pow(x, 6) / (720.0 * Math.pow(n, 6));
      var L = x / (n * Math.cos(bf)) + (-1 - 2 * Math.pow(t, 2) - Math.pow(yita, 2)) * Math.pow(x, 3) / (6 * Math.pow(n, 3) * Math.cos(bf)) + (5 + 28 * Math.pow(t, 2) + 24 * Math.pow(t, 4) + 6 * Math.pow(yita, 2) + 8 * Math.pow(t, 2) * Math.pow(yita, 2)) * Math.pow(x, 5) / (120 * Math.pow(n, 5) * Math.cos(bf));
      return new Cesium.Cartographic(L + m_fL0, B / Math.PI * 180)
    };
    GASProjection.to_Degree = function(radian) {
      return radian / Math.PI * 180.0
    };
    GASProjection.aEarth = 6378137;
    GASProjection.bEarth = 6356752.3142;
    GASProjection.e1 = Math.sqrt(GASProjection.aEarth * GASProjection.aEarth - GASProjection.bEarth * GASProjection.bEarth) / GASProjection.aEarth;
    GASProjection.e2 = Math.sqrt(GASProjection.aEarth * GASProjection.aEarth - GASProjection.bEarth * GASProjection.bEarth) / GASProjection.bEarth;

    function GASProjection() {}
  },
  /**
   * @Description:  获取3d地图视图范围
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/30
   */
  getThreeMAPExtent: function() {
    // 范围对象
    var extent = {};
    extent.xmin = 0;
    extent.ymax = 0;
    extent.xmax = 0;
    extent.ymin = 0;
    // 得到当前三维场景
    var scene = gisMap3D.threeDMap.scene;
    // 得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    var canvas = scene.canvas;
    // canvas左上角
    var car3_lt = gisMap3D.threeDMap.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);
    // canvas右下角
    var car3_rb = gisMap3D.threeDMap.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);
    // 当canvas左上角和右下角全部在椭球体上
    if (car3_lt && car3_rb) {
      var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
      var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
      extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
      extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
      extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
      extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
    } // 当canvas左上角不在但右下角在椭球体上
    else if (!car3_lt && car3_rb) {
      var car3_lt2 = null;
      var yIndex = 0;
      do {
        // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
        yIndex <= canvas.height ? yIndex += 10 : canvas.height;
        car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
      } while (!car3_lt2);
      var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
      var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
      extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
      extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
      extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
      extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
    }
    // 获取高度
    //extent.height = Math.ceil(viewer.camera.positionCartographic.height);
    return extent;
  },
  /**
   * @Description:  获取3d地图级别
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/10
   */
  getThreeDMapLevel: function() {
    var h = gisMap3D.getThreeDMapHeight();
    if (h < 1) {
      h = 1;
    }
    var level = Math.log2(Math.PI * gisMap3D.threeDMap.canvas.clientWidth * 6378137.0 / (256 * h * Math.tan(gisMap3D.threeDMap.camera.frustum.fovy / 2.0)));
    return Math.floor(level);
  },
  /**
   * @Description:  获取3d地图比例尺
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/10
   */
  getThreeDMapScale: function() {
    return gisMap3D.resolution[gisMap3D.getThreeDMapLevel()].scale;
  },
  /**
   * @Description:  获取3d地图高度
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/10
   */
  getThreeDMapHeight: function() {
    if (gisMap3D.threeDMap) {
      var scene = gisMap3D.threeDMap.scene;
      var ellipsoid = scene.globe.ellipsoid;
      var height = ellipsoid.cartesianToCartographic(gisMap3D.threeDMap.camera.position).height;
      return height;
    }
  },
  /**
   * @Description:  获取3d地图中心点
   * @Param:
   * @return:[x,y]
   * @Author: kbh
   * @Date: 2019/5/10
   */
  getThreeDMapCenterPoint: function() {
    // var rectangle = gisMap3D.threeDMap.camera.computeViewRectangle();
    // // 弧度转为经纬度，west为左（西）侧边界的经度，以下类推
    // var west =rectangle.west / Math.PI * 180;
    // var north = rectangle.north / Math.PI * 180;
    // var east = rectangle.east / Math.PI * 180;
    // var south = rectangle.south / Math.PI * 180;
    // var x=(west+east)/2;
    // var y=(north+south)/2;
    // return [x,y]
    var result = gisMap3D.threeDMap.camera.pickEllipsoid(new Cesium.Cartesian2(gisMap3D.threeDMap.canvas.clientWidth / 2, gisMap3D.threeDMap.canvas.clientHeight / 2));
    if (result == undefined)
      return [0, 0];
    var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
    var lon = curPosition.longitude * 180 / Math.PI;
    var lat = curPosition.latitude * 180 / Math.PI;
  },
  /**
   * @Description:  3d图层移动至最顶层
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/30
   */
  threeDMAPLayerMoveToTop: function(name) {
    var arr = gisMap3D.threeDMapLayers;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name == name) {
        var layer = arr[i].layer;
        gisMap3D.threeDMapImagerLayers.raiseToTop(layer);
      }
    }
  },
  /**
   * @Description:  3d放大地图
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/17
   */
  threeDMapZoomIn: function() {
    gisMap3D._threeDMapZoom(0.5);
  },
  /**
   * @Description:  3d缩小地图
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/17
   */
  threeDMapZoomOut: function() {
    gisMap3D._threeDMapZoom(2);
  },
  _getCameraFocus: function(terria, inWorldCoordinates, result) {
    var unprojectedScratch = new Cesium.Cartographic;
    var rayScratch = new Cesium.Ray;
    var scene = terria.scene;
    var camera = scene.camera;
    if (scene.mode == Cesium.SceneMode.MORPHING) {
      return undefined
    }
    if (!result) {
      result = new Cesium.Cartesian3
    }
    rayScratch.origin = camera.positionWC;
    rayScratch.direction = camera.directionWC;
    result = scene.globe.pick(rayScratch, scene, result) //二维坐标转三维坐标
    if (!result) {
      return undefined
    }
    if (scene.mode == Cesium.SceneMode.SCENE2D || scene.mode == Cesium.SceneMode.COLUMBUS_VIEW) {
      result = camera.worldToCameraCoordinatesPoint(result, result);
      if (inWorldCoordinates) {
        result = scene.globe.ellipsoid.cartographicToCartesian(scene.mapProjection.unproject(result, unprojectedScratch), result)
      }
    } else {
      if (!inWorldCoordinates) {
        result = camera.worldToCameraCoordinatesPoint(result, result)
      }
    }
    return result
  },
  /**
   * @Description:  内部方法三维地图放大缩小
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/29
   */
  _threeDMapZoom: function(relativeAmount) {
    if (gisMap3D.threeDMap) {
      var cartesian3Scratch = new Cesium.Cartesian3;
      var scene = gisMap3D.threeDMap.scene;
      var sscc = scene.screenSpaceCameraController;
      if (!sscc.enableInputs || !sscc.enableZoom) {
        return
      }
      var camera = scene.camera;
      var orientation;
      switch (scene.mode) {
        case Cesium.SceneMode.MORPHING:
          break;
        case Cesium.SceneMode.SCENE2D:
          camera.zoomIn(camera.positionCartographic.height * (1 - relativeAmount));
          break;
        default:
          var focus;
          focus = gisMap3D._getCameraFocus(gisMap3D.threeDMap, false)
          if (!focus) {
            var ray = new Cesium.Ray(camera.worldToCameraCoordinatesPoint(scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic)), camera.directionWC);
            focus = Cesium.IntersectionTests.grazingAltitudeLocation(ray, scene.globe.ellipsoid);
            orientation = {
              heading: camera.heading,
              pitch: camera.pitch,
              roll: camera.roll
            }
          } else {
            orientation = {
              direction: camera.direction,
              up: camera.up
            }
          }
          var direction = Cesium.Cartesian3.subtract(camera.position, focus, cartesian3Scratch);
          var movementVector = Cesium.Cartesian3.multiplyByScalar(direction, relativeAmount, direction);
          var endPosition = Cesium.Cartesian3.add(focus, movementVector, focus);
          camera.flyTo({
            destination: endPosition,
            orientation: orientation,
            duration: .5,
            convert: false
          })
      }
    }
  },
  /**
   * @Description:  拉框放大
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/21
   */
  threeDMapDragZoomInByExtent: function() {
    gisMap3D.threeDMapDragZoomHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    gisMap3D.createThreeMapTooltip();
    // gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
    // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = false;
    // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = false;
    // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = false;
    // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
    var pointsArr = [];
    var shape = {
      points: [],
      rect: null,
      entity: null
    };
    var tempPosition;
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(click) {
      tempPosition = gisMap3D.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if (tempPosition) {
        if (shape.points.length == 0) {
          pointsArr.push(tempPosition);
          shape.points.push(gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
          shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
          shape.rect.east += 0.000001;
          shape.rect.north += 0.000001;
          shape.entity = gisMap3D.threeDMap.entities.add({
            rectangle: {
              coordinates: shape.rect,
              material: Cesium.Color.BLACK.withAlpha(0.4),
              outline: true,
              outlineWidth: 2,
              outlineColor: Cesium.Color.RED,
              height: 0
            }
          });
          bufferEntity = shape.entity;
        } else {
          gisMap3D.threeDMapDragZoomHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          gisMap3D.threeDMapDragZoomHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          gisMap3D.threeDMapDragZoomHandler.destroy();
          gisMap3D.setThreeMapTooltipVisible(false);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    //鼠标移动
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(movement) {
      var position = movement.endPosition;
      if (position != null) {
        gisMap3D.showThreeMapTooltip(position, "拉框放大");
        if (shape.points.length == 0) {

        } else {
          var moveEndPosition = gisMap3D.getPointFromWindowPoint(position);
          //选择的点在球面上
          if (moveEndPosition) {
            pointsArr[1] = moveEndPosition;
            shape.points[1] = gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition);
            shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
            if (shape.rect.west == shape.rect.east)
              shape.rect.east += 0.000001;
            if (shape.rect.south == shape.rect.north)
              shape.rect.north += 0.000001;
            shape.entity.rectangle.coordinates = shape.rect;
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(movement) {
      gisMap3D.threeDMapDragZoomHandler.destroy();
      gisMap3D.setThreeMapTooltipVisible(false);
      // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = true;
      // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = true;
      // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = true;
      // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = true;
      gisMap3D.threeDMap.entities.remove(shape.entity);
      var extent = [];
      extent[0] = shape.rect.west / Math.PI * 180;
      extent[1] = shape.rect.north / Math.PI * 180;
      extent[2] = shape.rect.east / Math.PI * 180;
      extent[3] = shape.rect.north / Math.PI * 180;

      extent[4] = shape.rect.east / Math.PI * 180;
      extent[5] = shape.rect.south / Math.PI * 180;
      extent[6] = shape.rect.east / Math.PI * 180;
      extent[7] = shape.rect.north / Math.PI * 180;

      gisMap3D.threeDMapZoomToPolygon(extent);
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
  },
  /**
   * @Description:  拉框缩小
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/21
   */
  threeDMapDragZoomOutByExtent: function() {
    gisMap3D.threeDMapDragZoomHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    gisMap3D.createThreeMapTooltip();
    // gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
    // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = false;
    // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = false;
    // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = false;
    // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
    gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = false;
    var pointsArr = [];
    var shape = {
      points: [],
      rect: null,
      entity: null
    };
    var tempPosition;
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(click) {
      tempPosition = gisMap3D.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if (tempPosition) {
        if (shape.points.length == 0) {
          pointsArr.push(tempPosition);
          shape.points.push(gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
          shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
          shape.rect.east += 0.000001;
          shape.rect.north += 0.000001;
          shape.entity = gisMap3D.threeDMap.entities.add({
            rectangle: {
              coordinates: shape.rect,
              material: Cesium.Color.BLACK.withAlpha(0.4),
              outline: true,
              outlineWidth: 2,
              outlineColor: Cesium.Color.RED,
              height: 0
            }
          });
          bufferEntity = shape.entity;
        } else {
          gisMap3D.threeDMapDragZoomHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          gisMap3D.threeDMapDragZoomHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          gisMap3D.threeDMapDragZoomHandler.destroy();
          gisMap3D.setThreeMapTooltipVisible(false);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    //鼠标移动
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(movement) {
      var position = movement.endPosition;
      if (position != null) {
        gisMap3D.showThreeMapTooltip(position, "拉框缩小");
        if (shape.points.length == 0) {} else {
          var moveEndPosition = gisMap3D.getPointFromWindowPoint(position);
          //选择的点在球面上
          if (moveEndPosition) {
            pointsArr[1] = moveEndPosition;
            shape.points[1] = gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition);
            shape.rect = Cesium.Rectangle.fromCartographicArray(shape.points);
            if (shape.rect.west == shape.rect.east)
              shape.rect.east += 0.000001;
            if (shape.rect.south == shape.rect.north)
              shape.rect.north += 0.000001;
            shape.entity.rectangle.coordinates = shape.rect;
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    gisMap3D.threeDMapDragZoomHandler.setInputAction(function(movement) {
      gisMap3D.threeDMapDragZoomHandler.destroy();
      gisMap3D.setThreeMapTooltipVisible(false);
      // 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableRotate = true;
      // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTranslate = true;
      // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableZoom = true;
      // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
      gisMap3D.threeDMap.scene.screenSpaceCameraController.enableTilt = true;
      gisMap3D.threeDMap.entities.remove(shape.entity);
      var extent = [];
      extent[0] = shape.rect.west / Math.PI * 180;
      extent[1] = shape.rect.north / Math.PI * 180;
      extent[2] = shape.rect.east / Math.PI * 180;
      extent[3] = shape.rect.south / Math.PI * 180;

      var centerPoint = [];
      centerPoint[0] = (extent[0] + extent[2]) / 2;
      centerPoint[1] = (extent[1] + extent[3]) / 2;
      if (gisMap3D.getThreeDMapLevel() > 1) {
        gisMap3D.threeDMapZoomToPoint(centerPoint, gisMap3D.resolution[gisMap3D.getThreeDMapLevel() + 2].scale);
      } else {

        gisMap3D.threeDMapZoomToPoint(centerPoint, gisMap3D.resolution[0].scale);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
  },
  /**
   * @Description:  体积测量
   * @Param:sectionHeigh:切面高度，interval:间隔值点数量
   * @return:
   * @Author: kbh
   * @Date: 2019/5/23
   */
  threeDMapMeaseVolume: function(sectionHeigh, interval, callBackMeaseVolumeResult) {
    if (sectionHeigh == null)
      sectionHeigh = 0;
    var entitie = null;
    gisMap3D.createThreeMapTooltip();
    gisMap3D.threeDMapMeasureVolumeHandler = new Cesium.ScreenSpaceEventHandler(gisMap3D.threeDMap.scene.canvas);
    var polygonPath = []; //三维坐标数组
    var polygonPathTemp = []; //二维墨卡托坐标数组米
    var polygon = undefined;
    var point = undefined;
    var options = {
      polygon: {
        show: true,
        hierarchy: undefined,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        material: Cesium.Color.YELLOW.withAlpha(0.3)
      }
    }
    gisMap3D.threeDMapMeasureVolumeHandler.setInputAction(function(movement) {
      //新增部分
      var position1;
      var cartographic1;
      var ray1 = gisMap3D.threeDMap.scene.camera.getPickRay(movement.endPosition);
      if (ray1)
        position1 = gisMap3D.threeDMap.scene.globe.pick(ray1, gisMap3D.threeDMap.scene); //二维坐标转三维坐标
      if (position1)
        cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
      if (cartographic1) {
        var lat1 = Cesium.Math.toDegrees(cartographic1.latitude);
        var lng1 = Cesium.Math.toDegrees(cartographic1.longitude);
        var mercatorPoint1 = gisMap3D.getLngLatToMercator({
          lng: lng1,
          lat: lat1
        });
        //海拔
        var height1 = gisMap3D.threeDMap.scene.globe.getHeight(cartographic1);
        var point1 = Cesium.Cartesian3.fromDegrees(cartographic1.longitude / Math.PI * 180, cartographic1.latitude / Math.PI * 180, height1);
        gisMap3D.showThreeMapTooltip(movement.endPosition, "点击开始")
        if (polygonPath.length < 2) {
          return;
        }
        if (!Cesium.defined(polygon)) {
          polygonPath.push(point1);
          polygonPathTemp.push(mercatorPoint1);
          if (!Cesium.defined(polygonPath)) {
            throw new Cesium.DeveloperError('positions is required!');
          }
          if (polygonPath.length < 3) {
            throw new Cesium.DeveloperError('positions 的长度必须大于等于3');
          }
          //构建面
          polygon = gisMap3D.threeDMap.entities.add(options);
          polygon.polygon.hierarchy = new Cesium.CallbackProperty(function() {
            return polygonPath;
          }, false) //调用Cesium方法实现实时更新
        } else {
          polygonPath.pop();
          polygonPath.push(point1);
        }
        if (polygonPath.length >= 2) {
          gisMap3D.showThreeMapTooltip(movement.endPosition, "双击结束")
        }
      }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    gisMap3D.threeDMapMeasureVolumeHandler.setInputAction(function(movement) {
      var position2;
      var cartographic2;
      var ray2 = gisMap3D.threeDMap.scene.camera.getPickRay(movement.position); //屏幕转地理坐标：
      if (ray2)
        position2 = gisMap3D.threeDMap.scene.globe.pick(ray2, gisMap3D.threeDMap.scene); //地理坐标转三维坐标
      if (position2)
        cartographic2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position2);
      if (cartographic2) {
        var lat2 = Cesium.Math.toDegrees(cartographic2.latitude);
        var lng2 = Cesium.Math.toDegrees(cartographic2.longitude);
        var mercatorPoint2 = gisMap3D.getLngLatToMercator({
          lng: lng2,
          lat: lat2
        }); //米
        //海拔
        var height2 = gisMap3D.threeDMap.scene.globe.getHeight(cartographic2);
        var point2 = Cesium.Cartesian3.fromDegrees(cartographic2.longitude / Math.PI * 180, cartographic2.latitude / Math.PI * 180, height2); //经纬度坐标转地理坐标
        // var position=movement.position;//屏幕坐标
        // var ellipsoid=gisMap3D.threeDMap.scene.globe.ellipsoid;
        // //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
        // var cartesian=gisMap3D.threeDMap.camera.pickEllipsoid(position, ellipsoid);
        // if(cartesian){
        //     //将笛卡尔三维坐标转为地图坐标（弧度）
        //     var cartographic=gisMap3D.threeDMap.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //     //将地图坐标（弧度）转为十进制的度数
        //     var lat_String=Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        //     var log_String=Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
        //     var alti_String=(gisMap3D.threeDMap.camera.positionCartographic.height/1000).toFixed(2);
        // }
        polygonPath.push(point2);
        polygonPathTemp.push(mercatorPoint2);
        point = gisMap3D.threeDMap.entities.add({
          position: point2,
          point: {
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            show: true,
            color: Cesium.Color.SKYBLUE,
            pixelSize: 10,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 1,
            height: 0
          }
        });
        gisMap3D.threeDMapMeasureVolume.points.push(point);
      }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    gisMap3D.threeDMapMeasureVolumeHandler.setInputAction(function() {
      gisMap3D.threeDMapMeasureVolume.polygons.push(polygon);
      gisMap3D.threeDMapMeasureVolumeHandler.destroy();
      gisMap3D.setThreeMapTooltipVisible(false)
      //entitie=polygonPath;
      var longitudes = []; //经度
      var latitudes = []; //纬度
      var newPolygonPath = [];
      var polygonEntityPath = [];
      for (var i = 0; i < polygonPathTemp.length; i++) {
        longitudes.push(polygonPathTemp[i].x);
        latitudes.push(polygonPathTemp[i].y);
      }
      var maxX = Math.max.apply(null, longitudes);
      var minX = Math.min.apply(null, longitudes);
      var maxY = Math.max.apply(null, latitudes);
      var minY = Math.min.apply(null, latitudes);
      var centerX = (maxX + minX) / 2;
      var centerY = (maxY + minY) / 2;
      var xDistance = maxX - minX;
      var yDistance = maxY - minY;
      var xCountTemp = parseInt(xDistance); //取整数份
      var yCountTemp = parseInt(yDistance); //取整数份
      var xSpace = xDistance / xCountTemp;
      var ySpace = yDistance / yCountTemp;
      var volume = 0;
      var count = 0;
      if (interval != null && interval > 0) {
        if (interval < xCountTemp) {
          xSpace = xDistance / interval;
          xCountTemp = interval;
        }
        if (interval < yCountTemp) {
          ySpace = yDistance / interval;
          yCountTemp = interval;
        }
      }
      //  var d1 = new Date();//获取当前时间
      for (var j = 0; j < xCountTemp; j++) {
        for (var k = 0; k < yCountTemp; k++) {
          var x = 0;
          var y = 0;
          if (j == 0 && k == 0) {
            x = minX;
            y = minY;
          } else {
            // if(j==(xCountTemp-1))
            // {
            //     x=minX+(xSpace*j);
            // }
            x = minX + (xSpace * j);
            y = minY + (ySpace * k);
          }
          if (gisMap3D.isInPolygon([x, y], polygonPathTemp)) {
            count++;
            var point = {
              "x": x,
              "y": y
            }
            var lnglat = gisMap3D.getMercatorToLngLat(point);
            // newPolygonPath.push(lnglat.lng)
            // newPolygonPath.push(lnglat.lat);
            // polygonEntityPath.push(lnglat.lng);
            // polygonEntityPath.push(lnglat.lat);
            newPolygonPath.push([lnglat.lng, lnglat.lat]);
          }
        }
      }
      // var d2 = new Date();//获取当前时间
      //console.log(parseInt(d2 - d1));//两个时间相差的毫秒数
      // gisMap3D.threeDMap.entities.add({
      //     polygon: {
      //         hierarchy: newPolygonPath,
      //         perPositionHeight: true,
      //         material: Cesium.Color.BLACK.withAlpha(0.4),
      //         outline: true,
      //         outlineWidth: 2,
      //         outlineColor: Cesium.Color.blue,
      //         height: 0
      //     }
      // });
      var newPolygonPathCount = newPolygonPath.length;
      for (var kk = 0; kk < newPolygonPathCount; kk++) {
        var newPoint = Cesium.Cartesian3.fromDegrees(newPolygonPath[kk][0], newPolygonPath[kk][1]);
        var newCartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(newPoint);
        var newHeight = gisMap3D.threeDMap.scene.globe.getHeight(newCartographic);
        polygonEntityPath.push(newPolygonPath[kk][0]);
        polygonEntityPath.push(newPolygonPath[kk][1]);
        polygonEntityPath.push(newHeight);
        if (sectionHeigh <= newHeight) {
          volume = volume + xSpace * ySpace * (newHeight - sectionHeigh); //计算每个立方体体积
        } else {
          volume = volume + xSpace * ySpace * newHeight;
        }


        // gisMap3D.threeDMap.entities.add({
        //     position: newPoint,
        //     point: {
        //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        //         show: true,
        //         color: Cesium.Color.SKYBLUE,
        //         pixelSize: 1,
        //         // outlineColor: Cesium.Color.YELLOW,
        //         // outlineWidth: 1,
        //         // height:0
        //     },
        // });
      }
      var radiusPoint = gisMap3D.getMercatorToLngLat({
        x: centerX,
        y: centerY
      });
      var minMaxPoint = gisMap3D.getMercatorToLngLat({
        x: maxX,
        y: maxY
      });
      var radius = gisMap3D.getStraightLineDistance(radiusPoint.lng, radiusPoint.lat, minMaxPoint.lng, minMaxPoint.lat);
      //构建圆形切面
      var sectionCircle = gisMap3D.threeDMap.entities.add({
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        position: Cesium.Cartesian3.fromDegrees(radiusPoint.lng, radiusPoint.lat),
        name: 'Green circle at height',
        ellipse: { //Ellipse椭圆
          semiMinorAxis: radius, //semiMinorAxis椭圆半短轴的长度（以米为单位）
          semiMajorAxis: radius, //semiMajorAxis椭圆半长轴的长度（以米为单位）
          height: sectionHeigh, //椭圆和椭球面之间的距离，单位为米。
          material: Cesium.Color.GREEN.withAlpha(0.5) //绿色
        }
      });
      gisMap3D.threeDMapMeasureVolume.sectionCircles.push(sectionCircle);
      //gisMap3D.threeDMapMeasureVolume.greenCircle.ellipse.height=sectionHeigh;
      // alert("体积为："+volume+"立方米");
      // //构建立方体
      // // var endx=polygonEntityPath[0];
      // // var endy=polygonEntityPath[1];
      // // var endh=polygonEntityPath[2];
      // // polygonEntityPath.push(endx);
      // // polygonEntityPath.push(endy);
      // // polygonEntityPath.push(endh);
      var measesureEntity = gisMap3D.threeDMap.entities.add({ //橙色多边形
        name: 'Orange polygon with per-position heights and outline',
        polygon: {
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(polygonEntityPath),
          extrudedHeight: 0, //多边形的挤出面和椭圆面之间的距离（以米为单位）。
          perPositionHeight: true, //对每个位置使用options.positions的height，而不使用options.height来确定高度
          material: Cesium.Color.ORANGE.withAlpha(0.5), //橘色半透明
          outline: true,
          outlineColor: Cesium.Color.BLACK //黑色轮廓线
        }
      });
      gisMap3D.threeDMapMeasureVolume.measesureEntitys.push(measesureEntity);
      callBackMeaseVolumeResult(volume);
      //     var loactionTectEntity = gisMap3D.threeDMap.entities.add({
      //         name : 'loactionTectEntity',
      //         polygon : {
      //             hierarchy : Cesium.Cartesian3.fromDegreesArray(newPolygonPath),
      //             height : 0,
      //             material : Cesium.Color.RED.withAlpha(1),
      //             outline : true,
      //             outlineColor : Cesium.Color.blue
      //         }
      //     });
      //     gisMap3D.threeDMap.flyTo(loactionTectEntity,{
      //         duration: 5,
      //         offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90))
      //     });
      //   // var flag= gisMap3D.isInPolygon([maxX,maxY],polygonPath);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  },
  /**
   * @Description:清除3d体积测量实体
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/7/6
   */
  clearThreeDMAPMeasureVolumeEntity: function() {
    for (var i = 0; i < gisMap3D.threeDMapMeasureVolume.measesureEntitys.length; i++) {
      var measesureEntity = gisMap3D.threeDMapMeasureVolume.measesureEntitys[i];
      var sectionCircle = gisMap3D.threeDMapMeasureVolume.sectionCircles[i];
      var polygon = gisMap3D.threeDMapMeasureVolume.polygons[i];
      if (measesureEntity && sectionCircle && polygon) {
        gisMap3D.threeDMap.entities.remove(measesureEntity);
        gisMap3D.threeDMap.entities.remove(sectionCircle);
        gisMap3D.threeDMap.entities.remove(polygon);
      }
    }
    for (var j = 0; j < gisMap3D.threeDMapMeasureVolume.points.length; j++) {
      var point = gisMap3D.threeDMapMeasureVolume.points[j];
      if (point)
        gisMap3D.threeDMap.entities.remove(point);
    }
    gisMap3D.threeDMapMeasureVolume.measesureEntitys = [];
    gisMap3D.threeDMapMeasureVolume.sectionCircles = [];
    gisMap3D.threeDMapMeasureVolume.polygons = [];
    gisMap3D.threeDMapMeasureVolume.points = [];
  },
  updateThreeDMAPMeasureVolumeSectionHeigh: function(value) {
    if (gisMap3D.threeDMapMeasureVolume.greenCircle)
      gisMap3D.threeDMapMeasureVolume.greenCircle.ellipse.height = value;
  },
  /**
   * @Description:  判断点是否在多边形内
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/23
   */
  isInPolygon: function(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];

    for (i = 1; i <= pointCount; i++) {
      p2 = polygonPoints[i % pointCount];
      if (
        checkPoint[0] > Math.min(p1.x, p2.x) &&
        checkPoint[0] <= Math.max(p1.x, p2.x)
      ) {
        if (checkPoint[1] <= Math.max(p1.y, p2.y)) {
          if (p1.x != p2.x) {
            xinters =
              (checkPoint[0] - p1.x) *
              (p2.y - p1.y) /
              (p2.x - p1.x) +
              p1.y;
            if (p1.y == p2.y || checkPoint[1] <= xinters) {
              counter++;
            }
          }
        }
      }
      p1 = p2;
    }
    if (counter % 2 == 0) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 经纬度转墨卡托
   * @param poi 经纬度
   * @returns {{}}
   * @private
   */
  getLngLatToMercator: function(poi) { //[114.32894, 30.585748]
    var mercator = {};
    var earthRad = 6378137.0;
    // console.log("mercator-poi",poi);
    mercator.x = poi.lng * Math.PI / 180 * earthRad;
    var a = poi.lat * Math.PI / 180;
    mercator.y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    // console.log("mercator",mercator);
    return mercator; //[12727039.383734727, 3579066.6894065146]
  },
  /**
   * 墨卡托转经纬度
   * @param poi 墨卡托
   * @returns {{}}
   * @private
   */
  getMercatorToLngLat: function(poi) {
    var lnglat = {};
    lnglat.lng = poi.x / 20037508.34 * 180;
    var mmy = poi.y / 20037508.34 * 180;
    lnglat.lat = 180 / Math.PI * (2 * Math.atan(Math.exp(mmy * Math.PI / 180)) - Math.PI / 2);
    return lnglat;
  },
  addThreeDMAPEIrregularityEntity: function() {
    var orangePolygon = gisMap3D.threeDMap.entities.add({ //橙色多边形
      name: 'Orange polygon with per-position heights and outline',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([-108.0, 25.0, 100000, //这里无非给二位的多边形加了高度，形成三维效果
          -100.0, 25.0, 100000,
          -100.0, 30.0, 100000,
          -108.0, 30.0, 300000
        ]),
        extrudedHeight: 10000, //多边形的挤出面和椭圆面之间的距离（以米为单位）。
        perPositionHeight: true, //对每个位置使用options.positions的height，而不使用options.height来确定高度
        material: Cesium.Color.ORANGE.withAlpha(0.5), //橘色半透明
        outline: true,
        outlineColor: Cesium.Color.BLACK //黑色轮廓线
      }
    });
  },
  /**
   * @Description:  获取空间两点直线距离
   * @Param:
   * @return:
   * @Author: kbh
   * @Date: 2019/5/31
   */
  getStraightLineDistance: function(lon1, lat1, lon2, lat2) {
    var DEF_PI = 3.14159265359; // PI
    var DEF_2PI = 6.28318530712; // 2*PI
    var DEF_PI180 = 0.01745329252; // PI/180.0
    var DEF_R = 6370693.5; // radius of earth
    var ew1, ns1, ew2, ns2;
    var dx, dy, dew;
    var distance;
    // 角度转换为弧度
    ew1 = lon1 * DEF_PI180;
    ns1 = lat1 * DEF_PI180;
    ew2 = lon2 * DEF_PI180;
    ns2 = lat2 * DEF_PI180;
    // 经度差
    dew = ew1 - ew2;
    // 若跨东经和西经180 度，进行调整
    if (dew > DEF_PI)
      dew = DEF_2PI - dew;
    else if (dew < -DEF_PI)
      dew = DEF_2PI + dew;
    dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
    dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
    // 勾股定理求斜边长
    distance = Math.sqrt(dx * dx + dy * dy).toFixed(0);
    return distance;
  }
}
