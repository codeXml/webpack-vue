const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    // 这里的argv.mode只有当package.json/scripts/start或build参数加了--mode production | --mode development才有值
    const devMode = argv.mode !== 'production';
    return {
        entry: [
            "babel-polyfill", // 解决浏览器对js语法的兼容性
            path.resolve(__dirname, './src/index.js') // 单入口文件
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/[name].[chunkhash].js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // 用 babel 转换 ES6 代码为浏览器可识别的版本
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/, // 无此项将不能压缩html
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                }, {
                    test: /\.(sa|sc|c)ss$/, // 压缩css文件
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        { loader: "sass-loader" }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/, // 打包图片文件到指定目录
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: devMode ? '[name].[ext]' : '[hash].[ext]',
                                publicPath: devMode ? '../src/images/' : '../img/', // 引入图片的图片路径，比如css引入的图片路径'../images/xx.jpg'将变为‘../img/xx.jpg’
                                outputPath: 'img/', // 打包后存放的目录
                                emitFile: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(), // 打包之前清理上一次打包的文件夹
            new HtmlWebPackPlugin({ // html打包压缩插件，若无此项，html文件将不会压缩也不会进入打包目录
                template: "index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({  // 提取css为单独的文件，若无此项css将被打包进js文件
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[name].[hash].css',
            }),
        ],
        devServer:{
            // 设置基本目录结构
            contentBase:path.resolve(__dirname,'./'),
            //服务器的ip地址 可以使用ip也可以使用localhost
            host:'localhost',
            //服务器压缩是否开启
            compress:true,
            //配置服务端口号
            port:9999
        }
    }
}
