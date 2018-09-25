// 4个columns对应：店铺营业清单、店铺营业清单、店铺营业清单（金额排序）、店铺营业清单（数量排序）
import { toPercentage2, ifNull } from 'Src/utils/publicMethods'
const columns1 = [
  {
    title: '运营方',
    dataIndex: 'fOperatorName',
    key: 'fOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '子运营方',
    dataIndex: 'sOperatorName',
    key: 'sOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '店铺',
    dataIndex: 'shopName',
    key: 'shopName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际订单金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCount',
    key: 'orderNoCount',
    width: 125,
  },
]
const columns2 = [
  {
    title: '运营方',
    dataIndex: 'fOperatorName',
    key: 'fOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '子运营方',
    dataIndex: 'sOperatorName',
    key: 'sOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '店铺',
    dataIndex: 'shopName',
    key: 'shopName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '退货金额(元)',
    dataIndex: 'refundAmount',
    key: 'refundAmount',
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
    title: '退款订单数量',
    dataIndex: 'returnCount',
    key: 'returnCount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  // {
  //   title: '退货数量比例',
  //   dataIndex: 'card6',
  //   key: 'card6',
  //   render: (text, record) => (
  //     ifNull(text)
  //   ),
  // },
]
const columns3 = [
  {
    title: '运营方',
    dataIndex: 'fOperatorName',
    key: 'fOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '子运营方',
    dataIndex: 'sOperatorName',
    key: 'sOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '店铺',
    dataIndex: 'shopName',
    key: 'shopName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际订单金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    sorter: true,
    width: 175,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCount',
    key: 'orderNoCount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]
const columns4 = [
  {
    title: '运营方',
    dataIndex: 'fOperatorName',
    key: 'fOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '子运营方',
    dataIndex: 'sOperatorName',
    key: 'sOperatorName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '店铺',
    dataIndex: 'shopName',
    key: 'shopName',
    width: 210,
    render: (text, record) => (
      ifNull(text)
    ),
  },
  {
    title: '实际订单金额(元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
  {
    title: '实际订单数量',
    dataIndex: 'orderNoCount',
    key: 'orderNoCount',
    sorter: true,
    width: 145,
    render: (text, record) => (
      toPercentage2(text)
    ),
  },
]

export { columns1, columns2, columns3, columns4 }
