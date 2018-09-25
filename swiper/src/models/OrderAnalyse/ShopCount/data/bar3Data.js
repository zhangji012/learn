
const option = (data, colorList) => {
  return {
    title: {
      text: '商品排行(金额)',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['商品排行(金额)'],
      show: false,
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '2%',
      containLabel: true   // grid 区域是否包含坐标轴的刻度标签
    },
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          rotate: 40
        },
        boundaryGap: [0, 0.01],  // 设置为false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
        name: '元',
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisLabel: {
          formatter: function(value) {
            if (value.length > 12) {
              return value.substring(0, 12) + '...'
            } else {
              return value
            }
          },
        },
        data: data.yAxis
      }
    ],
    series: [
      {
        name: '商品排行(金额)',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          normal: {
            color: '#C03636',
            // color: function (params) {
            //   if (colorList.length > 0) {
            //     return colorList[params.dataIndex]
            //   } else {
            //     return '#C03636'
            //   }
            // },
            borderWidth: 2
          }
        },
        data: data.series
      }
    ]
  }
}

export default option
