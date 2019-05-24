const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')


const devConfig = {
    mode:'development',//production打包出来压缩 development不压缩
    devtool:'cheap-module-eval-source-map', 
                    //开发环境建议用cheap-module-eval-source-map
                    // 生产环境建议 cheap-module-source-map
                    //开启sorce-map 报错定位具体文件，不会定位到打包文件
                    //cheap代表只查找到错误行，不精确到哪个字符，用eval方式可以提高打包速度
                    //module 只查找业务代码，不会查找loader里的错误
    output:{
        filename: '[name].js',
        chunkFilename:'[name].chunk.js'
    },
   
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //再哪个文件夹下启动服务
        open:true,
        hot:true,
        port: 8090
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader','postcss-loader'],//loader顺序从下到上，从右到左
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 2, //比如一个SASS文件，内部又import了一个B.scss文件，那么为了让B.scss文件也先走postcss 和 sass-loader
                          modules:true, //默认是false 代表当前页面import 的css只作用于当前页面
                        },
                    },
                    "sass-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    // optimization: {
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         uglifyOptions: {
    //           ie8: true
    //         }
    //       })
    //     ]
    //   }
    //   ,
    resolve: {
        extensions: [
          '.ts',
          '.js' // add this
        ]
      },
    //HtmlWebpackPlugin
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {}
}

module.exports = merge(commonConfig,devConfig)