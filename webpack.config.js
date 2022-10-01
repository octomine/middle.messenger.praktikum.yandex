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
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      handlebars: "handlebars/dist/handlebars.runtime",
    },
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
              query: {
                partialDirs: [
                  path.join(__dirname, "src", "components", "label"),
                  path.join(__dirname, "src", "components", "common", "styles"),
                ],
                helperDirs: [
                  path.join(__dirname, "src", "components", "common", "styles"),
                ],
              },
            },
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "assets"),
          to: "./assets",
        },
      ],
    }),
    new HTMLWebpackPlugn({
      template: "src/index.html",
      filename: "index.html",
    }),
  ],
};
