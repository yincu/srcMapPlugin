/**
 * Created by Fighting on 2017/8/20.
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

var config = {
    context: path.resolve( __dirname, 'src'),
    entry:{
        test1: 'test.js'
    },
    output: {
        filename: 'js/[name].js?=[chunkhash]',
        path: path.resolve( __dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        sourceMapFilename: 'srcMap/[file].map'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'html/index.html',
            template: 'testSourceMap.html',
            minify: {
                minifyJS: true,
                removeComments: true,
                sortAttributes: true,
            },
            hash: false,
            chunks: ['test1'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /\.js$/,
            sourceMap: true,
            uglifyOptions: {
                ie8: false,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: true,
                warnings: false
            },
            parallel: {
                cache: true,
            }
        }),
        new webpack.SourceMapDevToolPlugin({
             filename: 'srcMapPlugin/[file].map',
             include: ['js/test1.js'],
             append: '\n//#sourceMappingURL=http://192.168.32.5:8080/[url]',
             moduleFilenameTemplate:'[absolute-resource-path]',
         }),
        new CleanWebpackPlugin([ 'dist/js', 'dist/srcMap', 'dist/srcMapPlugin']),
    ],
    resolve: {
        modules: ['src', "node_modules" ]
    },
    //devtool: process.env.NODE_ENV === 'production' ? 'source-map' :'cheap-module-eval-source-map'
    devtool: 'source-map',
};

console.log('Now, the NODE_ENV:', process.env.NODE_ENV);
module.exports = config;