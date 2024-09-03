<template>
  <div style="height: 40px; width: 100%;">
    <el-menu class="el-menu-demo" :default-active="activeMenu" mode="horizontal" @select="handleSelect" router text-color="black">
      <el-menu-item :index="item.href" v-for="item in navData" :key="item.href">{{item.label}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  // import http from '@comm/service/interface.js'
  // import { getToken, removeToken } from '@/utils/auth'
  import {
    mapState, mapActions
  } from 'vuex'
  export default {
    data () {
      return {
        navData: [],
        activeMenu: '/search',
        navDataShowOnA: [
          // {label: '首页', href: '/home', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '数据订购', href: '/search', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          // {label: '用户中心', href: '/manage/person/shopCar', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          // {label: '产品介绍', href: '/productIntro', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户指南', href: '/userGuide', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '联系我们', href: '/contactUs', iconPath1: JSON.stringify(['检索.png', '检索no.png'])}
        ],
        navDataShow: [
          // {label: '首页', href: '/home', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '数据订购', href: '/search', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户中心', href: '/manage/person/shopCar', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          // {label: '产品介绍', href: '/productIntro', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '用户指南', href: '/userGuide', iconPath1: JSON.stringify(['检索.png', '检索no.png'])},
          {label: '联系我们', href: '/contactUs', iconPath1: JSON.stringify(['检索.png', '检索no.png'])}
        ]
      }
    },
    props: ['isLoginD'],
    methods: {
      handleSelect (path) {
        this.$router.push(path)
        this.activeMenu = path
      },
      getNav (val) {
        if (val) {
          this.navData = this.navDataShow
        } else {
          this.navData = this.navDataShowOnA
        }
      },
      ...mapActions('searchStore', {
        setSpanLabel: 'setSpanLabel'
      })
    },
    computed: {
      ...mapState('searchStore', {
        showPXFlag (state) {
          return state.showPXFlag
        }
      }),
      ...mapState('user', {
        token: (state) => {
          return state.token
        }
      }),
      ...mapState('manage', {
        menuData: (state) => {
          return state.menuData
        }
      })
    },
    mounted () {
      if (this.$route.path.indexOf('/manage/person') > -1) {
        this.activeMenu = '/manage/person/shopCar'
      } else {
        this.navDataShow.forEach(item => {
          if (item.href === this.$route.path) {
            this.activeMenu = item.href
          }
        })
      }
    },
    watch: {
      $route (to, from) {
        if (to.fullPath.indexOf('/manage/person') > -1) {
          this.activeMenu = '/manage/person/shopCar'
        } else {
          this.activeMenu = to.fullPath
        }
      },
      token (val) {
        if (!val) {
          this.navData = this.navDataShowOnA
        }
      },
      isLoginD (val) {
        this.getNav(val)
      },
      menuData: {
        handler (newVal, oldVal) {
          if (newVal.length > 0) {
            this.navData = newVal[0].children
          } else {
            this.navData = this.navDataShowOnA
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .el-menu--horizontal>.el-menu-item {
    height: 40px;
    line-height: 40px;
    margin-left: 5%;
    text-align: center;
    font-size: 18px;
  }

  ul {
    padding-left: 1%;
    width: 99%;
    box-shadow: 0 5px 4px -1px #ccc;
  }

  .is-active {
    color: #2e6dfc !important;
  }
</style>
