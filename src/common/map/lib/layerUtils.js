/* eslint-disable */
import Tile from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import ImageLayer from 'ol/layer/Image'
import Projection from 'ol/proj/Projection'
import {get as getProjection} from 'ol/proj'
import {getWidth, getTopLeft} from 'ol/extent'
import WMTS from 'ol/source/WMTS'
import TileWMS from 'ol/source/TileWMS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import TileImage from 'ol/source/TileImage'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import TileArcGISRest from 'ol/source/TileArcGISRest'
import TileGrid from 'ol/tilegrid/TileGrid';
var layerUtils = {
  desc: 'layer to map for create or add',
  getLayer: function(baseMaplayer){
    var layer = null
    switch (baseMaplayer.layerType) {
      case "XYZ":
        layer = new Tile({
          name: baseMaplayer.name,
          title: baseMaplayer.name,
          source: new XYZ({
            url: baseMaplayer.layerUrl
          }),
          visible: baseMaplayer.visible
        });
        break;
      case "arcgis":
        layer = new ImageLayer({
          name: baseMaplayer.name,
          visible: baseMaplayer.visible,
          source: new ImageArcGISRest({
            ratio: 1,
            url: baseMaplayer.layerUrl,
            projection: new Projection({
              units: 'degrees',
              code: 'EPSG:4326'
            })
          })
        })
        break;
      case "arcgis_tile":
        layer =  new Tile({
          name: baseMaplayer.name,
          source: new TileArcGISRest({
            url: baseMaplayer.layerUrl
          }),
          visible: baseMaplayer.visible
        })
        break;
      case "OnlineTileArcGIS4326":
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
        layer = new Tile({
          name: baseMaplayer.name,
          title: baseMaplayer.layerName || baseMaplayer.name,
          source: new XYZ({
            tileGrid: tileGrid,
            projection: 'EPSG:4326',//必填
            url: baseMaplayer.layerUrl+'/tile/{z}/{y}/{x}',
            crossOrigin: 'Anonymous'
          }),
          visible: baseMaplayer.visible
        });
        break;
		case "XYZ4326": //4326
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
				0.000002682209014892578,//19
				0.000001341104507446289//20
				];
				//瓦片矩阵
				var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
				var origin = [-180, 90];
				var tileGrid = new TileGrid({
				    tileSize: 256,
				    origin: origin,
				    resolutions: resolutions
				});
          layer = new Tile({
				  name: baseMaplayer.name,
				  title: baseMaplayer.name,
				  source: new XYZ({
					tileGrid: tileGrid,
					projection: 'EPSG:4326',//必填
				  url: baseMaplayer.layerUrl,//+'/{z}/{x}/{y}.png',
          // url: 'http://t'+Math.round(Math.random()*7)+'.'+baseMaplayer.layerUrl,
				  }),
				  visible: baseMaplayer.visible
				})
        break;
       case "XYZOnlinetdt4326": //4326
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
        		0.000002682209014892578,//19
        		0.000001341104507446289//20
        		];
        		//瓦片矩阵
        		var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        		var origin = [-180, 90];
        		var tileGrid = new TileGrid({
        		    tileSize: 256,
        		    origin: origin,
        		    resolutions: resolutions
        		});
              layer = new Tile({
        		  name: baseMaplayer.name,
        		  title: baseMaplayer.name,
        		  source: new XYZ({
        			tileGrid: tileGrid,
        			projection: 'EPSG:4326',//必填
        		    // url: baseMaplayer.layerUrl,//+'/{z}/{x}/{y}.png',
              url: 'http://t'+Math.round(Math.random()*7)+'.'+baseMaplayer.layerUrl,
        		  }),
        		  visible: baseMaplayer.visible
        		})
            break;
      case "WMS":
        layer = new Tile({
          name: baseMaplayer.name,
          title: baseMaplayer.layerName || baseMaplayer.name,
          source: new TileWMS({
            url: baseMaplayer.layerUrl,
            crossOrigin: 'Anonymous',
            params: { 'LAYERS': baseMaplayer.layerName, 'singleTile': true }
          }),
          visible: baseMaplayer.visible
        })
        break;
      case "WMTS_img08":
        let resolutions4326 = [];
        let level = 1
        for (let i = 1; i < 19; i++) {
          resolutions4326.push(0.703125 / level)
          level = level * 2
        }
        let projection4326 = new getProjection("EPSG:4326");
        let projection4326Extent = projection4326.getExtent();

        let tileGrid = new TileGrid({
          resolutions: resolutions4326,
          tileSize: [256, 256],
          extent: projection4326Extent,
          origin: [-180, 90]
        });

        layer = new Tile({
          source: new TileImage({
            crossOrigin: 'Anonymous',
            tileUrlFunction: function (tileCoord) {
              let z = tileCoord[0] + 1;
              let x = (tileCoord[1])
              let y = Math.abs(tileCoord[2]);
              let url = baseMaplayer.layerUrl
              url = url.replace('{x}', x)
              url = url.replace('{y}', y)
              url = url.replace('{z}', z)
              return url
            },
            tileGrid: tileGrid,
            projection: projection4326,
          })
        })
        break;
      case "WMTS":
        var projection = getProjection('EPSG:900913');
        var projectionExtent = projection.getExtent();
        var size = getWidth(projectionExtent) / 256;
        var resolutions = new Array(18);
        var matrixIds = new Array(18);
        for(var z=1;z<19;++z){
          resolutions[z]=size/Math.pow(2,z);
          matrixIds[z]=z;
        }
        //切片名
        var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21'];//['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];baseMaplayer.gridNames
        //设置地图投影
        var projection = new Projection({
          code: 'EPSG:900913',//投影编码
          units: 'm',
          axisOrientation: 'neu'
        });
        layer = new Tile({
          name: baseMaplayer.name,
          title: baseMaplayer.name,
          source: new WMTS(
            {
              url: baseMaplayer.layerUrl,
              crossOrigin: 'Anonymous',
              layer: baseMaplayer.layerName,
              // matrixSet:baseMaplayer.sourceMatrixSet,// 'EPSG:4326',
              matrixSet: 'EPSG:900913',
              // format: baseMaplayer.sourceFormat,//'image/png',
              format: 'image/png',
              projection: projection,
              tileGrid:new WMTSTileGrid({
                origin: getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: gridNames
              }),
              wrapX: true
            }),
          visible: baseMaplayer.visible
        });
        break;
      case "OnLineTileArcGIS4326": //4326
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
        0.000002682209014892578,//19
        0.000001341104507446289//20
        ];
        //瓦片矩阵
        var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        var origin = [-400.0, 400.0];
        var tileGrid = new TileGrid({
            tileSize: 256,
            origin: origin,
            resolutions: resolutions
        });

        layer = new Tile({
          name: baseMaplayer.name,
          title: baseMaplayer.name,
          source: new XYZ({
            tileGrid: tileGrid,
            projection: 'EPSG:4326',//必填
            crossOrigin: 'anonymous',
            url: baseMaplayer.layerUrl+'/{z}/{y}/{x}',
          }),
          visible: baseMaplayer.visible
        });
    }
    return layer;
  },
  getLayers: function(layers){
    let baseMapLayers = []
    for (let i = 0; i <layers.length; i++) {
      var baseMaplayer = layers[i];
      baseMapLayers.push(this.getLayer(baseMaplayer))
    }
    return baseMapLayers
  }
}

export default layerUtils
