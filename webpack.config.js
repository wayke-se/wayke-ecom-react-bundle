const path = require("path");
const webpack = require("webpack");

const version = require("./package.json").version;

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname),
  target: "web",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: `wayke.ecom.v${version}.js`,
    library: "Wayke",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".css", ".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
  ],
};
