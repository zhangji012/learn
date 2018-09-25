/**
 * @Author: sunshiqiang
 * @Date: 2018-03-05 17:29:06
 * @Title: 产业消费金额汇总
 */
import React, { Component } from 'react'
import { Form, Button, DatePicker } from 'antd'
import api from 'Contants/api'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'

const FormItem = Form.Item
const { RangePicker } = DatePicker

class IndustrialASum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      echartsData: {}, // 数据
      searchParams: {
        dateFrom: moment(new Date(new Date() - 1000 * 60 * 60 * 24 * 7)).format('YYYY-MM-DD'),
        dateTo: moment(new Date()).format('YYYY-MM-DD'),
      }
    }
  }

  componentWillMount() {
    this._loadList()
  }

  handleSearch = async (e) => { // 提交查询信息
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const searchParams = {
          dateFrom: values.time && values.time[0] ? values.time[0].format('YYYY-MM-DD') : '',
          dateTo: values.time && values.time[1] ? values.time[1].format('YYYY-MM-DD') : '',
        }
        this.setState({
          searchParams
        }, () => {
          this._loadList()
        })
      }
    })
  }
  _loadList = async () => { // 数据加载
    const data = await api.OperatingReport.IndustrialASum.list({
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
    const { echartsData } = this.state
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
        data: ['线上消费', '线下消费']
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
          data: echartsData.industryName,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: function (value, index) {
              let char = ''
              value.split('').forEach(item => {
                char += item + '\n'
              })
              return char
            }
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
          name: '线上消费',
          type: 'bar',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.onlineSum
        },
        {
          name: '线下消费',
          type: 'bar',
          smooth: true,
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: echartsData.offlineSum
        }
      ]
    }
    return <div>
      <Form onSubmit={this.handleSearch}
            layout='inline'
      >
        <FormItem
          label='起止时间'>
          {getFieldDecorator('time', {
            initialValue: [moment(new Date(new Date() - 1000 * 60 * 60 * 24 * 7)), moment(new Date())]
          })(<RangePicker
            format={'YYYY-MM-DD'}
            disabledDate={current => current && current > moment().endOf('day')}
          />)}
        </FormItem>
        <FormItem>
          <Button disabled={!getFieldValue('time') || !getFieldValue('time').length} type='primary' htmlType='submit'>查询</Button>
        </FormItem>
      </Form>
      <ReactEcharts
        style={{ height: '400px' }}
        option={barOption}
        notMerge={true}
        lazyUpdate={true}
        theme={'line'}/>
    </div>
  }
}

export default Form.create()(IndustrialASum)
