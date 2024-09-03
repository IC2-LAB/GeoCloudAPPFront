<!--eslint-disable-->
<template>
  <div class="contain">
    <div class="head">
      <van-nav-bar
        title="订单列表"
        left-arrow
        @click-left="back"
      />
    </div>
    <div class="items">
      <div class="item" v-for="(item,index) in shopTableData" :key="item.shopID">
        <div class="ShopImge">
          <!--<van-checkbox v-model="item.isSelect" icon-size="80%">

          </van-checkbox>-->
          <img style="width: 30%" :src="item.imageurl" :alt="item.dataname">
        </div>
        <div class="shopInfo">
          <p class="p1">{{item.dataname}}</p>
          <!--<div>&nbsp;</div>-->
          <p class="p2">{{item.receivetime}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<!--eslint-disable-->
<script>

  import http from '@/service/interface'
  import {mapActions} from 'vuex'
  export default {
    components: {

    },
    data(){
      return{
        shopCurrentPage: 1,
        shopPageSize: 999999,
        pagerCount: 5,
        DeleId: [],
        ListWkt: [],
        nodeIdSData: [],
        wktlist: [],
        shopId: [],
        shopfIds: [],
        articleId: '',
        shopTableData: [],
        shopTableDataAll: [],
        checkedAllData: false,
        imageAllCheck: false,
        flag: {},
        userProNameIs: true,
        shopPageSizeInt: 7,
        shopTotal: 0,
        totalNum: 0,
        check:false
      }
    },
    methods: {
      getParams() {
        this.articleId = this.$route.query.articleId
        this.getTabelDataAll(this.articleId)
      },
      getTabelDataAll (val) {
        http.getagrsListOfSate({
          data: {orderid: val}
        }).then(res => {
          console.log(res, 'seeUlData')
          //gisMapDiaDe.featuresSourceAllImage.clear()
          this.shopfIds = []
          if (res.data.list.length > 0) {
            res.data.list.forEach((item, index) => {
              item.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=2&dataId=' + item.did + '&nodeId=' + item.nodeid
              item.datasize = this.commonMethod.dataSizeFormatter(item.datasize)
              item.scenedate = this.commonMethod.timestampToTime(item.scenedate)
              item.receivetime = item.receivetime.replace('T', ' ')
              item.isSelect = false
              this.shopfIds.push(item.dataid)
              //this.zoomto(item.wktresponse, index)
              //this.wktData.push(item.wktresponse)
            })
            this.shopTableData = res.data.list
            // this.tableData = this.tableDataAll.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            this.shopTotal = res.data.list.length
            // this.setTotalDataLength(this.total)
            this.getTotalNum(this.shopTotal)
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
      back() {
        this.$router.go(-1);
      },
    },
    created() {
      this.getParams();
    }
  }
</script>

<style scoped>

  *{
    padding: 0;
    margin: 0;
  }
  .items{
    height: 70.6%;
    position: relative;
    top: 11.5%;
    overflow: scroll;
  }

  .contain{
    width: 100%;
    height: 100%;
    background: #F6F6F6;
  }
  .contain .head{
    background: linear-gradient(180deg, #4675F1 0%, rgba(70,117,241,0) 100%);
    width: 100%;
    height: 28.4%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .contain .head .t1{
    height: 0.67rem;
    display: inline-block;
    float: left;
    font-size:0.48rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #FFFFFF;
    line-height:0.67rem;
    box-sizing: border-box;
    position: relative;
    left: 0.4rem;
    top: 0.973rem;
    /* background-color: aqua; */
  }
  .contain .head .t1+span{
    height: 0.53rem;
    display:inline-block;
    float: right;
    font-size: 0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #FFFFFF;
    line-height:0.53rem;
    /* background-color: aqua; */
    position: relative;
    top: 1.04rem;
    right: 0.4rem;
    box-sizing: border-box;

  }
  .contain  .item{
    width:92%;
    height: 21.87%;
    border-radius:0.32rem;
    background: #FFFFFF;
    box-sizing:border-box;
    position: relative;
    left: 0.4rem;
    top: 0.1rem;
    margin-bottom:0.4rem;
    display:flex;
    justify-content:space-between;
  }
  .contain .ShopImge{
    width: 41.05%;
    display: flex;

  }
  .contain  .item .ShopInfo{
    width:58.7%;
    position: relative;
    left: 0.05rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .contain .head{
    background: linear-gradient(180deg, #4675F1 0%, rgba(70,117,241,0) 100%);
    width: 100%;
    height: 28.4%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .contain .head .t1{
    height: 0.67rem;
    display: inline-block;
    float: left;
    font-size:0.48rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #FFFFFF;
    line-height:0.67rem;
    box-sizing: border-box;
    position: relative;
    left: 0.4rem;
    top: 0.973rem;
    /* background-color: aqua; */
  }
  .contain .head .t1+span{
    height: 0.53rem;
    display:inline-block;
    float: right;
    font-size: 0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #FFFFFF;
    line-height:0.53rem;
    /* background-color: aqua; */
    position: relative;
    top: 1.04rem;
    right: 0.4rem;
    box-sizing: border-box;
  }
  .ShopImge .van-checkbox{
    align-self: center;
    margin-left: 0.4rem;
  }
  .ShopImge img{
    width: 57.8%;
    height: 70.3%;
    border-radius: 0.13rem;
    align-self: center;
    flex: 0.7;
    margin-left: 0.5rem;
  }
  .contain .Tool{
    box-sizing: border-box;
    width:100%;
    height:8.24%;
    background: #FFFFFF;
    position:absolute;
    left:0;
    bottom:7.56%;
    display: flex;
    box-shadow: 0px -1px 0px 0px #E5EBEE;
    justify-content: space-between;
  }
  .selectbox{
    display: flex;
    width: 20%;
  }
  .contain .Tool  .van-checkbox{
    /* align-self:center; */
    position: relative;
    left:0.4rem;
    width: 0.4rem;
    height: 0.4rem;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #D0D0D0;
    align-self: center;
  }

  .contain .Tool .van-checkbox+span{

    font-size:0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #666666;
    letter-spacing: 0.01rem;
    line-height: 0.53rem;
    position: relative;
    align-self: center;
    left: 0.467rem;
  }
  .contain .Tool .van-button{
    width: 2.48rem;
    height: 0.8rem;
    background: #4675F1;
    border-radius: 32px;
    align-self: center;
    position: relative;
    right: 0.4rem;
  }
  .contain .Tool .van-button span{
    height: 0.53rem;
    font-size:0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.53rem;
    letter-spacing: 0.01rem;
  }
  .link{
    align-self: center;
  }
  .ShopImge{
    width: 41.05%;
    display: flex;

  }
  /*.ShopImge img{
    width: 57.8%;
    height: 70.3%;
    border-radius: 0.13rem;
    align-self: center;
    flex: 0.7;
    margin-left: 0.31rem;
  }*/
  .shopInfo{
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-wrap: break-word; /* 在长单词或URL地址内部进行换行*/
    word-break: break-all; /* 允许单词内自动换行，如果一个单词很长的话*/
    overflow: hidden;
    text-overflow: ellipsis; /* 溢出用省略号显示*/
    -webkit-line-clamp: 2;
    background: #FFFFFF;
    position: relative;
    right: 0.4rem;
  }
  .shopInfo .p1{
    margin-top: 0.5rem;
    font-size: 0.4rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #070707;
  }
  .shopInfo .p2{
    margin-bottom: 0.5rem;
    font-size: 0.4rem;

  }

</style>
