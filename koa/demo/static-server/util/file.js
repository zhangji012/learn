const fs = require('fs')

/**
 * 读取文件方法
 * @param  {string}  filePath 文件本地的绝对路径
 * @return {string|binary}
 */
function file ( filePath ) {
  console.log(filePath)
 let content = fs.readFileSync(filePath, 'binary' )
  console.log(content)

  return content
}
console.log(file)

module.exports = file
