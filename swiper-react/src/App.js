import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import './App.css'

import H1V1 from './modal/H1V1'
import H1V2 from './modal/H1V2'
import H1V3 from './modal/H1V3'
import H2V1 from './modal/H2V1'
import H2V2 from './modal/H2V2'
import H2V3 from './modal/H2V3'
import H2V4 from './modal/H2V4'
import H3V1 from './modal/H4V1'
import H3V2 from './modal/H4V2'
import H4V1 from './modal/H3V1'
import H5V1 from './modal/H5V1'

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
    new Swiper(this.swiperV1, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV1,
        clickable: true,
      },
    })
    new Swiper(this.swiperV2, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV2,
        clickable: true,
      },
    })
    new Swiper(this.swiperV3, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV3,
        clickable: true,
      },
    })
    new Swiper(this.swiperV4, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV4,
        clickable: true,
      },
    })
    new Swiper(this.swiperV5, {
      direction: 'vertical',
      keyboard: true,
      spaceBetween: 50,
      pagination: {
        el: this.paginateIDV5,
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
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV1 = self}>
              <div className='swiper-wrapper'>
                <H1V1/>
                <H1V2/>
                <H1V3/>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV1 = self}></div>
            </div>
          </div>

          <div className='swiper-slide'>
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV2 = self}>
              <div className='swiper-wrapper'>
                <H2V1/>
                <H2V2/>
                <H2V3/>
                <H2V4/>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV2 = self}></div>
            </div>
          </div>

          <div className='swiper-slide'>
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV4 = self}>
              <div className='swiper-wrapper'>
                <H4V1/>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV4 = self}></div>
            </div>
          </div>

          <div className='swiper-slide'>
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV3 = self}>
              <div className='swiper-wrapper'>
                <H3V1/>
                <H3V2/>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV3 = self}></div>
            </div>
          </div>

          <div className='swiper-slide'>
            <div className='swiper-container swiper-container-v' ref={self => this.swiperV5 = self}>
              <div className='swiper-wrapper'>
                <H5V1/>
              </div>
              <div className='swiper-pagination swiper-pagination-v'  ref={self => this.paginateIDV5 = self}></div>
            </div>
          </div>

        </div>
        <div className='swiper-pagination swiper-pagination-h' ref={self => this.paginateIDH = self}></div>
      </div>
    )
  }
}

export default App
