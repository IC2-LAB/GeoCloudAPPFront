<!--eslint-disable-->
<template>
    <div class="contain">
 
  <van-tabs v-model="active" class="HeadNav">
  <van-tab title="代提交">
    <div class="examineBox">
        <div class="orderBox" >
            <div class="orderID" >
               
                <div class="title">
                <img src="../../assets/images/order/1x/orderID.png"
                 srcset="../../assets/images/order/2x/orderIDx.png" 
                 alt="商品图片"
                 />
                 <p class="shopID">{{shopImage.shopID}}</p>
                </div>
                
                 <p class="creatTime">{{shopImage.createTime}}</p>
            </div>
            <div class="orderInfo">
                <img src="../../assets/images/shop/orderele.png">
                <ul>
                    <li class="shopID"><span>高分辨率对地观测系统重大专项</span></li>
                    <li class="shopdec"><span>121221.23GB · 111112</span></li>
                    <li class="belong"><span class="back"><span>中国自然资源航空物探遥感</span></span></li>
                    <li><span class="back"><span>在线下载</span></span></li>
                </ul>
            </div>
            <div class="user">
                <div class="avaBox">
                <img class="avator" src="../../assets/images/order/2x/orderIDx.png" />
                <span class="userID">云炎强(yunyanqiang)</span>
                </div>
                <span class="uphone">14291422339</span>
            </div>
        </div>
        <div class="fuctionBox">
            <ul>
                <li><span>任务来源说明</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>签字后数字分发</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>介绍信</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>身份证</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>其他</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
            </ul>
        </div>
        <div class="BouttonBox">
            <van-button type="info"><span>提交</span></van-button>
            <van-button type="info"><span>保存</span></van-button>
            <van-button type="info"><span>数据分布</span></van-button>
            <van-button type="info"><span>查看列表</span></van-button>
        </div>
    </div>

  </van-tab>
  <van-tab title="待审核">
    <div class="examineBox">
        <div class="orderBox" >
            <div class="orderID" >
               
                <div class="title">
                <img src="../../assets/images/order/1x/orderID.png"
                 srcset="../../assets/images/order/2x/orderIDx.png" 
                 alt="商品图片"
                 />
                 <p class="shopID">{{shopImage.shopID}}</p>
                </div>
                
                 <p class="creatTime">{{shopImage.createTime}}</p>
            </div>
            <div class="orderInfo">
                <img src="../../assets/images/shop/orderele.png">
                <ul>
                    <li class="shopID"><span>高分辨率对地观测系统重大专项</span></li>
                    <li class="shopdec"><span>121221.23GB · 111112</span></li>
                    <li class="belong"><span class="back"><span>中国自然资源航空物探遥感</span></span></li>
                    <li><span class="back"><span>在线下载</span></span></li>
                </ul>
            </div>
            <div class="user">
                <div class="avaBox">
                <img class="avator" src="../../assets/images/order/2x/orderIDx.png" />
                <span class="userID">云炎强(yunyanqiang)</span>
                </div>
                <span class="uphone">14291422339</span>
            </div>
        </div>
        <div class="fuctionBox">
            <ul>
                <li><span>任务来源说明</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>签字后数字分发</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>介绍信</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>身份证</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>其他</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
            </ul>
        </div>
        <div class="BouttonBox">
            <van-button type="info"><span>查看列表</span></van-button>
            <van-button type="info"><span>数据分布</span></van-button>
        </div>
    </div>

  </van-tab>
  <van-tab title="审核通过">内容 3</van-tab>
  <van-tab title="准备完成">内容 4</van-tab>
  <van-tab title="未通过">
     <div class="examineBoxs">
        <div class="orderBox" >
            <div class="orderID" >
               
                <div class="title">
                <img src="../../assets/images/order/1x/orderID.png"
                 srcset="../../assets/images/order/2x/orderIDx.png" 
                 alt="商品图片"
                 />
                 <p class="shopID">{{shopImage.shopID}}</p>
                </div>
                
                 <p class="creatTime">{{shopImage.createTime}}</p>
            </div>
            <div class="orderInfo">
                <img src="../../assets/images/shop/orderele.png">
                <ul>
                    <li class="shopID"><span>高分辨率对地观测系统重大专项</span></li>
                    <li class="shopdec"><span>121221.23GB · 111112</span></li>
                    <li class="belong"><span class="back"><span>中国自然资源航空物探遥感</span></span></li>
                    <li><span class="back"><span>在线下载</span></span></li>
                </ul>
            </div>
            <div class="user">
                <div class="avaBox">
                <img class="avator" src="../../assets/images/order/2x/orderIDx.png" />
                <span class="userID">云炎强(yunyanqiang)</span>
                </div>
                <span class="uphone">14291422339</span>
            </div>
        </div>
        <div class="fuctionBox">
            <ul>
                <li><span>任务来源说明</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>签字后数字分发</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>介绍信</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>身份证</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li><span>其他</span>
                <img src="../../assets/images/order/1x/Search@1x.png" 
                     srcset="../../assets/images/order/2x/Search@2x.png" /></li>
                <li> 
                    <div class="warning">
                        <span>单位名称不正确，附件不正确</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="BouttonBox">
            <van-button type="info"><span>提交</span></van-button>
            <van-button type="info"><span>保存</span></van-button>
            <van-button type="info"><span>数据分布</span></van-button>
            <van-button type="info"><span>查看列表</span></van-button>
        </div>
    </div>    


  </van-tab>
    </van-tabs>
    <foot-nav></foot-nav>
    </div>
</template>

<!--eslint-disable-->
<script>
import FootNav from '@/view/Shop/car/components/foot/footNav.vue'
export default {
    components:{
      FootNav
    },
    data(){
      let active = "";
      const shopImage = {
        shopID:"20220202WP00001",
        shopName:"高分辨率对地观测系统重大专项",
        createTime:"2020-02-02",
        createUser:"云炎强(yunyanqiang)"
      }

        return{
            active,
            shopImage
        }
    }
}
</script>

<!--eslint-disable-->
<style>
    /*页面样式*/
    *{
        padding: 0;
        margin: 0;
        list-style: none;
        box-sizing: border-box;
    }
    /** 页头*/
    .contain{
        width: 100%;
        height: 100%;
        background: #F6F6F6;
    }
    .contain .PageHead{
        width: 100%;
        height: 9.6%;
        background: #FFFFFF;
        box-shadow: 0px 1px 0px 0px #E5EBEE;
    }
    .contain .examineBox{
        width: 92%;
        height: 12.56rem;
        background: #FFFFFF;
        box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
        border-radius: 6px;
        z-index: 10;
        position: absolute;
        left: 0.4rem;
        top: 2.05rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contain .examineBox .orderBox{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contain .examineBox .orderBox  .orderID{
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 0.27rem;
    }
     .contain .examineBox .orderBox .orderID .title{
       display: flex;
       width: 55%;
     }
     .contain .examineBox .orderBox .orderID .title p{
        align-self: center;
        margin-left: 0.32rem;
     }
     .contain .examineBox .orderBox .orderID .creatTime{
        align-self: center;
        margin-right: 0.32rem;
     }
    .contain .examineBox .orderBox  .orderID  img{
        width: 0.533rem;
        height: 0.533rem;
        margin-left: 0.32rem;
    }
   .contain .examineBox .orderBox .orderInfo{
        width: 100%;
        display: flex;
        margin-left: 0.32rem;
        margin-top: 0.373rem;
   }    
    .contain .examineBox .orderBox .orderInfo img{
        width: 2.73rem;
        height: 2.73rem;
    }
    .contain .examineBox .orderBox .orderInfo ul{
        margin-left: 0.253rem;
    }
     .contain .examineBox .orderBox .orderInfo ul li span{
        
        font-size: 0.293rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #433f3f;
        line-height: 0.4rem;
       
     }
     .contain .examineBox .orderBox .orderInfo ul .shopID{
        margin-bottom: 0.16rem;
     }
    .contain .examineBox .orderBox .orderInfo ul .shopdec{
        margin-bottom: 0.32rem;
    }
    .contain .examineBox .orderBox .orderInfo ul .belong{
        margin-bottom: 0.267rem;
    }
      .contain .examineBox .orderBox .orderInfo ul .shopID span{
        font-size: 0.373rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 0.533rem;
        
      }
      .contain .examineBox .orderBox .orderInfo ul .shopdec span{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 0.44rem;
        
      }
     .contain .examineBox .orderBox .orderInfo ul li .back{
        border-radius: 0.373rem;
        opacity: 0.21;
        background:  #D8D8D8;
     }
     .contain .examineBox .orderBox .user{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.27rem;
     }
     .contain .examineBox .orderBox .user .avaBox{
        display: flex;
        align-self: center;
        margin-left: 0.32rem;
     }
     .contain .examineBox .orderBox .user .avaBox img{
        width: 0.59rem;
        height: 0.59rem;
        border: 1px solid rgba(255,255,255,0.36);
        border-radius: 50%;
        align-self: center;
        margin-right: 0.133rem;
        }
    .contain .examineBox .orderBox .user .uphone{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 0.44rem;
        align-self: center;
        margin-right: 0.32rem;
    }
    .contain .examineBox .orderBox .user .avaBox span{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 0.44rem;
        align-self: center;
    }
    .contain .examineBox  .fuctionBox{
        width: 100%;
        height: 47.9%;
    }
    .contain .examineBox  .fuctionBox ul{
        width: 100%;
        height: 100%;
        margin-left: 0.32rem;
       
    }
    .contain .examineBox  .fuctionBox ul li{
        background-color:rgba(216,216,216,0.21);
        width: 93.04%;
        height: 20%;
        display: flex;
        justify-content: space-between;
    }
    .contain .examineBox  .fuctionBox ul li img{
        width: 0.387rem;
        height: 0.387rem;
        align-self: center;
        margin-right: 0.32rem;
    }
    .contain .examineBox  .fuctionBox ul li .warning{
        width: 8.56rem;
        height: 1.07rem;
        background: rgba(255,0,0,0.1);
        border-radius: 0.16rem;
        border: 2px solid rgba(255,2,0,0.45);
    }
    .contain .examineBox .fuctionBox ul li span{
        align-self: center;
        font-size: 0.373rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 0.533rem;
        margin-left: 0.32rem;
    }
    .contain .examineBox .BouttonBox{
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 0.42rem;
        width: 93.04%;
        align-self: center;
        margin-left: 0.72rem;
    }

    /*未通过页面 */
     .contain .examineBoxs{
        width: 92%;
        height: 14.04rem;
        background: #FFFFFF;
        box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
        border-radius: 6px;
        z-index: 10;
        position: absolute;
        left: 0.4rem;
        top: 2.05rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contain .examineBoxs .orderBox{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contain .examineBoxs .orderBox  .orderID{
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 0.27rem;
    }
     .contain .examineBoxs .orderBox .orderID .title{
       display: flex;
       width: 55%;
     }
     .contain .examineBoxs .orderBox .orderID .title p{
        align-self: center;
        margin-left: 0.32rem;
     }
     .contain .examineBoxs .orderBox .orderID .creatTime{
        align-self: center;
        margin-right: 0.32rem;
     }
    .contain .examineBoxs .orderBox  .orderID  img{
        width: 0.533rem;
        height: 0.533rem;
        margin-left: 0.32rem;
    }
   .contain .examineBoxs .orderBox .orderInfo{
        width: 100%;
        display: flex;
        margin-left: 0.32rem;
        margin-top: 0.373rem;
   }    
    .contain .examineBoxs .orderBox .orderInfo img{
        width: 2.73rem;
        height: 2.73rem;
    }
    .contain .examineBoxs .orderBox .orderInfo ul{
        margin-left: 0.253rem;
    }
     .contain .examineBoxs .orderBox .orderInfo ul li span{
        
        font-size: 0.293rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #433f3f;
        line-height: 0.4rem;
       
     }
     .contain .examineBoxs .orderBox .orderInfo ul .shopID{
        margin-bottom: 0.16rem;
     }
    .contain .examineBoxs .orderBox .orderInfo ul .shopdec{
        margin-bottom: 0.32rem;
    }
    .contain .examineBoxs .orderBox .orderInfo ul .belong{
        margin-bottom: 0.267rem;
    }
      .contain .examineBoxs .orderBox .orderInfo ul .shopID span{
        font-size: 0.373rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 0.533rem;
        
      }
      .contain .examineBoxs .orderBox .orderInfo ul .shopdec span{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 0.44rem;
        
      }
     .contain .examineBoxs .orderBox .orderInfo ul li .back{
        border-radius: 0.373rem;
        opacity: 0.21;
        background:  #D8D8D8;
     }
     .contain .examineBoxs .orderBox .user{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.27rem;
     }
     .contain .examineBoxs .orderBox .user .avaBox{
        display: flex;
        align-self: center;
        margin-left: 0.32rem;
     }
     .contain .examineBoxs .orderBox .user .avaBox img{
        width: 0.59rem;
        height: 0.59rem;
        border: 1px solid rgba(255,255,255,0.36);
        border-radius: 50%;
        align-self: center;
        margin-right: 0.133rem;
        }
    .contain .examineBoxs .orderBox .user .uphone{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 0.44rem;
        align-self: center;
        margin-right: 0.32rem;
    }
    .contain .examineBoxs .orderBox .user .avaBox span{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 0.44rem;
        align-self: center;
    }
    .contain .examineBoxs  .fuctionBox{
        width: 100%;
        height: 47.9%;
    }
    .contain .examineBoxs  .fuctionBox ul{
        width: 100%;
        height: 100%;
        margin-left: 0.32rem;
        margin-top: 0.267rem;
    }
    .contain .examineBoxs  .fuctionBox ul li{
        background-color:rgba(216,216,216,0.21);
        width: 93.04%;
        height: 20%;
        display: flex;
        justify-content: space-between;
    }
    .contain .examineBoxs  .fuctionBox ul li img{
        width: 0.387rem;
        height: 0.387rem;
        align-self: center;
        margin-right: 0.32rem;
    }
    .contain .examineBoxs  .fuctionBox ul li .warning{
        width: 8.56rem;
        height: 1.07rem;
        background: rgba(255,0,0,0.1);
        border-radius: 0.16rem;
        border: 2px solid rgba(255,2,0,0.45);
        display: flex;
        margin-top: 0.213rem;
    }
    .contain .examineBoxs  .fuctionBox ul li .warning span{
        font-size: 0.373rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF4341;
        line-height: 0.533rem;
    }
    .contain .examineBoxs .fuctionBox ul li span{
        align-self: center;
        font-size: 0.373rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 0.533rem;
        margin-left: 0.32rem;
    }
    .contain .examineBoxs .BouttonBox{
        display: flex;
        flex-direction: row-reverse;
        width: 93.04%;
        align-self: center;
        margin-left: 0.72rem;
        margin-top: 2.077rem;
        margin-bottom: 0.427rem;
    }
    /** vant样式*/
    .van-tabs{
      
    }
    .van-tab{
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0px 1px 0px 0px #E5EBEE;
        display: flex;
        
    }
    .van-tabs__line{
        background: #517BF2;

    }
    .van-button{
        width: 1.93rem;
        height: 0.773rem;
        background: #4675F1;
        margin-right: 0.32rem;
        border-radius: 0.427rem;
        border: none;
        display: inline-block;
        white-space: nowrap;
    }
    .van-button span{
        font-size: 0.346rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8591AE;
        line-height: 0.493rem;
    }

    .van-button +.van-button{
        background: #EAEDF3;
    }
</style>