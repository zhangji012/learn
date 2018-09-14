const path = require("path");
const webpack = require("webpack");
const packagejson = require("./package.json");

const config = {
  entry: {
    first: './src/first.js',
    second: './src/second.js',
    vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
  },
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: '[name].js'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
  ]
}

module.exports = config;