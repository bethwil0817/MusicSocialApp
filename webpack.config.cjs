const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isGitHubPages =
	process.env.NODE_ENV === "production" && !process.env.VERCEL;
const basename = isGitHubPages ? "/MusicSocialApp" : "/";
const webpack = require("webpack");
require("dotenv").config();
const Dotenv = require("dotenv-webpack");

module.exports = {
	mode: isProduction ? "production" : "development",
	target: "web",
	entry: {
		main: isProduction
			? "./src/index.tsx"
			: [
					"webpack-hot-middleware/client?reload=true&timeout=2000",
					"./src/index.tsx",
				],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "images/[name][ext]",
		// publicPath: "./", NOT SURE IF THIS IS NEEDED FOR DEPLOYMNET
		publicPath:
			isProduction && !process.env.VERCEL
				? "https://bethwil0817.github.io/MusicSocialApp/"
				: "/",
	},
	devServer: {
		static: path.resolve(__dirname, "dist"),
		// static: {
		// 	directory: path.resolve(__dirname, "dist"),
		// },
		// port: 8000 FOR GITHUB DEPLOY
		historyApiFallback: true,
		port: 8001,
		// hot: true,
		// historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new webpack.EnvironmentPlugin(["NODE_ENV", "SERVER_HOST", "SERVER_PORT"]),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "production",
			SERVER_HOST: "localhost", // Fallback for local, Vercel will override this
			SERVER_PORT: "8001", // Fallback for local, Vercel will override this
		}),
		new webpack.HotModuleReplacementPlugin(), // Enables HMR
		new Dotenv(),
		...(!isProduction ? [new webpack.HotModuleReplacementPlugin()] : []),
	],
	module: {
		rules: [
			{
				test: /\.(tsx|ts|jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							["@babel/preset-react", { runtime: "automatic" }],
							"@babel/preset-typescript",
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				type: "asset/resource",
				generator: {
					filename: "static/media/[name].[hash:8][ext]",
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},
};
