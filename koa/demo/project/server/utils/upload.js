const inspect = require('util').inspect // 检查
const path = require('path')
// os模块提供了一些基本的系统操作函数
const os = require('os')
const fs = require('fs')
// 上传模块busboy
const Busboy = require('busboy')
const UtilType = require('./type')
const UtilDatetime = require('./datetime')

// 同步创建文件夹
function mkdirsSync(dirname) {
  // console.log(dirname)
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // path.dirname当参数值为目录路径时，该方法返回该目录的上层目录；当参数值为文件路径时，该方法返回该文件所在的目录。
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
// 获取文件后缀名
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

// 上传图片
function uploadPicture( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  let pictureType = 'common'
  if ( UtilType.isJSON( options ) && UtilType.isString( options.pictureType ) ) {
    pictureType = options.pictureType
  }

  let picturePath = path.join(
    __dirname, 
    '/../../static/output/upload/', 
    pictureType, 
    UtilDatetime.parseStampToFormat(null, 'YYYY/MM/DD'))

  console.log( path.sep, picturePath )
  let mkdirResult = mkdirsSync( picturePath )
  

  return new Promise((resolve, reject) => {
    let result = { 
      success: false,
      code: '',
      message: '',
      data: null
    }

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File-file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      

      let pictureName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( picturePath, pictureName )
      console.log(_uploadFilePath)
      
      let saveTo = path.join(_uploadFilePath)
      file.pipe(fs.createWriteStream(saveTo))

      // file.on('data', function(data) {
      //   console.log('File-data [' + fieldname + '] got ' + data.length + ' bytes')
      // })

      file.on('end', function() {
        console.log('File-end [' + fieldname + '] Finished')
        result.success = true
        resolve(result)
      })
    })

    // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //   console.log('Field-field [' + fieldname + ']: value: ' + inspect(val))
    // })
    // busboy.on('finish', function() {
    //   console.log('Done parsing form!')
    // })

    busboy.on('error', function(err) {
      console.log('File-error')
      reject(result)
    })

    req.pipe(busboy)
  })
    
} 


module.exports =  {
  uploadPicture,
}





