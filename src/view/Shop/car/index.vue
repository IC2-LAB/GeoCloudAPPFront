<!--eslint-disable-->
<template>
    <div class="contain">
    <div class="head">
      <span class="t1">购物车({{shopTableData.length}})</span>
      <span @click="deleteAllData">移除</span>
    </div>
    <div class="items">
      <div class="item" v-for="(item,index) in shopTableData" :key="item.shopID">
          <div class="ShopImge">
            <van-checkbox v-model="item.isSelect" icon-size="80%">

            </van-checkbox>
            <img style="width: 30%" :src="item.imageurl" :alt="item.dataname">
          </div>
        <div class="shopInfo">
          <p class="p1">{{item.dataname}}</p>
          <!--<div>&nbsp;</div>-->
          <p class="p2">{{item.receivetime}}</p>
        </div>
        </div>
        </div>
        <div class="Tool">
            <div class="selectbox">
            <van-checkbox @change="currentPageAllSelect" v-model="imageAllCheck" shape="square">
            </van-checkbox>
            <span>全选</span>
            </div>

              <div class="emty">
              </div>

            <van-button v-if="userProNameIs" type="info" @click="createShopOrder(0)">
                <span>提交订单</span>
                </van-button>

        </div>
        <FootBar>
        </FootBar>
      <tabBar :barIndex="barIndex" />
    </div>

</template>

<!--eslint-disable-->
<script>
  import tabBar from '@/components/tabBar.vue'
  import http from '@/service/interface'
  import {mapActions} from 'vuex'
  export default {
    components: {
      tabBar
    },
    data(){
      return{
        barIndex: 1,
        shopCurrentPage: 1,
        shopPageSize: 999999,
        pagerCount: 5,
        DeleId: [],
        ListWkt: [],
        nodeIdSData: [],
        wktlist: [],
        shopId: [],
        shopTableData: [],
        shopTableDataAll: [],
        checkedAllData: false,
        imageAllCheck: false,
        flag: {},
        changeFlag: false,
        userProNameIs: true,
        shopPageSizeInt: 7,
        shopTotal: 0,
        check:false
      }
    },
    methods: {
      checkAll() {
        for (let i = 0; i < this.shopItem.length; i++) {
          this.shopItem[i].checked = this.check;
        }
      },
      // 点击购物车分页
      handleShopCurrentChange(val) {
        this.shopCurrentPage = val
        this.shopTableData = this.shopTableDataAll.slice((val - 1) * this.shopPageSize, val * this.shopPageSize)
      },
      getUserR() {
        let userID = JSON.parse(localStorage.getItem('principalUserID'))
        let userRote = JSON.parse(userID.principal)
        if (userRote.roleIds.length > 0) {
          if (userRote.roleIds[0].indexOf('注册') > -1 || userRote.roleIds[0].indexOf('游客') > -1) {
            this.userProNameIs = false
          } else {
            this.userProNameIs = true
          }
        } else {
          this.userProNameIs = false
        }
      },
      dataSizeFormatter (dataSize) {
        if (dataSize) {
          var datasize = parseFloat(dataSize)
          var str = ['KB', 'M', 'G', 'T', 'P']
          for (var i = 0; i < str.length; i++) {
            if (datasize <= 1024) {
              return datasize.toFixed(2) + str[i]
            } else {
              datasize = datasize / 1024.0
            }
          }
          return 1
        } else if (dataSize === 0) {
          return 0
        } else {
          return '-'
        }
      },
      currentPageAllSelect() {
        if (this.imageAllCheck) {
          this.shopTableData.map(item => {
            item.isSelect = true
          })
        } else {
          this.shopTableData.map(item => {
            item.isSelect = false
          })
        }
      },
      // 选择购物车数据
      handleSelectionChange() {
        this.shopId = []
        this.wktlist = []
        this.DeleId = []
        this.ListWkt = []
        this.ListDataName = []
        this.ListSatellite = []
        this.ListSensor = []
        this.typeId = '2'
        this.dataTypeSet = new Set()
        for (let i = 0; i < this.shopTableDataAll.length; i++) {
          if (this.shopTableDataAll[i].isSelect) {
            this.shopId.push(this.shopTableDataAll[i].did)
            this.DeleId.push(this.shopTableDataAll[i].id)
            this.nodeIdSData.push(this.shopTableDataAll[i].nodeid)
            this.wktlist.push(this.shopTableDataAll[i].wktresponse)
            this.ListDataName.push(this.shopTableDataAll[i].dataname)
            this.ListSatellite.push(this.shopTableDataAll[i].satelite)
            this.ListSensor.push(this.shopTableDataAll[i].sensor)
            this.dataTypeSet.add(this.shopTableDataAll[i].datatype)
          }
        }
      },
      // 初始化购物车
      shopDataForAllPage() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        http.getAllShopDataForAllPage({
          data: {
            // datatype: '0'
          }
        }).then(res => {
          loading.close()
          // console.log(res, 'RESSSSSSS')
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, index) => {
              item.datatypename = 'GF1_MSS压缩包'
              if (item.receivetime && item.receivetime.indexOf('T') > -1) {
                item.receivetime = item.receivetime.replace('T', ' ').slice(0, 19)
              }
              if (!item.location || item.location.indexOf('undefined') > -1) {
                item.location = '-'
              }
              item.cloudpercent = item.cloudpercent + '%'
              item.isSelect = false
              if (item.datasize) {
                item.datasize = this.dataSizeFormatter(item.datasize)
              } else {
                item.datasize = '-'
              }
            })
            this.shopTableDataAll = res.data
            this.shopTableData = this.shopTableDataAll.slice((this.shopCurrentPage - 1) * this.shopPageSize, this.shopCurrentPage * this.shopPageSize)
            this.shopTotal = res.data.length
          } else {
            this.shopTableDataAll = []
            this.shopTableData = []
            this.shopTotal = 0
            this.imageAllCheck = false
            this.checkedAllData = false
          }
        })
      },
      // 生成订单
      createShopOrder(index) {
        this.handleSelectionChange()
        localStorage.setItem('IDs', JSON.stringify(this.DeleId))
        if (this.shopId.length > 0) {
          sessionStorage.setItem('shopIDs', JSON.stringify(this.shopId))
          // this.setShopIDs(this.shopId)
          if (index === 0) {
            this.$router.push({path: '/shopSubmit'})
          } else if (index === 1) {
            if (this.dataTypeSet.size > 1) {
              this.$toast.top('创建再加工订单目前只支持选择一种数据类型的数据！')
            } else {
              this.$router.push({path: '/manage/person/createReporder'})
            }
          }
        } else {
          this.$toast.top('请选择数据！')
        }
      },
      // 购物车删除
      handleDelete(index, row) {
        let _this = this
        if (index === 1) {
          _this.shopId = [row.id]
        } else {
          _this.shopId = row
        }
        /*_this.$confirm('确认将数据移除购物车？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {*/
        http.deleteShop({
          // ids: _this.shopId
          data: {
            shopIds: _this.shopId
          }
        }).then(res => {
          if (res.data !== 'false') {
            _this.$notify({
              message: '删除成功！',
              position: 'bottom-right',
              duration: 1500,
              type: 'success'
            })
            _this.shopDataForAllPage()
            _this.getShopCarNum()
          } else {
            _this.$notify.error({
              message: '删除失败！',
              position: 'bottom-right',
              duration: 0
            })
          }
        }, (resp) => {
          _this.$notify.error({
            message: '请求失败！',
            position: 'bottom-right',
            duration: 0
          })
        })
        /*.catch(() => {
           _this.$notify.info({
             message: '已取消删除！',
             position: 'bottom-right',
             duration: 3500
           })
         })*/
      },
      deleteAllData() {
        event.stopPropagation();//函数里加入禁止冒泡
        this.handleSelectionChange()
        if (this.DeleId.length > 0) {
          this.handleDelete(2, this.DeleId)
        } else {
          this.$message({
            message: '请选择数据！',
            type: 'warning'
          })
        }
      },
      ...mapActions('configManage', {
        getShopCarNum: 'getShopCarNum'
      })
    },
    mounted() {
      /* if (this.$route.path === '/manage/person/shopCar') {*/
      this.shopDataForAllPage()
      /*}*/
      this.getUserR()
    },

    watch: {
      shopTableData: {
        handler(newVal, oldVal) {
          let _this = this
          let indexArr = []
          this.shopId = []
          this.DeleId = []
          this.wktlist = []
          if (newVal) {
            if (newVal.length > 0) {
              newVal.forEach(item => {
                if (!item.isSelect) {
                  indexArr.push(item)
                } else {
                  this.shopId.push(item.dataid)
                  this.DeleId.push(item.id)
                  this.wktlist.push(item.wktresponse)
                }
              })
              if (indexArr.length > 0) {
                _this.imageAllCheck = false
              } else {
                _this.imageAllCheck = true
              }
            }
          }
        },

        deep: true
      },
      shopTableDataAll: {
        handler(newVal, oldVal) {
          let indexAllArr = []
          if (newVal.length > 0) {
            newVal.forEach(item => {
              if (!item.isSelect) {
                indexAllArr.push(item)
              }
            })
            if (indexAllArr.length > 0) {
              this.checkedAllData = false
            } else {
              this.checkedAllData = true
            }
          }
        },
        deep: true
      }
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
      margin-left: 0.31rem;
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
