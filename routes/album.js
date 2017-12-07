var express = require('express');
var router = express.Router();
var app=express();
var fs=require('fs');
var multer  = require('multer');
app.use(multer({ dest: '/tmp/'}).array('image'));
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
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})
router.post('/photo', function(req, res) {
  var name="a";
  var path="./public/photo/"+name+"/cover/";
  var paths=[];
  var names=[];
  var elePath="/photo/"+name+"/cover/";
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        paths.push(elePath+ele);
        names.push(ele.split(".")[0]);
        console.log(ele);

    })

    console.log(paths.length);
    res.json({"paths":paths,"names":names});



});
module.exports = router;