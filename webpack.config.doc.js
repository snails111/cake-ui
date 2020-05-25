const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourceDirectory = path.resolve(__dirname, 'doc');
const targetDirectory = path.resolve(__dirname, 'doc/dist');
const styleDirectory = path.resolve(__dirname, 'style');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: true,
    template: path.resolve(__dirname, 'doc/index.html'),
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
      removeRedundantAttributes: !isDev,
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('app-[contenthash:8].css'),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
            warnings: false,
        },
      },
      sourceMap: false,
    }),
  );
}

module.exports = {
  context: sourceDirectory,
  entry: {
    app: './app.js',
  },
  output: {
    path: targetDirectory,
    filename: '[name]-[hash].js',
    hashDigestLength: 8,
  },
  devServer: {
    hot: true,
    contentBase: [sourceDirectory, styleDirectory],
    watchContentBase: true,
    open: true,
    host:"192.168.0.61",//让局域网内的其他用户访问自己的设备,默认localhost
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
            {
                loader: 'babel-loader',
            },
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              // options: {
              //   lessOptions: {
              //     modifyVars: {
              //       'border-radius-base': '4px',
              //     }
              //   }
              // }
            }
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        query: {
          limit: 10000,//小于10K的转为base64,大于10K的还是原图片
          name: 'static/img/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'cake-ui': path.resolve(__dirname),
    },
    extensions: ['.js', '.jsx', '.less'], //后缀名自动补全
  },
  plugins,
};
