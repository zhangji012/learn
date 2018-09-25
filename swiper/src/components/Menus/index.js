/**
 * Created by yiming on 2017/6/20.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import * as urls from '../../contants/url'
import classNames from 'classnames'
import Style from './style.css'
import api from 'Src/contants/api'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      data: []
    }
  }

  getMenuItemClass(str) {
    const pathName = decodeURI(location.pathname)
    if (str !== urls.HOME) {
      return classNames({
        'ant-menu-item-selected': new RegExp(str + '$').test(pathName)
      })
    }
    return classNames({
      'ant-menu-item-selected': pathName === str
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline'
    })
  }

  async componentWillMount() {
    // const res = await api.platLogin.ssoLogin.getMenu({ timestamp: (new Date()).getTime() }) || []
    // const res = []
    const res2 = await api.platLogin.ssoLogin.getMenu2()

    console.log(res2)
    // let menus = {}
    // if (res2.power.childrens[0].childrens.length > 0) {
    //   menus = {
    //     key: 'mams_order', value: '订单分析', icon: 'bar-chart',
    //     children: []
    //   }
    //   let childrens = res2.power.childrens[0].childrens
    //   if (childrens.length === 3) {
    //     childrens.forEach(item => {
    //       if (item.functonName === '红包统计') {
    //         menus.children[2] = { key: 'mams_order_msg3', value: '红包统计', icon: 'pay-circle-o', url: 'urls.ORDERANALYSE_3', children: null }
    //       } else if (item.functonName === '商品销售统计') {
    //         menus.children[1] = { key: 'mams_order_msg2', value: '商品销售统计', icon: 'shopping-cart', url: 'urls.ORDERANALYSE_2', children: null }
    //       } else if (item.functonName === '店铺营业统计') {
    //         menus.children[0] = { key: 'mams_order_msg1', value: '店铺营业统计', icon: 'bank', url: 'urls.ORDERANALYSE_1', children: null }
    //       }
    //     })
    //   } else {
    //     childrens.forEach(item => {
    //       if (item.functonName === '红包统计') {
    //         menus.children.push({ key: 'mams_order_msg3', value: '红包统计', icon: 'pay-circle-o', url: 'urls.ORDERANALYSE_3', children: null })
    //       } else if (item.functonName === '商品销售统计') {
    //         menus.children.unshift({ key: 'mams_order_msg2', value: '商品销售统计', icon: 'shopping-cart', url: 'urls.ORDERANALYSE_2', children: null })
    //       } else if (item.functonName === '店铺营业统计') {
    //         menus.children.unshift({ key: 'mams_order_msg1', value: '店铺营业统计', icon: 'bank', url: 'urls.ORDERANALYSE_1', children: null })
    //       }
    //     })
    //   }
    // }
    // res.push(menus)
    // this.setState({
    //   data: res
    // })
    this.setState({
      data: [
        { key: 'home', value: '首页', icon: 'home', url: 'urls.HOME', 'children': null },
        {
          key: 'operating_report', value: '运营报表', icon: 'area-chart',
          children: [
            { key: 'platform_base', value: '平台基础数据', icon: 'area-chart',
              children: [
                { key: 'jcb_count', value: '金诚币统计', icon: 'pay-circle-o', url: 'urls.JCB_COUNT', 'children': null },
                { key: 'turnover_count', value: '交易额统计', icon: 'bank', url: 'urls.TURNOVER_COUNT', 'children': null },
                { key: 'online_sum', value: '线上汇总', icon: 'pie-chart', url: 'urls.OLINE_SUM', 'children': null },
              ]
            },
            { key: 'industrial_amount', value: '产业消费金额', icon: 'pay-circle-o', url: 'urls.INDUSTRIAL_AMOUNT', 'children': null },
            { key: 'industrial_asum', value: '产业消费金额汇总', icon: 'bank', url: 'urls.INDUSTRIAL_ASUM', 'children': null },
          ]
        },
        {
          key: 'money_report', value: '财务报表', icon: 'line-chart',
          children: [
            { key: 'selldetail_count', value: '销售明细统计', icon: 'book', url: 'urls.SELLDETAIL_COUNT', children: null },
            { key: 'prosell_pool', value: '商品销售汇总', icon: 'shopping-cart', url: 'urls.PROSELL_POOL', children: null },
            { key: 'shop_pool', value: '店铺汇总', icon: 'shop', url: 'urls.SHOP_POOL', children: null },
          ]
        },
        {
          key: 'mams_order', value: '订单分析', icon: 'bar-chart',
          children: [
            { key: 'mams_order_msg1', value: '店铺营业统计', icon: 'bank', url: 'urls.ORDERANALYSE_1', children: null },
            { key: 'mams_order_msg2', value: '商品销售统计', icon: 'shopping-cart', url: 'urls.ORDERANALYSE_2', children: null },
            { key: 'mams_order_msg3', value: '红包统计', icon: 'pay-circle-o', url: 'urls.ORDERANALYSE_3', children: null },
          ]
        },
      ]
    })
  }

  render() {
    let { data } = this.state
    const loop = (data = []) => data.map((item) => {
      if (item.children) {
        return <SubMenu key={item.key} title={<span className={Style.ellip}><Icon type={item.icon}/><span
        title={item.value}>{item.value}</span></span>}>
          {loop(item.children)}</SubMenu>
      }
      return <MenuItem key={item.key} className={this.getMenuItemClass(urls[item.url.split('.')[1]])}>
        <Link to={urls[item.url.split('.')[1]]} className={Style.ellip}><Icon type={item.icon}/><span title={item.value}>{item.value}</span></Link>
      </MenuItem>
    })
    const menusData = loop(data)
    return menusData.length > 0 ? <Menu
      theme='dark'
      mode={this.state.mode}
      selectedKeys={[this.props.selectedMenu]}
      style={{ border: 'none' }}
      >
      {menusData}
    </Menu> : null
  }
}

export default MamsMenu
