import React, { Component } from 'react'
import async1 from './images/async1.png'
import async2 from './images/async2.png'
import async3 from './images/async3.png'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li><h2>async/await</h2></li>
            <li>回调函数、事件监听(on，bind，listen，addEventListener，observe)、发布/订阅(观察者模式) 、Promise 对象、优雅的async/await</li>
            <li>
              <img src={async3} />
              <img src={async2} />
              <img src={async1} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
