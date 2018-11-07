import React, { Component } from 'react'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>NodeJS是CommonJS规范的实现</li>
            <li>是什么</li>
            <li>如何实现模块加载</li>
            <li>module.exports 和 exports的区别</li>
          </ul>
        </div>
      </div>
    )
  }
}
