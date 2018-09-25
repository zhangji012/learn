import React, { Component } from 'react'
import loopEventImg from './images/event_loop.jpg'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>Node.js 使用事件驱动模型</li>
            <li>事件循环：</li>
            <li>1.检查事件队列（task queue）是否为空，如果为空，则继续检查；如不为空，则执行 2</li>
            <li>2.取出事件队列的首部，压入执行栈（stack）</li>
            <li>3.执行任务</li>
            <li>4.检查执行栈，如果执行栈为空，则跳回第 1 步；如不为空，则继续检查</li>
            <li><img src={loopEventImg} /></li>
          </ul>
        </div>
      </div>
    )
  }
}
