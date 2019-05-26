//同步引入lodash
import _ from 'lodash'
import $ from 'jquery'

console.log(_.join(['a','b','c'],'***'))
// 异步引入
// 用这种异步import方式需要安装
export function getComponent() {
    console.log('this is sub1')
    //如果不指定webpackChunkName，那么打包出来的就是0.JS 这种
    return import(/* webpackChunkName:"lodash" */'lodash').then(({default:_})=>{
        var element = document.createElement('div');
        element.innerHTML = _.join(['a','b','c'],'***');
        return element
    })
}




//异步引入组件方式  optimization:{splitChunks:{
 //   chunks: async  默认是异步 
//}}
// 这种异步组件点击时候再加载 有可能遇到网络问题会慢
// 用prefetch方式 可以在网络资源空闲时去加载  会等主流程完毕再加载 这个CLICK.js 
// preload会和主流程一起加载
document.addEventListener('click',() => {
   import(/* webpackPrefetch: true */'./click.js').then(({default:func})=>{
       func()
   })
},false);
