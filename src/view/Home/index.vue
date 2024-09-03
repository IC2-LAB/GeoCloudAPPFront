<!--
<template>
  <div class="home">
    <div class="card" v-for="item in professionalData" :key="item.id" :style="tabSrc" @click="handleProfessionalClick(item)">
      <img class="icon" :src="item.imgUrl" alt="">
      <p>{{item.name}}</p>
      <img class="arrow" src="./img/arrow.png" alt="">
    </div>
  </div>
</template>

<script>
// import http from '@/api/interface.js'
export default {
  data () {
    return {
      professionalData: [
        {id: '1', name: '产品业务', imgUrl: require('./img/cp.png')},
        {id: '2', name: '保险业务', imgUrl: require('./img/bx.png')},
        {id: '3', name: '工具', imgUrl: require('./img/gj.png')}
      ],
      tabSrc: {
        backgroundImage: 'url(' + require('./img/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPositionY: '4px'
      }
    }
  },
  methods: {
    handleProfessionalClick (val) {
      if (val.id === '1') {
        this.$router.push({path: 'Profession'})
      } else if (val.id === '2') {
        this.$router.push({path: 'Insurance'})
      } else if (val.id === '3') {
        this.$router.push({path: 'Tool'})
      }
    },
    // 下拉刷新
    onLoad () {
      let pageNum = ++this.params.pageNum
      this.params.pageNum = pageNum
      this.$nextTick(() => this.getList())
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>
<style scoped lang="less">
.home{
  width: 100%;
  height: 100%;
  background-color: #38A8FB;
  background-image: linear-gradient(#38A9FB, #2A81FF);
  .pt(120);
  .card{
    .mt(40);
    .b-radius(10);
    width: 80%;
    margin-left: 10%;
    .h(200);
    display: block;
    background-color: #fff;
    display: flex;
    align-items: center;
    .icon{
      .ml(20);
      vertical-align: middle;
    }
    p{
      text-align: center;
      .w(160);
      .ml(90);
      .fs(40)
    }
    .arrow{
      .ml(130);
    }
  }
}
</style>
-->
