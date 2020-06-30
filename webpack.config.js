const webpack = require("webpack");
const path = require("path");
// webpack4建议用 mini-css-extract-plugin 抽离模块中的css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourceDirectory = path.resolve(__dirname, "");
const targetDirectory = path.resolve(__dirname, "dist");
const styleDirectory = path.resolve(__dirname, "style");

const plugins = [
  new MiniCssExtractPlugin({filename: 'cakeUi.min.css'}),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = {
  context: sourceDirectory,
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: targetDirectory,
    filename: "cakeUI.min.js",
    hashDigestLength: 8,
    // export to AMD, CommonJS, or window
    libraryTarget: "umd",
    // the name exported to window
    library: "cakeUI",
  },
  devServer: {
    hot: true,
    contentBase: [sourceDirectory, styleDirectory],
    watchContentBase: true,
    open: true,
    host: "192.168.0.61", //让局域网内的其他用户访问自己的设备,默认localhost
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        query: {
          limit: 10000, //小于10K的转为base64,大于10K的还是原图片
          name: "static/img/[name].[ext]",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "cake-ui": path.resolve(__dirname),
    },
    extensions: [".js", ".jsx", ".less"], //后缀名自动补全
  },
  plugins,
  externals: [{ react: "React" }, { "react-dom": "ReactDOM" }],
};
