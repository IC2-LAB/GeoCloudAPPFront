<!--eslint-disable-->
<template>
  <div class="contain">
    <div class="headNev"   >
      <img src="../../../../assets/images/shop/back.png" @c@click="router.go(-1)" />
      <span class="mainTitele" >
            订单附件上传
      </span>
    </div>
    <div class="bod" >
      <div class="newsBox" >
        <span class="font">订单<span class="font__blue">{{`"${orderNews.ordId}"`}}</span>创建成功，上传附件</span>
      </div>
      <div class="uploadBox" v-for="(select,index) in selection" :key="select.id">
        <div class="title">
          <img src="../../../../assets/images/shop/upicon.png" />
          <span
            :id="subID[index]"
            class="font font__bold" > {{select.name}}
            <span class="star">*</span></span>
          <van-button class="boutton__select1" v-if="(index === 1)" type="warning">下载模板</van-button>
        </div>
        <!-- <van-uploader :id="ablumUpload[index]"
                      v-model="selection[index].fileList1" v-show="uploadView[index]"
                      :after-read="(file)=>afterRead(file,index) "
                      multiple
                      :max-count="1"
                      accept="image/*"
                      >
            <div v-show="false" ></div>
        </van-uploader>
        <van-uploader :id="crameUpload[index]"
                      v-model="selection[index].fileList2" v-show="uploadView[index]"
                      :after-read="(file)=>afterRead(file,index)"
                      multiple
                      :max-count="1"
                      accept="image/*"
                      capture="camera"
                      >
            <div v-show="false" ></div>
        </van-uploader> -->
        <van-uploader :id="loadUpload[index]"
                      v-model="selection[index].fileList"
                      :after-read="(file)=>afterRead(file,index) "
                      multiple
                      :before-delete="ImageDeleted(index)"
                      :max-count="1"
                      accept="image/*;pdf;"
        > 
          <img  :src="imgUrl[index].url" />
        </van-uploader>

        <!-- <van-overlay  :show="show[index].state" >
            <div class="selectBox" >
                <p class="font font__blue" @click="fileClick2(index)" >
                    相册</p>
                <p class="font font__blue" @click="fileClick(index)">
                    拍照
                </p>
                <p class="font font__blue" @click="fileClick3(index)" >
                    本地文件</p>
            </div>
            <div id="cancel"  class="proView_select cancel"  @click="show[index].state = false">
                <span class="font">取消</span>
            </div>
      </van-overlay> -->
      </div>
    </div>
    <div class="save" >
        <span class="savBack" @click="router.push('/Order')" >
            返回
        </span>
      <div class="btnBox" >
        <van-button type="default" class="v_bouttonDefualte" @click="save" >保存</van-button>
        <van-button type="info" class="v_bouttonInfo" @click="submit">提交</van-button>
      </div>
    </div>
    <tabBar></tabBar>
  </div>
</template>
<!--eslint-disable-->
<script type="text/ecmascript-6">
  import axios from 'axios'
  import tabBar from '@/components/tabBar.vue'
  import http from '@/service/interface'
  import { ref, reactive , getCurrentInstance, onMounted} from '@vue/composition-api'
  import { Notify,Toast } from 'vant'
 import Router from 'vue-router'

  export default {
    components:{
      tabBar,
      Notify
    },
    setup(){
      const router = new Router();
      //容器
      let ctx = getCurrentInstance();
      let selection = reactive([
        {   id:"0",
          name:"任务来源说明",
          fileArr:[],
          fileList:[]
        },
        {   id:"1",
          name:"签字后数字分发",
          fileList:[],
          fileArr:[]
        },
        {   id:"2",
          name:"介绍信",
          fileList:[],
          fileArr:[]
        },
        {   id:"3",
          name:"身份证",
          fileList:[],
          fileArr:[]
        },
        {   id:"4",
          name:"其他",
          fileList:[],
          fileArr:[]
        }
      ]);
   
      let show = reactive([
        {state:false},
        {state:false},
        {state:false},
        {state:false},
        {state:false},
      ]);

      let params = reactive(
        ["upload.png"
          ,"upload.png"
          ,"upload.png"
          ,"upload.png",
          "upload.png"
        ]
      );

      const imgUrl = reactive([
        {
          url:require('@/assets/images/shop/'+params[0])
        },
        {
          url:require('@/assets/images/shop/'+params[1])
        },
        {
          url:require('@/assets/images/shop/'+params[2])
        },
        {
          url:require('@/assets/images/shop/'+params[3])
        },
        {
          url:require('@/assets/images/shop/'+params[4])
        }
      ]);
      /**相机 */
      const fileClick = (index)=>{
        document.getElementById("crameUpload_"+`${index}`).click();
      }
      const crameUpload = reactive([
        "crameUpload_0","crameUpload_1","crameUpload_2","crameUpload_3","crameUpload_4"
      ]);

      const fileClick2 = (index)=>{
        document.getElementById("ablumUpload_"+`${index}`).click();
      }
      const ablumUpload = reactive(["ablumUpload_0","ablumUpload_1","ablumUpload_2","ablumUpload_3","ablumUpload_4"]);

      const fileClick3 = (index)=>{
        document.getElementById("loadUpload_"+`${index}`).click();
      }
      const loadUpload = reactive(["loadUpload_0","loadUpload_1","loadUpload_2","loadUpload_3","loadUpload_4"]);

      let upload = reactive([true,true,true,true,true]);
      let uploadView = reactive([true,true,true,true,true]);
      /**上传系列 */
      let fileList = [];
      let fileArr = [];
      /** 文件处理*/

      /**上传回调函数 */
      const  afterRead = (file,index)=>{


        
        document.getElementById(subID[index]).style.color = `#000`;
        file.status = "uploading";
        file.message = "上传中...";
        let fromData = new FormData();
        fromData.append('file',file.file);
        console.log(fromData);
        setTimeout(() => {
          if (num === 0) {
            Toast({
              type: "fail",
              message: "上传时间过长请重试",
            });
            file.status = "failed";
            file.message = "上传失败";
          }
          console.log(num);
        }, 500000);
        http.getFileUpload(fromData).
        then((res)=>{
          console.log("uploadRes",res)
          file.status = "";
          file.message = "上传成功";
          let othername = res.data.split('/')
          const arrlist = {
              fileName : othername[othername.length - 1],
              filePath : res.data,
              fileType : file.type
            }
         fileArr.push(arrlist)
          Toast({ type: "success", message: "上传成功" });
        }).catch(
          Toast({ type: "fail", message: "上传失败" })
        )

      };
      const ImageDeleted = (index) => {
        sessionStorage.removeItem(`fileList_${index}`)
      };
      const orderNews = reactive({
        ordId:"20220202WP00001"
      });
      //打开相册
      const openColler = ()=>{
        if(window.plus){
          alert("存在H5对象")
        }

      }
      //保存方法
      const save = ()=>{
        selection.forEach((row)=>{
          sessionStorage.setItem(`fileList_${row.id}`,JSON.stringify(row.fileList))
          http.getagrsSaveFiles(
            {
                data: {
                uploadFileList:fileArr,
                orderNames:orderDataList,
                sstatus:row.id
              }
            }
          )
        })
        Toast({ type: "success", message: "保存成功" });
      }
           //生命周期
      onMounted(()=>{
        if(sessionStorage.getItem(`fileList_${0}`)){
          for(let i=0;i<selection.length;i++){
            selection[i].fileList =  JSON.parse(sessionStorage.getItem(`fileList_${i}`))
          }
        }
         orderDataList =  router.currentRoute.query.orderDataList
      })
      //提交方法
      let orderDataList = [];
      const submit = ()=>{
        console.log("执行提交")
        let message = "";
        let indexs = [];
        selection.forEach((row,index)=>{
          console.log("执行提交row",row)
          if(row.fileList.length == 0){
            document.getElementById(subID[index]).style.color = `red`;
            message = "请上传必填项"
          }else{
           indexs.push(index)
          }
        })
        if(message){
          Notify(message)
        }else{
            for(let j=0;j<indexs.length;j++){
          http.getagrsSaveFiles(
            {
                data: {
                uploadFileList:fileArr,
                orderNames:orderDataList,
                sstatus:indexs[j]
              }
            }
          ).then((res)=>{
             Toast({ type: "success", message: "提交成功" })
             sessionStorage.clear()
             }
          ).catch((error)=>{
             Toast({ type: "success", message: "提交失败" })
          })
          }
        }

      }
      const subID = reactive(["sub_1","sub_2","sub_3","sub_4","sub_5"])
  
      return{
        save,
        orderNews,
        selection,
        show,
        imgUrl,
        fileClick,
        upload,
        uploadView,
        fileList,
        crameUpload,
        afterRead,
        ablumUpload,
        loadUpload,
        fileClick2,
        fileClick3,
        fileArr,
        ImageDeleted,
        submit,
        subID,
        router
      }
    }
  }
</script>
<!--eslint-disable-->
<style scoped>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .contain{
    width: 100vw;
    height: 100vh;
    background: #F6F6F6;
  }
  .van-overlay{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0,0.25);
  }
  .font{
    font-size: 0.54rem;
    align-self: center;
  }
  .proView_select{
    width: 100vw;
    height: 1.25rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .cancel{
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .selectBox{
    width: 100vw;
    height: 4rem;
    background-color: #fff;
    border-radius: 16px 16px 0px 0px;
    position: fixed;
    bottom: 1.41rem;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .uploadBox{
    width: 9.2rem;
    height: 1.333rem;
    background: #FFFFFF;
    border-radius: 12px;
    margin-left: 0.4rem;
    margin-bottom: 0.213rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0.267rem;
    padding-right: 0.333rem;
  }
  .uploadBox  img{
    width: 0.4rem;
    height: 0.4rem;
    align-self: center;
  }
  .title{
    height: 100%;
    align-self: center;
    display: flex;
  }
  .title > img{
    align-self: center;
  }
  /***字体 */
  .font{
    font-size: 0.4rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #333333;
    line-height: 0.56rem;
    align-self: center;
  }
  .font__blue{
    color: rgba(70, 117, 241, 1);
  }
  .newsBox{
    width: 9.2rem;
    height: 1.06rem;
    background: #FFFFFF;
    border-radius: 12px;
    margin-left: 0.4rem;
    margin-bottom: 0.347rem;
    padding-left: 0.27rem;
    display: flex;
    text-align: center;
  }
  .font__bold{
    font-size: 0.373rem;
    font-weight: 500;
    color: #333333;
    line-height: 0.533rem;
    margin-left: 0.133rem;
  }
  .headNev{
    width: 100vw;
    height: 1.70rem;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px #E5EBEE;
    margin-bottom: 0.346rem;
    display: flex;
  }
  .headNev > img{
    width: 0.267rem;
    height: 0.48rem;
    align-self: center;
    margin-left: 0.36rem;
  }
  .headNev > .mainTitele{
    display: block;
    font-size: 0.48rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #070707;
    line-height: 0.67rem;
    margin: 0 auto;
    align-self: center;
  }
  .van-button{
    width: 2.08rem;
    height: 0.64rem;
    background: #F19046;
    border-radius: 0.426rem;
    border: 1px solid #F09047;
    align-self: center;
  }
  .star{
    font-size: 0.373rem;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #E55A5A;
    line-height: 0.533rem;
  }
  .boutton__select1{
    margin-left: 0.346rem;
  }
  /deep/ .van-uploader{
    align-self: center;
  }
  /deep/ .van-uploader__preview-image {
    width: 1rem;
    height: 1rem;
  }
  .save{
    width: 100vw;
    height: 1.47rem;
    background: #FFFFFF;
    box-shadow: 0px -1px 0px 0px #E5EBEE;
    position: fixed;
    bottom: 1.4rem;
    left: 0rem;
    display: flex;
    justify-content: space-between;
  }
  .v_bouttonInfo{
    width: 1.95rem;
    height: 0.8rem;
    background: #4675F1;
    border-radius: 0.427rem;
    border: none;
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fff;
    line-height: 0.533rem;
    margin-left: 0.4266rem;
  }
  .v_bouttonDefualte{
    width: 1.95rem;
    height: 0.8rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8591AE;
    line-height: 0.533rem;
    margin-left: 0.4rem;
  }
  .btnBox{
    width: 50%;
    align-self: center;
    display: flex;
  }
  .savBack{
    align-self: center;
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #121212;
    line-height: 0.533rem;
    margin-left: 0.933rem;
  }
</style>
