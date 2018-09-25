/**
 * @Author: sunshiqiang
 * @Date: 2018-03-05 17:31:50
 * @Title: 交易额统计
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

class TurnoverCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radioValue: 0, // 年月日状态
      mode: ['date', 'date'], // RangePicker日期选择模式
      tableData: {}, // 数据
      echartsData: {}, // 数据
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
    this._loadEcharts()
    this._loadTable()
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
          this._loadEcharts()
          this._loadTable()
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
  _loadTable = async (currentPage) => { // 数据加载
    const tableData = await api.OperatingReport.PlatformBase.TurnoverCount.tableData({
      pageSize: '20',
      pageNo: currentPage || '1',
      ...this.state.searchParams
    }) || {}
    this.setState({ tableData })
  }
  _loadEcharts = async () => { // 数据加载
    const data = await api.OperatingReport.PlatformBase.TurnoverCount.echartsData({
      ...this.state.searchParams
    }) || []
    const echartsData = this._sortData(data)
    this.setState({ echartsData })
  }
  _sortData = (arr) => {
    const temp = {}
    arr.forEach(item => {
      for (let key in item) {
        if (temp[key] === undefined) {
          temp[key] = []
          temp[key].push(item[key])
        } else {
          temp[key].push(item[key])
        }
      }
    })
    return temp
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { radioValue, mode, tableData, echartsData, dateFromOptions, dateToOptions, searchParams } = this.state
    const defaultGlobalColor = ['#5d9cec', '#62c87f', '#f15755', '#fc863f', '#7053b6']
    const barOption = {
      title: {
        top: 10,
        textStyle: {
          fontSize: 18,
          fontWeight: 400
        }
      },
      color: defaultGlobalColor,
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      axisPointer: {
        link: { xAxisIndex: 'all' }
      },
      legend: {
        top: 10,
        width: 500,
        data: ['电商总金额', '团购总金额', '外卖总金额', '旅游总金额', '票务总金额', '电商订单数',
          '团购订单数', '外卖订单数', '旅游订单数', '票务订单数']
      },
      grid: [{
        height: '35%'
      }, {
        top: '55%',
        height: '35%'
      }],
      xAxis: [
        {
          type: 'category',
          data: echartsData.recordDate,
          boundaryGap: false,
          // axisTick: {
          //   alignWithLabel: true
          // }
        },
        {
          gridIndex: 1,
          type: 'category',
          data: echartsData.recordDate,
          boundaryGap: false,
          position: 'top',
          // axisTick: {
          //   alignWithLabel: true
          // }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '金额',
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        {
          type: 'value',
          name: '订单数',
          // nameLocation: 'start',
          gridIndex: 1,
          inverse: true,
          axisLabel: {
            formatter: '{value} 个'
          }
        }
      ],
      series: [
        {
          name: '电商总金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.ecommerceAmountTotal
        },
        {
          name: '团购总金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.groupbuyAmountTotal
        },
        {
          name: '外卖总金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.takeawayAmountTotal
        },
        {
          name: '旅游总金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.travelAmountTotal
        },
        {
          name: '票务总金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.ticketAmountTotal
        },
        {
          name: '电商订单数',
          type: 'line',
          smooth: true,
          stack: '总量2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {
            normal: {}
          },
          data: echartsData.ecommerceOrderTotal
        },
        {
          name: '团购订单数',
          type: 'line',
          smooth: true,
          stack: '总量2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {
            normal: {}
          },
          data: echartsData.groupbuyOrderTotal
        },
        {
          name: '外卖订单数',
          type: 'line',
          smooth: true,
          stack: '总量2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {
            normal: {}
          },
          data: echartsData.takeawayOrderTotal
        },
        {
          name: '旅游订单数',
          type: 'line',
          smooth: true,
          stack: '总量2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {
            normal: {}
          },
          data: echartsData.travelOrderTotal
        },
        {
          name: '票务订单数',
          type: 'line',
          smooth: true,
          stack: '总量2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {
            normal: {}
          },
          data: echartsData.ticketOrderTotal
        }
      ]
    }
    const columns = [
      {
        title: '统计时间',
        dataIndex: 'recordDate',
        key: 'recordDate',
        fixed: 'left',
        width: 120,
      }, {
        title: <span>电商交易<br/>(订单数)</span>,
        dataIndex: 'ecommerceOrderTotal',
        key: 'ecommerceOrderTotal',
      }, {
        title: <span>电商交易<br/>(金额)</span>,
        dataIndex: 'ecommerceAmountTotal',
        key: 'ecommerceAmountTotal',
      }, {
        title: <span>团购交易<br/>(订单数)</span>,
        dataIndex: 'groupbuyOrderTotal',
        key: 'groupbuyOrderTotal',
      }, {
        title: <span>团购交易<br/>(金额)</span>,
        dataIndex: 'groupbuyAmountTotal',
        key: 'groupbuyAmountTotal',
      }, {
        title: <span>外卖交易<br/>(订单数)</span>,
        dataIndex: 'takeawayOrderTotal',
        key: 'takeawayOrderTotal',
      }, {
        title: <span>外卖交易<br/>(金额)</span>,
        dataIndex: 'takeawayAmountTotal',
        key: 'takeawayAmountTotal',
      }, {
        title: <span>旅游交易<br/>(订单数)</span>,
        dataIndex: 'travelOrderTotal',
        key: 'travelOrderTotal',
      }, {
        title: <span>旅游交易<br/>(金额)</span>,
        dataIndex: 'travelAmountTotal',
        key: 'travelAmountTotal',
      }, {
        title: <span>票务交易<br/>(订单数)</span>,
        dataIndex: 'ticketOrderTotal',
        key: 'ticketOrderTotal',
      }, {
        title: <span>票务交易<br/>(金额)</span>,
        dataIndex: 'ticketAmountTotal',
        key: 'ticketAmountTotal',
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
        <FormItem>
          <Button type='primary' disabled={radioValue === 2 ? !getFieldValue('dateFrom') || !getFieldValue('dateTo') : !getFieldValue('time') || !getFieldValue('time').length} href={api.OperatingReport.PlatformBase.TurnoverCount.export(searchParams)} download>
            导出
          </Button>
        </FormItem>
      </Form>
      <ReactEcharts
        style={{ height: '600px' }}
        option={barOption}
        notMerge={true}
        lazyUpdate={true}
        theme={'line'}/>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        rowKey='recordDate'
        dataSource={tableData.list}
        pagination={{
          showQuickJumper: true,
          total: tableData.recordTotal,
          onChange: this._loadTable,
          pageSize: 20,
          current: tableData.currentPage
        }}/>
    </div>
  }
}

export default Form.create()(TurnoverCount)
