<template>
  <div></div>
</template>

<script>
  /* eslint-disable */
  import http from '@/service/interface'
  import { mapActions, mapState} from 'vuex'
  import { setToken, getToken, removeToken } from '@/utils/auth'
  //import { configManage } from '@/static/configManage'

  export default {
    name: 'cy-header',
    props: ['activeMenu'],
    data () {
      /*var validateAccount = (rule, value, callback) => {
        console.log(value, 'value')
        var regPass = new RegExp(`${this.getRegularData.REGEX_USERNAME}`)
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (regPass.test(value)) {
            this.usernameRules()
            setTimeout(() => {
              //这里请求接口返回信息res
              console.log(this.resd, 'this.usernameRules()')
              if (this.resd === 'true') {
                callback(new Error('用户名已存在！'))
              } else {
                callback()
              }
            }, 2000);
          } else {
            callback(new Error('字母开头, 只能包含英文字母, 数字, 下划线, 长度最少为5位,不能超过20位'))
          }
        }
      }
      var validateAccountdl = (rule, value, callback) => {
        var regPass = new RegExp(`${this.getRegularData.REGEX_USERNAME}`)
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            callback(new Error('6字母开头,只能包含英文字母,数字,下划线,长度5-20位'))
          }
        }
      }
      var validatePass = (rule, value, callback) => {
        var regPass = new RegExp(`${this.getRegularData.REGEX_PASSWORD}`)
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            // callback(new Error('输入的密码必须包含大写字母、小写字母和数字, 长度最少为6位,不能超过20位'))
            callback(new Error('输入的密码格式不正确！'))
          }
        }
      }
      var validateConfirmPass = (rule, value, callback) => {
        var regPass = new RegExp(`${this.getRegularData.REGEX_PASSWORD}`)
        if (regPass.test(value) === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value != this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            callback(new Error('输入的密码必须包含大写字母、小写字母和数字, 长度最少为6位,不能超过20位'))
          }
        }
      }
      var validateChangeEmail = (rule, value, callback) => {
        var regPass = new RegExp(`${this.getRegularData.REGEX_EMAIL}`)
        if (regPass.test(value) === '') {
          callback(new Error('请输入新邮箱'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱地址'))
          }
        }
      }
      var validateChangePhonemobile= (rule, value, callback) => {
        var regPass = new RegExp(`^1[3|4|5|6|7|8|9]\\d{9}$`)
        if (regPass.test(value) === '') {
          callback(new Error('请输入新手机号'))
        } else {
          if (regPass.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的手机号码'))
          }
        }
      }
      var validateChangeCompany= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('单位名称不能为空！'))
        } else {
          callback()
        }
      }
      var validateChangeName= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('真实姓名不能为空！'))
        } else {
          callback()
        }
      }
      var validateVerifycode= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== this.registerForm.identifyCode) {
          callback(new Error('验证码不正确!'))
        } else {
          callback()
        }
      }*/
      return {
        loadingD: false,
        identifyT: 'identifyT',
        identifyO: 'identifyO',
        optionsDvalue: '',
        optionsD: [
          {
            label: '男',
            value: 1
          },{
            label: '女',
            value: 0
          }
        ],
        openDataUrl: '',
        openDataShow: true,
        listData: window.ggText,
        checkedZ: false,
        indexId: null,
        indexPath: '/' + this.activeMenu,
        circleUrl: require('@/assets/images/search/man0.png'),
        circleUrl2: require('@/assets/images/search/man.png'),
        // elBadgeNum: '10',
        // imgSrc: null,
        registerDialogVisible: false,
        dialogVisibleXY: false,
        isLogin: false,
        userName: '',
        ggShow: window.ggShow,
        userNameShow: '',
        setTimeD: 0,
        timerData: '',
        //styles,
        navData: [],
        navDataShow: [
          {label: '首页', href: '/1', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '数据订购', href: '/search', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户中心', href: '/manage/person/shopCar', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '产品介绍', href: '/3', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户指南', href: '/4', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '联系我们', href: '/5', iconPath1: JSON.stringify(['检索.png', '检索no.png'])}
        ],
        navDataShowOnA: [
          {label: '首页', href: '/1', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '数据订购', href: '/search', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '产品介绍', href: '/3', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户指南', href: '/4', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '联系我们', href: '/5', iconPath1: JSON.stringify(['检索.png', '检索no.png'])}
        ],
        dialogVisible: false,
        ruleForm: {
          account: '',
          pass: '',
          verifycode: '',
          sysName: ''
        },
        registerForm: {
          userId: '',
          name: '',
          uersName: '',
          password: '',
          againPass: '',
          optionsDvalue: '',
          email: '',
          postalAddress: '',
          Fax: '',
          Company: '',
          fixedTelephone: '',
          phoneMobile: '',
          identifyCodes: '1234567890',
          identifyCode: '',
          verifycode:'',
          verifycode1:''
        },
        rulesDL: {
          account: [
           /* { validator: validateAccountdl, trigger: 'blur' },
            { min: 4, message: '长度最少为4位,不能超过19位', trigger: 'blur' }*/
          ],
          pass: [
           /* { validator: validatePass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }*/
          ],
          verifycode: [
            /*{ required: false,validator: validateVerifycode, trigger: 'blur' }*/
          ]
        },
        registerRules: {
          userId: [
            /*{ validator: validateAccount, trigger: 'blur' },
            { min: 4, message: '长度最少为4位,不能超过19位', trigger: 'blur' }*/
          ],
          password: [
           /* { validator: validatePass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }*/
          ],
          againPass: [
           /* { validator: validateConfirmPass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }*/
          ],
          email: [
           /* { validator: validateChangeEmail, trigger: 'blur' }*/
          ],
          phoneMobile: [
           /* { validator: validateChangePhonemobile, trigger: 'blur' }*/
          ],
          Company: [
            /*{ validator: validateChangeCompany, trigger: 'blur' }*/
          ],
          name: [
            /*{ validator: validateChangeName, trigger: 'blur' }*/
          ],
          verifycode: [
            /*{ required: false,validator: validateVerifycode, trigger: 'blur' }*/
          ],
          verifycode1: [
           /* { required: false,validator: validateVerifycode, trigger: 'blur' }*/
          ]
        },
        frequencyTime: null,
        interval: null,
        getRegularData: null,
        arr: [],
        activeName: 'login',
        resd: {}
      }
    },
    computed: {
      menu () {
        return this.navData.filter(each => !each.children)
      },
      submenu () {
        return this.navData.filter(each => each.children)
      },
      /*...mapState('configManage', {
       /!* systemName: function (state) {
          window.document.title = state.systemName
          return state.systemName
        },
        titleImgSrc: function (state) {
          return state.titleImgSrc
        },
        elBadgeNum: function (state) {
          return state.shopCarNum
        }*!/
      }),
      ...mapState('user', {
       /!* nickName: function (state) {
          return state.nickName
        }*!/
      })*/
    },
    methods: {
      initGetUserName () {
        let _this = this
        let param = {
          dzytoken:localStorage.getItem('dzytoken')
        }
        if(_this.isLogin){
          return;
        }

        http.loginByToken(param).then(usr => {
          console.log(usr,"55555555555555555555")
          console.log(usr,"6666666666666666666")
          console.log(this.ruleForm,"7777777777777777777")
          _this.ruleForm.loginName = usr.data.loginName
          _this.ruleForm.password = usr.data.password
          _this.ruleForm.sysName = window.systemName
          console.log(this.ruleForm,"8888888888888888888")
          http.loginByUsernameDZY(_this.ruleForm).then(res => {
            console.log(res.data,"999999999999999999999999")
            setToken(res.data)
            sessionStorage.setItem('token', res.data)
            console.log(localStorage.getItem('dzytoken'),"222333333333333333333333333333")
            http.getUserInfo().then(response => {
              let data = response.data
              _this.arr = []
              data.authorities.forEach(item => {
                _this.arr.push(item.authority)
              })
              localStorage.setItem('authorities', JSON.stringify(_this.arr))
              localStorage.setItem('userName', usr.data.loginName)
              localStorage.setItem('loginName', usr.data.loginName)
              localStorage.setItem('userNameShow', usr.data.name)
              localStorage.setItem('principalUserID', JSON.stringify(data))
              _this.userName = usr.data.loginName
              _this.userNameShow = usr.data.name
              _this.isLogin = true
              _this.arr.forEach(item => {
                _this.hasPerm(item)
              })
              // 用户管理权限
              localStorage.setItem('rightFlag', true)
              localStorage.setItem('userName', JSON.parse(data.principal).userName)
              localStorage.setItem('id', JSON.parse(data.principal).id)
              sessionStorage.setItem('userId', JSON.parse(data.principal).userId)
              localStorage.setItem('userId', JSON.parse(data.principal).userId)
              localStorage.setItem('roleIds', JSON.parse(data.principal).roleIds)
              _this.userName = JSON.parse(data.principal).userName
              _this.isLogin = true
              // puvu
              /*_this.commonPvzh.postDataPVuVcommonMe({
                fUserid: JSON.parse(data.principal).userId,
                fUserdept: this.registerForm.Company,
                fClientip: localStorage.getItem('returnCitySNIp'),
                fBehaviortype: 1,
                fUseragent: localStorage.getItem('userAgent'),
                fDetailurl: window.location.href
              })*/
              // if (data.periodMsg) {
              //   _this.$notify({
              //     title: '警告',
              //     message: data.periodMsg,
              //     type: 'warning'
              //   })
              // }
              // if (data.pwdMsg) {
              //   _this.$notify({
              //     title: '警告',
              //     message: data.pwdMsg,
              //     type: 'warning'
              //   })
              // }
              //_this.getLog()
              _this.dialogVisible = false
              /*if (localStorage.getItem('roleIds').indexOf('管理员') > -1) {*/
                this.$router.push({path: '/search'})
              /*}*/
              // this.commonPvzh.postDataPVuVcommonMe({
              //   fUserid: _this.userNameShow,
              //   fUserdept: '',
              //   fClientip: localStorage.getItem('returnCitySNIp'),
              //   fUseragent: localStorage.getItem('userAgent'),
              //   fDetailurl: window.location.href,
              //   fBehaviortype: 1,
              // })
              // if (data.periodMsg) {
              //   this.$notify({
              //     title: '警告',
              //     message: data.periodMsg,
              //     type: 'warning'
              //   })
              // }
              // if (data.pwdMsg) {
              //   this.$notify({
              //     title: '警告',
              //     message: data.pwdMsg,
              //     type: 'warning'
              //   })
              // }
            })
          })
        })

      },
      /*...mapActions('user',{
        LoginByUsername: 'LoginByUsername',
        GetUserInfo: 'GetUserInfo',
        setToken: 'setToken',
        GetNextMenu: 'GetNextMenu'
      }),
      ...mapActions('configManage',{
        getConfigSation: 'getConfigSation',
        getShopCarNum: 'getShopCarNum'
      }),
      ...mapActions('manage',{
        getRegularRules: 'getRegularRules',
        setMenuData: 'setMenuData',
        handlePerm: 'handlePerm'
      })*/
    },
    created () {
      /* console.log(this.$route.query.token, 'dsfsdfoken')
       console.log(this.$route, 'sdfsdn')
       if (this.$route.query.token) {
         console.log(this.$route.query.token, 'this.$route.query.token')
         setToken(this.$route.query.token)
         this.setToken(this.$route.query.token)
         sessionStorage.setItem('Authorization', this.$route.query.token)
         sessionStorage.setItem('actid', this.$route.query.actid)
         // this.handleRefreshUserInfo()
       }*/
    },
    mounted () {
      this.openDataUrl = window.openDataUrl
      this.openDataShow = window.openDataShow
      //this.getRegularRules()
      //this.refreshCode()
      /*if (!getToken()) {
        this.isLogin = false
        removeToken()
        this.setToken(getToken())
        localStorage.setItem('userName', '')
        localStorage.setItem('authorities', '')
        this.userName = null
        this.userNameShow = null
        this.ruleForm.pass = ''
      } else {
        this.getTokenData()
        this.getLog()
        // this.handleRefreshUserInfo()
        this.getConfigSation()
        this.userRight = localStorage.getItem('userRight')
        this.userName = localStorage.getItem('userName')
        this.userNameShow = localStorage.getItem('userName')
        // this.userNameShow = localStorage.getItem('userNameShow')
        this.isLogin = this.userName ? true : false
        this.indexPath = this.$route.path
        // 验证码初始化
        this.registerForm.identifyCode = ''
        this.makeCode(this.registerForm.identifyCodes, 4)
      }
      setTimeout(() => {
        this.getRegularData = JSON.parse(localStorage.getItem('regularRules'))
      }, 1000)*/
    },
    watch: {
     /* nickName (val) {
        this.userName = val
      },
      userName () {
        this.$emit('handle')
      },
      isLogin (val) {
        this.$emit('getisLogin',val)
      }*/
    }
  }
</script>

<style lang="scss" >
  //@import '@/assets/css/global.scss';
  /* .header{
     !*position: absolute;*!
     !*top: 0px;*!
     !*left: 0px;*!
     !*right: 0px;*!
     !*bottom: auto;*!
     !*height: $headerHeight;
     line-height: $headerHeight;
     box-shadow:0px 8px 11px 0px rgba(72,89,102,0.1);
     background: #3371f8;*!
     !*.title{*!
       !*font-weight: 600;*!
       !*color: #343434;*!
       !*line-height: 57px;*!
       !*font-size: .5rem;*!
       !*width: 320px;*!
       !*display: inline-block;*!
     !*}*!
     !*.loginD{
       cursor: pointer;
       width: 45%;
       text-align: center;
       !*height: 50%;*!
       background: #E7EDFD;
       float: left;
       line-height: 30px;
       margin-top: 8%;
       font-size: 13px;
     }
     .header_top{
       display: inline-block;
       height: 100%;
       width: auto;
       margin-left: 6%;
       img{
         width: 0.9rem;
         padding: 0.2rem;
         padding-left: 0.2rem;
         padding-top: 0.15rem;
       }
     }*!
     !*.loginD_Z{
       cursor: pointer;
       width: 31%;
       text-align: center;
       !* background: #E7EDFD; *!
       float: left;
       line-height: 30px;
       margin-top: 4%;
       font-size: 13px;
     }*!
     .loginD_Z img{
       margin-right: 5px;
       position: relative;
       top: -1px;
     }
     .identifyz{
       display: flex;
       justify-content: space-between;
     }
     .customWidth .loginZ .identifyz .el-input--small{
       float: left !important;
       width: 61% !important;
     }
     .identifyz{
       margin: 0 !important;
     }
     .loginD img{
       margin-right: 10%;
     }
     .login{
       text-align: right;
       font-size: .24rem;
       !*height: 100%;*!
       width: 175px;
       display: inline-block;
       position: absolute;
       top: 0px;
       right: 6%;
       cursor: pointer;
     }
     .loginlast{
       text-align: right;
       font-size: .24rem;
       !*height: 100%;*!
       width: 6rem;
       display: inline-block;
       position: absolute;
       top: 0px;
       right: 3%;
       cursor: pointer;
     }
     .headerText{
       color: red;
       width: 100%;
       text-align: center;
       box-shadow:0px 8px 28px 0px rgba(72,89,102,0.1);
     }
     .identifybox{
       display: flex;
       justify-content: space-between;
       !*margin-top:7px;*!
       width: 41%;
       margin-left: 18px;
       float: left;
       margin-top: 2px;
     }
     .checkDz .el-checkbox__inner{
       width: 12px!important;
       height: 12px!important;
     }
     .checkDz .el-checkbox__label{
       padding-right: 3px!important;
     }
     .el-menu{
       background:#4978F1 !important;
     }
     .el-menu-demo{
       .el-menu-item{
         &:hover{
           background:linear-gradient(360deg,rgba(0,152,249,0.1) 0%,rgba(0,133,217,0) 100%);
           border-bottom-color: #fff !important;
         }
         &{
           background-color: #4978F1 !important;
           font-weight: bold;
           width: 15% !important;
           text-align: center !important;
         }
         &.is-active{
           background:linear-gradient(360deg,rgba(62, 102, 205, 1) 0%,rgba(62, 102, 205,.5) 100%);
           border-bottom-color: #1D42A1 !important;
           font-weight: bold;
         }
         color: #fff !important;
       }
     }
   }*/
</style>
<style lang="scss">
  .headerDiv {
    height: 80px;
  }

  .headerLeft {
    /*width: 444px;*/
    background: #fff;
    padding: 0 0 11px 34px;
    height: 69px;
  }

  .logoImg,
  .lineImg {
    vertical-align: middle;
    margin: 0;
  }

  .headerLeft,
  .headerRight {
    float: left;
  }

  .headerDiv {
    background: #3371f8;
  }

  .headerRight {
    float: right;
    padding-right: 20px;
  }

  .headerRight p {
    font-size: 14px;
  }

  .headerRight a {
    display: inline-block;
    text-align: center;
    margin: 9px 10px 0;
    color: #fff;
  }

  .business,
  .email,.wjdc{
    display: inline-block;
    width: 33px;
    height: 33px;
  }

  .business {
    background-position: -1203px -105px;
    background-image: url('icon.png');
  }

  .wjdc {
    background-position: -1203px -105px;
    background-image: url('icon.png');
  }

  .email {
    background-position: -1129px -104px;
    background-image: url('icon.png');
  }

  .login {
    float: right;
    height: 100%;
    line-height: 100%;
    margin-right: 50px;
    cursor: pointer;
  }

  .login {
    span,img {
      display: block;
      line-height: 80px;
      color: #fff;
      float: left;
      margin-right: 10px;
      /*cursor: pointer;*/
    }
  }

  .login {
    img {
      margin: 20px 30px 0 0;
    }
  }
  .el-menu.el-menu--horizontal {
    border: solid 0px #e6e6e600;
    /*padding-left: 10%;*/
  }
  .el-input__inner:hover {
    border-color: blue !important;
  }
  .el-menu--horizontal{
    .el-submenu__title{
      &:hover{
        background:linear-gradient(360deg,rgba(0,152,249,0.1) 0%,rgba(0,133,217,0) 100%);
        border-bottom-color: #F7B422 !important;
      }
      &{
        /*background-color: #fff !important;*/
        font-weight: bold;
      }
    }
    .el-menu{
      .el-menu-item{
        &:hover{
          background-color: #fff !important;
        }
        &{
          background-color: #fff !important;
          font-weight: bold;
        }
      }
    }
    .el-menu-item{
      &:hover{
        background:linear-gradient(360deg,rgba(0,152,249,0.1) 0%,rgba(0,152,249,0.1) 100%);
        color:rgba(0,153,250,1)!important;
        border-bottom-color: #F7B422 !important;
      }
      &{
        background-color: #fff !important;
        font-weight: bold;
      }
    }
  }
  .mydorp{
    opacity: 0.9;
    /*top:1.4rem!important;*/
  }
  .customWidthXY {
    margin-top: 1vh !important;
    line-height: 32px !important;
    .el-dialog__header{
      display: none;
    }
  }
  .customWidth {
    width: 340px!important;
    background:#fff !important;
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.5)!important;
    border-radius:4px!important;
    font-weight: bold!important;
    .el-dialog__header{
      background:#fff!important;
      /*display: none;*/
      padding: 0 !important;
      border-radius: 4px !important;
    }
    .el-dialog__title {
      line-height: 24px;
      font-size: 16px;
      color: #555656;
      font-weight: bold;
      padding-left: 10px;
      border-left: 4px solid #f7b42200;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #666666;
    }
    .el-dialog__body {
      padding: 0 20px 5px 20px !important;
    }
    .el-tabs__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: #FFC107;
      z-index: 1;
      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      list-style: none;
    }
  }
  .customWidthZ{
    margin-top: 1vh !important;
    .el-dialog__header{
      padding: 0 !important;
      border-radius: 4px !important;
      /*display: none;*/
    }
    .el-dialog__body {
      /*padding: 0 20px 5px 20px !important;*/
    }
    .el-dialog__headerbtn {
      top: 13px !important;
      font-size: 18px !important;
      z-index: 99;
    }
  }
  .dialog_log{
    text-align: center;
    position: absolute;
    top: -32px;
    width: 68px;
    background: #fff;
    border-radius: 50%;
    height: 65px;
    left: 41%;
  }
  .dialog_log_title{
    width: 96%;
    padding: 2%;
    font-weight:bold;
    color:rgba(55,61,65,1);
    line-height:30px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 14px;
  }
  .identifyz{
    display: flex;
    justify-content: space-between;
  }
  .customWidth .loginZ .identifyz .el-input--small{
    float: left !important;
    width: 61% !important;
  }
  .identifyz{
    margin: 0 !important;
  }
  .customWidthZ img{
    margin-right: 5px;
    position: relative;
    float: none;
    vertical-align: middle;
    display: inline;
    top: -1px;
  }
  .identifybox{
    display: flex;
    justify-content: space-between;
    width: 41%;
    margin-left: 18px;
    float: left;
    margin-top: 2px;
  }
</style>
