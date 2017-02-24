[廖雪峰JavaScript博客](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

## 装饰器
需求：统计所有代码一共调用了多少次 *parseInt()*

```
var count = 0;
var oldParseInt = parseInt; // 保存原函数
window.parseInt = function () {  
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
count; // 3
```

## 命名空间
```
// 唯一的全局变量MYAPP:
var MYAPP = {};
// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;
// 其他函数:
MYAPP.foo = function () { 
return 'foo';
};
```

## 高级函数
```
function add(x, y, f) {    
    return f(x) + f(y);
}
add(-5, 6, Math.abs);
```

## 数组操作
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(function (x){
    return x * x;
})
//[1, 4, 9, 16, 25, 36, 49, 64, 81]
arr.reduce(function (x, y) {    
    return x + y;
}); 
// 45
```

## 数组过滤
```
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {    
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
arr; // ['A', 'B', 'C']
```
```
'use strict';
var r,arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
alert(r.toString());// ['apple', 'strawberry', 'banana'，'pear', 'orange']
```

## 数组排序
```
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {    
    if (x < y) {        
        return -1;    
    }
    if (x > y) {        
        return 1;    
    }    
    return 0;
}); 
// [1, 2, 10, 20]
```

```
var arr = ['Google', 'apple', 'Microsoft'];
arr.sort(function (s1, s2) {    
    x1 = s1.toUpperCase();    
    x2 = s2.toUpperCase();    
    if (x1 < x2) {        
        return -1;    
    }
    if (x1 > x2) {
        return 1;    
    }    
    return 0;
}); 
// ['apple', 'Google', 'Microsoft']
```


## 懒加载（函数作为返回值）
```
function lazy_sum(arr) {    
    var sum = function () {        
        return arr.reduce(function (x, y) {            
            return x + y;        
        });    
    }    
    return sum;
}
var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
f(); // 15
```


## 闭包

```
'use strict';
function create_counter(initial) {
    var x = initial || 0;
    return {        
        inc: function () {  
            x += 1;           
            return x;      
        }   
    }
}
var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3
var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13
```

```
function make_pow(n) {
    return function (x) {
        return Math.pow(x, n);    
    }
}
// 创建两个新函数:
var pow2 = make_pow(2);
var pow3 = make_pow(3);
pow2(5); // 25
pow3(7); // 343
```
## 箭头函数

```
var fn = x => x * x;
fn(5); //25
```

```
// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
```


```
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
obj.getAge(); // NaN
```

```
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```
### 备注
箭头函数和匿名函数有个明显的区别：箭头函数内部的 *this* 是词法作用域，由上下文确定。

## generator（生成器）

```
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
//调用方式一
var f = foo(5);
f.next(); // Object {value: 6, done: false}
f.next(); // Object {value: 7, done: false}
f.next(); // Object {value: 8, done: true}
//调用方式二
for (var x of foo(5)) {
    console.log(x); // 依次输出6,7，undefined
}
```
### 备注
*Iterator* 的 *return* 的值不会被 *for...of* 循环到 ， 也不会被扩展符遍历到
## toString（）

```
null.toString(); //Cannot read property 'toString' of null
undefined.toString(); //Cannot read property 'toString' of undefined
123.123.toString(); //"123.123"
123.0.toString(); //"123"
123.toString(); //Invalid or unexpected token
123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
```
## 时区

```
var d = new Date(1435146562875);
d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
```
##  正则规则
**\d可以匹配一个数字**
```
'00\d'可以匹配'007'，但无法匹配'00A'；
'\d\d\d'可以匹配'010'
```
**\w可以匹配一个字母或数字**
```
'\w\w'可以匹配'js'
```
**.可以匹配任意字符**
```
'js.'可以匹配'jsp'、'jss'、'js!'
```
匹配变长的字符，用*表示任意个字符（包括0个），用+表示至少一个字符，用?表示0个或1个字符，用{n}表示n个字符，用{n,m}表示n-m个字符

```
\d{3}表示匹配3个数字，例如'010'
```
```
\s可以匹配一个空格（也包括Tab等空白符），所以\s+表示至少有一个空格，例如匹配' '，'\t\t'等
```
```
\d{3,8}表示3-8个数字，例如'1234567'
```
由于'-'是特殊字符，在正则表达式中，要用'\'转义

```
\d{3}\-\d{3,8}表示匹配带-的电话号码，例如'010-12345'，不能匹配'010 - 12345'
```
要做更精确地匹配，可以用[]表示范围，比如：

```
[0-9a-zA-Z\_]可以匹配一个数字、字母或者下划线；

[0-9a-zA-Z\_]+可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'js2015'等等；

[a-zA-Z\_\$][0-9a-zA-Z\_\$]*可以匹配由字母或下划线、$开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名；

[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）。
```

```
A|B可以匹配A或B，所以(J|j)ava(S|s)cript可以匹配'JavaScript'、'Javascript'、'javaScript'或者'javascript'。

^表示行的开头，^\d表示必须以数字开头。

$表示行的结束，\d$表示必须以数字结束。
```
js也可以匹配'jsp'，但是加上^js$就变成了整行匹配，就只能匹配'js'了。
## RegExp

```
var re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false
re.test('010-1234x5'); // false
re.test('010 12345'); // false
```
## 正则切割

```
'a b   c'.split(' '); // ['a', 'b', '', '', 'c']
'a b   c'.split(/\s+/); // ['a', 'b', 'c']
'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
```
## 正则分组
用()表示的就是要提取的分组（Group）
```
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
```

```
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); //["19:05:30", "19", "05", "30"]
re.exec('25:05:30'); //null
```
## 贪婪匹配

```
var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']
```
由于\d+采用贪婪匹配（*正则匹配默认是贪婪匹配，也就是匹配尽可能多的字*符），直接把后面的0全部匹配了，结果0*只能匹配空字符串了。

必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配

```
var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']
```
指定 g 标志，表示全局匹配
指定 i 标志，表示忽略大小写
指定 m 标志，表示执行多行匹配

## Json序列化

```
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

JSON.stringify(xiaoming); // '{"name":"小明","age":14,"gender":true,"height":1.65,"grade":null,"middle-school":"\"W3C\" Middle School","skills":["JavaScript","Java","Python","Lisp"]}'

JSON.stringify(xiaoming, null, '  '); //格式化

JSON.stringify(xiaoming, ['name', 'skills'], '  '); //过滤

function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}

JSON.stringify(xiaoming, convert, '  '); //传递函数
```
## Json精准序列化
```
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
```

## Json反序列化

```
JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
JSON.parse('true'); // true
JSON.parse('123.45'); // 123.45

JSON.parse('{"name":"小明","age":14}', function (key, value) {
    // 把number * 2:
    if (key === 'name') {
        return value + '同学';
    }
    return value;
}); // Object {name: '小明同学', age: 14}
```

## JavaScript继承

```
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true
```
## 构造函数

```
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
var xiaohong = new Student('小红');
xiaoming.name; // '小明'
xiaohong.name; // '小红'
xiaoming.hello; // function: Student.hello()
xiaohong.hello; // function: Student.hello()
xiaoming.hello === xiaohong.hello; // false
```
## 扩展方法

```
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
```
备注：
调用构造函数不要忘记写new。为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写。

## 改良版

```
function Student(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}

var niming = createStudent();
niming.name; //"匿名"

var xiaoming = createStudent({
    name: '小明'
});

xiaoming.grade; // 1
```
## class
```
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
xiaoming.hello();
```
## class继承

```
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```
## window
window对象不但充当全局作用域，而且表示浏览器窗口。
window对象有innerWidth和innerHeight属性，可以获取浏览器窗口的内部宽度和高度。还有outerWidth和outerHeight属性，可以获取浏览器窗口的整个宽高。
## navigator
navigator对象表示浏览器的信息，最常用的属性包括：
navigator.appName：浏览器名称；
navigator.appVersion：浏览器版本；
navigator.language：浏览器设置的语言；
navigator.platform：操作系统类型；
navigator.userAgent：浏览器设定的User-Agent字符串。
## 浏览器兼容
```
var width = window.innerWidth || document.body.clientWidth;
```
## screen
screen对象表示屏幕的信息，常用的属性有：
screen.width：屏幕宽度，以像素为单位；
screen.height：屏幕高度，以像素为单位；
screen.colorDepth：返回颜色位数，如8、16、24。
## location
```
location.href// 'http://www.example.com:8080/path/index.html?a=1&b=2#TOP'
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'
location.reload(); // '页面刷新'
location.assign('/discuss'); // '页面跳转'
```
