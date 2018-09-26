import React, { Component } from 'react'
import moduler from './images/module.png'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>
              <h3>如何实现模块加载</h3>
              <ul>
                <li>
                  <span>利用闭包把所有“全局”变量就变成了函数内部的局部变量</span>
                  <br></br>
                  <img src={moduler} />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
