import React, { Component } from 'react'
import moduler2 from './images/module2.png'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>
              <h3>module.exports 和 exports的区别</h3>
              <a href='https://cnodejs.org/topic/5231a630101e574521e45ef8' target='_blank'>介绍</a>
              <img src={moduler2} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
