const path = require('path');

const config = {
    mode: 'production', // development | production
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash].js"
    }
}

module.exports = config;
