import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { DatePicker, Select, Button } from 'antd'
const { RangePicker } = DatePicker
const { Option } = Select

import style from './index.css'

export default class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchUnit: 'day',
      value: [moment().subtract(7, 'days'), moment()]
    }
    this.size = 'default'
  }
  /**
   * 父组件查询事件回调
   */
  onSearch() {
    const { onSearch } = this.props
    const { value } = this.state
    onSearch(value)
  }
  /**
   * 下拉事件
   */
  selectUnit(searchUnit) {
    const { value } = this.state
    const beginTime =
      searchUnit === 'day'
        ? moment(value[0]).format('YYYY-MM-DD')
        : moment(value[0]).format('YYYY-MM')
    let endTime =
      searchUnit === 'day'
        ? moment(value[1]).format('YYYY-MM-DD')
        : moment(value[1]).format('YYYY-MM')
    if (Object.is(beginTime, endTime)) {
      endTime = searchUnit === 'day' ? moment(endTime).add(1, 'd').format('YYYY-MM-DD') : moment(endTime).add(1, 'months').format('YYYY-MM')
    }
    // debugger
    const { unitCb } = this.props
    this.setState({ searchUnit, value: [moment(beginTime), moment(endTime)] }, () => {
      unitCb(searchUnit)
    })
  }
  /**
   * 日历选择回调
   */
  handleChange(value) {
    this.setState({ value })
  }
  /**
   * 快捷修改日期
   * @param {*} value
   */
  changeDate(value, unit) {
    this.setState({ value: [moment().subtract(value, unit), moment()] }, () => {
      this.onSearch()
    })
  }

  renderDatePicker() {
    const { searchUnit, value } = this.state
    switch (searchUnit) {
      case 'month':
        return (
          <RangePicker
            showTime
            placeholder={['开始时间', '结束时间']}
            value={value}
            mode={['month', 'month']}
            format='YYYY-MM'
            onPanelChange={value => this.handleChange(value)}
            onOk={() => this.onSearch()}
          />
        )
      case 'day':
        return (
          <RangePicker
            showTime
            placeholder={['开始时间', '结束时间']}
            value={value}
            mode={['date', 'date']}
            format='YYYY-MM-DD'
            onChange={value => this.handleChange(value)}
            onOk={() => this.onSearch()}
          />
        )
      default:
        break
    }
  }

  renderBtn() {
    const { searchUnit } = this.state
    const size = this.size
    switch (searchUnit) {
      case 'month':
        return (
          <div className={style['quick-search']}>
            <Button size={size} onClick={() => this.changeDate(6, 'month')}>
              过去6个月
            </Button>
            <Button size={size} onClick={() => this.changeDate(12, 'month')}>
              过去12个月
            </Button>
          </div>
        )
      case 'day':
      default:
        return (
          <div className={style['quick-search']}>
            <Button size={size} onClick={() => this.changeDate(7, 'day')}>
              过去7天
            </Button>
            <Button size={size} onClick={() => this.changeDate(30, 'day')}>
              过去30天
            </Button>
            <Button size={size} onClick={() => this.changeDate(60, 'day')}>
              过去60天
            </Button>
          </div>
        )
    }
  }

  renderSelect() {
    return (
      <Select
        defaultValue='day'
        onChange={value => this.selectUnit(value)}
        style={{ marginLeft: '30px' }}
      >
        <Option value='day' key='day'>
          按日
        </Option>
        <Option value='month' key='month'>
          按月
        </Option>
      </Select>
    )
  }

  render() {
    return (
      <div className={style.form}>
        <span>日期选择：</span>
        {this.renderDatePicker()}
        {this.renderBtn()}
        {this.renderSelect()}
      </div>
    )
  }
  componentDidMount() {
    const { onSearch } = this.props
    onSearch(this.state.value)
  }
}
