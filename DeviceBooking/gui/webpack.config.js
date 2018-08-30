var config = {
    entry: './src/main.jsx',
    output: {
        path:'/',
        filename: 'index.min.js',
    },
    devServer: {
        historyApiFallback:true,
        inline:true,
        port:4000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2016', 'react']
                }
            }
        ]
    }
}
module.exports = config;