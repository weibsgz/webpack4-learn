const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config')
const complier = webpack(config);

const app = express();
//使用express中间件 通过webpackDevMiddleware加载webpack配置文件，然后通过complier编译webpack
app.use(webpackDevMiddleware(complier,{
    //设置输出路径为webpack.config.js里output的publickpath
    publicPath:config.output.publicPath
}))

app.listen(3000,()=>{
    console.log('server is running at 3000')
})