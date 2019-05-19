import Header from './header.js'
import test from './test.png'
import './index.css'

var o = new Image()
o.src = test;

var obj = document.getElementById('img')
obj.appendChild(o)


new Header();
console.log('index.js')


//测试babel;
let a = [1,2,3];
a.map((item)=>{
    console.log(item)
})