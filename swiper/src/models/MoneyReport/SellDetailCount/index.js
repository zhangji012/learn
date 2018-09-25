/*
* @Author: chengbs
* @Date:   2018-03-06 16:17:08
* @Last Modified by:   chengbs
* @Last Modified time: 2018-03-21 19:27:28
*/
import React, { Component } from 'react'
import { Table, DatePicker, Button, Row, Col, Form, Pagination } from 'antd'
import moment from 'moment'
import api from 'Src/contants/api'
import { baseUrl } from 'Src/utils'

const FormItem = Form.Item
const orderTypeJson = {
  1: '诚元餐饮',
  2: '商品订单',
  3: '扫码下单',
  4: '清溪川',
  5: '团购订单',
  6: '充值',
  7: '充值卡充值',
  8: '动态码下单',
  9: '票务',
  10: '其他类型',
  11: '父订单',
  12: '客如云收款枪',
  13: '客如云消费卡',
  14: '金诚慈善',
  15: '逸活动'
}

class SellDetailCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateFrom: null,
      dateTo: null,
      endOpen: false,
      tableList: {},
      dataSource: [],
      params: {},
      totalAmount: {}
    }
  }

  handleTableChange = (pageNo) => {
    this.loadList({ ...this.state.params, pageNo })
  }

  // 日期start
  disabledStartDate = (dateFrom) => {
    const dateTo = this.state.dateTo
    if (dateFrom && !dateTo) {
      return dateFrom > moment().endOf('day')
    } else if (dateFrom && dateTo) {
      return dateFrom.valueOf() > dateTo.valueOf() + (24 * 60 * 60 * 1000) || dateFrom.valueOf() <= dateTo.valueOf() - (89 * 24 * 60 * 60 * 1000) || dateFrom > moment().endOf('day')
    } else if (!dateFrom || !dateTo) {
      return false
    }
  }

  disabledEndDate = (dateTo) => {
    const dateFrom = this.state.dateFrom
    if (dateTo && !dateFrom) {
      return dateTo > moment().endOf('day')
    } else if (dateTo && dateFrom) {
      return dateTo.valueOf() <= dateFrom.valueOf() || dateTo > moment().endOf('day') || dateTo.valueOf() >= dateFrom.valueOf() + (90 * 24 * 60 * 60 * 1000)
    } else if (!dateTo || !dateFrom) {
      return false
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('dateFrom', value)
  }

  onEndChange = (value) => {
    this.onChange('dateTo', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    let startVal = 0
    if (this.state.dateFrom) {
      startVal = this.state.dateFrom.valueOf() + 5 * 24 * 60 * 60 * 1000
    }
    if (this.props.form.getFieldValue('dateCreatedTo') && this.props.form.getFieldValue('dateCreatedTo').valueOf() > startVal) {
      this.props.form.setFieldsValue({ 'dateCreatedTo': null })
      return false
    }
    this.setState({ endOpen: open })
  }
  // 日期end

  // 搜索列表
  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.loadList({
          ...values, ...{ dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'), dateTo: moment(values.dateTo).format('YYYY-MM-DD') }
        })
      }
    })
    this.getTotalData()
  }

  // 结果数据处理
  fixData = (arr) => {
    let temp = []
    let i = 0
    arr.forEach(item => {
      temp = [...temp, ...item.goods.map((items, index, arr) => {
        i++
        if (index === 0) return { ...item, ...items, time: i, rowSpan: arr.length }
        return { ...item, ...items, time: i, rowSpan: 0 }
      })]
    })
    return temp
  }

 // 加载列表
  async loadList(params = {}) {
    let dataSource = []
    const tableList = await api.MoneyReport.SellDetailCount.list({
      pageSize: 20,
      pageNo: params.pageNo || '1',
      ...params
    }) || {}
    if (tableList['list']) {
      dataSource = this.fixData(tableList['list'])
    }
    console.log('dataSource:', dataSource)
    this.setState({ tableList, dataSource, params })
  }

  // 导出
  exportData() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        location.href = `${baseUrl}${api.MoneyReport.SellDetailCount.exportReport}?${params2query(Object.assign({}, {
          dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(values.dateTo).format('YYYY-MM-DD')
        }))}`
      }
    })

    function params2query(params) {
      if (typeof params !== 'object') return ''
      var queries = []
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          params[i] && queries.push(i + '=' + params[i])
        }
      }
      return queries.join('&')
    }
  }

  // 合计数量
  getTotalData() {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const totalAmount = await api.MoneyReport.SellDetailCount.sum({
          dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(values.dateTo).format('YYYY-MM-DD'),
        }) || {}
        this.setState({ totalAmount })
      }
    })
  }

  render() {
    const { tableList, dataSource, endOpen, totalAmount } = this.state
    const { getFieldDecorator } = this.props.form
    const dateFormat = 'YYYY-MM-DD'
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      }
      return obj
    }
    const renderMerge = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      }
      obj.props.rowSpan = row.rowSpan
      return obj
    }

    const columns = [{
      title: '订单编号',
      dataIndex: 'orderNo',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '订单支付编码',
      dataIndex: 'payNo',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '商家名称',
      dataIndex: 'merchantUserName',
      render: renderContent
    }, {
      title: '商品名称',
      dataIndex: 'name',
      render: renderContent
    }, {
      title: '规格',
      dataIndex: 'scale',
      render: renderContent,
    }, {
      title: '购买数量',
      dataIndex: 'num',
      render: renderContent
    }, {
      title: '商品单价',
      dataIndex: 'price',
      render: renderContent,
    }, {
      title: '运费',
      dataIndex: 'freightAmount',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '包装费',
      dataIndex: 'packingAmount',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '订单金额',
      dataIndex: 'orderAmount',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '优惠金额',
      dataIndex: 'discountAmount',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '实付金额',
      dataIndex: 'amount',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '订单状态',
      dataIndex: 'orderStatus',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '订单类型',
      dataIndex: 'orderType',
      colSpan: 1,
      render: (value, row, index) => {
        const obj = {
          children: orderTypeJson[value],
          props: {},
        }
        obj.props.rowSpan = row.rowSpan
        return obj
      }
    }, {
      title: '支付状态',
      dataIndex: 'payStatus',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '订单创建时间',
      dataIndex: 'dateCreated',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '支付时间',
      dataIndex: 'payTime',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '发货时间',
      dataIndex: 'sentTime',
      colSpan: 1,
      render: renderMerge
    }, {
      title: '确认收货时间',
      dataIndex: 'receiveTime',
      colSpan: 1,
      render: renderMerge
    }]
    return (
      <div>
        <Form onSubmit={this.handleSearch.bind(this)}>
          <Row>
            <Col span={6}>
                <FormItem { ...formItemLayout } label={'起始日期'} extra='日期范围3个月'>
                  {getFieldDecorator('dateFrom', {
                    rules: [{
                      required: true, message: '请选择起始日期',
                    }]
                  })(
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      format={dateFormat}
                      placeholder='起始日期'
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                      showToday={ false }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem { ...formItemLayout } label={'结束日期'} extra='日期范围3个月'>
                  {getFieldDecorator('dateTo', {
                    rules: [{
                      required: true, message: '请选择结束日期',
                    }]
                  })(
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      format={dateFormat}
                      placeholder='结束日期'
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                      showToday={ false }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <Button type='primary' htmlType='submit'>查询</Button>
                <Button style={{ marginLeft: '20px' }} type='primary' onClick={this.exportData.bind(this)}>导出</Button>
              </Col>
            </Row>
        </Form>
        <div style={{ fontSize: '13px', color: '#000' }}>
          <span style={{ marginRight: '30px' }}>购买数量(合计)：{ totalAmount.numTotal || 0 }</span>
          <span style={{ marginRight: '30px' }}>运费(合计)：{ (totalAmount.freightAmountTotal || 0).toFixed(2) }</span>
          <span style={{ marginRight: '30px' }}>包装费(合计)：{ (totalAmount.packingAmountTotal || 0).toFixed(2) }</span>
          <span style={{ marginRight: '30px' }}>订单金额(合计)：{ (totalAmount.orderAmountTotal || 0).toFixed(2) }</span>
          <span style={{ marginRight: '30px' }}>优惠金额(合计)：{ (totalAmount.discountAmountTotal || 0).toFixed(2) }</span>
          <span>实付金额(合计)：{ (totalAmount.amountTotal || 0).toFixed(2) }</span>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={
            { pageSize: 10000, hideOnSinglePage: true }
          }
          style={{ marginTop: '10px' }}
          bordered rowKey='time'/>
          <div style={{ position: 'relative', 'height': '30px' }}>
            <Pagination current={tableList.pageNo || 1} pageSize={20} onChange={this.handleTableChange} total={tableList.records} style={{ marginTop: '10px', position: 'absolute', right: 0 }} />
          </div>
      </div>
    )
  }
}

export default Form.create()(SellDetailCount)
