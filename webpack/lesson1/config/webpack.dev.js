const path = require('path');
const rulesConfig = require("./webpack.rules.js");
const pluginsConfig = require("./webpack.plguins.js");

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/index.js',
    // page: path.resolve(__dirname, 'src', 'page.js'),
    vendor:'lodash' // 多个页面所需的公共库文件，防止重复打包带入
  },
  output:{
    publicPath: '/',  //这里要放的是静态资源CDN的地址
    path: path.resolve(__dirname, '..', 'dist'),
    filename:'[name].[hash].js'
  },
  resolve:{
    extensions: [".js",".css",".json"],  // 省略后缀
    alias: {} //配置别名可以加快webpack查找模块的速度
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: rulesConfig
  },
  plugins: pluginsConfig,

  devtool: 'eval-source-map', // 指定加source-map的方式
  devServer: {
    contentBase: path.join(__dirname, '..', "dist"), //静态文件根目录
    port: 3824, // 端口
    host: 'localhost',
    overlay: true,
    compress: false // 服务器返回浏览器的时候是否启动gzip压缩
  },
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll:1000 //每秒询问的文件变更的次数
  },
}