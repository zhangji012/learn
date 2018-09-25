const option = (data = []) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    color: ['#2f4554', '#c23531'],
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['红包领取', '红包退回']
    },
    series: [
      {
        name: '红包统计',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        hoverOffset: 3,
        label: {
          normal: {
            show: true,
            position: 'outside',
            formatter: '{b}:\n{c} ({d}%)'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: data
      }
    ]
  }
}

export default option
