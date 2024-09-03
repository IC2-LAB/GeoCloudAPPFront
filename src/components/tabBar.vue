<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="guide-o"  @click="toSearch">数据查询</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to='/shop'>购物车</van-tabbar-item>
    <van-tabbar-item icon="shop-o" to='/Order'>订单</van-tabbar-item>
    <!-- <van-tabbar-item icon="user-o" to='/Mine'>我的</van-tabbar-item> -->
  </van-tabbar>
</template>

<script>
  export default {
    name: 'tabBar',
    props: ['barIndex'],
    data () {
      return {
        active: 0
      }
    },
    mounted () {
      if (this.barIndex === 0) {
        this.active = 0
      } else if (this.barIndex === 1) {
        this.active = 1
      } else if (this.barIndex === 2) {
        this.active = 2
      }
      // else if (this.barIndex === 4) {
      //   this.active = 4
      // }
    },
    methods: {
      toSearch () {
        if (this.active === 0) {
          this.$router.push({
            path: '/search'
          })
        }
      },
      toOrder () {
        if (this.active === 1) {
          this.$router.push({
            path: '/Order'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
