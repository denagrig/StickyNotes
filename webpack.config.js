const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = [
  {
    entry: "./src/index.tsx",
    mode: "development",
    devtool: "source-map",
    target: "web",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
      alias: { src: path.resolve(__dirname, "src") },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg)$/i,
          type: "asset/resource",
        },
      ],
    },
  },
]