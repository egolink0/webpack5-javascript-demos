const path = require("path");
const { merge } = require("webpack-merge");
const base = require("../webpack/webpack.config.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式
  resolve: {
    // 定义 import 引用时可省略的文件后缀名
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 将 loader 放到最后
          {
            loader: "css-loader",
            options: {
              esModule: false, // 支持 commonjs 规范
              modules: {
                localIdentName: "[path][name]_[local]_[hash:base64:5]", // 配置命名规则 demo03-css-modules-app_text_jejHu
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "./"),
    compress: true,
    host: "127.0.0.1",
    port: 4000, // 启动端口
    open: false, // 打开浏览器
  },
};
