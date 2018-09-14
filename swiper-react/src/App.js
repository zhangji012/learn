import React, { Component } from 'react'
import './App.css'

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }
  handleKeyDown = (e) => {
    switch(e.keyCode){
      case 38:
        // 上
        this._move('top')
        break
      case 40:
        // 下
        this._move('bottom')
        break
      case 37:
        // 左
        this._move('left')
        break

      case 39:
        this._move('right')
        break
      default:
        break

    }
  }
  _move = (e) => {
    console.log(e)
  }
  render() {
    return (
      <div className="App">
        <div className="card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>
      </div>
    )
  }
}

export default App;
