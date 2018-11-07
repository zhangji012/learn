import React, { Component } from 'react'

export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>基础模块fs、stream、http、crypto，事件循环</li>
            <li>fs：负责读写文件，和所有其它JavaScript模块不同的是，fs模块同时提供了异步和同步的方法</li>
            <li>stream：<a href='http://www.runoob.com/nodejs/nodejs-stream.html'>data、end 、end 、finish </a>
              特点是一次只处理数据的一部分，数据分成一块块依次处理，就好像“数据流”一样。这对于处理大规模数据非常有利</li>
            <li>http：request(拿到所有浏览器HTTP请求的信息);response(HTTP响应返回给浏览器);</li>
            <li>crypto：目的是为了提供通用的加密和哈希算法</li>
          </ul>
        </div>
      </div>
    )
  }
}
