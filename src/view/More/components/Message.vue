<template>
  <div>
    <div class="title">项目详情</div>
    <van-cell-group>
      <van-field label-align="left" label="项目编码:" :value="dataAll.projectId" readonly />
      <van-field label="项目名称:" :value="dataAll.projectName" readonly />
      <van-field label="项目性质:" :value="dataAll.projectScale" readonly />
      <van-field label="项目类型:" :value="dataAll.projectType" readonly />
      <van-field label="项目子类:" :value="dataAll.projectTypeTwo" readonly />
      <van-field label="责任单位:" :value="dataAll.accountabilityunit" readonly />
      <van-field label="所属地区:" :value="dataAll.projectarea" readonly />
      <van-field label="预计开工时间:" :value="dataAll.planStartTime" readonly />
      <van-field label="预计完工时间:" :value="dataAll.planEndTime" readonly />
      <van-field label="工程进度:" :value="status" readonly />
      <van-field
        v-model="dataAll.projectIntroduction"
        autosize
        readonly
        label="主要建设内容:"
        type="textarea"
      />
    </van-cell-group>
    <div class="title">投资详情</div>
    <van-cell-group>
      <van-field label="总投资:" :value="dataAll.ztz" readonly />
      <van-field label="专项资金总额:" :value="dataAll.hxzj" readonly />
      <van-field
        v-model="dataAll.zjorigin"
        autosize
        readonly
        label="资金来源:"
        type="textarea"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: ['dataAll'],
  computed: {
    status () {
      let status = '规划阶段'
      switch (this.dataAll.projectstage) {
        case '1':
          status = '规划阶段'
          break
        case '2':
          status = '预算阶段'
          break
        case '3':
          status = '实施阶段'
          break
        case '4':
          status = '竣工阶段'
          break
      }
      return status
    }
  }
}
</script>
<style>
.van-field__label{
  text-align: left;
}
</style>
<style scoped lang="less">
.title{
  background: #2691c1;
  text-align:center;
  .w(280);
  .fs(40);
  color: #fff;
}
</style>
