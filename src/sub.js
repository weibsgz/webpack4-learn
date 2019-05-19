//同步引入lodash
// import _ from 'lodash'
import $ from 'jquery'

console.log(_.join(['a','b','c'],'***'))
// 异步引入
// 用这种异步import方式需要安装
function getComponent() {
    //如果不指定webpackChunkName，那么打包出来的就是0.JS 这种
    return import(/* webpackChunkName:"lodash" */'lodash').then(({default:_})=>{
        var element = document.createElement('div');
        element.innerHTML = _.join(['a','b','c'],'***');
        return element
    })
}

document.addEventListener('click',() => {
    getComponent().then(element=>{
        document.body.appendChild(element)
    })
},false);


$(document).on('click',function() {
    console.log('jquery is here')
})

console.log('this is sub1')