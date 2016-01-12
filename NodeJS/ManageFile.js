'use strict';

var fs = require('fs');

//异步文件读取
/*
fs.readFile('../Note_Git.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
*/

//异步图片读取
/*
fs.readFile('../Tulips.jpg', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
*/

//bytes 与 string 互转
/*
fs.readFile('../Note_Git.txt', function (err, data) {
    if (err) {
        console.log(err);
    } else {
    	console.log(data);
        console.log(data.length + ' bytes');

        // Buffer -> String
		var text = data.toString('utf-8');
		console.log(text);

		// String -> Buffer
		var buf = new Buffer(text, 'utf-8');
		console.log(buf);
    }
});
*/

//同步文件读取
/*
try {
    var data = fs.readFileSync('../Note_Git.txt');
	console.log(data);

	var data = fs.readFileSync('../Note_Git.txt', 'utf-8');
	console.log(data);
} catch (err) {
    // 出错了
    console.log(err);
}
*/

//异步文件写入
/*
var data = 'Hello, Node.js';
fs.writeFile('../output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
*/

//同步文件写入
/*
var data = 'Hello, Node.js';
fs.writeFileSync('../output.txt', data);
*/

//文件读取、写入
/*
try{
	fs.readFile('../Note_Javascript.txt',function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			console.log(data.length + ' bytes');
			console.log('读取完成。');

			fs.writeFile('Note_Javascript.txt',data,function(err){
				if(err){
					console.log(err);
				}else{
					console.log('写入完成。');
				}
			});
		}
	});
}catch(err){
	//出错了
	console.log(err);
}
*/

//异步查看文件状态
/*
fs.stat('../Note_Javascript.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
*/

//同步查看文件状态

var stat = fs.statSync('../Note_Javascript.txt');
// 是否是文件:
console.log('isFile: ' + stat.isFile());
// 是否是目录:
console.log('isDirectory: ' + stat.isDirectory());
if (stat.isFile()) {
	// 文件大小:
	console.log('size: ' + stat.size);
	// 创建时间, Date对象:
	console.log('birth time: ' + stat.birthtime);
	// 修改时间, Date对象:
	console.log('modified time: ' + stat.mtime);
}