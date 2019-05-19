const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry:'./src/index.js',
    entry:{
        main:'./src/index.js',//打包多文件
        sub:'./src/sub.js'
    },
    output:{
        //publicPath:'/',//使用express需要所有输出的的静态资源 前边加根路径
        filename: '[name].js',
        path: path.resolve(__dirname,'../dist'),
        // publicPath: 'http://asserts.xcarimg.com/resource', //加入CDN的域名
    },
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
     //HtmlWebpackPlugin
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //设置每一次build之前先删除dist  
        new CleanWebpackPlugin(),
    ],
    optimization:{
        //代码分割本质和WEBPACK无关，可通过单独一个JS文件引入库文件
        //比如lodash window._ = _挂在到window                    
        //1.同步代码分割（直接import）只要在此配置optimization即可
        //2.异步代码分割 （异步引入import）


        //下边这一坨代码都是官网粘贴过来的，这些都是默认配置，其实可以不写 splitChunks：{} 是一样的
        splitChunks: {
          chunks: 'all', //async只针对异步代码分割 all同步异步都分割 inital同步代码做分割
          minSize: 300, //引入的库的大小超过这个minsize才做codeSpliting
          maxSize: 0,
          minChunks: 1,//模块被引入多少次才做代码分割,比如有几个文件用了loash
          maxAsyncRequests: 5,//一般不用设置，多个库要分割，分割出来的库同时发请求的最大数
          maxInitialRequests: 3,//一般不用设置，入口文件要做分割，最大数
          automaticNameDelimiter: '~',//文件生成的连接符，不设置下边的filename生效
          name: true, //一般不用设置
          cacheGroups: { //缓存组，这个比较重要，满足上边的条件了会进入这里
            //比如同时引入jq,loash，他先打包JQ,放入缓存组，接着打包loash,他可以把这俩都打包到一个文件
            vendors: {
              test: /[\\/]node_modules[\\/]/, //同步代码还需指定库是从node_modules来的才打包
              priority: -10, //优先级，越大优先级越高，比如JQ，既满足vendor的配置
               //也满足default的配置，优先按照vendor的配置模式打包
              //filename:'vendor.js' //指定打包名称
            },
            default: { // 默认打包配置
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,//假设a.js 里边引入了b.js
              //设置了这个属性，a被打包到common.js b可能之前被单独打包过了
              //就不会再跟着a被打包到common.js
              //filename:'common.js'
            }
          }
        }
    }
}