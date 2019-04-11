module.exports = {
    'presets': [
        '@babel/preset-env'
        // [
        //     '@babel/preset-env',
        //     {
        //         'modules': 'commonjs'
        //     }
        // ]
    ],
    'plugins': [
        'lodash',
        // 'babel-plugin-dynamic-import-node',
        // '@babel/plugin-syntax-dynamic-import',
        // [
        //     '@babel/plugin-proposal-decorators',
        //     {
        //         'legacy': true
        //     }
        // ],
        '@babel/plugin-proposal-class-properties',
        // ['@babel/plugin-transform-runtime']
    ]
}
