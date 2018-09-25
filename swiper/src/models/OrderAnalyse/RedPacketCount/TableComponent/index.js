import React from 'react'
import { Table } from 'antd'
import Download from 'Components/Download'
import { baseUrl2 } from 'Src/utils'

import api from 'Src/contants/api'
const { downLoad } = api.redPacketCount

export default props => {
  const { dataSource, columns, title, pagination, downloadData } = props
  return (
    <div>
      <div className='title'>
        {title}
      </div>
      <div
        style={{
          textAlign: 'right',
          marginBottom: '10px'
        }}
      >
        <Download baseUrl={baseUrl2} api={downLoad} params={downloadData} />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        rowKey={record => record.ymd}
      />
    </div>
  )
}
