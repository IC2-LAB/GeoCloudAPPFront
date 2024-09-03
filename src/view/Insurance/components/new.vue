<template>
  <div class="new">
    <van-nav-bar right-text="" title="业务保险" @click-left="onClickLeft" left-arrow :border="borderFlag"></van-nav-bar>
    <div class="newDoc">
      <h2 class="newDocTtile">投保人信息</h2>
      <van-form validate-first @failed="onFailed" @submit="onSubmit">
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="name"
          label="姓名"
          name="validator"
          placeholder="请输入真实姓名"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="address"
          label="地址"
          name="validator"
          placeholder="请输入地址"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="phone"
          label="联系方式"
          name="validator"
          placeholder="请输入正确联系方式"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="identityNum"
          label="身份证号"
          name="validator"
          placeholder="请输入正确身份证号"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="bankNum"
          label="银行卡号"
          name="validator"
          placeholder="请输入正确银行卡号"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field name="uploader">
          <div slot="label">
            <span>身份证照片</span>
            <p>
              <span style="width: 90%;margin: 0 auto;display: block;font-size: .32rem;color: #ccc;">(正反面)</span>
            </p>
          </div>
          <template #input>
            <van-uploader @delete="deleteIdentify" :after-read="afterReadIdentify" v-model="identity" multiple :max-count="2" />
          </template>
        </van-field>
        <van-field name="uploader" label="银行卡照片">
          <template #input>
            <van-uploader @delete="deleteBankCard" :after-read="afterReadBankCard" v-model="bankCard" multiple :max-count="1" />
          </template>
        </van-field>
        <van-field name="uploader" label="手写签名照片">
          <template #input>
            <van-uploader @delete="deleteHandPhoto" :after-read="afterReadHandPhoto" v-model="handPhoto" multiple :max-count="1" />
          </template>
        </van-field>
        <h2 class="newDocTtile">投保作物信息</h2>
        <van-field
          v-model="cropName"
          label="作物名称"
          name="validator"
          placeholder="作物名称"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="cropArea"
          label="面积(亩)"
          name="validator"
          placeholder="作物面积"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="cropPremium"
          label="保费(元)"
          name="validator"
          placeholder="作物保费"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="cropInsured"
          label="保额(元)"
          name="validator"
          placeholder="作物保额"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
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
      id: null,
      borderFlag: false,
      name: '',
      address: '',
      phone: '',
      identityNum: '',
      bankNum: '',
      identity: [],
      bankCard: [],
      handPhoto: [],
      identityIds: [],
      bankCardIds: [],
      handPhotoIds: [],
      cropName: '',
      cropArea: '',
      cropPremium: '',
      cropInsured: '',
      type: ''
    }
  },
  methods: {
    deleteIdentify (fileList) {
      this.identityIds.splice(fileList.index, 1)
    },
    deleteBankCard (fileList) {
      this.bankCardIds.splice(fileList.index, 1)
    },
    deleteHandPhoto (fileList) {
      this.handPhotoIds.splice(fileList.index, 1)
    },
    afterReadIdentify (file) {
      this.uploadDataFileMethod('identity', file)
    },
    afterReadBankCard (file) {
      this.uploadDataFileMethod('bankCard', file)
    },
    afterReadHandPhoto (file) {
      this.uploadDataFileMethod('handPhoto', file)
    },
    uploadDataFileMethod (val, file) {
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
        if (val === 'identity') {
          _this.identityIds = _this.identityIds.concat(res.data.data.result.dataFileDoIds)
        } else if (val === 'bankCard') {
          _this.bankCardIds = _this.bankCardIds.concat(res.data.data.result.dataFileDoIds)
        } else if (val === 'handPhoto') {
          _this.handPhotoIds = _this.handPhotoIds.concat(res.data.data.result.dataFileDoIds)
        }
      })
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
      http.saveUnderwrite({bdid: this.id, tbr: this.name, dz: this.address, lxdh: this.phone, sfz: this.identityNum, yhkkh: this.bankNum, tbzw: this.cropName, tbmj: this.cropArea, zwbf: this.cropPremium, zwbe: this.cropInsured, dataFileSxqms: this.handPhotoIds, dataFileYhks: this.bankCardIds, dataFileSfzs: this.identityIds}).then(res => {
        if (res.data.retCode === '000') {
          this.$notify({
            type: 'success',
            message: res.data.result
          })
          this.name = ''
          this.address = ''
          this.phone = ''
          this.identityNum = ''
          this.bankNum = ''
          this.identity = []
          this.bankCard = []
          this.handPhoto = []
          this.identityIds = []
          this.bankCardIds = []
          this.handPhotoIds = []
          this.cropName = ''
          this.cropArea = ''
          this.cropPremium = ''
          this.cropInsured = ''
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
    this.type = this.$route.query.type
    this.name = ''
    this.address = ''
    this.phone = ''
    this.identityNum = ''
    this.bankNum = ''
    this.identity = []
    this.bankCard = []
    this.handPhoto = []
    this.identityIds = []
    this.bankCardIds = []
    this.handPhotoIds = []
    this.cropName = ''
    this.cropArea = ''
    this.cropPremium = ''
    this.cropInsured = ''
    if (this.type === 'edit') {
      let row = JSON.parse(this.$route.query.objData)
      this.name = row.tbr
      this.address = row.dz
      this.phone = row.lxdh
      this.identityNum = row.sfz
      this.bankNum = row.yhkkh
      this.id = this.$route.query.bdid
      this.$route.query.dataFileSfzPaths.map(item => {
        this.identity.push({url: item})
      })
      this.bankCard.push({url: this.$route.query.dataFileYhkPaths})
      this.handPhoto.push({url: this.$route.query.dataFileSxqmPaths})
      this.identityIds = this.$route.query.dataFileSfzs
      this.bankCardIds = this.$route.query.dataFileYhks
      this.handPhotoIds = this.$route.query.dataFileSxqms
      this.cropName = row.tbzw
      this.cropArea = row.tbmj
      this.cropPremium = row.zwbf
      this.cropInsured = row.zwbe
    }
  }
}
</script>

<style lang="less" scoped>
.new{
  background-color: #F8F8F8;
  height: 100%;
  .van-nav-bar{
    background: #39A8FC;
    /deep/ .van-icon, /deep/ .van-nav-bar__title, /deep/ .van-nav-bar__text{
      color: #fff !important;
    }
  }
  .newDoc{
    .newDocTtile{
      margin: 0;
      .padding(16, 16);
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      .fs(30);
    }
  }
}
</style>
