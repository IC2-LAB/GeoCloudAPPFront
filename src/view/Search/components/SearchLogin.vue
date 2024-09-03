<template>
  <HeaderDZY @getisLogin="getisLogin" ref="cyHeader"/>
</template>

<script>
  import HeaderDZY from './Header.vue'
  import http from '@/service/interface'

  export default {
    components: {
      HeaderDZY
    },
    data() {
      return {
        isLoginD: false
      }
    },
    mounted() {
      this.getTokenData()
    },
    methods: {
      getisLogin(val) {
        this.isLoginD = val
      },
      // 进入页面获取token
      getTokenData() {
        console.log(1241325346, 'dzy')
        let token1 = window.location.href
        console.log(window.location.href, 'window.location.href')
        if (token1.indexOf('access_token') !== -1) {
          console.log(token1, 'token1')
          let token2 = token1.split('=')
          console.log(token2[1], 'token2')
          http.getToken({access_token: token2[1]}).then(res => {
            console.log(res, 'res.data')
            let a = JSON.parse(res.data)
            if (a.ret === 0) {
              http.getAppTokenData({accessToken: token2[1]}).then(response => {
                console.log(response.data, 'dzyToken')
                localStorage.setItem('dzytoken', token2[1])
                if (localStorage.getItem('dzytoken') && localStorage.getItem('dzytoken').length > 0) {
                  console.log('是否進入')
                  //alert("localStorage.getItem('dzytoken'):"+localStorage.getItem('dzytoken'))
                  // 初始化用户和菜单
                  this.$nextTick(() => {
                    this.$refs['cyHeader'].initGetUserName()// 初始化用户信息？
                  })
                }
              })
            } else {
              http.getCodeData().then(res => { // 获取code
                //alert(res.data)
                if (res.data) {
                  let url = window.location.href
                  window.location.href = res.data + '&state=' + url
                }
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
