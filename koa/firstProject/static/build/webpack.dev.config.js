var merge = require('webpack-merge')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {

  devtell: 'source-map',

  plugins: [

    new webpack.DefinePlugin({
      // process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程
      // process.env属性返回一个包含用户环境信息的对象
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]

})