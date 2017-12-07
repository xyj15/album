var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('photo');
});

router.post('/photo', function(req, res) {
    var name="a";
    var album="life";
    var path="./public/photo/"+name+"/"+album+"/";
    var paths=[];
    var names=[];
    var elePath="/photo/"+name+"/"+album+"/";
    console.log(path);
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        paths.push(elePath+ele);
        console.log(elePath+ele)
        names.push(ele.split(".")[0]);
    })
    res.json({"paths":paths,"names":names});



});
module.exports = router;