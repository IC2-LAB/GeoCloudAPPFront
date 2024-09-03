<template>
  <div>
    <div ref="mapDiv1" id="mapDiv1" class="map" style="height: 100%;"></div>
  </div>
</template>

<script>
import Overlay from 'ol/Overlay'
import map_config from '@/common/map/config.js'
import GISMap from '@/common/map/GISMap.js'
import '@/common/map/plugins/flash-marker.js'
const gisMap = new GISMap('MainMap')
export default {
  name: 'MapVue',
  mounted () {
    this.$nextTick(() => {
      gisMap.baseMapInit(map_config, () => {
        const container = document.getElementById('popup')
        this.popupLayer = new Overlay({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        })
        gisMap.map.addOverlay(this.popupLayer)
        gisMap.map.on('singleclick', (evt) => {
          const feature = gisMap.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature
          })
          if (feature) {
            const coordinates = feature.getGeometry().getCoordinates()
            this.$emit('showInfs', feature)
          }
        })
      }, 'mapDiv1', false)
    })
    //    gisMap2.baseMapInit(map_config, () => {
    //            gisMap2.setView(gisMap.getView())
    // }, 'mapDiv2', false)
  },
  methods: {
    // 熊猫
    showPanda (center) {
      this.popupLayer.setPosition(center)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ol-popup {
    position: absolute;
    background-color: white;
    -moz-box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    border: 1px solid #cccccc;
    bottom: 32px;
    left: -50px;
    width: 200px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .popup-title{
    font-weight: bold;
    border-bottom:1px solid #cccccc;
    padding: 5px 8px;
    background: #20935A;
    color: #fff;
  }
  .popup-content{
    padding: 5px 8px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 6px;
    right: 6px;
    color: #fff;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
  .left, .right{
    float: left;
    width: 50%;
  }
  .aDiv{
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
    font-weight: 400;
    color: #323232;
    padding: 0 5px;
  }
  #mapDiv1 /deep/ #MainMap2d{
    top: 1.22667rem !important;
    bottom: 1.33333rem!important;
    height: auto!important;
  }
  #mapDiv2 /deep/ #MainMap22d{
    height: calc(50% - 1.33333rem)!important;
  }
</style>
