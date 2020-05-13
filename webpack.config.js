const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    return {
        mode: 'production', // development | production
        entry: ["babel-polyfill", path.resolve(__dirname, './src/index.js')],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/[name].[chunkhash].js"
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
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        { loader: "sass-loader" }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: devMode ? '[name].[ext]' : '[hash].[ext]',
                                limit:100000,//限制图片大小 <= 100kb 进行base64编码（小于100kb打包进js文件）--测试时根据图片的大小调整
                                publicPath: devMode ?  '../' : '../dist/',
                                outputPath: 'img/',
                            }
                        }
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
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[name].[hash].css',
            }),
            new CleanWebpackPlugin()
        ]
    }
}
