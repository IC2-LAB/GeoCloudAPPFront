import http from '@/service/interface.js'
const state = {
  newTimed: 0,
  nodeId: '',
  dataDitelShow: '',
  resultDataZ: {},
  dialogShow: 0,
  searchArea: 0,
  resultData: {},
  mapScope: {
    value: ''
  },
  geometryType: null,
  wkt: '',
  queryStatus: 0,
  nodeDataIndex: '100016',
  code: '',
  name: '',
  detailShow: 0,
  activeName: 'condition',
  transition3D: false,
  orderDetailId: '',
  orderNameDetailId: '',
  orderTaskId: '',
  menuShow: true,
  navHide: false,
  shopIDs: '',
  numberOne: true,
  tableShow: false,
  nodeLabel: '高分一号',
  disShow: false,
  shopAgen: 0,
  tableD: '1',
  tlList: [],
  cleartPoint: 1,
  tlShow: false,
  resultStr: [],
  resultStr2: [],
  navListIndex: '',
  switchingSelectArr: [],
  tabelPopdata: [0],
  showPXFlag: false,
  toolListData: false,
  clientHeight: '',
  hfShowTl: false,
  nodeIndexData: false,
  hcShowTl: false,
  hdShowTl: false,
  hyShowTl: false,
  parentNodeId: '',
  spanLabel: '',
  dialogShowDataZ: {},
  locationD: [],
  totalDataLength: '',
  searchIndex: 0,
  routerData: '',
  nodeIdSerachData: true
}

// getters
const getters = {}

// actions
const actions = {
  setCatalogNodeId ({
    commit,
    state
  }, nodeId) {
    commit('SET_CATALOG_NODEID', nodeId)
    http.getQueryTablesFields({
      nodeId
    }).then(res => {
      commit('SET_RESULT_DATA', res.data[0])
    })
  },
  setCatalogNodeIdZ ({
    commit,
    state
  }, nodeId) {
    commit('SET_CATALOG_NODEID', nodeId)
    http.getQueryTablesFields({
      nodeId
    }).then(res => {
      commit('SET_RESULT_DATA_Z', res.data[0])
    })
  },
  setMapScope ({
    commit,
    state
  }, scope) {
    commit('SET_MAP_SCOPE', scope)
  },
  setSearchIndex ({
    commit,
    state
  }, scope) {
    commit('SET_SEARCH_INDEX', scope)
  },
  setNodeIdSerachData ({
    commit,
    state
  }, scope) {
    commit('SET_NODEID_SERACH_DATA', scope)
  },
  setlocationData ({
    commit,
    state
  }, scope) {
    commit('SET_LOCATION_D', scope)
  },
  setRouterData ({
    commit,
    state
  }, scope) {
    commit('SET_ROUTER_DATA', scope)
  },
  setParentNodeId ({
    commit,
    state
  }, scope) {
    commit('SET_PARENT_NODEID', scope)
  },
  setNewTimeD ({
    commit,
    state
  }, scope) {
    commit('SET_NEW_TIMED', scope)
  },
  setDataDitel ({
    commit,
    state
  }, scope) {
    commit('SET_DATA_DATIEL', scope)
  },
  setDialogShowDataZ ({
    commit,
    state
  }, scope) {
    commit('SET_DIALOG_SHOW_DATAZ', scope)
  },
  setSpanLabel ({
    commit,
    state
  }, scope) {
    commit('SET_SPAN_LABEL', scope)
  },
  setTotalDataLength ({
    commit,
    state
  }, scope) {
    commit('SET_TOTAL_DATA_LENGTH', scope)
  },
  setTabelPopdata ({
    commit,
    state
  }, tabelPopdata) {
    commit('SET_TABLE_POP_DATA', tabelPopdata)
  },
  setGeometryType ({
    commit,
    state
  }, scope) {
    commit('SET_MAP_GEOMETRYTYPE', scope)
  },
  setWkt ({
    commit,
    state
  }, scope) {
    commit('SET_MAP_WKT', scope)
  },
  setQueryStatus ({
    commit,
    state
  }, scope) {
    commit('SET_QUERY_STATUS', scope)
  },
  setNodeDataIndex ({
    commit,
    state
  }, scope) {
    commit('SET_ONDE_DATA_INDEX', scope)
  },
  setname ({
    commit,
    state
  }, name) {
    commit('SET_MAP_NAEM', name)
  },
  setCode ({
    commit,
    state
  }, scope) {
    commit('SET_MAP_CODE', scope)
  },
  setActiveName ({
    commit,
    state
  }, scope) {
    commit('SET_ACTIVE_NAME', scope)
  },
  setDetailShow ({
    commit,
    state
  }, scope) {
    commit('SET_DETAIL_SHOW', scope)
  },
  setTransition3D ({
    commit,
    state
  }, scope) {
    commit('SET_TRANSITION_3D', scope)
  },
  setOrderDetailId ({
    commit,
    state
  }, scope) {
    commit('SET_ORDERDETAIL_ID', scope)
  },
  setOrderNameDetail ({
    commit,
    state
}, scope) {
    commit('SET_ORDERDENAMETAIL_ID', scope)
  },
  setOrderTaskId ({
    commit,
    state
  }, scope) {
    commit('SET_ORDERTASK_ID', scope)
  },
  setOrderTaskFlag ({
                    commit,
                    state
                  }, scope) {
    commit('SET_ORDERTASK_FLAG', scope)
  },
  setMenuShow ({
    commit,
    state
  }, scope) {
    commit('SET_MENU_SHOW', scope)
  },
  setShopIDs ({
    commit,
    state
  }, scope) {
    commit('SET_SHOP_IDS', scope)
  },
  setNumberOne ({
    commit,
    state
  }, scope) {
    commit('SET_NUMBER_ONE', scope)
  },
  setNavHide ({
    commit,
    state
  }, navHide) {
    commit('SET_NAVHIDE', navHide)
  },
  setTableShow ({
    commit,
    state
  }, tableShow) {
    commit('SET_TBALE_SHOW', tableShow)
  },
  setNodeLabel ({
    commit,
    state
  }, nodeLabel) {
    commit('SET_NODE_LABEL', nodeLabel)
  },
  setDisShow ({
    commit,
    state
  }, disShow) {
    commit('SET_DIS_SHOW', disShow)
  },
  setShopAgen ({
    commit,
    state
  }, shopAgen) {
    commit('SET_SHOW_AGNE', shopAgen)
  },
  settableD ({
    commit,
    state
  }, settableD) {
    commit('SET_TABLED', settableD)
  },
  settlList ({
    commit,
    state
  }, tlList) {
    commit('SET_TL_LIST', tlList)
  },
  setClearPoint ({
    commit,
    state
  }, clear) {
    commit('SET_CLEAR_POINT', clear)
  },
  setTlShow ({
    commit,
    state
  }, tlShow) {
    commit('SET_TL_SHOW', tlShow)
  },
  setResultStr ({
    commit,
    state
  }, str) {
    commit('SET_RESULT_STR', str)
  },
  setResultStr2 ({
    commit,
    state
  }, str) {
    commit('SET_RESULT_STR2', str)
  },
  setNavListIndex ({
    commit,
    state
  }, index) {
    commit('SET_NAVLIST_INDEX', index)
  },
  setSwitchingSelect ({
    commit,
    state
  }, index) {
    commit('SET_SWITCHING_SELECT', index)
  },
  setShowPXFlag ({
    commit,
    state
  }, index) {
    commit('SET_SHOWPX_FLAG', index)
  },
  setclientHeight ({
    commit,
    state
  }, data) {
    commit('SET_CLIENT_HEIGHT', data)
  },
  setHfShowTl ({
    commit,
    state
  }, hfShowTl) {
    commit('SET_HF_SHOW', hfShowTl)
  },
  setToolListShow ({
    commit,
    state
  }, toolListData) {
    commit('SET_TOOL_LIST_SHOW', toolListData)
  },
  setNodeIndexData ({
    commit,
    state
  }, hfShowTl) {
    commit('SET_NODE_INDEX_DATA', hfShowTl)
  },
  setHcShowTl ({
    commit,
    state
  }, hcShowTl) {
    commit('SET_HC_SHOW', hcShowTl)
  },
  setHdShowTl ({
    commit,
    state
  }, hdShowTl) {
    commit('SET_HD_SHOW', hdShowTl)
  },
  setDialogShow ({
                   commit,
                   state
                 }, scope) {
    commit('SET_DIALOG_SHOW', scope)
  },
  setSearchArea ({
                   commit,
                   state
                 }, scope) {
    commit('SET_SEARCH_AREA', scope)
  },
  setHyShowTl ({
    commit,
    state
  }, hyShowTl) {
    commit('SET_HY_SHOW', hyShowTl)
  }
}

// mutations
const mutations = {
  SET_CATALOG_NODEID (state, id) {
    state.nodeId = id
  },
  SET_PARENT_NODEID (state, val) {
    state.parentNodeId = val
  },
  SET_NEW_TIMED (state, val) {
    state.newTimed = val
  },
  SET_DATA_DATIEL (state, val) {
    state.dataDitelShow = val
  },
  SET_DIALOG_SHOW_DATAZ (state, val) {
    state.dialogShowDataZ = val
  },
  SET_SPAN_LABEL (state, val) {
    state.spanLabel = val
  },
  SET_TOTAL_DATA_LENGTH (state, val) {
    state.totalDataLength = val
  },
  SET_CLIENT_HEIGHT (state, data) {
    state.clientHeight = data
  },
  SET_SHOWPX_FLAG (state, id) {
    state.showPXFlag = id
  },
  SET_RESULT_DATA (state, obj = {}) {
    state.resultData = obj
  },
  SET_RESULT_DATA_Z (state, obj = {}) {
    state.resultDataZ = obj
  },
  SET_DIALOG_SHOW (state, id) {
    state.dialogShow = id
  },
  SET_SEARCH_AREA (state, data) {
    state.searchArea = data
  },
  SET_TABLE_POP_DATA (state, tabelPopdata) {
    state.tabelPopdata = tabelPopdata
  },
  SET_MAP_SCOPE (state, obj = {}) {
    state.mapScope = obj
  },
  SET_SEARCH_INDEX (state, index) {
    state.searchIndex = index
  },
  SET_NODEID_SERACH_DATA (state, index) {
    state.nodeIdSerachData = index
  },
  SET_LOCATION_D (state, data) {
    state.locationD = data
  },
  SET_ROUTER_DATA (state, index) {
    state.routerData = index
  },
  SET_MAP_GEOMETRYTYPE (state, geometryType) {
    state.geometryType = geometryType
  },
  SET_MAP_WKT (state, wkt) {
    state.wkt = wkt
  },
  SET_QUERY_STATUS (state, queryStatus) {
    state.queryStatus = queryStatus
  },
  SET_ONDE_DATA_INDEX (state, queryStatus) {
    state.nodeDataIndex = queryStatus
  },
  SET_MAP_NAEM (state, name) {
    state.name = name
  },
  SET_MAP_CODE (state, code) {
    state.code = code
  },
  SET_ACTIVE_NAME (state, activeName) {
    state.activeName = activeName
  },
  SET_DETAIL_SHOW (state, data) {
    state.detailShow = data
  },
  SET_TRANSITION_3D (state, data) {
    state.transition3D = data
  },
  SET_ORDERDETAIL_ID (state, id) {
    // // console.log(id,'orderDetailId')
    state.orderDetailId = id
  },
  SET_ORDERDENAMETAIL_ID (state, ordername) {
    // // console.log(id,'orderDetailId')
    state.orderNameDetailId = ordername
  },
  SET_ORDERTASK_ID (state, taskId) {
    state.orderTaskId = taskId
  },
  SET_ORDERTASK_FLAG (state, orderTaskFlag) {
    state.orderTaskFlag = orderTaskFlag
  },
  SET_MENU_SHOW (state, show) {
    state.menuShow = show
  },
  SET_SHOP_IDS (state, shopIDs) {
    state.shopIDs = shopIDs
  },
  SET_NUMBER_ONE (state, numberOne) {
    state.numberOne = numberOne
  },
  SET_NAVHIDE (state, val) {
    state.navHide = val
  },
  SET_TBALE_SHOW (state, val) {
    state.tableShow = val
  },
  SET_NODE_LABEL (state, val) {
    state.nodeLabel = val
  },
  SET_HF_SHOW (state, val) {
    state.hfShowTl = val
  },
  SET_TOOL_LIST_SHOW (state, val) {
    state.toolListData = val
  },
  SET_NODE_INDEX_DATA (state, val) {
    state.nodeIndexData = val
  },
  SET_HC_SHOW (state, val) {
    state.hcShowTl = val
  },
  SET_HD_SHOW (state, val) {
    state.hdShowTl = val
  },
  SET_HY_SHOW (state, val) {
    state.hyShowTl = val
  },
  SET_DIS_SHOW (state, val) {
    state.disShow = val
  },
  SET_SHOW_AGNE (state, val) {
    state.shopAgen = val
  },
  SET_TABLED (state, val) {
    state.tableD += val
  },
  SET_TL_LIST (state, val) {
    state.tlList = val
  },
  SET_CLEAR_POINT (state, val) {
    state.cleartPoint = val
  },
  SET_TL_SHOW (state, val) {
    state.tlShow = val
  },
  SET_RESULT_STR (state, val) {
    state.resultStr = val
  },
  SET_RESULT_STR2 (state, val) {
    state.resultStr2 = val
  },
  SET_NAVLIST_INDEX (state, val) {
    state.navListIndex = val
  },
  SET_SWITCHING_SELECT (state, val) {
    state.switchingSelectArr = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
