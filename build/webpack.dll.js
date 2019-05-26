const path = require('path');
const webpack = require('webpack')
//让第三方库模块只打包一次 之后不再重复打包
// 之后 只要第一次运行下 npm run dll 再run dev run build 就快了


//这个和splitChunks的的区别：DLL 先打包库 以后不再打包 splitChunks每次都分离打包
module.exports = {
    mode:'production',
    entry:{
        vendors:['jquery','lodash']
    },
    output:{
        filename:'[name].dll.js',
        path:path.resolve(__dirname,'../dll'),
        //暴露文件名
        library:'[name]'
    },
    plugins:[
        //分析库文件 要做映射关系，弄好后 在webpack.common.js里配置DllReferencePlugin，以后再引入库，直接就是dll下的库文件而不从
        //node_modules里引入了
        new webpack.DllPlugin({
          name: '[name]',
          path:path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
}