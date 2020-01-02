const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { HotModuleReplacementPlugin } = require("webpack");

const dev = process.env.NODE_ENV != "production";

const htmlWebpack = new HtmlWebpackPlugin({
	showErrors: true,
	cache: true,
	template: path.join(__dirname, "./public/index.html"),
	favicon: "./public/favicon.ico"
});
const vueLoader = new VueLoaderPlugin();
const hotModuleReplacement = new HotModuleReplacementPlugin();

module.exports = {
	mode: "development",
	entry: path.join(__dirname, "./src/index.js"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "app.bundled.js",
		publicPath: "/"
	},
	resolve: {
		alias: {
			vue$: dev ? "vue/dist/vue.js" : "vue/dist/vue.min.js"
		}
	},
	devServer: {
		port: 8080,
		hot: true,
		open: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			}
		]
	},
	plugins: [htmlWebpack, vueLoader, hotModuleReplacement]
};
