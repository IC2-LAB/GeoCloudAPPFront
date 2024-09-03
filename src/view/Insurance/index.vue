<!--
<template>
  <div class="insurance">
    <van-nav-bar title="保险列表" @click-left="onClickLeft" left-arrow :border="borderFlag">
      <template #right>
        <img src="./img/new.png" @click="handleNewClick" alt="">
      </template>
    </van-nav-bar>
    <div class="insuranceBg" :style="insuranceBg"></div>
    <div class="insuranceTab">
      <van-row class="rowClassTab">
        <van-col span="6" class="insuranceCol" v-for="item in dataList" :key="item.name" @click="handleClick(item)">
          <span :class="{firstSpan: true, active: item.name === flag}">
            <img :src="item.imgUrl" alt="" v-if="item.imgUrl !== ''">
            <span>{{item.name}}</span>
          </span>
        </van-col>
      </van-row>
    </div>
    <div class="insuranceTable" v-for="(item, index) in dataTableList" :key="index">
      <div class="panelHeader">
        <van-panel>
          <header class="panelHeaderHeight">
            <img :src="item.status === '已完成' ? require('./img/success.png') : require('./img/error.png')" alt="">
            <span>{{item.name}}(总保费:{{item.number}}元)</span>
            <span style="float: right;" v-if="item.status === '已完成'"><van-tag round plain type="success">{{item.status}}</van-tag></span>
            <span style="float: right;" v-if="item.status === '未处理'"><van-tag round plain type="warning">{{item.status}}</van-tag></span>
          </header>
        </van-panel>
      </div>
      <el-table
        :data="item.tableData"
        style="width: 100%;">
        <el-table-column
          prop="tbzw"
          width="45"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="tbmj"
          width="50"
          label="面积(亩)">
        </el-table-column>
        <el-table-column
          prop="zwbf"
          width="50"
          label="保费(元)">
        </el-table-column>
        <el-table-column
          prop="zwbe"
          width="50"
          label="保额(元)">
        </el-table-column>
        <el-table-column
          prop="time"
          width="50"
          label="时间">
        </el-table-column>
        <el-table-column
          width="50"
          v-if="item.status !== '已完成'"
          label="操作">
          <template slot-scope="scope">
            <van-button v-if="item.status !== '未下发'" plain type="info" size="mini" @click="handleAudit(item)">审核</van-button>
            <van-button v-if="item.status !== '未处理'" plain type="info" size="mini" @click="handleEdit(item)">编辑</van-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from '@/service/interface.js'
export default {
  data () {
    return {
      taskstart: '',
      borderFlag: false,
      flag: '全部任务',
      dataList: [
        {imgUrl: '', name: '全部任务'},
        {imgUrl: require('./img/success.png'), name: '已完成'},
        {imgUrl: require('./img/error.png'), name: '未完成'},
        {imgUrl: require('./img/error.png'), name: '未下发'}
      ],
      insuranceBg: {
        backgroundImage: 'url(' + require('./img/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      },
      dataTableList: []
    }
  },
  methods: {
    handleClick (val) {
      this.flag = val.name
      if (val.name === '未完成') {
        this.taskstart = '1'
      } else if (val.name === '已完成') {
        this.taskstart = '2'
      } else if (val.name === '未下发') {
        this.taskstart = '0'
      } else if (val.name === '全部任务') {
        this.taskstart = ''
      }
      this.initTableList()
    },
    onClickLeft () {
      this.$router.push({path: '/home'})
    },
    handleNewClick () {
      this.$router.push({path: '/NewForm', query: {type: 'newForm'}})
    },
    handleAudit (row) {
      // console.log(row)
      this.$router.push({path: '/Audit', query: {objData: JSON.stringify(row.tableData[0]), bdid: row.bdid}})
    },
    handleEdit (row) {
      this.$router.push({path: '/NewForm', query: {objData: JSON.stringify(row.tableData[0]), type: 'edit', id: row.id, bdid: row.bdid, dataFileYhkPaths: row.dataFileYhkPaths, dataFileYhks: row.dataFileYhks, dataFileSxqmPaths: row.dataFileSxqmPaths, dataFileSxqms: row.dataFileSxqms, dataFileSfzPaths: row.dataFileSfzPaths, dataFileSfzs: row.dataFileSfzs}})
    },
    initTableList () {
      http.getUnderwritesByTaskStartApp({bdid: '', tbzw: '', taskstart: this.taskstart}).then(res => {
        this.dataTableList = res.data.result
      })
    }
  },
  mounted () {
    this.initTableList()
  }
}
</script>

<style lang="less" scoped>
.insurance{
  background-color: #F8F8F8;
  height: 100%;
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title{
      color: #fff !important;
    }
  }
  .insuranceBg{
    .h(400);
  }
  .insuranceTab{
    position: absolute;
    z-index: 10;
    width: 100%;
    .top(450);
    .h(80);
    .rowClassTab{
      width: 90%;
      margin: 0 auto;
      height: 100%;
      background-color: rgba(255, 255, 255);
      .b-radius(10);
      .insuranceCol{
        height: 100%;
        text-align: center;
        display: table-cell;
        .lh(43);
        .insuranceColDiv{
          display: inline-block;
          height: 100%;
        }
        img{
          .mt(-5);
          vertical-align: middle;
        }
        .firstSpan{
          .padding(20, 20);
          .b-radius(50)
        }
        span{
          .fs(18);
        }
      }
    }
  }
  .insuranceTable{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    .mt(80);
    .panelHeader{
      .fs(25);
      .mb(20);
      border: none !important;
      .van-panel, /deep/ .van-hairline&#45;&#45;top-bottom{
        border: none !important;
        .van-cell, .van-panel__header{
          border: none !important;
          padding: 0 !important;
        }
      }
      .panelHeaderHeight{
        .h(39);
        .padding(5, 5)
      }
      img{
        vertical-align: bottom;
      }
    }
    .el-table{
      .fs(20);
      text-align: center !important;
      /deep/ .el-table__header, /deep/ .el-table__body, /deep/ .el-table__empty-block{
        width: 100% !important;
      }
      // /deep/ .el-table__header{
      //   /deep/ tr{
      //     /deep/ th{
      //       border-left: 1px solid #ccc;
      //       border-top: 1px solid #ccc;
      //       border-bottom: 1px solid #ccc;
      //     }
      //   }
      // }
      /deep/ .el-table__body{
        /deep/ tr{
          /deep/ td{
            /deep/ .cell{
              .mt(10);
              .mb(10);
            }
          }
        }
      }
    }
  }
}
.active{
  background-color: #39A8FC;
  color: #fff;
}
</style>
-->
