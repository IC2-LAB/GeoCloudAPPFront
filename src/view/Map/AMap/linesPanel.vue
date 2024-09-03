<template>
    <div style="width: 100%;height:100%;">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell :id="item.fid" v-for="item in list" :key="item.fid" :before-close="beforeClose">
          <!--<template #left>-->
            <!--<van-button  @click="showLines()"  square type="primary" text="查看" />-->
          <!--</template>-->
          <van-cell   @click="showLines(item)" :border="false" :title="item.timeseries"
                    :style="{'border-bottom': '1px solid #eeeeeeeb'}" />
          <template #right>
            <van-button  square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
</template>
<script>
// import http from '@/api/interface.js'
import {Dialog} from 'vant'
export default {
  name: 'linesPanel',
  data () {
    return {
      list: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      finished: false
    }
  },
  methods: {
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose ({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            let fid = instance.$el.id
            instance.close()
            this.delLine(fid)
            // alert(fid)
          })
          break
      }
    },
    delLine (fid) {
      // let param = {
      //   fusername: localStorage.username,
      //   fid: fid
      // }
      // http['updateUserTrajectory'](param).then(res => {
      //   Notify({ type: 'success', message: '删除轨迹成功' })
      //   this.onLoad()
      // })
    },
    showLines (item) {
      // let param = {
      //   fusername: localStorage.username,
      //   fid: item.fid
      // }
      // http['queryUserTrajectoryLines'](param).then(res => {
      //   this.$emit('addNewLines', JSON.parse(res.data.data.userTrajectory.lines))
      // })
    },
    onLoad () {
      // 异步更新数据
      // let param = {
      //   fusername: localStorage.username,
      //   pagesNum: this.pageNum,
      //   pageSize: 1000
      // }
      // http['queryUserTrajectory'](param).then(res => {
      //   let {dataList, dataTotal} = res.data
      //   // this.pageNum++
      //   this.list = dataList
      //   // 加载状态结束
      //   this.loading = false
      //   if (this.list.length >= dataTotal) {
      //     this.finished = true
      //   }
      // }).catch((err) => {
      //   // console.log(err)
      //   this.finished = true
      // })
    }
  }
}
</script>

<style scoped>

</style>
