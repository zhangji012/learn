/**
 * @Author: sunshiqiang
 * @Date: 2018-03-05 17:04:03
 * @Title: 产业消费金额
 */
import React, { Component } from 'react'
import { Form, Button, DatePicker, Select, Table } from 'antd'
import api from 'Contants/api'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const Option = Select.Option

class IndustrialAmount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: {}, // 表格数据
      echartsData: [], // 图形数据
      industryOptions: [], // 产业列表
      searchParams: {}
    }
  }

  async componentWillMount() {
    const data = await api.OperatingReport.getIndustryInfos({}) || []
    console.log(data)
    const industryOptions = data.map(item => <Option key={item.industryNo} value={item.industryNo}>
      {item.industryName}
    </Option>)
    this.setState({
      industryOptions
    })
    // this._loadList()
  }

  handleSearch = async (e) => { // 提交查询信息
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const searchParams = {
          dateFrom: values.time && values.time[0] ? values.time[0].format('YYYY-MM-DD') : '',
          dateTo: values.time && values.time[1] ? values.time[1].format('YYYY-MM-DD') : '',
          industryNo: values.industryNo
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
  _loadEcharts = async () => { // 数据加载
    const data = await api.OperatingReport.IndustrialAmount.echartsData({
      ...this.state.searchParams
    }) || []
    const echartsData = this._sortData(data)
    this.setState({ echartsData })
  }
  _loadTable = async (currentPage) => { // 数据加载
    const tableData = await api.OperatingReport.IndustrialAmount.tableData({
      pageSize: '20',
      pageNo: currentPage || '1',
      ...this.state.searchParams
    }) || {}
    this.setState({ tableData })
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
    const { radioValue, tableData, industryOptions, searchParams, echartsData } = this.state
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
      legend: {
        top: 20,
        data: ['线上消费金额', '线下消费金额', '总合计']
      },
      grid: {
        top: 45,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: echartsData.ymd,
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          name: '金额',
          type: 'value'
        }
      ],
      series: [
        {
          name: '线上消费金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.onlineSum
        },
        {
          name: '线下消费金额',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.offlineSum
        },
        // {
        //   name: '总合计',
        //   type: 'line',
        //   smooth: true,
        //   stack: '总量',
        //   areaStyle: {
        //     normal: {}
        //   },
        //   data: echartsData.allSum
        // }
      ]
    }
    const columns = [{
      title: '日期',
      dataIndex: 'ymd',
      key: 'ymd',
    }, {
      title: '产业名称',
      dataIndex: 'industryName',
      key: 'industryName',
    }, {
      title: '线上消费金额',
      dataIndex: 'onlineSum',
      key: 'onlineSum',
    }, {
      title: '线下消费金额',
      dataIndex: 'offlineSum',
      key: 'offlineSum',
    }, {
      title: '总合计',
      dataIndex: 'allSum',
      key: 'allSum',
    }]
    console.log(getFieldValue('time'))
    return <div>
      <Form onSubmit={this.handleSearch}
            layout='inline'
      >
        {radioValue !== 2 ? <FormItem
          label='起止时间'>
          {getFieldDecorator('time', {})(<RangePicker
            format={'YYYY-MM-DD'}
            disabledDate={current => current && current > moment().endOf('day')}
          />)}
        </FormItem> : null}
        <FormItem>
          {getFieldDecorator('industryNo', {
            initialValue: ''
          })(<Select style={{ width: 120 }}>
            <Option value={''}>选择产业</Option>
            {industryOptions}
          </Select>)}
        </FormItem>
        <FormItem>
          <Button disabled={!getFieldValue('time') || !getFieldValue('time').length || (getFieldValue('industryNo') === '')} type='primary' htmlType='submit'>查询</Button>
        </FormItem>
        <FormItem>
          <Button disabled={!getFieldValue('time') || !getFieldValue('time').length || (getFieldValue('industryNo') === '')} type='primary' href={api.OperatingReport.IndustrialAmount.export(searchParams)} download>
            导出
          </Button>
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
        rowKey='ymd'
        dataSource={tableData.data}
        pagination={{
          showQuickJumper: true,
          total: tableData.records,
          onChange: this._loadTable,
          pageSize: 20,
          current: tableData.pageNo
        }}/>
    </div>
  }
}

export default Form.create()(IndustrialAmount)
