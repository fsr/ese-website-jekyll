const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// separate css, so nojs is not a problem
// https://webpack.js.org/plugins/extract-text-webpack-plugin/#usage-example-with-css
const extractSass = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('../css/[name]-bundle.css').replace('css/js', 'css');
    },
    disable: process.env.NODE_ENV === "development"
});

function isExternal(module) {
    var context = module.context;

    if (typeof context !== 'string') {
        return false;
    }
    return context.indexOf('node_modules') !== -1;
}

var config = {
    // webpack base directory
    context: path.resolve(__dirname, './webpack'),
    resolve: {
        alias: {
            pace: 'pace-progress',
            modernizr$: path.resolve(__dirname, "./webpack/components/.modernizrrc"),
            //jquery: "jquery/src/jquery", 
        }
    },
    // one separate output file per each entry
    // make sure to check the liquid include tag in head.html and layout-default.html 
    entry: {
        //dev_preload: './dev-pre.js',  
        dev_postload: './dev-post.js',
        app_preload: './app-pre.js',
        app_postload: './app-post.js',
        vendors: ['jquery'],
        //vendors_preload: './vendors-pre.js',
        //vendors_postload: './vendors-post.js',
    },

    output: {
        //  path to jekyll assets directory
        path: path.resolve(__dirname, './sources/_assets/js/'),
        filename: "[name]-bundle.js"
    },

    plugins: [
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors-bundle.js",
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest", // something that's not an entry
            filename: "manifest.js",
            minChunks: Infinity
        }),

        new webpack.ProvidePlugin({
            jQuery: "jquery",
            'window.jQuery': "jquery",
            $: "jquery",
        }),
        extractSass,
    ],
    module: {
        rules: [{
                test: /\.exec\.js$/,
                use: ['script-loader']
            },
            // handle sass and css that are included through scripts
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /(\.css$)/,
                 use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })

            },
            // handle our fonts
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                // limit: if file-size (byte) is bigger, emit separate file and let file-loader handle it
                // NOTE: in this event all subsequent arguemnts are passed along
                // handle with care, this is hacked to support fonts directly from npm
                loader: 'url-loader?limit=10000&name=[name].[ext]&publicPath=./fonts/&outputPath=../../static/fonts/'
            },
            // expose jQuery (legacy support)
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            // loaders to generate modernizr build
            // https://github.com/peerigon/modernizr-loader
            {
                test: /\.modernizrrc.js$/,
                loader: "modernizr-loader"
            },
            {
                test: /\.modernizrrc(\.json)?$/,
                loader: "modernizr-loader!json-loader"
            },
        ],
    }
};

module.exports = config;