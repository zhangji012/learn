import React from 'react'
import loopEventImg from './images/event_loop.jpg'

// Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高
const renderAddChartBtn = () => {
  return (
    <div className='swiper-slide'>
      <div className='wrapper'>
        <ul>
          <li>概念: 是运行在服务端的 JavaScript</li>
          <br/>
          <li>特点：非阻塞、单线程、事件驱动</li>
          <li>1.非阻塞：node是异步编程，依托于回调可以一边读取文件一边执行其他命令</li>
          <li>2.单线程：一次执行一件事，等这件事完成后再执行其他事</li>
          <li>3.事件驱动：
            <ul>
              <li>1.检查事件队列（task queue）是否为空，如果为空，则继续检查；如不为空，则执行 2</li>
              <li>2.取出事件队列的首部，压入执行栈（stack）</li>
              <li>3.执行任务</li>
              <li>4.检查执行栈，如果执行栈为空，则跳回第 1 步；如不为空，则继续检查</li>
              <li><img src={loopEventImg} /></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default renderAddChartBtn
