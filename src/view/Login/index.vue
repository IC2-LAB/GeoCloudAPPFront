<template>
  <div class="loginDiv" :style="tabSrc">
    <div class="logo">
      <img src="./img/logo.png" alt="">
    </div>
    <div class="userForm">
      <van-form @submit="onSubmit">
        <div class="" style="overflow: hidden;width: 100%;position: relative;">
          <van-field
            v-model="username"
            name="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <img src="./img/user.png" class="commonImg" style="" alt="" />
        </div>
        <div class="" style="overflow: hidden;width: 100%;position: relative;">
          <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <img src="./img/password.png" class="commonImg" alt="" />
        </div>
        <div style="margin-top: 16px;">
          <van-button block type="info" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="forgetPass">
          <span>忘记密码?</span>
        </div>
      </van-form>
    </div>
    <div class="wechat" v-show="wechatFlag">
      <van-divider>其他登录方式</van-divider>
      <img src="./img/wechat.png" alt="">
    </div>
  </div>
</template>
<script>
import http from '@/service/interface.js'
export default {
  data () {
    return {
      docmHeight: document.documentElement.clientHeight,
      showHeight: null,
      wechatFlag: true,
      username: '',
      password: '',
      tabSrc: {
        backgroundImage: 'url(' + require('./img/back.png') + ')',
        // backgroundRepeat: 'repeat-x',
        // backgroundSize: 'cover'
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      }
    }
  },
  methods: {
    onSubmit () {
      http.loginByUsername({loginName: this.username, password: this.password}).then(res => {
        http.getUserInfo().then(response => {
          let data = response.data
          let arr = []
          data.authorities.forEach(item => {
            arr.push(item.authority)
          })
          localStorage.setItem('authorities', JSON.stringify(arr))
          // 用户管理权限
          localStorage.setItem('rightFlag', true)
          // localStorage.setItem('userName', JSON.parse(data.principal).userName)
          // localStorage.setItem('userId', JSON.parse(data.principal).userId)
          if (data.periodMsg) {
            this.$notify({
              title: '警告',
              message: data.periodMsg,
              type: 'warning'
            })
          }
          if (data.pwdMsg) {
            this.$notify({
              title: '警告',
              message: data.pwdMsg,
              type: 'warning'
            })
          }
          this.$router.push({
            path: '/search'
          })
        })
      })
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight
      })()
    }
  },
  watch: {
    showHeight () {
      if (this.docmHeight !== this.showHeight) {
        this.wechatFlag = false
      } else {
        this.wechatFlag = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.loginDiv{
  height: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  .userForm{
    width: 75%;
    position: absolute;
    .top(600);
    button{
      width: 100%;
    }
    .van-field{
      .pl(60);
      padding-right: 0;
    }
  }
}
.logo {
  width: 100%;
  text-align: center;
  position: absolute;
  .top(150);
}
.forgetPass{
  width: 100%;
  text-align: right;
  color: #B5BFD4;
  .fs(25);
  .mt(20);
}
.commonImg{
  position: absolute;
  .left(12);
  display: inline-block;
  .top(18);
}
.wechat{
  width: 100%;
  text-align: center;
  position: fixed;
  .bottom(75);
}
</style>
