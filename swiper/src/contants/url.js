const BASE_URL = `/app`

export const HOME = BASE_URL
export const LOGIN = `/login`

/* 运营报表 */
export const INDUSTRIAL_AMOUNT = `${HOME}/OperatingReport/IndustrialAmount`// 产业消费金额
export const INDUSTRIAL_ASUM = `${HOME}/OperatingReport/IndustrialASum`// 产业消费金额汇总
export const PLATFORM_BASE = `${HOME}/OperatingReport/PlatformBase`// 平台基础数据
export const JCB_COUNT = `${PLATFORM_BASE}/JCBCount`// 金诚币统计
export const TURNOVER_COUNT = `${PLATFORM_BASE}/TurnoverCount`// 交易额统计
export const OLINE_SUM = `${PLATFORM_BASE}/OineSum`// 线上统计

/* 财务报表 */
export const SELLDETAIL_COUNT = `${HOME}/MoneyReport/SelldetailCount`// 销售明细统计
export const PROSELL_POOL = `${HOME}/MoneyReport/ProSellPool`// 商品销售汇总
export const SHOP_POOL = `${HOME}/MoneyReport/ShopPool`// 店铺汇总

/* 订单分析 */
export const ORDERANALYSE_1 = `${HOME}/orderAnalyse/shopCount`          // 店铺营业统计
export const ORDERANALYSE_2 = `${HOME}/orderAnalyse/goodsCount`         // 商品销售统计
export const ORDERANALYSE_3 = `${HOME}/orderAnalyse/redPacketCount`     // 红包统计
