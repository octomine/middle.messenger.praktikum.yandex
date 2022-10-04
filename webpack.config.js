const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugn = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "messenger.bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".js", ".hbs"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.hbs/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              precompileOptions: {
                knownHelpersOnly: false,
              },
              partialDirs: [
                path.join(__dirname, "src", "components", "common", "partials"),
              ],
              helperDirs: [
                path.join(__dirname, "src", "components", "common", "helpers"),
              ],
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugn({
      template: "src/index.html",
      filename: "index.html",
    }),
  ],
};
