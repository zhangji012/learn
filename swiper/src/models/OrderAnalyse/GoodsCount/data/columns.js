// 4个columns对应：店铺营业清单、店铺营业清单、店铺营业清单（金额排序）、店铺营业清单（数量排序）
import { toPercentage2, ifNull } from 'Src/utils/publicMethods'
const columns1 = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '商品ID',
    dataIndex: 'skuNo',
    key: 'skuNo',
    width: 280,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '消费店铺',
    dataIndex: 'merchantUserName',
    key: 'merchantUserName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际消费件数',
    dataIndex: 'skuNum',
    key: 'skuNum',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCounts',
    key: 'orderNoCounts',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际消费金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '笔单价(元)',
    dataIndex: 'price',
    key: 'price',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]
const columns2 = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '商品ID',
    dataIndex: 'skuNo',
    key: 'skuNo',
    width: 250,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '消费店铺',
    dataIndex: 'merchantUserName',
    key: 'merchantUserName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '退货订单金额(元)',
    dataIndex: 'returnAmount',
    key: 'returnAmount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '退货金额比例',
    dataIndex: 'returnAmountPercent',
    key: 'returnAmountPercent',
    width: 145,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '退货订单数量',
    dataIndex: 'returnCount',
    key: 'returnCount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]
const columns3 = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '商品ID',
    dataIndex: 'skuNo',
    key: 'skuNo',
    width: 280,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '消费店铺',
    dataIndex: 'merchantUserName',
    key: 'merchantUserName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际消费数量',
    dataIndex: 'skuNum',
    key: 'skuNum',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCounts',
    key: 'orderNoCounts',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际消费金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 175,
    sorter: true,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '笔单价(元)',
    dataIndex: 'price',
    key: 'price',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]
const columns4 = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '商品ID',
    dataIndex: 'skuNo',
    key: 'skuNo',
    width: 280,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '消费店铺',
    dataIndex: 'merchantUserName',
    key: 'merchantUserName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际消费数量',
    dataIndex: 'skuNum',
    key: 'skuNum',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCounts',
    key: 'orderNoCounts',
    width: 175,
    sorter: true,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际消费金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '笔单价(元)',
    dataIndex: 'price',
    key: 'price',
    width: 135,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]

export { columns1, columns2, columns3, columns4 }
