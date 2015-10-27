var webpack = require("webpack");

module.exports = {

    entry: { "15-puzzle": "./puzzles/15-puzzle/15-puzzle.js"},
    output: { filename: "build/[name]-bundle.js" },
    plugins: [ new webpack.optimize.CommonsChunkPlugin("build/init.js") ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};