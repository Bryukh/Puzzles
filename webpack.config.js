var webpack = require("webpack");

module.exports = {

    entry: {
        "15puzzle": "./src/puzzles/scripts/15puzzle.js"
    },
    output: { filename: "public/[name]-bundle.js" },
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init", "public/init.js", Infinity) ],
    module: {
        loaders: [
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    }
};