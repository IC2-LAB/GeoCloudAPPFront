<template>
  <div class="audit">
    <van-nav-bar right-text="" title="审核" @click-left="onClickLeft" left-arrow :border="borderFlag"></van-nav-bar>
    <div class="auditDoc">
      <h2 class="auditDocTtile">投保人信息</h2>
      <van-form validate-first @failed="onFailed" @submit="onSubmit">
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="name"
          label="姓名"
          disabled
          name="validator"
          placeholder="请输入真实姓名"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="address"
          label="地址"
          disabled
          name="validator"
          placeholder="请输入地址"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="phone"
          label="联系方式"
          disabled
          name="validator"
          placeholder="请输入正确联系方式"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <h2 class="auditDocTtile">保单信息</h2>
        <van-field
          v-model="number"
          label="保单号"
          disabled
          name="validator"
          placeholder="请输入真实姓名"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="cropName"
          label="投保作物"
          disabled
          name="validator"
          placeholder="请输入地址"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="cropArea"
          label="投保面积"
          disabled
          name="validator"
          placeholder="请输入正确联系方式"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <h2 class="auditDocTtile">作物核验</h2>
        <van-field
          readonly
          clickable
          label="作物类型"
          :value="value"
          placeholder="选择作物类型"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="cropDec"
          label="说明"
          placeholder=""
          type="textarea"
          rows="1"
        />
        <h2 class="auditDocTtile">面积核验</h2>
        <van-field
          v-model="auditArea"
          label="核算面积"
          placeholder=""
        />
        <van-field
          v-model="leftTopLong"
          label="左上角经度"
          placeholder=""
        />
        <van-field
          v-model="leftTopLat"
          label="左上角纬度"
          placeholder=""
        />
        <van-field
          v-model="rightBottomLong"
          label="右下角经度"
          placeholder=""
        />
        <van-field
          v-model="rightBottomLat"
          label="右下角纬度"
          placeholder=""
        />
        <h2 class="auditDocTtile">附件材料</h2>
        <van-field name="uploader">
          <template #input>
            <van-uploader @delete="deleteIdentify" :after-read="afterRead" v-model="fileList" multiple />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import http from '@/service/interface.js'
import axios from 'axios'
import { SM4Util } from '@/service/sm4encry'
export default {
  data () {
    return {
      value: '',
      showPicker: false,
      columns: ['与投保一致', '与投保不一致'],
      borderFlag: false,
      name: '',
      address: '',
      phone: '',
      number: '',
      cropName: '',
      cropArea: '',
      cropDec: '',
      auditArea: '',
      leftTopLong: '',
      leftTopLat: '',
      rightBottomLong: '',
      rightBottomLat: '',
      fileList: [],
      fileListIds: []
    }
  },
  methods: {
    deleteIdentify (fileList) {
      this.fileListIds.splice(fileList.index, 1)
    },
    afterRead (file) {
      let _this = this
      let formData = new FormData()
      if (file.length !== undefined) {
        file.map(item => {
          formData.append('imgs', item.file)
        })
      } else {
        formData.append('imgs', file.file)
      }
      axios.post('/yp/api/datafile/uploadDataFile', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(res => {
        if (res.data.hasOwnProperty('decryptFlag') && res.data.decryptFlag === true) {
          res.data.data = JSON.parse(SM4Util.decryptData_ECB(res.data.data))
        }
        _this.fileListIds = _this.fileListIds.concat(res.data.data.result.dataFileDoIds)
      })
    },
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    onClickLeft () {
      this.$router.push({path: '/insurance'})
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator (val) {
      return true
      // return /1\d{10}/.test(val)
    },
    onSubmit () {
      if (!this.leftTopLong) {
        this.$notify.error('请填写左上角经度')
        return false
      } else {
        if (parseFloat(this.leftTopLong) < -180 || parseFloat(this.leftTopLong) > 180) {
          this.$notify.error('经度请在-180°~+180°之间')
          return false
        }
      }
      if (!this.leftTopLat) {
        this.$notify.error('请填写左上角纬度')
        return false
      } else {
        if (parseFloat(this.leftTopLat) < -90 || parseFloat(this.leftTopLat) > 90) {
          this.$notify.error('纬度在-90°~+90°之间')
          return false
        }
      }
      if (!this.rightBottomLong) {
        this.$notify.error('请填写右下角经度')
        return false
      } else {
        if (parseFloat(this.rightBottomLong) < -180 || parseFloat(this.rightBottomLong) > 180) {
          this.$notify.error('经度请在-180°~+180°之间')
          return false
        }
      }
      if (!this.rightBottomLat) {
        this.$notify.error('请填写右下角纬度')
        return false
      } else {
        if (parseFloat(this.rightBottomLat) < -90 || parseFloat(this.rightBottomLat) > 90) {
          this.$notify.error('纬度在-90°~+90°之间')
          return false
        }
      }
      let wkt = `Polygon((${this.leftTopLong} ${this.leftTopLat}, ${this.rightBottomLong} ${this.leftTopLat},${this.rightBottomLong}  ${this.rightBottomLat},${this.leftTopLong} ${this.rightBottomLat}, ${this.leftTopLong} ${this.leftTopLat}))`
      // console.log({bdid: this.number, dbsj: this.value, sm: this.cropDec, hbmj: this.auditArea, coordinate: wkt, dataFileFjs: this.fileListIds})
      http.updateUnderwritesUpdateById({bdid: this.number, dbsj: this.value, sm: this.cropDec, hbmj: this.auditArea, coordinate: wkt, dataFileFjs: this.fileListIds}).then(res => {
        // console.log(res)
        if (res.data.retCode === '000') {
          this.$notify({
            type: 'success',
            message: res.data.result
          })
          this.$router.push({path: '/insurance'})
        }
      })
    },
    onFailed (errorInfo) {
      this.$notify({
        type: 'danger',
        message: errorInfo
      })
    }
  },
  mounted () {
    let row = JSON.parse(this.$route.query.objData)
    this.name = row.tbr
    this.address = row.dz
    this.phone = row.lxdh
    this.cropName = row.tbzw
    this.cropArea = row.tbmj
    this.number = this.$route.query.bdid
  }
}
</script>

<style lang="less" scoped>
.audit{
  background-color: #F8F8F8;
  height: 100%;
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title, /deep/ .van-nav-bar__text{
      color: #fff !important;
    }
  }
  .auditDoc{
    .auditDocTtile{
      margin: 0;
      .padding(16, 16);
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      .fs(30);
    }
    /deep/ .van-field{
      .padding(20, 20)
    }
  }
}
</style>
