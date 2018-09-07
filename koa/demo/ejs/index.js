const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 在一个web应用程序中，如果只是使用服务器端代码来编写客户端html代码，前后端不分离，那么会造成很大的工作量，
// 而且写出来的代码会比较难以阅读和维护。如果只是使用客户端的静态的HTML文件，那么后端的逻辑也会比较难以融入到客户端的HTML代码中
// 为了便于维护，且使后端逻辑能够比较好的融入前端的HTML代码中，同时便于维护 使用ejs
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000, ()=>{
  console.log('[demo] ejs is starting at port 3000')
})

