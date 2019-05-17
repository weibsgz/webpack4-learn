const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const productConfig = {
    mode:'production',//production打包出来压缩 development不压缩
    devtool:'cheap-module-source-map', 
                    //开发环境建议用cheap-module-eval-source-map
                    // 生产环境建议 cheap-module-source-map
                    //开启sorce-map 报错定位具体文件，不会定位到打包文件
                    //cheap代表只查找到错误行，不精确到哪个字符，用eval方式可以提高打包速度
                    //module 只查找业务代码，不会查找loader里的错误
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
   
}

module.exports = merge(commonConfig,productConfig)