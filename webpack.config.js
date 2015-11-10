var webpack = require("webpack");

module.exports = {

    entry: {
        "app": "./src/app.js"
    },
    output: {
        path: __dirname + "/public/",
        filename: "[name].js",
        publicPath: "/public/"
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin("init", "public/init.js", Infinity)
        new webpack.NoErrorsPlugin()
    ],
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