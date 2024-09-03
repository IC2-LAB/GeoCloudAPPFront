<template>
  <div class="contain">
    <van-nav-bar title="结果列表" left-arrow @click-left="onClickLeft"/>
    <div class="head">
      <span class="t1">购物车({{shopTableData.length}})</span>
      <span @click="deleteAllData">移除</span>
    </div>
    <div class="items">
      <div class="item" v-for="item in tableData" :key="item.F_DID">

        <div class="ShopImge">
          <van-checkbox  v-model="item.isSelect" icon-size="100%" >

          </van-checkbox>

          <img :src="item.imageurl" :alt="item.F_DATANAME">
        </div>
        <div class="ShopInfo">
          <p>{{item.F_DATANAME}}</p>
          <span>{{item.F_RECEIVETIME}}</span>
        </div>
      </div>
    </div>
    <div class="Tool">
      <van-checkbox v-model="checkedDataz"  v-if="switchingNameFlag" shape="square" @change="checkedDataAll"></van-checkbox>
      <span>全选</span>
        <van-button type="info">
          <span>提交订单</span>
        </van-button>
    </div>
    <search ></search>
  </div>
</template>

<script>
import search from '@/view/Search/index.vue'
export default {
  components: {
    search
  },
  data () {
    return {
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .ShopImge{
    width: 41.05%;
    display: flex;

  }
  .ShopInfo{
    width:58.7%;
    position: relative;
    left: 0.05rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
</style>
