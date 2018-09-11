const fs = require('fs')

const walkFile = funtion( pathResolve, mime ) {

  let files = fs.readdirSync( pathResolve )

  let fileList = {}

  for( let [i, item] of files.entries() ) {
    let itemArr = item.split('\.')

    let itemMine = ( itemArr.length > 1) ? item[ item.length - 1] : 'undefined'
    let keyName = item + ''
    if( mime === itemMine ) {
      fileList[ item ] = pathResolve + item
    }
  }
  return fileList
}

module.exports = walkFile