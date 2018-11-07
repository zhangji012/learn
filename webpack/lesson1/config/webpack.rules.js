const path = require('path');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin') //CSS文件单独提取出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //CSS文件单独提取出来

module.exports = [
	{
		test: /\.css$/,
		// use: ExtractTextWebapckPlugin.extract({
		// 	fallback: 'style-loader', // css-loader用于解析css, style-loader用于将css插入html中
		// 	use: ['css-loader'] // 不再需要style-loader放到html文件内
		// }),
    use: [
      MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'
    ],
		include: path.join(__dirname, '..', 'src'), //限制范围，提高打包速度
		exclude: /node_modules/
	},
	{
		test:/\.less$/,
		use: [
			MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'less-loader'
		],
    // use:['style-loader','css-loader','postcss-loader','less-loader'], // postcss浏览器版本配置在postcssrc.js中
    include: path.join(__dirname, '..', 'src'),
		exclude: /node_modules/
	},
	{
		test:/\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'
    ],
		include: path.join(__dirname, '..', 'src'),
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