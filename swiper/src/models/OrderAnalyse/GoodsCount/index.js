import React, { Component } from 'react'
import { Form, DatePicker, Row, Col, Table, Button } from 'antd'
import { baseUrl2 } from 'Src/utils'
import moment from 'moment'

import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import style from './style.css'
import { columns1, columns2, columns3, columns4, bar1Data, bar2Data } from './data'
import api from 'Src/contants/api'
import { addSequence } from 'Src/utils/publicMethods'
import 'Util/common.css'

const RangePicker = DatePicker.RangePicker
const colors = {
  red: '#C03636',
  gray: '#aaaaaa'
}
let [chart1, chart2] = [{}]  // 图表实例
class Sort extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      colorList: [],                  // 柱状图颜色
      startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      rangePicker: [moment().subtract(7, 'days'), moment()],
      echart1: {},
      echart2: {},
      selectedBar: '',                // 选择的bar，选择的店铺名称
      selectedBarNum: '',             // 选择的bar，选择的店铺num
      colorLists: {                   // 柱状图颜色
        colorList1: [],
        colorList2: [],
      },
      tableList1: {},                 // 店铺营业清单数据
      tableList2: {},                 // 店铺退货清单数据
      tableList3: {},                 // 店铺营业统计-金额更多
      tableList4: {},                 // 店铺营业统计-数量更多
      table3PageSize: 20,             // 店铺营业统计-金额更多--每页显示条数
      table4PageSize: 20,             // 店铺营业统计-数量更多--每页显示条数
      showAmountMore: false,          // 店铺营业统计-金额更多-显示/隐藏
      showNumberMore: false,          // 店铺营业统计-数量更多-显示/隐藏
      flagAmount: 2,                  // 1:金额升序 2:金额倒序 3:数量升序 4:数量倒序
      flagNumber: 4,                  // 3:数量升序 4:数量倒序
    }
  }
  componentWillMount() {
    this.loadAll()
  }
  // 加载全部数据
  loadAll = () => {
    let [selectedBar, selectedBarNum] = ['', '']
    let colorLists = {
      colorList1: [],
      colorList2: [],
    }
    this.setState({
      selectedBar, selectedBarNum, colorLists
    }, () => {
      this._loadBar1()
      this._loadBar2()
      this._loadTable1()
      this._loadTable2()
      this._loadTable3()
      this._loadTable4()
    })
  }
  // 时间切换
  handleDateChange = (value) => {
    let startTime = ''
    let endTime = ''
    let rangePicker = value
    if (value.length) {
      startTime = moment(value[0]).format('YYYY-MM-DD')
      endTime = moment(value[1]).add(1, 'day').format('YYYY-MM-DD')
    }
    this.setState({
      startTime, endTime, rangePicker
    }, () => {
      this.loadAll()
    })
  }
  // 日、周、月时间切换
  handleChangeDate = (value, unit) => {
    let startTime = moment().subtract(value, unit).format('YYYY-MM-DD')
    let endTime = moment().format('YYYY-MM-DD')
    let rangePicker = [moment().subtract(value, unit), moment()]
    this.setState({
      rangePicker, startTime, endTime
    }, () => {
      this.loadAll()
    })
  }
  // 界面金额更多、数量更多显示隐藏
  showHideMore = (val) => {
    if (val === 'amountMore') {
      this.setState({ showAmountMore: true })
    } else if (val === 'numberMore') {
      this.setState({ showNumberMore: true })
    } else {
      this.setState({ showNumberMore: false, showAmountMore: false, flagAmount: 2 }, () => {
        chart1.resize()
        chart2.resize()
      })
    }
  }
  onChartReady1 = (echarts) => {
    chart1 = echarts
  }
  onChartReady2 = (echarts) => {
    chart2 = echarts
  }
  onChartClick = (param, echart) => {
    // 这边是根据店铺名称来确定的，默认是唯一的，后面如果不唯一要ID
    const { echart1, echart2 } = this.state
    let len = echart1.num.length || 0
    let colorList1 = []
    let colorList2 = []
    let selectedBarNum = this.state.selectedBarNum
    let selectedBar = this.state.selectedBar
    let echart2Num = echart2.num
    for (let i = 0; i <= len; i++) {
      colorList1.push(colors.red)
      colorList2.push(colors.red)
    }
    if (selectedBar !== param.name) {
      selectedBar = param.name
      colorList1[param.dataIndex] = colors.gray
      selectedBarNum = echart1.num[param.dataIndex]
      echart2Num.forEach((item, index) => {
        if (item === selectedBarNum) {
          colorList2[index] = colors.gray
        }
      })
    } else {
      selectedBar = ''
      selectedBarNum = ''
    }
    let colorLists = {
      colorList1,
      colorList2,
    }
    this.setState({ colorLists, selectedBar, selectedBarNum }, () => {
      this._loadTable1()
      this._loadTable2()
    })
  }
  // table1点击切换页面
  handlePagination1Change = (current) => {
    console.log(current)
    this._loadTable1({ current })
  }
  // table2点击切换页面
  handlePagination2Change = (current) => {
    this._loadTable2({ current })
  }
  // table3点击操作
  handleTable3Change = (pagination, filters, sorter) => {
    // descend ascend
    let flagAmount = sorter.order === 'ascend' ? 1 : 2
    let params = {
      pageSize: pagination.pageSize,
      current: pagination.current,
      flagAmount
    }
    this.setState({
      table3PageSize: pagination.pageSize
    }, () => {
      this._loadTable3(params)
    })
  }
  // table4点击操作
  handleTable4Change = (pagination, filters, sorter) => {
    let flagNumber = sorter.order === 'ascend' ? 3 : 4
    let params = {
      pageSize: pagination.pageSize,
      current: pagination.current,
      flagNumber
    }
    this.setState({
      table4PageSize: pagination.pageSize
    }, () => {
      this._loadTable4(params)
    })
  }
  _loadBar1 = async (params = {}) => {
    let res = await api.goodsCount.bar1({
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
    }) || {}
    if (res.yAxis.length > 1) {
      res.yAxis = res.yAxis.reverse()
      res.series = res.series.reverse()
      res.num = res.num.reverse()
    }
    this.setState({ echart1: res })
  }
  _loadBar2 = async (params = {}) => {
    let res = await api.goodsCount.bar2({
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
    }) || {}
    if (res.yAxis.length > 1) {
      res.yAxis = res.yAxis.reverse()
      res.series = res.series.reverse()
      res.num = res.num.reverse()
    }
    this.setState({ echart2: res })
  }
  _loadTable1 = async (params = {}) => {
    let res = await api.goodsCount.tableList1({
      pageSize: '10',
      pageNo: params.current || '1',
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
      flag: params.flagAmount === undefined ? this.state.flagAmount : params.flagAmount,
      num: params.selectedBarNum === undefined ? this.state.selectedBarNum : params.selectedBarNum,
    }) || {}
    if (res.data) {
      res.data = addSequence(res.data)  // 添加序列
    }
    this.setState({ tableList1: res })
  }
  _loadTable2 = async (params = {}) => {
    let res = await api.goodsCount.tableList2({
      pageSize: '10',
      pageNo: params.current || '1',
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
      num: params.selectedBarNum === undefined ? this.state.selectedBarNum : params.selectedBarNum,
    }) || {}
    if (res.data) {
      res.data = addSequence(res.data)  // 添加序列
    }
    this.setState({ tableList2: res })
  }
  _loadTable3 = async (params = {}) => {
    let res = await api.goodsCount.tableList3({
      pageSize: params.pageSize || '20',
      pageNo: params.current || '1',
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
      flag: params.flagAmount === undefined ? this.state.flagAmount : params.flagAmount,
    }) || {}
    if (res.data) {
      res.data = addSequence(res.data)  // 添加序列
    }
    this.setState({ tableList3: res })
  }
  _loadTable4 = async (params = {}) => {
    let res = await api.goodsCount.tableList4({
      pageSize: params.pageSize || '20',
      pageNo: params.current || '1',
      beginTime: params.startTime === undefined ? this.state.startTime : params.startTime,
      endTime: params.endTime === undefined ? this.state.endTime : params.endTime,
      flag: params.flagNumber === undefined ? this.state.flagNumber : params.flagNumber,
    }) || {}
    if (res.data) {
      res.data = addSequence(res.data)  // 添加序列
    }
    this.setState({ tableList4: res })
  }
  exportData1 = async() => {
    let res = await api.goodsCount.downLoad({
      beginTime: this.state.startTime,
      endTime: this.state.endTime,
      flag: this.state.flagAmount,
      num: this.state.selectedBarNum,
    }) || {}
    location.href = `${baseUrl2}/${res}`
  }
  exportData2 = async() => {
    let res = await api.goodsCount.downLoad({
      beginTime: this.state.startTime,
      endTime: this.state.endTime,
      flag: this.state.flagAmount,
    }) || {}
    location.href = `${baseUrl2}/${res}`
  }
  exportData3 = async() => {
    let res = await api.goodsCount.downLoad({
      beginTime: this.state.startTime,
      endTime: this.state.endTime,
      flag: this.state.flagNumber,
    }) || {}
    location.href = `${baseUrl2}/${res}`
  }
  render() {
    const { rangePicker, tableList1, tableList2, tableList3, tableList4, showAmountMore, showNumberMore, colorLists, echart1, echart2, table3PageSize = 20, table4PageSize = 20 } = this.state
    // 2个option对应2个图表
    let option1 = bar1Data(echart1, colorLists.colorList1)
    let option2 = bar2Data(echart2, colorLists.colorList2)
    return <div>
      <div className={style.form}>
        <label>时间段:</label>
        <RangePicker
          format='YYYY-MM-DD'
          value={rangePicker}
          getCalendarContainer={trigger => trigger.parentNode}
          onChange={ this.handleDateChange }
          disabledDate={current => current && current > moment().endOf('day')}
        />
        <Button value='small' onClick={() => this.handleChangeDate('7', 'day')}>近7天</Button>
        <Button value='small' onClick={() => this.handleChangeDate('30', 'day')}>近30天</Button>
        <Button value='small' onClick={() => this.handleChangeDate('60', 'day')}>近60天</Button>
      </div>
      { /* 界面初始化展示内容 */ }
      <div className={`${(showAmountMore === true || showNumberMore === true) ? 'hideElm' : ''}`}>
        <Row>
          <Col span={12}>
            <ReactEchartsCore
              echarts={echarts}
              option={option1}
              onChartReady={this.onChartReady1}
              className={style.charts}
              onEvents={{ click: params => this.onChartClick(params) }} />
            <span className='more' onClick={() => this.showHideMore('amountMore')}>更多</span>
          </Col>
          <Col span={12}>
            <ReactEchartsCore
              echarts={echarts}
              option={option2}
              onChartReady={this.onChartReady2}
              className={style.charts}/>
            <span className='more' onClick={() => this.showHideMore('numberMore')}>更多</span>
          </Col>
        </Row>
        <div>
          <div className='title'>
            <span>商品销售清单</span>
            <Button type='primary' onClick={ this.exportData1.bind(this) }>导出</Button>
          </div>
          <Table
            columns={columns1}
            rowKey='sequence'
            dataSource={tableList1.data}
            bordered
            scroll={{ x: 1250 }}
            pagination={{
              showQuickJumper: true,
              total: tableList1.rows,
              onChange: this.handlePagination1Change,
              pageSize: 10
            }}/>
          <Row>
            <Col span={2} offset={22}>
              <span className='more' style={{ paddingTop: '8px', float: 'left' }} onClick={() => this.showHideMore('amountMore')}>查看更多</span>
            </Col>
          </Row>
        </div>
        <div>
          <div className='title'>
            <span>商品退货清单</span>
          </div>
          <Table
            columns={columns2}
            rowKey='sequence'
            dataSource={tableList2.data}
            bordered
            scroll={{ x: 1105 }}
            pagination={{
              showQuickJumper: true,
              total: tableList2.rows,
              onChange: this.handlePagination2Change,
              pageSize: 10
            }}/>
        </div>
      </div>
      { /* 统计--金额更多 */ }
      <div className={`${showAmountMore === true ? '' : 'hideElm'}`}>
        <div className='title'>
          <span>商品销售清单</span>
          <Button type='primary' onClick={ this.exportData2.bind(this) }>导出</Button>
          <span onClick={() => this.showHideMore('back')}>返回</span>
        </div>
        <Table
          columns={columns3}
          rowKey='sequence'
          scroll={{ x: 1280, y: 595 }}
          dataSource={tableList3.data}
          bordered
          onChange={this.handleTable3Change}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            total: tableList3.rows,
            pageSize: table3PageSize,
            pageSizeOptions: ['20', '30', '40', '50']
          }}/>
      </div>
      { /* 统计--数量更多 */ }
      <div className={`${showNumberMore === true ? '' : 'hideElm'}`}>
        <div className='title'>
          <span>商品销售清单</span>
          <Button type='primary' onClick={ this.exportData3.bind(this) }>导出</Button>
          <span onClick={() => this.showHideMore('back')}>返回</span>
        </div>
        <Table
          columns={columns4}
          rowKey='sequence'
          scroll={{ x: 1280, y: 595 }}
          dataSource={tableList4.data}
          bordered
          onChange={this.handleTable4Change}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            total: tableList4.rows,
            pageSize: table4PageSize,
            pageSizeOptions: ['20', '30', '40', '50']
          }}/>
      </div>
    </div>
  }
}

export default Form.create()(Sort)
