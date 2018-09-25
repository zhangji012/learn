/**
 * @Author: sunshiqiang
 * @Date: 2017-10-31 10:34:47
 * @Title: 接口调用
 */

import { fetch, fetcher2 } from 'Util/fetch'
import { baseUrl } from 'Util'
import { message } from 'antd'
import { showSpin } from 'Models/layout'
// 获取数据类接口
export const Fetch = (url, params) => {
  showSpin({ bool: true, content: '正在加载数据....' })
  return fetch(url, params).then(
    res => {
      if (res.code === 0) {
        showSpin()
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}

// 保存类接口
export const FetchSave = (url, params) => {
  showSpin({ bool: true, content: '正在加载数据....' })
  return fetch(url, params).then(
    res => {
      if (res.code === 0) {
        showSpin()
        message.success(res.errmsg, 2)
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}
/* 订单分析下面3个页面使用另外的后端接口 */
// 获取数据类接口
export const Fetch2 = (url, params) => {
  showSpin({ bool: true, content: '正在加载数据....' })
  return fetcher2.post(url, params).then(
    res => {
      if (res.code === 0) {
        showSpin()
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}

// 保存类接口
export const FetchSave2 = (url, params) => {
  showSpin({ bool: true, content: '正在加载数据....' })
  return fetcher2.post(url, params).then(
    res => {
      console.log(res)
      if (res.code === 0) {
        showSpin()
        message.success(res.errmsg, 2)
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}

export const FetchGet = (url, params) => {
  showSpin({ bool: true, content: '正在加载数据....' })
  return fetcher2.get(url, { params }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      showSpin()
      return res.data
    } else {
      showSpin()
      message.error(res.errmsg, 2)
    }
  }, (err) => {
    showSpin()
    message.error(err.errmsg, 2)
  })
}
export default {
  platLogin: {
    ssoLogin: {
      getMenu(params) { // 列表
        return Fetch('/order-api/sso/getMenu', params)
      },
      getMenu2(params) { // 列表
        return FetchGet('/operations/getLoginUserINfo.json', params)
      },
    }
  },
  OperatingReport: { // 运营报表
    PlatformBase: { // 平台基础数据
      JCBCount: { // 金诚币统计
        tableData(params) { // 列表
          return Fetch('/order-api/report/coin', params)
        },
        echartsData(params) { // 列表
          return Fetch('/order-api/report/coin/nonsort', params)
        },
        export(params) { // 导出
          return `${baseUrl}/order-api/report/coin/export?cycle=${params.cycle}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`
        },
      },
      TurnoverCount: { // 交易额统计
        tableData(params) { // 列表
          return Fetch('/order-api/report/amount/cyclesummary', params)
        },
        echartsData(params) { // 列表
          return Fetch('/order-api/report/amount/cyclesummaryNotByPage', params)
        },
        export(params) { // 导出
          return `${baseUrl}/order-api/report/amount/export?cycle=${params.cycle}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`
        },
      },
      OlineSum: { // 线上统计
        list(params) { // 列表
          return Fetch('/order-api/report/online/summary', params)
        },
      },
    },
    getIndustryInfos(params) { // 产业 列表
      return Fetch('/order-api/report/industry/getIndustryInfos', params)
    },
    IndustrialAmount: { // 产业金额
      tableData(params) { // 列表
        return Fetch('/order-api/report/industry/statisticsPading', params)
      },
      echartsData(params) { // 列表
        return Fetch('/order-api/report/industry/statistics', params)
      },
      export(params) { // 导出
        return `${baseUrl}/order-api/report/industry/export?industryNo=${params.industryNo}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`
      },
    },
    IndustrialASum: { // 产业金额汇总
      list(params) { // 列表
        return Fetch('/order-api/report/industry/summary', params)
      },
    }
  },
  MoneyReport: {
    SellDetailCount: {
      list(params) { // 销售明细统计 列表
        return Fetch('/order-api/report/order', params)
      },
      sum(params) { // 销售明细统计 合计
        return Fetch('/order-api/report/orderSum', params)
      },
      exportReport: '/order-api/report/order/export',
    },
    ProSellPool: {
      list(params) { // 商品销售汇总 列表
        return Fetch('/order-api/report/goods', params)
      },
      sum(params) { // 商品销售汇总 合计
        return Fetch('/order-api/report/goodsSum', params)
      },
      exportReport: '/order-api/report/goods/export',
    },
    ShopPool: {
      list(params) { // 店铺汇总 列表
        return Fetch('/order-api/report/merchant/page', params)
      },
      sum(params) { // 店铺汇总 合计
        return Fetch('/order-api/report/merchant/summary', params)
      },
      exportReport: '/order-api/report/merchant/export',
    }
  },
  /* 店铺营业统计 */
  shopCount: {
    bar1(params) {
      return Fetch2('/operations/groupByMoney', params)
    },
    bar2(params) {
      return Fetch2('/operations/groupByCount', params)
    },
    bar3(params) {
      return Fetch2('/operations/groupByMoneyPerShop', params)
    },
    tableList1(params) {
      return Fetch2('/operations/shopBusinessList', params)
    },
    tableList2(params) {
      return Fetch2('/operations/shopReturnList', params)
    },
    tableList3(params) {
      return Fetch2('/operations/shopBusinessList', params)
    },
    tableList4(params) {
      return Fetch2('/operations/shopBusinessList', params)
    },
    downLoad(params) {
      return Fetch2('/operations/exportShopBusinessList', params)
    },
  },
  /* 商品销售统计 */
  goodsCount: {
    bar1(params) {
      return Fetch2('/operations/crbyMoney', params)
    },
    bar2(params) {
      return Fetch2('/operations/crbyCount', params)
    },
    tableList1(params) {
      return Fetch2('/operations/goodsSaleList', params)
    },
    tableList2(params) {
      return Fetch2('/operations/goodsReturnList', params)
    },
    tableList3(params) {
      return Fetch2('/operations/goodsSaleList', params)
    },
    tableList4(params) {
      return Fetch2('/operations/goodsSaleList', params)
    },
    downLoad(params) {
      return Fetch2('/operations/exportGoodsSaleList', params)
    }
  },
  /* 红包统计 */
  redPacketCount: {
    lineByDay(params) {
      return Fetch2('/operations/redpacketSituationByDay', params)
    },
    lineByMonth(params) {
      return Fetch2('/operations/redpacketSituationByMonth', params)
    },
    tableList(params) {
      return Fetch2('/operations/redpacketList', params)
    },
    downLoad(params) {
      return Fetch2('/operations/exportRedpacketList', params)
    }
  }
}
