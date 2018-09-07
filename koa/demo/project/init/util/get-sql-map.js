const fs = require('fs')
const walkFile = require('./walk-file')

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap () {
  let basePath = __dirname
  // console.log(basePath) E:\Test\learn\koa\demo\project\init\util
  basePath = basePath.replace(/\\/g, '\/')
  // console.log(basePath) E:/Test/learn/koa/demo/project/init/util

  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice( 0, pathArr.length - 1 )
  basePath = pathArr.join('/') + '/sql/'
  // console.log(basePath)  /Test/learn/koa/demo/project/init/sql/

  let fileList = walkFile( basePath, 'sql' )
  // console.log(fileList) { 'user_info.sql': 'E:/Test/learn/koa/demo/project/init/sql/user_info.sql' }

  return fileList
}

module.exports = getSqlMap