const path = require("path");
const webpack = require("webpack");

const version = require("./package.json").version;

module.exports = {
    mode: "production",
    context: path.resolve(__dirname),
    target: ["web", "es5"],
    entry: {
        index: [
            "core-js/stable",
            "regenerator-runtime/runtime",
            "whatwg-fetch",
            "@wayke-se/ecom-react/assets/styles/default.css",
            "./src/index.js",
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: `wayke.ecom.v${version}.ie11.js`,
        library: "Wayke",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: [".css", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules[\/|\\]core-js/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "entry",
                                        corejs: 3,
                                    },
                                ],
                                ["@babel/preset-react"],
                            ],
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
    ],
};
