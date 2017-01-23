const webpack = require('webpack');
const devConfig = require('./webpack.config');

devConfig.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
];

module.exports = devConfig;