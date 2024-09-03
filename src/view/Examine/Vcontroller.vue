<!--eslint-disable-->
<template>
  <div class="contain">
    <van-tabs  v-model="active" @change="beforeChange">
      <van-tab v-for="item in options" :title="item.label" :key="item.value">
        <!--<van-tab title="待审核">-->
        <div class="shopItem" >
          <div class="examineBox" v-for="item in tableData3">
            <div class="orderBox">
              <div class="orderID">
                  <img src="../../assets/images/order/1x/orderID.png"
                       srcset="../../assets/images/order/2x/orderIDx.png"
                       alt="商品图片"
                  />
                  <p class="shopID">{{item.ordername}}</p>
                <p class="creatTime">{{item.creattime}}</p>
              </div>
              <div class="orderInfo">
                <img src="../../assets/images/shop/orderele.png">
                <ul>
                  <li class="shopID"><span class="orderInfo__font orderInfo__font__large" >{{item.productName}}</span></li>
                  <li class="shopdec"><span class="orderInfo__font orderInfo__font__middle" >{{item.dataSum}} · {{item.dataCount}}景</span></li>
                  <li class="belong" v-if="(orderStatusIndex !== 2 && orderStatusIndex !== -1)"><span class="orderInfo__font"><span>{{item.applyUserUnit}}</span></span></li>
                  <li v-if="(orderStatusIndex !== 2 && orderStatusIndex !== -1)"><span class="back"><span class="orderInfo__font">{{item.getMethod}}</span></span></li>
                  <li class="belong" v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)"><span class="orderInfo__font" @click="updateCompany"><span>{{formLabelAlign.company === '' ? item.applyUserUnit:formLabelAlign.company}}</span></span></li>
                  <li v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)"><span @click="updateMethod"><span class="orderInfo__font" >{{formLabelAlign.getMethod === '' ? item.getMethod:formLabelAlign.getMethod}}</span></span></li>
                </ul>
              </div>
              <div class="user">
                <div class="avaBox">
                  <img class="avator" src="../../assets/images/order/2x/orderIDx.png"/>
                  <span class="userID">{{formLabelAlign.user === '' ? item.applyuser:formLabelAlign.user}}</span>
                  <img src="../../assets/images/order/1x/reset.png"
                       srcset="../../assets/images/order/2x/reset@2x.png"
                       @click="updateUser"
                       class="reset"
                       v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)"
                  >
                </div>
                <div class="emty">
                <span class="uphone">{{formLabelAlign.phone === '' ? item.applyUserPhone:formLabelAlign.phone}}</span>
                <img src="../../assets/images/order/1x/reset.png"
                     srcset="../../assets/images/order/2x/reset@2x.png"
                     @click="updatePhone"
                     class="reset"
                     v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)"
                >
                </div>
              </div>
            </div>
            <div class="fuctionBox">
              <ul v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)">
                <li class="meiaBox" ><span class="font font__margin_1" >任务来源说明</span>
                  <div class="icon" >
                    <van-field class="van-field__icon"  >
                      <template #input>
                        <van-uploader
                          v-model="uploadFileList.taskDataCard"
                          :before-read="beforeRead3"
                          :after-read="afterRead1"
                          :before-delete="beforeDelete3"
                          accept="image/*,.pdf"
                          multiple :max-count="1"
                        >
                        <img  :src="imgUrl[index].url"  @click="fileClick3(index)"/>
                        </van-uploader>
                      </template>
                    </van-field>
                    <!--<img @click="open"  src="../../../../assets/images/shop/upload.png" />-->
                  </div></li>
                <li class="meiaBox" ><span class="font font__margin_1" >签字后数字分发</span>
                  <div class="icon" >
                    <van-field>
                      <template #input>
                        <van-uploader
                          v-model="uploadFileList.regisForm"
                          :before-read="beforeRead3"
                          :after-read="afterRead2"
                          :before-delete="beforeDelete3"
                          accept="image/*,.pdf"
                          multiple :max-count="1"
                        >
                        <img  :src="imgUrl[index].url"  @click="fileClick3(index)"/>
                        </van-uploader>
                      </template>
                    </van-field>
                    <!--<img @click="open"  src="../../../../assets/images/shop/upload.png" />-->
                  </div></li>
                <li class="meiaBox" ><span class="font font__margin_1" >介绍信</span>
                  <div class="icon" >
                    <van-field>
                      <template #input>
                        <van-uploader
                          v-model="uploadFileList.introductionLetter"
                          :before-read="beforeRead3"
                          :after-read="afterRead3"
                          :before-delete="beforeDelete3"
                          accept="image/*,.pdf"
                          multiple :max-count="1"
                        >
                        <img  :src="imgUrl[index].url"  @click="fileClick3(index)"/>
                        </van-uploader>
                      </template>
                    </van-field>
                    <!--<img @click="open"  src="../../../../assets/images/shop/upload.png" />-->
                  </div></li>
                <li class="meiaBox" ><span class="font font__margin_1" >身份证</span>
                  <div class="icon" >
                    <van-field>
                      <template #input>
                        <van-uploader
                          v-model="uploadFileList.identityCard"
                          :before-read="beforeRead3"
                          :after-read="afterRead4"
                          :before-delete="beforeDelete3"
                          accept="image/*,.pdf"
                          multiple :max-count="1"
                        >
                        <img  :src="imgUrl[index].url"  @click="fileClick3(index)"/>
                        </van-uploader>
                      </template>
                    </van-field>
                    <!--<img @click="open"  src="../../../../assets/images/shop/upload.png" />-->
                  </div></li>
                <li class="meiaBox"><span class="font font__margin_1" >其他</span>
                  <div class="icon" >
                    <van-field>
                      <template #input>
                        <van-uploader
                          v-model="uploadFileList.otherDoc"
                          :before-read="beforeRead3"
                          :after-read="afterRead5"
                          :before-delete="beforeDelete3"
                          accept="image/*,.pdf"
                          multiple :max-count="1"
                        >
                        <img  :src="imgUrl[index].url"  @click="fileClick3(index)"/>
                        </van-uploader>
                      </template>
                    </van-field>
                    <!--<img @click="open"  src="../../../../assets/images/shop/upload.png" />-->
                  </div>
                </li>
              </ul>
              <ul v-if="(orderStatusIndex !== 2 && orderStatusIndex !== -1)">
                <li class="meiaBox" ><span class="font font__margin_1" >任务来源说明</span>
                  <img class="search" src="../../assets/images/order/1x/Search@1x.png"
                       srcset="../../assets/images/order/2x/Search@2x.png"
                       @click="renwuShow"
                  /></li>
                <li class="meiaBox"  ><span class="font font__margin_1" >签字后数字分发</span>
                  <img class="search"
                       src="../../assets/images/order/1x/Search@1x.png"
                       srcset="../../assets/images/order/2x/Search@2x.png"
                       @click="qianziShow"
                  /></li>
                <li class="meiaBox" ><span class="font font__margin_1" >介绍信</span>
                  <img class="search"
                       src="../../assets/images/order/1x/Search@1x.png"
                       srcset="../../assets/images/order/2x/Search@2x.png"
                       @click="jsxShow"
                  /></li>
                <li class="meiaBox" ><span class="font font__margin_1" >身份证</span>
                  <img class="search"
                       src="../../assets/images/order/1x/Search@1x.png"
                       srcset="../../assets/images/order/2x/Search@2x.png"
                       @click="sfzShow"
                  /></li>
                <li class="meiaBox" ><span class="font font__margin_1" >其他</span>
                  <img class="search"
                       src="../../assets/images/order/1x/Search@1x.png"
                       srcset="../../assets/images/order/2x/Search@2x.png"
                       @click="qitaShow"
                  /></li>
              </ul>
              <van-overlay  :show="preview">
                <div class="preview preview__radius preview__positaion__pre" @click="checkSuffix(item.fileDataArr)" >
                  <p>预览</p>
                </div>
                <div class="preview preview__positaion" @click="preview = false">
                  <p>取消</p>
                </div>
              </van-overlay>
              <!---图片预览--->
              <van-overlay :show="Picturebrows" >
                <div class="picBrows">

                    <img class="x"
                         src="../../assets/images/order/1x/形状结合.png"
                         srcset="../../assets/images/order/2x/形状结合@2x.png"
                         @click="Picturebrows = false"
                    />

                    <img class="priImg" :src="filePathUrl">
                </div>
              </van-overlay>
              <!---PDF预览--->
              <van-overlay :show="searchShow">
                <div class="browsView" >
                  <img class="x"
                       src="../../assets/images/order/1x/形状结合.png"
                       srcset="../../assets/images/order/2x/形状结合@2x.png"
                       @click="searchShow = false"
                  />

                      <pdf
                        :src="filePathUrl"
                        :page="pdfcurrentPage"
                        @num-pages = "pageCount=$event"
                        @page-loaded = "pdfcurrentPage = $event"
                        @loaded = "loadPdfHandler"
                      ></pdf>


                  <div class="bouttonBox">
                    <van-button type="info" @click="changePdfPage(0)"><span>上一页</span></van-button>
                    <span>第{{pdfcurrentPage}}页/共{{pageCount}}页</span>
                    <van-button type="info" @click="changePdfPage(1)" ><span>下一页</span></van-button>
                  </div>
                </div>
              </van-overlay>
              <!--修改-->
              <van-overlay :show="setView">
                <div class="fix" >
                  <van-cell-group class="preview__positaion__INPUT" >
                    <van-field v-model="resetValue" placeholder="请输入修改内容" />
                  </van-cell-group>
                  <div class="reject preview__positaion preview__radius">
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
            <div class="warning" v-if="((orderStatusIndex === 2 && item.cause) || (item.sstatus === 2 && item.cause))">
              <span>{{item.cause}}</span>
            </div>
            <div class="BouttonBox">
              <div class="Boutton-1" >
                <!--<van-button type="info" @click="handleEditBtg(2, item)"><span>驳回</span></van-button>
                  <van-button type="info" @click="handleEditTg(1, item)"><span>通过</span></van-button>-->
                <van-button type="info" v-if="(orderStatusIndex === 0 || item.sstatus === 0) && userProName === '管理员'"  @click="handleEditBtg(2, item)" ><span>驳回</span></van-button>
                <van-button type="info" v-if="(orderStatusIndex === 0 || item.sstatus === 0) && userProName === '管理员'"  @click="handleEditTg(1, item)"><span>通过</span></van-button>
              </div>
              <div class="Boutton-2" >
                <van-button class="van-button__white" type="info" @click="goSeeUl(item)"><span class="font__boutton__color" >查看列表</span></van-button>
                <van-button class="van-button__white" type="info" @click="dataQuert(item)"><span class="font__boutton__color">数据分布</span></van-button>
                <van-button v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)" type="info" @click="goSubmitData(-1,item)"><span>保存</span></van-button>
                <van-button v-if="(orderStatusIndex === 2 || orderStatusIndex === -1)" type="info" @click="goSubmitData(0,item)" ><span>提交</span></van-button>
              </div>
              <!-- <div class="Boutton-3">
                              <van-button type="info" @click="goSubmitData(0)" ><span>提交</span></van-button>
                              <van-button type="info" @click="goSubmitData(-1)"><span>保存</span></van-button>
                            </div>-->
            </div>
            <van-overlay :show="show">
              <van-cell-group>
                <van-field v-model="handleEditBtg"  placeholder="请输入驳回理由" />
              </van-cell-group>
              <div class="reject">
                <div class="buttonBox">
                  <van-button type="info" @click="show = false"><span>取消</span></van-button>
                  <van-button type="info" @click="audit(2,item)"><span>提交</span></van-button>
                </div>
              </div>
            </van-overlay>
          </div>
        
          <tabBar :barIndex="barIndex" />
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<!--eslint-disable-->
<script>
  import tabBar from '@/components/tabBar.vue'
  import pdf from 'vue-pdf'
  import http from '@/service/interface'
  export default {
    components:{
      tabBar,
      pdf
    },
    data() {
      const shopImage = {
        shopID: "20220202WP00001",
        shopName: "高分辨率对地观测系统重大专项",
        createTime: "2020-02-02",
        createUser: "云炎强(yunyanqiang)"
      };
      let value = "";
      let fileUrl = ["xx.jpg", "xx.doc", "xx.docx", "xx.pdf", "xx.jpg", "xx.png", "xxx.jpeg"];
      let file = true;
      let picture = false;
      let pdfSrc = "../../assets/images/prePDF/创业计划书——李卓然.pdf"
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
      return {
        imgUrl,
        barIndex: 2,
        resetValue: '',
        pageCount: 0,
        setIndex: 0,
        filePathUrl: '',
        select1: false,
        file,
        picture,
        show: false,
        preview: false,
        brows: false,
        active: 7,
        shopImage,
        value,
        fileUrl,
        pdfSrc,
        listIndex: 0,
        fileArr: [],
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
        basicOrderNation: true,
        inputFeekBack: '',
        orderId: '',
        ordername: '',
        orderName: '',
        orderStatus: '',
        orderStatusInfo: '',
        total: null,
        pdfcurrentPage: 1,
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
            file: ''
          },
          {
            id: '7',
            label: '签字后的分发登记表',
            file: ''
          },
          {
            id: '2',
            label: '介绍信',
            file: ''
          },
          {
            id: '1',
            label: '身份证',
            file: ''
          },
          {
            id: '4',
            label: '其他附件',
            file: ''
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
        Picturebrows: false,
        select0: false,
        setView: false,
        searchShow: false,
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
    methods: {
      afterRead1(file) {
        this.afterReadFun(file, this.fileList, 6);
      },
      afterRead2(file) {
        this.afterReadFun(file, this.fileList, 7);
      },
      afterRead3(file) {
        this.afterReadFun(file, this.fileList, 2);
      },
      afterRead4(file) {
        this.afterReadFun(file, this.fileList, 1);
      },
      afterRead5(file) {
        this.afterReadFun(file, this.fileList, 4);
      },
      async afterReadFun(file, fileList, ftype) {
        // this.loadingShow = true;
        file.status = "uploading";
        file.message = "上传中...";
        let arrlist = {}
        let fileName = ''
        let filePath = ''
        let fileType = ''
        const tempFile = file.file;
        const size = tempFile.size;
        const type = tempFile.type;
        const newName = tempFile.name;
        let uploadFile = new File([tempFile], newName, {type, size});
        let formData = new FormData();
        formData.append("file", uploadFile);
        let num = 0;
        setTimeout(() => {
          if (num === 0) {
            this.$notify({
              type: "danger",
              message: "上传时间过长请重试",
            });
            file.status = "failed";
            file.message = "上传失败";
          }
          console.log(num);
        }, 500000);
        await http.getFileUpload(formData).then((res) => {
          if (res.status === 200) {
            num = 1;
            file.status = "";
            let othername = res.data.split('/')
            arrlist = {
              fileName : othername[othername.length - 1],
              filePath : res.data,
              fileType : ftype
            }
            this.fileArr.push(arrlist)
          } else {
            this.$notify({
              type: "danger",
              message: "上传失败请重试",
            });
            file.status = "failed";
            file.message = "上传失败";
          }
        });
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
          this.formLabelAlign.user = this.resetValue;
          this.setView = false;
        }
        if(setIndex	=== 1){
          this.formLabelAlign.phone = this.resetValue;
          this.setView = false;
        }
        if(setIndex	=== 2){
          this.formLabelAlign.company = this.resetValue;
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
        let value = (Index === 0? '在线下载': '离线下载')
        this.formLabelAlign.getMethod = value
        this.select1 = false;
      }
      ,
      dataQuert(val) {
        this.$router.push({
          path:'/dataQuert',
          query:{
            articleId: val.id
          }
        });
      },
      goSeeUl(val){
        this.$router.push({
          path:'/seeUl',
          query:{
            articleId: val.id
          }
        });
      },
      //判断是否为图片
      checkSuffix(str){
        this.filePathUrl = ''
        str = str[this.listIndex].file
        this.filePathUrl = str
        var strRegex = /\.(jpg|png|gif|bmp|jpeg)$/;
        if (strRegex.test(str.toLowerCase())){
          this.preview = false;
          this.Picturebrows = true;
        } else{
          this.preview = false;
          this.searchShow = true;
        }
      },
      beforeChange(val) {
        console.log(val,'标签栏')
        this.orderStatusIndex = this.options[val].value
        this.findOrderList()

      },
      checkfile(str) {
        var strRegex = /\.(jpg|png|gif|bmp|jpeg)$/;
        if (!strRegex.test(str.toLowerCase())) {
          return true;
        } else {
          return false;
        }
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
        /*if (this.comData === 0 && string.sstatus === 2 && this.formLabelAlign.getMethod === this.orderDetlia.getMethod && this.formLabelAlign.user === this.orderDetlia.applyuser && this.formLabelAlign.phone === this.orderDetlia.applyUserPhone && this.formLabelAlign.proName === this.orderDetlia.productName && this.formLabelAlign.company === this.orderDetlia.applyUserUnit && this.formLabelAlign.employ === this.orderDetlia.applyUserUsed && this.textarea === this.orderDetlia.description
        ) {
          this.$toast.top('请更改信息！')
          return
        }*/
        if (this.formLabelAlign.user === '' || this.formLabelAlign.company === '' || this.formLabelAlign.getMethod === '' ||  this.formLabelAlign.phone === '') {
          this.$toast.top('必填项不能为空！')
        } else {
          if (this.tableData3.length > 0) {
            this.goSubmit(val, string)
          } else {
            this.$toast.top('订购数据不能为空！')
          }
        }
      },
      renwuShow() {
        this.preview = true;
        this.listIndex=0
      },
      qianziShow() {
        this.preview = true;
        this.listIndex=1
      },
      sfzShow() {
        this.preview = true;
        this.listIndex=3
      },
      jsxShow() {
        this.preview = true;
        this.listIndex=2
      },
      qitaShow() {
        this.preview = true;
        this.listIndex=4
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
        this.getTabelDataAll(val, string)

      },
      getTabelDataAll (val,string) {
        http.getagrsListOfSate({
          data: {orderid: string.id}
        }).then(res => {
          console.log(res, 'vControllData')
          //gisMapDiaDe.featuresSourceAllImage.clear()
          this.shopfIds = []
          if (res.data.list.length > 0) {
            res.data.list.forEach((item, index) => {
              item.imageurl = '/mj/metaImage/getImageByTypeForAll?typeId=2&dataId=' + item.did + '&nodeId=' + item.nodeid
              item.datasize = this.commonMethod.dataSizeFormatter(item.datasize)
              item.scenedate = this.commonMethod.timestampToTime(item.scenedate)
              item.receivetime = item.receivetime.replace('T', ' ')
              item.isSelect = false
              this.shopfIds.push(item.dataid)
              //this.zoomto(item.wktresponse, index)
              //this.wktData.push(item.wktresponse)
            })
            this.shopTableData = res.data.list
            this.shopTotal = res.data.list.length
            this.createOrder(val,string)
          }
        })
      },
      createOrder (val, string) {
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
        console.log(string.creattime)
        if(string.creattime){
        string.creattime = string.creattime.replace(/\s+/g, 'T')
        string.creattime = string.creattime + 'Z'
        }
        this.openFullScreen()
        http.getagrsUpdateSave({data: {
            getMethod: this.formLabelAlign.getMethod, // 获取方式
            // userCardId: this.formLabelAlign.userCardId, // 身份证号
            deleteDataId: [], // 删除数据ID
            shopIds: [], // 余留数据ID
            sstatus: val,
            id: string.id,
            cause: '',
            productName: this.formLabelAlign.proName === '' ?string.productName:this.formLabelAlign.proName,// 项目名称
            distmethod: this.formLabelAlign.getMethod === '在线下载' ? 0 : 2,
            description: this.textarea, // 备注
            applyUserUsed: this.formLabelAlign.employ === '' ?string.applyUserUsed:this.formLabelAlign.employ, // 使用用途
            applyuser: this.formLabelAlign.user, // 申请人
            applyUserPhone: this.formLabelAlign.phone, // 申请人联系方式
            applyUserUnit: this.formLabelAlign.company, // 申请人单位
            // 不改变的属性
            type: 0, // 订单类型
            ordername: string.ordername, // 订单名称
            userid: string.userid,
            delaytime: string.delaytime,
            userName: string.userName,
            loginUser: string.loginUser,
            groupName: string.groupName,
            creattime: string.creattime,
            dataType: string.dataType
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
        let dataname = []
        dataname.push(string.ordername)
        console.log(string.ordername, 'string.ordername')
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        //let fileArr = this.uploadFileList.taskDataCard.concat(this.uploadFileList.regisForm, this.uploadFileList.introductionLetter, this.uploadFileList.identityCard, this.uploadFileList.otherDoc)
        if (dataname) {
          http.getagrsSaveFiles(
            {data: {
                uploadFileList: this.fileArr,
                orderNames: dataname,
                sstatus: val
              }}
          ).then(res => {
            loading.close()
            if (res.data) {
              this.$toast.top(val === 0 ?'提交成功！' : '保存成功',)
              if (val === 0) {
                //this.setSpanLabel('待审核订单')
                this.findOrderList()
                //this.$router.push({path: '/Order'})
              } else {
                this.findOrderList()
                //this.setSpanLabel('待提交订单')
                //this.$router.push({path: '/Order'})
              }
              // this.getShopCarNum()
            } else {
              this.$toast.top(val === 0 ?'提交失败！' : '保存失败',)
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
      updateCompany() {
        this.setIndex= 2
        this.setView = true
      },
      updateMethod() {
        this.select1 = true
      },
      updateUser() {
        this.setIndex= 0
        this.setView = true
      },
      updatePhone() {
        this.setIndex= 1
        this.setView = true
      },
      findOrderList () {
        let fileData = ''
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
            this.getByOrderIdFileD(item.id).then((file) => {
              console.log(file)
              item.fileDataArr = file
            })
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
      async getByOrderIdFileD (val) {
        const res = await http.getByOrderIdFile({orderId: val})
        let _this = this
        if (res.data.length > 0) {
          let datapath = ''
          let arrList = []
          res.data.forEach(item => {
            _this.upDataD.forEach(e => {
              if (e.id === item.type) {
                e.file = item.fDataPath
              }
            })
          })
          return _this.upDataD
        } else {
          return []
        }
      },
     
    },
    mounted () {
      this.userRight = sessionStorage.getItem('userRight')
      // let pathArr = this.$route.path.split('/')
      this.getUserR()
      //let pathIndex = pathArr[pathArr.length - 1]
      //this.getDataIndex(pathIndex)
      if (this.$route.path.indexOf('Order') > -1) {
        this.findOrderList()
        this.getByOrderName()
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
<style scoped>
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  :root{
    --fontSize-small:0.32rem;
    --fontSize-large: 0.373rem;
    --fontSize-small--color: #333333;
    --fontSize-large--color: #727683;
    --fontSize-small--weight: 400;
    --fontSize-large--weight: 500;
    --fontSize-large--light: 0.533rem;
    --fontSize-small--lhight: 0.44rem;
    --ceshiColor: blue;
  }
  .contain{
    width: 100vw;
    height: 100%;
    background: #F6F6F6;
    overflow: hidden;
  }
  /*订单浏览区*/
  .shopItem{
    width: 100vw;
    height: 82vh;
    position: fixed;
    top: 1.8rem;
    left: 0;
    overflow-Y: scroll;
    overflow-x: hidden;
  }
  /**订单样式*/
  .examineBox{
    margin: 0 auto;
    width: 9.2rem;
    height: 12.58rem;
    background-color: white;
    box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.01);
    border-radius: 6px;
    margin-bottom: 1.8rem;
  }
  /***订单标题栏*/
  .orderID{
    width: 100%;
    height: 1.17rem;
    display: flex;
    justify-content: space-between;
  }
  .orderID > img{
    margin-left: 0.32rem;
    width: 0.533rem;
    height: 0.533rem;
    align-self: center;
  }
  .orderID > .shopID{
    font-size: 0.373rem;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #333333;
    align-self: center;
    position: relative;
    left: -0.38rem;
  }
  .orderID > .creatTime{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #727683;
    align-self: center;
    position: relative;
    right: 0.32rem;
  }
  /***订单信息栏*/
  .orderInfo{
    width: 100%;
    display: flex;

  }
  .orderInfo > img{
    width: 2.73rem;
    height: 2.73rem;
    border-radius: 0.08rem;
    align-self: center;
    margin-left: 0.32rem;
    margin-top: 0.2rem;
  }
  .orderInfo > ul{
    margin-left: 0.36rem;
    align-self: center;
  }
  .orderInfo__font{
    font-size: 0.293rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #7B7B7B;
    line-height: 0.4rem;
    background-color: #D8D8D8;
    border-radius: 0.373rem;
  }
  .orderInfo__font__large{
    font-size: 0.373rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.533rem;
    background-color: initial;
  }
  .orderInfo__font__middle{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.44rem;
    background-color: initial;
  }
  /***用户栏*/
  .user{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.346rem;
    padding-right: 0.32rem;
  }
  .avaBox{
    display: flex;
    margin-left: 0.32rem;
  }
  /****头像*/
  .avaBox > img{
    width: 0.59rem;
    height: 0.59rem;
    border-radius: 50%;
    background: #F2F2F2;
    align-self: center;
  }
  /****用户名*/
  .userID{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.44rem;
    align-self: center;
    margin-left: 0.133rem;
  }
  /****手机号*/
  .uphone{
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.44rem;
    align-self: center;
  }
  /****编辑*/
  .reset{
    width: 0.333rem !important;
    height: 0.333rem !important;
    align-self: center;
    margin-left: 0.173rem;
    margin-right: 0.373rem;
  }
  /****占位盒*/
  .emty{
    display: flex;
  }
  /****常用字体样式以及变种*/
  .font{
    font-size: 0.373rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.533rem;
    align-self: center;
  }
  .font__boutton__color{
    /*color: #8591AE;*/
  }
  .font__margin_1{
    margin-left: 0.32rem;
  }
  /***媒体盒子media*/
  .meiaBox{
    width: 8.56rem;
    height: 1.205rem;
    display: flex;
    justify-content: space-between;
    background-color: rgba(216, 216, 216, 0.21);

  }
  .meiaBox > .search{
    width: 0.533rem;
    height: 0.533rem;
    align-self: center;
    margin-right: 0.32rem;
  }
  /****media--照片图片周围区域*/
  .meiaBox  .icon /deep/ .van-uploader{
    width: 1.2rem;
      height: 1.2rem;
      background-color:rgba(216, 216, 216, 0.21);
  }
  .meiaBox  .icon /deep/ .van-uploader__wrapper {
    display: flex;
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.1rem;
    background-color: rgba(216, 216, 216, 0);
  }
  /****media照片图片（icon图标）*/
  .meiaBox  .icon /deep/ .van-icon {
    margin-bottom: 0.85rem;
  }
  .meiaBox  .icon /deep/ .van-uploader__upload{
    background-color: rgba(216, 216, 216, 0);
  }
  .meiaBox  .icon /deep/ .van-uploader__file{
    width: 1.2rem;
    height: 1.2rem;
    background-color:rgba(216, 216, 216, 0);
    margin-top: 0.53rem;
    position: relative;
    right: 0.1rem;
  }
  .meiaBox  .icon /deep/ .van-uploader__preview{
    position: initial;
  }
  .fuctionBox > ul{
    width: 100%;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    margin-top: 0.33rem;
  }
  /***页面底部乘放弹窗盒子*/
  .BouttonBox{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1.2rem;
    padding-left: 0.5rem;
  }
  .BouttonBox > *{
    display: flex;
  }
  .BouttonBox .van-button{
    align-self: center;
    margin-left: 0.32rem;
  }
  /****按钮样式*/
  .van-button{
    width: 1.93rem;
    height: 0.773rem;
    background: #4675F1;
    border-radius: 0.427rem;
  }
  .van-button__white{
    /*background: #EAEDF3;*/
    border: none;
  }
  /*导航栏样式*/
 /deep/ .van-tabs__line{
    z-index: 0 !important;
    background-color: rgba(81, 123, 242, 1) !important;
  }
 /***选中字体*/
  /deep/ .van-tab--active{
    font-size: 0.48rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #517BF2;
    line-height: 0.667rem;
    overflow-y: scroll;
  }
  /*遮罩层公用样式*/
  .van-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    opacity: initial;
    overflow-y: scroll;
  }
  /**预览遮罩层*/
  .preview{
    width: 100vw;
    background-color: #FFFFFF;
    height: 1.25rem;
    padding-top: 0.31rem;

  }
  .preview > p {
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.56rem;
    margin-left: 45vw;
    letter-spacing: 0.1rem;
  }
  .preview__radius{
    border-radius: 16px 16px 0px 0px;
  }
  .preview__radius > p {
    color: rgba(70, 117, 241, 1);
  }
  .preview__positaion{
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .preview__positaion__pre{
    position: fixed;
    left: 0;
    bottom: 1.41rem;
  }
  .preview__positaion__INPUT{
    position: fixed;
    left: 0.32REM;
    bottom: 2.61rem;
    z-index: 2;
  }
  /******遮罩层关闭按钮*/
  .x{
    width: 0.4rem;
    height: 0.5rem;
    position: fixed;
    right: 0.72rem;
    top: 0.42rem;
    z-index: 10;
  }
  .priImg{
    margin-left: 10vw;
    margin-top: 28vh;
    width: 80vw;
    height: 40vh;
  }
  /**PDF预览面板*/
  .browsView{
    width: 90vw;
    height: 80vh;
    background-color: #ffffff;
    position: fixed;
    top: 10vh;
    left: 5vw;
    z-index: 10;
    overflow: scroll;
  }
  .browsView > .bouttonBox{
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0.32rem;
  }
  .browsView  .bouttonBox > .van-button{
    align-self: center;
    margin-left: 0.7rem;
  }
  /**修改面板*/
  .reject{
    width: 100vw;
    height: 20vh;
    background-color: white;
  }
  .reject > .buttonBox{
    width: 100%;
    position: absolute;
    bottom: 0.32rem;
    display: flex;
    justify-content: end;
  }
  .reject  .buttonBox > .van-button{
    margin-right: 0.32rem;
  }
</style>
