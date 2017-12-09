var express = require('express');
var router = express.Router();
var app=express();
var fs=require('fs');
var multer  = require('multer');
var juedui="/Users/juaner/IdeaProjects/album/public/photo/";
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {

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
    res.render('album');
});
router.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].filename;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                var response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].filename
                };
            }
            console.log( response);
            res.end( JSON.stringify( response) );
        });
    });
});

router.post('/photo', function(req, res) {
  var name=req.body.username;
  var path="./public/photo/"+name+"/cover/";
  var paths=[];
  var names=[];
  var elePath="/photo/"+name+"/cover/";
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        paths.push(elePath+ele);
        names.push(ele.split(".")[0]);

    })
    console.log(paths.length);
    res.json({"paths":paths,"names":names});

});
router.post('/upload',upload.single('album'),function(req,res){
    var name=req.body.name;
    var album=req.body.album;
    var fileName=req.file.originalname;
    fs.mkdirSync("./public/photo/"+name+"/"+album+"/");
    var readStream = fs.createReadStream(juedui+fileName);
    var writeStream = fs.createWriteStream(juedui+name+"/"+album+"/"+fileName);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
        console.log('copy end');
    });
    readStream.on('error', function () {
        console.log('copy error');
    });
    var newPath="./public/photo/"+name+"/cover/"+album+"."+fileName.split(".")[1];
    fs.renameSync(juedui+fileName,newPath);
    res.json({"success":"1"});
});
module.exports = router;