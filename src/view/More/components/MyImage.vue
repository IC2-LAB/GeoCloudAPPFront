<template>
  <div>
    <van-steps direction="vertical" :active="1">
      <van-step v-for="(item, index) in imgArr" :key="index">
        <p>{{item.time}}</p>
        <img width="100%" :src="item.url" alt="" />
        <p>{{item.desc}}</p>
      </van-step>
    </van-steps>
    <div class="addDiv" @touchstart="addFunc">
      <van-icon name="add" size="40"/>
    </div>
    <van-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="描述"
        type="textarea"
        maxlength="100"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-divider />
      <van-uploader v-model="fileList" multiple :max-count="4" />
      <van-divider />
      <van-button style="float: right; marginRight: .3rem" type="info" @click="commitAdd">提交</van-button>
    </van-popup>
  </div>
</template>

<script>
// import http from '@/api/interface'
export default {
  data () {
    return {
      message: '',
      popupShow: false,
      fileList: []
    }
  },
  props: ['dataAll', 'commitForm'],
  computed: {
    imgArr () {
      let {picnode, projectId} = this.dataAll
      let imgArr = []
      if (picnode) {
        let arrO = picnode.split('##***##')
        arrO.map(item => {
          let arrT = item.split('##%%%##')
          let obj = {}
          obj.time = arrT[0]
          obj.url = `/upload/${projectId}/pic/${arrT[1]}`
          obj.desc = arrT[2]
          imgArr.push(obj)
        })
      }
      return imgArr
    }
  },
  methods: {
    addFunc () {
      this.popupShow = true
    },
    commitAdd () {
      // let param = new FormData()
      // let date = new Date()
      // let picDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      // let projectId = this.$route.query.id
      // let description = this.message
      // this.fileList.map(item => {
      //   param.append('file', item.file)
      // })
      // param.append('pic_date', picDate)
      // param.append('projectId', projectId)
      // param.append('description', description)
      // this.$toast.loading({
      //   duration: 0,
      //   message: '提交中...',
      //   forbidClick: true
      // })
      // http.uploadImg(param).then(res => {
      //   this.popupShow = false
      //   this.$toast('提交成功')
      //   this.$emit('commitForm')
      // }).catch(err => {
      //   // console.log(err)
      // })
    }
  }
}
</script>
<style scoped lang="less">
.van-cell:not(:last-child)::after{
  border:none;
}
.addDiv{
  position:fixed;
  top: .2rem;
  right: .2rem;
}
</style>
