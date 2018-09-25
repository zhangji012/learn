import React from 'react'
// import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import * as urls from '../contants/url'
import XLayout from '../models/layout'
import Home from '../models/Home'
import IndustrialAmount from '../models/OperatingReport/IndustrialAmount'// 产品消费金额
import IndustrialASum from '../models/OperatingReport/IndustrialASum'// 产品消费金额汇总
import JCBCount from '../models/OperatingReport/PlatformBase/JCBCount'// 金诚币统计
import TurnoverCount from '../models/OperatingReport/PlatformBase/TurnoverCount'// 交易额统计
import OlineSum from '../models/OperatingReport/PlatformBase/OlineSum'// 线上汇总
import SelldetailCount from '../models/MoneyReport/SellDetailCount'// 销售明细统计
import ProSellPool from '../models/MoneyReport/ProSellPool'// 商品销售汇总
import ShopPool from '../models/MoneyReport/ShopPool'// 店铺汇总
import ORDERANALYSE_1 from '../models/OrderAnalyse/ShopCount'// 店铺营业统计
import ORDERANALYSE_2 from '../models/OrderAnalyse/GoodsCount'// 商品销售统计
import ORDERANALYSE_3 from '../models/OrderAnalyse/RedPacketCount'// 红包统计
const routes = [
  {
    path: '/',
    redirect: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.INDUSTRIAL_AMOUNT,
    exact: true,
    component: IndustrialAmount,
    breadcrumbName: '产业消费金额',
    parentPath: urls.HOME
  },
  {
    path: urls.INDUSTRIAL_ASUM,
    exact: true,
    component: IndustrialASum,
    breadcrumbName: '产业消费金额汇总',
    parentPath: urls.HOME
  },
  {
    path: urls.JCB_COUNT,
    exact: true,
    component: JCBCount,
    breadcrumbName: '金诚币统计',
    parentPath: urls.HOME
  },
  {
    path: urls.TURNOVER_COUNT,
    exact: true,
    component: TurnoverCount,
    breadcrumbName: '交易额统计',
    parentPath: urls.HOME
  },
  {
    path: urls.OLINE_SUM,
    exact: true,
    component: OlineSum,
    breadcrumbName: '线上汇总',
    parentPath: urls.HOME
  },
  {
    path: urls.SELLDETAIL_COUNT,
    exact: true,
    component: SelldetailCount,
    breadcrumbName: '销售明细统计',
    parentPath: urls.HOME
  },
  {
    path: urls.PROSELL_POOL,
    exact: true,
    component: ProSellPool,
    breadcrumbName: '商品销售汇总',
    parentPath: urls.HOME
  },
  {
    path: urls.SHOP_POOL,
    exact: true,
    component: ShopPool,
    breadcrumbName: '店铺汇总',
    parentPath: urls.HOME
  },
  // 订单分析
  {
    path: urls.ORDERANALYSE_1,
    exact: true,
    component: ORDERANALYSE_1,
    breadcrumbName: '店铺营业统计',
    parentPath: urls.HOME
  },
  {
    path: urls.ORDERANALYSE_2,
    exact: true,
    component: ORDERANALYSE_2,
    breadcrumbName: '商品销售统计',
    parentPath: urls.HOME
  },
  {
    path: urls.ORDERANALYSE_3,
    exact: true,
    component: ORDERANALYSE_3,
    breadcrumbName: '红包统计',
    parentPath: urls.HOME
  }
]

const RouteConfig = () => (
  <Router>
    <Switch>
      <XLayout routes={routes}>
      </XLayout>
    </Switch>
  </Router>
)

export default RouteConfig
