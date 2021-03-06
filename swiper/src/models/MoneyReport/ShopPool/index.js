/*
* @Author: chengbs
* @Date:   2018-03-06 16:18:53
* @Last Modified by:   chengbs
* @Last Modified time: 2018-03-21 19:27:47
*/
import React, { Component } from 'react'
import { Table, Form, DatePicker, Input, Button, Row, Col } from 'antd'
import moment from 'moment'
import api from 'Src/contants/api'
import { baseUrl } from 'Src/utils'

const FormItem = Form.Item

class ShopPool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endOpen: false,
      params: {},
      tableList: {},
      dataSource: [],
      totalAmount: {}
    }
  }

  handleTableChange = (pageNo) => {
    this.loadList({ ...this.state.params, pageNo })
  }

  _ltrim(s) {
    if (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    }
    return ''
  }
  // 搜索列表
  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        this.loadList({
          ...values, ...{ dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'), dateTo: moment(values.dateTo).format('YYYY-MM-DD'), merchantName: this._ltrim(values.merchantName) || '' }
        })
      }
    })
    this.getTotalData()
  }
  // 加载列表
  async loadList(params = {}) {
    let dataSource = []
    let tableList = await api.MoneyReport.ShopPool.list({
      pageSize: '20',
      pageNo: params.pageNo || '1',
      ...params
    }) || {}
    if (tableList['list']) {
      dataSource = tableList['list']
    }
    this.setState({ tableList, dataSource, params })
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

  // 导出
  exportData() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        location.href = `${baseUrl}${api.MoneyReport.ShopPool.exportReport}?${params2query(Object.assign({}, {
          dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(values.dateTo).format('YYYY-MM-DD'),
          merchantName: values.merchantName
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
        const totalAmount = await api.MoneyReport.ShopPool.sum({
          dateFrom: moment(values.dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(values.dateTo).format('YYYY-MM-DD'),
          merchantName: this._ltrim(values.merchantName) || ''
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
    const columns = [{
      title: '商家名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
    }, {
      title: '订单金额',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      children: [{
        title: '合计: ' + (totalAmount.orderAmountSummary || 0).toFixed(2),
        dataIndex: 'orderAmount',
        key: 'orderAmount',
        render: (text) => {
          return text.toFixed(2)
        }
      }]
    }, {
      title: '实付金额',
      dataIndex: 'payAmount',
      key: 'payAmount',
      children: [{
        title: '合计: ' + (totalAmount.payAmountSummary || 0).toFixed(2),
        dataIndex: 'payAmount',
        key: 'payAmount',
        render: (text) => {
          return text.toFixed(2)
        }
      }]
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType'
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
                <FormItem { ...formItemLayout } label={'商家名称'}>
                  {getFieldDecorator('merchantName', {})(
                    <Input placeholder='请输入商家名称' />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <Button type='primary' htmlType='submit'>查询</Button>
                <Button style={{ marginLeft: '20px' }} type='primary' onClick={this.exportData.bind(this)}>导出</Button>
              </Col>
            </Row>
        </Form>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            total: tableList.recordTotal,
            onChange: this.handleTableChange,
            pageSize: 20,
            current: tableList.currentPage || 1
          }}
          bordered />
      </div>
    )
  }
}

export default Form.create()(ShopPool)
