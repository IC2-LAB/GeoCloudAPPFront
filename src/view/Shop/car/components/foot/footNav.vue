<!--eslint-disable-->
<template>

  <div class="contain">
    <div class="row">
        <div class="cell" v-if="select.search">
            <img src="@/assets/images/shop/search.png"  @click="changeSearch" />
            <span>数据查询</span>
        </div>
        <div class="cell-select" v-if="select.searchSelect" >
            <img src="@/assets/images/shop/sreachselect.png" />
            <span>数据查询</span>
        </div>
        <div class="cell" v-if="select.car">
            <img src="@/assets/images/shop/buycar.png" @click="changeCar" />
            <span>购物车</span>
        </div>
        <div class="cell-select" v-if="select.carSelect">
            <img src="@/assets/images/shop/buycarselect.png" />
            <span>购物车</span>
        </div>
        <div class="cell" v-if="select.order">
            <img src="@/assets/images/shop/order.png" @click="changeOrder" />
            <span>订单</span>
        </div>
        <div class="cell-select" v-if="select.orderSelect">
            <img src="@/assets/images/shop/orderselect.png" />
            <span>订单</span>
        </div>
    </div>
  </div>
  
</template>

<!--eslint-disable-->
<script>

export default {
    data(){
        return{
            select:{
                car:false,
                order:true,
                search:true,
                carSelect:true,
                orderSelect:false,
                searchSelect:false
            }
        }
    },
    methods:{
        changeSearch(){
            //选中页面----数据查询
           if(this.select.search){
                //取消底部其余按钮选中状态
                if(this.select.carSelect){
                this.select.carSelect = false;
                this.select.car = true;
                }
                if(this.select.orderSelect){
                this.select.orderSelect = false;
                this.select.order = true;
                }
                    //点亮图标
                    this.select.search = false;
                    this.select.searchSelect = true;
                    this.$router.push("/search");
           }

        },
        changeCar(){
            //选中页面----购物车
           if(this.select.car){
                //取消底部其余按钮选中状态
                if(this.select.searchSelect){
                this.select.searchSelect = false;
                this.select.search = true;
                }
                if(this.select.orderSelect){
                this.select.orderSelect = false;
                this.select.order = true;
                }
                    //点亮图标
                    this.select.car = false;
                    this.select.carSelect = true;
           }

        },
        changeOrder(){
            //选中页面----订单页面
           if(this.select.order){
                //取消底部其余按钮选中状态
                if(this.select.searchSelect){
                this.select.searchSelect = false;
                this.select.search = true;
                }
                if(this.select.carSelect){
                this.select.carSelect = false;
                this.select.car = true;
                }
                    //点亮图标
                    this.select.order = false;
                    this.select.orderSelect = true;
           }

        }
    }
}
</script>


<!--eslint-disable-->
<style scoped>
*{
    padding: 0;
    margin: 0;  
}
    .contain{
        box-sizing: border-box;
        display:table;
        width:100%;
        height:7.34%;
        background: #FFFFFF;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
    }
    .row{
        display: table-row;
        width: 100%;
        height: 100%;
    }
    .cell{
        box-sizing: border-box;
        display: table-cell;
        text-align: center;
        width: 33%;
        vertical-align: middle;
    }
    .cell span{
        display: block;
        box-sizing: border-box;
        font-size: 0.27rem;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #666666;
        line-height:0.373rem;
       
    }
    .cell img{
        width: 0.453rem;
        height: 0.453rem;
        position: relative;
    }
    .cell-select{
        box-sizing: border-box;
        display: table-cell;
        text-align: center;
        width: 33%;
        vertical-align: middle;
    }
    .cell-select span{
        display: block;
        box-sizing: border-box;
        font-size: 0.27rem;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #4675F1;
        line-height:0.373rem;
    }
    .cell-select img{
        width: 0.67rem;
        height: 0.67rem;
    }   
</style>