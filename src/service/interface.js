import { http } from './request.js'
export default {
  // login
  loginByUsername: (params) => http.postAxios('/dandian/login/loginForm', params),
  // login
  loginByUsernameDZY: (params) => http.postAxios('/dandian/login/loginForm', params),
  // loginByToken
  loginByToken: (params) => http.postAxios('/system/login/loginByToken', params),
  // 资料-加入购物车
  addAgrsSave: (params) => http.postAxios('/mj/agrsShop/agrsSave', params),
  // 审核订单
  auditOrder: (params) => http.postAxios('/mj/agrsOrder/agrsAudit', params),
  // 管理员订单
  getManOrderListForPage: (params) => http.postAxios('/mj/agrsOrder/agrsList', params),
  // 获取订单编号
  getOrderNameListByOrderName: (params) => http.getAxios('/mj/agrsOrder/agrsOrderNameListByOrderName', params),
  // 获取申请单位
  getagrsGroupNameList: (params) => http.postAxios('/mj/agrsOrder/agrsGroupNameList', params),
  // 订单数据列表查看
  getagrsListOfSate: (params) => http.postAxios('/mj/agrsOrderData/agrsListOfSate', params),
  // 订单数据属性修改
  getagrsUpdateSave: (params) => http.postAxios('/mj/agrsOrder/agrsUpdateSave', params),
  // logout
  logout: (params) => http.postAxios('/dandian/login/logout', params),
  // 订单数据附件信息修改
  updateOrderFileList: (params) => http.postAxios('/mj/agrsOrder/updateOrderFileList', params),
  // 验证查询数据是否有在购物车
  checkMeansInShopByIds: (params) => http.postAxios('/mj/agrsShop/checkMeansInShopByIds', params),
  postSaveUserBehavior: (params) => http.postAxios('/mj/userBehavior/saveUserBehavior', params),
  logoutNew: (params) => http.postAxios('/system/login/logoutNew', params),
  // 获取用户信息
  getUserInfo: (params) => http.getAxios('/dandian/user/userInfo', params),
  // 验证token是否过期
  getToken: (params) => http.getAxios('/sso/ssoserver/moc2/me', params),
  getImg: (params) => http.getAxios('/mj/metaImage/getImageByTypeForAll', params),
  // 用户注册
  registerUser: (params) => http.postAxios('/dandian/user/registerUser', params),
  // 获取userid
  getUserIdByLoginName: (params) => http.postAxios('/mj/agrsOrder/getUserIdByLoginName', params),
  // 删除用户
  deleteTokenByUserName: (params) => http.postAxios('/mj/agrsOauthAccessTokenController/deleteTokenByUserID', params),
  // 获取城市级别联动
  getAreaCode: (params) => http.getAxios('/bupt/agrsArea/get', params),
  findQuery: (params) => http.postAxios('/mj/agrsQueryModuleSpatial/findAgrsPageList', params),
  // 查询接口
  findPageQueryByNodes: (params) => http.postAxios('/mj/agrsQueryModuleSpatial/findAgrsPageListNodes', params),
  findCoverage: (params) => http.postAxios('/mj/agrsQueryModuleSpatial/findAgrsAllListWktForHC', params),
  // tree_分表变率，分级级数据获取
  getResolutionpower: (params) => http.getAxios('/mj/agrsQueryModuleSpatial/getAgrsCatalogListByUidResolutionpower', params),
  // 获取行政区边界
  getAreaWkt: (params) => http.getAxios('/mj/agrsSpatial/getAreaWkt', params),
  // 检测用户是否免审 0是免审核 1是需要审核
  getUserIsAudited: (params) => http.postAxios('/mj/agrsUserDataPermission/getUserIsAudited', params),
  // 获取查询结构
  getQueryTablesFields: (params) => http.getAxios('/mj/agrsQueryModuleSpatial/getAgrsQueryTablesFields', params),
  findCoverageByNodes: (params) => http.postAxios('/mj/agrsQueryModuleSpatial/findAgrsAllListWktForHCNodes', params),
  // 资料查询使用。
  findNewAgrsAllListWktForHCNodes: (params) => http.postAxios('/mj/agrsQueryModuleSpatial/findNewAgrsAllListWktForHCNodes', params),
  // 航遥中心单点登录验证
  getCodeData: (params) => http.getAxios('/mj/ssoLogin/getCodeData', params),
  getTokenData: (params) => http.getAxios('/mj/ssoLogin/getTokenData', params),
  // app端获取用户详情
  getAppTokenData: (params) => http.getAxios('/mj/ssoLogin/getAppTokenData', params),
  // 获取购物车数据
  getAllShopDataForAllPage: (params) => http.postAxios('/mj/agrsShop/agrsAllList', params),
  getOrderShopSize: (params) => http.postAxios('/mj/agrsShop/agrsOrderShopSize', params),
  // 获取单位列表。
  getUnitList: (params) => http.postAxios('/mj/agrsGroup/getUnitList', params),
  // 购物车删除
  deleteShop: (params) => http.postAxios('/mj/agrsShop/deleteShopById', params),
  // 购物车获取条数获取
  getagrsListCount: (params) => http.postAxios('/mj/agrsShop/agrsListCount', params),
  // 用户地址
  getPushAddressdByLoingName: (params) => http.getAxios('/mj/agrsUserPushAddress/getPushAddressdByLoingName', params),
  // 获取用户所有信息
  userGetById: (params) => http.getAxios('/dandian/user/getById', params),
  getAllShopDataForPage: (params) => http.postAxios('/mj/agrsShop/agrsList', params),
  // 创建订单
  createOrder: (params) => http.postAxios('/mj/agrsOrder/agrsSave', params),
  getagrsSaveFiles: (params) => http.postAxios('/mj/agrsOrder/agrsSaveFiles', params),
  // 订单数据附件获取
  getByOrderIdFile: (params) => http.getAxios('/mj/agrsOrderAttachement/getByOrderId', params),
  // 文件上传
  getFileUpload: (params) => http.postAxios('/mj/agrsOrderAttachement/uploadForJC', params),
  // 获取传感器-对应title
  getSensortrans: (params) => http.getAxios('/mj/sensortranslation/page', params)
}
