const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const version = require("./package.json").version;

module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname),
    target: "web",
    entry: "./src/ie11.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: `wayke.ecom.ie11.v${version}.js`,
        library: "Wayke",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: [".css", ".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "babel-loader",
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            allowTsInNodeModules: true,
                            configFile: path.resolve(__dirname, 'tsconfig.ie11.json')
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"',
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: "" },
            ],
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname),
        port: 8080,
        historyApiFallback: true,
        writeToDisk: true,
    },
};
