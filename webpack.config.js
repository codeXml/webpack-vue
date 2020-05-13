const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        mode: 'production', // development | production
        entry: ["babel-polyfill", path.resolve(__dirname, './src/index.js')],
        output: {
            path: path.resolve(__dirname, 'dist/static'),
            filename: "[name].[chunkhash].js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                }, {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].js' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[name].[hash].css',
            })
        ]
    }
}
