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
        port: 8765,
         proxy: {
              '/api': {
                target: 'https://www.yourwebsite.com.cn', //主域名
                secure: false, //如果转发地址是https的 需要配置
                //如果真实路径是result.json 但是后端说开发阶段假数据只能用
                //demo.json 可如此配置请求是demo.json
                //注意，一旦上线需要将下边注释掉
                pathRewrite: {'result.json' : 'demo.json'},
                //改变服务器的origin 限制 开发阶段最好配上
                //上线了还是需要服务的origin allow
                changeOrigin: true
              }
            }
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