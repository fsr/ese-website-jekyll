const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, './webpack'),

    resolve: {
        alias: {
            pace: 'pace-progress',
        }
    },

    entry: {
        app: './app.js',
        vendors: ['jquery', 'responsive-nav', 'slick-carousel', 'foundation-sites'],
    },

    output: {
        path: path.resolve(__dirname, './sources/_assets/js'),
        filename: "[name]-bundle.js"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules"),
                query: {
                    presets: ["@babel/preset-env"]
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=10000&name=[name].[ext]&publicPath=./fonts/&outputPath=../../static/fonts/'
            },

            {
                test: require.resolve('jquery'),
                use:
                    [

                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        },

                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
            },
            {
                test: require.resolve('responsive-nav'),
                use:
                    [
                        {
                            loader: 'expose-loader',
                            options: 'responsiveNav'
                        }
                    ]
            },
        ]
    }
};

module.exports = config;
