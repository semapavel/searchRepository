const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
	mode: "development",
	entry: ["@babel/polyfill", "./src/index.jsx"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js"
	},
	devServer: {
		port: 3000
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	 },
	plugins: [
		new HTMLWebpackPlugin({template: "./src/index.html"}),
		new CleanWebpackPlugin(),
		new SourceMapDevToolPlugin({filename: "[file].map"})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.(css|less)$/,
				use:["style-loader", "css-loader", "less-loader"]
			},
			{
				test: /\.(jpg|jpeg|png|svg)/,
				use: ['file-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader",
				  options: {
					 presets: ['@babel/preset-env']
				  }
				}
			 },
			 {
				test: /\.m?jsx$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader",
				  options: {
					 presets: ['@babel/preset-env', "@babel/preset-react"]
				  }
				}
			 }
		]
	}
}