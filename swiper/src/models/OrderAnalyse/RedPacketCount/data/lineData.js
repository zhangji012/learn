const defaultXAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const option = (xAxis = defaultXAxis, data) => {
  return {
    title: {
      text: '红包发放情况'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['红包领取', '红包退回']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '红包领取',
        type: 'line',
        stack: '总量',
        symbolSize: '8',
        areaStyle: { normal: {}},
        data: data[0]
      },
      {
        name: '红包退回',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {}},
        symbolSize: '8',
        data: data[1]
      }
    ]
  }
}

export default option
