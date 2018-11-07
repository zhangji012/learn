const webpack = require("webpack");
const path = require('path');
const glob = require("glob");
//消除冗余的css  tree-shaking
const PurifyCSSPlugin = require("purifycss-webpack");
// 消除冗余的js
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除目录等
const CleanWebpackPlugin = require("clean-webpack-plugin");
//4.x之前用以压缩
// const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
// 分离css
// const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin");
//静态资源输出
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // CSS文件单独提取出来

console.log(path.join(__dirname,'..', 'dist'))
module.exports = [
	// 多入口的html文件用chunks这个参数来区分
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, '..', 'src','index.html'),
		filename:'index.html',
		chunks:['index', 'vendor'],
		hash:true,//防止缓存
		minify:{
			removeAttributeQuotes:true//压缩 去掉引号
		}
	}),
	new webpack.ProvidePlugin({
		_:'lodash', //所有页面都会引入 _ 这个变量，不用再import引入
		$:'jquery' //所有页面都会引入 _ 这个变量，不用再import引入
	}),
	// new ExtractTextWebapckPlugin('css/[name].[hash].css'), // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
	new CopyWebpackPlugin([
		{
			from: path.resolve(__dirname, '..', 'static'),
			to: path.resolve(__dirname,  '..', 'dist/static'),
			ignore: ['.*']
		}
	]),
	// new CleanWebpackPlugin([path.join(__dirname,'..', 'dist')]),
  new CleanWebpackPlugin(['dist'], {
    root: path.join(__dirname, '..'),
    exclude: ['manifest.json', 'vendor.dll.js'],
    verbose: true,
    dry:  false
  }),
	new PurifyCSSPlugin({
		paths: glob.sync(path.join(__dirname, '..', 'src/*.html'))
	}),
	new WebpackParallelUglifyPlugin({
		uglifyJS: {
			output: {
				beautify: false, //不需要格式化
				comments: false //不保留注释
			},
			compress: {
				warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
				drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
				collapse_vars: true, // 内嵌定义了但是只用到一次的变量
				reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
			}
		}
		// 有兴趣可以探究一下使用uglifyES
	}),
  // new ExtractTextWebapckPlugin('../css/styles.css'), // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
	new MiniCssExtractPlugin({
		filename: "css/style.css"
	})
	// new webpack.DllReferencePlugin({
	//   manifest: require(path.join(__dirname, '..', 'dist', 'manifest.json')),
	// }),
]
