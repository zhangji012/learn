// 项目启动
// application.js 是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。
// context.js 处理应用上下文，里面直接封装部分request.js和response.js的方法
// request.js 处理http请求
// response.js 处理http响应
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
