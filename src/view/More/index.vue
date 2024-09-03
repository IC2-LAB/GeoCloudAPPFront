<!--

<template>
  <div class="container">
    <router-view :dataAll="dataAll" class="routerDiv" @commitForm="commitForm"/>
    <van-tabbar v-model="active">
      <van-tabbar-item name="message" :to="`/more/message?id=${id}`" icon="home-o">基本信息</van-tabbar-item>
      <van-tabbar-item name="local" :to="`/more/local?id=${id}`" icon="search">项目位置</van-tabbar-item>
      <van-tabbar-item name="myImage" :to="`/more/myImage?id=${id}`" icon="friends-o">项目图片</van-tabbar-item>
      <van-tabbar-item name="vedio" :to="`/more/vedio?id=${id}`" icon="setting-o">项目视频</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import http from '@/api/interface'
export default {
  data () {
    return {
      dataAll: {},
      active: 'message',
      id: ''
    }
  },
  watch: {
    '$route' () {}
  },
  methods: {
    getDataAll (id) {
      // http.queryProjectBasicInfosById({id}).then(res => {
      //   // console.log(res)
      //   this.dataAll = res.data
      // })
    },
    commitForm () {
      this.getDataAll(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    let {id} = to.query
    let {name} = to
    next(vm => {
      vm.id = id
      switch (name) {
        case 'message':
          vm.active = 'message'
          break
        case 'local':
          vm.active = 'local'
          break
        case 'myImage':
          vm.active = 'myImage'
          break
        case 'vedio':
          vm.active = 'vedio'
          break
      }
      vm.getDataAll(id)
    })
  }
}
</script>

<style scoped lang="less">
.routerDiv{
  .mb(100)
}
</style>
-->
