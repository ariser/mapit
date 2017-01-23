module.exports = {
    entry:  [
        'babel-polyfill',
        './src/assets/scripts/mapit'
    ],
    output: {
        filename: 'mapit.js'
    },
    module: {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
                query:   {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    }
};