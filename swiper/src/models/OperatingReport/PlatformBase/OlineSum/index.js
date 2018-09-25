/**
 * @Author: sunshiqiang
 * @Date: 2018-03-05 17:30:51
 * @Title: 线上汇总
 */
import React, { Component } from 'react'
import { Form, Radio, Button, DatePicker, Select, Table } from 'antd'
import moment from 'moment'
import api from 'Contants/api'
import ReactEcharts from 'echarts-for-react'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker
const Option = Select.Option

const dateMap = [
  {
    format: 'YYYY-MM-DD',
    mode: ['date', 'date'],
  },
  {
    format: 'YYYY-MM',
    mode: ['month', 'month'],
  },
  {
    format: 'YYYY',
    mode: ['year', 'year'],
  }
]

class OlineSum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radioValue: 0, // 年月日状态
      mode: ['date', 'date'], // RangePicker日期选择模式
      echartsData: [], // 数据
      tableData: [], // 数据
      dateFromOptions: [], // 开始年份
      dateToOptions: [], // 结束年份
      searchParams: {
        cycle: 0,
        dateFrom: moment(new Date(new Date() - 1000 * 60 * 60 * 24 * 7)).format('YYYY-MM-DD'),
        dateTo: moment(new Date()).format('YYYY-MM-DD'),
      }
    }
  }

  componentWillMount() {
    this._reactYear()
    this.handleQuickSearch(7)
    this._loadList()
  }

  handleSearch = async (e) => { // 提交查询信息
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let searchParams = {}
        if (this.state.radioValue === 2) {
          searchParams = values
        } else {
          searchParams = {
            cycle: values.cycle,
            dateFrom: values.time && values.time[0] ? values.time[0].format(dateMap[this.state.radioValue].format) : '',
            dateTo: values.time && values.time[1] ? values.time[1].format(dateMap[this.state.radioValue].format) : '',
          }
        }
        this.setState({
          searchParams
        }, () => {
          this._loadList()
        })
      }
    })
  }
  handleRadio = (e) => { // 单选
    e.preventDefault()
    this.props.form.setFieldsValue({
      quickSearch: 0
    })
    if (e.target.value === 2) {
      this._reactYear()
    }
    this.setState({
      radioValue: e.target.value
    }, () => {
      this.props.form.setFieldsValue({
        time: undefined
      })
      this.setState({
        mode: dateMap[this.state.radioValue].mode
      })
    })
  }
  handleQuickSearch = (value) => { // 快速查询
    console.log(value)
    if (value !== 0) {
      this.setState({
        radioValue: 0,
        mode: dateMap[0].mode
      }, () => {
        moment(new Date(new Date() - 1000 * 60 * 60 * 24 * 30))
        this.props.form.setFieldsValue({
          cycle: 0,
          time: [moment(new Date(new Date() - 1000 * 60 * 60 * 24 * value)),
            moment(new Date())]
        })
      })
    }
  }
  handlePanelChange = (value, mode) => { // 日或月时间范围变化设置
    this.props.form.setFieldsValue({
      quickSearch: 0
    })
    this.props.form.setFieldsValue({
      time: value
    })
    this.setState({
      mode: [
        mode[0] === 'date' ? dateMap[this.state.radioValue].mode[0] : mode[0],
        mode[1] === 'date' ? dateMap[this.state.radioValue].mode[1] : mode[1],
      ]
    })
  }
  handleTimeChange = () => { // 日或月时间控件数值变化取消快速查询
    this.props.form.setFieldsValue({
      quickSearch: 0
    })
  }
  handleSelectYear = (value, key) => { // 年选择变化
    const year = new Date().getFullYear()
    const temp = []
    if (key === 'dateFrom') {
      value = value || 2000
      for (let i = year; i >= value; i--) {
        temp.push(<Option key={i} value={i}>{i}</Option>)
      }
      this.setState({
        dateToOptions: [...temp]
      })
    } else {
      value = value || 2018
      for (let i = value; i >= 2000; i--) {
        temp.push(<Option key={i} value={i}>{i}</Option>)
      }
      this.setState({
        dateFromOptions: [...temp]
      })
    }
  }
  _reactYear() {
    const year = new Date().getFullYear()
    const temp = []
    for (let i = year; i >= 2000; i--) {
      temp.push(<Option key={i} value={i}>{i}</Option>)
    }
    this.setState({
      dateFromOptions: [...temp],
      dateToOptions: [...temp]
    })
  }
  _loadList = async () => { // 数据加载
    const data = await api.OperatingReport.PlatformBase.OlineSum.list({
      ...this.state.searchParams
    })
    const echartsData = this._sortData(data)
    this.setState({ tableData: data ? [data] : [], echartsData })
  }
  _sortData = (obj) => {
    const map = {
      ecommerceAmountTotal: '电商',
      groupBuyAmountTotal: '团购',
      takeawayAmountTotal: '外卖',
      travelAmountTotal: '旅游',
      ticketAmountTotal: '票务',
    }
    const temp = []
    if (obj) {
      for (let key in obj) {
        map[key] && temp.push({
          value: obj[key], name: map[key]
        })
      }
    }
    return temp
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { radioValue, mode, tableData, echartsData, dateFromOptions, dateToOptions } = this.state
    const defaultGlobalColor = ['#5d9cec', '#62c87f', '#f15755', '#fc863f', '#7053b6']
    console.log(echartsData)
    const barOption = {
      color: defaultGlobalColor,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        confine: true
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 20,
        data: ['电商', '团购', '外卖', '旅游', '票务']
      },
      series: [
        {
          name: '线上汇总',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: echartsData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const columns = [{
      title: '日期',
      dataIndex: 'recordDate',
      key: 'recordDate',
    }, {
      title: '电商',
      dataIndex: 'ecommerceAmountTotal',
      key: 'ecommerceAmountTotal',
    }, {
      title: '团购',
      dataIndex: 'groupBuyAmountTotal',
      key: 'groupBuyAmountTotal',
    }, {
      title: '外卖',
      dataIndex: 'takeawayAmountTotal',
      key: 'takeawayAmountTotal',
    }, {
      title: '旅游',
      dataIndex: 'travelAmountTotal',
      key: 'travelAmountTotal',
    }, {
      title: '票务',
      dataIndex: 'ticketAmountTotal',
      key: 'ticketAmountTotal',
    }, {
      title: '汇总',
      dataIndex: 'amountTotal',
      key: 'amountTotal',
    }]
    return <div>
      <Form onSubmit={this.handleSearch}
            layout='inline'
      >
        <FormItem>
          {getFieldDecorator('cycle', {
            initialValue: radioValue
          })(
            <RadioGroup onChange={this.handleRadio}>
              <Radio value={0}>日</Radio>
              <Radio value={1}>月</Radio>
              <Radio value={2}>年</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {radioValue !== 2 ? <FormItem
          label='起止时间'>
          {getFieldDecorator('time', {})(<RangePicker
            format={dateMap[radioValue].format}
            mode={mode}
            onPanelChange={this.handlePanelChange}
            onChange={this.handleTimeChange}
            disabledDate={current => current && current > moment().endOf('day')}
          />)}
        </FormItem> : null}
        {radioValue === 2 ? <FormItem
          label='起止时间'>
          {getFieldDecorator('dateFrom', {
            initialValue: ''
          })(<Select style={{ width: 120 }} onChange={value => this.handleSelectYear(value, 'dateFrom')}>
            <Option value=''>选择年份</Option>
            {dateFromOptions}
          </Select>)}
        </FormItem> : null}
        {radioValue === 2 ? <FormItem>-
        </FormItem> : null}
        {radioValue === 2 ? <FormItem>
          {getFieldDecorator('dateTo', {
            initialValue: ''
          })(<Select style={{ width: 120 }} onChange={value => this.handleSelectYear(value, 'dateTo')}>
            <Option value=''>选择年份</Option>
            {dateToOptions}
          </Select>)}
        </FormItem> : null}
        <FormItem>
          {getFieldDecorator('quickSearch', {
            initialValue: 7
          })(<Select style={{ width: 120 }} onChange={this.handleQuickSearch}>
            <Option value={0}>快速查询</Option>
            <Option value={7}>过去7天</Option>
            <Option value={30}>过去30天</Option>
            <Option value={60}>过去60天</Option>
          </Select>)}
        </FormItem>
        <FormItem>
          <Button disabled={radioValue === 2 ? !getFieldValue('dateFrom') || !getFieldValue('dateTo') : !getFieldValue('time') || !getFieldValue('time').length} type='primary' htmlType='submit'>查询</Button>
        </FormItem>
      </Form>
      <ReactEcharts
        style={{ height: '300px' }}
        option={barOption}
        notMerge={true}
        lazyUpdate={true}
        theme={'line'}/>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        rowKey='recordDate'
        dataSource={tableData}
        pagination={false}/>
    </div>
  }
}

export default Form.create()(OlineSum)
