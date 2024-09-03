<!--eslint-disable-->
<template>
<div class="contain" >
<!--用户权限role(0)------------------------------------------------------------------>
<van-tabs class="HeadNav" v-model="active" @change="beforeChange">
  <van-tab v-for="item in options" :title="item.label" :key="item.value">
    <ul class="examineBox">
         <li class="order" v-for="item in tableData3" :key="tableData3[index].id" >
            <div class="oHead" >
                <div class="title">
                    <div class="emty">
                    <img src="../../assets/images/order/1x/orderID.png"
                    srcset="../../assets/images/order/2x/orderIDx.png"
                    alt="商品图片"

                    />
                    <span class="shopID">{{item.ordername}}</span>
                    </div>
                    <span class="creatTime">{{item.creattime}}</span>
                </div>
                <div class="orderInfo">
                    <img src="../../assets/images/order/sup/素材1.png">
                    <ul>
                      <li class="shopID"><span>{{item.productName}}</span></li>
                      <li class="shopdec"><span>{{item.dataSum}} · {{item.dataCount}}景</span></li>
                      <li class="belong"><span @click="select0 = true"><span>{{item.applyUserUnit}}</span></span></li>
                      <li> <span @click="select1 = true"><span>{{item.getMethod}}</span></span></li>
                    </ul>
                </div>
                <div class="user">
                    <div class="avaBox">
                    <img class="avator" src="../../assets/images/order/2x/orderIDx.png" />
                      <span class="userID">{{item.applyuser}}</span>
                    <img src="../../assets/images/order/1x/reset.png"
                     srcset="../../assets/images/order/2x/reset@2x.png"
                     @click="setIndex= 0;setView = true"
                     class="fixed"
                      >
                    </div>
                <div class="uphone">
                <span class="userPhone">{{item.applyUserPhone}}</span>
                <img src="../../assets/images/order/1x/reset.png"
                     srcset="../../assets/images/order/2x/reset@2x.png"
                     @click="setIndex=1;setView = true"
                      >
                </div>
            </div>
            </div>
            <div class="oFuction" >
                 <ul>
                <li><span>任务来源说明</span>
                <img src="../../assets/images/order/1x/upload.png"
                     srcset="../../assets/images/order/2x/upload@2x.png"
                     @click="preview=true;listIndex=0;"
                /></li>
                <li><span>签字后数字分发</span>
                <img src="../../assets/images/order/1x/upload.png"
                     srcset="../../assets/images/order/2x/upload@2x.png"
                     @click="preview=true;listIndex=1;"
                /></li>
                <li><span>介绍信</span>
                <img src="../../assets/images/order/1x/upload.png"
                     srcset="../../assets/images/order/2x/upload@2x.png"
                     @click="preview=true;listIndex=2;"
                /></li>
                <li><span>身份证</span>
                <img src="../../assets/images/order/1x/upload.png"
                     srcset="../../assets/images/order/2x/upload@2x.png"
                     @click="preview=true;listIndex=3;"
                /></li>
                <li><span>其他</span>
                <img src="../../assets/images/order/1x/upload.png"
                     srcset="../../assets/images/order/2x/upload@2x.png"
                     @click="preview=true;listIndex=3;"
                /></li>
            </ul>
            </div>
           <div class="oButtomBox" >
             <div class="big" >
               <!--<van-button type="info" @click="handleEditBtg(2, item)"><span>驳回</span></van-button>
                 <van-button type="info" @click="handleEditTg(1, item)"><span>通过</span></van-button>-->
               <van-button id="warningspan" type="info" v-if="(orderStatusIndex === 0 || item.sstatus === 0) && userProName === '管理员'"  @click="handleEditBtg(2, item)" ><span>驳回</span></van-button>
               <van-button type="info" v-if="(orderStatusIndex === 0 || item.sstatus === 0) && userProName === '管理员'"  @click="handleEditTg(1, item)"><span>通过</span></van-button>
             </div>
             <div class="small" >
               <van-button type="info"><span>查看列表</span></van-button>
               <van-button type="info" @click="dataQuert(item)"><span>数据分布</span></van-button>
               <van-button v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)" type="info" @click="goSubmitData(0)" ><span>提交</span></van-button>
               <van-button v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)" type="info" @click="goSubmitData(-1)"><span>保存</span></van-button>
             </div>
           </div>
         </li>
    </ul>
  </van-tab>
</van-tabs>
<!---预览判断预览类型，是图片还是PDF文件，并打开不同的遮罩层--->
<van-overlay :show="preview">
        <div  class="priFuction" @click="checkSuffix(fileUrlRole1[listIndex])" >
        <p>预览</p>
        </div>
        <div class="priCancel" @click="preview = false">
            <p>取消</p>
        </div>
</van-overlay>
<!---图片预览--->
  <van-overlay :show="Picturebrows" >
        <div class="picBrows">
        <div class="x" >
            <img src="../../assets/images/order/1x/形状结合.png"
                 srcset="../../assets/images/order/2x/形状结合@2x.png"
                 @click="Picturebrows = false"
            />
        </div>
        <div class="picView" >
            <img src="../../assets/images/order/1x/形状结合.png" class="prevPic" >
        </div>
        <div class="emty" >

        </div>
        </div>
   </van-overlay>
<!---PDF预览--->
<van-overlay :show="searchShow">
       <div class="browsView" >
                    <img src="../../assets/images/order/1x/形状结合.png"
                         srcset="../../assets/images/order/2x/形状结合@2x.png"
                         @click="searchShow = false"
                    />
                    <div class="view">
                        <div class="pdf" style="width:85%;">
                         <pdf
                        :src="fileUrlRole1[listIndex]"
                        :page="pdfcurrentPage"
                        @num-pages = "pageCount=$event"
                        @page-loaded = "pdfcurrentPage = $event"
                        @loaded = "loadPdfHandler"
                         ></pdf>
                         </div>
                    </div>
                    <div class="bouttonBox">
                        <van-button type="info" @click="changePdfPage(0)"><span>上一页</span></van-button>
                            <span>第{{pdfcurrentPage}}页/共{{pageCount}}页</span>
                        <van-button type="info" @click="changePdfPage(1)" ><span>下一页</span></van-button>
                    </div>
                </div>
</van-overlay>
<!--驳回-->
<van-overlay :show="show">
        <van-cell-group>
            <van-field v-model="value"  placeholder="请输入驳回理由" />
        </van-cell-group>
        <div class="reject">
            <div class="buttonBox">
            <van-button type="info" @click="show = false"><span>取消</span></van-button>
            <van-button type="info"><span>提交</span></van-button>
            </div>
        </div>
</van-overlay>
<!--修改-->
<van-overlay :show="setView">
    <div class="fix" >
    <van-cell-group>
        <van-field v-model="resetValue" placeholder="请输入修改内容" />
    </van-cell-group>
        <div class="reject">
            <div class="buttonBox">
            <van-button type="info" @click="setView = false"><span>取消</span></van-button>
            <van-button type="info" @click="set(index,setIndex)"><span>修改</span></van-button>
            </div>
        </div>
    </div>
</van-overlay>
<!--下拉菜单-->
<!--下拉菜单——所属-->
<van-popup
  v-model="select0"
  closeable
  position="bottom"
  :style="{ height: '30%' }"
>
<div class="selects" >
    <p @click="selectOption(0)">中国自然资源航空物探遥感</p>
    <p @click="selectOption(1)">中国矿业资源航空物探遥感</p>
</div>
<!--下拉菜单——下载类型-->
</van-popup>
<van-popup
  v-model="select1"
  closeable
  position="bottom"
  :style="{ height: '30%' }"
>
<div class="selects" >
    <p @click="selectOptionLoad(0)">在线下载</p>
    <p @click="selectOptionLoad(1)">离线下载</p>
</div>
</van-popup>
</div>
</template>

<!--eslint-disable-->
<script>
import pdf from 'vue-pdf'
import http from '@/service/interface'
export default {
   components:{
       pdf
    },
    data(){
     let role = "0";
     let select1 = false;
     let LoadIndex = 0;
     let uv1;
     let uv2;
     let select0 = false;
     let udex;
     let value;
     let userID = "";
     let userPhone = "";
     let color = "yellow";
     let active = "";
     let listIndex = 0;
     let resetValue = "";
     let preview = false;//控制判断遮罩层
     let searchShow = false;//控制PDF预览遮罩层
     let Picturebrows = false;//控制图片遮罩层
     let pdfcurrentPage = 0;//当前页码
     let pageCount = 0;//总页数
     let fileType = 'pdf';//文件类型
     let show = false;//控制驳回遮罩层
     let setView = false;//控制修改遮罩层
     let belongIndex = 0;
     let uphone = "14291422338";
     let username = "云炎强(yunyanqiang)"
//页面显示订单源:
     const orders = [
        {
         id:"",
         orderName:"",
         createTime:"",
         createUser:"",
         phone:"",
         avator:"",
         userAvator:"",
         fileUrl:[],
         belong:[],
         load:[],
     }
     ];
//权限0
    //待提交:
     const submitted = [
        {
            id:"20220202WP00001",
            orderName:"高分辨率对地观测系统重大专项",
            createTime:"2020-02-02",
            createUser:"云炎强(yunyanqiang)",
            phone:"14291422338"
        },{
            id:"20220202WP00002",
            orderName:"高分辨率对地观测系统重大专项2",
            createTime:"2020-02-03",
            createUser:"云炎强(yunyanqiang)2号",
            phone:"14291422339"
        }
     ];
    //审核通过
     const approvedR0 = [];
    //准备完成(权限0)
     const readyR0 = [];
    //显示未通过(权限0)
     const unapprovedR0 = [];
    //显示待审核（权限1）
     const approvedR1 = [];
    //数据准备完成(权限1)
     const readyR1 = [];
    //分发完成
     const distribute = [];
    //待审核(权限0):
     const reviewedR0 = [
     {
         id:"20220202WP00001",
         orderName:"高分辨率对地观测系统重大专项",
         createTime:"2020-02-02",
         createUser:"云炎强(yunyanqiang)",
         phone:"14291422338"
     },
     {
         id:"20220202WP00001",
         orderName:"高分辨率对地观测系统重大专项",
         createTime:"2020-02-02",
         createUser:"云炎强(yunyanqiang)",
         phone:"14291422338"
     }];

//权限 1
    //待审核(权限1)
    const reviewedR1 = [
         {
         id:"20220202WP00001",
         orderName:"高分辨率对地观测系统重大专项",
         createTime:"2020-02-02",
         createUser:"云炎强(yunyanqiang)",
         phone:"14291422338",
         avator:require("../../assets/images/order/sup/素材2.png"),
         userAvator:require("../../assets/images/order/sup/avator1.png"),
         fileUrl:[
            "@/assets/images/shop/file.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "@/assets/images/shop/back.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "../../assets/images/shop/order.png",
            "@/assets/images/shop/search.png",
            "../../assets/images/shop/pull.png"
         ],
        belong:["中国自然资源航空物探遥感","中国矿业资源航空物探遥感"],
        load:["在线下载","离线下载"]
     },
     {
         id:"20220202WP00001",
         orderName:"高分辨率对地观测系统重大专项",
         createTime:"2020-02-02",
         createUser:"云炎强(yunyanqiang)",
         phone:"14291422338",
         avator:require("../../assets/images/order/sup/素材1.png"),
         userAvator:require("../../assets/images/order/sup/素材2.png"),
         fileUrl:[
            "@/assets/images/shop/file.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "@/assets/images/shop/back.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "../../assets/images/shop/order.png",
            "@/assets/images/shop/search.png",
            "../../assets/images/shop/pull.png"
         ],
         belong:["中国自然资源航空物探遥感","中国矿业资源航空物探遥感"],
         load:["在线下载","离线下载"]
     }
    ];
    //角色1的文件路径
    const fileUrlRole1 = [
            "@/assets/images/shop/file.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "@/assets/images/shop/back.png",
            "/static/prePDF/创业计划书——李卓然.pdf",
            "../../assets/images/shop/order.png",
            "@/assets/images/shop/search.png",
            "../../assets/images/shop/pull.png"
    ];

        return{
            role,
            uv1,
            uv2,
            orders,
            reviewedR0,
            color,
            searchShow,
            reviewedR1,
            submitted,
            approvedR0,
            readyR0,
            unapprovedR0,
            approvedR1,
            readyR1,
            distribute,
            udex,
            fileUrlRole1,
            userID,
            userPhone,
            setView,
            resetValue,
            select0,
            belongIndex,
            select1,
            LoadIndex,
            uphone,
            username,
          Picturebrows,
          show:false,
          preview:false,
          brows:false,
          active,
          value,
          pdfcurrentPage,
          pageCount,
          fileType,
          listIndex,
          showUrlZ: '../static/dzyGuide.pdf',
          GroupNameList: [],
          OrderNameList: [],
          textarea: '',
          disabledD: true,
          feedBacklabel: ['非常满意', '满意', '一般', '不满意'],
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          },
          OrderStartTime: [],
          OrderEndTime: [],
          queryOrderType: '全部类型',
          // 普通用户的权限
          userRight: '',
          orderStatusIndex: 0,
          orderStatusGly: '',
          // 导入的信息
          msgInput: '',
          SlideIn: '',
          tableData3: [],
          multipleSelection: [],
          // 控制弹框显示隐藏
          dialogVisible: false,
          openFeedBackDialog: false,
          FeedBackFileName: '',
          hrefData: '../../../../static/fk_mb.doc',
          uploadDataF: '',
          fileDShow: true,
          FeedBackData: [],
          rowData: {},
          orderNameData: [],
          examineValue: [
            {
              value: 1,
              label: '审核通过'
            },
            {
              value: 2,
              label: '审核未通过'
            }
          ],
          FeedBackDataTow: [
            {
              value: '',
              label: '总体评价：'
            },
            {
              value: '',
              label: '响应时效：'
            },
            {
              value: '',
              label: '服务态度：'
            }
          ],
          dataStatus: ['-', '-', '-', '待提取', '-', '-', '提取完成'],
          applicant: '',
          orderNumber: '',
          optionsType: [
            {
              value: 0,
              label: '已有产品订单'
            },
            {
              value: 1,
              label: '常规需求订单'
            },
            {
              label: '再加工订单',
              value: 2
            },
            {
              value: '',
              label: '全部类型'
            }
          ],
          options: [
            {
              value: -1,
              label: '待提交'
            },
            {
              value: 0,
              label: '待审核'
            },
            {
              value: 1,
              label: '审核通过'
            },
            {
              value: 2,
              label: '审核未通过'
            },
            {
              value: 6,
              label: '数据准备完成'
            },
            {
              value: 7,
              label: '已完成'
            },
            {
              value: 5,
              label: '逾期'
            },
            {
              value: '',
              label: '所有状态'
            }
          ],
          thishtml: null,
          inputFeekBack: '',
          orderId: '',
          ordername: '',
          orderName: '',
          orderStatus: '',
          orderStatusInfo: '',
          total: null,
          currentPage: 1,
          pageSize: 10,
          dialogVisibledonw: false,
          arrDataFtp: [],
          title: '',
          comData: 0,
          usernamevalue: '',
          usernameNum: '',
          usernameNumData: '',
          loginName: '',
          optionUserName: [],
          orderDate_1: null,
          orderDate_0: null,
          queryOrderStatus: '所有状态',
          date1: '',
          aHref: '',
          spanLabelZ: '',
          orderstatusLabel: ['待审核', '审核通过', '审核未通过', '审核通过-待打包', '数据准备完成', '逾期', '数据准备完成', '已完成', '已反馈'],
          OrderStatusInput: [],
          UpgetMethod: [],
          upDataD: [
            {
              id: '6',
              label: '任务来源说明文件',
              file: []
            },
            {
              id: '7',
              label: '签字后的分发登记表',
              file: []
            },
            {
              id: '2',
              label: '介绍信',
              file: []
            },
            {
              id: '1',
              label: '身份证',
              file: []
            },
            {
              id: '4',
              label: '其他附件',
              file: []
            }
          ],
          formLabelAlign: {
            user: '',
            phone: '',
            company: '',
            employ: '',
            downloadWay: '2',
            disFrequency: '',
            delayInterval: '',
            extractionPaths: '',
            descriptor: '',
            getMethod: '在线下载',
            userCardId: ''
          },
          orderDetlia: {},
          uploadFileList: {
            taskDataCard: [], // 3：任务来源说明文件
            identityCard: [], // 1 身份证
            introductionLetter: [], // 2 介绍信
            otherDoc: [], // 4 其他
            regisForm: [] // 5：签字后的分发登记表
          },
          userProName: '',
          userName: '',
          restaurants: [],
          colorsZ: [
            {color: '#f56c6c', percentage: 20},
            {color: '#e6a23c', percentage: 40},
            {color: '#5cb87a', percentage: 60},
            {color: '#1989fa', percentage: 80},
            {color: '#6f7ad3', percentage: 100}
          ]
        }
    },
    methods:{
    //初始化权限加载，0用户权限，1管理者权限
           uView(){
            if(this.role === "0"){
                this.uv1 = true;
                this.uv2 = false;
                this.orderInit(0);
            }else{
                if(this.role === "1"){
                    this.uv1 = false;
                    this.uv2 = true;
                this.orderInit(5);
                }
            }
        },
    //订单赋值(不同页面不同订单)
          orderInit(active){
            if(active===0){
                this.orders = this.submitted;//页面数据显示待提交
            }
            if(active===1){
                this.orders = this.reviewedR0;//页面数据显示待审核
            }
            if(active===2){
                this.orders = this.approvedR0;//页面数据显示审核通过
            }
            if(active===3){
                this.orders = this.readyR0;//页面数据显示准备完成(权限0)
            }
            if(active===4){
                this.orders = this.unapprovedR0;//页面数据显示未通过(权限0)
            }
            if(active===5){
                this.orders = this.reviewedR1;//页面数据显示待审核（权限1）
            }
            if(active===6){
                this.orders = this.approvedR1;//页面数据显示审核通过（权限1）
            }
            if(active===7){
                this.orders = this.readyR1;//页面数据显示数据准备完成
            }
            if(active===8){
                this.orders = this.distribute;//页面数据显示分发完成
            }
          }
    //公共点击事件
        //修改事件
           ,reset(){
                this.userID = "userID";
                this.userPhone = "userPhone";
            },
        //判断是否为图片
        checkSuffix(str){
        var strRegex = /\.(jpg|png|gif|bmp|jpeg)$/;
        if (strRegex.test(str.toLowerCase())){
            this.preview = false;
            this.Picturebrows = true;
        } else{
            this.preview = false;
            this.searchShow = true;
        }
        },
        //pdf切换页面
         changePdfPage(val){
            if(val === 0 && this.pdfcurrentPage > 1){
                this.pdfcurrentPage--;
            }
            if(val === 1 && this.pdfcurrentPage < this.pageCount){
                this.pdfcurrentPage++;
            }
        },
        //pdf初始页面加载--第一页
           loadPdfHandler(e){
            this.pdfcurrentPage = 1;
        },
        //提交修改
        set(index,setIndex){
            if(setIndex === 0){
                this.username = this.resetValue;
                this.setView = false;
            }
            if(setIndex	=== 1){
                this.uphone = this.resetValue;
                this.setView = false;
            }
        },
       //选择值
        selectOption(Index){
                this.belongIndex = Index;
                this.select0 = false;
        }
        ,
        selectOptionLoad(Index){
                this.LoadIndex = Index;
                this.select1 = false;
        }
        ,
      dataQuert(){
        this.$router.push({
          path:'/dataQuert',
          query:{
            articleId: val.id
          }
        });
      },
      checkfile(str){//判断是否为其他文件
        var strRegex = /\.(jpg|png|gif|bmp|jpeg)$/;
        if (!strRegex.test(str.toLowerCase())){
          return true;
        } else{
          return false;
        }
      },

      beforeChange(val) {
        console.log(val,'标签栏')
        this.orderStatusIndex = this.options[val].value
        this.findOrderList()

      },
      handleEditBtg(index, row) {
        this.show = true
        this.inputFeekBack = ''
        this.orderStatus = row.orderStatus
        this.orderId = row.id
        this.ordername = row.ordername
      },
      handleEditTg(index, row) {
        this.inputFeekBack = ''
        this.orderStatus = row.orderStatus
        this.orderId = row.id
        this.ordername = row.ordername
        this.audit(index, row)
      },
      goSubmitData (val, string) {
        if (this.comData === 0 && this.orderStatusIndex === 2 && this.formLabelAlign.getMethod === this.orderDetlia.getMethod && this.formLabelAlign.user === this.orderDetlia.applyuser && this.formLabelAlign.phone === this.orderDetlia.applyUserPhone && this.formLabelAlign.proName === this.orderDetlia.productName && this.formLabelAlign.company === this.orderDetlia.applyUserUnit && this.formLabelAlign.employ === this.orderDetlia.applyUserUsed && this.textarea === this.orderDetlia.description
        ) {
          this.$toast.top('请更改信息！')
          return
        }
        if (this.formLabelAlign.user === '' || this.formLabelAlign.company === '' || this.formLabelAlign.getMethod === '' || this.formLabelAlign.proName === '' || this.formLabelAlign.employ === '' || this.formLabelAlign.phone === '') {
          this.$toast.top('必填项不能为空！')
        } else {
          if (this.tableData3.length > 0) {
            this.goSubmit(val, string)
          } else {
            this.$toast.top('订购数据不能为空！')
          }
        }
      },
      goSubmit (val, string) {
        if (val !== -1) {
          if (this.formLabelAlign.getMethod === '在线下载') {
            if (this.uploadFileList.taskDataCard.length === 0 || this.uploadFileList.identityCard.length === 0 || this.uploadFileList.introductionLetter.length === 0 || this.uploadFileList.regisForm.length === 0) {
              this.$toast.top('请上传必传项！')
            } else {
              this.getUpDataOrder(val, string)
            }
          } else {
            if (this.uploadFileList.taskDataCard.length === 0  || this.uploadFileList.identityCard.length === 0 || this.uploadFileList.regisForm.length === 0) {
              this.$toast.top('请上传必传项！')
            } else {
              this.getUpDataOrder(val, string)
            }
          }
        } else {
          this.getUpDataOrder(val, string)
        }
      },
      getUpDataOrder (val, string) {
        this.createOrder(val, string)
      },
      createOrder (val, string) {
        this.orderId = []
        this.shopfIds = []
        this.tableDataAll.forEach(item => {
          this.orderId.push(item.dataid)
          this.shopfIds.push(item.dataid)
        })
        if (this.basicOrderNation) {
          this.confirmOrder(val, string)
        } else {
          this.$toast.top('请输入正确的必填项！')
        }
      },
      openFullScreen () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return loading
      },
      confirmOrder (val, string) {
        this.openFullScreen()
        http.getagrsUpdateSave({data: {
            getMethod: this.formLabelAlign.getMethod, // 获取方式
            // userCardId: this.formLabelAlign.userCardId, // 身份证号
            deleteDataId: this.dataListDel, // 删除数据ID
            shopIds: this.orderId, // 余留数据ID
            sstatus: val,
            id: this.orderDetlia.id,
            cause: '',
            productName: this.formLabelAlign.proName, // 项目名称
            distmethod: this.formLabelAlign.getMethod === '在线下载' ? 0 : 2,
            description: this.textarea, // 备注
            applyUserUsed: this.formLabelAlign.employ, // 使用用途
            applyuser: this.formLabelAlign.user, // 申请人
            applyUserPhone: this.formLabelAlign.phone, // 申请人联系方式
            applyUserUnit: this.formLabelAlign.company, // 申请人单位
            // 不改变的属性
            type: 0, // 订单类型
            ordername: this.orderReference, // 订单名称
            userid: this.orderDetlia.userid,
            delaytime: this.orderDetlia.delaytime,
            userName: this.orderDetlia.userName,
            loginUser: this.orderDetlia.loginUser,
            groupName: this.orderDetlia.groupName,
            creattime: this.orderDetlia.creattime,
            dataType: this.orderDetlia.dataType
          }}).then(res => {
          if (res.data === 'true') {
            this.comData = 0
            this.upFileData(val, string)
          } else {
            this.closeFullScreen(this.openFullScreen())
            this.$toast.top('操作失败！')
          }
        })
      },
      closeFullScreen (loading) {
        loading.close()
      },
      upFileData (val, string) {
        let fileArr = this.uploadFileList.taskDataCard.concat(this.uploadFileList.regisForm, this.uploadFileList.introductionLetter, this.uploadFileList.identityCard, this.uploadFileList.otherDoc)
        if (this.orderDetlia.ordername) {
          http.updateOrderFileList(
            {data: {
                uploadFileList: fileArr,
                ordername: this.orderDetlia.ordername,
                id: this.orderDetlia.id,
                sstatus: val
              }}
          ).then(res => {
            this.closeFullScreen(this.openFullScreen())
            if (res.data === 'true') {
              this.$toast.top('操作成功！')
              /*if (val === 0) {
                this.setSpanLabel('待审核订单')
                this.$router.push({name: 'orderManage_stayAudit'})
              } else if (val === -1) {
                this.setSpanLabel('待提交订单')
                this.$router.push({name: 'orderManage_staySubmit'})
              } else if (val === 6) {
                this.setSpanLabel('数据准备完成订单')
                this.$router.push({name: 'orderManage_dataReadyFinish'})
              } else if (val === 7) {
                this.setSpanLabel('已完成订单')
                this.$router.push({name: 'orderManage_completeAudit'})
              }*/
            } else {
              this.$toast.top('操作失败！')
            }
          })
        }
      },
      audit (val, row) {
        console.log("row",row)
        http.auditOrder({
          data: {
            'cause': this.inputFeekBack,
            'orderid': this.orderId,
            'orderName': this.ordername,
            'status': val
          }
        }).then(res => {
          if (res.data) {
            this.$toast.top('审核通过')
            this.findOrderList()
            // this.goToNextR(val)
          } else {
            this.$toast.top('审核失败')
          }
        })
        this.show = false
      },
      findOrderList () {
        let statusIndex = ''
        if (this.orderStatusIndex === '') {
          statusIndex = this.orderStatusGly
        } else {
          statusIndex = this.orderStatusIndex
        }
        this.getUsernameNum()
        http.getManOrderListForPage({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          data: {
            type: 0,
            ordercode: this.orderNumber,
            sstatus: statusIndex,
            userName: this.usernameNum,
            groupName: this.applicant,
            applyuser: this.usernamevalue,
            loginName: this.loginName,
            // lessOrderStartTime: this.OrderStartTime === null ? null : this.OrderStartTime[0],
            // moreOrderStartTime: this.OrderStartTime === null ? null : this.OrderStartTime[1],
            lessCreattime: null,
            moreCreattime: null,
            lessCreattimeStr: null,
            moreCreattimeStr: null
            /*lessCreattime: this.OrderEndTime === null ? null : this.OrderEndTime[0],
            moreCreattime: this.OrderEndTime === null ? null : this.OrderEndTime[1],
            lessCreattimeStr: this.OrderEndTime === null ? null : this.commonMethod.timestampToTimeD(this.OrderEndTime[0]),
            moreCreattimeStr: this.OrderEndTime === null ? null : this.commonMethod.timestampToTimeD(this.OrderEndTime[1])
  */        }
        }).then(res => {
          res.data.list.forEach(item => {
            if (item.creattime) {
              item.creattime = item.creattime.replace('T', ' ')
            }
            // item.creattime = this.commonMethod.timestampToTime(item.creattime)
            if (!this.hasLetter(item.dataSum)) {
              item.dataSum = this.commonMethod.dataSizeFormatter(item.dataSum)
            }
            if (item.dataPercent) {
              item.dataPercent = JSON.parse(item.dataPercent)
            }
            if (item.sstatus === -1) {
              item.sstatus = -1
              item.statusLabel = '待提交'
            } else {
              item.statusLabel = this.orderstatusLabel[item.sstatus]
            }
          })
          console.log(res.data.list, 'res.data.list')
          this.tableData3 = res.data.list
          this.total = res.data.total
        }, (resq) => {
          this.tableData3 = []
          this.total = 0
        })
      },
      hasLetter: function (str) {
        for (var i in str) {
          var asc = str.charCodeAt(i)
          if ((asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122)) {
            return true
          }
        }
        return false
      },
      getUsernameNum () {
        if (this.usernameNum) {
          this.usernameNumData = this.usernameNum
        } else {
          this.usernameNumData = localStorage.getItem('userName')
          this.loginName = localStorage.getItem('loginName')
        }
      },
      getUserR () {
        let userID = JSON.parse(localStorage.getItem('principalUserID'))
        let userRote = JSON.parse(userID.principal)
        console.log(userID, 'userID')
        console.log(userRote, 'userRote')
        if (userRote.roleIds.length > 0) {
          if (userRote.roleIds[0].indexOf('管理员') > -1) {
            this.userProName = '管理员'
            this.userName = null
          } else {
            this.userProName = ''
            this.userName = userRote.userId
          }
        } else {
          this.userProName = ''
          this.userName = userRote.userId
        }
      },
      getDataIndex (val) {
        if (val === '待提交订单' || val === 'orderManage_staySubmit') {
          this.orderStatusIndex = -1
        } else if (val === '待审核订单' || val === 'orderManage_stayAudit') {
          this.orderStatusIndex = 0
        } else if (val === '审核通过订单' || val === 'orderManage_pastAudit') {
          this.orderStatusIndex = 1
        } else if (val === '审核未通过订单' || val === 'orderManage_onAudit') {
          this.orderStatusIndex = 2
        } else if (val === '已完成订单' || val === 'orderManage_completeAudit') {
          this.orderStatusIndex = 7
        } else if (val === '数据准备完成订单' || val === 'orderManage_dataReadyFinish') {
          this.orderStatusIndex = 6
        } else if (val === '逾期订单' || val === 'orderManage_unusualAudit') {
          this.orderStatusIndex = 5
        }  else if (val === '已反馈订单' || val === 'orderManage_feedback') {
          this.orderStatusIndex = 8
        } else if (val === '全部订单' || val === 'orderManage') {
          this.orderStatusIndex = ''
        }
      },
      getByOrderName () {
        let userID = JSON.parse(localStorage.getItem('principalUserID'))
        let userRote = JSON.parse(userID.principal)
        this.OrderNameList = []
        http.getOrderNameListByOrderName({
          luser: userRote.userId
        }).then(res => {
          if (res.data.records.length > 0) {
            res.data.records.forEach(item => {
              this.OrderNameList.push({
                value: item.F_ORDERNAME
              })
            })
          }
        })
      },
      getComNameList () {
        http.getagrsGroupNameList().then(res => {
          this.GroupNameList = []
          if (res.data.records.length > 0) {
            res.data.records.forEach(item => {
              this.GroupNameList.push({
                value: item.F_NAME
              })
            })
          }
        })
      },
      getDataUrlFJ () {
        http.agrsGetOrderOldFile({data: {ordername: this.orderDetlia.ordername}}).then(res => {
          if (res.data !== 'false') {
            this.buttonShow = true
            this.FJdataURl = res.data
          } else {
            this.buttonShow = false
          }
        })
      },
      getByOrderIdFileD (val) {
        http.getByOrderIdFile({orderId: val}).then(res => {
          if (res.data.length > 0) {
            this.UpgetMethod = res.data
            let arrList = ['', 'identityCard', 'introductionLetter', '', 'otherDoc', '', 'taskDataCard', 'regisForm']
            res.data.forEach(item => {
              this.uploadFileList[arrList[parseInt(item.type)]].push({
                filePath: item.fDataPath,
                fileName: item.fDataName,
                fileType: item.type
              })
              this.upDataD.forEach(e => {
                if (e.id === item.type) {
                  e.file.push(item)
                }
              })
            })
          }
        })
      },
    },
    created(){
          this.uView();

    },
  mounted () {
    this.active = 0
    this.userRight = sessionStorage.getItem('userRight')
    // let pathArr = this.$route.path.split('/')
    // this.getUserR()
    //let pathIndex = pathArr[pathArr.length - 1]
    //this.getDataIndex(pathIndex)
    if (this.$route.path.indexOf('Order') > -1) {
      this.findOrderList()
      //this.getByOrderName()
      this.getComNameList()
    }
    /* this.$nextTick(() => {
       // if (!this.$refs.mapDivDialogDe.innerHTML) {
       // this.baseMapInit()
       // }
       this.orderDetlia = JSON.parse(orderDataID)
       console.log(this.orderDetlia, 'this.orderDetlia')
       this.orderDetlia.creattime = this.commonMethod.setDateTime(this.orderDetlia.creattime)
       // this.getWktDataH(this.orderDetlia.id)
       // this.getTabelDataAll(this.orderDetlia.id, 1)
       this.getByOrderIdFileD(this.orderDetlia.id)
       this.orderReference = this.orderDetlia.ordername
       // this.basicOrderInfoD(this.orderDetlia) // 初始化属性值
       if (this.orderDetlia.sstatus !== 4) {
         this.getDataIndex(this.orderDetlia.sstatus)
       } else {
         this.getDataIndex(1)
       }
       this.getUserR()
       this.getDataUrlFJ()
     })*/
    /*orderManage.$on('test',(test)=>{
      console.log(test);
      this.orderData();
    })*/

  },
}
</script>

<!--eslint-disable-->
<style lang="scss" scoped>
*{
        padding: 0;
        margin: 0;
        list-style: none;
        box-sizing: border-box;
}
.contain{
    width: 100%;
    height: 100%;
    background: #F6F6F6;
}

.userPhone{
    color:#4675F1 !important;
}
.fixed{
    width: 0.33rem !important;
    height: 0.33rem !important;
    align-self: center !important;
}
.contain .examineBox{
    width: 100%;
    height: 14.45rem;
    position: fixed;
    top: 11.3%;
    box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
    overflow: scroll;
}
.contain .examineBoxs{
    width: 100%;
    height: 14.45rem;
    position: fixed;
    top: 11.3%;
    box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
    overflow: scroll;
}
.contain .examineBox .order{
    width: 92%;
    height: 12.57rem;
    margin-bottom: 1.88rem;
    margin-left: 0.4rem;
    box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
    background-color: #fff;
}
.contain .examineBox .order .oHead{
    width: 100%;
    height: 5.02rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.contain .examineBox .order .oHead .title{
    display: flex;
    justify-content: space-between;
}
.contain .examineBox .order .oHead .title span{
        align-self: center;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #727683;
        margin-right: 0.32rem;
}
.contain .examineBox .order .oHead .title .emty{
        height: 100%;
        display: flex;
}
.contain .examineBox .order .oHead .title .emty img{
    width: 0.53rem;
    height: 0.53rem;
    align-self: center;
    margin-left: 0.32rem;
}
.contain .examineBox .order .oHead .title .emty span{
    align-self: center;
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-left: 0.32rem;
}
.contain .examineBox .order .oHead .orderInfo {
    width: 100%;
    display: flex;
}
.contain .examineBox .order .oHead .orderInfo img{
    width: 2.73rem;
    height: 2.73rem;
    border-radius: 0.147rem;
    margin-left: 0.32rem;
}
.contain .examineBox .order .oHead .orderInfo ul{
    height: 2.73rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 0.267rem;
}
.contain .examineBox .order .oHead .orderInfo ul li span{
   display: block;
   border-radius: 0.373rem;
   background: rgba(216, 216, 216, 0.21);
   font-size: 0.293rem;
   font-family: PingFangSC-Regular, PingFang SC;
   font-weight: 400;
   color: rgba(123, 123, 123, 1);
   line-height: 0.4rem;

}
.contain .examineBox .order .oHead .orderInfo ul .shopID span{
    display: block;
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 0.533rem;
    background: none;
}
.contain .examineBox .order .oHead .orderInfo ul .shopdec span{
    display: block;
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.44rem;
    background: none;
}
.contain .examineBox .order .oHead .user{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.contain .examineBox .order .oHead .user  img{
    width: 0.59rem;
    height: 0.59rem;

}
.contain .examineBox .order .oHead .user .uphone{
    height: 100%;
    display: flex;
}
.contain .examineBox .order .oHead .user  span{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.44rem;
    align-self: center;
}
.contain .examineBox .order .oHead .user .uphone img{
    align-self: center;
    width: 0.33rem;
    height: 0.33rem;
    margin-right: 0.373rem;
}
.contain .examineBox .order .oHead .user .avaBox{
    height: 100%;
    display: flex;
}
.contain .examineBox .order .oHead .user .avaBox img{
    align-self: center;
    margin-left: 0.32rem;
    width: 0.59rem;
    height: 0.59rem;
    border: 1px solid rgba(255,255,255,0.36);
    border-radius: 50%;
    align-self: center;
}
.contain .examineBox .order .oHead .user .avaBox span{
    align-self: center;
    margin-left: 0.13rem;
}
.contain .examineBoxs .orders{
    width: 92%;
    height: 14.04rem;
    margin-bottom: 1.88rem;
    margin-left: 0.4rem;
    box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.contain .examineBoxs .orders .oHead{
    width: 100%;
    height: 5.02rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.contain .examineBoxs .orders .oHead .title{
    display: flex;
    justify-content: space-between;
}
.contain .examineBoxs .orders .oHead .title span{
        align-self: center;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #727683;
        margin-right: 0.32rem;
}
.contain .examineBoxs .orders .oHead .title .emty{
        height: 100%;
        display: flex;
}
.contain .examineBoxs .orders .oHead .title .emty img{
    width: 0.53rem;
    height: 0.53rem;
    align-self: center;
    margin-left: 0.32rem;
}
.contain .examineBoxs .orders .oHead .title .emty span{
    align-self: center;
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-left: 0.32rem;
}
.contain .examineBoxs .orders .oHead .orderInfo {
    width: 100%;
    display: flex;
}
.contain .examineBoxs .orders .oHead .orderInfo img{
    width: 2.73rem;
    height: 2.73rem;
    border-radius: 0.147rem;
    margin-left: 0.32rem;
}
.contain .examineBoxs .orders .oHead .orderInfo ul{
    height: 2.73rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 0.267rem;
}
.contain .examineBoxs .orders .oHead .orderInfo ul li span{

   border-radius: 0.373rem;
   background: rgba(216, 216, 216, 0.21);
   font-size: 0.293rem;
   font-family: PingFangSC-Regular, PingFang SC;
   font-weight: 400;
   color: rgba(123, 123, 123, 1);
   line-height: 0.4rem;

}
.contain .examineBoxs .orders .oHead .orderInfo ul .shopID span{
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 0.533rem;
    background: none;
}
.contain .examineBoxs .orders .oHead .orderInfo ul .shopdec span{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.44rem;
    background: none;
}
.contain .examineBoxs .orders .oHead .user{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.contain .examineBoxs .orders .oHead .user  img{
    width: 0.59rem;
    height: 0.59rem;

}
.contain .examineBoxs .orders .oHead .user .uphone{
    height: 100%;
    display: flex;
}
.contain .examineBoxs .orders .oHead .user  span{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.44rem;
    align-self: center;
}
.contain .examineBoxs .orders .oHead .user .uphone img{
    align-self: center;
    width: 0.33rem;
    height: 0.33rem;
    margin-right: 0.373rem;
}
.contain .examineBoxs .orders .oHead .user .avaBox{
    height: 100%;
    display: flex;
}
.contain .examineBoxs .orders .oHead .user .avaBox img{
    align-self: center;
    margin-left: 0.32rem;
    width: 0.59rem;
    height: 0.59rem;
    border: 1px solid rgba(255,255,255,0.36);
    border-radius: 50%;
    align-self: center;
}
.contain .examineBoxs .orders .oHead .user .avaBox span{
    align-self: center;
    margin-left: 0.13rem;
}
.contain .examineBox .order .oFuction{
    width: 100%;
    height: 6.02rem;
    display: flex;
    justify-content: center;
}
.contain .examineBox .order .oFuction ul{
    display: flex;
    flex-direction: column;
    width: 92.6%;
    height: 100%;
}
.contain .examineBox .order .oFuction ul li{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    background: rgba(216, 216, 216, 0.21);
}
.contain .examineBox .order .oFuction ul li span{
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    align-self: center;
    margin-left: 0.32rem;
}
.contain .examineBox .order .oFuction ul li img{
    width: 0.4rem;
    height: 0.4rem;
    align-self: center;
    margin-right: 0.32rem;

}
.contain .examineBoxs .orders .oFuctions{
    width: 100%;
    height: 6.02rem;
    display: flex;
    justify-content: center;
}
.contain .examineBoxs .orders .oFuctions ul{
    display: flex;
    flex-direction: column;
    width: 92.6%;
    height: 100%;
}
.contain .examineBoxs .orders .oFuctions ul li{
    width: 100%;
    height: 16.7%;
    display: flex;
    justify-content: space-between;
    background: rgba(216, 216, 216, 0.21);
}
.contain .examineBoxs .orders .oFuctions ul li span{
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    align-self: center;
    margin-left: 0.32rem;
}
.contain .examineBoxs .orders .oFuctions ul li img{
    width: 0.4rem;
    height: 0.4rem;
    align-self: center;
    margin-right: 0.32rem;

}
.contain .examineBoxs .orders .oFuctions .warning{
        width: 8.56rem;
        height: 1.07rem;
        background: rgba(255,0,0,0.1);
        border-radius: 0.16rem;
        border: 2px solid rgba(255,2,0,0.45);
        display: flex;
        margin-top: 0.213rem;
}
.contain .examineBoxs .orders .oFuctions .warning span{
        font-size: 0.373rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF4341;
        line-height: 0.533rem;
        align-self: center;
}
.contain .examineBox .order .oButtomBox {
    width: 100%;
    height: 1.53rem;
    display: flex;
}
.contain .examineBox .order .oButtomBox .small{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.contain .examineBox .order .oButtomBox .big{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
/***搬运区 */
.contain .reject{
        width: 100%;
        height: 1.47rem;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
.contain .reject .buttonBox{
        align-self: flex-end;
        margin-right: 0.4rem;
        margin-bottom: 0.333rem;
        margin-top: 0.333rem;
        box-shadow: 0px -1px 0px 0px #E5EBEE;
   }
 .contain .browsView{
        width: 100%;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
        border-radius: 6px;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
   }
 .contain .browsView img{
        width: 0.3rem;
        height: 0.4rem;
        align-self: flex-end;
        margin-right: 0.32rem;
        margin-top: 0.32rem;
   }
 .contain .browsView .view{
        display: flex;
        width: 100%;
        flex-direction: column;
   }
 .pdf{

        box-shadow: 0px -1px 0px 0px #E5EBEE;
        align-self: center;
   }
.contain .bouttonBox{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 0.4rem;
     }
.contain .bouttonBox span{
        font-size: 0.347rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 0.493rem;
        align-self: center;
     }
.contain .priFuction{
    width: 100%;
    height: 1.333rem;
    background: #FFFFFF;
    border-radius: 0.213rem 0.213rem 0px 0px;
    position: fixed;
    bottom: 1.413rem;
    left: 0;
    display: flex;
    justify-content: center;

   }
.contain .priFuction p{
    color: #4675F1;
   }
.contain .priCancel{
    width: 100%;
    height: 1.25rem;
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;

   }
.contain .picBrows {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
     }
.contain .picBrows .x{
        width: 0.4rem;
        height: 0.4rem;
        align-self: flex-end;
        margin-top: 0.24rem;
        margin-right: 0.24rem;
     }
.contain .picBrows .picView{
        width: 100%;
        display: flex;
        justify-content: center;
     }
.contain .picBrows .picView img{
        width: 80%;
        height: 9rem;
     }

.contain .picBrows .emty{
        width: 0.4rem;
        height: 0.4rem;
     }
.reject .van-button{
        width: 1.95rem;
        height: 0.8rem;
        background: #EAEDF3;
        border-radius: 0.427rem;
        border: none;
    }
.reject .van-button+.van-button{
        width: 1.95rem;
        height: 0.8rem;
       background: #4675F1;
        border-radius: 0.427rem;
        margin-left: 0.427rem;
    }
.van-field{
        width: 100%;
        height: 3.98rem;
        border-top-left-radius: 0.213rem;
        border-top-right-radius: 0.213rem;
        position: fixed;
        bottom: 1.47rem;
        left: 0;
        border: none;
        font-size:0.4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #CCCCCC;
        line-height: 0.56rem;
        padding-top: 0.32rem;
        padding-left: 0.4rem;
    }
.contain .fix{

}
.selects{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.selects p{
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height:0.56rem;
    align-self: center;
}
/**Vant 样式 */

.van-tabs{

/deep/ .van-tab{
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.533rem;
}
}
.van-tabs{
/deep/ .van-tab--active .van-tab__text--ellipsis{
    font-size: 0.48rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #517BF2;
    line-height: 0.67rem;
}
}
.van-tabs{
    /deep/ .van-tabs__line{
        width: 1.44rem;
        height: 0.08rem;
        background: #517BF2;
    }
}
/deep/ .van-tabs{
    width: 100% ;
    height: 9.6%;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px #E5EBEE;
}

.van-tabs{
    /deep/ .van-tabs__wrap{
        align-self: flex-end;
        position: relative;
        top: 31%;
    }
}
.contain .examineBox .order .oButtomBox .big .van-button{
    width: 1.93rem;
    height: 0.773rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
.contain .examineBox .order .oButtomBox .small .van-button{
    width: 1.71rem;
    height: 0.773rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
.contain .examineBox .order .oButtomBox .small .van-button + .van-button{
    background:#4675F1;
}
.contain .examineBox .order .oButtomBox .small .van-button + .van-button span{
    color: #FFFFFF !important;
}
.contain .examineBoxs .orders .oButtomBox-3 .small{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.contain .examineBoxs .orders .oButtomBox-3 .big{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.contain .examineBoxs .orders .oButtomBox-3 .big .van-button{
    width: 1.93rem;
    height: 0.773rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
.contain .examineBoxs .orders .oButtomBox-3 .small .van-button{
    width: 1.71rem;
    height: 0.773rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
#sub{
     background:#4675F1 !important;
}
 #subs{
    color: #FFFFFF !important;
}
.warningButton{
    background: #FFA7A7 !important;
}
#warningspan{
    color: #FF3D3D !important;
}
.small .van-button span{
    color: #8591AE !important;
}
.big .van-button span{
    color: #8591AE !important;
}
.oButtomBox-2{
    width: 100%;
    display: flex;
    height: 1.53rem;
}
.oButtomBox-2 .big{
    width: 100%;
    align-self: center;
    display: flex;
    justify-content: end;
    margin-right: 0.32rem;
}
.oButtomBox-2 .van-button{
    width: 1.93rem;
    height: 0.773rem;
    background: #EAEDF3;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
.oButtomBox-2 .van-button + .van-button{
    background:#4675F1;
    margin-left: 0.32rem;
}
.oButtomBox-2 .van-button + .van-button span{
     color: #FFFFFF !important;
}
.oButtomBox-3{
    width: 100%;
    height: 1.71rem;
    display: flex;

}
.van-button span{
    font-size: 0.347rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
}
.van-overlay p{
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height:0.56rem;
    align-self: center;
}
.contain .browsView .van-button{
    width: 1.93rem;
    height: 0.773rem;
    background: #4675F1;
    border-radius: 0.427rem;
    border: none;
    align-self: center;
}
  .shopID{
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .creatTime{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #727683;
  }
</style>
