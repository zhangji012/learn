'use strict'
const path = require('path');
const chalk = require('chalk');  // chalk是一个颜色的插件

const ProgressBarPlugin = require('progress-bar-webpack-plugin')  // 进度条插件

const HappyPack = require('happypack') // 使用HappyPack进行javascript的多进程打包操作，提升打包速度，并增加打包时间显示。(生产和开发环境都需要)
const os = require('os')  // 获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const MiniCssExtractPlugin = require('mini-css-extract-plugin') //CSS文件单独提取出来

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 输出路径的设置，这边没有使用
function assetsPath(_path_) {
  let assetsSubDirectory;
  if (process.env.NODE_ENV === 'production') {
    assetsSubDirectory = 'static' //可根据实际情况修改
  } else {
    assetsSubDirectory = 'static'
  }
  return path.posix.join(assetsSubDirectory, _path_)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/index.js',
  },
  output:{
    path: resolve('dist'),
    filename:'[name].[hash].js'
  },
  resolve: { // Resolve配置webpack如何寻找模块对应的文件,介绍 https://segmentfault.com/a/1190000013176083?utm_source=tag-newest
    extensions: [".js",".css",".json"], // 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在
    alias: {
      componets: './src/components/' // 配置别名可以加快webpack查找模块的速度
    }
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules:[
      {
        test: /\.css$/,
        // use: ExtractTextWebapckPlugin.extract({
        // 	fallback: 'style-loader', // css-loader用于解析css, style-loader用于将css插入html中
        // 	use: ['css-loader'] // 不再需要style-loader放到html文件内
        // }),
        use: [
          MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'
        ],
        include: [resolve('src')], //限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test:/\.less$/,
        use: [
          MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'less-loader'
        ],
        // use:['style-loader','css-loader','postcss-loader','less-loader'], // postcss浏览器版本配置在postcssrc.js中
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test:/\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'
        ],
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader' // 页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好
      },
      { //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 2 * 1024 // 小于2k的图片自动转成base64格式，并且不会存在实体图片
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader' // 字体图标和svg图片都可以通过file-loader来解析
      },
      {
        test:/\.js$/,
        use: 'babel-loader',     // es6转义
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/  // 排除掉node_modules，优化打包速度
      }
    ]
  },
  // 新的公共代码抽取工具(optimization.SplitChunksPlugin)提取重用代码，减小打包文件。（代替commonchunkplugin，生产和开发环境都需要）
  optimization: { //webpack4.x的最新优化配置项，用于提取公共代码
    // 不错的介绍  https://blog.csdn.net/qq_26733915/article/details/79458533
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial", // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
          name: "common", //  拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
          minChunks: 2, // 表示被引用次数，默认为1
          maxInitialRequests: 5, // 最大的按需(异步)加载次数，默认为1
          minSize: 0, // 表示在压缩前的最小模块大小，默认为0
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  },
  plugins: [
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
  ]
}
