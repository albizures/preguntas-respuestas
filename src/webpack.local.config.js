const webpack = require('webpack'),
	util = require('util'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'client', 'app', 'index.js'),
	CLIENT_PATH = path.resolve(ROOT_PATH, 'client'),
	BUILD_PATH = path.resolve(ROOT_PATH, '..', 'dist'),
	MODULES_PATH = path.resolve(__dirname, '..', 'node_modules'),
	ASSETS_PATH = path.resolve(BUILD_PATH, 'assets');
module.exports = {
	devtool: 'eval', //'eval-source-map',
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: "app.js"
	},
	config: {
		moment: {
			noGlobal: true
		}
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		//new webpack.NoErrorsPlugin(),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
		new HtmlWebpackPlugin({
			title: 'Anadie',
			filename: 'index.html',
			template: path.resolve(CLIENT_PATH, 'app', 'index.jade')
		}),
		new ExtractTextPlugin('style.css', {
			allChunks: true
		})
	],

	// Transform source code using Babel and React Hot Loader
	module: {
		loaders: [{
			test: /\.js$/,
			include: CLIENT_PATH,
			loader: "babel-loader" //?stage=0"]
		}, {
			test: /\.jade$/,
			loader: 'jade-loader'
		},//  {
		// 	test: /\.(svg|woff|woff2|ttf|eot)$/,
		// 	loaders: ['file?name=/assets/fonts/[name].[ext]']
		// },
		{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=/assets/fonts/[name].[ext]' },
		{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=/assets/fonts/[name].[ext]' },
		{
			test: /\.(png|jpg|jpeg|gif)$/,
			loaders: [
				'file?name=/assets/images/[name].[ext]'
			]
		},{
			test: /\.mp3$/,
			loaders: [
				'file?name=/assets/[name].[ext]'
			]
		}, {
			test: /\.css?$/,
			loaders: ExtractTextPlugin.extract('style-loader', 'css-loader')
		},{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    }, {
			test: /\.styl?$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
				//loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test: /\.html$/,
			loader: 'raw'
		}],
		preLoaders: [{
			test: /\.js?$/,
			exclude: [/build/, /node_modules/],
			loaders: ['eslint-loader', 'jscs-loader']
		}]
	},
	// Automatically transform files with these extensions
	resolve: {
		extensions: ['', '.js', '.css', '.styl', '.jade']
	},
	resolveLoader: {
		root: MODULES_PATH
	}
}

if (!process.env.PRODUCTION) {
	const compiler = webpack(module.exports);
	const ProgressPlugin = require('webpack/lib/ProgressPlugin');
	// new ProgressPlugin(function (percentage, msg) {
	// 	console.log((percentage * 100) + '%', msg);
	// })
	compiler.apply();
	compiler.watch({ // watch options:
		errorDetails: true,
		aggregateTimeout: 300, // wait so long for more changes
		poll: true // use polling instead of native watchers
			// pass a number to set the polling interval
	}, function (err, stats) {
		console.log('ended');
		console.log(stats.toString({
			colors: true
		}));
	});
}
