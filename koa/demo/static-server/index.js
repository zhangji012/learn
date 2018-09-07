const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
// mime是一个互联网标准，通过设定它就可以设定文件在浏览器的打开方式  https://blog.csdn.net/h13783313210/article/details/79250685
const mimes = require('./util/mimes')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )    // path.extname() 方法返回 path 的扩展名
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}

app.use( async ( ctx ) => {
  // 静态资源目录在本地的绝对路径
  // console.log(__dirname) E:\Test\learn\koa\demo\static-server
  // path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); 返回: '/foo/bar/baz/asdf'

  let fullStaticPath = path.join(__dirname, staticPath)
  // console.log(fullStaticPath) E:\Test\learn\koa\demo\static-server\static

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content( ctx, fullStaticPath )
  // console.log(ctx)
  // console.log(_content)

  // 解析请求内容的类型
  let _mime = parseMime( ctx.url )

  // 如果有对应的文件类型，就配置上下文的类型
  if ( _mime ) {
    ctx.type = _mime
  }

  // 输出静态资源内容
  if ( _mime && _mime.indexOf('image/') >= 0 ) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    ctx.body = _content
  }
  
  
})

app.listen(3000, () => {
  console.log('[demo] static-server is starting at port 3000')
})

