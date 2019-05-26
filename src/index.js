require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')

import Header from './header.js'
import test from './test.png'
import './index.css'
import {getComponent} from './sub.js'

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

document.addEventListener('click',() => {
    getComponent().then(element=>{
        document.body.appendChild(element)
    })
},false);