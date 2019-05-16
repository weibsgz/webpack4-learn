const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    mode:'development',//production打包出来压缩 development不压缩
    devtool:'cheap-module-eval-source-map', 
                    //开发环境建议用cheap-module-eval-source-map
                    // 生产环境建议 cheap-module-source-map
                    //开启sorce-map 报错定位具体文件，不会定位到打包文件
                    //cheap代表只查找到错误行，不精确到哪个字符，用eval方式可以提高打包速度
                    //module 只查找业务代码，不会查找loader里的错误
    // entry:'./src/index.js',
    entry:{
        main:'./src/index.js',//打包多文件
        sub:'./src/sub.js'
    },
    output:{
        publicPath:'/',//使用express需要所有输出的的静态资源 前边加根路径
        filename: '[name].js',
        path: path.resolve(__dirname,'dist'),
        // publicPath: 'http://asserts.xcarimg.com/resource', //加入CDN的域名
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //再哪个文件夹下启动服务
        open:true,
        hot:true,
        port: 9000
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
    module: {
        rules: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048 // 2KB以下用URL-LOADER转成BASE64
                },
              },
            ],
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/fonts/[name].[hash:7].[ext]'
            }
           },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],//loader顺序从下到上，从右到左
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
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" ,
               
  
            //    options:{
            //         // poliyfill形式写业务代码可以用，如果写库文件 需要要用runtime形式
            //         // "presets": [
            //         //     ['@babel/preset-env',{
            //         //         //最新版 已经不用在入口文件 import "@babel/polyfill";需要安装npm i --save core-js@3
            //         //         //使用useBuiltIns会让你不是整体引入所有需要polyfill的语法，而是按需加载，减少打包的体积
            //         //         "useBuiltIns":"usage",
            //         //         "corejs": 3, //新版本需要写这个
            //         //     }]
            //         // ],                   
            //         // runtime形式 如果没有编辑成功 应该是babel-loader版本的原因@
            //         // "plugins": [
            //         //     [
            //         //       "@babel/plugin-transform-runtime",
            //         //       {
            //         //         "absoluteRuntime": false,
            //         //         "corejs": 3,
            //         //         "helpers": true,
            //         //         "regenerator": true,
            //         //         "useESModules": false
            //         //       }
            //         //     ]
            //         // ]
            //     }
            }
        ]       
    },
    resolve: {
        extensions: [
          '.ts',
          '.js' // add this
        ]
      },
    //HtmlWebpackPlugin
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //设置每一次build之前先删除dist  
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        // package.json需要加入"sideEffects": false, 代表所有引入（css,polyfill）这些都不要瑶树给摇掉，因为他们都没有导出
        usedExports: true, //开启treeShaking 只在development有效
        minimizer: [         
          new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
              ie8: true,
            }
          })
        ]
      }
}