// test.js

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');

if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}

$.getJSON('http://example.com/ajax', function (data) {
    console.log('IO结果返回后执行...');
});
console.log('不等待IO结果直接执行后续代码...');

// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});