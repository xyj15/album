var express = require('express');
var router = express.Router();
var fs=require('fs');
var multer = require('multer');
var db=require('../helper/photo');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {

        var url=(req.headers.referer).split("?")[1];
        var name=getQueryString(url,"name");
        var album=getQueryString(url,"album");
        var path="./public/photo/"+name+"/"+album;
        var juedui="/Users/juaner/IdeaProjects/album/public/photo/"+name+"/"+album;
        console.log(juedui);
        cb(null, juedui);
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});
var upload = multer({
    storage: storage
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('photo');
});

router.post('/photo', function(req, res) {
    var name=req.body.username;
    var album=req.body.album;
    var path="./public/photo/"+name+"/"+album+"/";
    var paths=[];
    var names=[];
    var ids=[];

    db.getPhotos(name,album,function (row) {
        for(var i=0;i<row.length;i++){
            paths[i]=row[i].path;
            names[i]=row[i].name;
            ids[i]=row[i].id;
        }
        res.json({"paths":paths,"names":names,"ids":ids});

    })



});
router.post('/del', function(req, res) {
    var name=req.body.username;
    var album=req.body.album;
    var path="./public/photo/"+name+"/"+album+"/";
    var elePath="/photo/"+name+"/"+album+"/";
    var cover="./public/photo/"+name+"/"+"cover/"+album+".jpg";
    var pa = fs.readdirSync(path);

    pa.forEach(function(ele,index){
        fs.unlinkSync(path+ele);
    })

    fs.unlinkSync(cover);
    fs.rmdirSync(path);
    db.delPhotos(album,function (result) {
        if(result=="success"){
            res.json({"success":"1"});
        }
    })


});
router.post('/upload',upload.single('recfile'),function(req,res){
    var fileName=req.file.originalname;
    var user=req.body.username;
    var album=req.body.album;
    var path="/photo/"+user+"/"+album+"/"+fileName;
    var name=fileName.split(".")[0];
    console.log(user);
    console.log(path);

    db.addPhoto(user,album,path,name,function (result) {
        if(result=="success"){
            res.json({"success":"1"});
        }
    })

});
function getQueryString(url,name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = url.match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

module.exports = router;