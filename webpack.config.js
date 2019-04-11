
let path = require('path')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        'object-validator': './extensions/object/index.js',
        'string-validator': './extensions/string/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader'
          }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    }
}