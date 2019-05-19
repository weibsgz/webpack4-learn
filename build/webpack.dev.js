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
    
   
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //再哪个文件夹下启动服务
        open:true,
        hot:true,
        port: 8090
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
    optimization: {
        // package.json需要加入"sideEffects": false, 代表所有引入（css,polyfill）这些都不要瑶树给摇掉，因为他们都没有导出
        usedExports: true, //开启treeShaking 只在development有效
        // minimizer: [         
        //   new UglifyJsPlugin({
        //     sourceMap: true,
        //     uglifyOptions: {
        //       ie8: true,
        //     }
        //   })
        // ]
      }
}

module.exports = merge(commonConfig,devConfig)