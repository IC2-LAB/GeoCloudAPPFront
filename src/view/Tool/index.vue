<!--
<template>
  <div class="tool">
    <van-nav-bar
      title="工具"
      left-arrow
      @click-left="onClickLeft"
    />
      <van-row class="rowClass">
        <van-col span="12" class="colClass"  @click="handleColClick('p')">
          <img src="./img/photograph.png" alt="">
          <span>拍照</span>
        </van-col>
        <van-col span="12" class="colClass"  @click="handleColClick('l')">
          <img src="./img/length.png" alt="">
          <span>测长度</span>
        </van-col>
      </van-row>
      <van-row class="rowClass">
        <van-col span="12" class="colClass"  @click="handleColClick('a')">
          <img src="./img/area.png" alt="">
          <span>测面积</span>
        </van-col>
        <van-col span="12" class="colClass"  @click="handleColClick('d')">
          <img src="./img/draw.png" alt="">
          <span>画地块</span>
        </van-col>
      </van-row>
      <van-row class="rowClass">
        <van-col span="12" class="colClass"  @click="handleColClick('c')">
          <img src="./img/code.png" alt="">
          <span>二维码</span>
        </van-col>
      </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/home'})
    },
    handleColClick (val) {
      if (val === 'd') {
        this.$router.push({path: '/Draw'})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tool{
  text-align: center;
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title{
      color: #fff !important;
    }
  }
  .rowClass{
    width: 90%;
    margin: auto;
    .colClass{
      text-align: center;
      .mt(20);
    }
    img{
      width: 100%;
    }
    span{
      .fs(40);
      font-weight: bold;
      display: inherit;
      .mt(-120);
    }
  }
}
</style>
-->
