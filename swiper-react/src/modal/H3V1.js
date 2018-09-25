import React, { Component } from 'react'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>koa2是什么</li>
            <li>为什么选koa2</li>
            <li>async/await</li>
            <li>和react结合使用</li>
            <li>目前的问题，没有找到好的node前后分离的项目</li>
          </ul>
        </div>
      </div>
    )
  }
}
