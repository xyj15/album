var express = require('express');
var router = express.Router();
var fs=require('fs');
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
    var elePath="/photo/"+name+"/"+album+"/";
    console.log(path);
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        if(ele!=".DS_Store") {
            paths.push(elePath + ele);
            names.push(ele.split(".")[0]);
        }
    })
    res.json({"paths":paths,"names":names});

});
router.post('/del', function(req, res) {
    var name=req.body.username;
    var album=req.body.album;
    var path="./public/photo/"+name+"/"+album+"/";
    var paths=[];
    var names=[];
    var elePath="/photo/"+name+"/"+album+"/";
    var cover="./public/photo/"+name+"/"+"cover/"+album+".jpg";
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        fs.unlinkSync(path+ele);
        console.log(path+ele);
    })
    fs.unlinkSync(cover);
    fs.rmdirSync(path);
    res.json({"success":"1"});



});
module.exports = router;