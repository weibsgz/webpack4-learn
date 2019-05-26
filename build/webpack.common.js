const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')


const config = {
    // entry:'./src/index.js',
    entry:{
        index:'./src/index.js',//打包多文件
        // sub:'./src/sub.js',
        index2:'./src/index2.js' //多页面测试
    },
    output:{
        //publicPath:'/',//使用express需要所有输出的的静态资源 前边加根路径
        
        path: path.resolve(__dirname,'../dist'),
        // publicPath: 'http://asserts.xcarimg.com/resource', //加入CDN的域名
    },
    resolve:{
        extensions:['.js'],
        alias:{
           // Utilities: path.resolve(__dirname, 'src/utilities/'),
        }
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
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template:'./src/index.html',
    //         filename:'index.html',
    //         chunks:['main','vendor','sub'] //对应要引入的文件
    //     }),
    //     new HtmlWebpackPlugin({
    //         template:'./src/index.html',
    //         filename:'index2.html',
    //         chunks:['index2','vendor'] 
    //     }),
    //     //设置每一次build之前先删除dist  
    //     new CleanWebpackPlugin(),
    //     //给SRC下的index.html模板页添加一些静态引用
    //     //dll生成的库文件不会自动引入index.html需要这个帮忙引入
    //     new AddAssetHtmlWebpackPlugin({
    //         filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
    //     }),
    //     //分析库文件 要做映射关系，webpack.dll.js里配置后，以后再引入库，直接就是dll下的库文件而不从
    //     //node_modules里引入了
    //     new webpack.DllReferencePlugin({         
    //       manifest: path.resolve(__dirname,'../dll/vendors.manifest.json')
    //     })
    // ],

    optimization:{


         // package.json需要加入"sideEffects": false, 代表所有引入（css,polyfill）这些都不要瑶树给摇掉，因为他们都没有导出
        //后来改成"sideEffects": ["*.css"]  因为CSS也没有导出 别给摇掉了
        usedExports: true, //开启treeShaking 只在development有效  


        //代码分割本质和WEBPACK无关，可通过单独一个JS文件引入库文件
        //比如lodash window._ = _挂在到window                    
        //1.同步代码分割（直接import）只要在此配置optimization即可
        //2.异步代码分割 （异步引入import）


        //下边这一坨代码都是官网粘贴过来的，这些都是默认配置，其实可以不写 splitChunks：{} 是一样的
        // splitChunks: {
        //   chunks: 'all', //async只针对异步代码分割 all同步异步都分割 inital同步代码做分割
        //   minSize: 300, //引入的库的大小超过这个minsize才做codeSpliting
        //   maxSize: 0,
        //   minChunks: 1,//模块被引入多少次才做代码分割,比如有几个文件用了loash
        //   maxAsyncRequests: 5,//一般不用设置，多个库要分割，分割出来的库同时发请求的最大数
        //   maxInitialRequests: 3,//一般不用设置，入口文件要做分割，最大数
        //   automaticNameDelimiter: '~',//文件生成的连接符，不设置下边的filename生效
        //   name: true, //一般不用设置
        //   cacheGroups: { //缓存组，这个比较重要，满足上边的条件了会进入这里
        //     //比如同时引入jq,loash，他先打包JQ,放入缓存组，接着打包loash,他可以把这俩都打包到一个文件
        //     vendors: {
        //       test: /[\\/]node_modules[\\/]/, //同步代码还需指定库是从node_modules来的才打包
        //       priority: -10, //优先级，越大优先级越高，比如JQ，既满足vendor的配置
        //        //也满足default的配置，优先按照vendor的配置模式打包
        //       //filename:'vendor.js' //指定打包名称
        //     },
        //     default: { // 默认打包配置
        //       minChunks: 2,
        //       priority: -20,
        //       reuseExistingChunk: true,//假设a.js 里边引入了b.js
        //       //设置了这个属性，a被打包到common.js b可能之前被单独打包过了
        //       //就不会再跟着a被打包到common.js
        //       //filename:'common.js'
        //     },
        //     //多入口 多 CSS 统一打包到一个STYLES。css
        //     // styles: {
        //     //   name: 'styles',
        //     //   test: /\.css$/,
        //     //   chunks: 'all',
        //     //   enforce: true,
        //     // }

        //     //也可以多入口 根据每个入口单独打包CSS 参考文档https://webpack.js.org/plugins/mini-css-extract-plugin
        //   }
        // }         
    }
}

const makePlugins = (config)=>{
  const plugins = [
      //设置每一次build之前先删除dist  
        new CleanWebpackPlugin()       
  ]

  Object.keys(config.entry).forEach(item=>{
     plugins.push(
      new HtmlWebpackPlugin({
          template:'./src/index.html',
          filename:`${item}.html`,
          chunks:['vendor',item] //对应要引入的文件
     }));
  })
  //  下边这里俩依赖HtmlWebpackPlugin，所以写在后边
  plugins.push(
        //给SRC下的index.html模板页添加一些静态引用
        //dll生成的库文件不会自动引入index.html需要这个帮忙引入
        new AddAssetHtmlWebpackPlugin({
            filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
        }),
        // //分析库文件 要做映射关系，webpack.dll.js里配置后，以后再引入库，直接就是dll下的库文件而不从
        // //node_modules里引入了
        new webpack.DllReferencePlugin({         
          manifest: path.resolve(__dirname,'../dll/vendors.manifest.json')
        }))

  return plugins;
}

config.plugins = makePlugins(config)





module.exports = config;