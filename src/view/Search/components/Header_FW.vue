<template>
  <div class="header">
    <div class="header_top">
      <!--<img src='@/assets/images/headerImg/log.png'>-->
      <img src='@/assets/img/log_new.png'>
      <div class="title">信息共享与服务网</div>
      <!--<div class="title">{{this.systemName}}</div>-->
    </div>
    <!--导航-->
    <div style="width: auto;">
      <div class="login"  v-if="!isLogin" style="width: 200px;">
        <div class="loginD" style="margin-right: 10%; width: 36%;" @click="register">
          <img src="@/assets/images/headerImg/zcimg.png" height="13" width="12"/><span>注册</span>
        </div>
        <div class="loginD" @click="login" style="width: 36%;">
          <img src="@/assets/images/headerImg/login.png" height="13" width="12"/><span>登录</span>
        </div>
      </div>
      <div class="loginlast"  v-show="isLogin">
        <div class="loginD_Z" style="margin-right: 4%;" @click="gotoPerson">
          <img src="@/assets/img/shopCat.png" height="13" width="12"/><span>购物车 <span style="color: blue;">({{this.elBadgeNum}})</span> </span>
        </div>
        <div class="loginD_Z">
          <img src="@/assets/img/log_sucess.png" height="13" width="12"/><span>{{this.userName}}</span>
        </div>
        <div style="width: 23%;" class="loginD_Z"  @click="logout">
          <img src="@/assets/img/exit_a.png" height="13" width="12"/><span>退出</span>
        </div>
        <!--<span v-if="hasPerm('/manage/person/shopCar') && isLogin" title="购物车"  style="padding-right: 20px;display: inline-block;">-->
          <!--<el-badge :value="elBadgeNum" class="item" style="margin-top: 0.2rem;">-->
           <!--<div class="block"><el-avatar :size="25" :src="circleUrl"></el-avatar></div>-->
          <!--</el-badge>-->
        <!--</span>-->
        <span style="padding-right: 20px; display: none">
        <el-dropdown trigger="click" style="padding: 0px;">
          <span v-show="isLogin" class="el-dropdown-link">
            {{this.userName}}<i class="el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"  class="mydorp" >
            <el-dropdown-item  @click.native="handleUserName" class="clearfix" style="padding: 1px 21px;" >
              <i class="el-icon-user"></i>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleShopCar" class="clearfix" style="padding: 1px 21px;" >
              <i class="el-icon-shopping-cart-full"></i>
              购 物 车
            </el-dropdown-item>
             <el-dropdown-item @click.native="logout" class="clearfix" style="padding: 1px 21px;" >
              <i class="el-icon-switch-button"></i>
             退出账号
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       </span>
      </div>
      <div v-if="ggShow" class="loginD_Z" style="margin-top: 15px; width: 20vw; position: absolute; right: 25%;
    top: 0;"  >
        <img @click="open()" style="float:left;" src="@/assets/images/headerImg/tz.gif"/>
        <nationNew :lists="listData"></nationNew>
      </div>
    </div>
    <!--登录-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      modal
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="handleClose"
      customClass="customWidth"
      style="line-height: 1;" >
      <div >
        <!--<div class="" style="padding: 30px 23px;    margin-top: 40px;-->
        <!--background: rgba(255,255,255,1);-->
        <!--border-radius: 8px;-->
        <!--&lt;!&ndash;border: 1px solid rgba(232,236,251,1);">-->
        <div class="dialog_log">
          <!--<img src="@/assets/images/headerImg/log.png" style="margin-top: 7px" height="55" width="55"/>-->
          <img src="@/assets/img/log_new.png" style="margin-top: 7px" height="55" width="55"/>
        </div>
        <div class="dialog_log_title" style="">
          <span>信息共享与服务网登录</span>
        </div>
        <div class="loginZ" style="width: 96%; padding: 2%">
          <el-form :model="ruleForm" status-icon :rules="rulesDL" ref="ruleFormLogin" class="demo-ruleForm">
            <el-form-item prop="account">
              <el-input @focus="focusChange" placeholder="请输入用户名" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input @focus="focusChange" placeholder="请输入登录密码" @keyup.enter.native="submitForm('ruleFormLogin')" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: .2rem;" label="" prop="verifycode">
              <div class="identifyD">
                <div style="width: 61%;">
                  <el-input @keyup.enter.native="submitForm('ruleFormLogin')" style="float:left;" placeholder="请输入验证码" v-model="ruleForm.verifycode" autocomplete="off">
                    <i slot="suffix">
                      <div @click="refreshCode" style="padding: 2px"></div>
                    </i>
                  </el-input>
                </div>
                <div style="height: 32px; float:left; margin-left: 10px; margin-top: 2px;" @click="refreshCode">
                  <s-identify :poseId = 'identifyO' :identifyCode="registerForm.identifyCode"></s-identify>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <!--<div class="checkDz" style="width: 96%; padding: 2%; font-size: 12px  ">-->
            <!--<el-checkbox style="float:left;" size="mini" v-model="checkedZ">记住密码</el-checkbox>-->
            <!--&lt;!&ndash;<span style="display: inline-block; float:right; font-weight: 100">忘记密码？</span>&ndash;&gt;-->
          <!--</div>-->
        </div>
        <div slot="footer" class="dialog-footer" style="padding-top: 20px; text-align: center;">
          <el-button :loading="loadingD " type="primary" @click="submitForm('ruleFormLogin')" style="width: 99%; font-weight: bold; font-size: 16px;">登 录</el-button>
        </div>
        <div>
          <el-divider content-position="center"><span style="cursor: pointer; color:#486DE7;font-size: 13px;" @click="registerSpan" >马上注册</span></el-divider>
        </div>
      </div>
    </el-dialog>
    <!--注册-->
    <el-dialog
      title=""
      :visible.sync="registerDialogVisible"
      modal
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      customClass="customWidthZ"
      :before-close="handleRegisterClose"
      width="37%"
      style="line-height: 1" >
      <div >
        <div style="margin-left: 3%; background: rgba(255,255,255,1);">
          <el-form :model="registerForm" status-icon :rules="registerRules" ref="ruleRegisterForm"  class="demo-ruleForm">
            <el-form-item style="margin-bottom: .4rem;" label="" prop="userId">
              <div style="margin-left: 42%; font-weight: 100;font-size: 12px"><span>已有账号？</span><span style="color:#7297F4; cursor: pointer" @click="showLogD">立即登录</span></div>
              <el-input style="width: 55%;" placeholder="账号" v-model="registerForm.userId" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt=""><span style="color: #ED60A1;font-size: .24rem; margin-left: 12px;">(字母，数字或下划线长度5--20字符)</span>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="name">
              <el-input  style="width: 55%;" placeholder="真实姓名" type="name" v-model="registerForm.name" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt="">
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="password">
              <el-input  style="width: 55%;" placeholder="账号密码" type="password" v-model="registerForm.password" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt=""><span style="color: #ED60A1;font-size: .24rem; margin-left: 12px;">(字母，数字或下划线长度6--20字符)</span>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="againPass">
              <el-input  style="width: 55%;" placeholder="确认密码" type="password" v-model="registerForm.againPass" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt="">
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="">
              <el-select style="width: 55%;" v-model="registerForm.optionsDvalue" placeholder="性别">
                <el-option
                  v-for="item in optionsD"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="postalAddress">
              <el-input  style="width: 55%;" placeholder="通讯地址" v-model="registerForm.postalAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="email">
              <el-input  style="width: 55%;" placeholder="电子邮箱" v-model="registerForm.email" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt="">
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="phoneMobile">
              <el-input  style="width: 55%;" placeholder="手机号码" v-model="registerForm.phoneMobile" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt="">
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="fixedTelephone">
              <el-input  style="width: 55%;" placeholder="固定电话" v-model="registerForm.fixedTelephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="Fax">
              <el-input  style="width: 55%;" placeholder="传真" v-model="registerForm.Fax" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: .4rem;" label="" prop="Company">
              <el-input  style="width: 55%;" placeholder="单位" v-model="registerForm.Company" autocomplete="off"></el-input><img src="@/assets/img/noetmp.png" alt=""><span style="color: #ED60A1;font-size: .24rem; margin-left: 12px;">(请填写单位全称，单位不能为空)</span>
            </el-form-item>
            <el-form-item style="margin-bottom: .2rem;" label="" prop="verifycode1">
              <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
              <el-input  style="width: 20%; float:left;" placeholder="验 证 码" v-model="registerForm.verifycode1"  >
                <i slot="suffix"  >
                  <div @click="refreshCode" style="padding: 2px"></div>
                </i>
              </el-input>
              <div  @click="refreshCode" class="identifybox" style="width: 41%; height: 33px;">
                <s-identify :poseId = 'identifyT' :identifyCode="registerForm.identifyCode"></s-identify>
                <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="margin-top: 20px;margin-left: 3%;width: 55%; font-size: 13px">
          <el-checkbox style="float:left;" size="mini" v-model="checkedZ"></el-checkbox>
          <span style="display: inline-block;margin-left: 10px; font-weight: 100">我愿意接受服务条款</span><span style="color: #527FEA; cursor: pointer; " @click="clickShowXY">《点击查看》</span>
        </div>
        <div slot="footer" class="dialog-footer" style="margin-left: 3%;width: 55%; padding-top: 15px; text-align: center; padding-bottom: 10px;">
          <!--<el-button @click="resetForm('ruleRegisterForm')" style="width: 45%;">重 置</el-button>-->
          <el-button type="primary" @click="submitRegisterForm('ruleRegisterForm')" style="width: 99%;font-weight: bold;
    font-size: 16px;">注 册</el-button>
        </div>
      </div>
    </el-dialog>
    <!--协议-->
    <el-dialog
      title=""
      :visible.sync="dialogVisibleXY"
      width="50%"
      customClass="customWidthXY"
      :before-close="handleClose">
      <div style="text-align: center;">
        <span style="display: block; font-size: 16px; font-weight: bold">自然资源航空物探遥感中心卫星遥感数据提供使用管理暂行办法</span>
        <span>请仔细阅读本协议</span>
      </div>
      <div style="font-weight: 100 !important;">
        第一条  为了规范自然资源航空物探遥感中心卫星遥感数据的提供、使用的管理，促进自然资源航空物探遥感中心卫星遥感数据的有效利用，根据《中华人民共和国国土资源法》、《中华人民共和国测绘成果管理条例》等法律法规，制定本办法。<br>
        第二条  本办法中，自然资源航空物探遥感中心卫星遥感数据（以下简称“卫星遥感数据”）是指自然资源航空物探遥感中心卫星对地观测所获取的及加工处理形成的各类测绘遥感数据。<br>
        第三条  提供、使用卫星遥感数据，应当遵守本办法。<br>
        第四条  中国自然资源航空物探遥感中心负责卫星遥感数据提供与使用的管理工作。中国自然资源航空物探遥感中心具体负责卫星遥感数据的保管、维护、提供和社会化服务等工作。<br>
        第五条  使用卫星遥感数据的部门、单位和个人（以下简称“用户”），应当签订卫星遥感数据的使用许可协议。<br>
        第六条  用户拥有使用许可协议规定范围内的卫星遥感数据的使用权。<br>
        第七条  用户申请使用属于国家秘密的卫星遥感数据，应当按照国家涉密测绘成果提供使用相关管理规定执行。<br>
        第八条  用户应当按照涉密卫星遥感数据的密级，依照国家规定进行管理并采取相应的保密措施。<br>
        第九条  对外提供属于国家秘密的卫星遥感数据的，应当按照国务院和中央军事委员会规定的审批程序执行。<br>
        第十条  卫星遥感数据用于国家机关决策和社会公益性事业的，应当无偿提供。    除前款规定外，卫星遥感数据依法实行有偿使用制度。但是，各级人民政府及其有关部门和军队因防灾、减灾、国防建设等公共利益的需要，可以无偿使用卫星遥感数据。<br>
        第十一条  用户在使用卫星遥感数据时，应当明显标示数据的版权所有者。
        卫星遥感数据的版权归属不因数据部分修改或者格式改变而改变，使用格式改变的卫星遥感数据或者使用基于卫星遥感数据形成的衍生品时，应当明显标示原数据的版权所有者。<br>
        第十二条  中国自然资源航空物探遥感中心应当及时编制卫星遥感数据目录，向社会公布。<br>
        第十三条  中国自然资源航空物探遥感中心应当建立卫星遥感数据提供登记管理制度，包括用户信息、使用卫星遥感数据的内容、数量、用途和使用方式等，并向中国自然资源航空物探遥感中心报告。<br>
        第十四条  本办法由中国自然资源航空物探遥感中心负责解释。<br>
        第十五条  本办法自公布之日起施行。
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: center;display: block">
      <el-button type="primary" @click="dialogVisibleXY = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
  import http from '@comm/service/interface.js'
  import styles from '@/assets/css/global.scss'
  import { mapActions, mapState} from 'vuex'
  import { setToken, getToken, removeToken } from '@comm/utils/auth'
  import { configManage } from '@comm/static/configManage.js'
  import SIdentify from '@comm/components/identify.vue'
  import nationNew from '@comm/components/nationNew.vue'

  export default {
    name: 'cy-header',
    props: ['activeMenu'],
    components:{SIdentify, nationNew},
    data () {
      var validateAccount = (rule, value, callback) => {
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
            callback(new Error('3字母开头, 只能包含英文字母, 数字, 下划线, 长度最少为5位,不能超过20位'))
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
            callback(new Error('4字母开头,只能包含英文字母,数字,下划线,长度5-20位'))
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
      }
      return {
        ggShow: window.ggShow,
        listData: window.ggText,
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
        checkedZ: false,
        indexId: null,
        indexPath: '/' + this.activeMenu,
        circleUrl: require('@/assets/images/search/man0.png'),
        circleUrl2: require('@/assets/images/search/man.png'),
        registerDialogVisible: false,
        dialogVisibleXY: false,
        isLogin: false,
        userName: '',
        setTimeD: 0,
        timerData: '',
        styles,
        dialogVisible: false,
        ruleForm: {
          account: '',
          pass: '',
          verifycode: ''
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
            { validator: validateAccountdl, trigger: 'blur' },
            { min: 4, message: '长度最少为4位,不能超过19位', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }
          ],
          verifycode: [
            { required: false,validator: validateVerifycode, trigger: 'blur' }
          ]
        },
        registerRules: {
          userId: [
            { validator: validateAccount, trigger: 'blur' },
            { min: 4, message: '长度最少为4位,不能超过19位', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }
          ],
          againPass: [
            { validator: validateConfirmPass, trigger: 'blur' },
            { min: 6, message: '长度最少为6位,不能超过20位', trigger: 'blur' }
          ],
          email: [
            { validator: validateChangeEmail, trigger: 'blur' }
          ],
          phoneMobile: [
            { validator: validateChangePhonemobile, trigger: 'blur' }
          ],
          Company: [
            { validator: validateChangeCompany, trigger: 'blur' }
          ],
          name: [
            { validator: validateChangeName, trigger: 'blur' }
          ],
          verifycode: [
            { required: false,validator: validateVerifycode, trigger: 'blur' }
          ],
          verifycode1: [
            { required: false,validator: validateVerifycode, trigger: 'blur' }
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
      ...mapState('configManage', {
        systemName: function (state) {
          window.document.title = state.systemName
          return state.systemName
        },
        titleImgSrc: function (state) {
          return state.titleImgSrc
        },
        elBadgeNum: function (state) {
          return state.shopCarNum
        }
      }),
      ...mapState('user', {
        nickName: function (state) {
          return state.nickName
        }
      })
    },
    methods: {
      initNameTable () {
        http.userTable().then(res => {
          console.log(res, 'initNameTable')
        })
      },
      // 判断用户是否存在
      async usernameRules(){
          this.resd = await http.checkUserIsIn({
            userName: this.registerForm.userId
          }).then(res => res.data);//访问后台
      },
      getcheckUserIsIn (val) {
        http.checkUserIsIn({
          userName: val
        }).then(res => {
            return res.data
        })
      },
      // 查看协议
      clickShowXY () {
        this.dialogVisibleXY = true
      },
      // 跳转注册
      registerSpan () {
        this.dialogVisible = false
        this.registerDialogVisible = true
      },
      // 跳转登录
      showLogD () {
        this.dialogVisible = true
        this.registerDialogVisible = false
      },
      handleUserName () {
        if (this.$route.path.indexOf('/manage/person/personDetail') > -1) {
          return
        }
        sessionStorage.setItem('headerShop', JSON.stringify('/manage/person/personDetail'))
        this.handleSelect('/manage/person')
        this.$router.push({path: '/manage/person/personDetail'})
        this.indexPath = '/manage/person/personDetail'
      },
      // 登录显示页面变化
      getLog () {
        if (getToken()) {
          this.getShopCarNum()
          http.getMenu({parentId: '1085417713933684699', subSysId: '1085417713933684711'}).then(res => {
          // http.getMenu().then(res => {
            if (res.data && res.data.length > 0) {
              this.setMenuData(res.data)
            } else {
              this.setMenuData([])
            }
          })
        } else {
          this.isLogin = false
          removeToken()
          this.setToken(getToken())
          localStorage.setItem('userName', '')
          sessionStorage.setItem('token', '')
          localStorage.setItem('authorities', '')
          this.userName = null
          this.ruleForm.pass = ''
        }
      },
      tokenLoad() {
          http.getCheckUserOnLine().then(res => {
            console.log(res, 'getCheckUserOnLine')
            if (res.data !== 'true'){
              removeToken()
              this.isLogin = false
              localStorage.setItem('token', '')
              sessionStorage.setItem('token', '')
              setToken('')
              this.setToken(getToken())
              this.setTimeD = 1
              this.getTokenData()
              this.$message({
                type: 'warning',
                message: '登录过期，请重新登录!'
              })
              localStorage.setItem('userName', '')
              localStorage.setItem('authorities', '')
              this.$router.push({path: '/search'})
              this.userName = null
            }
          })
      },
      getTokenData() {
        if (this.setTimeD === 1) {
          // clearInterval(this.timerData)
        } else {
          // this.timerData = setInterval(this.tokenLoad, 10000)
        }
      },
      handleSelect (path) {
        this.GetNextMenu(id)
        this.indexId = id
      },
      handleShopCar () {
        if (this.$route.path.indexOf('/manage/person/shopCar') > -1) {
          return
        }
        sessionStorage.setItem('headerShop', JSON.stringify('/manage/person/shopCar'))
        this.handleSelect('/manage/person')
        this.$nextTick(() => {
          this.$router.push({path: '/manage/person/shopCar'})
        })
        this.indexPath = '/manage/person/shopCar'
      },
      login () {
        this.refreshCode()
        this.ruleForm.verifycode= ''
        this.dialogVisible = true
      },
      register () {
        this.registerDialogVisible = true
      },
      open() {
        this.$alert(window.ggText, '公告', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      },
      gotoPerson () {
        this.$router.push({path: '/manage/person/shopCar'})
      },
      submitRegisterForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.registerForm.verifycode1 === this.registerForm.identifyCode) {
            let period = new Date(this.formatTime('9999-12-31T00:00:00.000', 'Y-M-D h:m:s'))
            if (this.checkedZ) {
              http.registerUser({
                nickName: this.registerForm.userId,
                loginName: this.registerForm.userId,
                password: this.registerForm.password,
                email: this.registerForm.email,
                phoneMobile: this.registerForm.phoneMobile,
                // 补充参数
                fax: this.registerForm.Fax, // 传真
                unit: this.registerForm.Company, // 单位
                name: this.registerForm.name, // 真实姓名
                sex: this.registerForm.optionsDvalue, // 性别
                address: this.registerForm.postalAddress, // 通讯地址
                phoneWork: this.registerForm.fixedTelephone, // 国定电话
                // 设置成永久用户
                // period,
                type: '正式用户'
              }).then(res => {
                if (res.data === 'true') {
                  this.$message({
                    type: 'success',
                    message: '注册成功!'
                  })
                  // puvu
                  this.commonPvzh.postDataPVuVcommonMe({
                    fUserid: this.registerForm.userId,
                    fUserdept: this.registerForm.Company,
                    fClientip: localStorage.getItem('returnCitySNIp'),
                    fBehaviortype: 0,
                    fUseragent: localStorage.getItem('userAgent'),
                    fDetailurl: window.location.href
                  })
                  this.registerDialogVisible = false
                  this.activeName = 'login'
                }
              })
            } else {
              this.$message.warning('请勾选服务条款!')
            }
          } else {
            this.$message.error('必填项错误, 请重新填写!')
            return false
          }
        })
      },
      // 生成随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 切换验证码
      refreshCode() {
        this.registerForm.identifyCode = ''
        // this.registerForm.identifyCode1 = ''
        this.makeCode(this.registerForm.identifyCodes, 4)
      },
      // 生成四位随机验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.registerForm.identifyCode += this.registerForm.identifyCodes[
            this.randomNum(0, this.registerForm.identifyCodes.length)
            ]
        }
      } ,
      logout () {
        let logName = localStorage.getItem('userName')
        console.log(logName, 'logName')
        http.logoutNew({loginName: logName}).then(res => {
          http.deleteTokenByUserName({loginName: logName}).then(res => {
            console.log(res, '09090900909')
          })
          this.isLogin = false
          localStorage.setItem('token', '')
          sessionStorage.setItem('token', '')
          setToken('')
          this.setToken(getToken())
          this.setTimeD = 1
          this.getTokenData()
          // this.resetForm('ruleForm')
          localStorage.setItem('userName', '')
          localStorage.setItem('authorities', '')
          this.$router.push({path: '/search'})
          this.userName = null
          this.setMenuData([])
        },(resp) => {
          console.log(resp, '0000000')
        })
      },
      focusChange () {
        this.loadingD = false
      },
      submitForm (formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.loadingD = true
            setTimeout(() => {
              _this.loadingD = false
            }, 5000)
            _this.LoginByUsername(_this.ruleForm).then(res => {
              _this.GetUserInfo().then(response => {
                console.log(response, 'response')
                _this.loadingD = false
                // 置空登录框
                this.refreshCode()
                this.setTimeD = 0
                this.getTokenData()
                this.ruleForm.account = ''
                this.ruleForm.pass = ''
                this.ruleForm.verifycode = ''
                let data = response.data
                _this.arr = []
                data.authorities.forEach(item => {
                  _this.arr.push(item.authority)
                })
                // _this.handlePerm(_this.arr)
                console.log(response, 'this.arr')
                localStorage.setItem('authorities', JSON.stringify(this.arr))
                localStorage.setItem('principalUserID', JSON.stringify(data))
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
                this.commonPvzh.postDataPVuVcommonMe({
                  fUserid: JSON.parse(data.principal).userId,
                  fUserdept: this.registerForm.Company,
                  fClientip: localStorage.getItem('returnCitySNIp'),
                  fBehaviortype: 1,
                  fUseragent: localStorage.getItem('userAgent'),
                  fDetailurl: window.location.href
                })
                if (data.periodMsg) {
                  _this.$notify({
                    title: '警告',
                    message: data.periodMsg,
                    type: 'warning'
                  })
                }
                if (data.pwdMsg) {
                  _this.$notify({
                    title: '警告',
                    message: data.pwdMsg,
                    type: 'warning'
                  })
                }
                _this.getLog()
                _this.dialogVisible = false
                if (localStorage.getItem('roleIds').indexOf('管理员') > -1) {
                  this.$router.push({path: '/search'})
                }
              })
            })
          } else {
            return false
          }
        })
      },
      getUserIdByLoginNameD(val) {
        http.getUserIdByLoginName({data: {loginName: val}}).then(res => {
          localStorage.setItem('userId', res.data.records[0].F_ID)
        })
      },
      handleClose (done) {
        this.refreshCode()
        this.resetForm2('ruleFormLogin')
        done()
      },
      handleRegisterClose (done) {
        this.refreshCode()
        this.resetForm('ruleRegisterForm')
        done()
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      resetForm2 (formName) {
        this.ruleForm.account = ''
        this.ruleForm.pass = ''
      },
      handleRefreshUserInfo () {
        let _this = this
        if (getToken()) {
          _this.GetUserInfo().then(response => {
            let data = response.data
            let arr = []
            data.authorities.forEach(item => {
              arr.push(item.authority)
            })
            _this.userName = JSON.parse(data.principal).userName
            _this.isLogin = true
            _this.getLog()
            _this.dialogVisible = false
          })
        }
      },
      ...mapActions('user',{
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
      })
    },
    mounted () {
      this.getRegularRules()
      this.refreshCode()
      console.log(getToken(), 'getToken')
      if (!getToken()) {
        this.isLogin = false
        removeToken()
        this.setToken(getToken())
        localStorage.setItem('userName', '')
        localStorage.setItem('authorities', '')
        this.userName = null
        this.ruleForm.pass = ''
      } else {
        this.getTokenData()
        this.getLog()
        this.handleRefreshUserInfo()
        this.getConfigSation()
        this.userRight = localStorage.getItem('userRight')
        this.userName = localStorage.getItem('userName')
        this.isLogin = this.userName ? true : false
        this.indexPath = this.$route.path
        // 验证码初始化
        this.registerForm.identifyCode = ''
        this.makeCode(this.registerForm.identifyCodes, 4)
      }
      setTimeout(() => {
          this.getRegularData = JSON.parse(localStorage.getItem('regularRules'))
      }, 1000)
    },
    watch: {
      nickName (val) {
        this.userName = val
      },
      userName () {
        this.$emit('handle')
      },
      dialogFlag (val) {
        // this.dialogVisible = val
        // if (this.dialogVisible === true) {
        //   this.logout()
        // }
      }
    }
  }
</script>

<style lang="scss" >
  @import '@/assets/css/global.scss';
  .header{
    height: $headerHeight;
    line-height: $headerHeight;
    box-shadow:0 8px 11px 0 rgba(72,89,102,0.1);
    .title{
      font-weight: 600;
      color: #343434;
      line-height: 57px;
      font-size: .5rem;
      width: 320px;
      display: inline-block;
    }
    .loginD{
      cursor: pointer;
      width: 45%;
      text-align: center;
      /*height: 50%;*/
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
    }
    .loginD_Z{
      cursor: pointer;
      /*width: 31%;*/
      text-align: center;
      /* background: #E7EDFD; */
      float: left;
      line-height: 30px;
      margin-top: 4%;
      font-size: 13px;
    }
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
      /*height: 100%;*/
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
      /*height: 100%;*/
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
      /*margin-top:7px;*/
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
  }
</style>
<style lang="scss">
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
</style>
