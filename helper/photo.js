var fs = require('fs');//引用文件系统模块
var image = require('path'); 

exports.getAlbum=function (name,callback) {
    var path="../photo/"+name;
    fs.readFile(path,"binary",function (error,file) {
        if(!error){
            callback(file);
        }
    })
}