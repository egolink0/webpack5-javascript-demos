const path = require("path");
const { merge } = require("webpack-merge");
const base = require("../webpack/webpack.config.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(base, {
  entry: path.join(__dirname, "./index.tsx"), // 入口，处理资源文件的依赖关系
  output: {
    path: path.join(__dirname),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        // 编译处理 js 和 jsx 文件
        test: /(\.js(x?))|(\.ts(x?))$/,
        use: [
          {
            loader: "babel-loader", // 会读取 .babelrc 里面的配置进行编译
          },
          {
            // 调用tsc编译TypeScript代码，并会进行类型检查
            // 读取 tsconfig.json 的配置进行编译
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/, // 只解析 src 目录下的文件
      },
      
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css", // 提取的 CSS 文件名
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"), // 引用的 html 模板文件
      inject: "body", // js 插入到 body 中
    }),
  ],
  devServer: {
    static: path.join(__dirname, "./"),
  },
});
