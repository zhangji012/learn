const fs = require('fs')
const walkFile = require('./walk-file')

/**
 * 获取sql目录下的文件目录数据
 * @return {object}
 */

function getSqlMap() {
  let basePath = __dirname
  basePath = basePath.replace('/\\/g', '\/')

  let pathArr = basePath.splite('\/')
  pathArr = pathArr.splice( 0, pathArr.length - 1)

  let fileList = walkFile( base, 'sql')

  return fileList
}

module.exports = getSqlMap