// 生成嵌套文件夹

const fs = require('fs');
const path = require('path');
const jsurl = require('./folder');
function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}
console.log(jsurl)
// let url = [
//   'path1/path2/path3',
//   'path1/path2/path3.1',
// ]
jsurl.forEach((item) => {
  let myPath = path.resolve(item);
  fs.existsSync(myPath) == false && mkdirs(myPath);
})
