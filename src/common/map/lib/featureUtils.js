/* eslint-disable */
import WKT from "ol/format/WKT";
var featureUtils = {
  desc: 'featureUtils',
  //转wkt为feature
  transformFeatureFromWkt: function(wkt){
    var format = new WKT();
    var feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326'
    });
    return feature;
  },
  //转feature为wkt
  transformWktFromFeature: function(Feature){
    var format = new WKT();
		var strwkt  = format.writeGeometry(Feature.getGeometry(), {
				dataProjection: 'EPSG:4326',
				featureProjection: 'EPSG:4326'
			});
		return strwkt;
  },
  //转wkt为feature
  transformFeatureFromWkt3857: function(wkt){
    var format = new WKT();
    var feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    return feature;
  }
}
export default featureUtils
