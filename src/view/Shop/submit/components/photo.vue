<!--eslint-disable-->
<template>
  <div class="contain">
        <div class="headertools" >
            <img src="../../../../assets/images/shop/back.png" @click="back2" alt="返回上一级"/>
            <p class="font font__big">拍照上传</p>
            <p class="empty">&nbsp;</p>
        </div>
        <div class="draw" v-show="state_photo">
        <canvas id="canvas" width="500" height="500">
        </canvas>
        </div>
        <div class="crame" v-show="state_crame">
       <video id="videos">
       </video>
        </div>
        <div class="tools" >
            <span class="font" v-show="state_photo" @click="back">返回</span>
            <button class="bt__photo" @click="photograph" >
                <p class="circle"></p>
            </button>
            <span  v-show="state_photo" class="font font__upload" @click="toUpload">上传</span>
        </div>
  </div>
</template>

<!--eslint-disable-->
<script>
export default {
props:["active"],
data(){
    let state_crame = true;
    let state_photo = false;
    let imgBase64 = "";
    return{
        state_crame,
        state_photo,
        imgBase64
    }
},
methods:{
      //相机访问
        crame(){
            let videos = document.getElementById("videos");
            // facingMode:(front? "user" : "environment")前后置摄像头
            let promise = navigator.mediaDevices.getUserMedia({video:true})
            .then(function(stream){
                videos.srcObject = stream;
                videos.onloadedmetadata = function(e){
                videos.play();
                }
            })
            .catch(function(err){
                 console.log(err.name + ": " + err.message); 
            });
        },
        photograph(){
            let photoInfo = document.getElementById("canvas").getContext("2d");
          //截取video图像
            photoInfo.drawImage(document.getElementById("videos"),0,0,640,480);
            let imgBase64 = document.getElementById("canvas").toDataURL("image/jpeg", 0.7);
            let string = imgBase64.replace("data:image/jpeg;base64,", "");
            let strLgh = string.length;
            let fileLgh = parseInt(strLgh - (strLgh  / 8) * 2); //
            let size = (fileLgh / 1024).toFixed(2);// 由字节转换为KB 判断大小
            this.state_photo = true;
            this.state_crame = false;
            this.imgBase64 = imgBase64;
            console.log(size); //图片大小
            console.log(imgBase64);
            console.log(string);
            console.log(strLgh);
            console.log(size);
        } ,
        back(){
            this.state_crame = true;
            this.state_photo = false;
        },
        back2(){
            this.$router.push('/upload');
        },
        toUpload(){
            this.$emit("base64",this.imgBase64);
            alert(0);
        }
},
    mounted(){
        this.crame();
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
    position: fixed;
    left: 0;
    top: 0;
}
/*工具栏*/
.tools{
    width: 100vw;
    height: 15vh;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    z-index: 2;
    box-shadow: 0px 0px 0px 1px #c8cfd3;
}
/*相机*/
.crame{
    width: 100vw;
    height: 70vh;
    position: absolute;
    top: 0.32rem;
    left: 0;
}
.crame > video{
    object-fit: fill;
    width: 100%;
    height: 100%;
}
/*画布*/
.draw{
    width: 100vw;
    height: 85vh;
    position: absolute;
    top: 0;
    left: 0;
}
.draw > canvas{
    object-fit: fill;
    width: 100%;
    height: 100%;
}
/**拍照按钮 */
.bt__photo{
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  align-self: center;
  border: none;
  display: flex;
  justify-content: center;
  background-color: #585d60;
}
.circle{
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
    background-color: #FFFFFF;
    border-radius: 50%;
    border: silver;
}
.circle:hover{
}
/**字体区 */
.font{
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000;
    line-height: 0.533rem;
    align-self: center;
}
.font__upload{
    color: #4675F1;
}
/*头部工具栏*/
.headertools{
    width: 100vw;
    height: 1.71rem;
    background-color: #FFFFFF;
    box-shadow: 0px 1px 0px 0px #E5EBEE;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}
.headertools >img{
    width: 0.27rem;
    height: 0.48rem;
    align-self: center;
}

</style>