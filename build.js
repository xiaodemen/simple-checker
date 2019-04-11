let path = require('path')
let webpack = require('webpack')
let conf = require(path.resolve(__dirname, 'webpack.config.js'))

webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(stats.toJson())
    }
    else {
        console.log('🐂 done!')
    }
})
