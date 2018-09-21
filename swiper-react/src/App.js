import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import './App.css'

import H1V1 from './modal/H1V1'
import H1V2 from './modal/H1V2'
import H1V3 from './modal/H1V3'
import HSlide3 from './modal/HSlide3'

class App extends Component {
  componentDidMount() {
    new Swiper(this.swiperH, {
      spaceBetween: 50,
      keyboard: true,
      pagination: {
        el: this.paginateIDH,
        clickable: true,
      },
    })
    new Swiper(this.swiperV, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV,
        clickable: true,
      },
    })
    // window.addEventListener('keydown', this.handleKeyDown)
  }

  render() {
    // const items = this.renderList()
    return (
      <div className='swiper-container swiper-container-h' ref={self => this.swiperH = self}>
        <div className='swiper-wrapper'>
          <div className='swiper-slide'>
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV = self}>
              <div className='swiper-wrapper'>
                <div className='swiper-slide'>
                  <H1V1/>
                </div>
                <div className='swiper-slide'>
                  <H1V2/>
                </div>
                <div className='swiper-slide'>
                  <H1V3/>
                </div>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV = self}></div>
            </div>
          </div>

          <HSlide3/>
        </div>
        <div className='swiper-pagination swiper-pagination-h' ref={self => this.paginateIDH = self}></div>
      </div>
    )
  }
}

export default App
