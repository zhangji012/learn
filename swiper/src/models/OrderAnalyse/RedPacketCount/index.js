import React, { Component } from 'react'
import { Row, Col } from 'antd'
// import moment from 'moment'
import Table from './TableComponent'
import Form from './FormComponent'

import moment from 'moment'

import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import api from 'Src/contants/api'
const { lineByDay, lineByMonth, tableList } = api.redPacketCount

import style from './index.css'

import { lineData, pieData, columns } from './data'

export default class RedPacketCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: '1',
      pageSize: '10',
      pageTotal: '0',
      onChooseIndex: '',
      // 线形图数据
      xAxis: [],
      lineSeries: [],
      lineSeriesSingle: [],
      // 饼状图数据
      pieSeries: [],
      pieSeriesSingle: [],
      // 表格数据
      dataSource: [],
      dataSourceSingle: []
    }
    this.begin = moment().format('YYYY-MM-DD')
    this.end = moment().format('YYYY-MM-DD')
    this.unit = 'day'
  }
  componentDidMount() {
    this.request()
  }
  /**
   * 时间选择回调
   * @param {*} val
   */
  onSearch = val => {
    this.begin =
      this.unit === 'day'
        ? moment(val[0]).format('YYYY-MM-DD')
        : moment(val[0]).format('YYYY-MM')
    this.end =
      this.unit === 'day'
        ? moment(val[1]).format('YYYY-MM-DD')
        : moment(val[1]).format('YYYY-MM')
    this.request()
  }
  /**
   * 日期模式选择
   * @param {*} val
   */
  unitCb = val => {
    this.unit = val
    this.request()
  }
  /**
   * 折线图点击toggle事件
   * @param {*} params
   */
  toggleClick = async params => {
    const { onChooseIndex, xAxis, pageSize } = this.state
    const index = onChooseIndex === params.dataIndex ? '' : params.dataIndex
    if (!Object.is(index, '')) {
      const begin = xAxis[params.dataIndex]

      const end =
        this.unit === 'day'
          ? moment(begin).add(1, 'd').format('YYYY-MM-DD')
          : moment(begin).add(1, 'months').format('YYYY-MM')

      const pieParams = {
        beginTime: begin,
        endTime: end,
        flag: 1
      }
      const tableParams = {
        beginTime: begin,
        endTime: end,
        pageSize: pageSize,
        pageNo: 1
      }
      this.pieReq(pieParams, index)
      this.tableReq(tableParams, index)
    }
    this.setState({ onChooseIndex: index })
  }
  /**
   * 请求数据方法
   */
  request = () => {
    const { pageNo, onChooseIndex, pageSize } = this.state
    const begin =
      this.unit === 'day'
        ? moment(this.begin).format('YYYY-MM-DD')
        : moment(this.begin).format('YYYY-MM')
    const end =
      this.unit === 'day'
        ? moment(this.end).add(1, 'd').format('YYYY-MM-DD')
        : moment(this.end).add(1, 'months').format('YYYY-MM')
    const lineParams = {
      beginTime: begin,
      endTime: end,
      flag: 0
    }
    const pieParams = {
      beginTime: begin,
      endTime: end,
      flag: 1
    }
    const tableParams = {
      beginTime: begin,
      endTime: end,
      pageSize: pageSize,
      pageNo
    }

    this.lineReq(lineParams, onChooseIndex)
    this.pieReq(pieParams, onChooseIndex)
    this.tableReq(tableParams, onChooseIndex)
  }
  lineReq = async (params, type) => {
    const req = params =>
      this.unit === 'day' ? lineByDay(params) : lineByMonth(params)
    const lineData = (await req(params)) || []
    this.setState({
      xAxis: lineData.yAxis || [],
      lineSeries: [lineData.series, lineData.num]
    })
  }
  pieReq = async (params, type) => {
    const req = params =>
      this.unit === 'day' ? lineByDay(params) : lineByMonth(params)
    const pieSeries = (await req(params)) || []
    if (!Object.is(type, '')) {
      this.setState({
        pieSeriesSingle: pieSeries
      })
    } else {
      this.setState({ pieSeries })
    }
  }
  tableReq = async (params, type) => {
    const { data, rows } = (await tableList(params)) || []
    if (!Object.is(type, '')) {
      this.setState({
        dataSourceSingle: data,
        pageTotalSingle: rows
      })
    } else {
      this.setState({
        dataSource: data,
        pageTotal: rows
      })
    }
  }
  renderCharts() {
    const {
      xAxis,
      lineSeries,
      pieSeries,
      pieSeriesSingle,
      onChooseIndex
    } = this.state
    return (
      <div className={style.charts}>
        <Row>
          <Col span={16}>
            <ReactEchartsCore
              echarts={echarts}
              option={lineData(xAxis, lineSeries)}
              onEvents={{ click: params => this.toggleClick(params) }}
            />
          </Col>
          <Col span={8}>
            <ReactEchartsCore
              echarts={echarts}
              option={pieData(
                !Object.is(onChooseIndex, '') ? pieSeriesSingle : pieSeries
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
  render() {
    const {
      dataSource,
      dataSourceSingle,
      pageTotal,
      pageTotalSingle,
      onChooseIndex
    } = this.state
    return (
      <div>
        <Form onSearch={this.onSearch} unitCb={this.unitCb} />
        {this.renderCharts()}
        <Table
          columns={columns}
          dataSource={
            !Object.is(onChooseIndex, '') ? dataSourceSingle : dataSource
          }
          title='红包发放清单'
          downloadData={{
            beginTime: this.begin,
            endTime: this.end
          }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            total: !Object.is(onChooseIndex, '') ? pageTotalSingle : pageTotal,
            onChange: page => {
              this.setState({ pageNo: page }, () => this.request())
            },
            onShowSizeChange: (current, size) => {
              this.setState({ pageSize: size }, () => this.request())
            }
          }}
        />
      </div>
    )
  }
}
