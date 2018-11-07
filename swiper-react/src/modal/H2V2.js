import React, { Component } from 'react'

// global 顶层对象和浏览器中window一样
// 在每个模块中，module 的自由变量是一个指向表示当前模块的对象的引用。
// 为了方便，module.exports 也可以通过全局模块的 exports 对象访问。 module 实际上不是全局的，而是每个模块本地的
// module下有2个属性exports、id
export default class Content extends Component {
  render() {
    return (
      <div className='swiper-slide'>
        <div className='wrapper'>
          <ul>
            <li>一开始大家都认为JS是辣鸡，没什么用，官方定义的API只能构建基于浏览器的应用程序</li>
            <li>CommonJS就按耐不住了，CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，
              从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库</li>
            <li>module、exports、require、global</li>
          </ul>
        </div>
      </div>
    )
  }
}
