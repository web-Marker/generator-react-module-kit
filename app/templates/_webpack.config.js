/*
* @Author: mark
* @Date:   2017-03-02 10:16:35
* @Last Modified by:   mark
* @Last Modified time: 2017-09-27 10:32:02
*/

var fs = require('fs'),
    path = require('path'),
    precss = require('precss'),
    webpack = require('webpack'),
    pxtorem = require('postcss-px2rem'), 
    assets = require('postcss-assets'),
    fsArr = fs.readdirSync('./src'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    cleanWebpackPlugin = require('clean-webpack-plugin');
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var cssMin,config;

module.exports = function(env) {
    config = {
        entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000','./src/js/public.jsx'],
        resolve: {
            extensions: ['.js','.css','.min.js','.html','.jsx'],
            alias: {
                Sy: path.resolve(__dirname, './src/style/'),
                Img: path.resolve(__dirname, './src/images/')
            }
        },
        devtool:'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true, 
            stats: 'errors-only',
            overlay: { 
                errors: true,
                warnings: true,
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude:path.resolve(__dirname, 'node_modules'),
                    use:[
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env','react'],
                                plugins: ['transform-runtime']
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: '1000',
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                },
                {
                    test: path.resolve(__dirname, './src/js/phonerm'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'Rem'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                compress: {
                    warnings: false,
                    reduce_vars: true
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "window.jQuery":"jquery"
            })
        ]

    }
        
    var styles = {};

    if (env.clean) {
        config.plugins.push(new cleanWebpackPlugin(['./dist/']))
    }

    if (env.production) { 
        styles = {
            test: /\.css$/, 
            use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    loader: [ 
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function(){
                                    return [
                                        precss,
                                        autoprefixer
                                    ];
                                }
                            }
                        }
                        
                    ]
                }) 
        }
        config.output = {
            filename: 'js/[name].[chunkhash].js',
            chunkFilename: "js/[name].[chunkhash].min.js",
            publicPath: env.baseUrl + '/',
        }
        config.plugins.push(new ExtractTextPlugin({
                filename:'style/[name].[chunkhash].min.css',
                allChunks: true
            }));
        config.module.rules.push(styles);

    }else{
        styles = {
            test: /\.css$/, 
            use: [{
                loader: "style-loader" 
            },{
                loader: "css-loader" 
            },{
                loader: "postcss-loader",
                options: {
                    plugins: function(){
                        return [
                            precss,
                            autoprefixer
                        ];
                    }
                }
            }]
        }
        config.output = {
            filename: 'js/[name].js',
            publicPath: '/',
            chunkFilename: "js/[name].min.js"
        }
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }))
        config.module.rules.push(styles);
    }

    config.output.path = path.resolve(__dirname,'dist');

    fsArr.forEach(function(ele){
        if (/\.html$/.test(ele)) {
            config.plugins.push(new HtmlWebpackPlugin({
                template: './src/'+ele,
                filename: ele
            }))
        }
    });

    return config;

}



    



    
