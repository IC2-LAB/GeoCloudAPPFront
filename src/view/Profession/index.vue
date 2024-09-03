<!--
<template>
  <div class="profession">
    <van-nav-bar
      title="产品介绍"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="professionContent">
      <div class="professionContentTitle">
        <p>产品介绍</p>
      </div>
      <div class="professionContentSubhead">
        <p>政策性农业保险&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单位: 亩/头/元</p>
      </div>
    </div>
    <div class="professionContentTable">
      <el-table
        :data="tableData"
        style="width: 100%;border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;">
        <el-table-column
          prop="xz"
          width="40"
          label="险种">
        </el-table-column>
        <el-table-column
          prop="bxje"
          width="40"
          label="保险金额">
        </el-table-column>
        <el-table-column
          prop="bxfl"
          width="40"
          label="保险费率">
        </el-table-column>
        <el-table-column
          prop="zbf"
          width="40"
          label="总保费">
        </el-table-column>
        <el-table-column label="农户">
          <el-table-column
            prop="czbtbf"
            width="45"
            label="财政补贴保费(80%)">
          </el-table-column>
          <el-table-column
            prop="bfbtbl"
            width="45"
            label="保费补贴比例">
          </el-table-column>
          <el-table-column
            prop="bf"
            width="45"
            label="保费">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    &lt;!&ndash; <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> &ndash;&gt;
  </div>
</template>

<script>
import http from '@/service/interface.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/home'})
    },
    initTable () {
      http.getProductPresentation({}).then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted () {
    this.initTable()
  }
}
</script>

<style lang="less" scoped>
.profession{
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title{
      color: #fff !important;
    }
  }
  .professionContent{
    height: 100%;
    width: 100%;
    text-align: center;
    .professionContentTitle{
      .fs(40);
      font-weight: bold;
      .mt(35);
    }
    .professionContentSubhead{
      .fs(30);
      .mt(25);
    }
  }
  .professionContentTable{
    width: 99%;
    margin: 0 auto;
    .mt(20);
    .el-table{
      font-size: .2rem !important;
      text-align: center !important;
      /deep/ .el-table__header, /deep/ .el-table__body, /deep/ .el-table__empty-block{
        width: 100% !important;
      }
      /deep/ .el-table__header{
        /deep/ tr{
          /deep/ th{
            border-left: 1px solid #ccc;
            border-top: 1px solid #ccc;
            // border-bottom: 1px solid #ccc;
          }
        }
      }
      /deep/ .el-table__body{
        /deep/ tr{
          /deep/ td{
            border-left: 1px solid #ccc;
            border-top: 1px solid #ccc;
            /deep/ .cell{
              .mt(24);
              .mb(24);
            }
          }
        }
      }
    }
  }
}
</style>
-->
