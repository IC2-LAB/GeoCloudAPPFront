<!--eslint-disable-->
<template>
  <div class="contain" >
    <div class="headTitle" >
      <img @click="back" src="../../assets/images/shop/back.png" />
      <p>订单数据分布</p>
      <div class="emty"></div>
    </div>
    <div class="map" >
      <MapVue ref="mapView"/>
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
  import MapVue from '@/components/cy-map.vue'
  import http from '@/service/interface'
  const gisMapDiaDe = window.GISMaps['MainMap']
  export default {
    components:{
      MapVue
    },
    data(){
      return{
        wktData: [],
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      getParams() {
        gisMapDiaDe.clearAllFeatures()
        this.articleId = this.$route.query.articleId
        this.getTabelDataAll(this.articleId)
      },
      getTabelDataAll (val) {
        http.getagrsListOfSate({
          data: {orderid: val}
        }).then(res => {
          console.log(res, 'ressasfaf')
          this.shopfIds = []
          if (res.data.list.length > 0) {
            res.data.list.forEach((item, index) => {
              item.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=2&dataId=' + item.did + '&nodeId=' + item.nodeid
              item.datasize = this.commonMethod.dataSizeFormatter(item.datasize)
              item.scenedate = this.commonMethod.timestampToTime(item.scenedate)
              item.receivetime = item.receivetime.replace('T', ' ')
              item.isSelect = false
              this.shopfIds.push(item.dataid)
              this.zoomto(item.wktresponse, index)
              this.wktData.push(item.wktresponse)
            })
            if (this.wktData.length === res.data.list.length) {
              this.getwktData()
            }
            this.tableData = res.data.list
            // this.tableData = this.tableDataAll.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            this.total = res.data.list.length
            // this.setTotalDataLength(this.total)
            this.getTotalNum(this.total)
          }
        })
      },
      getTotalNum (val) {
        // this.totalNum = 0
        if (val !== 0) {
          this.totalNum = val
          let zc = parseInt(val / 30)
          let ys = val % 30
          if (zc !== 0 && ys !== 0) {
            this.totalNum = zc + 1
          } else if (zc !== 0 && ys === 0) {
            this.totalNum = zc
          } else {
            this.totalNum = 1
          }
        }
      },
      zoomto (wktResponse, index) {
        let feature = {
          'attributes': {},
          'style': {
            fillcolor: 'rgba(3, 168, 158, 0.3)',
            strokecolor: 'rgba(3, 168, 158, 0.3)',
            strokewidth: 2
            //fillcolor: 'rgba(255,255,255, 0)',
            //strokecolor: 'rgba(44,117,242, 0.5)',
            //strokewidth: 2
          },
          'geometry': wktResponse
        }
        gisMapDiaDe.drawPolygon(feature)
      },
      getwktData () {
        let datax = []
        let datay = []
        if (this.wktData.length > 0) {
          this.wktData.forEach(item => {
            let arrList1 = item.split('((')
            arrList1[1] = arrList1[1].replace(/, /g, ',')
            let arrList = arrList1[1].slice(0, arrList1[1].length - 2).split(',')
            arrList.forEach(e => {
              let arrLic = e.split(' ')
              datax.push(arrLic[0])
              datay.push(arrLic[1])
            })
          })
          let arr2 = datax.sort(this.compare)
          let arr3 = datay.sort(this.compare)
          let wktResponse = 'POLYGON((' + arr2[0] + ' ' + arr3[0] + ',' + arr2[0] + ' ' + arr3[arr3.length - 1] + ',' + arr2[arr2.length - 1] + ' ' + arr3[arr3.length - 1] + ',' + arr2[arr2.length - 1] + ' ' + arr3[0] + ',' + arr2[0] + ' ' + arr3[0] + '))'
          let f = gisMapDiaDe.transformFeatureFromWkt(wktResponse)
          console.log(f,111111111111)
          // 飞到某地
          gisMapDiaDe.flyTo(f, () => {})
        }
      },
      compare (num1, num2) {
        return num2 - num1
      },

    },
    created() {
      this.getParams();
    }

  }
</script>

<!--eslint-disable-->
<style scoped>
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  .contain{
    width: 100%;
    height: 100%;
  }
  .contain .headTitle{
    width: 100%;
    height: 9.6%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.24rem;
  }
  .contain .headTitle img{
    width: 0.4rem;
    height: 0.4rem;
    align-self: center;
  }
  .contain .headTitle p{
    font-size: 0.48rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #070707;
    line-height: 0.67rem;
    align-self: center;

  }
  .contain .headTitle .emty{
    width: 0.4rem;
    height: 0.4rem;
  }
</style>
