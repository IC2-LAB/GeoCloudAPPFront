/* eslint-disable */
import {
  getArea,
  getLength
} from "ol/sphere"
var calcUtils = {
  desc: 'calcUtils',
  getCenterPoint:function(arr) {
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
   * 测量长度输出
   */
  formatLength: function (map,line) {
    var sourceProj = map.getView().getProjection(); //获取投影坐标系
    //方法1
    // var geom = (line.clone().transform(sourceProj, 'EPSG:3857'));
    // var length = getLength(geom);
    //方法2
    var length = getLength(line, {
      projection: sourceProj /*, radius: 6371008.8*/
    });
    var output;
    if (length > 100) {
      output = (Math.round(length / 1000 * 100) / 100) + ' ' + '公里'; //换算成KM单位
    } else {
      output = (Math.round(length * 100) / 100) + ' ' + '米'; //m为单位
    }
    return output; //返回线的长度
  } ,
  /**
   * 测量面积输出
   * @param {Polygon} polygon
   * @return {string}
   */
  formatArea: function (map,polygon) {
    var sourceProj = map.getView().getProjection(); //获取投影坐标系
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
  }

}
export default calcUtils
